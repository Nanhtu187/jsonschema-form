import React, { ChangeEvent } from "react";
import { LoadFromFile } from "../../../../utils/src/schema/loadSchema.ts";
import { getFormData } from "../../../../utils/src/schema/loadFormData.ts";
import { Schema, StrictSchema } from "../../../../utils/src/types.ts";
interface UploadFileProps<S extends StrictSchema = Schema, T = any> {
  schema: S;
  formData: T;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSchema: React.Dispatch<React.SetStateAction<S>>;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

export const UploadFile = (props: UploadFileProps) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? event.target.files : null;
    if (files) {
      const schema = await LoadFromFile(files[0]);
      props.setSchema(schema);
      props.setFormData(getFormData(schema));
      props.setLoading(false);
    }
  };

  return (
    <>
      <form className="max-w-lg">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="schema"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="schema"
          type="file"
          onChange={handleFileChange}
        />
      </form>
    </>
  );
};
