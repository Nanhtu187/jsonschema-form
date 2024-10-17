import z from "zod";
import { useErrorsAtPath, useFormDataAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React from "react";

export const BooleanTemplate: React.FC<{
  schema: z.ZodBoolean;
  path: string[];
  liveValidate?: boolean;
}> = ({ schema, path, liveValidate }) => {
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
    <div>
      <input
        onChange={(e) => setValue(e.target.checked)}
        checked={value}
        type="checkbox"
        placeholder={schema.description || ""}
        onBlur={onBlur}
      />
      {schema.description && <small>{schema.description}</small>}
      {errors && <ErrorsListTemplate errors={errors} />}
    </div>
  );
};
