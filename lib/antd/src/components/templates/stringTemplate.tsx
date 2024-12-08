import z from "zod";
import { useErrorsAtPath, useFormDataAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React from "react";
import { Form, Input } from "antd";

export const StringTemplate: React.FC<{
  schema: z.ZodString | z.ZodDate;
  path: string[];
  liveValidate?: boolean;
  title?: string;
  isRequired: boolean;
}> = ({ schema, path, liveValidate, title, isRequired }) => {
  const [value, setValue] = useFormDataAtPath(path);
  const [errors, setErrorsAtPath] = useErrorsAtPath(path);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (liveValidate) {
      try {
        schema.parse(event.target.value);
        setErrorsAtPath([]);
      } catch (validationErrors) {
        const errors = validationErrors as z.ZodError;
        setErrorsAtPath(errors.issues);
      }
    }
    setValue(event.target.value);

  };

  return (
    <Form.Item<string>
      validateStatus={(errors && errors.length > 0) ? "error" : ""}
      label={title}
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      tooltip={schema.description}
      required={isRequired}
    >
      <Input
        onChange={(e) => onChange(e)}
        value={value || ""}
        type="text"
        placeholder={schema.description || ""}
      />
      {errors && <ErrorsListTemplate errors={errors} />}
    </Form.Item>
  );
};
