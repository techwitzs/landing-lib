import { HeroConfig } from "../../packages/shared/components/src/components/HeroSection"

export const heroConfig: HeroConfig = {
  badge: {
    text: "🚀 New: Advanced Analytics Dashboard",
    variant: "secondary"
  },
  headline: {
    main: "Scale Your Business with",
    highlight: "Intelligent SaaS Solutions"
  },
  description: "Streamline operations, boost productivity, and drive growth with our comprehensive suite of business tools designed for modern enterprises.",
  actions: {
    primary: {
      label: "Start Free Trial",
      variant: "default"
    },
    secondary: {
      label: "Watch Demo",
      variant: "outline"
    }
  },
  features: [
    { text: "No credit card required" },
    { text: "14-day free trial" },
    { text: "Cancel anytime" }
  ]
}
