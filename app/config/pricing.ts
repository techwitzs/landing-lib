import { PricingConfig } from "../../packages/shared/components/src/components/PricingSection"

export const pricingConfig: PricingConfig = {
  section: {
    title: "Simple, transparent pricing",
    description: "Choose the plan that's right for your business. No hidden fees."
  },
  plans: [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small teams getting started",
      features: ["Up to 5 team members", "10GB storage", "Basic analytics", "Email support", "Core integrations"],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      description: "Best for growing businesses",
      features: [
        "Up to 25 team members",
        "100GB storage",
        "Advanced analytics",
        "Priority support",
        "All integrations",
        "Custom workflows"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited team members",
        "Unlimited storage",
        "Custom analytics",
        "24/7 dedicated support",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee"
      ],
      popular: false
    }
  ]
}
