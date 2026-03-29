import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { ProductsSearch as ProductsSearchType } from '@/routes/index'

import { rootStore } from '@/stores'
import { ProductsHeader } from '@/pages/products/products-header'
import { ProductsTable } from '@/pages/products/products-table'
import { ProductsError } from '@/pages/products/products-error'

export const ProductsPage = observer(function ProductsPage() {
  const { productsStore } = rootStore
  const navigate = useNavigate()
  const search = useSearch({ from: '/' }) as ProductsSearchType

  useEffect(() => {
    productsStore.setUpdateUrlCallback((state) => {
      navigate({
        to: '/',
        search: state,
        replace: true,
      })
    })
  }, [productsStore, navigate])

  useEffect(() => {
    productsStore.initFromUrl(search)
    productsStore.fetchProducts()
  }, [productsStore, search])

  if (productsStore.error) {
    return <ProductsError error={productsStore.error} onRefresh={() => productsStore.fetchProducts()} />
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden">
      <ProductsHeader />
      <ProductsTable />
    </div>
  )
})
