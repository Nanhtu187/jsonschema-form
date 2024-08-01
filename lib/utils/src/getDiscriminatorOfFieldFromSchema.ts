import { Schema, StrictSchema } from './types.ts';
import { get, isString } from 'lodash';

export function getDiscriminatorFieldFromSchema<
  S extends StrictSchema = Schema,
>(schema: S) {
  let discriminator: string | undefined;
  const maybeString = get(schema, 'discriminator.propertyName', undefined);
  if (isString(maybeString)) {
    discriminator = maybeString;
  } else if (maybeString !== undefined) {
    console.warn(
      `Expecting discriminator to be a string, got "${typeof maybeString}" instead`,
    );
  }
  return discriminator;
}
