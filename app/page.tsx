import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/landing/hero'
import { Stats } from '@/components/landing/stats'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { PlatformGrid } from '@/components/landing/platform-grid'
import { Security } from '@/components/landing/security'
import { Pricing } from '@/components/landing/pricing'
import { Testimonials } from '@/components/landing/testimonials'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <PlatformGrid />
        <Security />
        <Pricing />
        <Testimonials />
      </main>
      <SiteFooter />
    </div>
  )
}
