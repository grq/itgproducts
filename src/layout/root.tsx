import { useAuth } from '@/context/auth'
import { Outlet } from '@tanstack/react-router'
import { LoadingLayout } from '@/layout/loading'

export function RootLayout() {
  const { isLoading } = useAuth()

  if (isLoading) {
      return <LoadingLayout />
  }

  return <Outlet />
}