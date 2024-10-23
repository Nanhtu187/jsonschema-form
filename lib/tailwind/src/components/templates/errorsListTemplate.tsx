import { z } from "zod";
import React from "react";

export const ErrorsListTemplate: React.FC<{ errors: z.ZodIssue[] }> = ({
  errors,
}) => {
  return errors.map((error, index) => (
    <div key={index} className="text-red-500">
      {error.message}
    </div>
  ));
};
