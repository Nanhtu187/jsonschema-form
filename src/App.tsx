import { Form, Schema } from '../lib/main.ts';
import { LoadFromFile } from '../lib/utils/src/schema/loadSchema.ts';
import { ChangeEvent, useState } from 'react';
import { getFormData } from '../lib/utils/src/schema/loadFormData.ts';

function App() {
  const [schema, setSchema] = useState<Schema>({});
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(true);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? event.target.files : null;
    if (files) {
      return LoadFromFile(files[0]).then((schema) => {
        setSchema(schema);
        setFormData(getFormData(schema));
        setLoading(false);
      });
    }
  };

  return (
    <div style={{ background: 'white' }}>
      <input type={'file'} onChange={handleFileChange}></input>
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
