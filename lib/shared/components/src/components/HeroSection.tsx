import React from "react"
import { Button } from "../../../ui/src/components/Button"
import { Card } from "../../../ui/src/components/Card"
import { Badge } from "../../../ui/src/components/Badge"
import { useStyles } from "../../../../hooks/useStyles"

export interface HeroAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export interface HeroFeature {
  text: string
}

export interface HeroConfig {
  badge?: {
    text: string
    variant?: "default" | "secondary" | "outline" | "destructive"
  }
  headline: {
    main: string
    highlight?: string
  }
  description: string
  actions: {
    primary: HeroAction
    secondary?: HeroAction
  }
  features: HeroFeature[]
}

export interface HeroSectionProps {
  config: HeroConfig
}

export function HeroSection({ config }: HeroSectionProps) {
  const { theme, section, container, heading, text } = useStyles()
  
  // Hero section styles
  const sectionStyles: React.CSSProperties = {
    ...section(),
    position: 'relative',
    paddingTop: theme.spacing['5xl'],
    paddingBottom: theme.spacing['5xl'],
    backgroundColor: `oklch(from ${theme.colors.muted} l c h / 0.3)`,
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
  
  // Badge wrapper styles
  const badgeWrapperStyles: React.CSSProperties = {
    marginBottom: theme.spacing.xl,
  }
  
  // Headline styles
  const headlineStyles: React.CSSProperties = {
    ...heading(1),
    fontSize: theme.typography.fontSize['6xl'], // Using largest available size
    fontWeight: theme.typography.fontWeight.bold,
    textWrap: 'balance' as any,
    marginBottom: theme.spacing.xl,
  }
  
  // Highlight span styles
  const highlightStyles: React.CSSProperties = {
    color: theme.colors.accent,
  }
  
  // Description styles
  const descriptionStyles: React.CSSProperties = {
    ...text('large'),
    fontSize: theme.typography.fontSize['2xl'],
    color: theme.colors.muted,
    textWrap: 'balance' as any,
    marginBottom: theme.spacing['2xl'],
    maxWidth: '768px',
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
    marginBottom: theme.spacing['3xl'],
  }
  
  // Primary button additional styles
  const primaryButtonStyles: React.CSSProperties = {
    backgroundColor: theme.colors.accent,
    fontSize: theme.typography.fontSize.lg,
    padding: `${theme.spacing.xl} ${theme.spacing['2xl']}`,
  }
  
  // Secondary button additional styles
  const secondaryButtonStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    padding: `${theme.spacing.xl} ${theme.spacing['2xl']}`,
    backgroundColor: 'transparent',
  }
  
  // Features container styles
  const featuresStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing['2xl'],
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
  }
  
  // Feature item styles
  const featureItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  }
  
  // Feature dot styles
  const featureDotStyles: React.CSSProperties = {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981', // green-500
    borderRadius: '50%',
  }

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <div style={contentWrapperStyles}>
          {config.badge && (
            <div style={badgeWrapperStyles}>
              <Badge variant={config.badge.variant || "secondary"}>
                {config.badge.text}
              </Badge>
            </div>
          )}

          <h1 style={headlineStyles}>
            {config.headline.main}
            {config.headline.highlight && (
              <span style={highlightStyles}> {config.headline.highlight}</span>
            )}
          </h1>

          <p style={descriptionStyles}>
            {config.description}
          </p>

          <div style={actionsStyles}>
            <Button 
              size="lg" 
              variant={config.actions.primary.variant || "default"}
              style={primaryButtonStyles}
            >
              {config.actions.primary.label}
            </Button>
            {config.actions.secondary && (
              <Button 
                variant={config.actions.secondary.variant || "outline"} 
                size="lg" 
                style={secondaryButtonStyles}
              >
                {config.actions.secondary.label}
              </Button>
            )}
          </div>

          {config.features.length > 0 && (
            <div style={featuresStyles}>
              {config.features.map((feature, index) => (
                <div key={index} style={featureItemStyles}>
                  <div style={featureDotStyles}></div>
                  {feature.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
