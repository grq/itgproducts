import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'

import type { Product } from '@/interfaces'
import { ColumnCellRating } from '@/pages/products/columns/rating'
import { ColumnCellPrice } from '@/pages/products/columns/price'
import { ColumnCellTitle } from '@/pages/products/columns/title'
import { ColumnCellActions } from '@/pages/products/columns/actions'
import { ColumnCellCheckbox } from '@/pages/products/columns/checkbox'
import { ColumnCellRegular } from '@/pages/products/columns/regular'
import { ColumnHeaderCheckbox } from '@/pages/products/header/checkbox'
import { ColumnHeaderRegular } from '@/pages/products/header/regular'

export function useProductsTableColumns(): ColumnDef<Product>[] {
  return useMemo(() => [
    {
      id: 'select',
      header: ColumnHeaderCheckbox,
      cell: ColumnCellCheckbox,
      enableSorting: false,
    },
    {
      accessorKey: 'title',
      enableSorting: false,
      label: 'Наименование',
      meta: { label: 'Наименование', headerAlign: 'start' },
      header: ColumnHeaderRegular,
      cell: ColumnCellTitle,
    },
    {
      accessorKey: 'brand',
      enableSorting: true,
      meta: { label: 'Вендор', bold: true },
      header: ColumnHeaderRegular,
      cell: ColumnCellRegular,
    },
    {
      accessorKey: 'sku',
      enableSorting: false,
      meta: { label: 'Артикул' },
      header: ColumnHeaderRegular,
      cell: ColumnCellRegular,
    },
    {
      accessorKey: 'rating',
      enableSorting: true,
      meta: { label: 'Оценка' },
      header: ColumnHeaderRegular,
      cell: ColumnCellRating,
    },
    {
      accessorKey: 'price',
      enableSorting: true,
      meta: { label: 'Цена' },
      header: ColumnHeaderRegular,
      cell: ColumnCellPrice,
    },
    {
      id: 'actions',
      enableSorting: false,
      cell: ColumnCellActions,
    },
  ], [])
}