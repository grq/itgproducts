import { observer } from 'mobx-react-lite'
import { PlusCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { rootStore } from '@/stores'
import { cn } from '@/lib/utils'

export const ProductsTableHeader = observer(function ProductsTableHeader() {
  const productsStore = rootStore.productsStore

  return (
    <div className="flex shrink-0 items-center justify-between bg-card p-6">
      <div>
        <CardTitle className="text-xl font-bold">Все позиции</CardTitle>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => productsStore.refreshProducts()}
          disabled={productsStore.isFetching}
        >
          <RefreshCw className={cn({
            'animate-spin': productsStore.isFetching,
          })} />
        </Button>
        <Button>
          <PlusCircle />
          Добавить
        </Button>
      </div>
    </div>
  )
})