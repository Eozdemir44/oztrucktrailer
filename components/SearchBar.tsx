'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useCMS } from '@/context/CMSContext'
import Link from 'next/link'

interface SearchBarProps {
  onClose?: () => void
  inline?: boolean
}

export default function SearchBar({ onClose, inline = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ type: string; id: string; title: string; url: string }[]>([])
  const [showResults, setShowResults] = useState(false)
  const { products, news } = useCMS()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setShowResults(false)
      return
    }

    const q = query.toLowerCase()
    const productResults = products
      .filter(p => p.published && (
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ))
      .slice(0, 5)
      .map(p => ({ type: 'Produit', id: p.id, title: p.title, url: `/produits/detail/${p.id}` }))

    const newsResults = news
      .filter(n => n.published && (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
      ))
      .slice(0, 3)
      .map(n => ({ type: 'Actualité', id: n.id, title: n.title, url: `/entreprise/actualites/${n.id}` }))

    setResults([...productResults, ...newsResults])
    setShowResults(true)
  }, [query, products, news])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(query.trim())}`)
      onClose?.()
    }
  }

  const handleResultClick = () => {
    setQuery('')
    setShowResults(false)
    onClose?.()
  }

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un produit, une marque..."
            className="flex-1 px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-[#C41E2E] hover:bg-[#a01824] text-white transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
            {results.map(r => (
              <Link
                key={r.id}
                href={r.url}
                onClick={handleResultClick}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xs bg-[#C41E2E] text-white px-2 py-0.5 rounded font-medium shrink-0">
                  {r.type}
                </span>
                <span className="text-gray-900 dark:text-white text-sm truncate">{r.title}</span>
              </Link>
            ))}
            <button
              onClick={() => {
                router.push(`/recherche?q=${encodeURIComponent(query.trim())}`)
                onClose?.()
              }}
              className="w-full px-4 py-3 text-sm text-[#C41E2E] hover:bg-gray-50 dark:hover:bg-gray-700 text-left border-t border-gray-200 dark:border-gray-700"
            >
              Voir tous les résultats pour "{query}"
            </button>
          </div>
        )}
      </form>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher un produit, une marque..."
              className="flex-1 mx-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-lg"
            />
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </form>
          {showResults && results.length > 0 && (
            <div>
              {results.map(r => (
                <Link
                  key={r.id}
                  href={r.url}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-xs bg-[#C41E2E] text-white px-2 py-0.5 rounded font-medium shrink-0">
                    {r.type}
                  </span>
                  <span className="text-gray-900 dark:text-white">{r.title}</span>
                </Link>
              ))}
            </div>
          )}
          {query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
              Aucun résultat pour "{query}"
            </div>
          )}
          {query.length < 2 && (
            <div className="px-4 py-4 text-sm text-gray-400">
              Saisissez au moins 2 caractères pour rechercher
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
