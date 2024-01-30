import { EngineField } from './index';
import { DictionarySource, LocationResult, SimpleSource, Source } from '@/vocabulary/schema/elements';

export interface EngineProps<T> {
  schema: T;
  model: object;
}

export interface EngineTextField extends EngineField {
  calculation?: string;
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

export interface EngineDateField extends EngineField {
  pastDateAvailable?: boolean;
  futureDateAvailable?: boolean;
  closeOnFirstClick?: boolean;
  formatInModel?: string
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
