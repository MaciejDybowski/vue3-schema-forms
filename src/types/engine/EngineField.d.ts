import { EngineOptions } from "@/types/engine/EngineOptions";
import { Layout } from "@/types/shared/Layout";
import { SchemaFieldType } from "@/types/shared/SchemaFieldType";
import { EventHandlerDefinition } from "@/types/shared/EventHandlerDefinition";

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
  defaultValue?: number | string | boolean | object | Array<any> | undefined | null;
  type?: SchemaFieldType;
  layout: Layout;
  validations: any;

  // conditional rendering in duplicated section
  path?: string;
  index?: number;

  // number
  precision?: string | number | undefined;
  precisionMin?: string | number | undefined;
  calculation?: string;

  //events
  onChange?: EventHandlerDefinition
}
