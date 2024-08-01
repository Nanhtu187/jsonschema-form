import { Schema, StrictSchema } from './types.ts';

export function getClosestMatchingOption<
  T = any,
  S extends StrictSchema = Schema,
>(
  formData: T,
  options: S[],
  index: number,
  discriminator: string | undefined,
): number {
  if (discriminator === undefined) {
    return index;
  }
  if (formData === undefined || options === undefined || options.length === 0) {
    return index;
  }
  return 1;
}
