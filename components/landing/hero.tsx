import Link from 'next/link'
import { ArrowRight, Play, Search, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PlatformBadge } from '@/components/brand'
import { platforms } from '@/lib/platforms'

const previewResults = [
  { id: 'github', username: 'alex.dev', meta: '4.2k followers', verified: true },
  { id: 'stackoverflow', username: 'a_dev', meta: '18.9k reputation', verified: false },
  { id: 'linkedin', username: 'alexmorgan', meta: '2.1k connections', verified: true },
  { id: 'reddit', username: 'u/alexbuilds', meta: '892 karma', verified: false },
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pt-32 pb-16 md:pt-40 md:pb-24"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-float-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            FREE BETA · PUBLIC DATA ONLY
          </span>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Search Public Profiles Across{' '}
            <span className="text-primary glow-text">Hundreds of Platforms</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Find publicly available profiles from developer communities, social
            platforms, and public services in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-11 px-5 text-sm"
              render={<Link href="/dashboard" />}
            >
              <Search className="size-4" />
              Start Searching
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="h-11 px-5 text-sm"
              render={<Link href="#how-it-works" />}
            >
              <Play className="size-4" />
              Live Demo
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {platforms.slice(0, 6).map((p) => (
                <PlatformBadge
                  key={p.id}
                  platform={p}
                  className="size-8 ring-2 ring-background"
                />
              ))}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              +{platforms.length - 6} more sources indexed
            </p>
          </div>
        </div>

        <div className="animate-float-up [animation-delay:120ms]">
          <MockDashboard />
        </div>
      </div>
    </section>
  )
}

function MockDashboard() {
  return (
    <div className="glow-border rounded-2xl border border-border bg-card p-3 shadow-2xl">
      <div className="flex items-center justify-between rounded-xl bg-secondary px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-primary/40" />
          <span className="size-2.5 rounded-full bg-success/70" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          tracelink://search
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
        <Search className="size-4 text-primary" />
        <span className="font-mono text-sm text-foreground">alex.morgan</span>
        <span className="ml-auto h-4 w-px animate-trace-pulse bg-primary" />
        <span className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[11px] text-primary">
          EMAIL
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {previewResults.map((r, i) => {
          const p = platforms.find((pl) => pl.id === r.id)!
          return (
            <div
              key={r.id}
              className="animate-float-up flex items-center gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/40"
              style={{ animationDelay: `${300 + i * 120}ms` }}
            >
              <PlatformBadge platform={p} className="size-9" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {r.username}
                </p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">
                  {p.name} · {r.meta}
                </p>
              </div>
              <span
                className={`ml-auto rounded-md px-2 py-0.5 font-mono text-[10px] ${
                  r.verified
                    ? 'bg-success/15 text-success'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {r.verified ? 'VERIFIED' : 'FOUND'}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary px-3 py-2 font-mono text-[11px] text-muted-foreground">
        <span>18 platforms scanned</span>
        <span className="text-success">4 matches · 1.2s</span>
      </div>
    </div>
  )
}
