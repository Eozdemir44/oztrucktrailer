'use client'

import { useState } from 'react'
import Image from 'next/image'
import AdminGuard from '@/components/AdminGuard'
import AdminSidebar from '@/components/AdminSidebar'
import { useCMS } from '@/context/CMSContext'
import { MediaItem } from '@/lib/types'
import { generateSlug } from '@/lib/data'
import { Plus, Trash2, X, Play } from 'lucide-react'

function MediaModal({ onSave, onClose }: {
  onSave: (data: Omit<MediaItem, 'id'>) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Omit<MediaItem, 'id'>>({
    slug: '', title: '', type: 'photo', url: '', thumbnail: '', description: '',
    date: new Date().toISOString().split('T')[0], published: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...form, slug: form.slug || generateSlug(form.title), thumbnail: form.thumbnail || form.url })
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ajouter un média</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre *</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: generateSlug(e.target.value) }))} required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'photo' | 'video' }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]">
                <option value="photo">Photo</option>
                <option value="video">Vidéo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {form.type === 'video' ? 'URL YouTube ou vidéo *' : 'URL Image *'}
            </label>
            <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} required
              placeholder={form.type === 'video' ? 'https://youtube.com/watch?v=...' : 'https://...'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
          </div>
          {form.type === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Miniature (URL)</label>
              <input value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))} placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E] resize-none" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#C41E2E]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Publié</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 bg-[#C41E2E] text-white font-bold py-3 rounded-lg hover:bg-[#a01824]">Ajouter</button>
            <button type="button" onClick={onClose} className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function MediasContent() {
  const { media, addMedia, deleteMedia } = useCMS()
  const [modal, setModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleSave = (data: Omit<MediaItem, 'id'>) => {
    addMedia(data)
    setModal(false)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Médias</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{media.length} média{media.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-[#C41E2E] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#a01824]">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {media.map(m => (
          <div key={m.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 group">
            <div className="relative h-36 bg-gray-100 dark:bg-gray-700">
              {m.thumbnail || m.type === 'photo' ? (
                <Image src={m.thumbnail || m.url} alt={m.title} fill className="object-cover" sizes="200px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.type === 'video' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}`}>
                  {m.type === 'video' ? 'Vidéo' : 'Photo'}
                </span>
              </div>
            </div>
            <div className="p-3">
              <p className="text-gray-900 dark:text-white text-xs font-medium truncate mb-2">{m.title}</p>
              <button
                onClick={() => {
                  if (deleteConfirm === m.id) { deleteMedia(m.id); setDeleteConfirm(null) }
                  else setDeleteConfirm(m.id)
                }}
                className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  deleteConfirm === m.id
                    ? 'bg-red-500 text-white'
                    : 'bg-red-50 text-red-500 hover:bg-red-100'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                {deleteConfirm === m.id ? 'Confirmer' : 'Supprimer'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && <MediaModal onSave={handleSave} onClose={() => setModal(false)} />}
    </div>
  )
}

export default function AdminMediasPage() {
  return (
    <AdminGuard>
      <div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto"><MediasContent /></div>
      </div>
    </AdminGuard>
  )
}
