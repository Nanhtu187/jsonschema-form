import { Schema, StrictSchema } from '../types.ts';

export declare function getFormData<T = any, S extends StrictSchema = Schema>(schema: S): T;
