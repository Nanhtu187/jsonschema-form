import { KeyLabel } from "../../label/key";
import { BaseInputProps } from "../../../../utils/src/types.ts";
import TooltipIcon from "../../icon/tooltipIcon.tsx";
import { ErrorField } from "../../error/errorField.tsx";

export interface InputProps extends BaseInputProps {
  type: string;
}

export const InputField = ({
  label,
  onBlur,
  description,
  name,
  value,
  type,
  onChange,
  errors,
}: InputProps) => {
  return (
    <div key={label} className="flex flex-col space-y-1" onBlur={onBlur}>
      <div className="flex items-center">
        <KeyLabel label={label} />
        {description && <TooltipIcon description={description} />}
      </div>
      <input
        name={name}
        value={value ?? ""}
        type={type}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
      />
      <div>
        {errors &&
          errors.map((error: string, index: number) => (
            <ErrorField error={error} key={index} />
          ))}
      </div>
    </div>
  );
};
