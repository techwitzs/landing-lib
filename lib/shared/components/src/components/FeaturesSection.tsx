import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/src/components/Card"
import { useStyles } from "../../../../hooks/useStyles"

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface FeaturesConfig {
  section: {
    title: string
    description: string
  }
  features: Feature[]
}

export interface FeaturesSectionProps {
  config: FeaturesConfig
}

export function FeaturesSection({ config }: FeaturesSectionProps) {
  const { theme, section, container, heading, text } = useStyles()
  
  // Features section styles
  const sectionStyles: React.CSSProperties = {
    ...section(),
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
  
  // Header section styles
  const headerStyles: React.CSSProperties = {
    textAlign: 'center' as const,
    marginBottom: theme.spacing['4xl'],
  }
  
  // Section title styles
  const sectionTitleStyles: React.CSSProperties = {
    ...heading(2),
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    textWrap: 'balance' as any,
    marginBottom: theme.spacing.lg,
  }
  
  // Section description styles
  const sectionDescriptionStyles: React.CSSProperties = {
    ...text('large'),
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.muted,
    textWrap: 'balance' as any,
    maxWidth: '512px', // max-w-2xl
    margin: '0 auto',
  }
  
  // Features grid styles (simplified for now)
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing['2xl'],
  }
  
  // Feature card styles (overrides for Card component)
  const featureCardStyles: React.CSSProperties = {
    border: 'none',
    boxShadow: theme.shadows.sm,
    transition: 'box-shadow 0.2s ease-in-out',
  }
  
  // Feature icon styles
  const iconStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['4xl'],
    marginBottom: theme.spacing.lg,
  }
  
  // Feature title styles
  const featureTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
  }
  
  // Feature description styles
  const featureDescriptionStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    lineHeight: 1.6,
  }

  return (
    <section id="features" style={sectionStyles}>
      <div style={containerStyles}>
        <div style={headerStyles}>
          <h2 style={sectionTitleStyles}>
            {config.section.title}
          </h2>
          <p style={sectionDescriptionStyles}>
            {config.section.description}
          </p>
        </div>

        <div style={gridStyles}>
          {config.features.map((feature, index) => (
            <Card key={index} style={featureCardStyles}>
              <CardHeader>
                <div style={iconStyles}>{feature.icon}</div>
                <CardTitle style={featureTitleStyles}>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription style={featureDescriptionStyles}>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
