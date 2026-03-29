import { observer } from 'mobx-react-lite'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { rootStore } from '@/stores'
import { useMemo } from 'react'

export const ProductsPagination = observer(function ProductsPagination() {
  const productsStore = rootStore.productsStore
  const busy = productsStore.isFetching

  const visiblePages = useMemo(() => {
    const delta = 2
    const range: number[] = []
    const rangeWithDots: (number | '...')[] = []
    const currentPage = productsStore.currentPage
    const totalPages = productsStore.totalPages

    if (totalPages <= 1) return rangeWithDots

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
  }, [productsStore.currentPage, productsStore.totalPages])

  if (productsStore.totalPages <= 1) return null

  return (
    <Pagination className="mx-0 w-auto max-w-none justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text=""
            onClick={() => {
              if (busy) return
              productsStore.setCurrentPage(Math.max(1, productsStore.currentPage - 1))
            }}
            className={cn('cursor-pointer', {
              'pointer-events-none opacity-50': busy || productsStore.currentPage === 1,
            })}
          />
        </PaginationItem>

        {visiblePages.map((page, index) => (
          <PaginationItem key={index}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => {
                  if (busy) return
                  productsStore.setCurrentPage(page as number)
                }}
                isActive={productsStore.currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            text=""
            onClick={() => {
              if (busy) return
              productsStore.setCurrentPage(Math.min(productsStore.totalPages, productsStore.currentPage + 1))
            }}
            className={cn('cursor-pointer', {
              'pointer-events-none opacity-50': busy || productsStore.currentPage === productsStore.totalPages,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
})