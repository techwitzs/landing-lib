/**
 * Theme System
 * 
 * Provides theme variants and theme switching utilities
 */

import { DesignTokens, defaultTokens, lightColors, darkColors } from './config'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface Theme extends DesignTokens {
  mode: ThemeMode
}

/**
 * Light theme configuration
 */
export const lightTheme: Theme = {
  ...defaultTokens,
  colors: lightColors,
  mode: 'light',
}

/**
 * Dark theme configuration  
 */
export const darkTheme: Theme = {
  ...defaultTokens,
  colors: darkColors,
  mode: 'dark',
}

/**
 * Available themes
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const

/**
 * Default theme (light mode)
 */
export const defaultTheme = lightTheme

/**
 * Get theme by mode
 */
export function getTheme(mode: ThemeMode): Theme {
  switch (mode) {
    case 'light':
      return lightTheme
    case 'dark':
      return darkTheme
    case 'system':
      // In a real app, this would detect system preference
      // For now, default to light
      return lightTheme
    default:
      return defaultTheme
  }
}

/**
 * Theme switching utilities
 */
export class ThemeManager {
  private currentMode: ThemeMode = 'light'
  private listeners: Array<(theme: Theme) => void> = []

  constructor(initialMode: ThemeMode = 'light') {
    this.currentMode = initialMode
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    return getTheme(this.currentMode)
  }

  /**
   * Get current mode
   */
  getCurrentMode(): ThemeMode {
    return this.currentMode
  }

  /**
   * Set theme mode
   */
  setMode(mode: ThemeMode): void {
    this.currentMode = mode
    const newTheme = this.getCurrentTheme()
    this.listeners.forEach(listener => listener(newTheme))
  }

  /**
   * Toggle between light and dark
   */
  toggle(): void {
    const newMode = this.currentMode === 'light' ? 'dark' : 'light'
    this.setMode(newMode)
  }

  /**
   * Subscribe to theme changes
   */
  subscribe(listener: (theme: Theme) => void): () => void {
    this.listeners.push(listener)
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }
}

/**
 * Create a new theme manager instance
 */
export function createThemeManager(initialMode: ThemeMode = 'light'): ThemeManager {
  return new ThemeManager(initialMode)
}

/**
 * Global theme manager instance
 */
export const themeManager = createThemeManager()

/**
 * Theme context type for React
 */
export interface ThemeContextValue {
  theme: Theme
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}
