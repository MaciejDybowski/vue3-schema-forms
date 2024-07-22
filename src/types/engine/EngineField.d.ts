import { EngineOptions } from "@/types/engine/EngineOptions";
import { Layout } from "@/types/shared/Layout";
import { SchemaFieldType } from "@/types/shared/SchemaFieldType";

export interface EngineField {
  formId: string;
  key: string;
  options: EngineOptions;
  on: {
    input: Function;
  };
  required: boolean;

  // moze do dziedziczenia z SchemaField.d.ts
  label: string;
  default: number | string | boolean | object | Array<any>;
  type?: SchemaFieldType;
  layout: Layout;
  validations: any;
}
