import type { Metadata } from 'next'
import { Dashboard } from '@/components/dashboard/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard — TraceLink',
  description: 'Search public profiles across hundreds of platforms.',
}

export default function DashboardPage() {
  return <Dashboard />
}