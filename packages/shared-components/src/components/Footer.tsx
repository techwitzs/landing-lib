export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterConfig {
  brand: {
    name: string
    logo?: string
    description: string
  }
  sections: FooterSection[]
  copyright: string
  legalLinks: FooterLink[]
}

export interface FooterProps {
  config: FooterConfig
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">
                  {config.brand.logo || config.brand.name.charAt(0)}
                </span>
              </div>
              <span className="font-bold text-xl">{config.brand.name}</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              {config.brand.description}
            </p>
          </div>

          {config.sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="hover:text-primary-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">{config.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {config.legalLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
