import React from "react"
import { useStyles } from "../../../../hooks/useStyles"

export interface SocialProofConfig {
  trustText: string
  companies: string[]
}

export interface SocialProofProps {
  config: SocialProofConfig
}

export function SocialProof({ config }: SocialProofProps) {
  const { theme, section, container, text } = useStyles()
  
  // Social proof section styles
  const sectionStyles: React.CSSProperties = {
    ...section(),
    paddingTop: theme.spacing['4xl'],
    paddingBottom: theme.spacing['4xl'],
    backgroundColor: theme.colors.background,
  }
  
  // Container styles
  const containerStyles: React.CSSProperties = {
    ...container(),
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.lg}`,
  }
  
  // Content wrapper styles
  const contentWrapperStyles: React.CSSProperties = {
    textAlign: 'center' as const,
    marginBottom: theme.spacing['3xl'],
  }
  
  // Trust text styles
  const trustTextStyles: React.CSSProperties = {
    ...text('small'),
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.muted,
    marginBottom: theme.spacing['2xl'],
  }
  
  // Companies container styles
  const companiesContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: `${theme.spacing['2xl']} ${theme.spacing['3xl']}`,
    opacity: 0.6,
  }
  
  // Company name styles
  const companyStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.muted,
  }

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <div style={contentWrapperStyles}>
          <p style={trustTextStyles}>{config.trustText}</p>
          <div style={companiesContainerStyles}>
            {config.companies.map((company) => (
              <div key={company} style={companyStyles}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
