import { z } from "zod";

export type FormProps = {
  schema: z.ZodObject<any>;
  initialData?: { [key: string]: unknown };
  onSubmit?: (data: { [key: string]: unknown }) => void;
  onError?: (errors: z.ZodIssue[], data?: { [key: string]: unknown }) => void;
  templates?: Templates;
  formRoot?: React.FC<FormRootProps>;
  readonly?: boolean;
};

export type FormRootProps = {
  onSubmit: (data: { [key: string]: unknown }) => void;
  onError: (errors: z.ZodIssue[], data?: { [key: string]: unknown }) => void;
  liveValidate?: boolean;
};

export type Templates = {
  StringTemplate: React.FC<{
    schema: z.ZodString | z.ZodDate;
    path: string[];
    liveValidate?: boolean;
  }>;
  NumberTemplate: React.FC<{
    schema: z.ZodNumber;
    path: string[];
    liveValidate?: boolean;
  }>;
  BooleanTemplate: React.FC<{
    schema: z.ZodBoolean;
    path: string[];
    liveValidate?: boolean;
  }>;
  ObjectTemplate: React.FC<{
    schema: z.ZodObject<any>;
    path: string[];
    liveValidate?: boolean;
  }>;
  ArrayTemplate: React.FC<{
    schema: z.ZodArray<any>;
    path: string[];
    liveValidate?: boolean;
  }>;
};

export interface RenderTemplateProps {
  schema: z.ZodTypeAny;
  path: string[];
  liveValidate?: boolean;
  title?: string;
}
