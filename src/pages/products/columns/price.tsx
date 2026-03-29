import type { CellContext } from '@tanstack/react-table'
import type { Product } from '@/interfaces'

const priceFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatPrice(amount: number) {
  return priceFormatter.format(amount).replace(/,/g, ' ')
}

export const ColumnCellPrice = ({ row, column }: CellContext<Product, unknown>) => {
  const value = row.getValue<number>(column.id)

  if (!value) return null

  return (
    <div className="text-center">
      <div className="font-mono tabular-nums">${formatPrice(value)}</div>
    </div>
  )
}