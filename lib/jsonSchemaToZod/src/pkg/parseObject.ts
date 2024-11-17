import { ParseSchemaProps } from "../types";
import { z, ZodTypeAny } from "zod";
import { parseSchema } from "./parseSchema";

export const parseObject = ({
  schema,
  rootSchema,
  path,
  ref,
}: ParseSchemaProps): ZodTypeAny => {
  let res = z.object({});
  if (schema.properties) {
    for (const [key, propsSCchema] of Object.entries(schema.properties)) {
      if (typeof propsSCchema == "boolean") {
        continue;
      }
      const required = schema.required?.includes(key) || false;
      const defaultValue = propsSCchema.default;
      try {
        const parsedSchema = parseSchema(
          propsSCchema,
          rootSchema,
          `${path}/properties/${key}`,
          ref,
        );
        if (!required && !defaultValue) {
          res = res.extend({
            [key]: parsedSchema.optional(),
          });
        } else {
          if (defaultValue) {
            res = res.extend({
              [key]: parsedSchema.default(defaultValue),
            });
          } else {
            res = res.extend({
              [key]: parsedSchema,
            });
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  return res;
};
