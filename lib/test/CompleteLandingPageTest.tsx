/**
 * Complete Landing Page Test - All Components
 * 
 * Full integration test demonstrating ALL converted components using config-driven styling
 */

import React from 'react'
import { ThemeContext, useStyles, useThemeManager } from '../hooks/useStyles'
import { Header } from '../shared/components/src/components/Header'
import { HeroSection } from '../shared/components/src/components/HeroSection'
import { SocialProof } from '../shared/components/src/components/SocialProof'
import { FeaturesSection } from '../shared/components/src/components/FeaturesSection'
import { TestimonialsSection } from '../shared/components/src/components/TestimonialsSection'
import { PricingSection } from '../shared/components/src/components/PricingSection'
import { CTASection } from '../shared/components/src/components/CTASection'
import { Footer } from '../shared/components/src/components/Footer'

/**
 * Theme Provider Component
 */
function TestThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, mode, toggle } = useThemeManager()
  
  const contextValue = {
    theme,
    mode,
    setMode: () => {},
    toggle,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Complete Configuration Objects
 */
const headerConfig = {
  brand: {
    name: "ConfigLib Pro",
    logo: "🎨"
  },
  navigation: [
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" }
  ],
  actions: {
    signin: "Sign In",
    cta: "Get Started"
  }
}

const heroConfig = {
  badge: {
    text: "✨ 100% Config-Driven Styling",
    variant: "secondary" as const
  },
  headline: {
    main: "Build Beautiful Landing Pages with",
    highlight: "Zero CSS Dependencies"
  },
  description: "The complete config-driven styling system that eliminates CSS dependencies. Build stunning UIs with pure React style objects generated from design tokens.",
  actions: {
    primary: {
      label: "Start Building Free",
      variant: "default" as const
    },
    secondary: {
      label: "View Live Demo",
      variant: "outline" as const
    }
  },
  features: [
    { text: "No CSS Required" },
    { text: "Type-Safe Design System" },
    { text: "Theme Switching" },
    { text: "Framework Agnostic" }
  ]
}

const socialProofConfig = {
  trustText: "Trusted by leading development teams worldwide",
  companies: ["TechCorp", "DevStudio", "StartupLab", "InnovateCo", "BuildFast", "CodeCraft"]
}

const featuresConfig = {
  section: {
    title: "Everything You Need for Modern UI Development",
    description: "A complete toolkit for building beautiful, maintainable user interfaces without writing CSS"
  },
  features: [
    {
      title: "Config-Driven Design System",
      description: "Centralized design tokens control every aspect of your UI. Change colors, spacing, and typography from one configuration file.",
      icon: "🎨"
    },
    {
      title: "Automatic Theme Generation",
      description: "Light and dark themes are automatically generated from your base colors with perfect contrast ratios.",
      icon: "🌓"
    },
    {
      title: "Style Object Generation",
      description: "React style objects are automatically generated from configuration, eliminating CSS dependencies entirely.",
      icon: "⚡"
    },
    {
      title: "Full TypeScript Support",
      description: "Complete type safety across your design system with intelligent autocomplete and error checking.",
      icon: "🛡️"
    },
    {
      title: "Framework Agnostic",
      description: "Works with React, Next.js, and any React-based framework. Export to other frameworks coming soon.",
      icon: "🔄"
    },
    {
      title: "Performance Optimized",
      description: "Zero runtime CSS processing. All styles are pure JavaScript objects with optimal performance.",
      icon: "🚀"
    }
  ]
}

const testimonialsConfig = {
  section: {
    title: "Loved by Developers Worldwide",
    description: "See what teams are saying about building with config-driven styling"
  },
  testimonials: [
    {
      quote: "ConfigLib completely transformed how we build UIs. No more CSS debugging, no more style conflicts. Just pure, predictable styling.",
      author: "Sarah Chen",
      role: "Lead Frontend Developer",
      avatar: "/professional-woman-ceo.png"
    },
    {
      quote: "The type safety and theme switching capabilities are incredible. We can now maintain consistent design across our entire product suite.",
      author: "Michael Rodriguez",
      role: "Senior Software Engineer",
      avatar: "/professional-man-cto.png"
    },
    {
      quote: "Moving from CSS to config-driven styling reduced our bundle size and eliminated 90% of our styling bugs. It's a game changer.",
      author: "Emma Thompson",
      role: "UI/UX Engineer",
      avatar: "/professional-woman-manager.png"
    }
  ]
}

const pricingConfig = {
  section: {
    title: "Simple, Transparent Pricing",
    description: "Choose the perfect plan for your team's needs"
  },
  plans: [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small projects and prototypes",
      features: [
        "Core styling system",
        "Basic theme support",
        "TypeScript integration",
        "Community support",
        "Open source license"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      description: "Everything you need for production apps",
      features: [
        "Advanced styling system",
        "Multi-theme support",
        "Custom design tokens",
        "Framework exports",
        "Priority support",
        "Team collaboration tools"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large teams and organizations",
      features: [
        "White-label solution",
        "Custom integrations",
        "Advanced analytics",
        "Dedicated support",
        "Training & consulting",
        "SLA guarantees"
      ],
      popular: false
    }
  ]
}

const ctaConfig = {
  title: "Ready to Revolutionize Your UI Development?",
  description: "Join thousands of developers who have already made the switch to config-driven styling. Start building better UIs today.",
  actions: {
    primary: {
      label: "Get Started Now",
      variant: "secondary" as const
    },
    secondary: {
      label: "Book a Demo",
      variant: "outline" as const
    }
  }
}

const footerConfig = {
  brand: {
    name: "ConfigLib Pro",
    logo: "🎨",
    description: "The future of styling is configuration-driven. Build beautiful, maintainable UIs without writing CSS."
  },
  sections: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/api" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Getting Started", href: "/guide" },
        { label: "Examples", href: "/examples" },
        { label: "Blog", href: "/blog" },
        { label: "Community", href: "/community" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Status", href: "/status" },
        { label: "Report Bug", href: "/bug-report" }
      ]
    }
  ],
  copyright: "© 2025 ConfigLib Pro. Built with 100% config-driven styling.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "License", href: "/license" }
  ]
}

/**
 * Theme Toggle Component
 */
function ThemeToggle() {
  const { theme } = useStyles()
  const { toggle, mode } = useThemeManager()
  
  const toggleStyles: React.CSSProperties = {
    position: 'fixed',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1000,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borders.radius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
    transition: 'all 0.2s ease-in-out',
    boxShadow: theme.shadows.lg,
  }

  return (
    <button onClick={toggle} style={toggleStyles}>
      {mode === 'light' ? '🌙' : '☀️'} {mode === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}

/**
 * Success Status Component
 */
function SuccessStatus() {
  const { theme } = useStyles()
  
  const statusStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1000,
    padding: theme.spacing.lg,
    backgroundColor: '#dcfce7', // green-100
    border: '2px solid #16a34a', // green-600
    borderRadius: theme.borders.radius.lg,
    boxShadow: theme.shadows.xl,
    maxWidth: '350px',
  }

  const titleStyles: React.CSSProperties = {
    margin: '0 0 0.75rem 0',
    color: '#15803d', // green-700
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.base,
  }

  const listStyles: React.CSSProperties = {
    margin: 0,
    paddingLeft: theme.spacing.lg,
    color: '#166534', // green-800
    fontSize: theme.typography.fontSize.xs,
    lineHeight: 1.4,
  }

  return (
    <div style={statusStyles}>
      <h4 style={titleStyles}>🎉 Phase 3 COMPLETE!</h4>
      <ul style={listStyles}>
        <li>✅ All 8 Business Components Converted</li>
        <li>✅ Header, Hero, Features, Testimonials</li>
        <li>✅ Pricing, Social Proof, CTA, Footer</li>
        <li>✅ 100% Config-Driven Styling</li>
        <li>✅ Zero CSS Dependencies</li>
        <li>✅ Complete Theme Integration</li>
        <li>✅ Full TypeScript Support</li>
      </ul>
    </div>
  )
}

/**
 * Main Complete Landing Page Test
 */
export function CompleteLandingPageTest() {
  return (
    <TestThemeProvider>
      <div style={{ 
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <ThemeToggle />
        <SuccessStatus />
        
        <Header config={headerConfig} />
        
        <main>
          <HeroSection config={heroConfig} />
          <SocialProof config={socialProofConfig} />
          <FeaturesSection config={featuresConfig} />
          <TestimonialsSection config={testimonialsConfig} />
          <PricingSection config={pricingConfig} />
          <CTASection config={ctaConfig} />
        </main>
        
        <Footer config={footerConfig} />
      </div>
    </TestThemeProvider>
  )
}

export default CompleteLandingPageTest
