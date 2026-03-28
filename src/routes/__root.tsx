import { RootLayout } from '@/layout/root'
import { AUTH_TOKEN_COOKIE_KEY } from '@/stores'
import { createRootRoute, redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async ({ location }) => {
    const token = Cookies.get(AUTH_TOKEN_COOKIE_KEY)
    const isAuthenticated = token !== undefined
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
