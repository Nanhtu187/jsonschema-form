import { INTEGER_TYPE, NUMBER_TYPE } from "../src/constants";
import { InputField } from "../../components/tailwind/input/input_field";

export const GetTailwindInputComponent = (
  type: string,
  name: string,
  key: string,
  formData: any,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
  description?: string,
  errors?: string[],
) => {
  switch (type) {
    case NUMBER_TYPE:
    case INTEGER_TYPE:
      return (
        <InputField
          name={name}
          label={key}
          value={formData}
          type={"number"}
          onChange={handleInputChange}
          onBlur={onBlur}
          description={description}
          errors={errors}
        />
      );
    default:
      return (
        <InputField
          name={name}
          label={key}
          value={formData}
          type={"text"}
          onChange={handleInputChange}
          onBlur={onBlur}
          description={description}
          errors={errors}
        />
      );
  }
};
