import React from "react";
import { RenderTemplateProps } from "./type";
import { useTemplates } from "../..";
import { mapToPrimaryType, resolveSchema } from "@nanhtu/utils";
import { z } from "zod";

export const RenderTemplate: React.FC<RenderTemplateProps> = ({
  schema,
  path,
  liveValidate,
  title,
}) => {
  const {
    StringTemplate,
    NumberTemplate,
    BooleanTemplate,
    ObjectTemplate,
    ArrayTemplate,
  } = useTemplates();
  const resolvedSchema = mapToPrimaryType(resolveSchema(schema));
  switch (resolvedSchema._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodString:
    case z.ZodFirstPartyTypeKind.ZodDate:
    case z.ZodFirstPartyTypeKind.ZodEnum:
      return (
        <StringTemplate
          schema={resolvedSchema}
          path={path}
          liveValidate={liveValidate}
          title={title}
        />
      );
    case z.ZodFirstPartyTypeKind.ZodNumber:
      return (
        <NumberTemplate
          schema={resolvedSchema}
          path={path}
          liveValidate={liveValidate}
          title={title}
        />
      );
    case z.ZodFirstPartyTypeKind.ZodBoolean:
      return (
        <BooleanTemplate
          schema={resolvedSchema}
          path={path}
          liveValidate={liveValidate}
          title={title}
        />
      );
    case z.ZodFirstPartyTypeKind.ZodObject:
      return (
        <ObjectTemplate
          schema={resolvedSchema}
          path={path}
          liveValidate={liveValidate}
          title={title}
        />
      );
    case z.ZodFirstPartyTypeKind.ZodArray:
      return (
        <ArrayTemplate
          schema={resolvedSchema}
          path={path}
          liveValidate={liveValidate}
          title={title}
        />
      );
    default:
      console.error(
        `Unsupported schema type: ${resolvedSchema._def.typeName} at path: ${path}`,
      );
      return null;
  }
};
