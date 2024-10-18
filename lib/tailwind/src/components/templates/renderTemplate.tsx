import React from "react";
import { RenderTemplateProps } from "./type";
import { useTemplates } from "../..";
import { mapToPrimaryType, resolveSchema } from "@nanhtu/utils";
import { z } from "zod";

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
    resolvedSchema._def.typeName == z.ZodFirstPartyTypeKind.ZodString ||
    resolvedSchema._def.typeName == z.ZodFirstPartyTypeKind.ZodDate ||
    resolvedSchema._def.typeName == z.ZodFirstPartyTypeKind.ZodEnum
  ) {
    return (
      <StringTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else if (
    resolvedSchema._def.typeName == z.ZodFirstPartyTypeKind.ZodNumber
  ) {
    return (
      <NumberTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else if (
    resolvedSchema._def.typeName == z.ZodFirstPartyTypeKind.ZodBoolean
  ) {
    return (
      <BooleanTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else if (
    resolvedSchema._def.typeName == z.ZodFirstPartyTypeKind.ZodObject
  ) {
    return (
      <ObjectTemplate
        schema={resolvedSchema}
        path={path}
        liveValidate={liveValidate}
      />
    );
  } else if (resolvedSchema._def.typeName == z.ZodFirstPartyTypeKind.ZodArray) {
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
