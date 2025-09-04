import { Button } from "@/lib/components/Button"

export interface CTAAction {
  label: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export interface CTAConfig {
  title: string
  description: string
  actions: {
    primary: CTAAction
    secondary?: CTAAction
  }
}

export interface CTASectionProps {
  config: CTAConfig
}

export function CTASection({ config }: CTASectionProps) {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground text-balance mb-6">
            {config.title}
          </h2>
          <p className="text-xl text-accent-foreground/90 text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            {config.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant={config.actions.primary.variant || "secondary"} 
              className="text-lg px-8 py-6"
            >
              {config.actions.primary.label}
            </Button>
            {config.actions.secondary && (
              <Button
                size="lg"
                variant={config.actions.secondary.variant || "outline"}
                className="text-lg px-8 py-6 border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10 bg-transparent"
              >
                {config.actions.secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
