import {
  createFormProviderAndHooks,
  FormState as CoreFormState,
} from "@nanhtu/utils";
import {
  BaseFormRoot,
  BaseTemplates,
  RenderTemplate as DefaultRenderTemplate,
} from "./components";

const {
  FormProvider,
  useFormContext,
  useFormDataAtPath,
  useErrorsAtPath,
  useArrayTemplate,
  useTemplates,
  useRenderTemplate,
  Form,
} = createFormProviderAndHooks(
  DefaultRenderTemplate,
  BaseFormRoot,
  BaseTemplates,
);

export type FormState = CoreFormState;

export {
  FormProvider,
  useFormContext,
  useFormDataAtPath,
  useErrorsAtPath,
  useArrayTemplate,
  useTemplates,
  useRenderTemplate,
  Form,
};

export * from "./components";
