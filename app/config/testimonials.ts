import { TestimonialsConfig } from "../../lib/shared/components/src/components/TestimonialsSection"

export const testimonialsConfig: TestimonialsConfig = {
  section: {
    title: "What our customers say",
    description: "Don't just take our word for it. Here's what real customers think about SaasCore."
  },
  testimonials: [
    {
      quote: "SaasCore transformed our workflow completely. We've seen a 300% increase in productivity since implementing their solution.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      avatar: "/professional-woman-ceo.png"
    },
    {
      quote: "The analytics dashboard gives us insights we never had before. It's like having a crystal ball for our business.",
      author: "Michael Chen",
      role: "CTO, DataFlow Systems",
      avatar: "/professional-man-cto.png"
    },
    {
      quote: "Outstanding support and incredibly intuitive interface. Our team was up and running in just a few hours.",
      author: "Emily Rodriguez",
      role: "Operations Manager, GrowthCorp",
      avatar: "/professional-woman-manager.png"
    }
  ]
}
