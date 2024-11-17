import { z } from "zod";
import { ParseSchemaProps, Schema } from "../types";
import jsonpointer from "jsonpointer";
import { parseSchema } from "./parseSchema";

export const parseRef = ({
  schema,
  rootSchema,
  ref,
}: ParseSchemaProps): z.ZodTypeAny => {
  const refPath = schema.$ref ?? "";
  let decodedRef;
  if (refPath.startsWith("#")) {
    // Decode URI fragment representation.
    decodedRef = decodeURIComponent(refPath.substring(1));
  } else {
    throw new Error(`Could not find a definition for ${refPath}.`);
  }
  const current: Schema = jsonpointer.get(rootSchema, decodedRef);

  return parseSchema(current, rootSchema, decodedRef, ref);
};
