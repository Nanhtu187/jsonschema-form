import { Form, Schema, UploadFile } from "../lib/main.ts";
import { LoadFromFile } from "../lib/utils/src/schema/loadSchema.ts";
import { ChangeEvent, useState } from "react";
import { getFormData } from "../lib/utils/src/schema/loadFormData.ts";
import { ToggleButton } from "../lib/components/tailwind/input/toggle";

function App() {
  const [schema, setSchema] = useState<Schema>({});
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(true);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? event.target.files : null;
    if (files) {
      const schema = await LoadFromFile(files[0]);
      setSchema(schema);
      setFormData(getFormData(schema));
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <ToggleButton />
      <UploadFile onchange={handleFileChange} />
      {!loading && (
        <Form
          formData={formData}
          schema={schema}
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log(JSON.stringify(formData, null, 2));
          }}
        />
      )}
    </div>
  );
}

export default App;
