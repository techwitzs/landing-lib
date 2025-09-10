/**
 * Developer Tools
 * 
 * Debugging tools, style inspector, and theme validation utilities
 */

import { Theme } from './theme'
import { ResponsiveValue } from './responsive'
import { PerformanceMetrics } from './performance'

export interface ValidationError {
  type: 'error' | 'warning' | 'info'
  component: string
  property: string
  value: any
  message: string
  suggestion?: string
}

export interface StyleInspectorData {
  component: string
  variant: string
  computedStyles: React.CSSProperties
  appliedTheme: Theme
  responsiveBreakpoints?: Record<string, boolean>
  performanceMetrics?: PerformanceMetrics
}

export interface ThemeValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
  suggestions: ValidationError[]
}

/**
 * Theme Validator
 */
export class ThemeValidator {
  private requiredKeys = {
    colors: ['primary', 'secondary', 'background', 'foreground', 'border'],
    spacing: ['xs', 'sm', 'md', 'lg', 'xl'],
    typography: {
      fontSize: ['sm', 'base', 'lg', 'xl'],
      fontWeight: ['normal', 'medium', 'semibold', 'bold']
    },
    borders: {
      radius: ['none', 'sm', 'md', 'lg', 'full']
    },
    shadows: ['none', 'sm', 'md', 'lg']
  }

  /**
   * Validate theme structure and values
   */
  validateTheme(theme: Theme): ThemeValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []
    const suggestions: ValidationError[] = []

    // Validate required structure
    this.validateRequiredKeys(theme, errors)
    
    // Validate color values
    this.validateColors(theme.colors, errors, warnings)
    
    // Validate spacing values
    this.validateSpacing(theme.spacing, errors, warnings)
    
    // Validate typography
    this.validateTypography(theme.typography, errors, warnings)
    
    // Validate accessibility
    this.validateAccessibility(theme, warnings, suggestions)

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    }
  }

  /**
   * Validate color contrast ratios
   */
  validateColorContrast(
    foreground: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA'
  ): {
    ratio: number
    passes: boolean
    rating: 'fail' | 'aa' | 'aaa'
  } {
    const ratio = this.calculateContrastRatio(foreground, background)
    const aaThreshold = 4.5
    const aaaThreshold = 7

    let rating: 'fail' | 'aa' | 'aaa' = 'fail'
    if (ratio >= aaaThreshold) rating = 'aaa'
    else if (ratio >= aaThreshold) rating = 'aa'

    const passes = level === 'AA' ? ratio >= aaThreshold : ratio >= aaaThreshold

    return { ratio, passes, rating }
  }

  private validateRequiredKeys(theme: Theme, errors: ValidationError[]): void {
    // Validate colors
    this.requiredKeys.colors.forEach(key => {
      if (!(key in theme.colors)) {
        errors.push({
          type: 'error',
          component: 'theme',
          property: `colors.${key}`,
          value: undefined,
          message: `Required color token '${key}' is missing`,
          suggestion: `Add colors.${key} to your theme configuration`
        })
      }
    })

    // Validate spacing
    this.requiredKeys.spacing.forEach(key => {
      if (!(key in theme.spacing)) {
        errors.push({
          type: 'error',
          component: 'theme',
          property: `spacing.${key}`,
          value: undefined,
          message: `Required spacing token '${key}' is missing`,
          suggestion: `Add spacing.${key} to your theme configuration`
        })
      }
    })

    // Validate typography
    if (!theme.typography?.fontSize) {
      errors.push({
        type: 'error',
        component: 'theme',
        property: 'typography.fontSize',
        value: undefined,
        message: 'Typography fontSize configuration is missing'
      })
    } else {
      this.requiredKeys.typography.fontSize.forEach(key => {
        if (!(key in theme.typography.fontSize)) {
          errors.push({
            type: 'error',
            component: 'theme',
            property: `typography.fontSize.${key}`,
            value: undefined,
            message: `Required font size '${key}' is missing`
          })
        }
      })
    }
  }

  private validateColors(colors: any, errors: ValidationError[], warnings: ValidationError[]): void {
    Object.entries(colors).forEach(([key, value]) => {
      if (!this.isValidColor(value as string)) {
        errors.push({
          type: 'error',
          component: 'theme',
          property: `colors.${key}`,
          value,
          message: `Invalid color value: ${value}`,
          suggestion: 'Use a valid CSS color value (hex, rgb, hsl, oklch, etc.)'
        })
      }

      if (this.isDeprecatedColorFormat(value as string)) {
        warnings.push({
          type: 'warning',
          component: 'theme',
          property: `colors.${key}`,
          value,
          message: `Color format may not be future-proof: ${value}`,
          suggestion: 'Consider using oklch() for better color consistency'
        })
      }
    })
  }

  private validateSpacing(spacing: any, errors: ValidationError[], warnings: ValidationError[]): void {
    Object.entries(spacing).forEach(([key, value]) => {
      if (!this.isValidLength(value as string)) {
        errors.push({
          type: 'error',
          component: 'theme',
          property: `spacing.${key}`,
          value,
          message: `Invalid spacing value: ${value}`,
          suggestion: 'Use valid CSS length units (px, rem, em, etc.)'
        })
      }

      if ((value as string).includes('px') && key !== 'none') {
        warnings.push({
          type: 'warning',
          component: 'theme',
          property: `spacing.${key}`,
          value,
          message: 'Using px units may not be optimal for responsive design',
          suggestion: 'Consider using rem or em units for better scalability'
        })
      }
    })
  }

  private validateTypography(typography: Theme['typography'], errors: ValidationError[], warnings: ValidationError[]): void {
    // Validate font sizes
    Object.entries(typography.fontSize).forEach(([key, value]) => {
      if (!this.isValidLength(value)) {
        errors.push({
          type: 'error',
          component: 'theme',
          property: `typography.fontSize.${key}`,
          value,
          message: `Invalid font size value: ${value}`
        })
      }
    })

    // Validate font weights
    Object.entries(typography.fontWeight).forEach(([key, value]) => {
      if (!this.isValidFontWeight(value)) {
        errors.push({
          type: 'error',
          component: 'theme',
          property: `typography.fontWeight.${key}`,
          value,
          message: `Invalid font weight value: ${value}`
        })
      }
    })
  }

  private validateAccessibility(theme: Theme, warnings: ValidationError[], suggestions: ValidationError[]): void {
    // Check color contrast
    const primaryOnBackground = this.validateColorContrast(theme.colors.primary, theme.colors.background)
    if (!primaryOnBackground.passes) {
      warnings.push({
        type: 'warning',
        component: 'theme',
        property: 'colors.primary',
        value: theme.colors.primary,
        message: `Primary color has insufficient contrast ratio (${primaryOnBackground.ratio.toFixed(2)}) against background`,
        suggestion: 'Adjust primary color to meet WCAG AA standards (4.5:1 minimum)'
      })
    }

    // Check spacing scale
    const spacingValues = Object.values(theme.spacing)
      .filter(value => value !== '0')
      .map(value => parseFloat(value))
      .filter(value => !isNaN(value))
    
    if (spacingValues.length > 0) {
      const hasConsistentScale = this.checkSpacingScale(spacingValues)
      if (!hasConsistentScale) {
        suggestions.push({
          type: 'info',
          component: 'theme',
          property: 'spacing',
          value: theme.spacing,
          message: 'Spacing scale may not follow a consistent ratio',
          suggestion: 'Consider using a consistent scale (1.5x, 2x, etc.) for better visual harmony'
        })
      }
    }
  }

  private isValidColor(color: string): boolean {
    // Basic color validation - in practice, you'd use a more sophisticated check
    const colorRegex = /^(#[0-9a-f]{3,8}|rgb|hsl|oklch|color\()/i
    return colorRegex.test(color) || CSS.supports('color', color)
  }

  private isDeprecatedColorFormat(color: string): boolean {
    return color.includes('rgb(') || color.includes('hsl(') || color.startsWith('#')
  }

  private isValidLength(value: string): boolean {
    const lengthRegex = /^-?\d*\.?\d+(px|em|rem|%|vh|vw|vmin|vmax|ch|ex)$/
    return value === '0' || lengthRegex.test(value)
  }

  private isValidFontWeight(weight: number): boolean {
    return weight >= 100 && weight <= 900 && weight % 100 === 0
  }

  private calculateContrastRatio(color1: string, color2: string): number {
    // Simplified contrast calculation - in practice, you'd parse the colors properly
    // This is a placeholder implementation
    return 4.5 // Example value
  }

  private checkSpacingScale(values: number[]): boolean {
    if (values.length < 3) return true
    
    const sortedValues = [...values].sort((a, b) => a - b)
    const ratios: number[] = []
    
    for (let i = 1; i < sortedValues.length; i++) {
      ratios.push(sortedValues[i] / sortedValues[i - 1])
    }
    
    const averageRatio = ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length
    const tolerance = 0.2
    
    return ratios.every(ratio => Math.abs(ratio - averageRatio) <= tolerance)
  }
}

/**
 * Style Inspector
 */
export class StyleInspector {
  private theme: Theme

  constructor(theme: Theme) {
    this.theme = theme
  }

  /**
   * Inspect component styles
   */
  inspectComponent(
    component: string,
    variant: string,
    props: Record<string, any> = {}
  ): StyleInspectorData {
    // This would integrate with your style generators
    const computedStyles = this.computeStyles(component, variant, props)
    
    return {
      component,
      variant,
      computedStyles,
      appliedTheme: this.theme,
      responsiveBreakpoints: this.getCurrentBreakpoints()
    }
  }

  /**
   * Inspect responsive styles
   */
  inspectResponsiveStyles(
    responsiveValue: ResponsiveValue<any>,
    property: keyof React.CSSProperties
  ): {
    currentValue: any
    breakpointValues: Record<string, any>
    appliedBreakpoint: string
  } {
    const breakpoints = this.getCurrentBreakpoints()
    const appliedBreakpoint = this.getAppliedBreakpoint(breakpoints)
    
    const currentValue = responsiveValue[appliedBreakpoint] || 
                        responsiveValue.base || 
                        Object.values(responsiveValue)[0]

    return {
      currentValue,
      breakpointValues: responsiveValue,
      appliedBreakpoint
    }
  }

  /**
   * Get style inheritance chain
   */
  getStyleInheritance(component: string): {
    chain: string[]
    styles: Record<string, React.CSSProperties>
  } {
    // This would trace the style inheritance from base to component
    const chain = ['base', 'component', component]
    const styles: Record<string, React.CSSProperties> = {}

    chain.forEach(level => {
      styles[level] = this.getStylesForLevel(level, component)
    })

    return { chain, styles }
  }

  private computeStyles(component: string, variant: string, props: Record<string, any>): React.CSSProperties {
    // Placeholder implementation
    return {
      backgroundColor: this.theme.colors.primary,
      color: this.theme.colors.background,
      padding: this.theme.spacing.md
    }
  }

  private getCurrentBreakpoints(): Record<string, boolean> {
    // In a real implementation, this would check current screen size
    return {
      sm: false,
      md: true,
      lg: false,
      xl: false,
      '2xl': false
    }
  }

  private getAppliedBreakpoint(breakpoints: Record<string, boolean>): string {
    const activeBreakpoint = Object.entries(breakpoints)
      .find(([, isActive]) => isActive)
    
    return activeBreakpoint ? activeBreakpoint[0] : 'base'
  }

  private getStylesForLevel(level: string, component: string): React.CSSProperties {
    // Placeholder implementation
    switch (level) {
      case 'base':
        return { boxSizing: 'border-box' }
      case 'component':
        return { display: 'block' }
      default:
        return {}
    }
  }
}

/**
 * Debug Console
 */
export class DebugConsole {
  private enabled: boolean = false
  private logs: Array<{ timestamp: number; type: string; message: string; data?: any }> = []

  /**
   * Enable debug mode
   */
  enable(): void {
    this.enabled = true
    this.log('debug', 'Debug mode enabled')
  }

  /**
   * Disable debug mode
   */
  disable(): void {
    this.log('debug', 'Debug mode disabled')
    this.enabled = false
  }

  /**
   * Log style generation
   */
  logStyleGeneration(component: string, variant: string, duration: number): void {
    if (!this.enabled) return

    this.log('style-generation', `Generated styles for ${component}:${variant}`, {
      component,
      variant,
      duration: `${duration.toFixed(2)}ms`
    })
  }

  /**
   * Log theme changes
   */
  logThemeChange(from: string, to: string): void {
    if (!this.enabled) return

    this.log('theme-change', `Theme changed from ${from} to ${to}`, {
      from,
      to,
      timestamp: Date.now()
    })
  }

  /**
   * Log cache operations
   */
  logCacheOperation(operation: 'hit' | 'miss' | 'set', key: string): void {
    if (!this.enabled) return

    this.log('cache', `Cache ${operation}: ${key}`, {
      operation,
      key
    })
  }

  /**
   * Log performance warnings
   */
  logPerformanceWarning(message: string, details?: any): void {
    if (!this.enabled) return

    this.log('performance-warning', message, details)
  }

  /**
   * Get debug logs
   */
  getLogs(): Array<{ timestamp: number; type: string; message: string; data?: any }> {
    return [...this.logs]
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.logs = []
  }

  /**
   * Export logs
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  private log(type: string, message: string, data?: any): void {
    const logEntry = {
      timestamp: Date.now(),
      type,
      message,
      data
    }

    this.logs.push(logEntry)

    // Also log to console if available
    if (typeof console !== 'undefined') {
      console.log(`[${type.toUpperCase()}]`, message, data || '')
    }

    // Keep only last 1000 logs
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000)
    }
  }
}

/**
 * Developer Tools Suite
 */
export class DeveloperTools {
  public validator: ThemeValidator
  public inspector: StyleInspector
  public debugConsole: DebugConsole

  constructor(theme: Theme) {
    this.validator = new ThemeValidator()
    this.inspector = new StyleInspector(theme)
    this.debugConsole = new DebugConsole()
  }

  /**
   * Run complete theme audit
   */
  auditTheme(theme: Theme): {
    validation: ThemeValidationResult
    suggestions: string[]
    performanceScore: number
  } {
    const validation = this.validator.validateTheme(theme)
    
    const suggestions = [
      ...validation.suggestions.map(s => s.message),
      ...this.generatePerformanceSuggestions(theme)
    ]

    const performanceScore = this.calculatePerformanceScore(theme, validation)

    return {
      validation,
      suggestions,
      performanceScore
    }
  }

  /**
   * Generate style report
   */
  generateStyleReport(theme: Theme): {
    summary: {
      totalTokens: number
      colorTokens: number
      spacingTokens: number
      typographyTokens: number
    }
    usage: Record<string, number>
    recommendations: string[]
  } {
    const summary = {
      totalTokens: this.countTokens(theme),
      colorTokens: Object.keys(theme.colors).length,
      spacingTokens: Object.keys(theme.spacing).length,
      typographyTokens: Object.keys(theme.typography.fontSize).length + Object.keys(theme.typography.fontWeight).length
    }

    // Mock usage data - in practice, this would track actual usage
    const usage = {
      'colors.primary': 45,
      'colors.secondary': 12,
      'spacing.md': 38,
      'spacing.lg': 22,
      'typography.fontSize.base': 67
    }

    const recommendations = this.generateOptimizationRecommendations(summary, usage)

    return {
      summary,
      usage,
      recommendations
    }
  }

  private generatePerformanceSuggestions(theme: Theme): string[] {
    const suggestions: string[] = []

    if (Object.keys(theme.colors).length > 20) {
      suggestions.push('Consider reducing the number of color tokens for better performance')
    }

    if (Object.keys(theme.spacing).length > 15) {
      suggestions.push('Large spacing scales may impact bundle size')
    }

    return suggestions
  }

  private calculatePerformanceScore(theme: Theme, validation: ThemeValidationResult): number {
    let score = 100

    // Deduct points for errors and warnings
    score -= validation.errors.length * 10
    score -= validation.warnings.length * 5

    // Deduct points for excessive tokens
    const totalTokens = this.countTokens(theme)
    if (totalTokens > 100) {
      score -= Math.min(20, (totalTokens - 100) * 0.2)
    }

    return Math.max(0, score)
  }

  private countTokens(theme: Theme): number {
    return Object.keys(theme.colors).length +
           Object.keys(theme.spacing).length +
           Object.keys(theme.typography.fontSize).length +
           Object.keys(theme.typography.fontWeight).length +
           Object.keys(theme.borders.radius).length +
           Object.keys(theme.shadows).length
  }

  private generateOptimizationRecommendations(summary: any, usage: Record<string, number>): string[] {
    const recommendations: string[] = []

    // Find unused tokens
    const unusedTokens = Object.entries(usage).filter(([, count]) => count === 0)
    if (unusedTokens.length > 0) {
      recommendations.push(`Consider removing unused tokens: ${unusedTokens.map(([token]) => token).join(', ')}`)
    }

    // Find frequently used tokens
    const frequentTokens = Object.entries(usage).filter(([, count]) => count > 50)
    if (frequentTokens.length > 0) {
      recommendations.push(`Consider caching frequently used tokens: ${frequentTokens.map(([token]) => token).join(', ')}`)
    }

    return recommendations
  }
}

/**
 * Development Hook Factory
 */
export function createDeveloperHooks(theme: Theme, enableDebugging: boolean = false) {
  const devTools = new DeveloperTools(theme)
  
  if (enableDebugging) {
    devTools.debugConsole.enable()
  }

  function useThemeValidation(): ThemeValidationResult {
    return devTools.validator.validateTheme(theme)
  }

  function useStyleInspector(): StyleInspector {
    return devTools.inspector
  }

  function useDebugConsole(): DebugConsole {
    return devTools.debugConsole
  }

  function useThemeAudit(): ReturnType<typeof devTools.auditTheme> {
    return devTools.auditTheme(theme)
  }

  return {
    useThemeValidation,
    useStyleInspector,
    useDebugConsole,
    useThemeAudit,
    devTools
  }
}
