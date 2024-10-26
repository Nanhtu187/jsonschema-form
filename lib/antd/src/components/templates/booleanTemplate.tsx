import z from "zod";
import { useErrorsAtPath, useFormDataAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React from "react";
import { Checkbox, Form } from "antd";

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
    <Form.Item<boolean>
      label={title}
      wrapperCol={{ flex: 1 }}
      tooltip={schema.description}
      colon={false}
    >
      <Checkbox
        onChange={(e) => setValue(e.target.checked)}
        checked={value}
        onBlur={onBlur}
      />
      {errors && <ErrorsListTemplate errors={errors} />}
    </Form.Item>
  );
};
