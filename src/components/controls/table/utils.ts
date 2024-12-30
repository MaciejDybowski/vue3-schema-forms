import { SortItem } from "@/components/controls/table/TableField.vue";

export function mapSort(sort: SortItem[]): string[] | null {
  if (!sort || sort.length == 0) {
    return null;
  } else {
    return sort.map((val) => `${val.key},${val.order}`);
  }
}

export function mapQuery(query: string | null | undefined) {
  return query !== "" && query ? query : undefined;
}
