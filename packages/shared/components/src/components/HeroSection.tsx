import { Button } from "@/lib/components/Button"
import { Badge } from "@/lib/components/Badge"

export interface HeroAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export interface HeroFeature {
  text: string
}

export interface HeroConfig {
  badge?: {
    text: string
    variant?: "default" | "secondary" | "outline" | "destructive"
  }
  headline: {
    main: string
    highlight?: string
  }
  description: string
  actions: {
    primary: HeroAction
    secondary?: HeroAction
  }
  features: HeroFeature[]
}

export interface HeroSectionProps {
  config: HeroConfig
}

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <section className="relative py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {config.badge && (
            <Badge variant={config.badge.variant || "secondary"} className="mb-6">
              {config.badge.text}
            </Badge>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
            {config.headline.main}
            {config.headline.highlight && (
              <span className="text-accent"> {config.headline.highlight}</span>
            )}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
            {config.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              variant={config.actions.primary.variant || "default"}
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-6"
            >
              {config.actions.primary.label}
            </Button>
            {config.actions.secondary && (
              <Button 
                variant={config.actions.secondary.variant || "outline"} 
                size="lg" 
                className="text-lg px-8 py-6 bg-transparent"
              >
                {config.actions.secondary.label}
              </Button>
            )}
          </div>

          {config.features.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {feature.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
