import type { User, AuthResponse } from '@/interfaces'

export interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (authResponse: AuthResponse, remember?: boolean) => void
  logout: () => void
}
