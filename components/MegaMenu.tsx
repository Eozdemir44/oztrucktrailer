'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface SubMenuItem {
  label: string
  href: string
}

interface MenuItem {
  label: string
  href?: string
  children?: {
    label: string
    href?: string
    items?: SubMenuItem[]
  }[]
}

const navItems: MenuItem[] = [
  {
    label: 'Nos Produits',
    children: [
      {
        label: 'Remorques et Semi-Remorques',
        items: [
          { label: 'Remorque', href: '/produits/remorques-semi-remorques/remorque' },
          { label: 'Semi-Remorque', href: '/produits/remorques-semi-remorques/semi-remorque' },
          { label: 'Porte-Voitures', href: '/produits/remorques-semi-remorques/porte-voitures' },
          { label: 'Porte-Container', href: '/produits/remorques-semi-remorques/porte-container' },
          { label: 'Plateau', href: '/produits/remorques-semi-remorques/plateau' },
          { label: 'Benne TP', href: '/produits/remorques-semi-remorques/benne-tp' },
          { label: 'Autres', href: '/produits/remorques-semi-remorques/autres' },
        ],
      },
      {
        label: 'Matériel De TP',
        items: [
          { label: 'Pelle À Pneu', href: '/produits/materiel-tp/pelle-a-pneu' },
          { label: 'Pelle À Chenille', href: '/produits/materiel-tp/pelle-a-chenille' },
          { label: 'Tractopelle', href: '/produits/materiel-tp/tractopelle' },
          { label: 'Mini-Pelle', href: '/produits/materiel-tp/mini-pelle' },
          { label: 'Chargeuse', href: '/produits/materiel-tp/chargeuse' },
          { label: 'Chariot Télescopique', href: '/produits/materiel-tp/chariot-telescopique' },
          { label: 'Autres', href: '/produits/materiel-tp/autres' },
          { label: 'Tous Les Produits', href: '/produits/materiel-tp' },
        ],
      },
      {
        label: 'Poids-Lourds, Utilitaires & Autres',
        items: [
          { label: 'Poids-Lourds', href: '/produits/poids-lourds/poids-lourds' },
          { label: 'Utilitaires', href: '/produits/poids-lourds/utilitaires' },
          { label: 'Véhicules', href: '/produits/poids-lourds/vehicules' },
          { label: 'Autres', href: '/produits/poids-lourds/autres' },
          { label: 'Tous Les Produits', href: '/produits/poids-lourds' },
        ],
      },
      {
        label: 'Autres Catégories',
        items: [
          { label: 'Machines', href: '/produits/machines' },
          { label: 'Occasions', href: '/produits/occasions' },
          { label: 'Pièces Détachées', href: '/produits/pieces-detachees' },
          { label: 'Tous Nos Produits', href: '/produits' },
        ],
      },
    ],
  },
]

export default function MegaMenu() {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-[#C41E2E] dark:hover:text-[#C41E2E] font-bold transition-colors py-2"
        onClick={() => setOpen(!open)}
      >
        Nos Produits
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[900px] max-w-[95vw] bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-xl z-50 mega-menu ${open ? 'mega-menu-visible' : 'mega-menu-hidden'}`}>
        <div className="grid grid-cols-4 gap-0 p-6">
          {navItems[0].children?.map((section, si) => (
            <div key={si} className={`${si < 3 ? 'border-r border-gray-100 dark:border-gray-700 pr-4 mr-4' : ''}`}>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                {section.label}
              </h3>
              <ul className="space-y-1">
                {section.items?.map((item, ii) => (
                  <li key={ii}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-[#C41E2E] dark:hover:text-[#C41E2E] text-sm py-1 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <ChevronRight className="w-3 h-3 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          <Link
            href="/produits"
            className="text-[#C41E2E] font-semibold text-sm hover:underline"
            onClick={() => setOpen(false)}
          >
            → Voir tous nos produits
          </Link>
        </div>
      </div>
    </div>
  )
}
