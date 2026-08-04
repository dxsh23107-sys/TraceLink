import {
  MapPin,
  CalendarDays,
  Users,
  Globe,
  BadgeCheck,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PlatformBadge } from '@/components/brand'
import type { ProfileResult } from '@/lib/mock-results'

function formatFollowers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

export function ProfileCard({ result }: { result: ProfileResult }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-[0_0_32px_-12px_rgba(59,130,246,0.45)]">
      <div className="flex items-start gap-3">
        <PlatformBadge platform={result.platform} className="size-11" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-mono text-sm font-semibold text-foreground">
              @{result.username}
            </h3>
            {result.verified ? (
              <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="Verified" />
            ) : null}
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {result.displayName}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] ${
            result.status === 'active'
              ? 'bg-success/15 text-success'
              : 'bg-secondary text-muted-foreground'
          }`}
        >
          {result.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-foreground/80">
        {result.bio}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs">
        <Meta icon={Users} label={`${formatFollowers(result.followers)} followers`} />
        <Meta icon={MapPin} label={result.location} />
        <Meta icon={CalendarDays} label={`Joined ${result.joinDate}`} />
        <Meta icon={Globe} label={result.website} />
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-xs text-muted-foreground">
          {result.platform.name}
        </span>
        <Button variant="outline" size="sm" className="h-8">
          View Profile
          <ExternalLink className="size-3.5" />
        </Button>
      </div>
    </article>
  )
}

function Meta({
  icon: Icon,
  label,
}: {
  icon: typeof Users
  label: string
}) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Icon className="size-3.5 shrink-0 text-primary/70" />
      <span className="truncate">{label}</span>
    </div>
  )
}
