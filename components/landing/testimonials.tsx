import { SectionHeading } from '@/components/landing/features'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'TraceLink collapsed what used to be an afternoon of manual lookups into a single search. The parallel scan is genuinely fast.',
    name: 'Riya Patel',
    role: 'OSINT Analyst',
    initials: 'RP',
  },
  {
    quote:
      'The normalized profile cards are the killer feature. Consistent fields across every platform make reporting effortless.',
    name: 'Marcus Feld',
    role: 'Security Researcher',
    initials: 'MF',
  },
  {
    quote:
      'Exporting to JSON and wiring it into our pipeline took minutes. Clean data, clear docs, no surprises.',
    name: 'Dana Cho',
    role: 'Trust & Safety Lead',
    initials: 'DC',
  },
]

export function Testimonials() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="Trusted by researchers and teams"
          subtitle="Practitioners rely on TraceLink for fast, ethical, public-data investigations."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <blockquote className="flex-1 text-pretty text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-primary">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    {t.name}
                  </span>
                  <span className="block font-mono text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
