import React from "react"
import { Button } from "../../../ui/src/components/Button"
import { useStyles } from "../../../../hooks/useStyles"

export interface NavLink {
  label: string
  href: string
}

export interface HeaderConfig {
  brand: {
    name: string
    logo?: string
  }
  navigation: NavLink[]
  actions: {
    signin: string
    cta: string
  }
}

export interface HeaderProps {
  config: HeaderConfig
}

export function Header({ config }: HeaderProps) {
  const { theme, container } = useStyles()
  
  // Header styles
  const headerStyles: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    width: '100%',
    borderBottom: `1px solid ${theme.colors.border}`,
    backgroundColor: `oklch(from ${theme.colors.background} l c h / 0.95)`,
    backdropFilter: 'blur(8px)',
  }
  
  // Container styles
  const containerStyles: React.CSSProperties = {
    ...container(),
    display: 'flex',
    height: '64px', // h-16
    alignItems: 'center',
    justifyContent: 'space-between',
  }
  
  // Brand section styles
  const brandStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  }
  
  // Logo styles
  const logoStyles: React.CSSProperties = {
    height: '32px',
    width: '32px',
    borderRadius: theme.borders.radius.lg,
    backgroundColor: theme.colors.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
  // Logo text styles
  const logoTextStyles: React.CSSProperties = {
    color: theme.colors.background, // accent-foreground equivalent
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.lg,
  }
  
  // Brand name styles
  const brandNameStyles: React.CSSProperties = {
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.foreground,
  }
  
  // Navigation styles (simplified - we'll show on desktop by default)
  const navStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing['2xl'],
  }
  
  // Navigation link styles
  const navLinkStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
  }
  
  // Actions container styles
  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
  }
  
  // CTA button additional styles
  const ctaButtonStyles: React.CSSProperties = {
    backgroundColor: theme.colors.accent,
  }

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        <div style={brandStyles}>
          <div style={logoStyles}>
            <span style={logoTextStyles}>
              {config.brand.logo || config.brand.name.charAt(0)}
            </span>
          </div>
          <span style={brandNameStyles}>{config.brand.name}</span>
        </div>

        <nav style={navStyles}>
          {config.navigation.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              style={navLinkStyles}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={actionsStyles}>
          <Button variant="ghost" size="sm">
            {config.actions.signin}
          </Button>
          <Button size="sm" style={ctaButtonStyles}>
            {config.actions.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
