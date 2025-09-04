import { Card, CardContent } from "../../../shared-ui/src/components/Card"

export interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
}

export interface TestimonialsConfig {
  section: {
    title: string
    description: string
  }
  testimonials: Testimonial[]
}

export interface TestimonialsSectionProps {
  config: TestimonialsConfig
}

export function TestimonialsSection({ config }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">{config.section.title}</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {config.section.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {config.testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <blockquote className="text-lg leading-relaxed mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
