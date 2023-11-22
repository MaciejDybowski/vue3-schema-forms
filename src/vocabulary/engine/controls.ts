import { EngineField } from "./index"

export interface EngineTextField extends EngineField {
  calculation?: string
}

export interface EngineStaticField extends EngineField {
  content: string
}
export interface EngineDuplicatedSection extends EngineField {}
