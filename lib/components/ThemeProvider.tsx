/**
 * Theme Provider Component
 * 
 * React component that provides theme context to child components
 */

import React, { useState, useEffect } from 'react'
import { Theme, ThemeMode, ThemeContextValue, getTheme } from '../styles/theme'
import { ThemeContext } from '../hooks/useStyles'

/**
 * Theme Provider Component
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentMode, setCurrentMode] = useState<ThemeMode>('light')
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => getTheme('light'))

  const setMode = (mode: ThemeMode) => {
    setCurrentMode(mode)
    setCurrentTheme(getTheme(mode))
  }

  const toggle = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light'
    setMode(newMode)
  }

  const contextValue: ThemeContextValue = {
    theme: currentTheme,
    mode: currentMode,
    setMode,
    toggle,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
