import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { rootStore } from '@/stores'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { useProductsTableColumns } from '@/pages/products/products-table-columns'
import { ProductsTableFooter } from '@/pages/products/products-table-footer'
import { ProductsTableHeader } from '@/pages/products/products-table-header'
import { ProductsTableSkeleton } from '@/pages/products/products-table-skeleton'

export const ProductsTable = observer(function ProductsTable() {
  const { productsStore } = rootStore

  const columns = useProductsTableColumns()

  const handleSortingChange = useCallback((updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
    const prev = productsStore.tableSorting
    const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue
    const sort = newSorting[0]
    if (sort) {
      productsStore.setSorting(sort.id, sort.desc ? 'desc' : 'asc')
    } else {
      productsStore.setSorting(undefined)
    }
  }, [productsStore])

  const table = useReactTable({
    data: productsStore.products,
    columns,
    getRowId: (row) => String(row.id),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: handleSortingChange,
    onRowSelectionChange: productsStore.setRowSelection,
    state: {
      sorting: productsStore.tableSorting,
      rowSelection: productsStore.rowSelection,
    },
    manualSorting: true,
    manualPagination: true,
  })

  const hasRows = table.getRowModel().rows?.length

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-card">
      <ProductsTableHeader />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border">
        {productsStore.isFetching ? (
          <Progress
            indeterminate
            className="h-1 shrink-0 rounded-none absolute top-0 left-0 w-full z-100"
            aria-label="Загрузка данных"
          />
        ) : null}
        <div className="min-h-0 flex-1 overflow-auto overscroll-contain bg-card">
          <Table className="table-fixed" containerClassName="min-h-full overflow-visible">
            <colgroup>
              <col className="w-[4%]" />
              <col className="min-w-0 w-[38%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
              <col className="w-[10%]" />
              <col className="w-[11%]" />
              <col className="w-[9%]" />
            </colgroup>
            <TableHeader className="sticky top-0 z-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="group/header">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody aria-busy={productsStore.isFetching}>
              {productsStore.isFetching ? (
                <ProductsTableSkeleton rowCount={productsStore.itemsPerPage} />
              ) : hasRows ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center p-6"
                  >
                    Товары не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ProductsTableFooter />
    </div>
  )
})