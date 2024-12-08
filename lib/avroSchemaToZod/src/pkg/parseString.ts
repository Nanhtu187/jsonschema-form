import { AvroSchema } from "../types";
import { z } from "zod";

export const parseString = (schema: AvroSchema): z.ZodTypeAny => {
  let res = z.string();
  if (schema.type === "string") {
    if (schema.logicalType === "uuid") {
      res = res.uuid();
    }
  }

  return res;
};
