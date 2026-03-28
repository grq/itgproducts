import { useEffect, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import type { AuthResponse } from '@/interfaces'
import { queryKeys } from '@/api/query-keys'
import { logError } from '@/lib/logger'
import { useGetSession } from '@/hooks/use-get-session'
import { AUTH_TOKEN_COOKIE_KEY } from './constants'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const authToken = Cookies.get(AUTH_TOKEN_COOKIE_KEY) ?? null
  const sessionQueryEnabled = Boolean(authToken)

  const { data: sessionUser, isPending, isError } = useGetSession(sessionQueryEnabled)

  useEffect(() => {
    if (!isError) return
    logError(`Session fetch failed`)
    Cookies.remove(AUTH_TOKEN_COOKIE_KEY)
    queryClient.removeQueries({ queryKey: queryKeys.auth.me() })
  }, [isError, queryClient])

  const user = sessionUser ?? null
  const isLoading = sessionQueryEnabled && isPending

  const login = (authResponse: AuthResponse, remember = false) => {
    const options = {
      secure: window.location.protocol === 'https:',
      sameSite: 'strict' as const,
      ...(remember ? { expires: 7 } : {}),
    }

    Cookies.set(AUTH_TOKEN_COOKIE_KEY, authResponse.accessToken, options)
    queryClient.setQueryData(queryKeys.auth.me(), authResponse)
  }

  const logout = () => {
    Cookies.remove(AUTH_TOKEN_COOKIE_KEY)
    queryClient.removeQueries({ queryKey: queryKeys.auth.me() })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
