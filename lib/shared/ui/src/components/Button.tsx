import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { useStyles, type StyleVariant, type StyleSize } from "../../../../styles"

// Button-specific variant and size types
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon'

interface ButtonProps extends Omit<React.ComponentProps<"button">, 'style'> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  style?: React.CSSProperties
}

function Button({
  variant = "default",
  size = "default",
  asChild = false,
  style,
  children,
  ...props
}: ButtonProps) {
  const { button } = useStyles()
  const Comp = asChild ? Slot : "button"
  
  // Generate styles based on variant and size
  const buttonStyles = button(variant as StyleVariant, size as StyleSize)
  
  // Merge with any additional inline styles
  const combinedStyles = style ? { ...buttonStyles, ...style } : buttonStyles

  return (
    <Comp
      data-slot="button"
      style={combinedStyles}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button }
export type { ButtonProps }
