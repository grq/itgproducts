import { Outlet } from '@tanstack/react-router'
import { MenuTop } from '@/components/menu'

export function AuthorizedLayout() {
  return (
    <div className="flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden">
      <MenuTop />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  )
}