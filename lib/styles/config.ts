/**
 * Design System Configuration
 * 
 * Pure config-driven styling system with all design tokens
 * Extracted from the original CSS with oklch color values preserved
 */

export interface ColorTokens {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
}

export interface SpacingTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
  '5xl': string
  '6xl': string
}

export interface TypographyTokens {
  fontFamily: {
    sans: string
    mono: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
    '6xl': string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
}

export interface BorderTokens {
  radius: {
    none: string
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  width: {
    default: string
    thick: string
  }
}

export interface ShadowTokens {
  sm: string
  md: string
  lg: string
  xl: string
}

export interface DesignTokens {
  colors: ColorTokens
  spacing: SpacingTokens
  typography: TypographyTokens
  borders: BorderTokens
  shadows: ShadowTokens
}

// Light theme color tokens (extracted from globals.css)
export const lightColors: ColorTokens = {
  background: 'oklch(1 0 0)',
  foreground: 'oklch(0.205 0 0)',
  card: 'oklch(0.985 0 0)',
  cardForeground: 'oklch(0.205 0 0)',
  popover: 'oklch(1 0 0)',
  popoverForeground: 'oklch(0.205 0 0)',
  primary: 'oklch(0.5 0.2 240)',           // 🔵 Changed to blue
  primaryForeground: 'oklch(1 0 0)',
  secondary: 'oklch(0.8 0.1 210)',         // 🔵 Light blue secondary
  secondaryForeground: 'oklch(0.2 0 0)',
  muted: 'oklch(0.99 0 0)',
  mutedForeground: 'oklch(0.205 0 0)',
  accent: 'oklch(0.6 0.25 200)',           // 🔵 Blue accent
  accentForeground: 'oklch(1 0 0)',
  destructive: 'oklch(0.577 0.245 27.325)',
  destructiveForeground: 'oklch(1 0 0)',
  border: 'oklch(0.922 0 0)',
  input: 'oklch(0.99 0 0)',
  ring: 'oklch(0.6 0.25 200 / 0.5)',      // 🔵 Blue ring
}

// Dark theme color tokens
export const darkColors: ColorTokens = {
  background: 'oklch(0.145 0 0)',
  foreground: 'oklch(0.985 0 0)',
  card: 'oklch(0.145 0 0)',
  cardForeground: 'oklch(0.985 0 0)',
  popover: 'oklch(0.145 0 0)',
  popoverForeground: 'oklch(0.985 0 0)',
  primary: 'oklch(0.985 0 0)',
  primaryForeground: 'oklch(0.205 0 0)',
  secondary: 'oklch(0.269 0 0)',
  secondaryForeground: 'oklch(0.985 0 0)',
  muted: 'oklch(0.269 0 0)',
  mutedForeground: 'oklch(0.556 0 0)',
  accent: 'oklch(0.646 0.222 280.116)', // Same vibrant purple in dark mode
  accentForeground: 'oklch(1 0 0)',
  destructive: 'oklch(0.577 0.245 27.325)',
  destructiveForeground: 'oklch(0.985 0 0)',
  border: 'oklch(0.269 0 0)',
  input: 'oklch(0.269 0 0)',
  ring: 'oklch(0.646 0.222 280.116 / 0.5)',
}

// Spacing scale
export const spacing: SpacingTokens = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '5rem',    // 80px
  '5xl': '6rem',    // 96px
  '6xl': '8rem',    // 128px
}

// Typography tokens
export const typography: TypographyTokens = {
  fontFamily: {
    sans: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
    mono: 'var(--font-geist-mono), Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}

// Border tokens
export const borders: BorderTokens = {
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px (from CSS --radius: 0.5rem but adjusted)
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    full: '9999px',
  },
  width: {
    default: '1px',
    thick: '2px',
  },
}

// Shadow tokens
export const shadows: ShadowTokens = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
}

// Default design system configuration
export const defaultTokens: DesignTokens = {
  colors: lightColors,
  spacing,
  typography,
  borders,
  shadows,
}
