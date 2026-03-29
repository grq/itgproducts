import { observer } from 'mobx-react-lite'
import { rootStore } from '@/stores'
import { ProductsPagination } from '@/pages/products/products-pagination'

export const ProductsTableFooter = observer(function ProductsTableFooter() {
  const productsStore = rootStore.productsStore
  const { total, currentPage, itemsPerPage, products } = productsStore

  const skip = (currentPage - 1) * itemsPerPage
  const rangeStart = total === 0 ? 0 : skip + 1
  const rangeEnd = total === 0 ? 0 : Math.min(skip + products.length, total)

  return (
    <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border bg-card px-6 py-4">
      <div className="min-w-0 text-sm text-muted-foreground space-x-1">
        <span>Показано</span>
        <span className="font-semibold text-foreground">
          {rangeStart}-{rangeEnd}
        </span>
        <span>из</span>
        <span className="font-semibold text-foreground">{total}</span>
      </div>
      <div className="flex shrink-0 justify-end">
        <ProductsPagination />
      </div>
    </div>
  )
})