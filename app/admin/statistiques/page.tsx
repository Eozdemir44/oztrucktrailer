'use client'

import { useState, useEffect } from 'react'
import AdminGuard from '@/components/AdminGuard'
import AdminSidebar from '@/components/AdminSidebar'
import { getAllVisits, getTodayVisits, getPageVisitCounts, getVisitsLast7Days } from '@/lib/analytics'
import { BarChart3, Eye, TrendingUp, Globe } from 'lucide-react'

function StatistiquesContent() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    pages: [] as { page: string; count: number }[],
    last7: {} as Record<string, number>,
  })

  useEffect(() => {
    setStats({
      total: getAllVisits(),
      today: getTodayVisits(),
      pages: getPageVisitCounts(),
      last7: getVisitsLast7Days(),
    })
  }, [])

  const maxVisits = Math.max(...stats.pages.map(p => p.count), 1)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Statistiques</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Données de visites du site</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Visites', value: stats.total, icon: Eye, color: 'bg-[#C41E2E]' },
          { label: "Visites Aujourd'hui", value: stats.today, icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Pages Suivies', value: stats.pages.length, icon: Globe, color: 'bg-blue-500' },
          { label: 'Page Top', value: stats.pages[0]?.count ?? 0, icon: BarChart3, color: 'bg-amber-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      {stats.pages.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Visites par Page</h2>
          <div className="space-y-3">
            {stats.pages.slice(0, 15).map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-gray-600 dark:text-gray-300 text-sm w-48 truncate shrink-0">{item.page}</span>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full bg-[#C41E2E] rounded-full transition-all duration-500"
                    style={{ width: `${(item.count / maxVisits) * 100}%` }}
                  />
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-sm w-8 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white">Détail des Visites</h2>
        </div>
        {stats.pages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Page</th>
                  <th className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 font-medium">Nb. Visites</th>
                  <th className="px-4 py-3 text-right text-gray-600 dark:text-gray-400 font-medium">% du total</th>
                </tr>
              </thead>
              <tbody>
                {stats.pages.map((item, i) => (
                  <tr key={i} className="border-t border-gray-50 dark:border-gray-700">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{item.page}</td>
                    <td className="px-4 py-3 text-right text-gray-900 dark:text-white font-bold">{item.count}</td>
                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                      {stats.total > 0 ? `${((item.count / stats.total) * 100).toFixed(1)}%` : '0%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-3" />
            <p>Aucune statistique disponible pour le moment.</p>
            <p className="text-sm mt-1">Visitez les pages du site pour commencer à collecter des données.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminStatistiquesPage() {
  return (
    <AdminGuard>
      <div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto"><StatistiquesContent /></div>
      </div>
    </AdminGuard>
  )
}
