'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, X, Menu, ChevronDown, Phone } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import SearchBar from './SearchBar'
import MegaMenu from './MegaMenu'

interface DropdownItem {
  label: string
  href: string
}

function NavDropdown({ label, items }: { label: string; items: DropdownItem[] }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  return (
    <div
      className="relative"
      onMouseEnter={() => { clearTimeout(timeoutRef.current); setOpen(true) }}
      onMouseLeave={() => { timeoutRef.current = setTimeout(() => setOpen(false), 150) }}
    >
      <button
        className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-[#C41E2E] dark:hover:text-[#C41E2E] font-bold transition-colors py-2"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute top-full left-0 mt-1 min-w-[220px] bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg z-50 mega-menu ${open ? 'mega-menu-visible' : 'mega-menu-hidden'}`}>
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="block px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#C41E2E] text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#C41E2E] text-white text-xs py-1.5 px-4 hidden md:flex justify-between items-center">
        <span>8 Allée Du Foirail, 44110 Châteaubriant</span>
        <div className="flex items-center gap-4">
          <a href="tel:0244051090" className="flex items-center gap-1 hover:text-gray-200 transition-colors">
            <Phone className="w-3 h-3" />
            02 44 05 10 90
          </a>
          <a href="mailto:oz-truck-trailer@outlook.com" className="hover:text-gray-200 transition-colors">
            oz-truck-trailer@outlook.com
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-8xl mx-auto px-4 sm:px-20">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="relative h-20 w-60 sm:h-80 sm:w-80 lg:h-80 lg:w-80">
                <Image
                  src="/logo.png"
                  alt="OZ Truck Trailer TP/BTP"
                  fill
                  className="object-contain object-left"
                  priority
                  onError={() => {}}
                />
              </div>
              <span className="sr-only">OZ Truck Trailer TP/BTP</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8 text-xl">
              <Link
                href="/"
                className={`font-bold transition-colors py-2 ${isActive('/') ? 'text-[#C41E2E]' : 'text-gray-700 dark:text-gray-200 hover:text-[#C41E2E] dark:hover:text-[#C41E2E]'}`}
              >
                Accueil
              </Link>

              <MegaMenu />

              <NavDropdown
                label="Entretien & Réparation"
                items={[
                  { label: 'Entretien', href: '/services/entretien' },
                  { label: 'Réparation', href: '/services/reparation' },
                ]}
              />

              <NavDropdown
                label="Entreprise"
                items={[
                  { label: 'À Propos De Nous', href: '/entreprise/a-propos' },
                  { label: 'Notre Entreprise', href: '/entreprise/notre-entreprise' },
                  { label: 'Actualités Et Nouveautés', href: '/entreprise/actualites' },
                ]}
              />

              <Link
                href="/contact"
                className={`font-bold transition-colors py-2 ${isActive('/contact') ? 'text-[#C41E2E]' : 'text-gray-700 dark:text-gray-200 hover:text-[#C41E2E] dark:hover:text-[#C41E2E]'}`}
              >
                Contact
              </Link>

              <Link
                href="/photos-videos"
                className={`font-bold transition-colors py-2 ${isActive('/photos-videos') ? 'text-[#C41E2E]' : 'text-gray-700 dark:text-gray-200 hover:text-[#C41E2E] dark:hover:text-[#C41E2E]'}`}
              >
                Photos & Vidéos
              </Link>

              <Link
                href="/ventes-realisees"
                className={`font-bold transition-colors py-2 whitespace-nowrap ${isActive('/ventes-realisees') ? 'text-[#C41E2E]' : 'text-gray-700 dark:text-gray-200 hover:text-[#C41E2E] dark:hover:text-[#C41E2E]'}`}
              >
                Ventes Réalisées
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#C41E2E] transition-colors"
                aria-label="Rechercher"
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center text-gray-700 dark:text-gray-200"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-1">
              <Link href="/" className="block py-2 text-gray-700 dark:text-gray-200 font-medium" onClick={() => setMobileOpen(false)}>
                Accueil
              </Link>

              {/* Produits mobile */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-200 font-medium"
                  onClick={() => setMobileExpanded(mobileExpanded === 'produits' ? null : 'produits')}
                >
                  Nos Produits
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'produits' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'produits' && (
                  <div className="pl-4 space-y-1 pb-2">
                    <Link href="/produits" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Tous nos produits</Link>
                    <Link href="/produits/materiel-tp" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Matériel TP</Link>
                    <Link href="/produits/remorques-semi-remorques" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Remorques & Semi-Remorques</Link>
                    <Link href="/produits/poids-lourds" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Poids-Lourds</Link>
                    <Link href="/produits/machines" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Machines</Link>
                    <Link href="/produits/occasions" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Occasions</Link>
                  </div>
                )}
              </div>

              {/* Services mobile */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-200 font-medium"
                  onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                >
                  Entretien & Réparation
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'services' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'services' && (
                  <div className="pl-4 space-y-1 pb-2">
                    <Link href="/services/entretien" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Entretien</Link>
                    <Link href="/services/reparation" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Réparation</Link>
                  </div>
                )}
              </div>

              {/* Entreprise mobile */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-200 font-medium"
                  onClick={() => setMobileExpanded(mobileExpanded === 'entreprise' ? null : 'entreprise')}
                >
                  Entreprise
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'entreprise' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'entreprise' && (
                  <div className="pl-4 space-y-1 pb-2">
                    <Link href="/entreprise/a-propos" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>À Propos</Link>
                    <Link href="/entreprise/notre-entreprise" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Notre Entreprise</Link>
                    <Link href="/entreprise/actualites" className="block py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#C41E2E]" onClick={() => setMobileOpen(false)}>Actualités</Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-200 font-medium" onClick={() => setMobileOpen(false)}>Contact</Link>
              <Link href="/photos-videos" className="block py-2 text-gray-700 dark:text-gray-200 font-medium" onClick={() => setMobileOpen(false)}>Photos & Vidéos</Link>
              <Link href="/ventes-realisees" className="block py-2 text-gray-700 dark:text-gray-200 font-medium" onClick={() => setMobileOpen(false)}>Ventes Réalisées</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </>
  )
}
