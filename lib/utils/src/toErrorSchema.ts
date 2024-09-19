import { ErrorSchema, ValidationError } from "./types.ts";
import { toPath } from "lodash";
import ErrorSchemaBuilder from "./ErrorSchemaBuilder.ts";

export default function toErrorSchema<T = any>(
  errors: ValidationError[],
): ErrorSchema<T> {
  const builder = new ErrorSchemaBuilder<T>();
  if (errors.length) {
    errors.forEach((error) => {
      const { property, message } = error;
      // When the property is the root element, just use an empty array for the path
      const path = property === "." ? [] : toPath(property);
      // If the property is at the root (.level1) then toPath creates
      // an empty array element at the first index. Remove it.
      if (path.length > 0 && path[0] === "") {
        path.splice(0, 1);
      }
      if (message) {
        builder.addErrors(message, path);
      }
    });
  }
  return builder.ErrorSchema;
}
