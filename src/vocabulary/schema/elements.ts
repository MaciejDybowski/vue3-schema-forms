import { Schema } from '@/vocabulary/schema/index';

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

export interface Layout {
  component: SchemaComponent;
  cols?: number | Cols;
  if?: string;
  props?: Record<string, any>;
  fillRow?: boolean;
  offset?: number;

  // duplicated-section && section
  schema?: Schema;
  options?: Record<string, any>;

  // static-content
  tag?: StaticContentTag;
}

export type SchemaComponent =
  'text-field'
  | 'duplicated-section'
  | 'static-content'
  | 'radio-button'
  | 'checkbox'
  | 'text-area'
  | 'select'
  | 'editable-section'

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
  api?: string;
  items?: Array<any>;
  title?: string;
  value?: string;
  returnObject?: boolean;

  [key: string]: any;
}
