// Update the InputField component with CSS classes
import { InputType } from "../../../../utils/enums/input_type.ts";
import { KeyLabel } from "../../label/key";

export interface InputFieldProps {
  defaultValue: string;
  type: InputType;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = (props: InputFieldProps) => {
  return (
    <div key={props.label} className="flex flex-col space-y-1">
      <KeyLabel label={props.label} />
      <input
        name={props.name}
        value={props.defaultValue}
        type={props.type}
        onChange={props.onChange}
        className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
      />
    </div>
  );
};
