import React from "react"
import { Button } from "../../../ui/src/components/Button"
import { useStyles } from "../../../../hooks/useStyles"

export interface CTAAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export interface CTAConfig {
  title: string
  description: string
  actions: {
    primary: CTAAction
    secondary?: CTAAction
  }
}

export interface CTASectionProps {
  config: CTAConfig
}

export function CTASection({ config }: CTASectionProps) {
  const { theme, section, container, heading, text } = useStyles()
  
  // CTA section styles
  const sectionStyles: React.CSSProperties = {
    ...section(),
    paddingTop: theme.spacing['5xl'],
    paddingBottom: theme.spacing['5xl'],
    backgroundColor: theme.colors.accent,
  }
  
  // Container styles
  const containerStyles: React.CSSProperties = {
    ...container(),
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.lg}`,
  }
  
  // Content wrapper styles
  const contentWrapperStyles: React.CSSProperties = {
    maxWidth: '896px', // max-w-4xl
    margin: '0 auto',
    textAlign: 'center' as const,
  }
  
  // Title styles
  const titleStyles: React.CSSProperties = {
    ...heading(2),
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.background, // accent-foreground equivalent
    textWrap: 'balance' as any,
    marginBottom: theme.spacing.xl,
  }
  
  // Description styles
  const descriptionStyles: React.CSSProperties = {
    ...text('large'),
    fontSize: theme.typography.fontSize.xl,
    color: `oklch(from ${theme.colors.background} l c h / 0.9)`, // accent-foreground/90 equivalent
    textWrap: 'balance' as any,
    marginBottom: theme.spacing['2xl'],
    maxWidth: '512px', // max-w-2xl
    margin: `0 auto ${theme.spacing['2xl']} auto`,
    lineHeight: 1.6,
  }
  
  // Actions container styles
  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  }
  
  // Primary button styles
  const primaryButtonStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    padding: `${theme.spacing.xl} ${theme.spacing['2xl']}`,
  }
  
  // Secondary button styles
  const secondaryButtonStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    padding: `${theme.spacing.xl} ${theme.spacing['2xl']}`,
    borderColor: `oklch(from ${theme.colors.background} l c h / 0.2)`,
    color: theme.colors.background,
    backgroundColor: 'transparent',
  }

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <div style={contentWrapperStyles}>
          <h2 style={titleStyles}>
            {config.title}
          </h2>
          <p style={descriptionStyles}>
            {config.description}
          </p>
          <div style={actionsStyles}>
            <Button 
              size="lg" 
              variant={config.actions.primary.variant || "secondary"} 
              style={primaryButtonStyles}
            >
              {config.actions.primary.label}
            </Button>
            {config.actions.secondary && (
              <Button
                size="lg"
                variant={config.actions.secondary.variant || "outline"}
                style={secondaryButtonStyles}
              >
                {config.actions.secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
