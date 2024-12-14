import { Form } from "@nanhtu/antd";
import { loadFile } from "@nanhtu/avroschematozod";
import { useState } from "react";
import { z } from "zod";

// import { loadString } from "@nanhtu/jsonschematozod"
// import { Form } from "@nanhtu/tailwind";

// export const Test = () => {
//   const schema = loadString(avroSchema);
//   return (
//     <Form
//       schema={schema}
//       onSubmit={(data: any) => alert("Data submitted: " + JSON.stringify(data, null, 2))}
//       onError={(errors: any) => console.error("Zod:", errors)}
//       liveValidate={true}
//     />
//   );
// };

export const Test = () => {
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
}

// const avroSchema = `
// {
//      "type": "record",
//      "namespace": "com.example",
//      "name": "FullName",
//      "fields": [
//       { "name": "first", "type": "string" },
//       { "name": "last", "type": "string" },
//       {
//         "name": "age", 
//         "type": {
//             "type": "record",
//             "name": "age",
//             "fields": [
//                 { "name": "years", "type": "int" },
//                  { "name": "months", "type": "int" }
//             ]
//         }
//       },
//       {
//         "name": "children",
//         "type": {
//           "name": "children",
//           "type":"array",
//           "items": "string"
//         }
//       }
//      ]
// }
// `;

// const jsonSchema = `
// {
//   "type": "object",
//   "$def": {
//     "child": {
//       "type": "object",
//       "properties": {
//         "name": {
//           "type": "string",
//           "minLength": 3,
//           "maxLength": 10
//         },
//         "age": {
//           "type": "number"
//         }
//       }
//     }
//   },
//   "properties": {
//     "name": {
//       "type": "string",
//       "minLength": 3,
//       "maxLength": 10
//     },
//     "age": {
//       "type": "number",
//       "minimum": 18,
//       "maximum": 100
//     },
//     "isTall": {
//       "type": "boolean"
//     },
//     "address": {
//       "type": "object",
//       "properties": {
//         "street": {
//           "type": "string"
//         },
//         "city": {
//           "type": "string"
//         }
//       }
//     },
//     "children": {
//       "type": "array",
//       "items": {
//         "$ref": "#/$def/child"
//       }
//     },
//     "multipleTypeArray": {
//       "type": "array",
//       "items": {
//         "type": [
//           "string",
//           "number"
//         ]
//       }
//     },
//     "gender": {
//       "enum": [
//         "male",
//         "female"
//       ]
//     },
//     "anyOfExample": {
//       "anyOf": [
//         {
//           "type": "string"
//         },
//         {
//           "type": "number"
//         }
//       ]
//     },
//     "allOfExample": {
//       "allOf": [
//         {
//           "type": "string"
//         },
//         {
//           "maxLength": 5
//         }
//       ]
//     },
//     "oneOfExample": {
//       "type": "number",
//       "oneOf": [
//         {
//           "type": "number",
//           "multipleOf": 5
//         },
//         {
//           "type": "number",
//           "multipleOf": 3
//         }
//       ]
//     }
//   },
//   "required": [
//     "name",
//     "age",
//     "isTall",
//     "address",
//     "children",
//     "multipleTypeArray"
//   ]
// }
// `;


// export const Test = () => {
//   const schema = loadString(jsonSChema);
//   return (
//     <div>
//       <Form schema={schema} onSubmit={
//         (data: any) => alert(JSON.stringify(data, null, 2))
//         } />
//     </div>
//   )
// }

// const jsonSChema = `
// {
//   "type": "object",
//   "$def": {
//     "child": {
//       "type": "object",
//       "properties": {
//         "name": {
//           "type": "string",
//           "minLength": 3,
//           "maxLength": 10
//         },
//         "age": {
//           "type": "number"
//         }
//       }
//     }
//   },
//   "properties": {
//     "name": {
//       "type": "string",
//       "minLength": 3,
//       "maxLength": 10
//     },
//     "age": {
//       "type": "number"
//     },
//     "isTall": {
//       "type": "boolean"
//     },
//     "address": {
//       "type": "object",
//       "properties": {
//         "street": {
//           "type": "string"
//         },
//         "city": {
//           "type": "string"
//         },
//         "state": {
//           "type": "string"
//         },
//         "zip": {
//           "type": "string"
//         }
//       }
//     },
//     "sdt": {
//       "type": "string"
//     },
//     "country": {
//       "type": "string",
//       "enum": [
//         "Vietnam",
//         "USA",
//         "Japan"
//       ]
//     },
//     "children": {
//       "type": "array",
//       "items": {
//         "type": "string"
//       }
//     },
//     "email": {
//       "type": "string",
//       "format": "email"
//     },
//     "date": {
//       "type": "string",
//       "format": "date"
//     },
//     "time": {
//       "type": "string",
//       "format": "time"
//     },
//     "dateTime": {
//       "type": "string",
//       "format": "date-time"
//     },
//     "parent": {
//       "$ref": "#/$def/child"
//     },
//     "school": {
//       "type": "string"
//     },
//     "isGraduted": {
//       "type": "boolean"
//     },
//     "class": {
//       "type": "string"
//     },
//     "state": {
//       "type": "string"
//     },
//     "city": {
//       "enum": [
//         "Hanoi",
//         "HCM",
//         "Da Nang"
//       ]
//     },
//     "zip": {
//       "type": "string"
//     },
//     "phone": {
//       "type": "string"
//     },
//     "fax": {
//       "type": "string"
//     }
//   },
//   "required": [
//     "name",
//     "age",
//     "isTall",
//     "address",
//     "children"
//   ]
// }`