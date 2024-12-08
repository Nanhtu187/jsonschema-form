import { ParseSchemaProps } from "../types";
import { z } from "zod";
import { parseSchema } from "./parseSchema";

export const parseRecord = ({
  schema,
  rootSchema,
  path,
  ref,
}: ParseSchemaProps): z.ZodTypeAny => {
  let res = z.object({});
  schema.fields.forEach((field) => {
    const fieldPath = `${path}.fields[${field.name}]`;
    if (typeof field.type === "object" && !Array.isArray(field.type)) {
      field = field.type;
    }
    const parsed = parseSchema(field, rootSchema, fieldPath, ref);
    let isRequired = Array.isArray(field.type) && !field.type.includes("null");
    if (field.default) {
      res = res.extend({ [field.name]: parsed.default(field.default) });
    } else if (isRequired) {
      res = res.extend({ [field.name]: parsed });
    } else {
      res = res.extend({ [field.name]: parsed.optional() });
    }
  });
  return res;
};
