import { Layout } from "../schema/elements"

export interface EngineField {
  key: string
  label: string
  type: "text" | "number" | "object" | "array"
  layout: Layout
  options: EngineOptions
  on: {
    input: Function
  }
  required: boolean
}

export interface EngineOptions {
  fieldProps: Record<string, string>
  digitsAfterDecimal: number
}

export interface NodeUpdateEvent {
  key: string
  value: any
}
