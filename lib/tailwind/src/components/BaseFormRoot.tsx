import { resolveSchema } from "@nanhtu/utils";
import z from "zod";
import { FormRootProps } from "./templates";
import { FormState, useFormContext, useRenderTemplate } from "..";
import React, { useMemo } from "react";

export const BaseFormRoot: React.FC<FormRootProps> = ({
  onSubmit,
  onError,
  liveValidate,
}) => {
  // const readonly = useFormContext((state: FormState) => state.readonly);
  const { schema, formData, setErrors } = useFormContext(
    (state: FormState) => state,
  );
  const RenderTemplate = useRenderTemplate();

  const resolvedSchema = useMemo(() => resolveSchema(schema), [schema]);

  // if (readonly) {
  //   return (
  //     <div>
  //       {isObjectSchema(resolvedSchema) &&
  //         Object.keys(resolvedSchema.shape).map((key) => (
  //           <RenderTemplate
  //             key={key}
  //             schema={resolvedSchema.shape[key]}
  //             path={[key]}
  //           />
  //         ))}
  //     </div>
  //   );
  // }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      resolvedSchema.parse(formData);
      setErrors(null);
      onSubmit(formData);
    } catch (validationErrors) {
      const zodErrors = validationErrors as z.ZodError;
      setErrors(zodErrors.issues);
      onError(zodErrors.issues, formData);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {isObjectSchema(resolvedSchema) &&
        Object.keys(resolvedSchema.shape).map((key) => (
          <RenderTemplate
            key={key}
            schema={resolvedSchema.shape[key]}
            path={[key]}
            liveValidate={liveValidate}
          />
        ))}
      <button type="submit">Submit</button>
    </form>
  );
};

const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
  return (
    resolveSchema(schema)._def.typeName === z.ZodFirstPartyTypeKind.ZodObject
  );
};
