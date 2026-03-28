import { Link } from '@tanstack/react-router'

import {
  PageLayout,
  PageHeader,
  ContentCard,
  SectionHeader,
  SectionTitle,
  SectionActions,
} from '@/components/ui/page-layout'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import {
  DataTable,
  DataTableHeader,
  DataTableHeaderCell,
  DataTableRow,
  ProductThumbnail,
  ProductInfo,
  ProductName,
  ProductCategory,
  Rating,
  Price,
  TableCellCheckbox,
  ActionBadge,
  RowActions,
} from '@/components/ui/data-table'
import {
  Pagination,
  PaginationInfo,
  PaginationNav,
  PaginationPrev,
  PaginationNext,
  PaginationPages,
  PaginationPage,
} from '@/components/ui/pagination'
import { ArrowUpDown, CircleEllipsis, PlusCircle, RefreshCw } from 'lucide-react'
import { useAuth } from '@/context/auth'

type RowModel = {
  id: string
  name: string
  nameVariant?: 'default' | 'dark'
  category: string
  vendor: string
  sku: string
  rating: { value: string; low?: boolean }
  price: { main: string; decimal: string }
  selected?: boolean
}

const MOCK_ROWS: RowModel[] = [
  {
    id: '1',
    name: 'USB Флэшкарта 16GB',
    category: 'Аксессуары',
    vendor: 'Samsung',
    sku: 'RCH45Q1A',
    rating: { value: '4.3' },
    price: { main: '48 652', decimal: ',00' },
  },
  {
    id: '2',
    name: 'Утюг Braun TexStyle 9',
    nameVariant: 'dark',
    category: 'Бытовая техника',
    vendor: 'TexStyle',
    sku: 'DFCHQ1A',
    rating: { value: '4.9' },
    price: { main: '4 233', decimal: ',00' },
  },
  {
    id: '3',
    name: 'Смартфон Apple iPhone 17',
    nameVariant: 'dark',
    category: 'Телефоны',
    vendor: 'Apple',
    sku: 'GUYHD2-X4',
    rating: { value: '4.7' },
    price: { main: '88 652', decimal: ',00' },
    selected: true,
  },
  {
    id: '4',
    name: 'Игровая консоль PlaySta...',
    nameVariant: 'dark',
    category: 'Игровые приставки',
    vendor: 'Sony',
    sku: 'HT45Q21',
    rating: { value: '4.1' },
    price: { main: '56 236', decimal: ',00' },
  },
  {
    id: '5',
    name: 'Фен Dyson Supersonic Nural',
    nameVariant: 'dark',
    category: 'Электроника',
    vendor: 'Dyson',
    sku: 'FJHHGF-CR4',
    rating: { value: '3.3', low: true },
    price: { main: '48 652', decimal: ',00' },
  },
]

function ProductRow({ row }: { row: RowModel }) {
  return (
    <DataTableRow selected={row.selected}>
      <div
        className={`flex shrink-0 items-center gap-[18px] ${row.selected ? 'w-[316px]' : 'w-[278px]'}`}
      >
        <TableCellCheckbox checked={row.selected} />
        <ProductThumbnail />
        <ProductInfo>
          <ProductName variant={row.nameVariant}>{row.name}</ProductName>
          <ProductCategory>{row.category}</ProductCategory>
        </ProductInfo>
      </div>

      <div
        className={`flex min-w-0 max-w-full flex-1 items-center gap-[132px] ${row.selected ? 'pl-[163px]' : ''}`}
      >
        <p className="m-0 w-[125px] text-center font-sans text-base font-bold leading-none text-products-text">
          {row.vendor}
        </p>
        <p className="m-0 w-[160px] text-center font-sans text-base font-normal leading-none text-products-text">
          {row.sku}
        </p>
        <Rating value={row.rating.value} variant={row.rating.low ? 'low' : 'default'} />
        <Price main={row.price.main} decimal={row.price.decimal} />
        <RowActions>
          <ActionBadge>
            <ArrowUpDown className="size-6 text-white" aria-hidden strokeWidth={1.6} />
          </ActionBadge>
          <CircleEllipsis className="size-8 text-[#b2b3b9]" aria-hidden strokeWidth={1.5} />
        </RowActions>
      </div>
    </DataTableRow>
  )
}

export function ProductsPage() {
  const { user, logout } = useAuth()

  return (
    <PageLayout variant="products">
      <PageHeader title="Товары">
        <div className="flex h-[100px] flex-1 items-center justify-center">
          <SearchInput placeholder="Найти" />
        </div>
      </PageHeader>

      <ContentCard>
        <SectionHeader>
          <SectionTitle>Все позиции</SectionTitle>
          <SectionActions>
            <Button variant="icon-outline" size="icon">
              <RefreshCw className="size-[22px]" aria-hidden strokeWidth={1.5} />
            </Button>
            <Button variant="products">
              <PlusCircle className="size-[22px]" aria-hidden strokeWidth={1.5} />
              <span>Добавить</span>
            </Button>
          </SectionActions>
        </SectionHeader>

        <DataTable>
          <DataTableHeader>
            <div className="flex w-[278px] shrink-0 items-center gap-5">
              <TableCellCheckbox />
              <DataTableHeaderCell>Наименование</DataTableHeaderCell>
            </div>
            <div className="flex w-[1218px] shrink-0 items-center justify-center gap-[150px]">
              <DataTableHeaderCell className="w-[125px]">Вендор</DataTableHeaderCell>
              <DataTableHeaderCell className="w-[125px]">Артикул</DataTableHeaderCell>
              <DataTableHeaderCell className="w-[125px]">Оценка</DataTableHeaderCell>
              <DataTableHeaderCell className="w-[125px]">Цена, ₽</DataTableHeaderCell>
            </div>
          </DataTableHeader>

          {MOCK_ROWS.map((row) => (
            <ProductRow key={row.id} row={row} />
          ))}
        </DataTable>

        <Pagination>
          <PaginationInfo from={1} to={20} total={120} />
          <PaginationNav>
            <PaginationPrev />
            <PaginationPages>
              <PaginationPage page={1} active />
              <PaginationPage page={2} />
              <PaginationPage page={3} />
              <PaginationPage page={4} />
              <PaginationPage page={5} />
            </PaginationPages>
            <PaginationNext />
          </PaginationNav>
        </Pagination>
      </ContentCard>

      <nav
        className="fixed right-3 bottom-3 z-10 flex gap-2 text-xs text-products-primary underline"
        aria-label="Макеты"
      >
        {user && (
          <>
            <span className="text-products-text no-underline">
              {user.firstName} {user.lastName}
            </span>
            <button onClick={logout} className="cursor-pointer">
              Выйти
            </button>
          </>
        )}
        <Link to="/login">Авторизация</Link>
      </nav>
    </PageLayout>
  )
}
