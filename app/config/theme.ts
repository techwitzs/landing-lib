/**
 * App-Level Theme Overrides
 * 
 * This file allows you to override any theme values from lib/styles/config.ts
 * without modifying the core design system.
 * 
 * Usage:
 * - Override colors, spacing, typography, etc.
 * - Values here will take precedence over lib defaults
 * - Use OKLCH color format for best results
 */

export const appThemeOverrides = {
  colors: {
    // Example: Override primary color from blue to green
    primary: 'oklch(0.5 0.2 120)',
    
    // Example: Override accent color 
    accent: 'oklch(0.6 0.25 60)',
    
    // Example: Override secondary color
    secondary: 'oklch(0.8 0.1 150)',
    
    // You can override any color from lib/styles/config.ts:
    // - primary, accent, secondary
    // - background, foreground
    // - muted, mutedForeground
    // - card, cardForeground
    // - popover, popoverForeground
    // - border, input, ring
    // - destructive, destructiveForeground
  },
  
  // You can also override other theme properties:
  // spacing: {
  //   xs: '0.25rem',
  //   sm: '0.5rem',
  //   // ... other spacing overrides
  // },
  
  // typography: {
  //   fontSize: {
  //     xs: '0.75rem',
  //     sm: '0.875rem',
  //     // ... other font size overrides
  //   }
  // },
  
  // borders: {
  //   radius: {
  //     sm: '0.25rem',
  //     md: '0.375rem',
  //     // ... other border radius overrides
  //   }
  // }
}

// Export type for TypeScript support
export type AppThemeOverrides = typeof appThemeOverrides
