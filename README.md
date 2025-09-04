# Core Landing - Configurable Component Architecture

A Next.js 15 landing page with a complete configurable component architecture built with TypeScript, Tailwind CSS, and pnpm workspaces.

## 🏗️ Architecture

- **Monorepo Structure**: Shared packages for reusable components
- **Configurable Components**: All components accept configuration objects
- **TypeScript**: Full type safety throughout the codebase
- **No Duplication**: Single source of truth for all components

## 📦 Packages

- `packages/shared-utils` - Utilities, hooks, constants, types
- `packages/shared-ui` - Basic UI components (Button, Card, Badge)
- `packages/shared-components` - Business logic components

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 🎨 Components

All components are configurable via TypeScript interfaces:

- Header - Navigation with logo and menu items
- Hero Section - Main banner with CTA buttons
- Social Proof - Company logos and trust indicators
- Features - Feature grid with icons and descriptions
- Pricing - Pricing plans with features
- Testimonials - Customer testimonials with avatars
- CTA Section - Call-to-action with buttons
- Footer - Links, social media, and company info

## 🔧 Configuration

Each component has its own configuration file in `app/config/`:

- `header.ts` - Header configuration
- `hero.ts` - Hero section content
- `socialProof.ts` - Company logos
- `features.ts` - Features list
- `pricing.ts` - Pricing plans
- `testimonials.ts` - Customer testimonials
- `cta.ts` - Call-to-action content
- `footer.ts` - Footer links and info

## 🎯 Reusability

This architecture allows you to:

1. **Reuse components** across multiple landing pages
2. **Customize content** without touching component logic
3. **Maintain consistency** across different apps
4. **Scale efficiently** with shared packages

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component primitives
- **pnpm** - Fast package manager with workspaces

## 📁 Project Structure

```
core-landing/
├── app/                    # Next.js app directory
│   ├── config/            # Component configurations
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── packages/              # Shared packages
│   ├── shared-utils/      # Utilities and hooks
│   ├── shared-ui/         # Basic UI components
│   └── shared-components/ # Business components
├── public/                # Static assets
└── styles/                # Global styles
```

## 🚢 Deployment

This project is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
vercel --prod
```

---

Built with ❤️ using modern web technologies for maximum reusability and maintainability.

