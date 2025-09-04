import { Button } from "@/lib/components/Button"

export interface NavLink {
  label: string
  href: string
}

export interface HeaderConfig {
  brand: {
    name: string
    logo?: string
  }
  navigation: NavLink[]
  actions: {
    signin: string
    cta: string
  }
}

export interface HeaderProps {
  config: HeaderConfig
}

export function Header({ config }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-lg">
              {config.brand.logo || config.brand.name.charAt(0)}
            </span>
          </div>
          <span className="font-bold text-xl">{config.brand.name}</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {config.navigation.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            {config.actions.signin}
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90">
            {config.actions.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
