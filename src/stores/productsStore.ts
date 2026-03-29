import { makeAutoObservable, runInAction } from 'mobx'
import { QueryClient } from '@tanstack/react-query'
import type { RowSelectionState, SortingState } from '@tanstack/react-table'
import { get } from '@/api/get'
import type { Product, ProductsResponse, ProductsSearchParams } from '@/interfaces'

export interface ProductsUrlState {
  page?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export class ProductsStore {
  products: Product[] = []
  total = 0
  currentPage = 1
  itemsPerPage = 10
  searchQuery = ''
  searchInput = ''
  sortBy?: string
  sortOrder: 'asc' | 'desc' = 'asc'
  isLoading = false
  isFetching = false
  error: string | null = null
  queryClient?: QueryClient

  rowSelection: RowSelectionState = {}

  private updateUrlCallback?: (state: ProductsUrlState) => void

  constructor() {
    makeAutoObservable(this)
  }

  setQueryClient = (client: QueryClient) => {
    this.queryClient = client
  }

  setUpdateUrlCallback = (callback: (state: ProductsUrlState) => void) => {
    this.updateUrlCallback = callback
  }

  initFromUrl = (urlState: ProductsUrlState) => {
    this.currentPage = urlState.page || 1
    this.searchQuery = urlState.search || ''
    this.searchInput = urlState.search || ''
    this.sortBy = urlState.sortBy
    this.sortOrder = urlState.sortOrder || 'asc'
  }

  private updateUrl = () => {
    if (this.updateUrlCallback) {
      const state: ProductsUrlState = {}

      if (this.currentPage > 1) state.page = this.currentPage
      if (this.searchQuery) state.search = this.searchQuery
      if (this.sortBy) {
        state.sortBy = this.sortBy
        state.sortOrder = this.sortOrder
      }

      this.updateUrlCallback(state)
    }
  }

  get totalPages() {
    return Math.ceil(this.total / this.itemsPerPage)
  }

  get skip() {
    return (this.currentPage - 1) * this.itemsPerPage
  }

  get tableSorting(): SortingState {
    if (!this.sortBy) return []
    return [{ id: this.sortBy, desc: this.sortOrder === 'desc' }]
  }

  setRowSelection = (
    updaterOrValue: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)
  ) => {
    const next =
      typeof updaterOrValue === 'function' ? updaterOrValue(this.rowSelection) : updaterOrValue
    this.rowSelection = next
  }

  setCurrentPage = (page: number) => {
    this.currentPage = page
    this.updateUrl()
    this.fetchProducts()
  }

  setSearchInput = (input: string) => {
    this.searchInput = input
  }

  setSearchQuery = (query: string) => {
    this.searchQuery = query
    this.searchInput = query
    this.currentPage = 1
    this.updateUrl()
    this.fetchProducts()
  }

  setSorting = (field?: string, order: 'asc' | 'desc' = 'asc') => {
    this.sortBy = field
    this.sortOrder = order
    this.updateUrl()
    this.fetchProducts()
  }

  fetchProducts = async () => {
    if (this.isFetching) return

    runInAction(() => {
      this.isFetching = true
      this.error = null
      if (this.products.length === 0) {
        this.isLoading = true
      }
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
        this.isFetching = false
      })
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Ошибка загрузки продуктов'
        this.isLoading = false
        this.isFetching = false
      })
    }
  }

  refreshProducts = () => {
    this.fetchProducts()
  }

  private searchTimeout?: ReturnType<typeof setTimeout>

  debouncedSearch = (input: string) => {
    this.setSearchInput(input)

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    this.searchTimeout = setTimeout(() => {
      this.setSearchQuery(input)
    }, 300)
  }
}
