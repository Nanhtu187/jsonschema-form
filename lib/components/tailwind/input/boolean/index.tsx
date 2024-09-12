// Update the BooleanInput component with CSS classes
import { KeyLabel } from "../../label/key";
import { BaseInputProps } from "../../../../utils/src/types.ts";

export const BooleanInput = (props: BaseInputProps) => {
  return (
    <div key={props.label} className="flex items-center space-x-2">
      <input
        name={props.name}
        type="checkbox"
        checked={props.value}
        onChange={props.onChange}
        className="w-5 h-5 text-blue-500 border border-gray-300 rounded-md focus:ring-blue-500"
      />
      <KeyLabel label={props.label} />
    </div>
  );
};
