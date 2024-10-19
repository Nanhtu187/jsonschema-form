import { z, ZodTypeAny } from "zod";

// Utility function to get initial data based on schema type
export const generateInitialData = (schema: ZodTypeAny): any => {
  // Unwrap and resolve defaults within a single function
  let ok = true;
  while (ok) {
    switch (schema._def.typeName) {
      case z.ZodFirstPartyTypeKind.ZodEffects:
        schema = schema._def.schema;
        break;
      case z.ZodFirstPartyTypeKind.ZodDefault:
        return schema._def.defaultValue(); // Return the default value
      case z.ZodFirstPartyTypeKind.ZodOptional:
      case z.ZodFirstPartyTypeKind.ZodNullable:
        schema = schema._def.innerType;
        break;
      default:
        ok = false;
        break;
    }
  }

  switch (schema._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodString:
      return undefined;
    case z.ZodFirstPartyTypeKind.ZodNumber:
      return undefined;
    case z.ZodFirstPartyTypeKind.ZodBoolean:
      return undefined;
    case z.ZodFirstPartyTypeKind.ZodDate:
      return undefined;
    case z.ZodFirstPartyTypeKind.ZodLiteral:
      return schema._def.value;
    case z.ZodFirstPartyTypeKind.ZodEnum:
      return undefined; // or schema._def.values[0] if you prefer
    case z.ZodFirstPartyTypeKind.ZodArray:
      return [];
    case z.ZodFirstPartyTypeKind.ZodObject: {
      const result: Record<string, any> = {};
      for (const [key, value] of Object.entries(
        (schema as z.ZodObject<any>).shape,
      )) {
        result[key] = generateInitialData(value as ZodTypeAny);
      }
      return result;
    }
    default:
      console.error(`Unsupported schema type: ${schema._def.typeName}`);
      return undefined;
  }
};
