import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { endpoint } from '@/api/endpoint'
import { get } from '@/api/get'
import { queryKeys } from '@/api/query-keys'
import { AUTH_TOKEN_COOKIE_KEY } from '@/context/auth/constants'
import type { User } from '@/interfaces'

export function useGetSession(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      const token = Cookies.get(AUTH_TOKEN_COOKIE_KEY)
      if (!token) {
        throw new Error('Invariant: /auth/me requested without token in cookie')
      }
      return get<User>(endpoint.auth.me, token)
    },
    enabled,
    retry: false,
  })
}
