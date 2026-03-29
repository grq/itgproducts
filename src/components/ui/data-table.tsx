import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

function DataTable({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="data-table" className={cn('flex w-full flex-col', className)} {...props}>
      {children}
    </div>
  )
}

function DataTableHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="data-table-header"
      className={cn('flex h-[73px] items-center gap-[79px] px-[18px]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function DataTableHeaderCell({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="data-table-header-cell"
      className={cn(
        'block text-center font-heading text-base font-bold leading-none text-products-text-muted',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

const dataTableRowVariants = cva(
  '-mt-px flex min-h-[71px] items-center border-y border-products-border',
  {
    variants: {
      selected: {
        true: 'gap-[15px] pr-[18px]',
        false: 'gap-[215px] px-[18px]',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

interface DataTableRowProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dataTableRowVariants> {}

function DataTableRow({ className, selected, children, ...props }: DataTableRowProps) {
  return (
    <div
      data-slot="data-table-row"
      data-selected={selected}
      className={cn(dataTableRowVariants({ selected }), className)}
      {...props}
    >
      {selected && (
        <div className="mt-px h-[69px] w-[3px] shrink-0 self-stretch bg-products-selected" />
      )}
      <div className={cn('flex min-w-0 flex-1 items-center', selected ? 'gap-[215px]' : '')}>
        {children}
      </div>
    </div>
  )
}

const dataTableCellVariants = cva('m-0 text-center', {
  variants: {
    variant: {
      default: 'font-sans text-base font-normal leading-none text-products-text',
      bold: 'font-sans text-base font-bold leading-none text-products-text',
      muted: 'font-sans text-base font-normal leading-none text-products-text-muted',
      mono: 'font-mono text-base leading-[1.1] text-products-text',
    },
    width: {
      default: 'w-[125px]',
      wide: 'w-[160px]',
      actions: 'w-[133px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    width: 'default',
  },
})

interface DataTableCellProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof dataTableCellVariants> {}

function DataTableCell({ className, variant, width, ...props }: DataTableCellProps) {
  return (
    <p
      data-slot="data-table-cell"
      className={cn(dataTableCellVariants({ variant, width }), className)}
      {...props}
    />
  )
}

const productThumbnailVariants = cva(
  'shrink-0 rounded-lg border border-products-border-light bg-products-thumbnail',
  {
    variants: {
      size: {
        default: 'size-12',
        sm: 'size-8',
        lg: 'size-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

interface ProductThumbnailProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof productThumbnailVariants> {
  src?: string
  alt?: string
}

function ProductThumbnail({ className, size, src, alt, ...props }: ProductThumbnailProps) {
  return (
    <div
      data-slot="product-thumbnail"
      className={cn(productThumbnailVariants({ size }), className)}
      {...props}
    >
      {src && <img src={src} alt={alt || ''} className="size-full rounded-lg object-cover" />}
    </div>
  )
}

function ProductInfo({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="product-info"
      className={cn('flex min-w-0 w-[210px] flex-col gap-2.5', className)}
      {...props}
    >
      {children}
    </div>
  )
}

const productNameVariants = cva('m-0 truncate font-heading text-base font-bold leading-none', {
  variants: {
    variant: {
      default: 'text-[#161919]',
      dark: 'text-products-text',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface ProductNameProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof productNameVariants> {}

function ProductName({ className, variant, ...props }: ProductNameProps) {
  return (
    <p
      data-slot="product-name"
      className={cn(productNameVariants({ variant }), className)}
      {...props}
    />
  )
}

function ProductCategory({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="product-category"
      className={cn(
        'm-0 font-heading text-sm font-normal leading-none text-products-text-muted',
        className
      )}
      {...props}
    />
  )
}

const ratingVariants = cva(
  'm-0 w-[125px] text-center font-sans text-base font-normal leading-none',
  {
    variants: {
      variant: {
        default: 'text-products-text',
        low: 'text-products-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface RatingProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof ratingVariants> {
  value: string
  maxValue?: string
}

function Rating({ className, variant, value, maxValue = '5', ...props }: RatingProps) {
  return (
    <p data-slot="rating" className={cn(ratingVariants({ variant }), className)} {...props}>
      {variant === 'low' ? (
        <>
          <span className="text-products-danger">{value}</span>
          <span className="text-products-text">/{maxValue}</span>
        </>
      ) : (
        `${value}/${maxValue}`
      )}
    </p>
  )
}

function Price({
  className,
  main,
  decimal,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  main: string
  decimal: string
}) {
  return (
    <p
      data-slot="price"
      className={cn(
        'm-0 w-[160px] text-center font-mono text-base leading-[1.1] text-products-text',
        className
      )}
      {...props}
    >
      <span>{main}</span>
      <span className="text-products-text-secondary">{decimal}</span>
    </p>
  )
}

const tableCellCheckboxVariants = cva('size-[22px] shrink-0 rounded border', {
  variants: {
    checked: {
      true: 'border-products-selected bg-products-selected',
      false: 'border-products-text-muted bg-products-card',
    },
  },
  defaultVariants: {
    checked: false,
  },
})

interface TableCellCheckboxProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tableCellCheckboxVariants> {}

function TableCellCheckbox({ className, checked, ...props }: TableCellCheckboxProps) {
  return (
    <div
      data-slot="table-cell-checkbox"
      className={cn(tableCellCheckboxVariants({ checked }), className)}
      aria-hidden
      {...props}
    />
  )
}

const actionBadgeVariants = cva('flex items-center justify-center rounded-[23px] p-1', {
  variants: {
    variant: {
      primary: 'bg-products-primary',
    },
    size: {
      default: 'h-[27px] w-[52px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

interface ActionBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof actionBadgeVariants> {}

function ActionBadge({ className, variant, size, ...props }: ActionBadgeProps) {
  return (
    <div
      data-slot="action-badge"
      className={cn(actionBadgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function RowActions({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="row-actions"
      className={cn('flex w-[133px] shrink-0 items-center justify-center gap-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  DataTable,
  DataTableHeader,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  ProductThumbnail,
  ProductInfo,
  ProductName,
  ProductCategory,
  Rating,
  Price,
  TableCellCheckbox,
  ActionBadge,
  RowActions,
}
