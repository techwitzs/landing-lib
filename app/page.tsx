import { 
  Header, 
  HeroSection, 
  SocialProof, 
  FeaturesSection, 
  PricingSection, 
  TestimonialsSection, 
  CTASection, 
  Footer 
} from "../packages/shared-components/src/components"
import { headerConfig } from "./config/header"
import { footerConfig } from "./config/footer"
import { heroConfig } from "./config/hero"
import { socialProofConfig } from "./config/socialProof"
import { featuresConfig } from "./config/features"
import { pricingConfig } from "./config/pricing"
import { testimonialsConfig } from "./config/testimonials"
import { ctaConfig } from "./config/cta"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header config={headerConfig} />
      <main>
        <HeroSection config={heroConfig} />
        <SocialProof config={socialProofConfig} />
        <FeaturesSection config={featuresConfig} />
        <PricingSection config={pricingConfig} />
        <TestimonialsSection config={testimonialsConfig} />
        <CTASection config={ctaConfig} />
      </main>
      <Footer config={footerConfig} />
    </div>
  )
}
