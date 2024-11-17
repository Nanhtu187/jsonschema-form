import { z } from "zod";

export const parseBoolean = (): z.ZodTypeAny => {
  return z.boolean();
};
