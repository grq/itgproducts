import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useRouterState } from '@tanstack/react-router'

import { rootStore } from '@/stores'

export const AuthSessionSync = observer(function AuthSessionSync() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const returnHref = useRouterState({ select: (s) => s.location.href })
  const { isLoading, isAuthenticated } = rootStore.authStore
  const unauthPaths = ['/login']

  useEffect(() => {
    if (!isAuthenticated && !unauthPaths.includes(pathname)) {
      void navigate({
        to: '/login',
        search: { redirect: returnHref },
        replace: true,
      })
      return
    }

    if (isAuthenticated && unauthPaths.includes(pathname)) {
      void navigate({
        to: '/',
        replace: true,
      })
      return
    }
  }, [isLoading, isAuthenticated, pathname, navigate, returnHref])

  return null
})
