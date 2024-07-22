import { Translation } from "@/types/shared/Translation";
import { SchemaField } from "@/types/schema/SchemaField";

export interface Schema {
  id?: string;
  type: "object";
  properties: Record<string, SchemaField>;
  required?: Array<string>;
  i18n?: Record<string, Translation>;
}
