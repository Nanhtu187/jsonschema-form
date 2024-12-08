import { AvroSchema } from "../types";

export const isOptional = (field: AvroSchema): boolean => {
  return Array.isArray(field.type) && field.type.includes("null");
};

export const isPrimitive = (type: string): boolean => {
  return [
    "null",
    "boolean",
    "int",
    "long",
    "float",
    "double",
    "bytes",
    "string",
  ].includes(type);
};
