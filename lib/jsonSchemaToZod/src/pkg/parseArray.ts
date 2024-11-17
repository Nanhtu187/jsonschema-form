import { z } from "zod";
import { parseSchema } from "./parseSchema";
import { ParseSchemaProps } from "../types";

export const parseArray = ({
  schema,
  rootSchema,
  path,
  ref,
}: ParseSchemaProps): z.ZodTypeAny => {
  let res;
  if (
    schema.items &&
    !Array.isArray(schema.items) &&
    typeof schema.items != "boolean"
  ) {
    res = z.array(parseSchema(schema.items, rootSchema, `${path}/items`, ref));
  } else {
    res = z.array(z.any());
  }

  if (schema.minLength) {
    res = res.min(schema.minLength);
  }

  if (schema.maxLength) {
    res = res.max(schema.maxLength);
  }

  return res;
};
