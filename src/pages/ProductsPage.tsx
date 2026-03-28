import { useState, useMemo, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, CircleEllipsis, PlusCircle, RefreshCw, Search } from 'lucide-react'

import { rootStore } from '@/stores'
import type { Product } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const ProductImage = ({ product }: { product: Product }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted overflow-hidden">
    {product.thumbnail ? (
      <img 
        src={product.thumbnail} 
        alt={product.title}
        className="h-full w-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          target.nextElementSibling?.classList.remove('hidden')
        }}
      />
    ) : null}
    <span className={`text-xs font-medium text-muted-foreground ${product.thumbnail ? 'hidden' : ''}`}>
      {product.title.charAt(0)}
    </span>
  </div>
)

const RatingBadge = ({ rating }: { rating: number }) => (
  <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
    rating >= 4.5 ? 'bg-green-100 text-green-800' :
    rating >= 4.0 ? 'bg-blue-100 text-blue-800' :
    rating >= 3.5 ? 'bg-yellow-100 text-yellow-800' :
    'bg-red-100 text-red-800'
  }`}>
    ★ {rating.toFixed(1)}
  </div>
)

const PriceDisplay = ({ price, discountPercentage }: { price: number; discountPercentage?: number }) => {
  const hasDiscount = discountPercentage && discountPercentage > 0
  const originalPrice = hasDiscount ? price / (1 - discountPercentage / 100) : price
  
  return (
    <div className="text-right">
      <div className="font-medium">${price.toFixed(2)}</div>
      {hasDiscount && (
        <div className="text-xs text-muted-foreground line-through">
          ${originalPrice.toFixed(2)}
        </div>
      )}
    </div>
  )
}

const StockBadge = ({ stock }: { stock: number; availabilityStatus: string }) => {
  const getStockColor = () => {
    if (stock === 0) return 'bg-red-100 text-red-800'
    if (stock < 10) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  return (
    <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStockColor()}`}>
      {stock} шт.
    </div>
  )
}

export const ProductsPage = observer(function ProductsPage() {
  const { user, logout } = rootStore.authStore
  const productsStore = rootStore.productsStore
  const [searchInput, setSearchInput] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    productsStore.fetchProducts()
  }, [productsStore])

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value)
    productsStore.debouncedSearch(value)
  }, [productsStore])

  const handleSortingChange = useCallback((updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
    const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue
    setSorting(newSorting)
    const sort = newSorting[0]
    if (sort) {
      productsStore.setSorting(sort.id, sort.desc ? 'desc' : 'asc')
    } else {
      productsStore.setSorting(undefined)
    }
  }, [productsStore, sorting])

  const columns: ColumnDef<Product>[] = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Выбрать все"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Выбрать строку"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: 'Наименование',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <ProductImage product={row.original} />
          <div>
            <div className="font-medium">{row.getValue('title')}</div>
            <div className="text-sm text-muted-foreground">{row.original.category}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'brand',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Бренд
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue('brand') || 'N/A'}</div>,
    },
    {
      accessorKey: 'sku',
      header: 'Артикул',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('sku')}</div>
      ),
    },
    {
      accessorKey: 'rating',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Оценка
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <RatingBadge rating={row.getValue('rating')} />,
    },
    {
      accessorKey: 'stock',
      header: 'Остаток',
      cell: ({ row }) => (
        <StockBadge 
          stock={row.getValue('stock')} 
          availabilityStatus={row.original.availabilityStatus}
        />
      ),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Цена
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <PriceDisplay 
          price={row.getValue('price')} 
          discountPercentage={row.original.discountPercentage}
        />
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Открыть меню</span>
                <CircleEllipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id.toString())}
              >
                Копировать ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Просмотреть детали</DropdownMenuItem>
              <DropdownMenuItem>Редактировать</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ], [])

  const table = useReactTable({
    data: productsStore.products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: handleSortingChange,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
    manualSorting: true, // We handle sorting via MobX store
    manualPagination: true, // We handle pagination via MobX store
  })

  const renderPagination = () => {
    if (productsStore.totalPages <= 1) return null

    const getVisiblePages = () => {
      const delta = 2
      const range = []
      const rangeWithDots = []
      const currentPage = productsStore.currentPage
      const totalPages = productsStore.totalPages

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i)
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages)
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages)
      }

      return rangeWithDots
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => productsStore.setCurrentPage(Math.max(1, productsStore.currentPage - 1))}
              className={productsStore.currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          
          {getVisiblePages().map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => productsStore.setCurrentPage(page as number)}
                  isActive={productsStore.currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => productsStore.setCurrentPage(Math.min(productsStore.totalPages, productsStore.currentPage + 1))}
              className={productsStore.currentPage === productsStore.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  if (productsStore.error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-destructive">Ошибка загрузки данных</h2>
                <p className="text-muted-foreground mt-2">{productsStore.error}</p>
                <Button onClick={() => productsStore.refreshProducts()} className="mt-4">
                  Попробовать снова
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Товары</CardTitle>
                <CardDescription>
                  Управление каталогом товаров ({productsStore.total} товаров)
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => productsStore.refreshProducts()} 
                  disabled={productsStore.isLoading}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${productsStore.isLoading ? 'animate-spin' : ''}`} />
                  Обновить
                </Button>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Добавить товар
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center py-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchInput}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  className="pl-8 max-w-sm"
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
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
                <TableBody>
                  {productsStore.isLoading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        <div className="flex items-center justify-center">
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Загрузка...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows?.length ? (
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
                        className="h-24 text-center"
                      >
                        {productsStore.searchQuery ? 'Товары не найдены по запросу.' : 'Товары не найдены.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} из{' '}
                {productsStore.products.length} строк выбрано.
              </div>
              {renderPagination()}
            </div>
          </CardContent>
        </Card>

        <nav
          className="fixed right-3 bottom-3 z-10 flex gap-2 text-xs text-primary underline"
          aria-label="Макеты"
        >
          {user && (
            <>
              <span className="text-muted-foreground no-underline">
                {user.firstName} {user.lastName}
              </span>
              <button onClick={() => logout()} className="cursor-pointer">
                Выйти
              </button>
            </>
          )}
          <Link to="/login">Авторизация</Link>
        </nav>
      </div>
    </div>
  )
})