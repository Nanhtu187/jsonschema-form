import {
  StrictSchema,
  Schema,
  ValidationError,
  ValidationData,
} from "../utils/src/types.ts";
import { Ajv, ErrorObject } from "ajv";
import createAjvInstance from "./createAjvInstance.ts";
import toErrorSchema from "../utils/src/toErrorSchema.ts";

export class Validator<T = any, S extends StrictSchema = Schema> {
  ajv: Ajv;
  constructor() {
    this.ajv = createAjvInstance();
  }

  rawValidation<Result = any>(
    schema: S,
    formData?: T,
  ): { errors?: Result[]; validationError?: Error } {
    let validationError: Error | undefined = undefined;
    try {
      this.ajv.validate(schema, formData);
    } catch (err) {
      validationError = err as Error;
    }

    const errors = this.ajv.errors || undefined;

    // Clear errors to prevent persistent errors, see #1104
    this.ajv.errors = null;

    return { errors: errors as unknown as Result[], validationError };
  }

  private transformValidationErrors(
    errors: ErrorObject[] = [],
  ): ValidationError[] {
    return errors.map((e: ErrorObject) => {
      const { dataPath, keyword, message, params, schemaPath } = e;
      const property = `${dataPath}`;

      // put data in expected format
      return {
        name: keyword,
        property,
        message,
        params, // specific to ajv
        stack: `${property} ${message}`.trim(),
        schemaPath,
      };
    });
  }

  validateFormData(formData: T | undefined, schema: S): ValidationData<T> {
    const rawErrors = this.rawValidation<ErrorObject>(schema, formData);
    const errors = this.transformValidationErrors(rawErrors.errors);
    const errorSchema = toErrorSchema<T>(errors);
    return {
      errors,
      errorSchema: errorSchema,
    };
  }
}
