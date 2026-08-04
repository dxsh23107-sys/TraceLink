import { BadgeCheck, ExternalLink } from 'lucide-react'
import { PlatformBadge } from '@/components/brand'
import { Button } from '@/components/ui/button'
import type { ProfileResult } from '@/lib/mock-results'

function formatFollowers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

export function ResultsTable({ results }: { results: ProfileResult[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border font-mono text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Platform</th>
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Followers</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr
                key={r.id}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <PlatformBadge platform={r.platform} className="size-8" />
                    <span className="text-foreground">{r.platform.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 font-mono text-foreground">
                    @{r.username}
                    {r.verified ? (
                      <BadgeCheck className="size-3.5 text-primary" />
                    ) : null}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {r.displayName}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatFollowers(r.followers)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {r.location}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] ${
                      r.status === 'active'
                        ? 'bg-success/15 text-success'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {r.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon-sm" aria-label="View profile">
                    <ExternalLink className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
