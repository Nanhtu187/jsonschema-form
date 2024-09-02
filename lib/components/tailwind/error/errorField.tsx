export interface ErrorFieldProps {
  error: string;
}

export const ErrorField = ({ error }: ErrorFieldProps) => {
  return <div className={"text-red-500 text-sm"}>{error}</div>;
};
