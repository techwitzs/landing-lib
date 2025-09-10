# Theme Customization Guide

## Overview

The theme override system allows you to customize the design system at the **app level** without modifying the core **lib** files. This maintains clean separation between your app customizations and the reusable design system.

## Architecture

```
lib/styles/config.ts          # Core design system (DON'T EDIT)
      ↓
app/lib/theme.ts             # Theme merger utility
      ↓
app/config/theme.ts          # Your app overrides (EDIT THIS)
      ↓
app/page.tsx                 # Uses merged theme
```

## How to Customize Colors

### 1. Edit `app/config/theme.ts`

```typescript
export const appThemeOverrides = {
  colors: {
    // Change primary color to green
    primary: 'oklch(0.5 0.2 120)',
    
    // Change accent color to orange  
    accent: 'oklch(0.6 0.25 60)',
    
    // Change secondary color to purple
    secondary: 'oklch(0.8 0.1 280)',
  }
}
```

### 2. Available Color Properties

You can override any of these colors:

- `primary` - Main brand color (buttons, links, badges)
- `accent` - Secondary brand color  
- `secondary` - Tertiary color
- `background` - Page background
- `foreground` - Main text color
- `muted` - Subtle background color
- `mutedForeground` - Subtle text color
- `card` - Card background
- `cardForeground` - Card text color
- `popover` - Popover background
- `popoverForeground` - Popover text color
- `border` - Border color
- `input` - Input field border
- `ring` - Focus ring color
- `destructive` - Error/danger color
- `destructiveForeground` - Error text color

### 3. Color Format

Use **OKLCH** format for best results:
```typescript
'oklch(lightness chroma hue)'

// Examples:
'oklch(0.5 0.2 120)'   // Green
'oklch(0.6 0.25 60)'   // Orange  
'oklch(0.4 0.3 240)'   // Blue
'oklch(0.7 0.15 300)'  // Purple
```

**OKLCH Parameters:**
- **Lightness**: 0-1 (0=black, 1=white)
- **Chroma**: 0-0.4 (0=gray, 0.4=vibrant)
- **Hue**: 0-360 (0=red, 120=green, 240=blue)

## How to Customize Other Properties

### Spacing

```typescript
export const appThemeOverrides = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  }
}
```

### Typography

```typescript
export const appThemeOverrides = {
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  }
}
```

### Border Radius

```typescript
export const appThemeOverrides = {
  borders: {
    radius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    }
  }
}
```

## Testing Changes

1. **Save** your changes to `app/config/theme.ts`
2. **Refresh** the browser to see changes
3. **Check** that colors/spacing look correct
4. **Commit** when satisfied with the design

## Common Use Cases

### Brand Colors
```typescript
// Company with green/blue brand
export const appThemeOverrides = {
  colors: {
    primary: 'oklch(0.45 0.25 150)',   // Forest green
    accent: 'oklch(0.55 0.2 200)',     // Teal blue
    secondary: 'oklch(0.75 0.1 180)',  // Light cyan
  }
}
```

### Dark Theme Preparation
```typescript
// Colors that work well in both light/dark
export const appThemeOverrides = {
  colors: {
    primary: 'oklch(0.6 0.25 240)',    // Blue (works in both)
    accent: 'oklch(0.65 0.2 60)',      // Orange (works in both)
  }
}
```

### Minimal/Clean Look
```typescript
// Subtle, professional colors
export const appThemeOverrides = {
  colors: {
    primary: 'oklch(0.35 0.15 220)',   // Dark blue
    accent: 'oklch(0.5 0.1 220)',      // Medium blue
    secondary: 'oklch(0.85 0.05 220)', // Light blue
  }
}
```

## Best Practices

1. **Start Small** - Override 1-2 colors first
2. **Test Contrast** - Ensure text is readable
3. **Check All Components** - Test buttons, cards, etc.
4. **Document Changes** - Note why you picked specific colors
5. **Version Control** - Commit theme changes separately

## Troubleshooting

### Colors Not Showing
- Check syntax in `app/config/theme.ts`
- Verify OKLCH format is correct
- Refresh browser hard (Cmd+Shift+R)

### TypeScript Errors
- Ensure proper export structure
- Check for typos in property names
- Restart TypeScript server if needed

## Files You Should Edit

✅ **Edit These:**
- `app/config/theme.ts` - Your theme overrides
- `app/config/*.ts` - Content configuration

❌ **Don't Edit These:**
- `lib/styles/config.ts` - Core design system
- `lib/styles/theme.ts` - Theme utilities
- `lib/shared/components/**` - Reusable components
