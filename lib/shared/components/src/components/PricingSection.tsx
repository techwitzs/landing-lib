import React from "react"
import { Button } from "../../../ui/src/components/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/src/components/Card"
import { Badge } from "../../../ui/src/components/Badge"
import { useStyles } from "../../../../hooks/useStyles"

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  popular: boolean
  buttonText?: string
}

export interface PricingConfig {
  section: {
    title: string
    description: string
  }
  plans: PricingPlan[]
}

export interface PricingSectionProps {
  config: PricingConfig
}

export function PricingSection({ config }: PricingSectionProps) {
  const { theme, section, container, heading, text } = useStyles()
  
  // Pricing section styles
  const sectionStyles: React.CSSProperties = {
    ...section(),
    paddingTop: theme.spacing['5xl'],
    paddingBottom: theme.spacing['5xl'],
    backgroundColor: theme.colors.background,
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
  
  // Plans grid styles
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing['2xl'],
    maxWidth: '1152px', // max-w-6xl
    margin: '0 auto',
  }
  
  // Popular card styles
  const popularCardStyles: React.CSSProperties = {
    position: 'relative',
    border: `2px solid ${theme.colors.accent}`,
    boxShadow: theme.shadows.lg,
    transform: 'scale(1.02)',
  }
  
  // Regular card styles
  const regularCardStyles: React.CSSProperties = {
    position: 'relative',
    border: `1px solid ${theme.colors.border}`,
  }
  
  // Badge positioning styles
  const badgeWrapperStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  }
  
  // Header content styles
  const cardHeaderStyles: React.CSSProperties = {
    textAlign: 'center' as const,
    paddingBottom: theme.spacing['2xl'],
  }
  
  // Plan title styles
  const planTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['2xl'],
  }
  
  // Price wrapper styles
  const priceWrapperStyles: React.CSSProperties = {
    marginTop: theme.spacing.lg,
  }
  
  // Price styles
  const priceStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  }
  
  // Price period styles
  const pricePeriodStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.muted,
  }
  
  // Plan description styles
  const planDescriptionStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    marginTop: theme.spacing.xs,
  }
  
  // Features list styles
  const featuresListStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: `0 0 ${theme.spacing['2xl']} 0`,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  }
  
  // Feature item styles
  const featureItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  }
  
  // Feature dot styles
  const featureDotStyles: React.CSSProperties = {
    width: '8px',
    height: '8px',
    backgroundColor: theme.colors.accent,
    borderRadius: '50%',
    flexShrink: 0,
  }
  
  // Feature text styles
  const featureTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
  }
  
  // Button container styles
  const buttonContainerStyles: React.CSSProperties = {
    width: '100%',
  }
  
  // Popular button styles
  const popularButtonStyles: React.CSSProperties = {
    backgroundColor: theme.colors.accent,
    width: '100%',
  }

  return (
    <section id="pricing" style={sectionStyles}>
      <div style={containerStyles}>
        <div style={headerStyles}>
          <h2 style={sectionTitleStyles}>{config.section.title}</h2>
          <p style={sectionDescriptionStyles}>
            {config.section.description}
          </p>
        </div>

        <div style={gridStyles}>
          {config.plans.map((plan, index) => (
            <Card
              key={index}
              style={plan.popular ? popularCardStyles : regularCardStyles}
            >
              {plan.popular && (
                <div style={badgeWrapperStyles}>
                  <Badge variant="default">Most Popular</Badge>
                </div>
              )}
              <CardHeader style={cardHeaderStyles}>
                <CardTitle style={planTitleStyles}>{plan.name}</CardTitle>
                <div style={priceWrapperStyles}>
                  <div style={priceStyles}>
                    {plan.price}
                    {plan.price !== "Custom" && (
                      <span style={pricePeriodStyles}>/month</span>
                    )}
                  </div>
                </div>
                <CardDescription style={planDescriptionStyles}>
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul style={featuresListStyles}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={featureItemStyles}>
                      <div style={featureDotStyles}></div>
                      <span style={featureTextStyles}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div style={buttonContainerStyles}>
                  <Button
                    style={plan.popular ? popularButtonStyles : undefined}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText || (plan.price === "Custom" ? "Contact Sales" : "Get Started")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
