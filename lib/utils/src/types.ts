import { JSONSchema7 } from 'json-schema';


export type GenericObjectType = {
    [name: string]: any;
};
export type StrictSchema = JSONSchema7;

export type Schema = StrictSchema & GenericObjectType;
export interface FormProps<T = any, S extends StrictSchema = Schema> {
    schema: S;
    formData?: T;
}

export type FieldPath = {
    $name: string;
    $schema: Schema
};

export type PathSchema<T = any> = FieldPath & {
    [key in keyof T]?: PathSchema<T[key]>;
};