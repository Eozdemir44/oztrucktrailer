'use client'

import { useState, useEffect } from 'react'
import AdminGuard from '@/components/AdminGuard'
import AdminSidebar from '@/components/AdminSidebar'
import { useCMS } from '@/context/CMSContext'
import { SiteSettings } from '@/lib/types'
import { getSettings } from '@/lib/data'
import { Save, Plus, X, Eye, EyeOff, AlertTriangle, Download, Upload } from 'lucide-react'

function ParametresContent() {
  const { settings, updateSettings, resetData } = useCMS()
  const [form, setForm] = useState<SiteSettings>(settings)
  const [saved, setSaved] = useState(false)
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdMsg, setPwdMsg] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [heroImgUrl, setHeroImgUrl] = useState('')
  const [resetConfirm, setResetConfirm] = useState(false)
  const [resetFinal, setResetFinal] = useState(false)

  useEffect(() => {
    setForm(settings)
  }, [settings])

  const handleSave = () => {
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChangePwd = () => {
    if (oldPwd !== settings.adminPassword) {
      setPwdMsg('Ancien mot de passe incorrect')
      return
    }
    if (newPwd.length < 6) {
      setPwdMsg('Le nouveau mot de passe doit faire au moins 6 caractères')
      return
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg('Les nouveaux mots de passe ne correspondent pas')
      return
    }
    updateSettings({ adminPassword: newPwd })
    setPwdMsg('Mot de passe modifié avec succès !')
    setOldPwd(''); setNewPwd(''); setConfirmPwd('')
  }

  const addHeroImage = () => {
    if (heroImgUrl.trim()) {
      setForm(f => ({ ...f, heroImages: [...f.heroImages, heroImgUrl.trim()], heroTitles: [...f.heroTitles, ''] }))
      setHeroImgUrl('')
    }
  }

  const removeHeroImage = (i: number) => {
    setForm(f => ({
      ...f,
      heroImages: f.heroImages.filter((_, idx) => idx !== i),
      heroTitles: f.heroTitles.filter((_, idx) => idx !== i),
    }))
  }

  const handleExport = () => {
    const data = {
      products: localStorage.getItem('ozt_products'),
      news: localStorage.getItem('ozt_news'),
      media: localStorage.getItem('ozt_media'),
      sales: localStorage.getItem('ozt_sales'),
      settings: localStorage.getItem('ozt_settings'),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `oz-truck-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (data.products) localStorage.setItem('ozt_products', data.products)
        if (data.news) localStorage.setItem('ozt_news', data.news)
        if (data.media) localStorage.setItem('ozt_media', data.media)
        if (data.sales) localStorage.setItem('ozt_sales', data.sales)
        if (data.settings) localStorage.setItem('ozt_settings', data.settings)
        window.location.reload()
      } catch {
        alert('Fichier JSON invalide')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (!resetFinal) { setResetFinal(true); return }
    resetData()
    setResetConfirm(false)
    setResetFinal(false)
    alert('Données réinitialisées !')
    window.location.reload()
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Configuration du site</p>
      </div>

      <div className="space-y-8">
        {/* Hero images */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Images du Slider Héro</h2>
          <div className="space-y-3 mb-4">
            {form.heroImages.map((img, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={img} alt="" className="w-16 h-10 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <input value={img} onChange={e => setForm(f => ({
                    ...f, heroImages: f.heroImages.map((x, idx) => idx === i ? e.target.value : x)
                  }))}
                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#C41E2E]" />
                  <input value={form.heroTitles[i] ?? ''} placeholder="Titre du slide"
                    onChange={e => setForm(f => ({
                      ...f, heroTitles: f.heroTitles.map((x, idx) => idx === i ? e.target.value : x)
                    }))}
                    className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#C41E2E] mt-1" />
                </div>
                <button onClick={() => removeHeroImage(i)} className="text-red-400 hover:text-red-600 shrink-0"><X className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
          {form.heroImages.length < 5 && (
            <div className="flex gap-2">
              <input value={heroImgUrl} onChange={e => setHeroImgUrl(e.target.value)} placeholder="URL de la nouvelle image"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#C41E2E]" />
              <button onClick={addHeroImage} className="flex items-center gap-1 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600">
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
          )}
        </section>

        {/* Welcome texts */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Textes Page Accueil</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre principal</label>
              <input value={form.homeWelcomeTitle} onChange={e => setForm(f => ({ ...f, homeWelcomeTitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Texte d'accueil</label>
              <textarea value={form.homeWelcomeText} onChange={e => setForm(f => ({ ...f, homeWelcomeText: e.target.value }))} rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E] resize-none" />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">À Propos</h2>
          <textarea value={form.aboutText} onChange={e => setForm(f => ({ ...f, aboutText: e.target.value }))} rows={8}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E] resize-none" />
        </section>

        {/* Social */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Réseaux Sociaux</h2>
          <div className="space-y-3">
            {[
              { key: 'socialFacebook', label: 'Facebook URL' },
              { key: 'socialInstagram', label: 'Instagram URL' },
              { key: 'socialLinkedin', label: 'LinkedIn URL' },
              { key: 'socialYoutube', label: 'YouTube URL' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                <input
                  value={form[key as keyof SiteSettings] as string}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Save button */}
        <button onClick={handleSave}
          className={`flex items-center gap-2 font-bold px-8 py-3 rounded-lg transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-[#C41E2E] hover:bg-[#a01824] text-white'}`}>
          <Save className="w-5 h-5" />
          {saved ? 'Sauvegardé !' : 'Sauvegarder les modifications'}
        </button>

        {/* Password change */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Changer le Mot de Passe Admin</h2>
          <div className="space-y-3 max-w-sm">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ancien mot de passe</label>
              <input type={showPwd ? 'text' : 'password'} value={oldPwd} onChange={e => setOldPwd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nouveau mot de passe</label>
              <input type={showPwd ? 'text' : 'password'} value={newPwd} onChange={e => setNewPwd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmer le nouveau mot de passe</label>
              <input type={showPwd ? 'text' : 'password'} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPwd ? 'Masquer' : 'Afficher'} les mots de passe
            </button>
            {pwdMsg && (
              <p className={`text-sm font-medium ${pwdMsg.includes('succès') ? 'text-green-500' : 'text-red-500'}`}>{pwdMsg}</p>
            )}
            <button onClick={handleChangePwd} className="bg-gray-800 dark:bg-gray-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-700 transition-colors text-sm">
              Modifier le mot de passe
            </button>
          </div>
        </section>

        {/* Export/Import */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Export / Import Données</h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleExport}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              <Download className="w-4 h-4" /> Exporter JSON
            </button>
            <label className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm cursor-pointer">
              <Upload className="w-4 h-4" /> Importer JSON
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </section>

        {/* Reset */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-red-200 dark:border-red-900">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="font-bold text-red-600 dark:text-red-400">Zone Dangereuse</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Réinitialiser toutes les données aux valeurs par défaut. Cette action est irréversible.
          </p>
          {!resetConfirm ? (
            <button onClick={() => setResetConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              Réinitialiser les données
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-red-600 font-medium text-sm">
                {resetFinal ? 'Cliquez encore une fois pour confirmer définitivement' : 'Êtes-vous sûr ? Cliquez pour confirmer.'}
              </p>
              <div className="flex gap-2">
                <button onClick={handleReset}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-lg text-sm">
                  {resetFinal ? 'Confirmer définitivement' : 'Oui, réinitialiser'}
                </button>
                <button onClick={() => { setResetConfirm(false); setResetFinal(false) }}
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-lg text-sm">
                  Annuler
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default function AdminParametresPage() {
  return (
    <AdminGuard>
      <div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto"><ParametresContent /></div>
      </div>
    </AdminGuard>
  )
}
