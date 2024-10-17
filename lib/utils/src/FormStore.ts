import { FormState } from "./type";
import { createStore, StateCreator } from "zustand";
import { createContext } from "react";
import { z } from "zod";

export const createFormStore = (
  initialData: any,
  schema: z.ZodTypeAny,
  readonly: boolean,
  createInitialData: (schema: z.ZodTypeAny) => any,
) => {
  const formData = {
    ...createInitialData(schema),
    ...initialData,
  };

  const stateCreator: StateCreator<FormState> = (set) => ({
    schema: schema,
    formData: formData,
    errors: null,
    readonly: readonly || false,
    setFormData: (path, value) =>
      set((state) => {
        const target = { ...state.formData };
        let current = target;

        path.slice(0, -1).forEach((key) => {
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        });

        current[path[path.length - 1]] = value;

        return { formData: target };
      }),
    setErrors: (errors) => set({ errors }),
    setReadonly: (readonly) => set({ readonly }),
  });
  return createStore(stateCreator);
};

export type FormStore = ReturnType<typeof createFormStore>;

export const FormContext = createContext<FormStore | null>(null);
