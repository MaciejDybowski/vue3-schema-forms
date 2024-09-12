import { EngineField } from "@/types/engine/EngineField";
import { LocationResult } from "@/types/shared/LocationResult";
import { DictionarySource, SimpleSource, Source } from "@/types/shared/Source";

export interface EngineTextField extends EngineField {
  calculation?: string;
  expression?: string;
}

export interface EngineNumberField extends EngineField {
  precision: number;
  calculation?: string;
  expression?: string;
}

export interface EngineDataViewerField extends EngineField {
  calculation?: string;
  valueMapping?: string;
  source?: SimpleSource | DictionarySource;
}

export interface EngineStaticField extends EngineField {
  content: string;
}

export interface EngineDuplicatedSection extends EngineField {
  editable?: boolean;
}

export interface EngineSourceField extends EngineField {
  source: Source;
}

export interface RadioField extends EngineSourceField {
  initValue?: boolean;
}

export interface EngineDateField extends EngineField {
  pastDateAvailable?: boolean;
  futureDateAvailable?: boolean;
  closeOnFirstClick?: boolean;
  formatInModel?: string;
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
