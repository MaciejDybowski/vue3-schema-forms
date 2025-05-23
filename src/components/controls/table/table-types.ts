export type TableOptions = {
  groupBy?: Array<any>;
  groupDesc?: Array<any>;
  itemsPerPage: number;
  multiSort?: boolean;
  mustSort?: boolean;
  page: number;
  sortBy?: Array<any>;
  sortDesc?: Array<boolean>;
};

export type TableFetchOptions = {
  page: number;
  size: number;
  sort?: SortItem[] | null;
  filter?: TableFilter | null;
  query?: string | null;
};

export type SortItem = { key: string; order?: boolean | 'asc' | 'desc' };
export type TableFilter = Map<string, string>;
