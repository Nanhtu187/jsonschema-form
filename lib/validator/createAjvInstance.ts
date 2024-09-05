import Ajv from "ajv";

export const AJV_CONFIG = {
  errorDataPath: "property",
  allErrors: true,
  multipleOfPrecision: 8,
  schemaId: "auto",
  unknownFormats: "ignore",
} as const;
export const COLOR_FORMAT_REGEX =
  /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/;
export const DATA_URL_FORMAT_REGEX =
  /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;

export default function createAjvInstance() {
  const ajv = new Ajv({ ...AJV_CONFIG });
  ajv.addFormat("data-url", DATA_URL_FORMAT_REGEX);
  ajv.addFormat("color", COLOR_FORMAT_REGEX);
  return ajv;
}
