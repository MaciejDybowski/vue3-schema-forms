export interface SchemaField {
  label?: string | { $ref: string }
  type?: "text" | "number" | "date" | "array" | "object"
  layout?: Layout
  properties?: Record<string, SchemaField | SchemaTextField>
  required?: Array<string>
}

export interface SchemaTextField extends SchemaField {
  calculation?: string
}

export interface Layout {
  component: SchemaComponent
  cols?: number | Cols
  if?: string
  items?: Record<string, SchemaField>
  props?: Record<string, any>
  fillRow?: boolean
  offset?: number
}

export type SchemaComponent = "text-field" | "duplicated-section"

export interface Cols {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export type Translation = Record<string, string>
