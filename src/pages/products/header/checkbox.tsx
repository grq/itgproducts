import type { HeaderContext } from '@tanstack/react-table'

import type { Product } from '@/interfaces'
import { Checkbox } from '@/components/ui/checkbox'
import { useCallback, useMemo } from 'react'


export const ColumnHeaderCheckbox = ({ table }: HeaderContext<Product, unknown>) => {
  const handleCheckedChange = useCallback((value: boolean) => {
    table.toggleAllPageRowsSelected(!!value)
  }, [])

  const checked = useMemo(() => {
    return table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
  }, [table])

  return (
    <div className="flex items-center justify-center">
      <Checkbox
        checked={checked}
        onCheckedChange={handleCheckedChange}
        aria-label="Выбрать все"
      />
    </div>
  )
}