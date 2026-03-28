import { makeAutoObservable } from 'mobx'
import { AuthStore } from './authStore'

export class RootStore {
  authStore: AuthStore

  constructor() {
    this.authStore = new AuthStore()
    makeAutoObservable(this)
  }
}

// Singleton instance
export const rootStore = new RootStore()
