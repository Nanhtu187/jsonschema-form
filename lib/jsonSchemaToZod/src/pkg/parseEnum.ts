import { Schema } from "../types";
import { z } from "zod";

export const parseEnum = (schema: Schema): z.ZodTypeAny => {
  if (!schema.enum || schema.enum.length == 0) {
    return z.any();
  }
  const listOfValue = schema.enum.map((value) => {
    return z.literal(value as z.Primitive);
  });
  return z.union([listOfValue[0], listOfValue[1], ...listOfValue.slice(2)]);
};
