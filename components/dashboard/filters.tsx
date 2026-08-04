'use client'

import { SlidersHorizontal, Check } from 'lucide-react'
import { platforms } from '@/lib/platforms'
import { countries } from '@/lib/mock-results'
import { cn } from '@/lib/utils'

export interface FilterState {
  platform: string
  minFollowers: number
  verifiedOnly: boolean
  country: string
}

export const defaultFilters: FilterState = {
  platform: 'all',
  minFollowers: 0,
  verifiedOnly: false,
  country: 'all',
}

const followerOptions = [
  { value: 0, label: 'Any followers' },
  { value: 1000, label: '1k+' },
  { value: 10000, label: '10k+' },
  { value: 25000, label: '25k+' },
]

export function Filters({
  value,
  onChange,
}: {
  value: FilterState
  onChange: (next: FilterState) => void
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground">
        <SlidersHorizontal className="size-3.5 text-primary" />
        FILTERS
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Platform">
          <Select
            value={value.platform}
            onChange={(v) => onChange({ ...value, platform: v })}
          >
            <option value="all">All platforms</option>
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Followers">
          <Select
            value={String(value.minFollowers)}
            onChange={(v) => onChange({ ...value, minFollowers: Number(v) })}
          >
            {followerOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Country">
          <Select
            value={value.country}
            onChange={(v) => onChange({ ...value, country: v })}
          >
            <option value="all">All countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Verified">
          <button
            type="button"
            role="switch"
            aria-checked={value.verifiedOnly}
            onClick={() =>
              onChange({ ...value, verifiedOnly: !value.verifiedOnly })
            }
            className={cn(
              'flex h-9 w-full items-center justify-between rounded-lg border px-3 text-sm transition-colors',
              value.verifiedOnly
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-border bg-background text-muted-foreground hover:text-foreground',
            )}
          >
            Verified only
            <span
              className={cn(
                'flex size-5 items-center justify-center rounded-md border',
                value.verifiedOnly
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border',
              )}
            >
              {value.verifiedOnly ? <Check className="size-3.5" /> : null}
            </span>
          </button>
        </Field>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
    >
      {children}
    </select>
  )
}
