import { InputType } from "../../../../utils/enums/input_type.ts";

export interface InputFieldProps {
  defaultValue: string;
  type: InputType;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = (props: InputFieldProps) => {
  return (
    <input
      name={props.name}
      value={props.defaultValue}
      type={props.type}
      onChange={props.onChange}
      className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    />
  );
};
