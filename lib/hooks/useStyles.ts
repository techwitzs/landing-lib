/**
 * Style Hooks
 * 
 * React hooks for accessing and using the styling system
 */

import { useState, useEffect, useMemo, createContext, useContext } from 'react'
import { Theme, ThemeMode, getTheme, ThemeContextValue, themeManager } from '../styles/theme'
import { 
  generateButtonStyles, 
  generateCardStyles,
  generateCardHeaderStyles,
  generateCardContentStyles,
  generateCardTitleStyles,
  generateCardDescriptionStyles,
  generateBadgeStyles,
  generateContainerStyles,
  generateSectionStyles,
  generateHeadingStyles,
  generateTextStyles,
  StyleVariant,
  StyleSize
} from '../styles/generators'

/**
 * Theme Context
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Hook to access current theme
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/**
 * Hook for component styling
 * Returns style generators with current theme applied
 */
export function useStyles() {
  const { theme } = useTheme()

  return useMemo(() => ({
    // Component style generators
    button: (variant?: StyleVariant, size?: StyleSize) => 
      generateButtonStyles(theme, variant, size),
    
    card: {
      root: () => generateCardStyles(theme),
      header: () => generateCardHeaderStyles(theme),
      content: () => generateCardContentStyles(theme),
      title: () => generateCardTitleStyles(theme),
      description: () => generateCardDescriptionStyles(theme),
    },
    
    badge: (variant?: 'default' | 'secondary' | 'outline' | 'destructive') =>
      generateBadgeStyles(theme, variant),
    
    // Layout style generators
    container: () => generateContainerStyles(theme),
    section: () => generateSectionStyles(theme),
    
    // Typography style generators
    heading: (level?: 1 | 2 | 3 | 4 | 5 | 6) => generateHeadingStyles(theme, level),
    text: (variant?: 'body' | 'large' | 'small' | 'muted') => generateTextStyles(theme, variant),
    
    // Direct access to theme tokens
    theme,
  }), [theme])
}

/**
 * Hook for managing theme state
 */
export function useThemeManager() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => themeManager.getCurrentTheme())
  const [currentMode, setCurrentMode] = useState<ThemeMode>(() => themeManager.getCurrentMode())

  useEffect(() => {
    const unsubscribe = themeManager.subscribe((newTheme) => {
      setCurrentTheme(newTheme)
      setCurrentMode(themeManager.getCurrentMode())
    })

    return unsubscribe
  }, [])

  const setMode = (mode: ThemeMode) => {
    themeManager.setMode(mode)
  }

  const toggle = () => {
    themeManager.toggle()
  }

  return {
    theme: currentTheme,
    mode: currentMode,
    setMode,
    toggle,
  }
}

/**
 * Hook to create responsive styles
 * Provides utilities for responsive styling
 */
export function useResponsiveStyles() {
  const { theme } = useTheme()

  return useMemo(() => ({
    // Responsive container styles
    responsiveContainer: (maxWidths: Record<string, string> = {}) => ({
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.lg,
      maxWidth: maxWidths.default || '1200px',
      // Note: CSS-in-JS doesn't support media queries directly
      // This would need to be handled differently in a real implementation
    }),

    // Responsive grid
    responsiveGrid: (columns: Record<string, number> = { default: 1 }) => ({
      display: 'grid',
      gap: theme.spacing.lg,
      gridTemplateColumns: `repeat(${columns.default || 1}, 1fr)`,
      // Media queries would need special handling
    }),

    // Responsive flex
    responsiveFlex: (direction: Record<string, string> = { default: 'row' }) => ({
      display: 'flex',
      gap: theme.spacing.md,
      flexDirection: direction.default as any || 'row',
      flexWrap: 'wrap' as const,
    }),
  }), [theme])
}

/**
 * Hook for animation styles
 */
export function useAnimationStyles() {
  const { theme } = useTheme()

  return useMemo(() => ({
    fadeIn: {
      opacity: 0,
      animation: 'fadeIn 0.3s ease-in-out forwards',
    },
    
    slideUp: {
      transform: 'translateY(20px)',
      opacity: 0,
      animation: 'slideUp 0.3s ease-out forwards',
    },
    
    hover: {
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
    },
    
    focus: {
      outline: `2px solid ${theme.colors.ring}`,
      outlineOffset: '2px',
    },
  }), [theme])
}
