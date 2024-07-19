import { Schema } from '../types';

export declare const LoadFromFile: (file: File) => Promise<Schema>;
export declare const LoadFromString: (jsonString: string) => Schema;
export declare const LoadFromUrl: (url: string) => Promise<Schema>;
