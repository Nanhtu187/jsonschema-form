import { z } from "zod";
import React from "react";

// this component should render distince error messages
export const ErrorsListTemplate: React.FC<{ errors: z.ZodIssue[] }> = ({
  errors,
}) => {
  const errorMessages: string[] = [];
  errors.forEach((error) => {
    if (!errorMessages.includes(error.message)) {
      errorMessages.push(error.message);
    }
  });
  return errorMessages.map((error, index) => (
    <div key={index} style={{ color: "red" }}>
      {error}
    </div>
  ));
};
