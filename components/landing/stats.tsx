const stats = [
  { value: '180+', label: 'Supported Platforms' },
  { value: '1.4s', label: 'Average Search Time' },
  { value: '2.9M', label: 'Searches Completed' },
  { value: '100%', label: 'Public Sources' },
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
