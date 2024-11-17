import { JSONSchema7 } from "json-schema";
import { z } from "zod";
import { State } from "./enum";

export type Schema = JSONSchema7;

export type Options = {
  name?: string;
  module?: "cjs" | "esm" | "none";
  withoutDefaults?: boolean;
  withoutDescribes?: boolean;
  // parserOverride?: ParserOverride;
  depth?: number;
  type?: boolean | string;
  noImport?: boolean;
};

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
  schema: Schema;
  rootSchema: Schema;
  ref: Refs;
  path: string;
};
