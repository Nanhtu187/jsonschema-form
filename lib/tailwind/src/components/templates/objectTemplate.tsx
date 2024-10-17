import { z } from "zod";
import { useErrorsAtPath } from "../..";
import { ErrorsListTemplate } from "./errorsListTemplate";
import { RenderTemplate } from "./renderTemplate";
import React from "react";

export const ObjectTemplate: React.FC<{
  schema: z.ZodObject<any>;
  path: string[];
  liveValidate?: boolean;
}> = ({ schema, path, liveValidate }) => {
  const [errors] = useErrorsAtPath(path);

  return (
    <div>
      {schema.description && <small>{schema.description}</small>}
      {errors && <ErrorsListTemplate errors={errors} />}
      {schema.shape &&
        Object.keys(schema.shape).map((key) => (
          <RenderTemplate
            key={key}
            schema={schema.shape[key]}
            path={[...path, key]}
            liveValidate={liveValidate}
          />
        ))}
    </div>
  );
};
