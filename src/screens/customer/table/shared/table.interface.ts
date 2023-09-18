import { MRT_ColumnDef } from "material-react-table";

export interface TableProps<T> {
  columns: MRT_ColumnDef<Record<string, T>>[];

  rows: Record<string, T>[];
}
