import { z } from "zod";
import { useArrayTemplate, useRenderTemplate } from "../..";
import { generateInitialData } from "@nanhtu/utils";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React from "react";

export const ArrayTemplate: React.FC<{
  schema: z.ZodArray<any>;
  path: string[];
  liveValidate?: boolean;
}> = ({ schema, path, liveValidate }) => {
  const { value, errors, addItem, moveItem, removeItem } = useArrayTemplate(
    path,
    () => generateInitialData(innerSchema),
  );
  const RenderTemplate = useRenderTemplate();
  const innerSchema = schema.element;

  return (
    <div>
      {errors && <ErrorsListTemplate errors={errors} />}
      {Array.isArray(value) && value.length > 0 ? (
        value.map((_, index) => (
          <div key={index}>
            <RenderTemplate
              schema={innerSchema}
              path={[...path, index.toString()]}
              liveValidate={liveValidate}
            />
            <button onClick={() => removeItem(index)}>Remove Item</button>
            <button onClick={() => moveItem(index, "up")}>Move Up</button>
            <button onClick={() => moveItem(index, "down")}>Move Down</button>
          </div>
        ))
      ) : (
        <div>No items available</div>
      )}
      <div>
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};
