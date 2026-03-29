import type { HeaderContext } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import type { Product } from '@/interfaces'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function ColumnHeaderRegular({ column }: HeaderContext<Product, unknown>) {
  const label = column.columnDef.meta?.label ?? ''
  const plainAlign = column.columnDef.meta?.headerAlign ?? 'center'

  if (!column.getCanSort()) {
    return (
      <div className={cn('text-muted-foreground', {
        'text-center': plainAlign === 'center',
        'text-start': plainAlign === 'start',
      })}>
        {label}
      </div>
    )
  }

  const sorted = column.getIsSorted()
  const isActive = sorted !== false

  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-1 px-1">
      <div className="min-w-0" aria-hidden />
      <span className="justify-self-center text-center text-muted-foreground">{label}</span>
      <div className="flex min-h-6 items-center justify-end">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className={cn(
            'shrink-0 transition-opacity duration-150',
            !isActive &&
            'pointer-events-none text-muted-foreground opacity-0 group-hover/header:pointer-events-auto group-hover/header:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100',
            isActive &&
            'pointer-events-auto text-primary opacity-100 hover:bg-primary/10 hover:text-primary [&_svg]:text-primary',
          )}
          onClick={(e) => {
            e.stopPropagation()
            if (sorted === false) {
              column.toggleSorting(false)
            } else if (sorted === 'asc') {
              column.toggleSorting(true)
            } else {
              column.clearSorting()
            }
          }}
          aria-label={`Сортировка: ${label}`}
        >
          {sorted === 'asc' ? (
            <ArrowUp className="size-3.5" />
          ) : sorted === 'desc' ? (
            <ArrowDown className="size-3.5" />
          ) : (
            <ArrowUpDown className="size-3.5" />
          )}
        </Button>
      </div>
    </div>
  )
}
