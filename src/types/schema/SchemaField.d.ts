import { Layout } from "@/types/shared/Layout";

import { Source } from "@/types/shared/Source";
import { LocationResult } from "@/types/shared/LocationResult";

export interface SchemaField {
  label?: string | { $ref: string };
  content?: string | { $ref: string };
  default?: number | string | boolean | object | Array<any>;
  type?: "text" | "number" | "date" | "array" | "object";
  layout?: Layout;
  properties?: Record<string, SchemaField>;
  required?: Array<string>;

  // textfield, data-viewer
  calculation?: string;
  // dictionary and other selects/radio/checkbox and data-viewer
  source?: Source;
  // location field
  results: LocationResult;

  // date-field
  pastDateAvailable?: boolean;
  futureDateAvailable?: boolean;
  closeOnFirstClick?: boolean;
  formatInModel?: string;
}
