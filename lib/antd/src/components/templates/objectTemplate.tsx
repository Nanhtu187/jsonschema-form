import { z } from "zod";
import { useErrorsAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import { RenderTemplate } from "./renderTemplate";
import React, { useState } from "react";
import { Collapse, Form } from "antd";
import _ from "lodash";

const { Panel } = Collapse;
// const { Text } = Typography;

export const ObjectTemplate: React.FC<{
  schema: z.ZodObject<any>;
  path: string[];
  liveValidate?: boolean;
  title?: string;
  isRequired: boolean;
}> = ({ schema, path, liveValidate, title, isRequired }) => {
  const [errors] = useErrorsAtPath(path);
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Form.Item>
      <Collapse activeKey={isOpen ? "1" : undefined} onChange={toggleAccordion}>
        <Panel
          header={
            <Form.Item
              required={isRequired}
              label={title}
              tooltip={schema.description}
              wrapperCol={{ flex: 1 }}
              colon={false}
            />
          }
          key="1"
        >
          {errors && <ErrorsListTemplate errors={errors} />}
          {schema.shape &&
            Object.keys(schema.shape).map((key) => (
              <RenderTemplate
                key={key}
                schema={schema.shape[key]}
                path={[...path, key]}
                liveValidate={liveValidate}
                title={_.startCase(key)}
              />
            ))}
        </Panel>
      </Collapse>
    </Form.Item>
  );
};
