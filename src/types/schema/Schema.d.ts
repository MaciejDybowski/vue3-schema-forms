import { SchemaField } from "@/types/schema/SchemaField";
import { Translation } from "@/types/shared/Translation";

export interface Schema {
  id?: string;
  type: "object";
  properties: Record<string, SchemaField>;
  required?: Array<string>;
  i18n?: Record<string, Translation>;
}
