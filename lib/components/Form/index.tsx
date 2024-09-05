// Update the Form component with CSS classes
import { useEffect, useState } from "react";
import { toPathSchema } from "../../utils/src/schema/toPathSchema.ts";
import {
  ARRAY_TYPE,
  BOOLEAN_TYPE,
  NAME_KEY,
  NULL_TYPE,
  NUMBER_TYPE,
  OBJECT_TYPE,
  SCHEMA_KEY,
  STRING_TYPE,
} from "../../utils/src/constants.ts";
import { get, set } from "lodash";
import { PathSchema, StrictSchema, Schema } from "../../utils/src/types.ts";
import { getFormData } from "../../utils/src/schema/loadFormData.ts";
import { Button } from "../tailwind/button/button";
import { Submit } from "../tailwind/input/submit";
import { ToggleButton } from "../tailwind/input/toggle";
import "../../style/index.css";
import { GetTailwindInputComponent } from "../../utils/helpers/getComponent.tsx";
import { Accordion } from "../tailwind/label/accordion";
import { LoadFromFile } from "../../main.ts";
import { ErrorField } from "../tailwind/error/errorField.tsx";
import { Validator } from "../../validator";

export interface FormProps {
  //<T = any, S extends StrictSchema = Schema> {
  onSubmit?: (str: string) => void;
  onError?: (e: Error) => void;
  file?: File;
  validator: Validator;
}

function buildFormFromPathSchema<T = any, S extends StrictSchema = Schema>(
  pathSchema: PathSchema<T>,
  formData: T,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleAddField: (
    event: React.MouseEvent<HTMLButtonElement>,
    key: string,
    schema: S,
  ) => void,
) {
  return (
    <div>
      {Object.keys(pathSchema).map((key) => {
        if (key === NAME_KEY || key == SCHEMA_KEY) {
          return null;
        }
        if (
          typeof get(pathSchema, [key]) === OBJECT_TYPE &&
          formData &&
          get(formData, [key]) !== undefined
        ) {
          const schema = get(pathSchema, [key]);
          const data = get(formData, [key]);
          if (
            schema[SCHEMA_KEY].type === NUMBER_TYPE ||
            schema[SCHEMA_KEY].type === STRING_TYPE ||
            schema[SCHEMA_KEY].type == BOOLEAN_TYPE
          ) {
            return GetTailwindInputComponent(
              schema[SCHEMA_KEY].type,
              schema[NAME_KEY].substring(1),
              key,
              data,
              handleInputChange,
            );
          } else if (
            schema[SCHEMA_KEY].type === OBJECT_TYPE ||
            schema[SCHEMA_KEY].type === ARRAY_TYPE
          ) {
            return (
              <Accordion key={key} title={key}>
                <div className="w-full border-t border-solid border-gray-300 my-4"></div>
                <div className="ml-4">
                  {buildFormFromPathSchema(
                    get(pathSchema, [key]),
                    get(formData, [key]),
                    handleInputChange,
                    handleAddField,
                  )}
                </div>
              </Accordion>
            );
          } else if (schema[SCHEMA_KEY].type == NULL_TYPE) {
            return null;
          } else {
            return (
              <Accordion key={key} title={key}>
                <ErrorField error={"Unsupported Type"} />
              </Accordion>
            );
          }
        }
        return null;
      })}
      {pathSchema[SCHEMA_KEY].type == ARRAY_TYPE && (
        <Button
          key={`${pathSchema[NAME_KEY]}-button`}
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
    </div>
  );
}

export const Form = (props: FormProps) => {
  const [schema, setSchema] = useState<Schema>({});
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(true);

  const [pathSchema, setPathSchema] = useState(
    toPathSchema(schema, "", formData),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target;
    setFormData((prev: any) => {
      const newState = JSON.parse(JSON.stringify(prev));
      const tempSchema = get(pathSchema, name);
      const schemaType = tempSchema[SCHEMA_KEY].type;
      let newValue: any = value;
      if (schemaType === NUMBER_TYPE) {
        newValue = Number(value);
      } else if (schemaType === BOOLEAN_TYPE) {
        newValue = checked;
      }
      set(newState, name, newValue);
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
      const newState = JSON.parse(JSON.stringify(prev));
      const temp = get(newState, key.substring(1));
      temp[temp.length] = getFormData(schema.items as StrictSchema);
      return newState;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = props.validator.validateFormData(formData, schema);
    if (errors.errors.length > 0) {
      alert(JSON.stringify(errors.errors, null, 2));
      return;
    }
    props.onSubmit
      ? props.onSubmit(JSON.stringify(formData, null, 2))
      : console.log(JSON.stringify(formData, null, 2));
  };

  useEffect(() => {
    // Update pathSchema after formData has been updated
    setPathSchema(toPathSchema(schema, "", formData));
  }, [formData]);

  useEffect(() => {
    if (props.file) {
      LoadFromFile(props.file, (e: Error) => {
        if (props.onError) {
          props.onError(e);
        } else {
          alert(e.message);
        }
      }).then((schema) => {
        setSchema(schema);
        setFormData(getFormData(schema));
        setLoading(false);
      });
    }
  }, [props.file]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-4">
      <ToggleButton />
      {!loading && (
        <form onSubmit={onSubmit} className="space-y-4">
          {buildFormFromPathSchema(
            pathSchema,
            formData,
            handleInputChange,
            handleAddField,
          )}
          <Submit />
        </form>
      )}
    </div>
  );
};
