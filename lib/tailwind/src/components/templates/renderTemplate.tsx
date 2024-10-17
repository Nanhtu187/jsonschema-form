import React from "react";
import { z } from "zod";
import { RenderTemplateProps } from "./type";
import { useTemplates } from "../..";
import { mapToPrimaryType, resolveSchema } from "@nanhtu/utils";

export const RenderTemplate: React.FC<RenderTemplateProps> = ({
  schema,
  path,
  liveValidate,
}) => {
  const {
    StringTemplate,
    NumberTemplate,
    BooleanTemplate,
    ObjectTemplate,
    ArrayTemplate,
  } = useTemplates();
  const resolvedSchema = mapToPrimaryType(resolveSchema(schema));

  if (
    resolvedSchema instanceof z.ZodString ||
    resolvedSchema instanceof z.ZodDate ||
    resolvedSchema instanceof z.ZodEnum
  ) {
    return (
      <StringTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else if (resolvedSchema instanceof z.ZodNumber) {
    return (
      <NumberTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else if (resolvedSchema instanceof z.ZodBoolean) {
    return (
      <BooleanTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else if (resolvedSchema instanceof z.ZodObject) {
    return (
      <ObjectTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else if (resolvedSchema instanceof z.ZodArray) {
    return (
      <ArrayTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else {
    console.error(
      `Unsupported schema type: ${resolvedSchema._def.typeName} at path: ${path}`,
    );
    return null;
  }
};
