import { z } from "zod";
import { AvroSchema } from "./types";
import { parseSchema } from "./pkg";

export const loadString = (schema: string): z.ZodTypeAny => {
  const parsedSchema = JSON.parse(schema) as AvroSchema;
  return parseSchema(parsedSchema, parsedSchema, "#", {
    seen: new Map(),
  });
};
