'use client'

import Link from 'next/link'
import { Search, History, Bookmark, Code2, Settings, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Logo } from '@/components/brand'
import { cn } from '@/lib/utils'

export type DashboardView = 'search' | 'history' | 'saved' | 'api' | 'settings'

const items: { id: DashboardView; label: string; icon: LucideIcon }[] = [
  { id: 'search', label: 'Search', icon: Search },
  { id: 'history', label: 'History', icon: History },
  { id: 'saved', label: 'Saved Searches', icon: Bookmark },
  { id: 'api', label: 'API', icon: Code2 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({
  active,
  onSelect,
  open,
  onClose,
}: {
  active: DashboardView
  onSelect: (view: DashboardView) => void
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-sidebar transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/" aria-label="TraceLink home">
            <Logo />
          </Link>
          <button
            type="button"
            className="rounded-lg p-1 text-muted-foreground lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2" aria-label="Dashboard">
          {items.map((item) => {
            const isActive = item.id === active
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'border border-primary/30 bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                <item.icon className="size-4.5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-xl bg-secondary px-3 py-2.5">
            <span className="flex size-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-primary">
              AM
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                Alex Morgan
              </p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">
                Pro plan
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
