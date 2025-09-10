import React from "react"
import { useStyles } from "../../../../hooks/useStyles"

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterConfig {
  brand: {
    name: string
    logo?: string
    description: string
  }
  sections: FooterSection[]
  copyright: string
  legalLinks: FooterLink[]
}

export interface FooterProps {
  config: FooterConfig
}

export function Footer({ config }: FooterProps) {
  const { theme, container } = useStyles()
  
  // Footer styles
  const footerStyles: React.CSSProperties = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.background, // primary-foreground equivalent
    paddingTop: theme.spacing['4xl'],
    paddingBottom: theme.spacing['4xl'],
  }
  
  // Container styles
  const containerStyles: React.CSSProperties = {
    ...container(),
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.lg}`,
  }
  
  // Main grid styles
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing['2xl'],
    marginBottom: theme.spacing['2xl'],
  }
  
  // Brand section styles
  const brandSectionStyles: React.CSSProperties = {
    gridColumn: '1 / 2',
  }
  
  // Brand header styles
  const brandHeaderStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  }
  
  // Logo styles
  const logoStyles: React.CSSProperties = {
    height: '32px',
    width: '32px',
    borderRadius: theme.borders.radius.lg,
    backgroundColor: theme.colors.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
  // Logo text styles
  const logoTextStyles: React.CSSProperties = {
    color: theme.colors.background, // accent-foreground
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.lg,
  }
  
  // Brand name styles
  const brandNameStyles: React.CSSProperties = {
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.xl,
  }
  
  // Brand description styles
  const brandDescriptionStyles: React.CSSProperties = {
    color: `oklch(from ${theme.colors.background} l c h / 0.8)`, // primary-foreground/80
    lineHeight: 1.6,
  }
  
  // Section title styles
  const sectionTitleStyles: React.CSSProperties = {
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.lg,
    fontSize: theme.typography.fontSize.base,
  }
  
  // Links list styles
  const linksListStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  }
  
  // Link styles
  const linkStyles: React.CSSProperties = {
    color: `oklch(from ${theme.colors.background} l c h / 0.8)`, // primary-foreground/80
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
    fontSize: theme.typography.fontSize.sm,
  }
  
  // Bottom section styles
  const bottomSectionStyles: React.CSSProperties = {
    borderTop: `1px solid oklch(from ${theme.colors.background} l c h / 0.2)`, // primary-foreground/20
    paddingTop: theme.spacing['2xl'],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
  }
  
  // Copyright styles
  const copyrightStyles: React.CSSProperties = {
    color: `oklch(from ${theme.colors.background} l c h / 0.6)`, // primary-foreground/60
    fontSize: theme.typography.fontSize.sm,
  }
  
  // Legal links container styles
  const legalLinksStyles: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing.xl,
  }
  
  // Legal link styles
  const legalLinkStyles: React.CSSProperties = {
    color: `oklch(from ${theme.colors.background} l c h / 0.6)`, // primary-foreground/60
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.sm,
    transition: 'color 0.2s ease-in-out',
  }

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <div style={gridStyles}>
          <div style={brandSectionStyles}>
            <div style={brandHeaderStyles}>
              <div style={logoStyles}>
                <span style={logoTextStyles}>
                  {config.brand.logo || config.brand.name.charAt(0)}
                </span>
              </div>
              <span style={brandNameStyles}>{config.brand.name}</span>
            </div>
            <p style={brandDescriptionStyles}>
              {config.brand.description}
            </p>
          </div>

          {config.sections.map((section, index) => (
            <div key={index}>
              <h3 style={sectionTitleStyles}>{section.title}</h3>
              <ul style={linksListStyles}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} style={linkStyles}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={bottomSectionStyles}>
          <p style={copyrightStyles}>{config.copyright}</p>
          <div style={legalLinksStyles}>
            {config.legalLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                style={legalLinkStyles}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
