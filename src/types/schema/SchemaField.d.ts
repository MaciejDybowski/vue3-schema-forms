import { Layout } from '@/types/shared/Layout';
import { LocationResult } from '@/types/shared/LocationResult';
import { SchemaFieldType } from '@/types/shared/SchemaFieldType';
import { SchemaSimpleValidation } from '@/types/shared/SchemaSimpleValidation';
import { Source } from '@/types/shared/Source';

export interface SchemaField {
  label?: string | { $ref: string };
  content?: string | { $ref: string };
  default?: number | string | boolean | object | Array<any>;
  type?: SchemaFieldType;
  layout?: Layout;
  properties?: Record<string, SchemaField>;
  required?: Array<string>;

  // text-field, data-viewer
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

  // simple validation
  validations?: Array<SchemaSimpleValidation>;

  // duplicated section elements
  path?: string;
  index?: number;
}
