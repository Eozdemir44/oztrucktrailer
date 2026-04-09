'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, Newspaper, Image as ImageIcon,
  ShoppingBag, BarChart3, Settings, LogOut, Truck
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Produits', href: '/admin/produits', icon: Package },
  { label: 'Actualités', href: '/admin/actualites', icon: Newspaper },
  { label: 'Médias', href: '/admin/medias', icon: ImageIcon },
  { label: 'Ventes Réalisées', href: '/admin/ventes', icon: ShoppingBag },
  { label: 'Statistiques', href: '/admin/statistiques', icon: BarChart3 },
  { label: 'Paramètres', href: '/admin/parametres', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ozt_auth')
    }
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-[#C41E2E] rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">OZ Truck Trailer</div>
            <div className="text-xs text-gray-400">Administration</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-[#C41E2E] text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm"
          target="_blank"
        >
          <Truck className="w-5 h-5" />
          Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
