/**
 * Styles Library Main Export
 * 
 * Pure config-driven styling system for React components
 * Provides complete styling solution without CSS dependencies
 */

// Core configuration and tokens
export * from './config'
export * from './theme'
export * from './generators'

// React hooks and utilities
export * from '../hooks/useStyles'

// Re-export commonly used types
export type {
  ColorTokens,
  SpacingTokens,
  TypographyTokens,
  BorderTokens,
  ShadowTokens,
  DesignTokens,
} from './config'

export type {
  Theme,
  ThemeMode,
  ThemeContextValue,
} from './theme'

export type {
  StyleVariant,
  StyleSize,
} from './generators'

// Default exports for convenience
export {
  defaultTokens,
  lightColors,
  darkColors,
  spacing,
  typography,
  borders,
  shadows,
} from './config'

export {
  lightTheme,
  darkTheme,
  themes,
  defaultTheme,
  getTheme,
  createThemeManager,
  themeManager,
} from './theme'
