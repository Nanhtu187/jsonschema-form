import { KeyLabel } from "../../label/key";
import { BaseInputProps } from "../../../../utils/src/types.ts";
import TooltipIcon from "../../icon/tooltipIcon.tsx";

export interface InputProps extends BaseInputProps {
  type: string;
}

export const InputField = (props: InputProps) => {
  return (
    <div key={props.label} className="flex flex-col space-y-1">
      <div className="flex items-center">
        <KeyLabel label={props.label} />
        {props.description && <TooltipIcon description={props.description} />}
      </div>
      <input
        name={props.name}
        value={props.value ?? ""}
        type={props.type}
        onChange={props.onChange}
        className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
      />
    </div>
  );
};
