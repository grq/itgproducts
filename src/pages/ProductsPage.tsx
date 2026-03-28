import { useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { ArrowUpDown, CircleEllipsis, PlusCircle, RefreshCw, Search } from 'lucide-react'

import { rootStore } from '@/stores'
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

type Product = {
  id: string
  name: string
  category: string
  vendor: string
  sku: string
  rating: number
  price: number
  image?: string
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'USB Флэшкарта 16GB',
    category: 'Аксессуары',
    vendor: 'Samsung',
    sku: 'RCH45Q1A',
    rating: 4.3,
    price: 48652,
  },
  {
    id: '2',
    name: 'Утюг Braun TexStyle 9',
    category: 'Бытовая техника',
    vendor: 'TexStyle',
    sku: 'DFCHQ1A',
    rating: 4.9,
    price: 4233,
  },
  {
    id: '3',
    name: 'Смартфон Apple iPhone 17',
    category: 'Телефоны',
    vendor: 'Apple',
    sku: 'GUYHD2-X4',
    rating: 4.7,
    price: 88652,
  },
  {
    id: '4',
    name: 'Игровая консоль PlayStation 5',
    category: 'Игровые приставки',
    vendor: 'Sony',
    sku: 'HT45Q21',
    rating: 4.1,
    price: 56236,
  },
  {
    id: '5',
    name: 'Фен Dyson Supersonic Nural',
    category: 'Электроника',
    vendor: 'Dyson',
    sku: 'FJHHGF-CR4',
    rating: 3.3,
    price: 48652,
  },
]

const ProductImage = ({ product }: { product: Product }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
    <span className="text-xs font-medium text-muted-foreground">
      {product.name.charAt(0)}
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

const PriceDisplay = ({ price }: { price: number }) => {
  const formatted = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price)
  
  return <div className="font-medium">{formatted}</div>
}

export const ProductsPage = observer(function ProductsPage() {
  const { user, logout } = rootStore.authStore
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
      accessorKey: 'name',
      header: 'Наименование',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <ProductImage product={row.original} />
          <div>
            <div className="font-medium">{row.getValue('name')}</div>
            <div className="text-sm text-muted-foreground">{row.original.category}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'vendor',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Вендор
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue('vendor')}</div>,
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
      cell: ({ row }) => <PriceDisplay price={row.getValue('price')} />,
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
                onClick={() => navigator.clipboard.writeText(product.id)}
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
    data: MOCK_PRODUCTS,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Товары</CardTitle>
                <CardDescription>
                  Управление каталогом товаров
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
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
                  value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  onChange={(event) =>
                    table.getColumn('name')?.setFilterValue(event.target.value)
                  }
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
                  {table.getRowModel().rows?.length ? (
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
                        Товары не найдены.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} из{' '}
                {table.getFilteredRowModel().rows.length} строк выбрано.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Назад
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Вперед
                </Button>
              </div>
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