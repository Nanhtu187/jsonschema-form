import { resolveSchema } from "@nanhtu/utils";
import z from "zod";
import { FormRootProps } from "./templates";
import { FormState, useFormContext, useRenderTemplate } from "..";
import React, { useMemo } from "react";
import _ from "lodash";

export const BaseFormRoot: React.FC<FormRootProps> = ({
  onSubmit,
  onError,
  liveValidate,
}) => {
  const { schema, formData, setErrors } = useFormContext(
    (state: FormState) => state,
  );
  const RenderTemplate = useRenderTemplate();

  const resolvedSchema = useMemo(() => resolveSchema(schema), [schema]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      resolvedSchema.parse(formData);
      setErrors(null);
      onSubmit(formData);
    } catch (validationErrors) {
      const zodErrors = validationErrors as z.ZodError;
      setErrors(zodErrors.issues);
      onError(zodErrors.issues, formData);
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {isObjectSchema(resolvedSchema) &&
          Object.keys(resolvedSchema.shape).map((key) => (
            <RenderTemplate
              key={key}
              schema={resolvedSchema.shape[key]}
              path={[key]}
              liveValidate={liveValidate}
              title={_.startCase(key)}
            />
          ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
  return (
    resolveSchema(schema)._def.typeName === z.ZodFirstPartyTypeKind.ZodObject
  );
};
