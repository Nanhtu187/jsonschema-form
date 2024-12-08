import { ParseSchemaProps } from "../types";
import { z } from "zod";
import { parseSchema } from "./parseSchema";
import { isPrimitive } from "../helper/typeCheck";

export const parseArray = ({
  schema,
  rootSchema,
  path,
  ref,
}: ParseSchemaProps): z.ZodTypeAny => {
  if (typeof schema.items !== "object" && schema.items !== undefined && isPrimitive(schema.items)) {
    return z.array(
      parseSchema(
        { ...schema, type: schema.items },
        rootSchema,
        `${path}/items`,
        ref,
      ),
    );
  }
  if (typeof schema.items === "object") {
    return z.array(parseSchema(schema.items, rootSchema, `${path}/items`, ref));
  } else {
    return z.array(z.any());
  }
};
