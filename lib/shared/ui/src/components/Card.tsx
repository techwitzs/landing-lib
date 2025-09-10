import * as React from "react"
import { useStyles, type StyleVariant } from "../../../../styles"

// Card-specific variant types
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled'

interface CardProps extends Omit<React.ComponentProps<"div">, 'style'> {
  variant?: CardVariant
  style?: React.CSSProperties
}

function Card({ 
  variant = "default", 
  style,
  children,
  ...props 
}: CardProps) {
  const { card } = useStyles()
  
  // Generate styles based on variant
  const cardStyles = card.root()
  
  // Merge with any additional inline styles
  const combinedStyles = style ? { ...cardStyles, ...style } : cardStyles

  return (
    <div
      data-slot="card"
      style={combinedStyles}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardSubComponentProps extends Omit<React.ComponentProps<"div">, 'style'> {
  style?: React.CSSProperties
}

function CardHeader({ style, children, ...props }: CardSubComponentProps) {
  const { theme } = useStyles()
  
  const headerStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: '1fr auto',
    alignItems: 'start',
    gap: theme.spacing.xs,
    padding: `0 ${theme.spacing.lg}`,
    ...(style || {})
  }

  return (
    <div
      data-slot="card-header"
      style={headerStyles}
      {...props}
    >
      {children}
    </div>
  )
}

function CardTitle({ style, children, ...props }: CardSubComponentProps) {
  const { theme } = useStyles()
  
  const titleStyles: React.CSSProperties = {
    lineHeight: 1,
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: theme.typography.fontSize.base,
    ...(style || {})
  }

  return (
    <div
      data-slot="card-title"
      style={titleStyles}
      {...props}
    >
      {children}
    </div>
  )
}

function CardDescription({ style, children, ...props }: CardSubComponentProps) {
  const { theme } = useStyles()
  
  const descriptionStyles: React.CSSProperties = {
    color: theme.colors.muted,
    fontSize: theme.typography.fontSize.sm,
    ...(style || {})
  }

  return (
    <div
      data-slot="card-description"
      style={descriptionStyles}
      {...props}
    >
      {children}
    </div>
  )
}

function CardAction({ style, children, ...props }: CardSubComponentProps) {
  const actionStyles: React.CSSProperties = {
    gridColumn: 2,
    gridRow: '1 / span 2',
    justifySelf: 'end',
    alignSelf: 'start',
    ...(style || {})
  }

  return (
    <div
      data-slot="card-action"
      style={actionStyles}
      {...props}
    >
      {children}
    </div>
  )
}

function CardContent({ style, children, ...props }: CardSubComponentProps) {
  const { theme } = useStyles()
  
  const contentStyles: React.CSSProperties = {
    padding: `0 ${theme.spacing.lg}`,
    ...(style || {})
  }

  return (
    <div
      data-slot="card-content"
      style={contentStyles}
      {...props}
    >
      {children}
    </div>
  )
}

function CardFooter({ style, children, ...props }: CardSubComponentProps) {
  const { theme } = useStyles()
  
  const footerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing.lg}`,
    ...(style || {})
  }

  return (
    <div
      data-slot="card-footer"
      style={footerStyles}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

export type { 
  CardProps, 
  CardSubComponentProps 
}
