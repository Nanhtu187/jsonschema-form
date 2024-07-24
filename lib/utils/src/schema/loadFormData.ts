import { Schema, StrictSchema } from '../types.ts';
import {
  ARRAY_TYPE,
  DEFAULT_KEY,
  PROPERTIES_KEY,
  TYPE_KEY,
} from '../constants.ts';
import get from 'lodash/get';
import set from 'lodash/set';

export function getFormData<T = any, S extends StrictSchema = Schema>(
  schema: S,
): T {
  if (DEFAULT_KEY in schema) {
    return get(schema, [DEFAULT_KEY]) as T;
  }
  if (TYPE_KEY in schema && get(schema, [TYPE_KEY]) == ARRAY_TYPE) {
    return [] as T;
  }
  if (PROPERTIES_KEY in schema) {
    let formData = {};
    const properties = get(schema, [PROPERTIES_KEY]);
    for (const property in properties) {
      const field: any = get(properties, [property]);
      set(formData, [property], getFormData(field));
    }
    return formData as T;
  }
  return '' as T;
}
