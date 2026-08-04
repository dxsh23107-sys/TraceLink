import {
  Zap,
  Globe,
  UserSearch,
  Download,
  History,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  soon?: boolean
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Fast Parallel Search',
    description:
      'Query every supported source at once. Concurrent requests return aggregated matches in seconds, not minutes.',
  },
  {
    icon: Globe,
    title: 'Public Data Only',
    description:
      'We only surface information that is already publicly available. No scraping behind logins, ever.',
  },
  {
    icon: UserSearch,
    title: 'Detailed Profile View',
    description:
      'Followers, bio, location, join date and links — normalized into a clean, consistent profile card.',
  },
  {
    icon: Download,
    title: 'Export Results',
    description:
      'Download your findings as CSV, JSON, or PDF for reporting, investigation notes, or pipelines.',
  },
  {
    icon: History,
    title: 'Search History',
    description:
      'Every query is timestamped and searchable so you can revisit and rerun past investigations.',
  },
  {
    icon: Sparkles,
    title: 'AI Summary',
    description:
      'Automatic, plain-language summaries that connect the dots across all discovered profiles.',
    soon: true,
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="FEATURES"
          title="Everything you need to trace a footprint"
          subtitle="A focused toolkit for open-source intelligence, built around speed, clarity, and public data."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[0_0_32px_-12px_rgba(59,130,246,0.4)]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary text-primary transition-colors group-hover:border-primary/40">
                <f.icon className="size-5" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {f.title}
                </h3>
                {f.soon ? (
                  <span className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[10px] text-primary">
                    COMING SOON
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="font-mono text-xs tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
