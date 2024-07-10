import './App.css'
import {Form, Schema} from "../lib/main.ts";
import {LoadFromFile} from "../lib/utils/src/schema/loadSchema.ts";
import {useState} from "react";

function App() {

    const [schema, setSchema] = useState<Schema>({});

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            return LoadFromFile(file).then((schema) => {
                setSchema(schema);
            });
        }
    }

    return (
        <>
            <input type={"file"} onChange={handleFileChange}></input>
            <Form schema={schema}></Form>
        </>
    )
}

export default App;