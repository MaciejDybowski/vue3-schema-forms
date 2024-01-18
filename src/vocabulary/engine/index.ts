import { Layout } from "../schema/elements";

export interface EngineField {
  formId: string;
  key: string;
  label: string;
  default: number | string | boolean | object | Array<any>;
  type: "text" | "number" | "object" | "array";
  layout: Layout;
  options: EngineOptions;
  on: {
    input: Function;
  };
  required: boolean;
}

export interface EngineOptions {
  fieldProps: Record<string, any>;
  textFieldProps: Record<string, any>;
  textAreaProps: Record<string, any>;
  radioButtonProps: Record<string, any>;
  buttonProps: Record<string, any>;
  checkboxProps: Record<string, any>;
  selectProps: Record<string, any>;
  digitsAfterDecimal: number;
}

export interface NodeUpdateEvent {
  key: string;
  value: any;
}
