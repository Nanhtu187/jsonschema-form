import { Form, LoadFromFile, Schema, UploadFile } from "../lib/main.ts";
import { useEffect, useState } from "react";
import { Validator } from "../lib/validator";

function App() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [schema, setSchema] = useState<Schema>({});
  const [loading, setLoading] = useState(true);
  const validator = new Validator();

  useEffect(() => {
    if (file) {
      LoadFromFile(file, (e) => alert(e)).then((schema) => {
        setSchema(schema);
        setLoading(false);
      });
    }
  }, [file]);

  return (
    <div className={"bg-white dark:bg-gray-900 min-h-screen p-4"}>
      <UploadFile setFile={setFile} />
      {!loading && (
        <Form
          validator={validator}
          schema={schema}
          onSubmit={(str: string) => console.log(str)}
          liveValidate={true}
        />
      )}
    </div>
  );
}

export default App;
