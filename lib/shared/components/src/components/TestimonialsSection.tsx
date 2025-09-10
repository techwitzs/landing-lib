import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/src/components/Card"
import { useStyles } from "../../../../hooks/useStyles"

export interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
}

export interface TestimonialsConfig {
  section: {
    title: string
    description: string
  }
  testimonials: Testimonial[]
}

export interface TestimonialsSectionProps {
  config: TestimonialsConfig
}

export function TestimonialsSection({ config }: TestimonialsSectionProps) {
  const { theme, section, container, heading, text } = useStyles()
  
  // Testimonials section styles
  const sectionStyles: React.CSSProperties = {
    ...section(),
    paddingTop: theme.spacing['5xl'],
    paddingBottom: theme.spacing['5xl'],
    backgroundColor: `oklch(from ${theme.colors.muted} l c h / 0.3)`,
  }
  
  // Container styles
  const containerStyles: React.CSSProperties = {
    ...container(),
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.lg}`,
  }
  
  // Header section styles
  const headerStyles: React.CSSProperties = {
    textAlign: 'center' as const,
    marginBottom: theme.spacing['4xl'],
  }
  
  // Section title styles
  const sectionTitleStyles: React.CSSProperties = {
    ...heading(2),
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    textWrap: 'balance' as any,
    marginBottom: theme.spacing.lg,
  }
  
  // Section description styles
  const sectionDescriptionStyles: React.CSSProperties = {
    ...text('large'),
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.muted,
    textWrap: 'balance' as any,
    maxWidth: '512px', // max-w-2xl
    margin: '0 auto',
  }
  
  // Testimonials grid styles
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing['2xl'],
    maxWidth: '1152px', // max-w-6xl
    margin: '0 auto',
  }
  
  // Testimonial card styles
  const testimonialCardStyles: React.CSSProperties = {
    border: 'none',
    boxShadow: theme.shadows.sm,
  }
  
  // Card content styles
  const cardContentStyles: React.CSSProperties = {
    paddingTop: theme.spacing.xl,
  }
  
  // Quote styles
  const quoteStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    lineHeight: 1.6,
    marginBottom: theme.spacing.xl,
    fontStyle: 'italic',
    color: theme.colors.foreground,
  }
  
  // Author section styles
  const authorSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
  }
  
  // Avatar styles
  const avatarStyles: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  }
  
  // Author info styles
  const authorInfoStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  }
  
  // Author name styles
  const authorNameStyles: React.CSSProperties = {
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.foreground,
  }
  
  // Author role styles
  const authorRoleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
  }

  return (
    <section id="testimonials" style={sectionStyles}>
      <div style={containerStyles}>
        <div style={headerStyles}>
          <h2 style={sectionTitleStyles}>{config.section.title}</h2>
          <p style={sectionDescriptionStyles}>
            {config.section.description}
          </p>
        </div>

        <div style={gridStyles}>
          {config.testimonials.map((testimonial, index) => (
            <Card key={index} style={testimonialCardStyles}>
              <CardContent style={cardContentStyles}>
                <blockquote style={quoteStyles}>
                  "{testimonial.quote}"
                </blockquote>
                <div style={authorSectionStyles}>
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    style={avatarStyles}
                  />
                  <div style={authorInfoStyles}>
                    <div style={authorNameStyles}>{testimonial.author}</div>
                    <div style={authorRoleStyles}>{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
