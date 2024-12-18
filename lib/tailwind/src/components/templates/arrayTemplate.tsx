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
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between p-2 border-b cursor-pointer"
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
        <div className="p-2 mt-2 border rounded-md">
          {errors && <ErrorsListTemplate errors={errors} />}
          {isValidValue ? (
            value.map((_, index) => (
              <div key={index} className="p-2 mb-2 border rounded-md">
                <RenderTemplate
                  schema={innerSchema}
                  path={[...path, index.toString()]}
                  liveValidate={liveValidate}
                  title={title + " " + index.toString()}
                />
                <div className="flex mt-2 space-x-2">
                  <button
                    onClick={() => removeItem(index)}
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Remove Item
                  </button>
                  {index > 0 && (
                    <button
                      onClick={() => moveItem(index, "up")}
                      className="px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                      Move Up
                    </button>
                  )}
                  {index < value.length - 1 && (
                    <button
                      onClick={() => moveItem(index, "down")}
                      className="px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                      Move Down
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No items available</div>
          )}
          <div className="mt-2">
            <button
              onClick={addItem}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
