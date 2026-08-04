'use client'

import { useMemo, useRef, useState } from 'react'
import {
  Search,
  Menu,
  LayoutGrid,
  Table2,
  FileJson,
  FileSpreadsheet,
  FileText,
  Bookmark,
  BookmarkCheck,
  Radar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sidebar, type DashboardView } from '@/components/dashboard/sidebar'
import { ProfileCard } from '@/components/dashboard/profile-card'
import { ResultSkeleton } from '@/components/dashboard/result-skeleton'
import { ResultsTable } from '@/components/dashboard/results-table'
import {
  Filters,
  defaultFilters,
  type FilterState,
} from '@/components/dashboard/filters'
import {
  HistoryTimeline,
  type HistoryEntry,
} from '@/components/dashboard/history-timeline'
import { type ProfileResult } from '@/lib/mock-results'
import { exportCSV, exportJSON, exportPDF } from '@/lib/export'
import { cn } from '@/lib/utils'

type Mode = 'username' | 'email'
type ViewMode = 'grid' | 'table'

interface SavedSearch {
  id: string
  query: string
  mode: Mode
}

export function Dashboard() {
  const [view, setView] = useState<DashboardView>('search')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<Mode>('username')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<ProfileResult[] | null>(null)
  const [activeQuery, setActiveQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [saved, setSaved] = useState<SavedSearch[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runSearch = (q: string, m: Mode) => {
    const trimmed = q.trim()
    if (!trimmed) return
    setView('search')
    setSidebarOpen(false)
    setSearching(true)
    setResults(null)
    setActiveQuery(trimmed)
    setFilters(defaultFilters)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/search/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: trimmed,
            type: m,
          }),
        })

        const data = await response.json()

        setResults(data.results)
        setSearching(false)
        setHistory((prev) =>
          [
            {
              id: `${Date.now()}`,
              query: trimmed,
              mode: m,
              count: data.total_results,
              time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
            ...prev,
          ].slice(0, 20),
        )
      } catch (error) {
        console.error('Search failed:', error)
        setSearching(false)
      }
    }, 1400)
  }

  const filtered = useMemo(() => {
    if (!results) return []
    return results.filter((r) => {
      if (filters.platform !== 'all' && r.platform.id !== filters.platform)
        return false
      if (r.followers < filters.minFollowers) return false
      if (filters.verifiedOnly && !r.verified) return false
      if (filters.country !== 'all' && r.country !== filters.country)
        return false
      return true
    })
  }, [results, filters])

  const isSaved = saved.some((s) => s.query === activeQuery)
  const toggleSave = () => {
    if (!activeQuery) return
    setSaved((prev) =>
      isSaved
        ? prev.filter((s) => s.query !== activeQuery)
        : [{ id: `${Date.now()}`, query: activeQuery, mode }, ...prev],
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        active={view}
        onSelect={(v) => {
          setView(v)
          setSidebarOpen(false)
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <TopBar
          query={query}
          setQuery={setQuery}
          mode={mode}
          setMode={setMode}
          onSearch={() => runSearch(query, mode)}
          onMenu={() => setSidebarOpen(true)}
          searching={searching}
        />

        <main className="mx-auto max-w-6xl px-4 py-6">
          {view === 'search' ? (
            <SearchView
              searching={searching}
              results={results}
              filtered={filtered}
              activeQuery={activeQuery}
              filters={filters}
              setFilters={setFilters}
              viewMode={viewMode}
              setViewMode={setViewMode}
              history={history}
              onRerun={(e) => {
                setQuery(e.query)
                setMode(e.mode)
                runSearch(e.query, e.mode)
              }}
              isSaved={isSaved}
              onToggleSave={toggleSave}
            />
          ) : null}

          {view === 'history' ? (
            <Panel
              title="Search History"
              subtitle="A timeline of every query you've run this session."
            >
              <HistoryTimeline
                entries={history}
                onRerun={(e) => {
                  setQuery(e.query)
                  setMode(e.mode)
                  runSearch(e.query, e.mode)
                }}
              />
            </Panel>
          ) : null}

          {view === 'saved' ? (
            <SavedView
              saved={saved}
              onRun={(s) => {
                setQuery(s.query)
                setMode(s.mode)
                runSearch(s.query, s.mode)
              }}
              onRemove={(id) =>
                setSaved((prev) => prev.filter((s) => s.id !== id))
              }
            />
          ) : null}

          {view === 'api' ? <ApiView /> : null}
          {view === 'settings' ? <SettingsView /> : null}
        </main>
      </div>
    </div>
  )
}

function TopBar({
  query,
  setQuery,
  mode,
  setMode,
  onSearch,
  onMenu,
  searching,
}: {
  query: string
  setQuery: (v: string) => void
  mode: Mode
  setMode: (m: Mode) => void
  onSearch: () => void
  onMenu: () => void
  searching: boolean
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onMenu}
          className="rounded-lg border border-border p-2 text-foreground lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>

        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                onSearch()
              }
            }}
            placeholder={
              mode === 'email' ? 'name@example.com' : 'Enter a username'
            }
            className="h-10 w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label={mode === 'email' ? 'Search by email' : 'Search by username'}
          />
        </div>

        <div className="hidden items-center rounded-xl border border-border bg-card p-1 sm:flex">
          {(['username', 'email'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                'rounded-lg px-3 py-1.5 font-mono text-xs capitalize transition-colors',
                mode === m
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <Button className="h-10 px-4" onClick={onSearch} disabled={searching}>
          {searching ? (
            <Radar className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          <span className="hidden sm:inline">
            {searching ? 'Searching' : 'Search'}
          </span>
        </Button>
      </div>
    </header>
  )
}

function SearchView({
  searching,
  results,
  filtered,
  activeQuery,
  filters,
  setFilters,
  viewMode,
  setViewMode,
  history,
  onRerun,
  isSaved,
  onToggleSave,
}: {
  searching: boolean
  results: ProfileResult[] | null
  filtered: ProfileResult[]
  activeQuery: string
  filters: FilterState
  setFilters: (f: FilterState) => void
  viewMode: ViewMode
  setViewMode: (v: ViewMode) => void
  history: HistoryEntry[]
  onRerun: (e: HistoryEntry) => void
  isSaved: boolean
  onToggleSave: () => void
}) {
  if (!searching && !results) {
    return <EmptyState history={history} onRerun={onRerun} />
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {searching ? (
              <span className="flex items-center gap-2">
                <span className="inline-flex size-2 animate-trace-pulse rounded-full bg-primary" />
                Scanning platforms…
              </span>
            ) : (
              <>
                Results for{' '}
                <span className="font-mono text-primary">{activeQuery}</span>
              </>
            )}
          </h1>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            {searching
              ? 'Querying public sources in parallel'
              : `${filtered.length} of ${results?.length ?? 0} profiles`}
          </p>
        </div>

        {!searching && results ? (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl border border-border bg-card p-1">
              <ToggleIcon
                active={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                label="Grid view"
              >
                <LayoutGrid className="size-4" />
              </ToggleIcon>
              <ToggleIcon
                active={viewMode === 'table'}
                onClick={() => setViewMode('table')}
                label="Table view"
              >
                <Table2 className="size-4" />
              </ToggleIcon>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={onToggleSave}
            >
              {isSaved ? (
                <BookmarkCheck className="size-4 text-primary" />
              ) : (
                <Bookmark className="size-4" />
              )}
              {isSaved ? 'Saved' : 'Save'}
            </Button>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => exportCSV(filtered, activeQuery)}
              >
                <FileSpreadsheet className="size-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => exportJSON(filtered, activeQuery)}
              >
                <FileJson className="size-4" />
                JSON
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => exportPDF(filtered, activeQuery)}
              >
                <FileText className="size-4" />
                PDF
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {!searching && results ? (
        <Filters value={filters} onChange={setFilters} />
      ) : null}

      {searching ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ResultSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="text-sm font-medium text-foreground">
            No profiles match your filters
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try widening the filters to see more results.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((r) => (
            <ProfileCard key={r.id} result={r} />
          ))}
        </div>
      ) : (
        <ResultsTable results={filtered} />
      )}
    </div>
  )
}

function EmptyState({
  history,
  onRerun,
}: {
  history: HistoryEntry[]
  onRerun: (e: HistoryEntry) => void
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
          <Radar className="size-7" />
        </span>
        <h1 className="mt-5 text-xl font-semibold text-foreground">
          Start a new search
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Enter a username or email in the bar above to scan public profiles
          across every supported platform in parallel.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="rounded-lg border border-border bg-background px-2.5 py-1">
            Tip: try &ldquo;alex.morgan&rdquo;
          </span>
          <span className="rounded-lg border border-border bg-background px-2.5 py-1">
            or an email address
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 font-mono text-xs tracking-widest text-muted-foreground">
          RECENT SEARCHES
        </h2>
        <HistoryTimeline entries={history} onRerun={onRerun} compact />
      </div>
    </div>
  )
}

function ToggleIcon({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'flex size-8 items-center justify-center rounded-lg transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle ? (
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  )
}

function SavedView({
  saved,
  onRun,
  onRemove,
}: {
  saved: SavedSearch[]
  onRun: (s: SavedSearch) => void
  onRemove: (id: string) => void
}) {
  return (
    <Panel
      title="Saved Searches"
      subtitle="Quickly rerun the queries you care about."
    >
      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <Bookmark className="size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">
            No saved searches
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Save a search from the results view to pin it here.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {saved.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <BookmarkCheck className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm text-foreground">
                  {s.query}
                </p>
                <p className="font-mono text-[11px] capitalize text-muted-foreground">
                  {s.mode}
                </p>
              </div>
              <Button size="sm" className="h-8" onClick={() => onRun(s)}>
                Run
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-muted-foreground"
                onClick={() => onRemove(s.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </Panel>
  )
}

function ApiView() {
  const snippet = `curl https://api.tracelink.dev/v1/search \\
  -H "Authorization: Bearer tl_live_••••••••••••" \\
  -d query="alex.morgan" \\
  -d mode="username"`
  return (
    <Panel
      title="API"
      subtitle="Integrate TraceLink searches directly into your pipeline."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">API Key</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use this key to authenticate requests. Keep it secret.
          </p>
          <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
            <code className="truncate font-mono text-xs text-foreground">
              tl_live_9f2c7a1e8b4d3f6021ce
            </code>
            <span className="rounded-md bg-success/15 px-2 py-0.5 font-mono text-[10px] text-success">
              ACTIVE
            </span>
          </div>
          <Button variant="outline" size="sm" className="mt-4 h-9">
            Rotate key
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Example request
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A basic search over the REST endpoint.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground/90">
            {snippet}
          </pre>
        </div>
      </div>
    </Panel>
  )
}

function SettingsView() {
  const rows = [
    { label: 'Purge search history automatically', value: 'After 30 days' },
    { label: 'Default search mode', value: 'Username' },
    { label: 'Results per platform', value: 'Best match' },
    { label: 'Two-factor authentication', value: 'Enabled' },
  ]
  return (
    <Panel title="Settings" subtitle="Manage your workspace preferences.">
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <span className="text-sm text-foreground">{row.label}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  )
}