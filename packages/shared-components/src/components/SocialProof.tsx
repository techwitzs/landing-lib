export interface SocialProofConfig {
  trustText: string
  companies: string[]
}

export interface SocialProofProps {
  config: SocialProofConfig
}

export function SocialProof({ config }: SocialProofProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground mb-8">{config.trustText}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {config.companies.map((company) => (
              <div key={company} className="text-2xl font-bold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
