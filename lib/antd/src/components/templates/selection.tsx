import React, { useState } from "react";
import { z } from "zod";
import {
  RenderTemplate,
  useFormDataAtPath,
} from "../../index";
import { Form, Select } from "antd";

export const SelectionTemplate: React.FC<{
  schema: z.ZodUnion<any>;
  path: string[];
  liveValidate?: boolean;
  title?: string;
  isRequired: boolean;
}> = ({
  schema,
  path,
  liveValidate,
  title,
}) => {
    const innerSchemas: z.ZodTypeAny[] = schema._def.options;
    const [value, setValue] = useFormDataAtPath(path);
    const [currentSchema, setCurrentSchema] = useState(innerSchemas[0]);
    const [currentOption, setCurrentOption] = useState(0);

    if (isEnum(innerSchemas)) {
      return (
        <Form.Item
          label={title}
          layout="vertical"
          wrapperCol={{ flex: 1 }}
          tooltip={schema.description}
        >
          <Select
            showSearch
            optionFilterProp={"label"}
            onSelect={(_, val) => {
              setValue(val.label);
            }}
            value={value || ""}
            placeholder={schema.description || ""}
            options={innerSchemas.map((innerSchema) => ({
              value: innerSchema._def.value,
              label: innerSchema._def.value,
            }))}
          />
        </Form.Item>
      );
    }

    return (
      <Form.Item
        label={title}
        layout="vertical"
        wrapperCol={{ flex: 1 }}
        tooltip={schema.description}

      >
        <Select
          onSelect={(_, val) => {
            setValue(undefined);
            setCurrentOption(val.value);
            setCurrentSchema(innerSchemas[val.value]);
          }}
          value={`Option ${currentOption + 1}`}
          placeholder={schema.description || ""}
          options={innerSchemas.map((_, index) => ({
            value: index,
            label: `Option ${index + 1}`,
          }))}
        />
        {/* {errors && <ErrorsListTemplate errors={errors} />} */}
        <RenderTemplate
          schema={currentSchema}
          path={path}
          liveValidate={liveValidate}
        />
      </Form.Item>
    );
  };

const isEnum = (schemas: z.ZodTypeAny[]): boolean => {
  return schemas.every(
    (schema) => schema._def.typeName === z.ZodFirstPartyTypeKind.ZodLiteral,
  );
};
