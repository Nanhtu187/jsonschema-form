import { Form, UploadFile } from "../lib/main.ts";
import { useState } from "react";

function App() {
  const [file, setFile] = useState<File | undefined>(undefined);
  return (
    <div className={"bg-white dark:bg-gray-900 min-h-screen p-4"}>
      <UploadFile setFile={setFile} />
      <Form file={file} onSubmit={(str: string) => console.log(str)} />;
    </div>
  );
}

export default App;
