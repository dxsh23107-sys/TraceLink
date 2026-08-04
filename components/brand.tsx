import { cn } from '@/lib/utils'
import type { Platform } from '@/lib/platforms'

/** Original TraceLink glyph — two linked nodes joined by a traced path. */
export function TraceLinkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="8"
        stroke="#3b82f6"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <path
        d="M11 21c-2.2 0-4-1.8-4-4s1.8-4 4-4h3"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 11c2.2 0 4 1.8 4 4s-1.8 4-4 4h-3"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 16h6"
        stroke="#f5f5f5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="11" cy="17" r="1.6" fill="#3b82f6" />
      <circle cx="21" cy="15" r="1.6" fill="#60a5fa" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <TraceLinkMark className="size-7" />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Trace<span className="text-primary">Link</span>
      </span>
    </span>
  )
}

/** Original monogram badge used in place of copyrighted brand logos. */
export function PlatformBadge({
  platform,
  className,
}: {
  platform: Platform
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg border border-border font-mono text-xs font-semibold',
        className,
      )}
      style={{
        color: platform.color,
        backgroundColor: `color-mix(in srgb, ${platform.color} 12%, transparent)`,
        borderColor: `color-mix(in srgb, ${platform.color} 30%, transparent)`,
      }}
      aria-hidden="true"
    >
      {platform.mark}
    </span>
  )
}
