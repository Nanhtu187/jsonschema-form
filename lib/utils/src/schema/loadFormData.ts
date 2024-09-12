import { Schema, StrictSchema } from "../types.ts";
import {
  ARRAY_TYPE,
  BOOLEAN_TYPE,
  DEFAULT_KEY,
  NULL_TYPE,
  NUMBER_TYPE,
  OBJECT_TYPE,
  PROPERTIES_KEY,
} from "../constants.ts";
import get from "lodash/get";
import set from "lodash/set";

export function getDefaultValue(type: string): any {
  switch (type) {
    case ARRAY_TYPE:
      return [];
    case BOOLEAN_TYPE:
      return false;
    case OBJECT_TYPE:
      return {};
    case NUMBER_TYPE:
      return 0;
    case NULL_TYPE:
      return null;
    default:
      return "";
  }
}

export function getFormData<T = any, S extends StrictSchema = Schema>(
  schema: S,
): T {
  if (DEFAULT_KEY in schema) {
    return get(schema, [DEFAULT_KEY]) as T;
  }
  if (PROPERTIES_KEY in schema) {
    const formData = {};
    const properties = get(schema, [PROPERTIES_KEY]);
    for (const property in properties) {
      const field: any = get(properties, [property]);
      const value = getFormData(field);
      if (value == undefined) {
        continue;
      }
      set(formData, [property], value);
    }
    return formData as T;
  }
  return undefined as T;
}
