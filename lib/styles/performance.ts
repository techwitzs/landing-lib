/**
 * Performance Optimizations
 * 
 * Style memoization, lazy loading, and performance monitoring
 */

import { Theme } from './theme'
import { ResponsiveValue } from './responsive'

export interface PerformanceMetrics {
  styleGenerationTime: number
  cacheHitRate: number
  memoryUsage: number
  renderCount: number
  lastUpdated: number
}

export interface CacheEntry<T> {
  value: T
  timestamp: number
  accessCount: number
  lastAccessed: number
}

export interface StyleCacheConfig {
  maxSize: number
  ttl: number // time to live in milliseconds
  enableMetrics: boolean
}

/**
 * Style Cache Implementation
 */
export class StyleCache<T = any> {
  private cache = new Map<string, CacheEntry<T>>()
  private config: StyleCacheConfig
  private metrics: PerformanceMetrics

  constructor(config: Partial<StyleCacheConfig> = {}) {
    this.config = {
      maxSize: config.maxSize || 1000,
      ttl: config.ttl || 5 * 60 * 1000, // 5 minutes
      enableMetrics: config.enableMetrics ?? true
    }

    this.metrics = {
      styleGenerationTime: 0,
      cacheHitRate: 0,
      memoryUsage: 0,
      renderCount: 0,
      lastUpdated: Date.now()
    }
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key)
    
    if (!entry) {
      this.updateMetrics('miss')
      return undefined
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.config.ttl) {
      this.cache.delete(key)
      this.updateMetrics('miss')
      return undefined
    }

    // Update access information
    entry.accessCount++
    entry.lastAccessed = Date.now()
    
    this.updateMetrics('hit')
    return entry.value
  }

  set(key: string, value: T): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.config.maxSize) {
      this.evictOldest()
    }

    const now = Date.now()
    this.cache.set(key, {
      value,
      timestamp: now,
      accessCount: 0,
      lastAccessed: now
    })
  }

  clear(): void {
    this.cache.clear()
    this.resetMetrics()
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  private evictOldest(): void {
    let oldestKey = ''
    let oldestTime = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  private updateMetrics(type: 'hit' | 'miss'): void {
    if (!this.config.enableMetrics) return

    this.metrics.renderCount++
    
    const totalRequests = this.metrics.renderCount
    const hits = type === 'hit' ? 1 : 0
    const currentHitRate = this.metrics.cacheHitRate * (totalRequests - 1) / totalRequests
    
    this.metrics.cacheHitRate = currentHitRate + (hits / totalRequests)
    this.metrics.memoryUsage = this.cache.size
    this.metrics.lastUpdated = Date.now()
  }

  private resetMetrics(): void {
    this.metrics = {
      styleGenerationTime: 0,
      cacheHitRate: 0,
      memoryUsage: 0,
      renderCount: 0,
      lastUpdated: Date.now()
    }
  }
}

/**
 * Memoized Style Generator
 */
export class MemoizedStyleGenerator {
  private cache: StyleCache<React.CSSProperties>
  private theme: Theme

  constructor(theme: Theme, cacheConfig?: Partial<StyleCacheConfig>) {
    this.theme = theme
    this.cache = new StyleCache(cacheConfig)
  }

  /**
   * Generate and cache component styles
   */
  generateComponentStyles(
    component: string,
    variant: string,
    props: Record<string, any> = {}
  ): React.CSSProperties {
    const cacheKey = this.generateCacheKey(component, variant, props)
    
    let styles = this.cache.get(cacheKey)
    if (styles) {
      return styles
    }

    const startTime = performance.now()
    styles = this.computeStyles(component, variant, props)
    const endTime = performance.now()

    // Update performance metrics
    const metrics = this.cache.getMetrics()
    metrics.styleGenerationTime += endTime - startTime

    this.cache.set(cacheKey, styles)
    return styles
  }

  /**
   * Generate and cache responsive styles
   */
  generateResponsiveStyles(
    responsiveValue: ResponsiveValue<any>,
    property: keyof React.CSSProperties
  ): React.CSSProperties {
    const cacheKey = this.generateResponsiveCacheKey(responsiveValue, property)
    
    let styles = this.cache.get(cacheKey)
    if (styles) {
      return styles
    }

    const startTime = performance.now()
    styles = this.computeResponsiveStyles(responsiveValue, property)
    const endTime = performance.now()

    // Update performance metrics
    const metrics = this.cache.getMetrics()
    metrics.styleGenerationTime += endTime - startTime

    this.cache.set(cacheKey, styles)
    return styles
  }

  /**
   * Preload commonly used styles
   */
  preloadStyles(components: Array<{ component: string; variant: string; props?: Record<string, any> }>): void {
    components.forEach(({ component, variant, props }) => {
      this.generateComponentStyles(component, variant, props)
    })
  }

  /**
   * Clear cache and reset metrics
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Get performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return this.cache.getMetrics()
  }

  private generateCacheKey(component: string, variant: string, props: Record<string, any>): string {
    const propsKey = Object.keys(props)
      .sort()
      .map(key => `${key}:${props[key]}`)
      .join(',')
    
    return `${component}:${variant}:${propsKey}`
  }

  private generateResponsiveCacheKey(responsiveValue: ResponsiveValue<any>, property: keyof React.CSSProperties): string {
    const valueKey = Object.keys(responsiveValue)
      .sort()
      .map(key => `${key}:${responsiveValue[key]}`)
      .join(',')
    
    return `responsive:${property as string}:${valueKey}`
  }

  private computeStyles(component: string, variant: string, props: Record<string, any>): React.CSSProperties {
    // This would integrate with your existing style generators
    // For now, return a basic style object
    const baseStyles: React.CSSProperties = {
      boxSizing: 'border-box'
    }

    switch (component) {
      case 'button':
        return {
          ...baseStyles,
          backgroundColor: variant === 'primary' ? this.theme.colors.primary : this.theme.colors.secondary,
          color: this.theme.colors.background,
          padding: `${this.theme.spacing.md} ${this.theme.spacing.lg}`,
          borderRadius: this.theme.borders.radius.md,
          fontSize: this.theme.typography.fontSize.base,
          fontWeight: this.theme.typography.fontWeight.medium,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          ...props.style
        }
      
      case 'card':
        return {
          ...baseStyles,
          backgroundColor: this.theme.colors.background,
          border: `1px solid ${this.theme.colors.border}`,
          borderRadius: this.theme.borders.radius.lg,
          padding: this.theme.spacing.xl,
          boxShadow: this.theme.shadows.sm,
          ...props.style
        }
      
      default:
        return baseStyles
    }
  }

  private computeResponsiveStyles(responsiveValue: ResponsiveValue<any>, property: keyof React.CSSProperties): React.CSSProperties {
    // Simple implementation - in practice, this would use your responsive system
    const value = responsiveValue.base || responsiveValue.sm || responsiveValue.md || responsiveValue.lg
    return value ? { [property]: value } : {}
  }
}

/**
 * Lazy Style Loader
 */
export class LazyStyleLoader {
  private loadedChunks = new Set<string>()
  private loadingPromises = new Map<string, Promise<void>>()

  /**
   * Lazy load component styles
   */
  async loadComponentStyles(component: string): Promise<void> {
    if (this.loadedChunks.has(component)) {
      return Promise.resolve()
    }

    if (this.loadingPromises.has(component)) {
      return this.loadingPromises.get(component)!
    }

    const loadPromise = this.performLoad(component)
    this.loadingPromises.set(component, loadPromise)

    try {
      await loadPromise
      this.loadedChunks.add(component)
    } finally {
      this.loadingPromises.delete(component)
    }
  }

  /**
   * Preload critical component styles
   */
  preloadCritical(components: string[]): Promise<void[]> {
    return Promise.all(components.map(component => this.loadComponentStyles(component)))
  }

  /**
   * Check if component styles are loaded
   */
  isLoaded(component: string): boolean {
    return this.loadedChunks.has(component)
  }

  private async performLoad(component: string): Promise<void> {
    // Simulate async loading - in practice, this would load actual style chunks
    await new Promise(resolve => setTimeout(resolve, 10))
    
    // Here you would inject styles into the document or register them with your system
    console.log(`Loaded styles for component: ${component}`)
  }
}

/**
 * Performance Monitor
 */
export class PerformanceMonitor {
  private observers: Array<(metrics: PerformanceMetrics) => void> = []
  private intervalId?: number

  /**
   * Start monitoring performance
   */
  start(interval: number = 5000): void {
    this.intervalId = setInterval(() => {
      this.collectMetrics()
    }, interval)
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }

  /**
   * Subscribe to performance metrics updates
   */
  subscribe(callback: (metrics: PerformanceMetrics) => void): () => void {
    this.observers.push(callback)
    
    return () => {
      const index = this.observers.indexOf(callback)
      if (index > -1) {
        this.observers.splice(index, 1)
      }
    }
  }

  /**
   * Collect and broadcast current metrics
   */
  private collectMetrics(): void {
    const metrics: PerformanceMetrics = {
      styleGenerationTime: this.getStyleGenerationTime(),
      cacheHitRate: this.getCacheHitRate(),
      memoryUsage: this.getMemoryUsage(),
      renderCount: this.getRenderCount(),
      lastUpdated: Date.now()
    }

    this.observers.forEach(observer => observer(metrics))
  }

  private getStyleGenerationTime(): number {
    // Get average style generation time from performance API
    const entries = performance.getEntriesByType('measure')
    const styleEntries = entries.filter(entry => entry.name.includes('style-generation'))
    
    if (styleEntries.length === 0) return 0
    
    const totalTime = styleEntries.reduce((sum, entry) => sum + entry.duration, 0)
    return totalTime / styleEntries.length
  }

  private getCacheHitRate(): number {
    // This would be provided by your cache implementation
    return 0.85 // Example value
  }

  private getMemoryUsage(): number {
    // Estimate memory usage (in practice, this would be more sophisticated)
    return (performance as any).memory?.usedJSHeapSize || 0
  }

  private getRenderCount(): number {
    // This would track actual render cycles
    return Math.floor(Date.now() / 1000) // Simplified example
  }
}

/**
 * Performance-Optimized Hook Factory
 */
export function createPerformanceHooks(theme: Theme) {
  const styleGenerator = new MemoizedStyleGenerator(theme)
  const lazyLoader = new LazyStyleLoader()
  const monitor = new PerformanceMonitor()

  function useOptimizedStyles(
    component: string,
    variant: string,
    props: Record<string, any> = {}
  ): React.CSSProperties {
    // This would use React.useMemo in a real implementation
    return styleGenerator.generateComponentStyles(component, variant, props)
  }

  function useLazyStyles(component: string): {
    isLoaded: boolean
    load: () => Promise<void>
  } {
    const isLoaded = lazyLoader.isLoaded(component)
    const load = () => lazyLoader.loadComponentStyles(component)

    return { isLoaded, load }
  }

  function usePerformanceMetrics(): PerformanceMetrics | null {
    // This would use React.useState and useEffect in a real implementation
    return monitor['collectMetrics'] ? {
      styleGenerationTime: 2.5,
      cacheHitRate: 0.85,
      memoryUsage: 1024 * 1024 * 10, // 10MB
      renderCount: 150,
      lastUpdated: Date.now()
    } : null
  }

  return {
    useOptimizedStyles,
    useLazyStyles,
    usePerformanceMetrics,
    styleGenerator,
    lazyLoader,
    monitor
  }
}

/**
 * Bundle Size Optimizer
 */
export class BundleSizeOptimizer {
  private usageTracking = new Map<string, number>()

  /**
   * Track component usage for tree shaking optimization
   */
  trackUsage(component: string): void {
    const current = this.usageTracking.get(component) || 0
    this.usageTracking.set(component, current + 1)
  }

  /**
   * Get usage statistics
   */
  getUsageStats(): Record<string, number> {
    return Object.fromEntries(this.usageTracking.entries())
  }

  /**
   * Get recommendations for bundle optimization
   */
  getOptimizationRecommendations(): {
    unused: string[]
    frequentlyUsed: string[]
    candidates: string[]
  } {
    const stats = this.getUsageStats()
    const unused: string[] = []
    const frequentlyUsed: string[] = []
    const candidates: string[] = []

    Object.entries(stats).forEach(([component, count]) => {
      if (count === 0) {
        unused.push(component)
      } else if (count > 10) {
        frequentlyUsed.push(component)
      } else if (count < 3) {
        candidates.push(component)
      }
    })

    return { unused, frequentlyUsed, candidates }
  }

  /**
   * Generate tree shaking configuration
   */
  generateTreeShakingConfig(): {
    sideEffects: false
    usedExports: string[]
    unusedExports: string[]
  } {
    const stats = this.getUsageStats()
    const usedExports = Object.keys(stats).filter(component => stats[component] > 0)
    const unusedExports = Object.keys(stats).filter(component => stats[component] === 0)

    return {
      sideEffects: false,
      usedExports,
      unusedExports
    }
  }
}
