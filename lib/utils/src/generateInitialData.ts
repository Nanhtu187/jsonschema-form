import { z, ZodTypeAny } from "zod";

// Utility function to get initial data based on schema type
export const generateInitialData = (schema: ZodTypeAny): any => {
  // Unwrap and resolve defaults within a single function
  while (
    schema._def.typeName === "ZodEffects" ||
    schema._def.typeName === "ZodDefault" ||
    schema._def.typeName === "ZodOptional" ||
    schema._def.typeName === "ZodNullable"
  ) {
    if (schema._def.typeName === "ZodEffects") {
      schema = schema._def.schema;
    } else if (schema._def.typeName === "ZodDefault") {
      return schema._def.defaultValue(); // Return the default value
    } else if (
      schema._def.typeName === "ZodOptional" ||
      schema._def.typeName === "ZodNullable"
    ) {
      schema = schema._def.innerType;
    }
  }

  // Now resolve based on the unwrapped schema type
  if (schema._def.typeName === "ZodString") {
    return undefined;
  } else if (schema._def.typeName === "ZodNumber") {
    return undefined;
  } else if (schema._def.typeName === "ZodBoolean") {
    return undefined;
  } else if (schema._def.typeName === "ZodDate") {
    return undefined;
  } else if (schema._def.typeName === "ZodLiteral") {
    return schema._def.value;
  } else if (schema._def.typeName === "ZodEnum") {
    return undefined; // or schema._def.values[0] if you prefer
  } else if (schema._def.typeName === "ZodArray") {
    return [];
  } else if (schema._def.typeName === "ZodObject") {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(
      (schema as z.ZodObject<any>).shape,
    )) {
      result[key] = generateInitialData(value as ZodTypeAny);
    }
    return result;
  } else {
    console.error(`Unsupported schema type: ${schema._def.typeName}`);
    return undefined;
  }
};
