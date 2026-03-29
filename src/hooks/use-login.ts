import { useNavigate, useSearch } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { endpoint } from '@/api/endpoint'
import { post } from '@/api/post'
import { rootStore } from '@/stores'
import type { AuthResponse, LoginData } from '@/interfaces'

interface LoginOptions {
  remember?: boolean
}

export function useLogin() {
  const { login: setAuth } = rootStore.authStore
  const navigate = useNavigate()
  const search = useSearch({ from: '/login' }) as { redirect?: string }

  return useMutation({
    mutationFn: (data: LoginData) => post<AuthResponse, LoginData>(endpoint.auth.login, data),
    onSuccess: (data: AuthResponse, variables: LoginData & LoginOptions) => {
      setAuth(data, variables.remember)
      navigate({ to: search.redirect || '/' })
    },
  })
}
