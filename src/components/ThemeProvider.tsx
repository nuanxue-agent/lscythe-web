'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'terminal' | 'vaporwave' | 'retro'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'terminal',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('terminal')

  useEffect(() => {
    // Read from localStorage on mount and apply immediately to avoid flash
    const stored = localStorage.getItem('lscythe-theme') as Theme | null
    const initial: Theme =
      stored === 'vaporwave' || stored === 'retro' ? stored : 'terminal'
    setThemeState(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const setTheme = (next: Theme) => {
    setThemeState(next)
    localStorage.setItem('lscythe-theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
