import { createContext } from "react";
import { z } from "zod";

export interface FormState {
  schema: z.ZodTypeAny;
  formData: any;
  errors: z.ZodIssue[] | null;
  readonly: boolean;
  setFormData: (path: string[], value: any) => void;
  setErrors: (errors: z.ZodIssue[] | null) => void;
  setReadonly: (readonly: boolean) => void;
}

export type FormProps = {
  schema: z.ZodTypeAny;
  initialData?: { [key: string]: unknown };
  onSubmit?: (data: { [key: string]: unknown }) => void;
  onError?: (errors: z.ZodIssue[], data?: { [key: string]: unknown }) => void;
  templates?: { [key: string]: React.ComponentType<any> };
  formRoot?: React.FC<FormRootProps>;
  readonly?: boolean;
  renderTemplate?: React.ComponentType<RenderTemplateProps>;
};

export type FormRootProps = {
  onSubmit: (data: { [key: string]: unknown }) => void;
  onError: (errors: z.ZodIssue[], data?: { [key: string]: unknown }) => void;
};

export interface RenderTemplateProps {
  schema: z.ZodTypeAny;
  path: string[];
  liveValidate?: boolean;
}

export interface FormProviderProps {
  initialData?: any;
  schema: z.ZodTypeAny;
  children: React.ReactNode;
  createInitialData: (schema: z.ZodTypeAny) => any;
  templates?: { [key: string]: React.ComponentType<any> };
  readonly?: boolean;
  renderTemplate?: React.ComponentType<RenderTemplateProps>;
}

export const TemplatesContext = createContext<{
  [key: string]: React.ComponentType<any>;
} | null>(null);

export const RenderTemplateContext =
  createContext<React.ComponentType<RenderTemplateProps> | null>(null);
