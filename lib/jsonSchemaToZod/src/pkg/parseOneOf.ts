import { ParseSchemaProps } from "../types";
import { z } from "zod";
import { parseSchema } from "./parseSchema";

export const parseOneOf = ({
  schema,
  rootSchema,
  path,
  ref,
}: ParseSchemaProps): z.ZodTypeAny => {
  if (!schema.oneOf) {
    return z.any();
  }
  if (schema.oneOf.length === 0) {
    return z.any();
  } else if (schema.oneOf.length === 1) {
    if (typeof schema.oneOf[0] == "object") {
      return parseSchema(schema.oneOf[0], rootSchema, `${path}/oneOf`, ref);
    }
    return z.any();
  } else {
    const schemas = schema.oneOf.map((subSchema, i) => {
      if (typeof subSchema == "boolean") {
        return z.boolean()
      }
      return parseSchema(subSchema, rootSchema, `${path}/oneOf/${i}`, ref);
    });
    if (schemas.length === 0) {
      return z.any();
    } else if (schemas.length === 1) {
      return schemas[0];
    }
    return z
      .union([schemas[0], schemas[1], ...schemas.slice(2)])
      .superRefine((x, ctx) => {
        if (!schema.oneOf) {
          return;
        }
        // const schemas = schema.oneOf.map((schema, i) => {
        //   if (typeof schema == "boolean") {
        //     return z.boolean();
        //   }
        //   return parseSchema(schema, rootSchema, `${path}/oneOf/${i}`, ref);
        // });
        const errors = schemas.reduce<z.ZodIssue[]>(
          (errors, schema) =>
            ((result) => {
              if (result.success) {
                return errors;
              }
              return (result.error ? [...errors, ...result.error.issues] : errors)
            })(
              schema.safeParse(x),
            ),
          [],
        );
        if (schemas.length - errors.length !== 1) {
          errors.forEach((err) => {
            ctx.addIssue({
              code: "invalid_union",
              message: err.message,
              unionErrors: [],
            })
          })
          ctx.addIssue({
            code: "invalid_union",
            message: "Invalid input: Should pass single schema",
            path: [],
            unionErrors: [],
          });
        }
      });
  }
};
