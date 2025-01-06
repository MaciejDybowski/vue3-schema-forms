import { ResponseReference } from "@/types/shared/ResponseReference";

export interface Source {
  title?: string;
  value?: string;
  returnObject?: boolean;
}

export interface TableSource {
  headers: string,
  data: string,
  updateRow: string,
}

export interface AvatarSource {
  thumbnail: string,
  preview: string,
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

export interface UserInputSource {
  url?: string;
  itemsPerPage?: number;
  lazy?: boolean;
  multiple?: boolean;
  maxSelection?: number;
  showMenuItemsOnFocusIn?: boolean;
}
