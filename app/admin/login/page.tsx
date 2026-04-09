'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Truck } from 'lucide-react'
import { getSettings } from '@/lib/data'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('ozt_auth') === 'true') {
      router.replace('/admin')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const settings = getSettings()
    if (password === settings.adminPassword) {
      localStorage.setItem('ozt_auth', 'true')
      router.push('/admin')
    } else {
      setError('Mot de passe incorrect')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#C41E2E] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Truck className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">OZ Truck Trailer</h1>
          <p className="text-gray-400 text-sm mt-1">Espace Administration</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#C41E2E]/10 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#C41E2E]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Connexion</h2>
              <p className="text-gray-500 text-sm">Accès réservé aux administrateurs</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#C41E2E] focus:border-transparent outline-none pr-12"
                  placeholder="Votre mot de passe admin"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C41E2E] hover:bg-[#a01824] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            Osvschtbrt
          </p>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          <a href="/" className="hover:text-white transition-colors">← Retour au site</a>
        </p>
      </div>
    </div>
  )
}
