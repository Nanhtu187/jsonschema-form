import { useEffect, useState } from "react";
import { toPathSchema } from "../../utils/src/schema/toPathSchema.ts";
import {
  ARRAY_TYPE,
  BOOLEAN_TYPE,
  NAME_KEY,
  NUMBER_TYPE,
  OBJECT_TYPE,
  SCHEMA_KEY,
  STRING_TYPE,
} from "../../utils/src/constants.ts";
import { get, set } from "lodash";
import {
  FormProps,
  PathSchema,
  StrictSchema,
  Schema,
} from "../../utils/src/types.ts";
import { getFormData } from "../../utils/src/schema/loadFormData.ts";
import { InputField } from "../tailwind/input/input_field";
import { InputType } from "../../utils/enums/input_type.ts";
import { Button } from "../tailwind/button/button";
import { KeyLabel } from "../tailwind/label/key";
import { Submit } from "../tailwind/input/submit";
import { BooleanInput } from "../tailwind/input/boolean";

function buildFormFromPathSchema<T = any, S extends StrictSchema = Schema>(
  pathSchema: PathSchema<T>,
  formData: T,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleAddField: (
    event: React.MouseEvent<HTMLButtonElement>,
    key: string,
    schema: S,
  ) => void,
  level: number,
) {
  return (
    <div>
      {pathSchema[SCHEMA_KEY].type === NUMBER_TYPE ||
      pathSchema[SCHEMA_KEY].type === STRING_TYPE ? (
        <InputField
          name={pathSchema[NAME_KEY].substring(1)}
          defaultValue={formData as string}
          onChange={handleInputChange}
          type={pathSchema[SCHEMA_KEY].type as InputType}
        />
      ) : pathSchema[SCHEMA_KEY].type === BOOLEAN_TYPE ? (
        <BooleanInput
          name={pathSchema[NAME_KEY].substring(1)}
          defaultValue={formData as boolean}
          onChange={handleInputChange}
        />
      ) : (
        <>
          {Object.keys(pathSchema).map((key) => {
            if (key === NAME_KEY || key == SCHEMA_KEY) {
              return null;
            }
            if (
              typeof get(pathSchema, [key]) === OBJECT_TYPE &&
              formData &&
              get(formData, [key]) !== undefined
            ) {
              return (
                <div key={key} style={{ marginLeft: `${level * 10}px` }}>
                  <KeyLabel label={key} />
                  <br />
                  {buildFormFromPathSchema(
                    get(pathSchema, [key]),
                    get(formData, [key]),
                    handleInputChange,
                    handleAddField,
                    level + 1,
                  )}
                </div>
              );
            }
            return null;
          })}
          {pathSchema[SCHEMA_KEY].type == ARRAY_TYPE && (
            <Button
              onClick={(event) =>
                handleAddField(
                  event,
                  pathSchema[NAME_KEY],
                  pathSchema[SCHEMA_KEY] as S,
                )
              }
              text={"+"}
            ></Button>
          )}
        </>
      )}
    </div>
  );
}

export const Form = (props: FormProps) => {
  const [formData, setFormData] = useState<any>(props.formData);
  const [pathSchema, setPathSchema] = useState(
    toPathSchema(props.schema, "", formData),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormData((prev: any) => {
      let newState = JSON.parse(JSON.stringify(prev));
      set(newState, name, type === "checkbox" ? checked : value);
      // setPathSchema(toPathSchema(props.schema, "", newState));
      console.log(newState);
      return newState;
    });
  };

  const handleAddField = (
    event: React.MouseEvent<HTMLButtonElement>,
    key: string,
    schema: StrictSchema,
  ) => {
    event.preventDefault();
    setFormData((prev: any) => {
      let newState = JSON.parse(JSON.stringify(prev));
      let temp = get(newState, key.substring(1));
      temp[temp.length] = getFormData(schema.items as StrictSchema);
      return newState;
    });
  };

  useEffect(() => {
    // Update pathSchema after formData has been updated
    setPathSchema(toPathSchema(props.schema, "", formData));
  }, [formData]);

  return (
    <form onSubmit={props.onSubmit}>
      {buildFormFromPathSchema(
        pathSchema,
        formData,
        handleInputChange,
        handleAddField,
        0,
      )}
      <Submit />
    </form>
  );
};
