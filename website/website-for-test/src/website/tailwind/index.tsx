import { useState } from "react";
import { Form } from "@nanhtu/tailwind";
import { schema } from "./schema";
import { z } from "zod";
import { loadFile } from "@nanhtu/jsonschematozod";

export const TailwindExample = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [liveValidate, setLiveValidate] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const [currentSchema, setCurrentSchema] = useState<z.ZodTypeAny>();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div>
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          Dark Mode
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={liveValidate}
            onChange={() => setLiveValidate(!liveValidate)}
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          Live Validate
        </label>
      </div>
      <input type="file" onChange={async (e) => {
        if (e.currentTarget.files) {
          const newSchema = await loadFile(e.currentTarget.files[0]);
          setCurrentSchema(newSchema);
        }
      }}></input>
      {currentSchema &&
        <Form
          schema={currentSchema}
          onSubmit={(data: any) => console.log("Zod:", data)}
          onError={(errors: any) => console.error("Zod:", errors)}
          liveValidate={liveValidate}
        />
      }
    </div>
  );
};
