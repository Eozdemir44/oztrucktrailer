'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import AdminGuard from '@/components/AdminGuard'
import AdminSidebar from '@/components/AdminSidebar'
import { useCMS } from '@/context/CMSContext'
import { getAllVisits, getTodayVisits, getPageVisitCounts } from '@/lib/analytics'
import { Package, Newspaper, ShoppingBag, Eye, Plus, BarChart3 } from 'lucide-react'

function DashboardContent() {
  const { products, news, sales } = useCMS()

  const totalProducts = products.length
  const publishedProducts = products.filter(p => p.published).length
  const totalSales = sales.length
  const totalVisits = getAllVisits()
  const todayVisits = getTodayVisits()
  const topPages = getPageVisitCounts().slice(0, 5)

  const stats = [
    { label: 'Total Produits', value: totalProducts, icon: Package, color: 'bg-blue-500' },
    { label: 'Produits Publiés', value: publishedProducts, icon: Package, color: 'bg-green-500' },
    { label: 'Ventes Réalisées', value: totalSales, icon: ShoppingBag, color: 'bg-purple-500' },
    { label: 'Total Visites', value: totalVisits, icon: Eye, color: 'bg-[#C41E2E]' },
    { label: "Visites Aujourd'hui", value: todayVisits, icon: BarChart3, color: 'bg-amber-500' },
    { label: 'Actualités', value: news.length, icon: Newspaper, color: 'bg-indigo-500' },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Bienvenue dans l'espace d'administration</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</span>
            </div>
            <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/produits"
              className="flex items-center gap-2 bg-[#C41E2E] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#a01824] transition-colors">
              <Plus className="w-4 h-4" /> Ajouter Produit
            </Link>
            <Link href="/admin/actualites"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
              <Plus className="w-4 h-4" /> Ajouter Actualité
            </Link>
            <Link href="/admin/medias"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" /> Ajouter Média
            </Link>
            <Link href="/admin/ventes"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
              <Plus className="w-4 h-4" /> Ajouter Vente
            </Link>
          </div>
        </div>

        {/* Top pages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Pages les Plus Visitées</h2>
          {topPages.length > 0 ? (
            <div className="space-y-3">
              {topPages.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300 text-sm truncate max-w-[70%]">{item.page}</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Aucune statistique disponible</p>
          )}
        </div>
      </div>

      {/* Recent products */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-white">Derniers Produits</h2>
          <Link href="/admin/produits" className="text-[#C41E2E] text-sm hover:underline">Voir tout</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Titre</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Marque</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map(p => (
                <tr key={p.id} className="border-t border-gray-50 dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-900 dark:text-white font-medium truncate max-w-xs">{p.title}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.brand}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.published ? 'Publié' : 'Masqué'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <DashboardContent />
        </div>
      </div>
    </AdminGuard>
  )
}
