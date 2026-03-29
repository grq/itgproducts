import { useMemo, type ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { rootStore } from '@/stores'
import { Outlet } from '@tanstack/react-router'
import { LoadingLayout } from '@/layout/loading'
import { AuthorizedLayout } from '@/layout/authorized'
import { AuthSessionSync } from '@/layout/auth-session-sync'

export const RootLayout = observer(function RootLayout(): ReactElement {
  const { isLoading, isAuthenticated } = rootStore.authStore

  const layout = useMemo(() => {
    if (isLoading) return <LoadingLayout />
    if (isAuthenticated) return <AuthorizedLayout />
    return <Outlet />
  }, [isLoading, isAuthenticated])

  return (
    <>
      <AuthSessionSync />
      {layout}
    </>
  )
})
