import Link from 'next/link'
import { Code2, MessageCircle, Send, Mail } from 'lucide-react'
import { Logo } from '@/components/brand'

const columns = [
  {
    title: 'Product',
    links: ['Features', 'Platforms', 'Pricing', 'API'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'Changelog', 'Status', 'Support'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security', 'Contact'],
  },
]

const socials = [
  { label: 'GitHub', icon: Code2, href: '#' },
  { label: 'Discord', icon: MessageCircle, href: '#' },
  { label: 'Twitter', icon: Send, href: '#' },
  { label: 'Contact', icon: Mail, href: '#' },
]

export function SiteFooter() {
  return (
    <footer id="docs" className="scroll-mt-24 border-t border-border px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Search public profiles across hundreds of platforms. Fast,
              ethical, public-data intelligence.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <s.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs tracking-widest text-muted-foreground">
                {col.title.toUpperCase()}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} TraceLink. Public data only.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
