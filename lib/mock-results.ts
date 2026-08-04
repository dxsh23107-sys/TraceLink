import { platforms, type Platform } from '@/lib/platforms'

export interface ProfileResult {
  id: string
  platform: Platform
  username: string
  displayName: string
  followers: number
  bio: string
  location: string
  country: string
  joinDate: string
  website: string
  status: 'active' | 'inactive'
  verified: boolean
}

const bios = [
  'Building tools for the open web. Coffee-driven.',
  'Security researcher focused on public-data intelligence.',
  'Full-stack engineer. Open source contributor.',
  'Writing about systems, data, and design.',
  'ML practitioner exploring language models.',
  'Product-minded developer. Ex-founder.',
  'Infrastructure and reliability enthusiast.',
  'Designing calm, useful software.',
]

const places = [
  { city: 'San Francisco, US', country: 'United States' },
  { city: 'Berlin, DE', country: 'Germany' },
  { city: 'Bengaluru, IN', country: 'India' },
  { city: 'London, UK', country: 'United Kingdom' },
  { city: 'Toronto, CA', country: 'Canada' },
  { city: 'Amsterdam, NL', country: 'Netherlands' },
  { city: 'Sydney, AU', country: 'Australia' },
  { city: 'Tokyo, JP', country: 'Japan' },
]

const names = [
  'Alex Morgan',
  'Jordan Lee',
  'Sam Rivera',
  'Taylor Quinn',
  'Casey Brooks',
  'Riley Chen',
  'Morgan Diaz',
  'Jamie Park',
]

// Deterministic pseudo-random so results are stable per query.
function seeded(seed: number) {
  let x = seed
  return () => {
    x = (x * 1103515245 + 12345) & 0x7fffffff
    return x / 0x7fffffff
  }
}

function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h) + 7
}

export function generateResults(query: string): ProfileResult[] {
  const clean = query.trim() || 'user'
  const rand = seeded(hash(clean))
  const base = clean.replace(/[^a-z0-9._]/gi, '').toLowerCase() || 'user'
  const handle = base.split('@')[0] || 'user'

  // A subset of platforms "match" for this query.
  const count = 6 + Math.floor(rand() * 7)
  const pool = [...platforms].sort(() => rand() - 0.5).slice(0, count)

  return pool.map((platform, i) => {
    const place = places[Math.floor(rand() * places.length)]
    return {
      id: `${platform.id}-${i}`,
      platform,
      username: `${handle}${rand() > 0.6 ? Math.floor(rand() * 90 + 10) : ''}`,
      displayName: names[Math.floor(rand() * names.length)],
      followers: Math.floor(rand() * 48000),
      bio: bios[Math.floor(rand() * bios.length)],
      location: place.city,
      country: place.country,
      joinDate: `${2013 + Math.floor(rand() * 11)}`,
      website: `${handle}.dev`,
      status: rand() > 0.25 ? 'active' : 'inactive',
      verified: rand() > 0.55,
    }
  })
}

export const countries = Array.from(new Set(places.map((p) => p.country))).sort()
