import z from "zod";
import { useErrorsAtPath, useFormDataAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React from "react";
import { Form, Input } from "antd";

export const NumberTemplate: React.FC<{
  schema: z.ZodNumber;
  path: string[];
  liveValidate?: boolean;
  title?: string;
  isRequired: boolean;
}> = ({ schema, path, liveValidate, title, isRequired }) => {
  const [value, setValue] = useFormDataAtPath(path);
  const [errors, setErrorsAtPath] = useErrorsAtPath(path);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (liveValidate) {
      try {
        schema.parse(Number(e.target.value));
        setErrorsAtPath([]);
      } catch (validationErrors) {
        const errors = validationErrors as z.ZodError;
        setErrorsAtPath(errors.issues);
      }
    }
    setValue(e.target.value ? Number(e.target.value) : null)
  };

  return (
    <Form.Item<number>
      label={title}
      validateStatus={(errors && errors.length > 0) ? "error" : ""}
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      tooltip={schema.description}
      required={isRequired}
    >
      <Input
        onChange={(e) => onChange(e)}
        value={value || ""}
        type="number"
        placeholder={schema.description || ""}
      />
      {/*{schema.description && <small>{schema.description}</small>}*/}
      {errors && <ErrorsListTemplate errors={errors} />}
    </Form.Item>
  );
};
