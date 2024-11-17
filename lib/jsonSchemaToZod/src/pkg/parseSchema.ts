import { ParserSelector, Refs, Schema } from "../types";
import { z } from "zod";
import { parseNull } from "./parseNull";
import { parseBoolean } from "./parseBoolean";
import { parseNumber } from "./parseNumber";
import { parseString } from "./parseString";
import { JSONSchema7Definition, JSONSchema7Type } from "json-schema";
import { parseObject } from "./parseObject";
import { parseArray } from "./parseArray";
import { State } from "../enum";
import { parseRef } from "./parseRef";
import { parseAllOf } from "./parseAllOf";

export const parseSchema = (
  schema: Schema,
  rootSchema: Schema,
  path: string,
  ref: Refs,
): z.ZodTypeAny => {
  const seen = ref.seen.get(path);
  if (seen) {
    if (seen.state === State.SUCCESS) {
      return seen.value;
    } else {
      throw new Error("Circular reference detected");
    }
  }
  if (schema.$defs) {
    for (const key in schema.$defs) {
      const def = schema.$defs[key];
      if (typeof def === "boolean") {
        continue;
      }
      parseSchema(def, rootSchema, `${path}/$defs/${key}`, ref);
    }
  }
  ref.seen.set(path, { state: State.PROCESSING, value: z.any() });
  let parsed = selectParser({ schema, rootSchema, path, ref });
  ref.seen.set(path, { state: State.SUCCESS, value: parsed });

  if (schema.description) {
    parsed = parsed.describe(schema.description);
  }

  return parsed;
};

const selectParser: ParserSelector = ({ schema, rootSchema, path, ref }) => {
  // if (its.a.nullable(schema)) {
  //   return parseNullable(schema, refs);
  // } else
  if (its.an.object(schema)) {
    return parseObject({ schema, rootSchema, path, ref });
  } else if (its.an.array(schema)) {
    return parseArray({ schema, rootSchema, path, ref });
  } else if (its.a.ref(schema)) {
    return parseRef({ schema, rootSchema, path, ref });
    // } else if (its.an.anyOf(schema)) {
    //   return parseAnyOf(schema, refs);
  } else if (its.an.allOf(schema)) {
    return parseAllOf({ schema, rootSchema, path, ref });
    // } else if (its.a.oneOf(schema)) {
    //   return parseOneOf({ schema, rootSchema, path, ref });
    // } else if (its.a.not(schema)) {
    //   return parseNot(schema, refs);
    // } else if (its.an.enum(schema)) {
    //   return parseEnum(schema); //<-- needs to come before primitives
    // } else if (its.a.const(schema)) {
    //   return parseConst(schema);
    // } else if (its.a.multipleType(schema)) {
    //   return parseMultipleType(schema, refs);
  } else if (its.a.primitive(schema, "string")) {
    return parseString(schema);
  } else if (
    its.a.primitive(schema, "number") ||
    its.a.primitive(schema, "integer")
  ) {
    return parseNumber(schema);
  } else if (its.a.primitive(schema, "boolean")) {
    return parseBoolean();
  } else {
    // if (its.a.primitive(schema, "null")) {
    console.log(schema);
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
    object: (x: Schema): x is Schema & { type: "object" } =>
      x.type === "object",
    array: (x: Schema): x is Schema & { type: "array" } => x.type === "array",
    anyOf: (
      x: Schema,
    ): x is Schema & {
      anyOf: JSONSchema7Definition[] | undefined;
    } => x.anyOf !== undefined,
    allOf: (
      x: Schema,
    ): x is Schema & {
      allOf: JSONSchema7Definition[] | undefined;
    } => x.allOf !== undefined,
    enum: (
      x: Schema,
    ): x is Schema & {
      enum: JSONSchema7Type[] | undefined;
    } => x.enum !== undefined,
  },
  a: {
    nullable: (x: Schema): x is Schema & { nullable: true } =>
      (x as any).nullable === true,
    ref: (x: Schema): x is Schema & { $ref: string } => x.$ref !== undefined,
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
    primitive: <T extends "string" | "number" | "integer" | "boolean" | "null">(
      x: Schema,
      p: T,
    ): x is Schema & { type: T } => x.type === p,
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
    oneOf: (
      x: Schema,
    ): x is Schema & {
      oneOf: JSONSchema7Definition[];
    } => x.oneOf !== undefined,
  },
};
