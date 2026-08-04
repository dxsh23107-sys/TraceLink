import { PlatformBadge } from '@/components/brand'
import { platforms } from '@/lib/platforms'
import { SectionHeading } from '@/components/landing/features'

export function PlatformGrid() {
  return (
    <section id="platforms" className="scroll-mt-24 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="SUPPORTED PLATFORMS"
          title="Search Across 200+ Public Platforms"
          subtitle="Find publicly available profiles from developer communities, social networks, forums, and other public services in one search."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {platforms.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all duration-300 hover:border-primary/40 hover:bg-secondary hover:-translate-y-1"
            >
              <PlatformBadge
                platform={p}
                className="size-11 transition-transform duration-300 group-hover:scale-110"
              />

              <span className="text-sm font-medium text-foreground">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}