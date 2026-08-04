import type { ProfileResult } from '@/lib/mock-results'

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function flatten(results: ProfileResult[]) {
  return results.map((r) => ({
    platform: r.platform.name,
    username: r.username,
    displayName: r.displayName,
    followers: r.followers,
    bio: r.bio,
    location: r.location,
    country: r.country,
    joinDate: r.joinDate,
    website: r.website,
    status: r.status,
    verified: r.verified,
  }))
}

export function exportCSV(results: ProfileResult[], query: string) {
  const rows = flatten(results)
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const escape = (v: unknown) => `"${String(v).replace(/"/g, '""')}"`
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((h) => escape((row as Record<string, unknown>)[h])).join(',')),
  ].join('\n')
  download(`tracelink-${query || 'results'}.csv`, csv, 'text/csv')
}

export function exportJSON(results: ProfileResult[], query: string) {
  const data = JSON.stringify(
    { query, generatedAt: new Date().toISOString(), results: flatten(results) },
    null,
    2,
  )
  download(`tracelink-${query || 'results'}.json`, data, 'application/json')
}

export function exportPDF(results: ProfileResult[], query: string) {
  const rows = flatten(results)
  const win = window.open('', '_blank')
  if (!win) return
  const body = rows
    .map(
      (r) => `
      <tr>
        <td>${r.platform}</td>
        <td>@${r.username}</td>
        <td>${r.displayName}</td>
        <td>${r.followers}</td>
        <td>${r.location}</td>
        <td>${r.status}</td>
      </tr>`,
    )
    .join('')
  win.document.write(`
    <html>
      <head>
        <title>TraceLink Report — ${query}</title>
        <style>
          body { font-family: ui-sans-serif, system-ui, sans-serif; padding: 32px; color: #111; }
          h1 { font-size: 20px; margin: 0 0 4px; }
          p { color: #555; margin: 0 0 24px; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #ddd; }
          th { background: #f3f4f6; }
        </style>
      </head>
      <body>
        <h1>TraceLink Report</h1>
        <p>Query: ${query || 'n/a'} · ${rows.length} results · ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr><th>Platform</th><th>Username</th><th>Name</th><th>Followers</th><th>Location</th><th>Status</th></tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
        <script>window.onload = () => window.print()</script>
      </body>
    </html>
  `)
  win.document.close()
}
