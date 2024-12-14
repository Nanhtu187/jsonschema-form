import React, { useState } from "react";
import { RenderTemplate, useFormDataAtPath } from "../..";
import { z } from "zod";

export const SelectionTemplate: React.FC<{
    schema: z.ZodUnion<any>;
    path: string[];
    liveValidate?: boolean;
    title?: string;
}> = ({
    schema,
    path,
    liveValidate,
    title,
}) => {
        const innerSchemas: z.ZodTypeAny[] = schema._def.options;
        const [value, setValue] = useFormDataAtPath(path);
        const [currentOption, setCurrentOption] = useState(0);


        if (isEnum(innerSchemas)) {
            const filteredOptions = innerSchemas.map((innerSchema, index) => ({
                index: index,
                value: innerSchema._def.value,
            }));

            return (
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">
                        {title}
                    </label>
                    <select
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                            setValue(filteredOptions[Number(e.currentTarget.value)].value);
                        }}
                        value={value || ""}
                    >
                        {filteredOptions.map((filteredOption) => (
                            <option key={filteredOption.index} value={filteredOption.index}>
                                {filteredOption.value}
                            </option>
                        ))}
                    </select>
                </div>

            );
        } else {
            const filteredOptions = innerSchemas.map((_, index) => ({
                index: index,
                label: `Option ${index + 1}`,
            }));


            return (
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">
                        {title}
                    </label>
                    <select
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                            setValue(undefined);
                            setCurrentOption(Number(e.currentTarget.value));
                        }}
                    >
                        {filteredOptions.map((filteredOption) => (
                            <option key={filteredOption.index} value={filteredOption.index}>
                                {filteredOption.label}
                            </option>
                        ))}
                    </select>
                    <RenderTemplate
                        schema={innerSchemas[currentOption]}
                        path={path}
                        liveValidate={liveValidate}
                    />
                </div>
            );
        }
    };

const isEnum = (schemas: z.ZodTypeAny[]): boolean => {
    return schemas.every(
        (schema) => schema._def.typeName === z.ZodFirstPartyTypeKind.ZodLiteral,
    );
};
