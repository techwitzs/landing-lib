'use client'

import { 
  Header, 
  HeroSection, 
  SocialProof, 
  FeaturesSection, 
  PricingSection, 
  TestimonialsSection, 
  CTASection, 
  Footer 
} from "../lib/shared/components/src/components"
import { getAppTheme } from "./lib/theme"
import { headerConfig } from "./config/header"
import { footerConfig } from "./config/footer"
import { heroConfig } from "./config/hero"
import { socialProofConfig } from "./config/socialProof"
import { featuresConfig } from "./config/features"
import { pricingConfig } from "./config/pricing"
import { testimonialsConfig } from "./config/testimonials"
import { ctaConfig } from "./config/cta"

export default function HomePage() {
  const theme = getAppTheme('light')
  
  const containerStyles = {
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    color: theme.colors.foreground,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out'
  }

  const mainStyles = {
    display: 'flex',
    flexDirection: 'column' as const
  }

  const badgeStyles = {
    position: 'fixed' as const,
    top: theme.spacing.md,
    right: theme.spacing.md,
    zIndex: 1000,
    backgroundColor: theme.colors.primary,
    color: theme.colors.background,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borders.radius.full,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    boxShadow: theme.shadows.sm,
    border: 'none'
  }

  return (
    <div style={containerStyles}>
      {/* Advanced Design System Badge */}
      <div style={badgeStyles}>
        🚀 Advanced Design System
      </div>

      <Header config={headerConfig} />
      <main style={mainStyles}>
        <HeroSection config={heroConfig} />
        <SocialProof config={socialProofConfig} />
        <FeaturesSection config={featuresConfig} />
        <PricingSection config={pricingConfig} />
        <TestimonialsSection config={testimonialsConfig} />
        <CTASection config={ctaConfig} />
      </main>
      <Footer config={footerConfig} />
    </div>
  )
}
