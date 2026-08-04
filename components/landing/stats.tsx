const stats = [
  { value: '200+', label: 'Supported Platforms' },
  { value: '<2s', label: 'Average Search Time' },
  { value: '100K+', label: 'Public Searches' },
  { value: '100%', label: 'Public Data Only' },
]

export function Stats() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-4 md:p-6">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-3 text-center md:text-left">
            <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}