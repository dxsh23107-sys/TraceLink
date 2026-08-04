'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Platforms', href: '#platforms' },
  { label: 'API', href: '#api' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-border px-4 py-2.5">
        <Link href="/" aria-label="TraceLink home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            className="h-9 px-4"
            render={<Link href="/dashboard" />}
          >
            Continue with Google
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          'glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-border transition-all md:hidden',
          open
            ? 'max-h-96 opacity-100'
            : 'pointer-events-none max-h-0 opacity-0 border-transparent',
        )}
      >
        <nav className="flex flex-col p-2" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-border p-2">
            <Button
              className="h-9 w-full"
              render={<Link href="/dashboard" />}
            >
              Continue with Google
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}