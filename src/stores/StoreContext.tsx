import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import { RootStore } from './rootStore'

/* eslint-disable react-refresh/only-export-components */

const StoreContext = createContext<RootStore | null>(null)

type StoreProviderProps = {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const store = useMemo(() => new RootStore(), [])
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

export function useStore(): RootStore {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return store
}
