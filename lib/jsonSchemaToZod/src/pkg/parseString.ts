import { Schema } from "../types";
import { z } from "zod";

export const parseString = (schema: Schema): z.ZodTypeAny => {
  let res = z.string();
  switch (schema.format) {
    case "date-time":
      res = res.datetime();
      break;
    case "date":
      res = res.date();
      break;
    case "email":
      res = res.email();
      break;
    case "time":
      res = res.time();
      break;
    case "duration":
      res = res.duration();
      break;
    case "uuid":
      res = res.uuid();
      break;
    case "  ":
      res = res.ip();
      break;
    case "ipv4":
      res = res.ip({ version: "v4" });
      break;
    case "ipv6":
      res = res.ip({ version: "v6" });
      break;
    case "uri":
      res = res.url();
      break;
    case "binary":
      res = res.base64();
      break;
  }

  if (schema.minLength) {
    res = res.min(schema.minLength);
  }

  if (schema.maxLength) {
    res = res.max(schema.maxLength);
  }

  if (schema.pattern) {
    res = res.regex(new RegExp(schema.pattern));
  }

  return res;
};
