import { GenericObjectType, Schema, StrictSchema } from '../types.ts';
import { REF_KEY } from '../constants.ts';
import { get, omit } from 'lodash';

export function splitKeyElementFromObject(
  key: string,
  object: GenericObjectType,
) {
  const value = object[key];
  const remaining = omit(object, [key]);
  return [remaining, value];
}

function findSchemaDefinitionRecursive<S extends StrictSchema = Schema>(
  $ref?: string,
  rootSchema: S = {} as S,
  recurseList: string[] = [],
): S {
  const ref = $ref || '';
  let decodedRef;
  if (ref.startsWith('#')) {
    // Decode URI fragment representation.
    decodedRef = decodeURIComponent(ref.substring(1));
  } else {
    throw new Error(`Could not find a definition for ${$ref}.`);
  }
  const current: S = get(
    rootSchema,
    decodedRef.split('/').join('.').substring(1),
  );
  if (current === undefined) {
    throw new Error(`Could not find a definition for ${$ref}.`);
  }
  const nextRef = current[REF_KEY];
  if (nextRef) {
    if (recurseList.includes(nextRef) && recurseList.length === 1) {
      throw new Error(`Definition for ${$ref} is a circular reference`);
    }

    const [remaining, theRef] = splitKeyElementFromObject(REF_KEY, current);
    const subSchema = findSchemaDefinitionRecursive<S>(theRef, rootSchema, [
      ...recurseList,
      ref,
    ]);
    if (Object.keys(remaining).length > 0) {
      return { ...remaining, ...subSchema };
    }
    return subSchema;
  }
  return current;
}

export function findSchemaDefinition<S extends StrictSchema = Schema>(
  $ref?: string,
  rootSchema: S = {} as S,
): S {
  const recurseList: string[] = [];
  return findSchemaDefinitionRecursive($ref, rootSchema, recurseList);
}
