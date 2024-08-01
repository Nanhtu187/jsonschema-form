import { PathSchema, Schema, StrictSchema } from '../types.ts';
import {
  ALL_OF_KEY,
  DEPENDENCIES_KEY,
  ITEMS_KEY,
  NAME_KEY,
  PROPERTIES_KEY,
  REF_KEY,
  SCHEMA_KEY,
} from '../constants.ts';
import get from 'lodash/get';
import { retrieveSchema } from './retrieveSchema.ts';
import { isEqual } from 'lodash';

function toPathSchemaInternal<T = any, S extends StrictSchema = Schema>(
  schema: S,
  name: string,
  rootSchema?: S,
  formData?: T,
  _recurseList: S[] = [],
): PathSchema<T> {
  if (REF_KEY in schema || DEPENDENCIES_KEY in schema || ALL_OF_KEY in schema) {
    const _schema = retrieveSchema<T, S>(schema, rootSchema, formData);
    const sameSchemaIndex = _recurseList.findIndex((item) =>
      isEqual(item, _schema),
    );
    if (sameSchemaIndex === -1) {
      return toPathSchemaInternal<T, S>(
        _schema,
        name,
        rootSchema,
        formData,
        _recurseList.concat(_schema),
      );
    }
  }

  let pathSchema = {
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
            rootSchema,
            element,
            _recurseList,
          );
        }
      });
    } else {
      formData.forEach((element, i) => {
        pathSchema[i] = toPathSchemaInternal<T, S>(
          schemaItems as S,
          `${name}[${i}]`,
          rootSchema,
          element,
          _recurseList,
        );
      });
    }
  } else if (PROPERTIES_KEY in schema) {
    for (const property in schema.properties) {
      const field: any = get(schema, [PROPERTIES_KEY, property]);
      pathSchema[property] = toPathSchemaInternal<T, S>(
        field,
        `${name}.${property}`,
        rootSchema,
        get(formData, [property]),
        _recurseList,
      );
    }
  }
  return pathSchema as PathSchema<T>;
}

export function toPathSchema<T = any, S extends StrictSchema = Schema>(
  schema: S,
  name: string,
  rootSchema?: S,
  formData?: T,
): PathSchema<T> {
  return toPathSchemaInternal(schema, name, rootSchema, formData);
}
