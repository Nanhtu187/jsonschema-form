// Update the Form component with CSS classes
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
import { Button } from "../tailwind/button/button";
import { KeyLabel } from "../tailwind/label/key";
import { Submit } from "../tailwind/input/submit";
import { ToggleButton } from "../tailwind/input/toggle";
import { UploadFile } from "../tailwind/input/upload_file";
import "../../style/index.css";
import { GetTailwindInputComponent } from "../../utils/helpers/getComponent.tsx";

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
          let schema = get(pathSchema, [key]);
          let data = get(formData, [key]);
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
          } else {
            return (
              <>
                <KeyLabel label={key} />
                <div className="w-full border-t border-solid border-gray-300 my-4"></div>
                <div key={key} className="ml-4">
                  {buildFormFromPathSchema(
                    get(pathSchema, [key]),
                    get(formData, [key]),
                    handleInputChange,
                    handleAddField,
                  )}
                </div>
              </>
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
    </>
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
    const { name, type, checked, value } = event.target;
    setFormData((prev: any) => {
      let newState = JSON.parse(JSON.stringify(prev));
      set(newState, name, type === "checkbox" ? checked : value);
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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit
      ? props.onSubmit(JSON.stringify(formData, null, 2))
      : console.log(JSON.stringify(formData, null, 2));
  };

  useEffect(() => {
    // Update pathSchema after formData has been updated
    setPathSchema(toPathSchema(schema, "", formData));
  }, [formData]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-4">
      <ToggleButton />
      <UploadFile
        schema={schema}
        setSchema={setSchema}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        setLoading={setLoading}
      />
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
