import { SchemaComponent } from "@/types/schema/SchemaComponent";
import { Cols } from "@/types/shared/Cols";
import { Schema } from "@/types/schema/Schema";
import { StaticContentTag } from "@/types/shared/StaticContentTag";
import { DuplicatedSectionOptions } from "@/types/shared/DuplicatedSectionOptions";

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
  options?: Record<string, any> & DuplicatedSectionOptions;

  // static-content
  tag?: StaticContentTag;
  class?: string;
}
