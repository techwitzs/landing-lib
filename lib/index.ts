/**
 * Advanced Design System Library
 * 
 * Framework-agnostic, config-driven styling system with advanced features
 */

// Core styling system
export * from './styles/config'
export * from './styles/theme'
export * from './styles/generators'

// Advanced features
export * from './styles/exporters'
export * from './styles/responsive'
export * from './styles/animations'
export * from './styles/performance'
export * from './styles/developer-tools'

// Hooks
export * from './hooks/useStyles'

// Advanced system factories
export { StyleExportFactory } from './styles/exporters'
export { createResponsiveHooks } from './styles/responsive'
export { createAnimationHooks } from './styles/animations'
export { createPerformanceHooks } from './styles/performance'
export { createDeveloperHooks } from './styles/developer-tools'

// Main theme manager
export { ThemeManager } from './styles/theme'

// Utility classes
export { 
  ResponsiveDesignSystem,
  BreakpointManager,
  ResponsiveStyleGenerator,
  MediaQueryBuilder 
} from './styles/responsive'

export {
  MotionSystem,
  AnimationBuilder,
  TransitionBuilder,
  KeyframeGenerator
} from './styles/animations'

export {
  MemoizedStyleGenerator,
  LazyStyleLoader,
  PerformanceMonitor,
  StyleCache,
  BundleSizeOptimizer
} from './styles/performance'

export {
  DeveloperTools,
  ThemeValidator,
  StyleInspector,
  DebugConsole
} from './styles/developer-tools'
