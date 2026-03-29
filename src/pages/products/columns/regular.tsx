import type { CellContext } from "@tanstack/react-table"
import type { Product } from "@/interfaces"
import { cn } from "@/lib/utils"

export const ColumnCellRegular = ({ row, column }: CellContext<Product, unknown>) => {
  const bold = column.columnDef.meta?.bold ?? false

  return (
    <div className={cn('text-center', {
      'font-bold': bold
    })}>
      {row.getValue(column.id)}
    </div>
  )
}