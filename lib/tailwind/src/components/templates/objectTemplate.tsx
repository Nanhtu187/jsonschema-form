import { z } from "zod";
import { useErrorsAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import { RenderTemplate } from "./renderTemplate";
import React, { useState } from "react";
import _ from "lodash";

export const ObjectTemplate: React.FC<{
  schema: z.ZodObject<any>;
  path: string[];
  liveValidate?: boolean;
  title?: string;
}> = ({ schema, path, liveValidate, title }) => {
  const [errors] = useErrorsAtPath(path);
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
          {schema.description && (
            <small className="block mb-2 text-gray-500 dark:text-gray-400">
              {schema.description}
            </small>
          )}
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
        </div>
      )}
    </div>
  );
};
