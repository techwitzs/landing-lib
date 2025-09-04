import type { FooterConfig } from "../../packages/shared-components/src/components/Footer"

// App-specific footer configuration
export const footerConfig: FooterConfig = {
  brand: {
    name: "SaasCore",
    description: "Empowering businesses with intelligent SaaS solutions for the modern world."
  },
  sections: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "/integrations" },
        { label: "API", href: "/api" }
      ]
    },
    {
      title: "Company", 
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Documentation", href: "/docs" },
        { label: "Status", href: "/status" },
        { label: "Community", href: "/community" }
      ]
    }
  ],
  copyright: "© 2024 SaasCore. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ]
}
