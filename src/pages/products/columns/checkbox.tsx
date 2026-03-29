import type { CellContext } from '@tanstack/react-table'

import type { Product } from '@/interfaces'
import { Checkbox } from '@/components/ui/checkbox'
import { useCallback } from 'react'

export const ColumnCellCheckbox = ({ row }: CellContext<Product, unknown>) => {
  const handleCheckedChange = useCallback((value: boolean) => {
    row.toggleSelected(!!value)
  }, [])

  return (
    <div className="flex items-center justify-center" >
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={handleCheckedChange}
        aria-label="Выбрать строку"
      />
    </div >
  )
}