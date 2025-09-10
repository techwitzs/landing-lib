/**
 * Advanced Responsive Utilities
 * 
 * Breakpoint management, container queries, and responsive style generation
 */

import { Theme } from './theme'

export interface Breakpoint {
  name: string
  min?: number
  max?: number
  unit: 'px' | 'em' | 'rem'
}

export interface ResponsiveValue<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
  [key: string]: T | undefined
}

export interface ContainerQueryOptions {
  type: 'inline-size' | 'block-size' | 'size'
  min?: number
  max?: number
  unit: 'px' | 'em' | 'rem' | '%' | 'vw' | 'vh'
}

export interface MediaQueryRule {
  query: string
  styles: React.CSSProperties
}

/**
 * Default Breakpoint System
 */
export const defaultBreakpoints: Record<string, Breakpoint> = {
  sm: { name: 'sm', min: 640, unit: 'px' },
  md: { name: 'md', min: 768, unit: 'px' },
  lg: { name: 'lg', min: 1024, unit: 'px' },
  xl: { name: 'xl', min: 1280, unit: 'px' },
  '2xl': { name: '2xl', min: 1536, unit: 'px' }
}

/**
 * Breakpoint Manager
 */
export class BreakpointManager {
  private breakpoints: Record<string, Breakpoint>

  constructor(breakpoints: Record<string, Breakpoint> = defaultBreakpoints) {
    this.breakpoints = breakpoints
  }

  getBreakpoint(name: string): Breakpoint | undefined {
    return this.breakpoints[name]
  }

  getAllBreakpoints(): Record<string, Breakpoint> {
    return { ...this.breakpoints }
  }

  addBreakpoint(name: string, breakpoint: Breakpoint): void {
    this.breakpoints[name] = breakpoint
  }

  removeBreakpoint(name: string): void {
    delete this.breakpoints[name]
  }

  generateMediaQuery(name: string): string {
    const breakpoint = this.breakpoints[name]
    if (!breakpoint) return ''

    let query = '@media'
    
    if (breakpoint.min !== undefined) {
      query += ` (min-width: ${breakpoint.min}${breakpoint.unit})`
    }
    
    if (breakpoint.max !== undefined) {
      if (breakpoint.min !== undefined) query += ' and'
      query += ` (max-width: ${breakpoint.max}${breakpoint.unit})`
    }

    return query
  }

  generateContainerQuery(name: string, options: ContainerQueryOptions): string {
    let query = `@container`
    
    if (name) {
      query += ` ${name}`
    }

    const conditions: string[] = []
    
    if (options.min !== undefined) {
      conditions.push(`(min-${options.type}: ${options.min}${options.unit})`)
    }
    
    if (options.max !== undefined) {
      conditions.push(`(max-${options.type}: ${options.max}${options.unit})`)
    }

    if (conditions.length > 0) {
      query += ` ${conditions.join(' and ')}`
    }

    return query
  }

  isMobileFirst(): boolean {
    // Check if breakpoints are mobile-first (min-width based)
    return Object.values(this.breakpoints).every(bp => bp.min !== undefined && bp.max === undefined)
  }

  sortBreakpoints(): Array<[string, Breakpoint]> {
    return Object.entries(this.breakpoints).sort(([, a], [, b]) => {
      const aMin = a.min || 0
      const bMin = b.min || 0
      return aMin - bMin
    })
  }
}

/**
 * Responsive Style Generator
 */
export class ResponsiveStyleGenerator {
  private breakpointManager: BreakpointManager
  private theme: Theme

  constructor(theme: Theme, breakpoints?: Record<string, Breakpoint>) {
    this.theme = theme
    this.breakpointManager = new BreakpointManager(breakpoints)
  }

  /**
   * Generate responsive styles from responsive values
   */
  generateResponsiveStyles<T>(
    property: keyof React.CSSProperties,
    responsiveValue: ResponsiveValue<T>
  ): MediaQueryRule[] {
    const rules: MediaQueryRule[] = []
    const sortedBreakpoints = this.breakpointManager.sortBreakpoints()

    // Base styles (mobile-first)
    if (responsiveValue.base !== undefined) {
      rules.push({
        query: '',
        styles: { [property]: responsiveValue.base } as React.CSSProperties
      })
    }

    // Responsive styles
    sortedBreakpoints.forEach(([name, breakpoint]) => {
      const value = responsiveValue[name]
      if (value !== undefined) {
        const mediaQuery = this.breakpointManager.generateMediaQuery(name)
        rules.push({
          query: mediaQuery,
          styles: { [property]: value } as React.CSSProperties
        })
      }
    })

    return rules
  }

  /**
   * Generate complete responsive style object
   */
  generateResponsiveStyleObject(responsiveStyles: Record<string, ResponsiveValue<any>>): {
    base: React.CSSProperties
    responsive: MediaQueryRule[]
  } {
    const base: React.CSSProperties = {}
    const responsive: MediaQueryRule[] = []
    const mediaQueries: Record<string, React.CSSProperties> = {}

    Object.entries(responsiveStyles).forEach(([property, responsiveValue]) => {
      const rules = this.generateResponsiveStyles(property as keyof React.CSSProperties, responsiveValue)
      
      rules.forEach(rule => {
        if (rule.query === '') {
          // Base styles
          Object.assign(base, rule.styles)
        } else {
          // Responsive styles
          if (!mediaQueries[rule.query]) {
            mediaQueries[rule.query] = {}
          }
          Object.assign(mediaQueries[rule.query], rule.styles)
        }
      })
    })

    // Convert media queries to rules
    Object.entries(mediaQueries).forEach(([query, styles]) => {
      responsive.push({ query, styles })
    })

    return { base, responsive }
  }

  /**
   * Generate container query styles
   */
  generateContainerStyles(
    containerName: string,
    containerQueries: Record<string, ContainerQueryOptions>,
    styles: Record<string, React.CSSProperties>
  ): {
    containerStyle: React.CSSProperties
    queries: Array<{ query: string; styles: React.CSSProperties }>
  } {
    const containerStyle: React.CSSProperties = {
      containerName,
      containerType: 'inline-size' // default
    }

    const queries = Object.entries(containerQueries).map(([queryName, options]) => {
      const query = this.breakpointManager.generateContainerQuery(containerName, options)
      return {
        query,
        styles: styles[queryName] || {}
      }
    })

    return { containerStyle, queries }
  }
}

/**
 * Responsive Hook Utilities
 */
export interface UseResponsiveOptions {
  theme: Theme
  breakpoints?: Record<string, Breakpoint>
}

export function createResponsiveHooks(options: UseResponsiveOptions) {
  const generator = new ResponsiveStyleGenerator(options.theme, options.breakpoints)
  const breakpointManager = new BreakpointManager(options.breakpoints)

  /**
   * Hook for responsive values
   */
  function useResponsiveValue<T>(responsiveValue: ResponsiveValue<T>): T | undefined {
    // In a real implementation, this would use window size and match media queries
    // For now, return base value or first available value
    return responsiveValue.base || 
           responsiveValue.sm || 
           responsiveValue.md || 
           responsiveValue.lg || 
           responsiveValue.xl || 
           responsiveValue['2xl']
  }

  /**
   * Hook for responsive styles
   */
  function useResponsiveStyles(responsiveStyles: Record<string, ResponsiveValue<any>>): React.CSSProperties {
    const { base } = generator.generateResponsiveStyleObject(responsiveStyles)
    // In a real implementation, this would also apply matching media query styles
    return base
  }

  /**
   * Hook for breakpoint matching
   */
  function useBreakpoint(): {
    current: string | null
    isAbove: (breakpoint: string) => boolean
    isBelow: (breakpoint: string) => boolean
    isBetween: (min: string, max: string) => boolean
  } {
    // In a real implementation, this would use window size and media queries
    // For now, return mock data
    return {
      current: 'md',
      isAbove: (breakpoint: string) => {
        const bp = breakpointManager.getBreakpoint(breakpoint)
        return bp ? (bp.min || 0) < 768 : false
      },
      isBelow: (breakpoint: string) => {
        const bp = breakpointManager.getBreakpoint(breakpoint)
        return bp ? (bp.min || 0) > 768 : false
      },
      isBetween: (min: string, max: string) => {
        const minBp = breakpointManager.getBreakpoint(min)
        const maxBp = breakpointManager.getBreakpoint(max)
        return minBp && maxBp ? 
          (minBp.min || 0) <= 768 && 768 <= (maxBp.max || maxBp.min || Infinity) : 
          false
      }
    }
  }

  return {
    useResponsiveValue,
    useResponsiveStyles,
    useBreakpoint,
    generator,
    breakpointManager
  }
}

/**
 * CSS-in-JS Media Query Utilities
 */
export class MediaQueryBuilder {
  private breakpointManager: BreakpointManager

  constructor(breakpoints?: Record<string, Breakpoint>) {
    this.breakpointManager = new BreakpointManager(breakpoints)
  }

  up(breakpoint: string): string {
    const bp = this.breakpointManager.getBreakpoint(breakpoint)
    return bp ? `@media (min-width: ${bp.min}${bp.unit})` : ''
  }

  down(breakpoint: string): string {
    const bp = this.breakpointManager.getBreakpoint(breakpoint)
    return bp ? `@media (max-width: ${(bp.min || 0) - 1}${bp.unit})` : ''
  }

  between(min: string, max: string): string {
    const minBp = this.breakpointManager.getBreakpoint(min)
    const maxBp = this.breakpointManager.getBreakpoint(max)
    
    if (!minBp || !maxBp) return ''
    
    return `@media (min-width: ${minBp.min}${minBp.unit}) and (max-width: ${(maxBp.min || 0) - 1}${maxBp.unit})`
  }

  only(breakpoint: string): string {
    const sortedBreakpoints = this.breakpointManager.sortBreakpoints()
    const currentIndex = sortedBreakpoints.findIndex(([name]) => name === breakpoint)
    
    if (currentIndex === -1) return ''
    
    const current = sortedBreakpoints[currentIndex][1]
    const next = sortedBreakpoints[currentIndex + 1]?.[1]
    
    if (next) {
      return `@media (min-width: ${current.min}${current.unit}) and (max-width: ${(next.min || 0) - 1}${next.unit})`
    } else {
      return `@media (min-width: ${current.min}${current.unit})`
    }
  }

  custom(query: string): string {
    return `@media ${query}`
  }
}

/**
 * Responsive Design System
 */
export class ResponsiveDesignSystem {
  public breakpoints: BreakpointManager
  public generator: ResponsiveStyleGenerator
  public mediaQuery: MediaQueryBuilder
  
  constructor(theme: Theme, breakpoints?: Record<string, Breakpoint>) {
    this.breakpoints = new BreakpointManager(breakpoints)
    this.generator = new ResponsiveStyleGenerator(theme, breakpoints)
    this.mediaQuery = new MediaQueryBuilder(breakpoints)
  }

  /**
   * Create responsive spacing helper
   */
  spacing(responsiveValue: ResponsiveValue<keyof Theme['spacing']>): ResponsiveValue<string> {
    const converted: ResponsiveValue<string> = {}
    
    Object.entries(responsiveValue).forEach(([key, value]) => {
      if (value !== undefined) {
        converted[key] = this.generator['theme'].spacing[value] || value as string
      }
    })
    
    return converted
  }

  /**
   * Create responsive font size helper
   */
  fontSize(responsiveValue: ResponsiveValue<keyof Theme['typography']['fontSize']>): ResponsiveValue<string> {
    const converted: ResponsiveValue<string> = {}
    
    Object.entries(responsiveValue).forEach(([key, value]) => {
      if (value !== undefined) {
        converted[key] = this.generator['theme'].typography.fontSize[value] || value as string
      }
    })
    
    return converted
  }

  /**
   * Create responsive grid helper
   */
  grid(columns: ResponsiveValue<number>): {
    base: React.CSSProperties
    responsive: MediaQueryRule[]
  } {
    return this.generator.generateResponsiveStyleObject({
      display: { base: 'grid' },
      gridTemplateColumns: Object.fromEntries(
        Object.entries(columns).map(([key, value]) => [
          key,
          value ? `repeat(${value}, 1fr)` : undefined
        ])
      ) as ResponsiveValue<string>
    })
  }

  /**
   * Create responsive flex helper
   */
  flex(options: {
    direction?: ResponsiveValue<React.CSSProperties['flexDirection']>
    wrap?: ResponsiveValue<React.CSSProperties['flexWrap']>
    justify?: ResponsiveValue<React.CSSProperties['justifyContent']>
    align?: ResponsiveValue<React.CSSProperties['alignItems']>
    gap?: ResponsiveValue<keyof Theme['spacing']>
  }): {
    base: React.CSSProperties
    responsive: MediaQueryRule[]
  } {
    const responsiveStyles: Record<string, ResponsiveValue<any>> = {
      display: { base: 'flex' }
    }

    if (options.direction) {
      responsiveStyles.flexDirection = options.direction
    }
    
    if (options.wrap) {
      responsiveStyles.flexWrap = options.wrap
    }
    
    if (options.justify) {
      responsiveStyles.justifyContent = options.justify
    }
    
    if (options.align) {
      responsiveStyles.alignItems = options.align
    }
    
    if (options.gap) {
      responsiveStyles.gap = this.spacing(options.gap)
    }

    return this.generator.generateResponsiveStyleObject(responsiveStyles)
  }
}
