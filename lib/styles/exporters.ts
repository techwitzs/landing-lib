/**
 * Framework-Agnostic Style Exporters
 * 
 * Export config-driven styles to different frameworks and platforms
 */

import { Theme } from './theme'
import { DesignTokens } from './config'

export interface StyleExportOptions {
  format: 'css' | 'scss' | 'styled-components' | 'emotion' | 'vanilla-extract' | 'tailwind' | 'js-object'
  theme: Theme
  prefix?: string
  minify?: boolean
  includeMediaQueries?: boolean
}

export interface CSSVariable {
  name: string
  value: string
  fallback?: string
}

export interface MediaQuery {
  breakpoint: string
  styles: Record<string, any>
}

/**
 * Base Style Exporter Class
 */
export abstract class StyleExporter {
  protected theme: Theme
  protected options: StyleExportOptions

  constructor(options: StyleExportOptions) {
    this.theme = options.theme
    this.options = options
  }

  abstract export(): string
  
  protected generatePrefix(name: string): string {
    return this.options.prefix ? `${this.options.prefix}-${name}` : name
  }
  
  protected minifyCSS(css: string): string {
    if (!this.options.minify) return css
    
    return css
      .replace(/\s+/g, ' ')
      .replace(/;\s*}/g, '}')
      .replace(/{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .trim()
  }
}

/**
 * CSS Variables Exporter
 */
export class CSSVariablesExporter extends StyleExporter {
  export(): string {
    const variables = this.generateCSSVariables()
    const css = this.generateCSSFromVariables(variables)
    return this.minifyCSS(css)
  }

  private generateCSSVariables(): CSSVariable[] {
    const variables: CSSVariable[] = []
    
    // Colors
    Object.entries(this.theme.colors).forEach(([key, value]) => {
      variables.push({
        name: this.generatePrefix(`color-${key}`),
        value: value
      })
    })
    
    // Spacing
    Object.entries(this.theme.spacing).forEach(([key, value]) => {
      variables.push({
        name: this.generatePrefix(`spacing-${key}`),
        value: value
      })
    })
    
    // Typography
    Object.entries(this.theme.typography.fontSize).forEach(([key, value]) => {
      variables.push({
        name: this.generatePrefix(`font-size-${key}`),
        value: value
      })
    })
    
    Object.entries(this.theme.typography.fontWeight).forEach(([key, value]) => {
      variables.push({
        name: this.generatePrefix(`font-weight-${key}`),
        value: value.toString()
      })
    })
    
    // Borders
    Object.entries(this.theme.borders.radius).forEach(([key, value]) => {
      variables.push({
        name: this.generatePrefix(`border-radius-${key}`),
        value: value
      })
    })
    
    // Shadows
    Object.entries(this.theme.shadows).forEach(([key, value]) => {
      variables.push({
        name: this.generatePrefix(`shadow-${key}`),
        value: value
      })
    })
    
    return variables
  }

  private generateCSSFromVariables(variables: CSSVariable[]): string {
    const variableDeclarations = variables
      .map(v => `  --${v.name}: ${v.value};`)
      .join('\n')
    
    return `:root {\n${variableDeclarations}\n}`
  }
}

/**
 * Styled Components Exporter
 */
export class StyledComponentsExporter extends StyleExporter {
  export(): string {
    const themeObject = this.generateThemeObject()
    return this.generateStyledComponentsTheme(themeObject)
  }

  private generateThemeObject(): string {
    return `export const theme = ${JSON.stringify(this.theme, null, 2)};`
  }

  private generateStyledComponentsTheme(themeObject: string): string {
    return `
import styled, { ThemeProvider } from 'styled-components';

${themeObject}

// Usage with styled-components
export const Button = styled.button\`
  background-color: \${props => props.theme.colors.primary};
  color: \${props => props.theme.colors.background};
  padding: \${props => props.theme.spacing.md} \${props => props.theme.spacing.lg};
  border-radius: \${props => props.theme.borders.radius.md};
  font-size: \${props => props.theme.typography.fontSize.base};
  font-weight: \${props => props.theme.typography.fontWeight.medium};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    opacity: 0.9;
  }
\`;

// Theme Provider wrapper
export const ConfigThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);
`
  }
}

/**
 * Tailwind CSS Exporter
 */
export class TailwindExporter extends StyleExporter {
  export(): string {
    const config = this.generateTailwindConfig()
    return this.formatTailwindConfig(config)
  }

  private generateTailwindConfig(): any {
    return {
      theme: {
        extend: {
          colors: this.convertColorsToTailwind(),
          spacing: this.convertSpacingToTailwind(),
          fontSize: this.theme.typography.fontSize,
          fontWeight: this.theme.typography.fontWeight,
          borderRadius: this.theme.borders.radius,
          boxShadow: this.theme.shadows,
        }
      }
    }
  }

  private convertColorsToTailwind(): Record<string, string> {
    const colors: Record<string, string> = {}
    
    Object.entries(this.theme.colors).forEach(([key, value]) => {
      // Convert kebab-case to Tailwind naming
      const tailwindKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      colors[tailwindKey] = value
    })
    
    return colors
  }

  private convertSpacingToTailwind(): Record<string, string> {
    const spacing: Record<string, string> = {}
    
    Object.entries(this.theme.spacing).forEach(([key, value]) => {
      spacing[key] = value
    })
    
    return spacing
  }

  private formatTailwindConfig(config: any): string {
    return `
/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(config, null, 2)};

// Usage in your components:
// className="bg-primary text-background p-md rounded-md text-base font-medium"
`
  }
}

/**
 * Vanilla Extract Exporter
 */
export class VanillaExtractExporter extends StyleExporter {
  export(): string {
    const contract = this.generateContract()
    const styles = this.generateStyles()
    
    return `${contract}\n\n${styles}`
  }

  private generateContract(): string {
    const contract = {
      colors: Object.keys(this.theme.colors).reduce((acc, key) => {
        acc[key] = null
        return acc
      }, {} as Record<string, null>),
      spacing: Object.keys(this.theme.spacing).reduce((acc, key) => {
        acc[key] = null
        return acc
      }, {} as Record<string, null>),
      typography: {
        fontSize: Object.keys(this.theme.typography.fontSize).reduce((acc, key) => {
          acc[key] = null
          return acc
        }, {} as Record<string, null>),
        fontWeight: Object.keys(this.theme.typography.fontWeight).reduce((acc, key) => {
          acc[key] = null
          return acc
        }, {} as Record<string, null>)
      }
    }

    return `import { createThemeContract } from '@vanilla-extract/css';

export const themeContract = createThemeContract(${JSON.stringify(contract, null, 2)});`
  }

  private generateStyles(): string {
    return `import { createTheme } from '@vanilla-extract/css';
import { themeContract } from './theme.contract';

export const lightTheme = createTheme(themeContract, ${JSON.stringify(this.theme, null, 2)});

// Usage in your components:
// import { lightTheme } from './theme.css';
// className={lightTheme}
`
  }
}

/**
 * JavaScript Object Exporter
 */
export class JSObjectExporter extends StyleExporter {
  export(): string {
    const themeModule = this.generateThemeModule()
    const utilityFunctions = this.generateUtilityFunctions()
    
    return `${themeModule}\n\n${utilityFunctions}`
  }

  private generateThemeModule(): string {
    return `// Generated theme object for any JavaScript framework
export const configTheme = ${JSON.stringify(this.theme, null, 2)};

// Type definitions (if using TypeScript)
export interface ConfigTheme {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: {
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
  };
  borders: {
    radius: Record<string, string>;
  };
  shadows: Record<string, string>;
}`
  }

  private generateUtilityFunctions(): string {
    return `// Utility functions for easy style generation
export const createButtonStyles = (variant = 'primary') => ({
  backgroundColor: configTheme.colors[variant] || configTheme.colors.primary,
  color: configTheme.colors.background,
  padding: \`\${configTheme.spacing.md} \${configTheme.spacing.lg}\`,
  borderRadius: configTheme.borders.radius.md,
  fontSize: configTheme.typography.fontSize.base,
  fontWeight: configTheme.typography.fontWeight.medium,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out'
});

export const createCardStyles = () => ({
  backgroundColor: configTheme.colors.background,
  border: \`1px solid \${configTheme.colors.border}\`,
  borderRadius: configTheme.borders.radius.lg,
  padding: configTheme.spacing.xl,
  boxShadow: configTheme.shadows.sm
});

export const createContainerStyles = () => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: \`0 \${configTheme.spacing.lg}\`
});`
  }
}

/**
 * Export Factory
 */
export class StyleExportFactory {
  static create(options: StyleExportOptions): StyleExporter {
    switch (options.format) {
      case 'css':
      case 'scss':
        return new CSSVariablesExporter(options)
      case 'styled-components':
        return new StyledComponentsExporter(options)
      case 'tailwind':
        return new TailwindExporter(options)
      case 'vanilla-extract':
        return new VanillaExtractExporter(options)
      case 'js-object':
        return new JSObjectExporter(options)
      default:
        throw new Error(`Unsupported export format: ${options.format}`)
    }
  }

  static exportAll(theme: Theme, prefix?: string): Record<string, string> {
    const formats: StyleExportOptions['format'][] = [
      'css', 'styled-components', 'tailwind', 'vanilla-extract', 'js-object'
    ]
    
    const exports: Record<string, string> = {}
    
    formats.forEach(format => {
      const exporter = this.create({
        format,
        theme,
        prefix,
        minify: true,
        includeMediaQueries: true
      })
      
      exports[format] = exporter.export()
    })
    
    return exports
  }
}

/**
 * CLI Export Utility
 */
export interface ExportConfig {
  outputDir: string
  formats: StyleExportOptions['format'][]
  theme: Theme
  prefix?: string
  minify?: boolean
}

export function exportStyles(config: ExportConfig): void {
  config.formats.forEach(format => {
    const exporter = StyleExportFactory.create({
      format,
      theme: config.theme,
      prefix: config.prefix,
      minify: config.minify
    })
    
    const output = exporter.export()
    const filename = `theme.${format === 'js-object' ? 'js' : format.replace('-', '.')}`
    
    console.log(`Exporting ${format} to ${config.outputDir}/${filename}`)
    // In a real implementation, you would write to file system here
    // fs.writeFileSync(path.join(config.outputDir, filename), output)
  })
}
