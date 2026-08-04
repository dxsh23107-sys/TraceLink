export type PlatformCategory = 'developer' | 'social' | 'public'

export interface Platform {
  id: string
  name: string
  /** Short mark shown inside the monogram badge */
  mark: string
  /** Accent color used for the badge */
  color: string
  category: PlatformCategory
}

export const platforms: Platform[] = [
  { id: 'github', name: 'GitHub', mark: 'Gh', color: '#8b95a5', category: 'developer' },
  { id: 'gitlab', name: 'GitLab', mark: 'Gl', color: '#f97316', category: 'developer' },
  { id: 'linkedin', name: 'LinkedIn', mark: 'In', color: '#3b82f6', category: 'social' },
  { id: 'reddit', name: 'Reddit', mark: 'Rd', color: '#f97316', category: 'social' },
  { id: 'instagram', name: 'Instagram', mark: 'Ig', color: '#ec4899', category: 'social' },
  { id: 'youtube', name: 'YouTube', mark: 'Yt', color: '#ef4444', category: 'social' },
  { id: 'discord', name: 'Discord', mark: 'Dc', color: '#818cf8', category: 'social' },
  { id: 'telegram', name: 'Telegram', mark: 'Tg', color: '#38bdf8', category: 'social' },
  { id: 'leetcode', name: 'LeetCode', mark: 'Lc', color: '#eab308', category: 'developer' },
  { id: 'hackerrank', name: 'HackerRank', mark: 'Hr', color: '#22c55e', category: 'developer' },
  { id: 'kaggle', name: 'Kaggle', mark: 'Kg', color: '#38bdf8', category: 'developer' },
  { id: 'stackoverflow', name: 'Stack Overflow', mark: 'So', color: '#f97316', category: 'developer' },
  { id: 'medium', name: 'Medium', mark: 'Md', color: '#e5e7eb', category: 'social' },
  { id: 'hashnode', name: 'Hashnode', mark: 'Hn', color: '#3b82f6', category: 'social' },
  { id: 'huggingface', name: 'Hugging Face', mark: 'Hf', color: '#eab308', category: 'developer' },
  { id: 'dockerhub', name: 'Docker Hub', mark: 'Dk', color: '#38bdf8', category: 'developer' },
  { id: 'pypi', name: 'PyPI', mark: 'Py', color: '#60a5fa', category: 'public' },
  { id: 'npm', name: 'npm', mark: 'Np', color: '#ef4444', category: 'public' },
]

export const platformMap: Record<string, Platform> = Object.fromEntries(
  platforms.map((p) => [p.id, p]),
)
