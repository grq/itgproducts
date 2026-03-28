import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { rootStore } from '@/stores'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

/* eslint-disable react-refresh/only-export-components */
function App() {
  useEffect(() => {
    rootStore.authStore.setQueryClient(queryClient)
    rootStore.authStore.initSession()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default observer(App)
