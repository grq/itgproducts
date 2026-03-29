import type { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string
    headerAlign?: 'start' | 'center'
    bold?: boolean
  }
}
