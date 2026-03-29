import type { CellContext } from '@tanstack/react-table'
import type { Product } from '@/interfaces'

export const ColumnCellRating = ({ row, column }: CellContext<Product, unknown>) => {
  const value = row.getValue<number>(column.id)

  if (!value) return null

  if (value < 3.5) {
    return (
      <div className="text-center text-red-400">
        {value.toFixed(1)} / 5
      </div>
    )
  }
  return (
    <div className="text-center">
      {value.toFixed(1)} / 5
    </div>
  )
}