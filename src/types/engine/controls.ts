import { EngineField } from '@/types/engine/EngineField';
import { Schema } from '@/types/schema/Schema';
import {
  DownloadFileRenderMode,
  ExternalApiCaller,
} from '@/types/schema/SchemaField';
import { LocationResult } from '@/types/shared/LocationResult';
import {
  AvatarSource,
  DictionarySource,
  SimpleSource,
  SourceDefinition,
  UserInputSource,
} from '@/types/shared/Source';

export interface EngineExpansionPanel {
  titleIcon?: string;
  titleIconSize?: number;
  titleCssDecorator?: string;
  title: string;
  schema: Schema;
  openByDefault?: boolean;
  openCondition?: string;
  hideCondition?: string;
}

export interface EnginePESELField extends EngineField {
  checkSumValidation?: 'warning' | 'error';
  adultsValidation?: 'warning' | 'error';
}

export interface EngineNIPField extends EngineField {
  checkSumValidation?: 'warning' | 'error';
}

export interface EngineREGONField extends EngineField {
  checkSumValidation?: 'warning' | 'error';
}

export interface ValidationMessageViewer extends EngineField {}

export interface EngineCardComponent extends EngineField {
  title?: string;
}

export interface EngineTextField extends EngineField {
  calculation?: string;
  expression?: string;
}

type LegendItem = {
  statusKey: string;
  label: string;
  colors: {
    light: string;
    dark: string;
  };
};

export interface EngineSchedulerGrid extends EngineField {
  legend: LegendItem[];
  showLabel?: boolean;
  showUserColumn?: boolean;
  showGroupHeaders?: boolean;
  source?: { url: string };
}

export interface EngineExpansionPanels extends EngineField {
  panels: EngineExpansionPanel[];
}

export interface EngineTextEditorField extends EngineField {
  editorFeatures: string[];
  contentType: 'markdown' | 'html' | 'json';
  url?: string;
  idQueryParamName?: string;
  fileLabel?: string;
  fileMaxSize?: number;
  fileAvailableExtensions?: string;
  imageAvailableExtensions?: string;
}

export interface EngineFileField extends EngineField {
  url?: string;
  idQueryParamName?: string;
  fileLabel?: string;
  fileMaxSize?: number;
  fileAvailableExtensions?: string;
}

export interface EngineDownloadFileField extends EngineField {
  renderMode?: DownloadFileRenderMode;
  externalApi: ExternalApiCaller;
  fileName?: string;
  fileType?: string;
  status?: 'ready' | 'generating' | 'expired';
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
  isCopyEnabled?: boolean;
}

export interface EngineStaticField extends EngineField {
  content: string;
}

export interface EngineAlertField extends EngineField {
  content: string;
  memorable?: boolean;
  includeInValidation?: boolean;
}

export interface EngineDuplicatedSection extends EngineField {
  editable?: boolean | string;
  showElements?: boolean | string;
}

export interface EngineSourceField extends EngineField {
  source: SourceDefinition;
}

export interface EngineBookmarkField extends EngineField {
  source: SourceDefinition;
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

export interface EngineGroupField extends EngineUserField {}

export interface EngineLocationField extends EngineField {
  results: LocationResult;
}

export interface EngineSwitchField extends EngineField {
  calculation?: string;
  expression?: string;
}
