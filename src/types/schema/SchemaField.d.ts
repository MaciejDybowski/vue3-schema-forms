import { Layout } from '@/types/shared/Layout';
import { LocationResult } from '@/types/shared/LocationResult';
import { SchemaFieldType } from '@/types/shared/SchemaFieldType';
import { SchemaSimpleValidation } from '@/types/shared/SchemaSimpleValidation';
import { SourceDefinition } from '@/types/shared/Source';

export type DownloadFileRenderMode = 'button' | 'link';

export type ExternalApiMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export interface ExternalApiCaller {
  serviceCode: string;
  method: ExternalApiMethod;
  endpoint: string;
  body?: Record<string, any>;
  query?: Record<string, any>;
  params?: Record<string, any>;
}

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
  source?: SourceDefinition;
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

  // download-file
  renderMode?: DownloadFileRenderMode;
  externalApi?: ExternalApiCaller;
  fileName?: string;
  fileType?: string;
  status?: 'ready' | 'generating' | 'expired';
}
