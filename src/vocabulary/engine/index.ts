import { Layout } from "../schema/elements"

export interface EngineField {
  key: string
  label: string
  default: number | string | boolean | object | Array<any>;
  type: "text" | "number" | "object" | "array"
  layout: Layout
  options: EngineOptions
  on: {
    input: Function
  }
  required: boolean
}

export interface EngineOptions {
  fieldProps: Record<string, any>
  buttonProps: Record<string, any>
  digitsAfterDecimal: number
}

export interface NodeUpdateEvent {
  key: string
  value: any
}
