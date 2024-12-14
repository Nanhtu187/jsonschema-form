import { useState } from "react";
import { Form } from "@nanhtu/antd";
import { loadFile } from "@nanhtu/jsonschematozod";
import { z } from "zod";

export const AntdExample = () => {
  const [liveValidate] = useState(false);
  const [currentSchema, setCurrentSchema] = useState<z.ZodTypeAny>();
  return (
    <div style={{ padding: "40px" }}>
      <input type="file" onChange={async (e) => {
        if (e.currentTarget.files) {
          const newSchema = await loadFile(e.currentTarget.files[0]);
          setCurrentSchema(newSchema);
        }
      }
      }></input>
      {currentSchema &&
        <Form
          schema={currentSchema}
          onSubmit={(data: any) =>
            alert("Data submitted: " + JSON.stringify(data, null, 2))
          }
          onError={(errors: any) => console.error("Zod:", errors)}
          liveValidate={liveValidate}
        />
      }
    </div>
  );
};
