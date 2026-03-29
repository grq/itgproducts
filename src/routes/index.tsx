import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { ProductsPage } from '@/pages/ProductsPage'

const productsSearchSchema = z.object({
  page: z.number().min(1).optional().catch(undefined),
  search: z.string().optional().catch(undefined),
  sortBy: z.string().optional().catch(undefined),
  sortOrder: z.enum(['asc', 'desc']).optional().catch(undefined),
})

export type ProductsSearch = z.infer<typeof productsSearchSchema>

export const Route = createFileRoute('/')({
  validateSearch: productsSearchSchema,
  component: ProductsPage,
})
