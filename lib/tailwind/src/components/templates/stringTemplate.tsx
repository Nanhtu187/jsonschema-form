import z from "zod";
import { useErrorsAtPath, useFormDataAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React from "react";

export const StringTemplate: React.FC<{
  schema: z.ZodString | z.ZodDate;
  path: string[];
  liveValidate?: boolean;
  title?: string;
  isRequired?: boolean;
}> = ({ schema, path, liveValidate, title, isRequired }) => {
  const [value, setValue] = useFormDataAtPath(path);
  const [errors, setErrorsAtPath] = useErrorsAtPath(path);
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (liveValidate) {
      try {
        schema.parse(event.target.value);
        setErrorsAtPath([]);
      } catch (validationErrors) {
        const errors = validationErrors as z.ZodError;
        setErrorsAtPath(errors.issues);
      }
    }
  };

  return (
    <div className="mb-4">
      {title && (
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          <span>{title}</span>
          {isRequired && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value || ""}
        type="text"
        placeholder={schema.description || ""}
        onBlur={onBlur}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      {schema.description && (
        <small className="text-gray-500 dark:text-gray-400">
          {schema.description}
        </small>
      )}
      {errors && <ErrorsListTemplate errors={errors} />}
    </div>
  );
};
