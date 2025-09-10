'use client'

import { useState } from 'react'
import { getTheme } from '../../lib/styles/theme'

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  const theme = getTheme(currentTheme)

  const switcherStyles = {
    position: 'fixed' as const,
    top: theme.spacing.md,
    right: theme.spacing.md,
    zIndex: 1000,
    display: 'flex',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.sm,
    boxShadow: theme.shadows.md
  }

  const buttonStyles = {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    border: 'none',
    borderRadius: theme.borders.radius.sm,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out'
  }

  const activeButtonStyles = {
    ...buttonStyles,
    backgroundColor: theme.colors.primary,
    color: theme.colors.background
  }

  const inactiveButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'transparent',
    color: theme.colors.muted,
    border: `1px solid ${theme.colors.border}`
  }

  return (
    <div style={switcherStyles}>
      <button
        style={currentTheme === 'light' ? activeButtonStyles : inactiveButtonStyles}
        onClick={() => setCurrentTheme('light')}
      >
        ☀️ Light
      </button>
      <button
        style={currentTheme === 'dark' ? activeButtonStyles : inactiveButtonStyles}
        onClick={() => setCurrentTheme('dark')}
      >
        🌙 Dark
      </button>
    </div>
  )
}
