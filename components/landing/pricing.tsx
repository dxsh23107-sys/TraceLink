import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/landing/features'
import { cn } from '@/lib/utils'

interface Plan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'For quick, occasional lookups.',
    features: [
      '25 searches per month',
      'Up to 20 platforms per search',
      'Basic profile view',
      'CSV export',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For researchers and analysts.',
    features: [
      'Unlimited searches',
      'All 180+ platforms',
      'Detailed profile view',
      'CSV, JSON & PDF export',
      'Search history & saved searches',
      'Priority parallel queue',
    ],
    cta: 'Start Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations.',
    features: [
      'Everything in Pro',
      'API access & webhooks',
      'Team workspaces & roles',
      'Audit logs & SSO',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="PRICING"
          title="Simple plans that scale with you"
          subtitle="Start free and upgrade when your investigations grow. No hidden fees."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-card p-6',
                plan.featured
                  ? 'border-primary/50 glow-border'
                  : 'border-border',
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-semibold text-primary-foreground">
                  MOST POPULAR
                </span>
              ) : null}

              <h3 className="text-lg font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? 'default' : 'outline'}
                className="mt-6 h-10 w-full"
                render={<Link href="/dashboard" />}
              >
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
