import { makeAutoObservable, runInAction } from 'mobx'
import { QueryClient } from '@tanstack/react-query'
import { get } from '@/api/get'
import type { Product, ProductsResponse, ProductsSearchParams } from '@/interfaces'

export class ProductsStore {
  products: Product[] = []
  total = 0
  currentPage = 1
  itemsPerPage = 10
  searchQuery = ''
  sortBy?: string
  sortOrder: 'asc' | 'desc' = 'asc'
  isLoading = false
  error: string | null = null
  queryClient?: QueryClient

  constructor() {
    makeAutoObservable(this)
  }

  setQueryClient = (client: QueryClient) => {
    this.queryClient = client
  }

  get totalPages() {
    return Math.ceil(this.total / this.itemsPerPage)
  }

  get skip() {
    return (this.currentPage - 1) * this.itemsPerPage
  }

  setCurrentPage = (page: number) => {
    this.currentPage = page
    this.fetchProducts()
  }

  setSearchQuery = (query: string) => {
    this.searchQuery = query
    this.currentPage = 1 // Reset to first page on search
    this.fetchProducts()
  }

  setSorting = (field?: string, order: 'asc' | 'desc' = 'asc') => {
    this.sortBy = field
    this.sortOrder = order
    this.fetchProducts()
  }

  fetchProducts = async () => {
    if (this.isLoading) return

    runInAction(() => {
      this.isLoading = true
      this.error = null
    })

    try {
      const params: ProductsSearchParams = {
        limit: this.itemsPerPage,
        skip: this.skip,
      }

      if (this.searchQuery) {
        params.q = this.searchQuery
      }

      if (this.sortBy) {
        params.sortBy = this.sortBy
        params.order = this.sortOrder
      }

      const searchParams = new URLSearchParams()
      if (params.q) searchParams.set('q', params.q)
      if (params.limit) searchParams.set('limit', params.limit.toString())
      if (params.skip) searchParams.set('skip', params.skip.toString())
      if (params.sortBy) searchParams.set('sortBy', params.sortBy)
      if (params.order) searchParams.set('order', params.order)

      const endpoint = params.q 
        ? `products/search?${searchParams.toString()}`
        : `products?${searchParams.toString()}`

      const response = await get<ProductsResponse>(endpoint)

      runInAction(() => {
        this.products = response.products
        this.total = response.total
        this.isLoading = false
      })
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Ошибка загрузки продуктов'
        this.isLoading = false
      })
    }
  }

  refreshProducts = () => {
    this.fetchProducts()
  }

  // Debounced search
  private searchTimeout?: ReturnType<typeof setTimeout>
  
  debouncedSearch = (query: string) => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
    
    this.searchTimeout = setTimeout(() => {
      this.setSearchQuery(query)
    }, 300)
  }
}