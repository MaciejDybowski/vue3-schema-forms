import { Schema } from '@/types/schema/Schema';
import { SchemaComponent } from '@/types/schema/SchemaComponent';
import { Cols } from '@/types/shared/Cols';
import { DuplicatedSectionOptions } from '@/types/shared/DuplicatedSectionOptions';
import { StaticContentTag } from '@/types/shared/StaticContentTag';
import { Offset } from '@/types/shared/Offset';

export interface Layout {
  component: SchemaComponent;
  cols?: number | Cols;
  if?: string;
  props?: Record<string, any>;
  fillRow?: boolean;
  offset?: Offset;
  hide?: boolean | string;

  // duplicated-section && section && address
  schema?: Schema;
  options?: Record<string, any> & DuplicatedSectionOptions;
  sourcePath?: string;

  // static-content
  tag?: StaticContentTag;
  class?: string;
}
