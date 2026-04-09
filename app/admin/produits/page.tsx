'use client'

import { useState } from 'react'
import AdminGuard from '@/components/AdminGuard'
import AdminSidebar from '@/components/AdminSidebar'
import { useCMS } from '@/context/CMSContext'
import { Product } from '@/lib/types'
import { generateId, generateSlug } from '@/lib/data'
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Star } from 'lucide-react'

const categories = [
  { value: 'remorques-semi-remorques', label: 'Remorques & Semi-Remorques' },
  { value: 'materiel-tp', label: 'Matériel TP' },
  { value: 'poids-lourds', label: 'Poids-Lourds' },
  { value: 'machines', label: 'Machines' },
  { value: 'occasions', label: 'Occasions' },
  { value: 'pieces-detachees', label: 'Pièces Détachées' },
]

const subcategories: Record<string, string[]> = {
  'remorques-semi-remorques': ['remorque', 'semi-remorque', 'porte-voitures', 'porte-container', 'plateau', 'benne-tp', 'autres'],
  'materiel-tp': ['pelle-a-pneu', 'pelle-a-chenille', 'tractopelle', 'mini-pelle', 'chargeuse', 'chariot-telescopique', 'autres'],
  'poids-lourds': ['poids-lourds', 'utilitaires', 'vehicules', 'autres'],
  'machines': ['autres'],
  'occasions': ['autres'],
  'pieces-detachees': ['autres'],
}

const emptyProduct = {
  title: '', slug: '', category: 'materiel-tp', subcategory: 'mini-pelle',
  brand: '', description: '', price: '' as string | number,
  images: [] as string[], characteristics: [] as { key: string; value: string }[],
  published: true, featured: false,
}

function ProductModal({ product, onSave, onClose }: {
  product: Partial<Product> | null
  onSave: (data: Omit<Product, 'id' | 'createdAt'>) => void
  onClose: () => void
}) {
  const isEdit = !!product?.id
  const [form, setForm] = useState(product ? {
    ...product,
    price: product.price ?? '',
    images: product.images ?? [],
    characteristics: product.characteristics ?? [],
  } : { ...emptyProduct })
  const [imgUrl, setImgUrl] = useState('')
  const [charKey, setCharKey] = useState('')
  const [charVal, setCharVal] = useState('')

  const handleTitleChange = (title: string) => {
    setForm(f => ({ ...f, title, slug: generateSlug(title) }))
  }

  const addImage = () => {
    if (imgUrl.trim()) {
      setForm(f => ({ ...f, images: [...(f.images ?? []), imgUrl.trim()] }))
      setImgUrl('')
    }
  }

  const removeImage = (i: number) => {
    setForm(f => ({ ...f, images: (f.images ?? []).filter((_, idx) => idx !== i) }))
  }

  const addChar = () => {
    if (charKey.trim() && charVal.trim()) {
      setForm(f => ({ ...f, characteristics: [...(f.characteristics ?? []), { key: charKey, value: charVal }] }))
      setCharKey('')
      setCharVal('')
    }
  }

  const removeChar = (i: number) => {
    setForm(f => ({ ...f, characteristics: (f.characteristics ?? []).filter((_, idx) => idx !== i) }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.slice(0, 5 - (form.images?.length ?? 0)).forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setForm(f => ({ ...f, images: [...(f.images ?? []), ev.target?.result as string] }))
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title: form.title ?? '',
      slug: form.slug ?? generateSlug(form.title ?? ''),
      category: form.category ?? 'materiel-tp',
      subcategory: form.subcategory ?? '',
      brand: form.brand ?? '',
      description: form.description ?? '',
      price: form.price === '' ? null : Number(form.price),
      images: form.images ?? [],
      characteristics: form.characteristics ?? [],
      published: form.published ?? true,
      featured: form.featured ?? false,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl my-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isEdit ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre *</label>
              <input value={form.title ?? ''} onChange={e => handleTitleChange(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
              <input value={form.slug ?? ''} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marque *</label>
              <input value={form.brand ?? ''} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie *</label>
              <select value={form.category ?? ''} onChange={e => setForm(f => ({ ...f, category: e.target.value, subcategory: subcategories[e.target.value]?.[0] ?? '' }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]">
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sous-catégorie</label>
              <select value={form.subcategory ?? ''} onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]">
                {(subcategories[form.category ?? ''] ?? []).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prix (€) — vide = sur demande</label>
              <input type="number" value={form.price ?? ''} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C41E2E] resize-none" />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Images (max 5)</label>
            <div className="flex gap-2 mb-2">
              <input value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="URL de l'image"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none text-sm focus:ring-2 focus:ring-[#C41E2E]" />
              <button type="button" onClick={addImage} className="bg-[#C41E2E] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#a01824]">Ajouter</button>
            </div>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="text-sm text-gray-500 dark:text-gray-400 mb-2" />
            <div className="flex flex-wrap gap-2">
              {(form.images ?? []).map((img, i) => (
                <div key={i} className="relative w-20 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Characteristics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Caractéristiques</label>
            <div className="flex gap-2 mb-2">
              <input value={charKey} onChange={e => setCharKey(e.target.value)} placeholder="Clé (ex: Puissance)"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none text-sm focus:ring-2 focus:ring-[#C41E2E]" />
              <input value={charVal} onChange={e => setCharVal(e.target.value)} placeholder="Valeur (ex: 97 cv)"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none text-sm focus:ring-2 focus:ring-[#C41E2E]" />
              <button type="button" onClick={addChar} className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600">+</button>
            </div>
            <div className="space-y-1">
              {(form.characteristics ?? []).map((c, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded text-sm">
                  <span className="text-gray-700 dark:text-gray-300"><strong>{c.key}</strong>: {c.value}</span>
                  <button type="button" onClick={() => removeChar(i)} className="text-red-400 hover:text-red-600 ml-2 text-xs">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published ?? true} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                className="w-4 h-4 accent-[#C41E2E]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Publié</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured ?? false} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 accent-[#C41E2E]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Produit vedette</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 bg-[#C41E2E] text-white font-bold py-3 rounded-lg hover:bg-[#a01824] transition-colors">
              {isEdit ? 'Sauvegarder' : 'Ajouter le produit'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ProduitsContent() {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductPublished, toggleProductFeatured } = useCMS()
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleSave = (data: Omit<Product, 'id' | 'createdAt'>) => {
    if (modal === 'edit' && editProduct) {
      updateProduct(editProduct.id, data)
    } else {
      addProduct(data)
    }
    setModal(null)
    setEditProduct(null)
  }

  const handleEdit = (p: Product) => {
    setEditProduct(p)
    setModal('edit')
  }

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteProduct(id)
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Produits</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{products.length} produit{products.length > 1 ? 's' : ''} au total</p>
        </div>
        <button onClick={() => { setEditProduct(null); setModal('add') }}
          className="flex items-center gap-2 bg-[#C41E2E] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#a01824] transition-colors">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Titre</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Catégorie</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Marque</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Prix</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Statut</th>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-gray-900 dark:text-white font-medium max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{p.category}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.brand}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.price ? `${p.price}€` : 'Sur demande'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.published ? 'Publié' : 'Masqué'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleProductPublished(p.id)} title={p.published ? 'Masquer' : 'Publier'}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-amber-500 rounded">
                        {p.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => toggleProductFeatured(p.id)} title="Vedette"
                        className={`w-8 h-8 flex items-center justify-center rounded ${p.featured ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}>
                        <Star className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEdit(p)} title="Modifier"
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-500 rounded">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} title="Supprimer"
                        className={`w-8 h-8 flex items-center justify-center rounded ${deleteConfirm === p.id ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'}`}>
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

      {modal && (
        <ProductModal
          product={modal === 'edit' ? editProduct : null}
          onSave={handleSave}
          onClose={() => { setModal(null); setEditProduct(null) }}
        />
      )}
    </div>
  )
}

export default function AdminProduitsPage() {
  return (
    <AdminGuard>
      <div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <ProduitsContent />
        </div>
      </div>
    </AdminGuard>
  )
}
