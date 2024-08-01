import { Schema, StrictSchema } from '../types.ts';
import isObject from '../isObject.ts';
import { REF_KEY } from '../constants.ts';
import { isEqual } from 'lodash';
import { findSchemaDefinition } from './findSchemaDefinition.ts';

export function resolveAllReferences<S extends StrictSchema = Schema>(
  schema: S,
  rootSchema: S,
  recurseList: string[],
): S {
  if (!isObject(schema)) {
    return schema;
  }
  let resolvedSchema: S = schema;
  // resolve top level ref
  if (REF_KEY in resolvedSchema) {
    const { $ref, ...localSchema } = resolvedSchema;
    // Check for a recursive reference and stop the loop
    if (recurseList.includes($ref!)) {
      return resolvedSchema;
    }
    recurseList.push($ref!);
    // Retrieve the referenced schema definition.
    const refSchema = findSchemaDefinition<S>($ref, rootSchema);
    resolvedSchema = { ...refSchema, ...localSchema };
  }
  return isEqual(schema, resolvedSchema) ? schema : resolvedSchema;
}

export function retrieveSchema<T = any, S extends StrictSchema = Schema>(
  schema: S,
  rootSchema: S = {} as S,
  formData?: T,
): S {
  return retrieveSchemaInternal(schema, rootSchema, formData)[0];
}

export function resolveReference<T = any, S extends StrictSchema = Schema>(
  schema: S,
  rootSchema: S,
  recurseList: string[],
  formData?: T,
): S[] {
  const updatedSchema = resolveAllReferences<S>(
    schema,
    rootSchema,
    recurseList,
  );
  if (updatedSchema !== schema) {
    // Only call this if the schema was actually changed by the `resolveAllReferences()` function
    return retrieveSchemaInternal<T, S>(
      updatedSchema,
      rootSchema,
      formData,
      recurseList,
    );
  }
  return [schema];
}

export function resolveSchema<T = any, S extends StrictSchema = Schema>(
  schema: S,
  rootSchema: S,
  recurseList: string[],
  formData?: T,
): S[] {
  const updatedSchemas = resolveReference<T, S>(
    schema,
    rootSchema,
    recurseList,
    formData,
  );

  if (updatedSchemas.length > 1 || updatedSchemas[0] !== schema) {
    // return the updatedSchemas array if it has either multiple schemas within it
    // OR the first schema is not the same as the original schema
    return updatedSchemas;
  }

  return [schema];
}

function retrieveSchemaInternal<T = any, S extends StrictSchema = Schema>(
  schema: S,
  rootSchema: S,
  formData?: T,
  recurseList: string[] = [],
): S[] {
  if (!isObject(schema)) {
    return [{} as S];
  }

  return resolveSchema<T, S>(schema, rootSchema, recurseList, formData);
}
