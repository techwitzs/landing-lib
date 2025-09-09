import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/src/components/Card"

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface FeaturesConfig {
  section: {
    title: string
    description: string
  }
  features: Feature[]
}

export interface FeaturesSectionProps {
  config: FeaturesConfig
}

export function FeaturesSection({ config }: FeaturesSectionProps) {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            {config.section.title}
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {config.section.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
