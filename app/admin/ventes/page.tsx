'use client'

import { useState } from 'react'
import AdminGuard from '@/components/AdminGuard'
import AdminSidebar from '@/components/AdminSidebar'
import { useCMS } from '@/context/CMSContext'
import { SaleItem } from '@/lib/types'
import { generateSlug } from '@/lib/data'
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react'

function SaleModal({ item, onSave, onClose }: {
  item: SaleItem | null
  onSave: (data: Omit<SaleItem, 'id'>) => void
  onClose: () => void
}) {
  const { id: _id, ...itemWithoutId } = item ?? {} as SaleItem
  const [form, setForm] = useState<Omit<SaleItem, 'id'>>(item ? itemWithoutId : {
    slug: '', title: '', description: '', images: [], productName: '',
    date: new Date().toISOString().split('T')[0], location: '', published: true,
  })
  const [imgUrl, setImgUrl] = useState('')

  const addImage = () => {
    if (imgUrl.trim()) {
      setForm(f => ({ ...f, images: [...f.images, imgUrl.trim()] }))
      setImgUrl('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...form, slug: form.slug || generateSlug(form.title) })
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {item?.id ? 'Modifier' : 'Ajouter'} une vente
          </h2>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Produit vendu</label>
              <input value={form.productName} onChange={e => setForm(f => ({ ...f, productName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lieu</label>
            <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Images</label>
            <div className="flex gap-2 mb-2">
              <input value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="URL image"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none text-sm focus:ring-2 focus:ring-[#C41E2E]" />
              <button type="button" onClick={addImage} className="bg-[#C41E2E] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#a01824]">+</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.images.map((img, i) => (
                <div key={i} className="relative w-20 h-14 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))}
                    className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">×</button>
                </div>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#C41E2E]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Publié</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 bg-[#C41E2E] text-white font-bold py-3 rounded-lg hover:bg-[#a01824]">Sauvegarder</button>
            <button type="button" onClick={onClose} className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function VentesContent() {
  const { sales, addSale, updateSale, deleteSale, toggleSalePublished } = useCMS()
  const [modal, setModal] = useState(false)
  const [editItem, setEditItem] = useState<SaleItem | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleSave = (data: Omit<SaleItem, 'id'>) => {
    if (editItem?.id) {
      updateSale(editItem.id, data)
    } else {
      addSale(data)
    }
    setModal(false)
    setEditItem(null)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ventes Réalisées</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{sales.length} vente{sales.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => { setEditItem(null); setModal(true) }}
          className="flex items-center gap-2 bg-[#C41E2E] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#a01824]">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Titre</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Produit</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Lieu</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Date</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Statut</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id} className="border-t border-gray-50 dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-900 dark:text-white font-medium max-w-xs truncate">{s.title}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{s.productName}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{s.location}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{new Date(s.date).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.published ? 'Publié' : 'Masqué'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleSalePublished(s.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-amber-500 rounded">
                        {s.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => { setEditItem(s); setModal(true) }}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-500 rounded">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => {
                        if (deleteConfirm === s.id) { deleteSale(s.id); setDeleteConfirm(null) }
                        else setDeleteConfirm(s.id)
                      }}
                        className={`w-8 h-8 flex items-center justify-center rounded ${deleteConfirm === s.id ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && <SaleModal item={editItem} onSave={handleSave} onClose={() => { setModal(false); setEditItem(null) }} />}
    </div>
  )
}

export default function AdminVentesPage() {
  return (
    <AdminGuard>
      <div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto"><VentesContent /></div>
      </div>
    </AdminGuard>
  )
}
