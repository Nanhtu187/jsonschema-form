import { z } from "zod";
import { parseSchema } from "./pkg";
import { Schema } from "./types";

export const loadString = (schema: string): z.ZodTypeAny => {
  const parsedSchema = JSON.parse(schema) as Schema;
  return parseSchema(parsedSchema, parsedSchema, "#", { seen: new Map() });
};
