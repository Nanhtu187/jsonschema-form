import { Schema } from "../types";

export const LoadFromFile = (file: File): Promise<Schema> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result;
                const schema: Schema = JSON.parse(text as string);
                resolve(schema);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};

export const LoadString = (jsonString: string): Schema => {
    return JSON.parse(jsonString);
}