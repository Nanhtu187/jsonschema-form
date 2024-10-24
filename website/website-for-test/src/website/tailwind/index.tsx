import { useState } from "react";
import { Form } from "@nanhtu/tailwind";
import { zodSchema } from "./schema";

export const TailwindExample = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [liveValidate, setLiveValidate] = useState(true);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div>
        <button onClick={toggleDarkMode} className="">
          Toggle Dark Mode
        </button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={liveValidate}
            onChange={() => setLiveValidate(!liveValidate)}
          />
          Live Validate
        </label>
      </div>
      <Form
        schema={zodSchema}
        onSubmit={(data: any) => console.log("Zod:", data)}
        onError={(errors: any) => console.error("Zod:", errors)}
        liveValidate={liveValidate}
      />
    </div>
  );
};
