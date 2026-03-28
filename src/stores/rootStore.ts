import { makeAutoObservable } from 'mobx'
import { AuthStore } from './authStore'
import { ProductsStore } from './productsStore'

export class RootStore {
  authStore: AuthStore
  productsStore: ProductsStore

  constructor() {
    this.authStore = new AuthStore()
    this.productsStore = new ProductsStore()
    makeAutoObservable(this)
  }
}

export const rootStore = new RootStore()
