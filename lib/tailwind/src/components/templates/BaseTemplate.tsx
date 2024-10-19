import { ArrayTemplate } from "./arrayTemplate";
import { ObjectTemplate } from "./objectTemplate";
import { NumberTemplate } from "./numberTemplate";
import { BooleanTemplate } from "./booleanTemplate";
import { StringTemplate } from "./stringTemplate";
import { Templates } from "./type";

export const BaseTemplates: Templates = {
  StringTemplate: StringTemplate,
  NumberTemplate: NumberTemplate,
  BooleanTemplate: BooleanTemplate,
  ObjectTemplate: ObjectTemplate,
  ArrayTemplate: ArrayTemplate,
};
