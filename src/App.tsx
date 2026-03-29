import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { rootStore } from '@/stores'
import { AppToaster } from '@/components/ui/sonner'
import { routeTree } from '@/routeTree.gen'

const queryClient = new QueryClient()

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  useEffect(() => {
    rootStore.authStore.setQueryClient(queryClient)
    rootStore.authStore.initSession()
    rootStore.productsStore.setQueryClient(queryClient)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-0 flex-1 flex-col">
        <RouterProvider router={router} />
        <AppToaster position="top-center" richColors closeButton />
      </div>
    </QueryClientProvider>
  )
}

export default observer(App)
