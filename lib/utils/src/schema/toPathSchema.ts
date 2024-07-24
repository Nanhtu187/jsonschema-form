import { PathSchema, Schema, StrictSchema } from '../types.ts';
import {
  ITEMS_KEY,
  NAME_KEY,
  PROPERTIES_KEY,
  SCHEMA_KEY,
} from '../constants.ts';
import get from 'lodash/get';

function toPathSchemaInternal<T = any, S extends StrictSchema = Schema>(
  schema: S,
  name: string,
  formData: T,
): PathSchema<T> {
  const pathSchema = {
    [NAME_KEY]: name,
  } as PathSchema;
  pathSchema[SCHEMA_KEY] = schema;
  if (ITEMS_KEY in schema && Array.isArray(formData)) {
    const { items: schemaItems } = schema;
    if (Array.isArray(schemaItems)) {
      formData.forEach((element, i) => {
        if (schemaItems[i]) {
          pathSchema[i] = toPathSchemaInternal<T, S>(
            schemaItems[i] as S,
            `${name}[${i}]`,
            element,
          );
        }
      });
    } else {
      formData.forEach((element, i) => {
        pathSchema[i] = toPathSchemaInternal<T, S>(
          schemaItems as S,
          `${name}[${i}]`,
          element,
        );
      });
    }
  } else if (PROPERTIES_KEY in schema) {
    for (const property in schema.properties) {
      const field: any = get(schema, [PROPERTIES_KEY, property]);
      pathSchema[property] = toPathSchemaInternal<T, S>(
        field,
        `${name}.${property}`,
        get(formData, [property]),
      );
    }
  }
  return pathSchema as PathSchema<T>;
}

export function toPathSchema<T = any, S extends StrictSchema = Schema>(
  schema: S,
  name: string,
  formData: T,
): PathSchema<T> {
  return toPathSchemaInternal(schema, name, formData);
}
