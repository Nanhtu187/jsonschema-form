import { z } from "zod";
import { ParseSchemaProps } from "../types";
import { parseSchema } from "./parseSchema";

export const parseAnyOf = ({ schema, rootSchema, path, ref }: ParseSchemaProps): z.ZodTypeAny => {
    if (!schema.anyOf || schema.anyOf.length === 0) {
        return z.any();
    }
    if (schema.anyOf.length === 1) {
        if (typeof schema.anyOf[0] === "boolean") {
            return z.boolean();
        }
        return parseSchema(schema.anyOf[0], rootSchema, `${path}/anyOf`, ref);
    }
    let innerSchema = schema.anyOf.map((x, i) => {
        if (typeof x === "boolean") {
            return z.boolean();
        }
        return parseSchema(x, rootSchema, `${path}/anyOf/${i}`, ref)
    });
    return z.union(
        [innerSchema[0], innerSchema[1], ...innerSchema.slice(2)]
    );
}
