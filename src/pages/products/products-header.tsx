import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { rootStore } from '@/stores'

export const ProductsHeader = observer(function ProductsHeader() {
  const productsStore = rootStore.productsStore

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    productsStore.debouncedSearch(e.target.value)
  }, [productsStore])

  return (
    <div className="grid grid-cols-6 gap-4 bg-card p-6">
      <h1 className="text-2xl font-bold tracking-tight">Товары</h1>

      <div className="col-span-4 flex relative w-full">
        <Search
          className="pointer-events-none absolute top-2 left-2 size-4 text-muted-foreground"
          aria-hidden
        />
        <Input
          placeholder="Найти"
          value={productsStore.searchInput}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>
    </div>
  )
})