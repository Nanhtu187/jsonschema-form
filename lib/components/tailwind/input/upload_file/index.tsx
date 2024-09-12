import { ChangeEvent } from "react";

export interface UploadFileProps {
  setFile: (file: File) => void;
}

export const UploadFile = (props: UploadFileProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? event.target.files : null;
    if (files) {
      props.setFile(files[0]);
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
