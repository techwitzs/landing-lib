/**
 * Style Generators
 * 
 * Functions to generate React style objects from design tokens
 * These replace className-based styling with pure style objects
 */

import { CSSProperties } from 'react'
import { Theme } from './theme'

export type StyleVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
export type StyleSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Button style generator
 */
export function generateButtonStyles(
  theme: Theme,
  variant: StyleVariant = 'default',
  size: StyleSize = 'md'
): CSSProperties {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    whiteSpace: 'nowrap',
    borderRadius: theme.borders.radius.md,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.sans,
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none',
    outline: 'none',
    userSelect: 'none',
  }

  // Size variants
  const sizeStyles: Record<StyleSize, CSSProperties> = {
    sm: {
      height: '2rem',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      fontSize: theme.typography.fontSize.sm,
    },
    md: {
      height: '2.5rem',
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.lg,
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      height: '3rem',
      paddingLeft: theme.spacing.xl,
      paddingRight: theme.spacing.xl,
      fontSize: theme.typography.fontSize.lg,
    },
    xl: {
      height: '3.5rem',
      paddingLeft: theme.spacing['2xl'],
      paddingRight: theme.spacing['2xl'],
      fontSize: theme.typography.fontSize.xl,
    },
  }

  // Color variants
  const variantStyles: Record<StyleVariant, CSSProperties> = {
    default: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.primaryForeground,
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      border: `${theme.borders.width.default} solid ${theme.colors.border}`,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.secondaryForeground,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.foreground,
    },
    link: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      textDecoration: 'underline',
      height: 'auto',
      padding: 0,
    },
    destructive: {
      backgroundColor: theme.colors.destructive,
      color: theme.colors.destructiveForeground,
    },
  }

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  }
}

/**
 * Card style generators
 */
export function generateCardStyles(theme: Theme): CSSProperties {
  return {
    borderRadius: theme.borders.radius.lg,
    border: `${theme.borders.width.default} solid ${theme.colors.border}`,
    backgroundColor: theme.colors.card,
    color: theme.colors.cardForeground,
    boxShadow: theme.shadows.sm,
  }
}

export function generateCardHeaderStyles(theme: Theme): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    padding: theme.spacing.lg,
  }
}

export function generateCardContentStyles(theme: Theme): CSSProperties {
  return {
    padding: theme.spacing.lg,
    paddingTop: 0,
  }
}

export function generateCardTitleStyles(theme: Theme): CSSProperties {
  return {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.tight,
    margin: 0,
  }
}

export function generateCardDescriptionStyles(theme: Theme): CSSProperties {
  return {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.mutedForeground,
    lineHeight: theme.typography.lineHeight.normal,
    margin: 0,
  }
}

/**
 * Badge style generator
 */
export function generateBadgeStyles(
  theme: Theme,
  variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'default'
): CSSProperties {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: theme.borders.radius.full,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.tight,
    whiteSpace: 'nowrap',
    border: `${theme.borders.width.default} solid transparent`,
  }

  const variantStyles: Record<string, CSSProperties> = {
    default: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.primaryForeground,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.secondaryForeground,
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.colors.foreground,
      borderColor: theme.colors.border,
    },
    destructive: {
      backgroundColor: theme.colors.destructive,
      color: theme.colors.destructiveForeground,
    },
  }

  return {
    ...baseStyles,
    ...variantStyles[variant],
  }
}

/**
 * Layout style generators
 */
export function generateContainerStyles(theme: Theme): CSSProperties {
  return {
    width: '100%',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
  }
}

export function generateSectionStyles(theme: Theme): CSSProperties {
  return {
    paddingTop: theme.spacing['5xl'],
    paddingBottom: theme.spacing['5xl'],
  }
}

/**
 * Typography style generators
 */
export function generateHeadingStyles(
  theme: Theme,
  level: 1 | 2 | 3 | 4 | 5 | 6 = 1
): CSSProperties {
  const sizeMap = {
    1: theme.typography.fontSize['4xl'],
    2: theme.typography.fontSize['3xl'],
    3: theme.typography.fontSize['2xl'],
    4: theme.typography.fontSize.xl,
    5: theme.typography.fontSize.lg,
    6: theme.typography.fontSize.base,
  }

  return {
    fontSize: sizeMap[level],
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.lineHeight.tight,
    color: theme.colors.foreground,
    margin: 0,
    fontFamily: theme.typography.fontFamily.sans,
  }
}

export function generateTextStyles(
  theme: Theme,
  variant: 'body' | 'large' | 'small' | 'muted' = 'body'
): CSSProperties {
  const baseStyles: CSSProperties = {
    lineHeight: theme.typography.lineHeight.normal,
    margin: 0,
    fontFamily: theme.typography.fontFamily.sans,
  }

  const variantStyles: Record<string, CSSProperties> = {
    body: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.foreground,
    },
    large: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.foreground,
    },
    small: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.foreground,
    },
    muted: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.mutedForeground,
    },
  }

  return {
    ...baseStyles,
    ...variantStyles[variant],
  }
}
