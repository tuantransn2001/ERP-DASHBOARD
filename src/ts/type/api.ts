export interface PaginationMeta {
  total: number;
  from: number;
  to: number;
  per_page: number;
  current_page: number;
  last_page: number;
  prev_page_url: number;
  next_page_url: number;
}
export interface EntryData<T, List extends boolean = false> {
  data: T;
  pagination?: List extends true ? PaginationMeta : never;
}
