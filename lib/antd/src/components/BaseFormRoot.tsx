import { resolveSchema } from "@nanhtu/utils";
import z from "zod";
import { FormRootProps } from "./templates";
import { FormState, useFormContext, useRenderTemplate } from "..";
import React, { useMemo } from "react";
import _ from "lodash";
import { Button, Form } from "antd";

export const BaseFormRoot: React.FC<FormRootProps> = ({
  onSubmit,
  onError,
  liveValidate,
}) => {
  const { schema, formData, setErrors } = useFormContext(
    (state: FormState) => state,
  );
  const RenderTemplate = useRenderTemplate();

  const resolvedSchema = useMemo(() => resolveSchema(schema), [schema]);

  const handleSubmit = () => {
    try {
      resolvedSchema.parse(formData);
      setErrors(null);
      onSubmit(formData);
    } catch (validationErrors) {
      const zodErrors = validationErrors as z.ZodError;
      setErrors(zodErrors.issues);
      onError(zodErrors.issues, formData);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      {isObjectSchema(resolvedSchema) &&
        Object.keys(resolvedSchema.shape).map((key) => {
          return (
            <RenderTemplate
              key={key}
              schema={resolvedSchema.shape[key]}
              path={[key]}
              liveValidate={liveValidate}
              title={_.startCase(key)}
            />
          );
        })}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
  return (
    resolveSchema(schema)._def.typeName === z.ZodFirstPartyTypeKind.ZodObject
  );
};
