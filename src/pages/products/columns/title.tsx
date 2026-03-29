import type { CellContext } from '@tanstack/react-table'
import type { Product } from '@/interfaces'

export const ColumnCellTitle = ({ row, column }: CellContext<Product, unknown>) => (
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted overflow-hidden">
      {row.original.thumbnail ? (
        <img
          src={row.original.thumbnail}
          alt={row.original.title}
          className="h-full w-full object-cover"
          onError={e => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling?.classList.remove('hidden')
          }}
        />
      ) : null}
      <span
        className={`text-xs font-medium text-muted-foreground ${row.original.thumbnail ? 'hidden' : ''}`}
      >
        {row.original.title.charAt(0)}
      </span>
    </div>
    <div>
      <div className="font-medium">{row.getValue(column.id)}</div>
      <div className="text-sm text-muted-foreground">{row.original.category}</div>
    </div>
  </div>
)