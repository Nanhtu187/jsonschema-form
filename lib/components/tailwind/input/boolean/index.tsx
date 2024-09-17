// Update the BooleanInput component with CSS classes
import { KeyLabel } from "../../label/key";
import { BaseInputProps } from "../../../../utils/src/types.ts";
import TooltipIcon from "../../icon/tooltipIcon.tsx";

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
      <div className="flex items-center">
        <KeyLabel label={props.label} />
        {props.description && <TooltipIcon description={props.description} />}
      </div>
    </div>
  );
};
