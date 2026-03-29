import { observer } from 'mobx-react-lite'
import { rootStore } from '@/stores'
import { Outlet } from '@tanstack/react-router'
import { LoadingLayout } from '@/layout/loading'

export const RootLayout = observer(function RootLayout() {
  const { isLoading } = rootStore.authStore

  if (isLoading) {
    return <LoadingLayout />
  }

  return <Outlet />
})
