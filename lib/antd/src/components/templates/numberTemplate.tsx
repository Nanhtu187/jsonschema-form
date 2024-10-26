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
}> = ({ schema, path, liveValidate, title }) => {
  const [value, setValue] = useFormDataAtPath(path);
  const [errors, setErrorsAtPath] = useErrorsAtPath(path);
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (liveValidate) {
      try {
        schema.parse(Number(event.target.value));
        setErrorsAtPath([]);
      } catch (validationErrors) {
        const errors = validationErrors as z.ZodError;
        setErrorsAtPath(errors.issues);
      }
    }
  };

  return (
    <Form.Item<string>
      label={title}
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      tooltip={schema.description}
    >
      <Input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value || ""}
        type="number"
        placeholder={schema.description || ""}
        onBlur={onBlur}
      />
      {/*{schema.description && <small>{schema.description}</small>}*/}
      {errors && <ErrorsListTemplate errors={errors} />}
    </Form.Item>
  );
};
