import { NUMBER_TYPE, STRING_TYPE } from "../src/constants";
import { InputType } from "../enums/input_type";
import { InputField } from "../../components/tailwind/input/input_field";
import { BooleanInput } from "../../components/tailwind/input/boolean";

export const GetTailwindInputComponent = (
  type: string,
  name: string,
  key: string,
  formData: any,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
): JSX.Element => {
  if (type === NUMBER_TYPE || type === STRING_TYPE) {
    return (
      <InputField
        name={name}
        label={key}
        defaultValue={formData}
        onChange={handleInputChange}
        type={type as InputType}
      />
    );
  } else {
    return (
      <BooleanInput
        name={name}
        label={key}
        defaultValue={formData as boolean} // Assuming formData is a string representation of a boolean
        onChange={handleInputChange}
      />
    );
  }
};
