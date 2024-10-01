import { JSONSchema7 } from "json-schema";

export type GenericObjectType<T = any> = {
  [name: string]: T;
};
export type StrictSchema = JSONSchema7;
export type Schema = StrictSchema & GenericObjectType;
export type FieldError = string;

export type FieldPath = {
  $name: string;
  $schema: Schema;
};

export type PathSchema<T = any> = FieldPath & {
  [key in keyof T]?: PathSchema<T[key]>;
};

export type ValidationError<T = any> = {
  name?: string;
  message?: string;
  params?: T;
  property?: string;
  schemaPath?: string;
  stack: string;
};

export type ValidationData<T> = {
  errors: ValidationError[];
  errorSchema: ErrorSchema<T>;
};

export type ErrorSchema<T = any> = FieldErrors & {
  [key in keyof T]?: ErrorSchema<T[key]>;
};

export type FieldErrors = {
  __errors?: FieldError[];
};

export interface BaseInputProps<T = any> {
  name: string;
  label: string;
  value: T;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  description?: string;
  errors?: string[];
}
