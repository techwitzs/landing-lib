/**
 * App Theme Manager
 * 
 * This utility merges the base design system theme with app-level overrides.
 * It provides a clean interface for the app to get a customized theme.
 */

import { getTheme } from "../../lib/styles/theme"
import { appThemeOverrides } from "../config/theme"

/**
 * Deep merge utility for theme objects
 */
function deepMerge(target: any, source: any): any {
  const result = { ...target }
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }
  
  return result
}

/**
 * Get the app theme with overrides applied
 * 
 * @param mode - Theme mode ('light' | 'dark')
 * @returns Merged theme object with app overrides
 */
export function getAppTheme(mode: 'light' | 'dark' = 'light') {
  // Get base theme from lib
  const baseTheme = getTheme(mode)
  
  // Merge with app overrides
  const mergedTheme = deepMerge(baseTheme, appThemeOverrides)
  
  return mergedTheme
}

/**
 * Utility to check if app has any theme overrides
 */
export function hasThemeOverrides(): boolean {
  return Object.keys(appThemeOverrides).length > 0 && 
         Object.values(appThemeOverrides).some(value => 
           value && typeof value === 'object' && Object.keys(value).length > 0
         )
}

/**
 * Get only the overridden properties for debugging
 */
export function getThemeOverrides() {
  return appThemeOverrides
}
