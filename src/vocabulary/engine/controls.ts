import { EngineField } from "./index";
import { DictionarySource, LocationResult, Source } from "@/vocabulary/schema/elements";

export interface EngineProps<T> {
  schema: T;
  model: object;
}

export interface EngineTextField extends EngineField {
  calculation?: string;
}

export interface EngineReadOnlyField extends EngineField {
  calculation?: string;
  valueMapping?: string;
}

export interface EngineStaticField extends EngineField {
  content: string;
}

export interface EngineDuplicatedSection extends EngineField {
  editable?: boolean
}

export interface EngineSourceField extends EngineField {
  source: Source;
}

export interface EnginePhoneField extends EngineField {
  phoneInputProps: object;
}

export interface EngineDictionaryField extends EngineField {
  source: DictionarySource;
}

export interface EngineLocationField extends EngineField {
  results: LocationResult;
}
