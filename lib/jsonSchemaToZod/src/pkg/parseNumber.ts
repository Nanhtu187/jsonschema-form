import { Schema } from "../types";
import { z } from "zod";

export const parseNumber = (schema: Schema): z.ZodTypeAny => {
  let res = z.number();
  if (schema.type === "integer") {
    res = res.int();
  }

  if (schema.minimum) {
    res = res.gte(schema.minimum);
  }

  if (schema.maximum) {
    res = res.lte(schema.maximum);
  }

  if (schema.exclusiveMinimum) {
    res = res.gt(schema.exclusiveMinimum);
  }

  if (schema.exclusiveMaximum) {
    res = res.lt(schema.exclusiveMaximum);
  }

  if (schema.multipleOf) {
    res = res.multipleOf(schema.multipleOf);
  }

  return res;
};
