import { EngineField } from '@/types/engine/EngineField';
import { LocationResult } from '@/types/shared/LocationResult';
import {
  AvatarSource,
  DictionarySource,
  SimpleSource,
  Source,
  UserInputSource,
} from '@/types/shared/Source';
import { Schema } from '@/types/schema/Schema';

export interface EngineExpansionPanel {
  title:string
  schema: Schema
}

export interface EngineTextField extends EngineField {
  calculation?: string;
  expression?: string;
}

export interface EngineExpansionPanels extends EngineField {
  panels: EngineExpansionPanel[];
}

export interface EngineTextEditorField extends EngineField {
  contentType: 'markdown' | 'html' | 'json';
}

export interface EngineFileField extends EngineField {
  url?: string;
  idQueryParamName?: string;
  fileLabel?: string;
  fileMaxSize?: number;
  fileAvailableExtensions?: string;
}

export interface EngineTextSwitchFieldField extends EngineField {
  calculation?: string;
  content: string;
}

export interface EngineImageField extends EngineField {
  src: string;
}

export interface EngineAvatarField extends EngineField {
  source: AvatarSource;
}

export interface EngineDividerField extends EngineField {
  thickness: number;
  color: string;
  opacity: string;
}

export interface EngineNumberField extends EngineField {
  precision: number;
  precisionMin?: number;
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

export interface EngineAlertField extends EngineField {
  content: string;
  memorable?: boolean;
}

export interface EngineDuplicatedSection extends EngineField {
  editable?: boolean;
}

export interface EngineSourceField extends EngineField {
  source: Source;
}

export interface EngineBookmarkField extends EngineField {
  source: Source;
  stacked?: boolean;
  color?: string;
  'bg-color'?: string;
  direction?: 'vertical' | 'horizontal';
  'slider-color'?: string;
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

export interface EngineOrderedMultiSelect extends EngineDictionaryField {
  variant: 'list' | 'combobox';
  source: DictionarySource;
}

export interface EngineUserField extends EngineField {
  source: UserInputSource;
}

export interface EngineLocationField extends EngineField {
  results: LocationResult;
}

export interface EngineSwitchField extends EngineField {
  calculation?: string;
  expression?: string;
}
