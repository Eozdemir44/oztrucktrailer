import { Analytics } from './types'

const ANALYTICS_KEY = 'ozt_analytics'

export function getAnalytics(): Analytics {
  if (typeof window === 'undefined') return { pages: {} }
  const stored = localStorage.getItem(ANALYTICS_KEY)
  if (!stored) return { pages: {} }
  return JSON.parse(stored)
}

export function saveAnalytics(analytics: Analytics): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics))
}

export function trackPageVisit(page: string): void {
  if (typeof window === 'undefined') return
  const analytics = getAnalytics()
  if (!analytics.pages[page]) {
    analytics.pages[page] = []
  }
  analytics.pages[page].push(Date.now())
  // Keep only last 1000 visits per page
  if (analytics.pages[page].length > 1000) {
    analytics.pages[page] = analytics.pages[page].slice(-1000)
  }
  saveAnalytics(analytics)
}

export function getVisitCount(page: string): number {
  const analytics = getAnalytics()
  return analytics.pages[page]?.length ?? 0
}

export function getAllVisits(): number {
  const analytics = getAnalytics()
  return Object.values(analytics.pages).reduce((sum, visits) => sum + visits.length, 0)
}

export function getTodayVisits(): number {
  const analytics = getAnalytics()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTimestamp = today.getTime()
  return Object.values(analytics.pages)
    .flat()
    .filter(ts => ts >= todayTimestamp).length
}

export function getVisitsLast7Days(): Record<string, number> {
  const analytics = getAnalytics()
  const result: Record<string, number> = {}
  const now = Date.now()
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000

  for (const [page, timestamps] of Object.entries(analytics.pages)) {
    const count = timestamps.filter(ts => ts >= sevenDaysAgo).length
    if (count > 0) result[page] = count
  }
  return result
}

export function getPageVisitCounts(): { page: string; count: number }[] {
  const analytics = getAnalytics()
  return Object.entries(analytics.pages)
    .map(([page, visits]) => ({ page, count: visits.length }))
    .sort((a, b) => b.count - a.count)
}
