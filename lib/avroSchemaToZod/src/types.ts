export type TypeName =
  | "string"
  | "int"
  | "long"
  | "float"
  | "double"
  | "boolean"
  | "null"
  | "bytes"
  | "array"
  | "enum"
  | "fixed"
  | "record";

export type Schema = {
  name: string;
  type: TypeName | TypeName[];
};
