import { useCallback, useSyncExternalStore, type ReactNode } from 'react'
import type { Theme } from './types'
import { ThemeContext } from './ThemeContext'
import { applyTheme, getStoredOrSystemTheme, getThemeSnapshot, subscribeTheme } from './storage'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => getStoredOrSystemTheme())

  const setTheme = useCallback((t: Theme) => {
    applyTheme(t)
  }, [])

  const toggleTheme = useCallback(() => {
    applyTheme(getThemeSnapshot() === 'dark' ? 'light' : 'dark')
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}
