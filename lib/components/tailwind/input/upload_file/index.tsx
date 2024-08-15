import React from "react";
import "../../../../style/index.css";
interface UploadFileProps {
  onchange?: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const UploadFile = (
  { onchange }: UploadFileProps = { onchange: async () => {} },
) => {
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
          onChange={onchange}
        />
      </form>
    </>
  );
};
