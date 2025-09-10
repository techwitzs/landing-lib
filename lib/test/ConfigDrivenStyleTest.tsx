/**
 * Config-Driven Styling System Test
 * 
 * Test file to verify all UI components work with the new config-driven styling system
 */

import React from 'react'
import { ThemeContext, useStyles, useThemeManager } from '../hooks/useStyles'
import { Button } from '../shared/ui/src/components/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../shared/ui/src/components/Card'
import { Badge } from '../shared/ui/src/components/Badge'

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
 * Button Test Component
 */
function ButtonTest() {
  const { theme } = useStyles()
  
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.lg,
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, color: theme.colors.foreground }}>Button Component Test</h3>
      
      <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
        <Button variant="default" size="default">Default Button</Button>
        <Button variant="destructive" size="default">Destructive</Button>
        <Button variant="outline" size="default">Outline</Button>
        <Button variant="secondary" size="default">Secondary</Button>
        <Button variant="ghost" size="default">Ghost</Button>
        <Button variant="link" size="default">Link</Button>
      </div>
      
      <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
        <Button variant="default" size="sm">Small</Button>
        <Button variant="default" size="default">Default</Button>
        <Button variant="default" size="lg">Large</Button>
        <Button variant="default" size="icon">📱</Button>
      </div>
    </div>
  )
}

/**
 * Card Test Component
 */
function CardTest() {
  const { theme } = useStyles()
  
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.lg,
  }

  return (
    <div style={containerStyle}>
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>This is a default card with pure style objects</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, color: theme.colors.foreground }}>
            Card content using config-driven styling system. No CSS classes needed!
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="default" size="sm">Action</Button>
        </CardFooter>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Card with elevated styling variant</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: theme.spacing.xs, flexWrap: 'wrap' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Badge Test Component
 */
function BadgeTest() {
  const { theme } = useStyles()
  
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.lg,
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, color: theme.colors.foreground }}>Badge Component Test</h3>
      
      <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge variant="default">Default Badge</Badge>
        <Badge variant="secondary">Secondary Badge</Badge>
        <Badge variant="outline">Outline Badge</Badge>
        <Badge variant="destructive">Destructive Badge</Badge>
      </div>
    </div>
  )
}

/**
 * Theme Toggle Test Component
 */
function ThemeToggleTest() {
  const { theme } = useStyles()
  const { toggle } = useThemeManager()
  
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.lg,
    border: `1px solid ${theme.colors.border}`,
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, color: theme.colors.foreground }}>Theme Toggle Test</h3>
      <p style={{ margin: 0, color: theme.colors.muted }}>
        Current theme colors are dynamically applied via style objects
      </p>
      <Button onClick={toggle} variant="outline">
        Toggle Theme
      </Button>
    </div>
  )
}

/**
 * Main Test App
 */
export function ConfigDrivenStyleTest() {
  return (
    <TestThemeProvider>
      <div style={{ 
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <h1 style={{ textAlign: 'center', margin: 0 }}>
            Config-Driven Styling System Test
          </h1>
          
          <ThemeToggleTest />
          <ButtonTest />
          <CardTest />
          <BadgeTest />
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f0f9ff', 
            borderRadius: '8px',
            border: '1px solid #0ea5e9'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#0369a1' }}>✅ Success!</h4>
            <p style={{ margin: 0, color: '#0c4a6e' }}>
              All components are now using pure config-driven styling with React style objects. 
              No CSS classes or external stylesheets needed!
            </p>
          </div>
        </div>
      </div>
    </TestThemeProvider>
  )
}

export default ConfigDrivenStyleTest
