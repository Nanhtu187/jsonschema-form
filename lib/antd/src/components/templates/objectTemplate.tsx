import { z } from "zod";
import { useErrorsAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import { RenderTemplate } from "./renderTemplate";
import React, { useState } from "react";
import { Collapse, Tooltip, Typography } from "antd";
import _ from "lodash";

const { Panel } = Collapse;
const { Text } = Typography;

export const ObjectTemplate: React.FC<{
  schema: z.ZodObject<any>;
  path: string[];
  liveValidate?: boolean;
  title?: string;
}> = ({ schema, path, liveValidate, title }) => {
  const [errors] = useErrorsAtPath(path);
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Collapse activeKey={isOpen ? "1" : undefined} onChange={toggleAccordion}>
        <Panel
          header={
            title && (
              <Tooltip title={schema.description}>
                <Text strong>{title}</Text>
              </Tooltip>
            )
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
    </div>
  );
};
