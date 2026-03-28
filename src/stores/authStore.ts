import { makeAutoObservable, runInAction } from 'mobx'
import { QueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import type { AuthResponse, User } from '@/interfaces'
import { queryKeys } from '@/api/query-keys'
import { logError } from '@/lib/logger'
import { endpoint } from '@/api/endpoint'
import { get } from '@/api/get'

export const AUTH_TOKEN_COOKIE_KEY = 'auth_token'

export class AuthStore {
  user: User | null = null
  isLoading = true
  queryClient: QueryClient | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isAuthenticated() {
    return this.user !== null
  }

  setQueryClient(queryClient: QueryClient) {
    this.queryClient = queryClient
  }

  async initSession() {
    const authToken = Cookies.get(AUTH_TOKEN_COOKIE_KEY)
    
    if (!authToken) {
      runInAction(() => {
        this.isLoading = false
      })
      return
    }

    try {
      const sessionUser = await get<User>(endpoint.auth.me, authToken)
      runInAction(() => {
        this.user = sessionUser
        this.isLoading = false
      })
      
      if (this.queryClient) {
        this.queryClient.setQueryData(queryKeys.auth.me(), sessionUser)
      }
    } catch {
      logError('Session fetch failed')
      Cookies.remove(AUTH_TOKEN_COOKIE_KEY)
      
      if (this.queryClient) {
        this.queryClient.removeQueries({ queryKey: queryKeys.auth.me() })
      }
      
      runInAction(() => {
        this.user = null
        this.isLoading = false
      })
    }
  }

  login = (authResponse: AuthResponse, remember = false) => {
    const options = {
      secure: window.location.protocol === 'https:',
      sameSite: 'strict' as const,
      ...(remember ? { expires: 7 } : {}),
    }

    Cookies.set(AUTH_TOKEN_COOKIE_KEY, authResponse.accessToken, options)

    runInAction(() => {
      this.user = {
        id: authResponse.id,
        username: authResponse.username,
        email: authResponse.email,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        gender: authResponse.gender,
        image: authResponse.image,
      }
    })

    if (this.queryClient) {
      this.queryClient.setQueryData(queryKeys.auth.me(), authResponse)
    }
  }

  logout = () => {
    Cookies.remove(AUTH_TOKEN_COOKIE_KEY)
    
    if (this.queryClient) {
      this.queryClient.removeQueries({ queryKey: queryKeys.auth.me() })
    }
    
    runInAction(() => {
      this.user = null
    })
  }
}

// Singleton instance for direct usage (if needed)
export const authStore = new AuthStore()
