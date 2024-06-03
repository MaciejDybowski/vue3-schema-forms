import { Schema } from './index';

export interface SchemaField {
  label?: string | { $ref: string };
  content?: string | { $ref: string };
  default?: number | string | boolean | object | Array<any>;
  type?: 'text' | 'number' | 'date' | 'array' | 'object';
  layout?: Layout;
  properties?: Record<string, SchemaField | SchemaTextField>;
  required?: Array<string>;
}

export interface SchemaTextField extends SchemaField {
  calculation?: string;
}

export interface SchemaSourceField extends SchemaField {
  source?: Source;
}

export interface SchemaLocationField extends SchemaField {
  results: LocationResult;
}

export interface SchemaDateField extends SchemaField {
  pastDateAvailable?: boolean;
  futureDateAvailable?: boolean;
  closeOnFirstClick?: boolean;
  formatInModel?: string
}

export interface LocationResult {
  lang: string;
  countryLimit: string;
}

export interface Layout {
  component: SchemaComponent;
  cols?: number | Cols;
  if?: string;
  props?: Record<string, any>;
  fillRow?: boolean;
  offset?: number;
  hide?: boolean;

  // duplicated-section && section && address
  schema?: Schema;
  options?: Record<string, any>;

  // static-content
  tag?: StaticContentTag;
  class?: string
}

export type SchemaComponent =
  | 'text-field'
  | 'duplicated-section'
  | 'static-content'
  | 'radio-button'
  | 'checkbox'
  | 'text-area'
  | 'select'
  | 'editable-section'
  | 'dictionary'
  | 'date-picker'
  | 'date-time-picker'
  | 'phone'
  | 'data-viewer'
  | 'location'
  | 'address'

export type StaticContentTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';

export interface Cols {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export type Translation = Record<string, string>;

export interface DuplicatedSectionOptions {
  addBtnText: string | { $ref: string };
  showDivider: boolean;
}

export interface Source {
  title?: string;
  value?: string;
  returnObject?: boolean;
}

export interface SimpleSource extends Source {
  url?: string;
  items?: Array<any>;
}

export interface DictionarySource extends Source {
  url: string;
  description?: string;
  references?: ResponseReference;
  itemsPerPage?: number;
  lazy?: boolean;
  singleOptionAutoSelect?: boolean;
}

export interface ResponseReference {
  data: string;
  totalElements: string;
}
