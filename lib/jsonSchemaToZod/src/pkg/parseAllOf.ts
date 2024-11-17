import { z } from "zod";
import { ParseSchemaProps, Schema } from "../types";
import { parseSchema } from "./parseSchema";

const mergeAllOf = (allOf: Schema[]): Schema => {
  const len = allOf.length;
  if (len === 1) {
    return allOf[0];
  }
  const left = mergeAllOf(allOf.slice(0, len / 2));
  const right = mergeAllOf(allOf.slice(len / 2));
  return { ...left, ...right };
};

export const parseAllOf = ({
  schema,
  rootSchema,
  path,
  ref,
}: ParseSchemaProps): z.ZodTypeAny => {
  if (!schema.allOf || schema.allOf.length === 0) {
    return z.any();
  }

  if (schema.allOf.length === 1) {
    if (typeof schema.allOf[0] === "object") {
      return parseSchema(schema.allOf[0], rootSchema, `${path}/allOf`, ref);
    }
    return z.any();
  }

  const mergedAllOf = mergeAllOf(
    schema.allOf.filter((x) => typeof x === "object") as Schema[],
  );
  return parseSchema(mergedAllOf, rootSchema, `${path}/allOf`, ref);
};
