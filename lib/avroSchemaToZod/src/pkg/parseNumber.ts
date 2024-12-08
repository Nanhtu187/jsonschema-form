import { AvroSchema } from "../types";
import { z } from "zod";

export const parseNumber = (schema: AvroSchema): z.ZodTypeAny => {
  let res = z.number();
  if (schema.type === "int" || schema.type === "long") {
    res = res.int();
    if (schema.type === "int") {
      res = res.min(-2147483648).max(2147483647);
    }
  }

  return res;
};
