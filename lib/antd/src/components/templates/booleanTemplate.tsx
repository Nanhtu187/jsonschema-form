import z from "zod";
import { useErrorsAtPath, useFormDataAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React from "react";
import { Checkbox, Form } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export const BooleanTemplate: React.FC<{
  schema: z.ZodBoolean;
  path: string[];
  liveValidate?: boolean;
  title?: string;
}> = ({ schema, path, liveValidate, title }) => {
  const [value, setValue] = useFormDataAtPath(path);
  const [errors, setErrorsAtPath] = useErrorsAtPath(path);
  const onChange = (event: CheckboxChangeEvent) => {
    if (liveValidate) {
      try {
        schema.parse(event.target.checked);
        setErrorsAtPath([]);
      } catch (validationErrors) {
        const errors = validationErrors as z.ZodError;
        setErrorsAtPath(errors.issues);
      }
    }
    setValue(event.target.checked)
  };

  return (
    <Form.Item<boolean>
      label={title}
      wrapperCol={{ flex: 1 }}
      tooltip={schema.description}
      colon={false}
    >
      <Checkbox
        onChange={(e) => onChange(e)}
        checked={value}
      />
      {errors && <ErrorsListTemplate errors={errors} />}
    </Form.Item>
  );
};
