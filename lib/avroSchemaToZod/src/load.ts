import { z } from "zod";
import { AvroSchema } from "./types";
import { parseSchema } from "./pkg";

export const loadString = (schema: string): z.ZodTypeAny => {
    const parsedSchema = JSON.parse(schema) as AvroSchema;
    return parseSchema(parsedSchema, parsedSchema, "#", {
        seen: new Map(),
    });
};


export const loadFile = async (file: File): Promise<z.ZodTypeAny> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // When the file is loaded, resolve with its content
        reader.onload = (event) => {
            if (!event.target) throw new Error("File is empty");
            if (!event.target.result) throw new Error("File is empty");
            resolve(loadString(event.target.result as string)); // The content of the file
        };

        // Handle errors while reading the file
        reader.onerror = () => {
            reject("Error reading the file");
        };

        // Read the file as text (you can use other methods depending on the file type)
        reader.readAsText(file); // Change to readAsDataURL or readAsArrayBuffer for other file types
    });
};