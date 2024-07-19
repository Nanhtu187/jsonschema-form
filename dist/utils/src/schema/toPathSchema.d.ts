import { PathSchema, Schema, StrictSchema } from '../types.ts';

export declare function toPathSchema<T = any, S extends StrictSchema = Schema>(schema: S, name: string, formData: T): PathSchema<T>;
