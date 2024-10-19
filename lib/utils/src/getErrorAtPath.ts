import { z } from "zod";

export const getErrorsAtPath = (
  errors: z.ZodIssue[],
  path: string[],
): z.ZodIssue[] | undefined => {
  const errorMap: { [key: string]: z.ZodIssue[] } = {};

  // Normalize the error paths to handle array indices
  const normalizePath = (path: string): string => {
    return path.replace(/\[(\d+)\]/g, ".$1");
  };

  errors.forEach((error) => {
    const fullPath = normalizePath(error.path.join("."));
    errorMap[fullPath] = errorMap[fullPath] || [];
    errorMap[fullPath].push(error);
  });

  const fullPath = path.join(".");
  return errorMap[fullPath] || [];
};

export const setErrorsAtPath = (
  errors: z.ZodIssue[],
  path: string[],
  setErrors: (errors: z.ZodIssue[] | null) => void,
  newErrors: z.ZodIssue[],
) => {
  // Normalize the error paths to handle array indices
  const normalizePath = (path: string): string => {
    return path.replace(/\[(\d+)\]/g, ".$1");
  };
  const fullPath = path.join(".");
  newErrors.forEach((e) => (e.path = path));
  newErrors = [
    ...errors.filter((e) => normalizePath(e.path.join(".")) !== fullPath),
    ...newErrors,
  ];

  setErrors(newErrors);
};
