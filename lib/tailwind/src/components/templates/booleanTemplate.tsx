import z from "zod";
import { useErrorsAtPath, useFormDataAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React from "react";

export const BooleanTemplate: React.FC<{
  schema: z.ZodBoolean;
  path: string[];
  liveValidate?: boolean;
  title?: string;
}> = ({ schema, path, liveValidate, title }) => {
  const [value, setValue] = useFormDataAtPath(path);
  const [errors, setErrorsAtPath] = useErrorsAtPath(path);
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (liveValidate) {
      try {
        schema.parse(event.target.checked);
        setErrorsAtPath([]);
      } catch (validationErrors) {
        const errors = validationErrors as z.ZodError;
        setErrorsAtPath(errors.issues);
      }
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        {title && (
          <label className="block mr-2 text-sm font-medium text-gray-700 dark:text-white">
            {title}
          </label>
        )}
        <input
          onChange={(e) => setValue(e.target.checked)}
          checked={value}
          type="checkbox"
          onBlur={onBlur}
          className="w-5 h-5 text-blue-600 form-checkbox"
        />
      </div>
      {schema.description && (
        <small className="text-gray-500 dark:text-gray-400">
          {schema.description}
        </small>
      )}
      {errors && <ErrorsListTemplate errors={errors} />}
    </div>
  );
};
