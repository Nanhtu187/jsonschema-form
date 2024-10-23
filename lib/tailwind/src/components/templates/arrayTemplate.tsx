import { z } from "zod";
import { useArrayTemplate, useRenderTemplate } from "../..";
import { generateInitialData } from "@nanhtu/utils";
import { ErrorsListTemplate } from "./errorsListTemplate";
import React, { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex justify-between items-center cursor-pointer p-2 border-b"
        onClick={toggleAccordion}
      >
        {title && (
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            {title}
          </label>
        )}
        <button className="text-gray-500 dark:text-gray-400">
          {isOpen ? "▲" : "▼"}
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 p-2 border rounded-md">
          {errors && <ErrorsListTemplate errors={errors} />}
          {isValidValue ? (
            value.map((_, index) => (
              <div key={index} className="mb-2 p-2 border rounded-md">
                <RenderTemplate
                  schema={innerSchema}
                  path={[...path, index.toString()]}
                  liveValidate={liveValidate}
                  title={title + " " + index.toString()}
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => removeItem(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove Item
                  </button>
                  <button
                    onClick={() => moveItem(index, "up")}
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Move Up
                  </button>
                  <button
                    onClick={() => moveItem(index, "down")}
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Move Down
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No items available</div>
          )}
          <div className="mt-2">
            <button
              onClick={addItem}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
