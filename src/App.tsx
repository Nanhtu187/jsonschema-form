import { Form, UploadFile } from "../lib/main.ts";
import { useState } from "react";
import { Validator } from "../lib/validator";

function App() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const validator = new Validator();
  return (
    <div className={"bg-white dark:bg-gray-900 min-h-screen p-4"}>
      <UploadFile setFile={setFile} />
      <Form
        validator={validator}
        file={file}
        onSubmit={(str: string) => console.log(str)}
      />
      ;
    </div>
  );
}

export default App;
