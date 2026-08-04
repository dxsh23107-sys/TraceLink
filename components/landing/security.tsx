import { Lock, EyeOff, Globe2, ScrollText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/landing/features'

interface Item {
  icon: LucideIcon
  title: string
  description: string
}

const items: Item[] = [
  {
    icon: Lock,
    title: 'TLS Encryption',
    description: 'All traffic is encrypted in transit with modern TLS. Nothing leaves your session in the clear.',
  },
  {
    icon: EyeOff,
    title: 'Privacy',
    description: 'We never sell data. Queries are yours alone and can be purged from history at any time.',
  },
  {
    icon: Globe2,
    title: 'Public Data Only',
    description: 'Results come exclusively from publicly accessible sources — no private or gated content.',
  },
  {
    icon: ScrollText,
    title: 'Audit Logs',
    description: 'Every search is logged with a timestamp, giving teams a clear, reviewable activity trail.',
  },
]

export function Security() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="SECURITY"
          title="Built responsibly, secured by default"
          subtitle="TraceLink is designed for ethical, transparent research on public information."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
                <item.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
