import { z } from "zod";
import { ParseSchemaProps } from "../types";

export const parseMultipleType = ({ schema }: ParseSchemaProps): z.ZodTypeAny => {
    if (!Array.isArray(schema.type)) {
        return z.any();
    }

    if (!schema.type || schema.type.length === 0) {
        return z.any();
    }

    if (schema.type.length === 1) {
        if (typeof schema.type[0] === "boolean") {
            return z.boolean();
        }
        return parsePrimitiveType(schema.type[0]);
    }
    let innerSchema = schema.type.map((x) => {
        if (typeof x === "boolean") {
            return z.boolean();
        }
        return parsePrimitiveType(x);
    });
    return z.union(
        [innerSchema[0], innerSchema[1], ...innerSchema.slice(2)]
    );
}

const parsePrimitiveType = (type: string): z.ZodTypeAny => {
    switch (type) {
        case "string":
            return z.string();
        case "number":
            return z.number();
        case "integer":
            return z.number();
        case "boolean":
            return z.boolean();
        case "null":
            return z.null();
        default:
            return z.any();
    }
}