import { EngineOptions } from "@/types/engine/EngineOptions";
import { EventHandlerDefinition } from "@/types/shared/EventHandlerDefinition";
import { Layout } from "@/types/shared/Layout";
import { SchemaFieldType } from "@/types/shared/SchemaFieldType";
import { Schema } from "@/types/schema/Schema";

export interface EngineField {
  formId: string;
  key: string;
  options: EngineOptions;
  on: {
    input: Function;
  };
  required: boolean;

  // moze do dziedziczenia z SchemaField.d.ts
  label: string | any
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

  // table
  aggregates?: object;

  //events
  onChange?: EventHandlerDefinition;

  //switch
  mode?: string
}