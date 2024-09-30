import { INTEGER_TYPE, NUMBER_TYPE } from "../src/constants";
import { InputField } from "../../components/tailwind/input/input_field";

export const GetTailwindInputComponent = (
  type: string,
  name: string,
  key: string,
  formData: any,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  description?: string,
  errors?: string[],
): JSX.Element => {
  if (type === NUMBER_TYPE || type === INTEGER_TYPE) {
    return (
      <InputField
        name={name}
        label={key}
        value={formData}
        type={"number"}
        onChange={handleInputChange}
        description={description}
        errors={errors}
      />
    );
  } else {
    return (
      <InputField
        name={name}
        label={key}
        value={formData}
        type={"text"}
        onChange={handleInputChange}
        description={description}
        errors={errors}
      />
    );
  }
};
