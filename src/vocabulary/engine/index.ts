import { Layout } from "../schema/elements"

export interface EngineField {
  key: string
  label: string
  layout: Layout
  options: EngineOptions
  on: {
    input: Function
  }
  required: boolean
}

export interface EngineOptions {
  fieldProps: Record<string, string>
}

export interface NodeUpdateEvent {
  key: string
  value: any
}
