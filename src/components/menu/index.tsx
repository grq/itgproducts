import { observer } from 'mobx-react-lite'
import { LogOut } from 'lucide-react'

import { rootStore } from '@/stores'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function initials(first: string, last: string) {
  const a = first?.charAt(0) ?? ''
  const b = last?.charAt(0) ?? ''
  return (a + b).toUpperCase() || '?'
}

export const MenuTop = observer(function MenuTop() {
  const { user, logout } = rootStore.authStore

  if (!user) {
    return null
  }

  const name = `${user.firstName} ${user.lastName}`.trim()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background flex px-4 py-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="ml-auto gap-2"
            aria-label="Меню пользователя"
          >
            <Avatar>
              <AvatarImage src={user.image} alt={`${name} avatar`} />
              <AvatarFallback className="text-xs font-medium">
                {initials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            {name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="gap-2"
            onSelect={() => {
              logout()
            }}
          >
            <LogOut className="size-4" />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
})
