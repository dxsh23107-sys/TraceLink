import Link from 'next/link'
import { Code2, Mail, Send } from 'lucide-react'
import { Logo } from '@/components/brand'

const columns = [
  {
    title: 'Product',
    links: ['Features', 'Platforms', 'Dashboard', 'Search'],
  },
  {
    title: 'Resources',
    links: ['FAQ', 'Support', 'API', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Security'],
  },
]

const socials = [
  { label: 'GitHub', icon: Code2, href: '#' },
  { label: 'Telegram', icon: Send, href: '#' },
  { label: 'Email', icon: Mail, href: '#' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Discover public digital footprints across hundreds of publicly
              available platforms using one powerful search engine.
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
            © {new Date().getFullYear()} TraceLink. All Rights Reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Public Data Only • Free Beta
          </p>
        </div>
      </div>
    </footer>
  )
}