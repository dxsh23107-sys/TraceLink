'use client'

import { AtSign, Mail, RotateCw, Clock } from 'lucide-react'

export interface HistoryEntry {
  id: string
  query: string
  mode: 'username' | 'email'
  count: number
  time: string
}

export function HistoryTimeline({
  entries,
  onRerun,
  compact = false,
}: {
  entries: HistoryEntry[]
  onRerun: (entry: HistoryEntry) => void
  compact?: boolean
}) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
        <Clock className="size-6 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium text-foreground">
          No searches yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your search history will appear here as a timeline.
        </p>
      </div>
    )
  }

  return (
    <ol className="relative space-y-3 pl-6">
      <span className="absolute inset-y-1 left-2 w-px bg-border" aria-hidden="true" />
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span className="absolute -left-[18px] top-4 size-2.5 rounded-full border-2 border-primary bg-background" />
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40">
            <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
              {entry.mode === 'email' ? (
                <Mail className="size-4" />
              ) : (
                <AtSign className="size-4" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-sm text-foreground">
                {entry.query}
              </p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">
                {entry.count} matches · {entry.time}
              </p>
            </div>
            {!compact ? (
              <button
                type="button"
                onClick={() => onRerun(entry)}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <RotateCw className="size-3.5" />
                Rerun
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onRerun(entry)}
                aria-label="Rerun search"
                className="rounded-lg border border-border bg-background p-1.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <RotateCw className="size-3.5" />
              </button>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
