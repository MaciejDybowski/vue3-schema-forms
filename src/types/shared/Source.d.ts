import { ResponseReference } from "@/types/shared/ResponseReference";

export interface Source {
  title?: string;
  value?: string;
  returnObject?: boolean;
}

export interface TableSource {
  headers: TableHeader[];
  data: string;
  buttons?: TableButton[];
}

export interface TableHeader {
  key: string;
  valueMapping: string;
  title: string | any;
  type: "TEXT" | "NUMBER" | "DATE" | "DATETIME" | "IMAGE" | "ICON" | "ALERT" | "COLLECTION";
  editable?: Array<HeaderEditableObject> | boolean;
  properties?: Record<string, any>;
  actions?: TableHeaderAction[];
  color?: string;
  items?: TableHeader[];
  footerMapping?: string;
  condition?: string;
}

export interface HeaderEditableObject {
  label: string;
  valueMapping: string;
  class?: string;
  type: "NUMBER" | "TEXT" | "SELECT";
  rules?: any[];
  condition?: string;
  readonly: ? string;
}

export interface TableHeaderAction {
  title: string;
  icon: string;
  props?: Record<string, any>;
  mode: "action" | string;
  config: Record<string, any>;
  code?: string;
  condition?: string;
  disabled?: string | boolean;

  // popup mode
  schema?: any;
  modelReference?: string;
}

export interface TableButton {
  label: string | { $ref: string };
  mode: "action" | "form-and-action" | string;
  btnProps?: Record<string, any>;
  config: Record<string, any> & TableButtonBatchAddConfig & TableDialogFromConfig;
  schema?: any;
  disabled?: boolean | string;
}

export interface TableDialogFromConfig {
  title: string;
  acceptText: string;
}

export interface TableButtonBatchAddConfig {
  code: string;
  featureId: string;
  viewId: string;
  batchAddAttributePath: string;
  scriptName: string;
}

export interface AvatarSource {
  thumbnail: string;
  preview: string;
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
  multiple?: boolean;
  maxSelection?: number;
}

export interface UserInputSource {
  url?: string;
  itemsPerPage?: number;
  lazy?: boolean;
  multiple?: boolean;
  maxSelection?: number;
  showMenuItemsOnFocusIn?: boolean;
  singleOptionAutoSelect?: boolean;
}
