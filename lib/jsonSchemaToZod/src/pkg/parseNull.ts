import { z } from "zod";

export const parseNull = (): z.ZodTypeAny => {
  return z.null();
};
