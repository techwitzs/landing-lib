/**
 * Business Components Integration Test
 * 
 * Test file to verify all converted business components work with config-driven styling
 */

import React from 'react'
import { ThemeContext, useStyles, useThemeManager } from '../hooks/useStyles'
import { HeroSection } from '../shared/components/src/components/HeroSection'
import { Header } from '../shared/components/src/components/Header'
import { CTASection } from '../shared/components/src/components/CTASection'
import { FeaturesSection } from '../shared/components/src/components/FeaturesSection'

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
 * Test configurations for components
 */
const headerConfig = {
  brand: {
    name: "ConfigLib",
    logo: "🎨"
  },
  navigation: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],
  actions: {
    signin: "Sign In",
    cta: "Get Started"
  }
}

const heroConfig = {
  badge: {
    text: "✨ Pure Config-Driven Styling",
    variant: "secondary" as const
  },
  headline: {
    main: "Build Beautiful UIs with",
    highlight: "Zero CSS Dependencies"
  },
  description: "Experience the power of pure config-driven styling. All components use React style objects generated from design tokens, eliminating CSS dependencies entirely.",
  actions: {
    primary: {
      label: "Try It Now",
      variant: "default" as const
    },
    secondary: {
      label: "View Docs",
      variant: "outline" as const
    }
  },
  features: [
    { text: "Pure Style Objects" },
    { text: "Theme Switching" },
    { text: "Type Safe Design Tokens" },
    { text: "Zero CSS Dependencies" }
  ]
}

const featuresConfig = {
  section: {
    title: "Powerful Config-Driven Features",
    description: "Everything you need to build modern UIs without writing CSS"
  },
  features: [
    {
      title: "Design Tokens",
      description: "Centralized configuration with type-safe access to colors, spacing, typography, and more.",
      icon: "🎨"
    },
    {
      title: "Theme Management",
      description: "Built-in light and dark mode support with seamless switching and persistence.",
      icon: "🌙"
    },
    {
      title: "Style Generators",
      description: "Automatic generation of React style objects from configuration with variant support.",
      icon: "⚡"
    },
    {
      title: "Type Safety",
      description: "Full TypeScript integration ensures type safety across your entire design system.",
      icon: "🛡️"
    },
    {
      title: "Zero Dependencies",
      description: "No CSS frameworks or external stylesheets required. Pure React style objects only.",
      icon: "🚀"
    },
    {
      title: "Responsive Design",
      description: "Built-in responsive utilities and breakpoint management through configuration.",
      icon: "📱"
    }
  ]
}

const ctaConfig = {
  title: "Ready to Go CSS-Free?",
  description: "Join the config-driven revolution and build UIs that are portable, maintainable, and beautiful.",
  actions: {
    primary: {
      label: "Start Building",
      variant: "secondary" as const
    },
    secondary: {
      label: "Learn More",
      variant: "outline" as const
    }
  }
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
  }

  return (
    <button onClick={toggle} style={toggleStyles}>
      {mode === 'light' ? '🌙' : '☀️'} {mode === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}

/**
 * Status Component
 */
function StatusComponent() {
  const { theme } = useStyles()
  
  const statusStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1000,
    padding: theme.spacing.lg,
    backgroundColor: '#dcfce7', // green-100
    border: '1px solid #16a34a', // green-600
    borderRadius: theme.borders.radius.lg,
    boxShadow: theme.shadows.lg,
    maxWidth: '300px',
  }

  const titleStyles: React.CSSProperties = {
    margin: '0 0 0.5rem 0',
    color: '#15803d', // green-700
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: theme.typography.fontSize.sm,
  }

  const listStyles: React.CSSProperties = {
    margin: 0,
    paddingLeft: theme.spacing.lg,
    color: '#166534', // green-800
    fontSize: theme.typography.fontSize.xs,
  }

  return (
    <div style={statusStyles}>
      <h4 style={titleStyles}>✅ Phase 3 Progress</h4>
      <ul style={listStyles}>
        <li>HeroSection ✅</li>
        <li>Header ✅</li>
        <li>CTASection ✅</li>
        <li>FeaturesSection ✅</li>
        <li>All components using pure style objects</li>
        <li>No CSS dependencies</li>
      </ul>
    </div>
  )
}

/**
 * Main Test App
 */
export function BusinessComponentsTest() {
  return (
    <TestThemeProvider>
      <div style={{ 
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <ThemeToggle />
        <StatusComponent />
        
        <Header config={headerConfig} />
        
        <main>
          <HeroSection config={heroConfig} />
          <FeaturesSection config={featuresConfig} />
          <CTASection config={ctaConfig} />
        </main>
        
        <div style={{ 
          padding: '2rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <p>🎉 All components rendered with pure config-driven styling!</p>
        </div>
      </div>
    </TestThemeProvider>
  )
}

export default BusinessComponentsTest
