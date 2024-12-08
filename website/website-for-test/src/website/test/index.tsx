import { Form } from "@nanhtu/antd";
import { loadString } from "@nanhtu/avroschematozod";
import { useLayoutEffect } from "react";

export const Test = () => {
  const schema = loadString(avroSchema);
  useLayoutEffect(() => {
    const startTime = new Date();
    return () => {
      const endTime = new Date();
      const timeRendered = endTime.getTime() - startTime.getTime();
      console.log(timeRendered); // Expect this to be a positive number
    }
  }, []);
  return (
    <Form
      schema={schema}
      onSubmit={(data: any) => console.log("Zod:", data)}
      onError={(errors: any) => console.error("Zod:", errors)}
      liveValidate={true}
    />
  );
};

const avroSchema = `
{
     "type": "record",
     "namespace": "com.example",
     "name": "FullName",
     "fields": [
      { "name": "first", "type": "string" },
      { "name": "last", "type": "string" },
      {
        "name": "age", 
        "type": {
            "type": "record",
            "name": "age",
            "fields": [
                { "name": "years", "type": "int" },
                 { "name": "months", "type": "int" }
            ]
        }
      },
      {
        "name": "children",
        "type": {
          "type":"array",
          "items": "string"
        }
      }
     ]
}
`;

const jsonSchema = `
{
  "type": "object",
  "$def": {
    "child": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "maxLength": 10
        },
        "age": {
          "type": "number"
        }
      }
    }
  },
  "properties": {
    "name": {
      "type": "string",
      "minLength": 3,
      "maxLength": 10
    },
    "age": {
      "type": "number",
      "minimum": 18,
      "maximum": 100
    },
    "isTall": {
      "type": "boolean"
    },
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        }
      }
    },
    "children": {
      "type": "array",
      "items": {
        "$ref": "#/$def/child"
      }
    },
    "multipleTypeArray": {
      "type": "array",
      "items": {
        "type": [
          "string",
          "number"
        ]
      }
    },
    "gender": {
      "enum": [
        "male",
        "female"
      ]
    },
    "anyOfExample": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "number"
        }
      ]
    },
    "allOfExample": {
      "allOf": [
        {
          "type": "string"
        },
        {
          "maxLength": 5
        }
      ]
    },
    "oneOfExample": {
      "type": "number",
      "oneOf": [
        {
          "type": "number",
          "multipleOf": 5
        },
        {
          "type": "number",
          "multipleOf": 3
        }
      ]
    }
  },
  "required": [
    "name",
    "age",
    "isTall",
    "address",
    "children",
    "multipleTypeArray"
  ]
}
`;
