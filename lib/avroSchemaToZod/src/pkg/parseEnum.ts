import { z } from "zod"
import { AvroSchema } from "../types"

export const parseEnum = (schema: AvroSchema): z.ZodTypeAny => {
    if (!schema.symbols || !Array.isArray(schema.symbols) || schema.symbols.length === 0) {
        throw new Error("Enum schema must have a symbols property")
    }

    const res = schema.symbols.map((symbol) => z.literal(symbol))
    return z.union([res[0], res[1], ...res.slice(2)])
}