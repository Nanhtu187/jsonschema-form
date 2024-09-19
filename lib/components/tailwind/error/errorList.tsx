import { ErrorField } from "./errorField.tsx";

export interface ErrorListProps {
  errors: string[];
}

export const ErrorList = (props: ErrorListProps) => {
  return (
    <>
      {props.errors.map((error, index) => (
        <ErrorField key={index} error={error} />
      ))}
    </>
  );
};
