import { SchemaField, Translation } from "./elements";

export interface Schema {
  id?: string;
  type: "object";
  properties: Record<string, SchemaField>;
  required?: Array<string>;
  i18n?: Record<string, Translation>;
}

export interface SchemaOptions {
  fieldProps?: Record<string, any>;
  btnProps?: Record<string, any>;
  digitsAfterDecimal?: string | number;
}
