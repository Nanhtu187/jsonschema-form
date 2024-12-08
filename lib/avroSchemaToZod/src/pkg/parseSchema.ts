import { AvroSchema, ParserSelector, PrimitiveTypeName, Refs } from "../types";
import { z } from "zod";
import { State } from "../enums";
import { parseArray, parseBoolean, parseEnum, parseNull, parseNumber, parseRecord, parseString } from ".";

export const parseSchema = (
  schema: AvroSchema,
  rootSchema: AvroSchema,
  path: string,
  ref: Refs,
): z.ZodTypeAny => {
  const seen = ref.seen.get(path);
  if (seen) {
    if (seen.state === State.SUCCESS) {
      return seen.value;
    } else {
      throw new Error(`Circular reference detected at path: ${path}`);
    }
  }

  ref.seen.set(path, { state: State.PROCESSING, value: z.any() });
  let parsed = selectParser({ schema, rootSchema, path, ref });
  if (schema.doc) {
    parsed = parsed.describe(schema.doc);
  }
  ref.seen.set(path, { state: State.SUCCESS, value: parsed });

  return parsed;
};

const selectParser: ParserSelector = ({ schema, rootSchema, path, ref }) => {
  // if (its.a.nullable(schema)) {
  //   return parseNullable(schema, refs);
  // } else
  if (its.a.record(schema)) {
    return parseRecord({ schema, rootSchema, path, ref });
  } else if (its.an.array(schema)) {
    return parseArray({ schema, rootSchema, path, ref });
    // } else if (its.a.ref(schema)) {
    //   return parseRef({ schema, rootSchema, path, ref });
    // } else if (its.an.allOf(schema)) {
    //   return parseAllOf(schema, refs);
    // } else if (its.a.oneOf(schema)) {
    //   return parseOneOf(schema, refs);
    // } else if (its.a.not(schema)) {
    //   return parseNot(schema, refs);
  } else if (its.an.enum(schema)) {
    return parseEnum(schema); //<-- needs to come before primitives
    // } else if (its.a.const(schema)) {
    //   return parseConst(schema);
    // } else if (its.a.multipleType(schema)) {
    //   return parseMultipleType(schema, refs);
  } else if (its.a.primitive(schema, "string")) {
    return parseString(schema);
  } else if (
    its.a.primitive(schema, "int") ||
    its.a.primitive(schema, "long") ||
    its.a.primitive(schema, "float") ||
    its.a.primitive(schema, "double")
  ) {
    return parseNumber(schema);
  } else if (its.a.primitive(schema, "boolean")) {
    return parseBoolean();
  } else {
    // if (its.a.primitive(schema, "null")) {
    return parseNull();
  }
  // } else if (its.a.conditional(schema)) {
  //   return parseIfThenElse(schema, refs);
  // } else {
  //   return parseDefault(schema);
  // }
};

export const its = {
  an: {
    array: (x: AvroSchema): x is AvroSchema & { type: "array" } =>
      x.type === "array",
    //   allOf: (
    //     x: Schema,
    //   ): x is Schema & {
    //     allOf: JSONSchema7Definition[] | undefined;
    //   } => x.allOf !== undefined,
    enum: (
      x: AvroSchema,
    ): x is AvroSchema & { type: "enum" } => x.type == "enum",
  },
  a: {
    record: (x: AvroSchema): x is AvroSchema => {
      return x.type === "record";
    },
    // nullable: (x: Schema): x is Schema & { nullable: true } =>
    //   (x as any).nullable === true,
    // ref: (x: Schema): x is Schema & { $ref: string } => x.$ref !== undefined,
    // multipleType: (
    //   x: JsonSchemaObject,
    // ): x is JsonSchemaObject & { type: string[] } => Array.isArray(x.type),
    // not: (
    //   x: JsonSchemaObject,
    // ): x is JsonSchemaObject & {
    //   not: JsonSchema;
    // } => x.not !== undefined,
    // const: (
    //   x: JsonSchemaObject,
    // ): x is JsonSchemaObject & {
    //   const: Serializable;
    // } => x.const !== undefined,
    primitive: <
      T extends
      PrimitiveTypeName
    >(
      x: AvroSchema,
      p: T,
    ): x is AvroSchema & { type: T } => x.type === p,
    // conditional: (
    //   x: JsonSchemaObject,
    // ): x is JsonSchemaObject & {
    //   if: JsonSchema;
    //   then: JsonSchema;
    //   else: JsonSchema;
    // } =>
    //   Boolean(
    //     "if" in x && x.if && "then" in x && "else" in x && x.then && x.else,
    //   ),
    // oneOf: (
    //   x: JsonSchemaObject,
    // ): x is JsonSchemaObject & {
    //   oneOf: JsonSchema[];
    // } => x.oneOf !== undefined,
  },
};
