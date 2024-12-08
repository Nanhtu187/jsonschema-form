import { useState } from "react";
import { Form } from "@nanhtu/antd";
import { schema } from "./schema";

export const AntdExample = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [liveValidate, setLiveValidate] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div style={{ padding: "40px" }}>
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
          schema={schema}
          onSubmit={(data: any) =>
            alert("Data submitted: " + JSON.stringify(data, null, 2))
          }
          onError={(errors: any) => console.error("Zod:", errors)}
          liveValidate={liveValidate}
        />
      </div>
    </div>
  );
};
