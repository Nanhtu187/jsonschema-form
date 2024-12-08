import { State } from "./enums";
import { z } from "zod";

export type PrimitiveTypeName =
  | "null"
  | "boolean"
  | "int"
  | "long"
  | "float"
  | "double"
  | "bytes"
  | "string";

export type ComplexTypeName = "record" | "enum" | "array" | "map" | "union";

export type AvroSchemaType = AvroSchema | PrimitiveTypeName | ComplexTypeName;

export interface AvroSchema {
  type: AvroSchemaType | AvroSchemaType[];
  name: string;
  namespace: string;
  fields: AvroSchema[];
  default: any;
  doc?: string;
  logicalType?: string;
  items?: AvroSchema | PrimitiveTypeName;
  symbols?: string[];
}

export type Refs = {
  seen: Map<
    string,
    {
      state: State;
      value: z.ZodTypeAny;
    }
  >;
};

export type ParserSelector = ({
  schema,
  path,
  ref,
}: ParseSchemaProps) => z.ZodTypeAny;

export type ParseSchemaProps = {
  schema: AvroSchema;
  rootSchema: AvroSchema;
  ref: Refs;
  path: string;
};
