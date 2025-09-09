import { Button } from "../../../ui/src/components/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/src/components/Card"
import { Badge } from "../../../ui/src/components/Badge"

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  popular: boolean
  buttonText?: string
}

export interface PricingConfig {
  section: {
    title: string
    description: string
  }
  plans: PricingPlan[]
}

export interface PricingSectionProps {
  config: PricingConfig
}

export function PricingSection({ config }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">{config.section.title}</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {config.section.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {config.plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-accent shadow-lg scale-105" : "border-border"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent">Most Popular</Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg font-normal text-muted-foreground">/month</span>}
                </div>
                <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "bg-accent hover:bg-accent/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText || (plan.price === "Custom" ? "Contact Sales" : "Get Started")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
