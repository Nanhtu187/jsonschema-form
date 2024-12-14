import {
  FormProps,
  FormProviderProps,
  FormRootProps,
  FormState,
  RenderTemplateContext,
  RenderTemplateProps,
  TemplatesContext,
} from "./type";
import { createFormStore, FormContext, FormStore } from "./FormStore";
import React, { useContext, useRef } from "react";
import { getErrorsAtPath, setErrorsAtPath } from "./getErrorAtPath";
import { generateInitialData } from "./generateInitialData";
import { z } from "zod";
import { useStore } from "zustand";

export const createFormProviderAndHooks = (
  BaseRenderTemplate: React.ComponentType<RenderTemplateProps>,
  BaseFormRoot?: React.FC<FormRootProps>,
  BaseTemplates?: { [key: string]: React.ComponentType<any> },
) => {
  const FormProvider: React.FC<
    Omit<FormProviderProps, "createInitialData">
  > = ({
    initialData = {},
    schema,
    children,
    templates = BaseTemplates,
    renderTemplate = BaseRenderTemplate,
    readonly = false,
  }) => {
      const storeRef = useRef<FormStore>();
      if (!storeRef.current) {
        storeRef.current = createFormStore(
          initialData,
          schema,
          readonly,
          generateInitialData,
        );
      }

      if (!templates) {
        console.error("No template provided");
        return <div>No template provided</div>;
      }

      return (
        <FormContext.Provider value={storeRef.current}>
          <TemplatesContext.Provider value={templates}>
            <RenderTemplateContext.Provider value={renderTemplate}>
              {children}
            </RenderTemplateContext.Provider>
          </TemplatesContext.Provider>
        </FormContext.Provider>
      );
    };

  const useFormContext = <T,>(selector: (state: FormState) => T): T => {
    const store = useContext(FormContext);
    if (!store) {
      throw new Error("useFormContext must be used within a FormProvider");
    }
    return useStore(store, selector);
  };

  const useFormDataAtPath = (
    path: string[],
    defaultOnNull: unknown = null,
  ): [any, (value: any) => void] => {
    const formData = useFormContext((state) => state.formData);
    const value =
      path.reduce((acc, key) => (acc ?? {})[key], formData) ?? defaultOnNull;
    const setFormData = useFormContext((state) => state.setFormData);
    const setValue = (value: any) => setFormData(path, value);
    return [value, setValue];
  };

  const useErrorsAtPath = (
    path: string[],
  ): [z.ZodIssue[] | undefined, (value: z.ZodIssue[]) => void] => {
    const errors = useFormContext((state) => state.errors);
    const setErrors = useFormContext((state) => state.setErrors);
    return [
      getErrorsAtPath(errors ?? [], path),
      (newErrors: z.ZodIssue[]) =>
        setErrorsAtPath(errors ?? [], path, setErrors, newErrors),
    ];
  };

  const useArrayTemplate = (
    path: string[],
    zeroState: () => any,
    defaultOnNull: unknown = null,
  ) => {
    const [value, setValue] = useFormDataAtPath(path, defaultOnNull);

    const [errors] = useErrorsAtPath(path);

    const moveItem = (index: number, direction: "up" | "down") => {
      const newArray = [...value];
      const [movedItem] = newArray.splice(index, 1);
      newArray.splice(direction === "up" ? index - 1 : index + 1, 0, movedItem);
      setValue(newArray);
    };

    const removeItem = (index: number) => {
      const newArray = [...value];
      newArray.splice(index, 1);
      setValue(newArray);
    };

    const addItem = () => {
      setValue([...value, zeroState()]);
    };

    return {
      value,
      errors,
      moveItem,
      removeItem,
      addItem,
    };
  };

  const useTemplates = () => {
    const templates = useContext(TemplatesContext);
    if (!templates) {
      console.error(
        "TemplatesContext is missing. Ensure you are within a FormProvider with templates provided.",
      );
      throw new Error(
        "useTemplates must be used within a FormProvider with templates provided",
      );
    }
    return templates;
  };

  const useRenderTemplate = (): React.ComponentType<RenderTemplateProps> => {
    const renderTemplate = useContext(RenderTemplateContext);
    if (!renderTemplate) {
      console.error(
        "RenderTemplateContext is missing. Ensure you are within a FormProvider with renderTemplate provided.",
      );
      throw new Error(
        "useRenderTemplate must be used within a FormProvider with renderTemplate provided",
      );
    }
    return renderTemplate;
  };

  const Form: React.FC<FormProps> = ({
    schema,
    initialData = {},
    onSubmit = (data) =>
      console.warn(
        "This is a default `onSubmit` function. You should override this if you want to do something with the form data.",
        data,
      ),
    onError = (errors, data) =>
      console.error(
        "This is a default `onError` function. You should override this if you want to do something with the form errors.",
        errors,
        data,
      ),
    templates = BaseTemplates,
    formRoot: FormRoot = BaseFormRoot,
    readonly = false,
    renderTemplate = BaseRenderTemplate,
    liveValidate = false,
  }) => {
    if (!FormRoot) {
      console.error(
        "FormRoot is missing. Please provide a base FormRoot component.",
      );
      return (
        <div>
          FormRoot is missing. Please provide a base FormRoot component.
        </div>
      );
    }

    if (!templates) {
      console.error("Templates are missing. Please provide base Templates.");
      return <div>Templates are missing. Please provide base Templates.</div>;
    }

    if (!renderTemplate) {
      console.error(
        "RenderTemplate component is missing. Please provide a base RenderTemplate.",
      );
      return (
        <div>
          RenderTemplate component is missing. Please provide a base
          RenderTemplate.
        </div>
      );
    }

    return (
      <FormProvider
        schema={schema}
        initialData={initialData}
        templates={templates}
        readonly={readonly}
        renderTemplate={renderTemplate}
      >
        <FormRoot
          onSubmit={onSubmit}
          onError={onError}
          liveValidate={liveValidate}
        />
      </FormProvider>
    );
  };

  return {
    FormProvider,
    useFormContext,
    useFormDataAtPath,
    useErrorsAtPath,
    useArrayTemplate,
    useTemplates,
    useRenderTemplate,
    Form,
  };
};
