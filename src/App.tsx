import { Form, Schema, UploadFile } from "../lib/main.ts";
import { useEffect, useState } from "react";
import { Validator } from "../lib/validator";

function App() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [schema, setSchema] = useState<Schema>({});
  const validator = new Validator();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const result = event.target.result as string;
          try {
            const parsed = JSON.parse(result);
            setSchema(parsed);
          } catch (e) {
            alert("Invalid JSON");
          }
        }
      };
      reader.readAsText(file);
    }
  }, [file]);

  return (
    <div className={"bg-white dark:bg-gray-900 min-h-screen p-4"}>
      <UploadFile setFile={setFile} />
      <Form
        validator={validator}
        schema={schema}
        onSubmit={(str: string) => console.log(str)}
      />
      ;
    </div>
  );
}

export default App;
