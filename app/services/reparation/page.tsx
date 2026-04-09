'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCMS } from '@/context/CMSContext'
import { CheckCircle, Settings, Phone, Clock } from 'lucide-react'

const prestations = [
  { cat: 'Mécanique', items: ['Réparation moteur', 'Boîte de vitesses', 'Pont et transmission', 'Système d\'embrayage', 'Direction et freinage'] },
  { cat: 'Carrosserie', items: ['Réparation de bennes', 'Réfection de plateau', 'Soudure et tôlerie', 'Remplacement hayons', 'Réparation essieux'] },
  { cat: 'Hydraulique', items: ['Réparation vérins', 'Remplacement flexibles', 'Pompes hydrauliques', 'Distributeurs', 'Vérins de levage'] },
  { cat: 'Électricité', items: ['Diagnostic électronique', 'Réparation faisceau', 'Éclairage réglementaire', 'Systèmes ABS/EBS', 'Climatisation'] },
]

export default function ReparationPage() {
  const { trackVisit } = useCMS()

  useEffect(() => {
    trackVisit('services/reparation')
  }, [trackVisit])

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <div className="bg-[#C41E2E] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="w-9 h-9" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Réparation</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Atelier de réparation spécialisé pour vos remorques, semi-remorques, engins TP et poids lourds
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Urgency banner */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5 mb-10 flex items-center gap-4">
          <Clock className="w-10 h-10 text-amber-500 shrink-0" />
          <div>
            <p className="font-bold text-amber-800 dark:text-amber-300">Dépannage Urgent ?</p>
            <p className="text-amber-700 dark:text-amber-400 text-sm">
              Contactez-nous au <a href="tel:0244051090" className="font-bold underline">02 44 05 10 90</a> — Nous faisons notre maximum pour intervenir rapidement.
            </p>
          </div>
        </div>

        {/* Prestations grid */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Nos Prestations de Réparation
        </h2>
        <div className="w-16 h-1 bg-[#C41E2E] mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {prestations.map((cat, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#C41E2E] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </span>
                {cat.cat}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#C41E2E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#C41E2E] rounded-2xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">Votre Matériel est en Panne ?</h2>
          <p className="text-red-100 text-lg mb-6 max-w-xl mx-auto">
            Notre équipe de techniciens qualifiés est à votre disposition pour diagnostiquer et réparer vos équipements rapidement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#C41E2E] hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Demander un diagnostic
            </Link>
            <a
              href="tel:0244051090"
              className="flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#C41E2E] font-bold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              02 44 05 10 90
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
