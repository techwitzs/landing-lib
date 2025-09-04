import type { HeaderConfig } from "../../packages/shared-components/src/components/Header"

// App-specific header configuration
export const headerConfig: HeaderConfig = {
  brand: {
    name: "Base App"
  },
  navigation: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ],
  actions: {
    signin: "Sign In",
    cta: "Get Started"
  }
}
