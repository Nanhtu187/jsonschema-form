import { z } from "zod";
import {ParseSchemaProps} from "../types";

export const parseConst = (
  {schema}: ParseSchemaProps
) => {
    if (typeof schema.const === "string" || typeof schema.const === "number") {
        return z.literal(schema.const);
    }
    return z.any();
};