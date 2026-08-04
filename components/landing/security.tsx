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
    title: 'Secure Connection',
    description:
      'All communication between your browser and TraceLink is protected using modern HTTPS encryption.',
  },
  {
    icon: EyeOff,
    title: 'Privacy Focused',
    description:
      'We respect your privacy and never sell or share your search history with third parties.',
  },
  {
    icon: Globe2,
    title: 'Public Data Only',
    description:
      'TraceLink searches only publicly available information. No private accounts or restricted content are accessed.',
  },
  {
    icon: ScrollText,
    title: 'Search History',
    description:
      'Access your previous searches anytime from your dashboard for faster future investigations.',
  },
]

export function Security() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="SECURITY & PRIVACY"
          title="Designed with Security in Mind"
          subtitle="Your searches remain secure while TraceLink focuses only on publicly available information."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:-translate-y-1"
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