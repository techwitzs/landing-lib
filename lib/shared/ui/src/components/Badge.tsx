import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { useStyles, type StyleVariant, type StyleSize } from "../../../../styles"

// Badge-specific variant and size types
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'
export type BadgeSize = 'sm' | 'default' | 'lg'

interface BadgeProps extends Omit<React.ComponentProps<"span">, 'style'> {
  variant?: BadgeVariant
  size?: BadgeSize
  asChild?: boolean
  style?: React.CSSProperties
}

function Badge({
  variant = "default",
  size = "default", 
  asChild = false,
  style,
  children,
  ...props
}: BadgeProps) {
  const { badge } = useStyles()
  const Comp = asChild ? Slot : "span"
  
  // Generate styles based on variant (size will be handled via additional styles if needed)
  const badgeStyles = badge(variant)
  
  // Merge with any additional inline styles
  const combinedStyles = style ? { ...badgeStyles, ...style } : badgeStyles

  return (
    <Comp
      data-slot="badge"
      style={combinedStyles}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Badge }
export type { BadgeProps }
