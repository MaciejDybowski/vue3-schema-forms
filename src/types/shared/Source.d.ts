import { ResponseReference } from "@/types/shared/ResponseReference";

export interface Source {
  title?: string;
  value?: string;
  returnObject?: boolean;
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
