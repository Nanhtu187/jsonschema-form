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
import { get, merge, set } from "lodash";
import { PathSchema, StrictSchema, Schema } from "../../utils/src/types.ts";
import {
  getDefaultValue,
  getFormData,
} from "../../utils/src/schema/loadFormData.ts";
import { Button } from "../tailwind/button/button";
import { Submit } from "../tailwind/input/submit";
import { ToggleButton } from "../tailwind/input/toggle";
import "../../style/index.css";
import { GetTailwindInputComponent } from "../../utils/helpers/getComponent.tsx";
import { Accordion } from "../tailwind/label/accordion";
import { ErrorField } from "../tailwind/error/errorField.tsx";
import { Validator } from "../../validator";
import { BooleanInput } from "../tailwind/input/boolean";
import { ErrorList } from "../tailwind/error/errorList.tsx";

export interface FormProps<S extends StrictSchema = Schema> {
  onSubmit?: (str: string) => void;
  schema: S;
  validator: Validator;
  liveValidate?: boolean;
}

export const Form = (props: FormProps) => {
  const { schema: rawSchema, onSubmit, validator, liveValidate } = props;
  const [schema, setSchema] = useState<Schema>(rawSchema);
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [errorSchema, setErrorSchema] = useState({});
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
      let temp = get(newState, key.substring(1));
      if (temp === undefined) {
        temp = getDefaultValue(ARRAY_TYPE);
      }
      temp[temp.length] = getFormData(schema.items as StrictSchema);
      set(newState, key.substring(1), temp);
      return newState;
    });
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validator.validateFormData(formData, schema);
    if (errors.errors.length > 0) {
      const errorMessages = errors.errors.map((error) => {
        return error.stack.substring(1) || "Unknown Error";
      });
      setErrors(errorMessages);
      setErrorSchema((prev) => {
        return merge(prev, errors.errorSchema);
      });
      return;
    }
    onSubmit
      ? onSubmit(JSON.stringify(formData, null, 2))
      : console.log(JSON.stringify(formData, null, 2));
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (liveValidate) {
      const key = event.target?.name;
      const errors = validator.validateFormData(
        get(formData, key),
        get(pathSchema, key)[SCHEMA_KEY],
      );
      if (errors.errors.length > 0) {
        const errorMessages = errors.errors.map((error) => {
          return key + " " + error.stack || "Unknown Error";
        });
        setErrors((prev) => {
          return [...new Set([...prev, ...errorMessages])];
        });
        setErrorSchema((prev) => {
          const newValue = get(prev, key, {});
          merge(newValue, errors.errorSchema);
          return set(prev, key, newValue);
        });
      } else {
        setErrors((prev) => {
          return prev.filter((error) => !error.includes(key));
        });
        setErrorSchema((prev) => {
          return set(prev, key, {});
        });
      }
    }
  };

  useEffect(() => {
    // Update pathSchema after formData has been updated
    setPathSchema(toPathSchema(schema, "", formData));
  }, [formData, schema]);

  useEffect(() => {
    setSchema(schema);
    setFormData(getFormData(schema));
    setLoading(false);
  }, [schema, schema]);

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
          if (typeof get(pathSchema, [key]) === OBJECT_TYPE) {
            const schema = get(pathSchema, [key]);
            const data = get(formData, [key]);
            if (
              schema[SCHEMA_KEY].type === NUMBER_TYPE ||
              schema[SCHEMA_KEY].type === STRING_TYPE
            ) {
              const listErrors = get(
                errorSchema,
                schema[NAME_KEY].substring(1),
              );
              return GetTailwindInputComponent(
                schema[SCHEMA_KEY].type,
                schema[NAME_KEY].substring(1),
                key,
                data,
                handleInputChange,
                onBlur,
                schema[SCHEMA_KEY].description,
                listErrors && listErrors.__errors,
              );
            } else if (schema[SCHEMA_KEY].type === BOOLEAN_TYPE) {
              return (
                <BooleanInput
                  key={schema[NAME_KEY].substring(1)}
                  name={schema[NAME_KEY].substring(1)}
                  label={key}
                  value={formData as boolean}
                  onChange={handleInputChange}
                  onBlur={onBlur}
                  description={schema[SCHEMA_KEY].description}
                />
              );
            } else if (
              schema[SCHEMA_KEY].type === OBJECT_TYPE ||
              schema[SCHEMA_KEY].type === ARRAY_TYPE
            ) {
              return (
                <Accordion
                  key={key}
                  title={key}
                  description={schema[SCHEMA_KEY].description}
                >
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

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-4">
      <ToggleButton />
      <ErrorList errors={errors} />
      {!loading && (
        <form onSubmit={onFormSubmit} className="space-y-4">
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
