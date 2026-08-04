export function ResultSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="size-11 shrink-0 animate-pulse rounded-lg bg-secondary" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-2/3 animate-pulse rounded bg-secondary" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-secondary" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-secondary" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-secondary" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-3 animate-pulse rounded bg-secondary" />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="h-3 w-20 animate-pulse rounded bg-secondary" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-secondary" />
      </div>
    </div>
  )
}
