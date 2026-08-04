import { AtSign, Radar, ListChecks } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/landing/features'

interface Step {
  icon: LucideIcon
  step: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: AtSign,
    step: '01',
    title: 'Enter an Email or Username',
    description:
      'Type an email address or username to begin searching across supported public platforms.',
  },
  {
    icon: Radar,
    step: '02',
    title: 'Scan Public Platforms',
    description:
      'TraceLink searches hundreds of public sources simultaneously and gathers matching profiles in seconds.',
  },
  {
    icon: ListChecks,
    step: '03',
    title: 'Explore the Results',
    description:
      'View discovered public profiles in one clean dashboard and quickly navigate between platforms.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 px-4 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="Find Public Profiles in Three Simple Steps"
          subtitle="A simple workflow that helps you discover publicly available digital footprints within seconds."
        />

        <div className="relative mt-12 grid gap-4 md:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-16 top-16 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((s, i) => (
            <article
              key={s.step}
              className="animate-float-up relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </div>

                <span className="font-mono text-3xl font-bold text-secondary-foreground/20">
                  {s.step}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {s.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}