import { SchemaField, Translation } from "./elements"

export interface Schema {
  type: string

  properties: Record<string, SchemaField>
  required?: Array<string>
  i18n?: Record<string, Translation>
}

export interface SchemaOptions {
  fieldProps?: Record<string, string>
  digitsAfterDecimal?: string | number
}
