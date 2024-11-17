import { Form } from "@nanhtu/antd";
import { useState } from "react";
import { loadString } from "@nanhtu/jsonschematozod";
import testSchema from "./test.json";
import { z } from "zod";
export const Test = () => {
  const [schema, setSchema] = useState<z.ZodTypeAny | undefined>();
  const test = () => {
    const newSchema = loadString(JSON.stringify(testSchema, null, 2));
    setSchema(newSchema);
  };

  return (
    <div>
      <h1>Test</h1>
      <button onClick={test}>asdfasdf</button>
      {schema && (
        <Form
          schema={schema}
          onSubmit={(data: any) => console.log("Zod:", data)}
          onError={(errors: any) => console.error("Zod:", errors)}
          liveValidate={true}
        />
      )}
    </div>
  );
};
