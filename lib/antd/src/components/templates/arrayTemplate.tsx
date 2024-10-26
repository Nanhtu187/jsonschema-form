import { z } from "zod";
import { useArrayTemplate, useRenderTemplate } from "../..";
import { generateInitialData } from "@nanhtu/utils";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React, { useState } from "react";
import { Button, Collapse, Tooltip, Typography } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { Text } = Typography;

export const ArrayTemplate: React.FC<{
  schema: z.ZodArray<any>;
  path: string[];
  liveValidate?: boolean;
  title?: string;
}> = ({ schema, path, liveValidate, title }) => {
  const { value, errors, addItem, moveItem, removeItem } = useArrayTemplate(
    path,
    () => generateInitialData(innerSchema),
  );
  const RenderTemplate = useRenderTemplate();
  const innerSchema = schema.element;
  const isValidValue = Array.isArray(value) && value.length > 0;
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
          {isValidValue ? (
            value.map((_, index) => (
              <div key={index}>
                <RenderTemplate
                  schema={innerSchema}
                  path={[...path, index.toString()]}
                  liveValidate={liveValidate}
                  title={title + " " + index.toString()}
                />
                <div>
                  <Button
                    type="link"
                    onClick={() => removeItem(index)}
                    icon={<MinusOutlined />}
                  >
                    Remove Item
                  </Button>
                  <Button
                    type="link"
                    onClick={() => moveItem(index, "up")}
                    icon={<UpOutlined />}
                  >
                    Move Up
                  </Button>
                  <Button
                    type="link"
                    onClick={() => moveItem(index, "down")}
                    icon={<DownOutlined />}
                  >
                    Move Down
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <Text type="secondary">No items available</Text>
          )}
          <div className="mt-2">
            <Button type="dashed" onClick={addItem} icon={<PlusOutlined />}>
              Add Item
            </Button>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
