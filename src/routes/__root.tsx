import { RootLayout } from '@/layout/root'
import { rootStore } from '@/stores'
import { createRootRoute, redirect } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async ({ location }) => {
    const { isAuthenticated } = rootStore.authStore
    const isLoginPage = location.pathname === '/login'

    if (!isAuthenticated && !isLoginPage) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    if (isAuthenticated && isLoginPage) {
      throw redirect({
        to: '/',
      })
    }
  },
})
