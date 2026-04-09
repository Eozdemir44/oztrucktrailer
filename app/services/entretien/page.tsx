'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCMS } from '@/context/CMSContext'
import { CheckCircle, Wrench, Phone } from 'lucide-react'

const prestations = [
  'Vidange moteur et filtres',
  'Contrôle et remplacement du système de freinage',
  'Vérification et remplacement des pneumatiques',
  'Contrôle du système électrique',
  'Vérification et entretien du système hydraulique',
  'Contrôle des niveaux (huile, liquide de frein, liquide refroidissement)',
  'Graissage et lubrification des articulations',
  'Contrôle des éclairages et signalisations',
  'Vérification des attelages et sellettes',
  'Contrôle des lames de suspension',
  'Vérification des systèmes de levage',
  'Nettoyage haute pression',
  'Contrôle avant passage au contrôle technique',
  'Remplacement filtres à air',
  'Vérification courroies et chaînes',
]

export default function EntretienPage() {
  const { trackVisit } = useCMS()

  useEffect(() => {
    trackVisit('services/entretien')
  }, [trackVisit])

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <div className="bg-[#C41E2E] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-9 h-9" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Entretien</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Service d'entretien complet pour vos remorques, semi-remorques, engins TP et poids lourds
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Prestations */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Nos Prestations d'Entretien
            </h2>
            <div className="w-16 h-1 bg-[#C41E2E] mb-8" />
            <div className="space-y-3">
              {prestations.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#C41E2E] shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info + CTA */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Pourquoi entretenir régulièrement votre matériel ?
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                {[
                  'Prolonger la durée de vie de vos équipements',
                  'Réduire les coûts de réparation à long terme',
                  'Garantir la sécurité sur les chantiers et la route',
                  'Maintenir les performances optimales',
                  'Respecter les obligations légales de contrôle',
                  'Préserver la valeur de revente',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C41E2E] font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#C41E2E] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-3">Prendre Rendez-vous</h3>
              <p className="text-red-100 mb-5">
                Contactez notre atelier pour planifier l'entretien de votre matériel. Nos techniciens qualifiés sont à votre service.
              </p>
              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-white text-[#C41E2E] hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Demander un rendez-vous
                </Link>
                <a
                  href="tel:0244051090"
                  className="flex items-center justify-center gap-2 w-full border-2 border-white text-white hover:bg-white hover:text-[#C41E2E] font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  02 44 05 10 90
                </a>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-sm text-gray-600 dark:text-gray-300">
              <p className="font-bold text-gray-900 dark:text-white mb-2">Horaires de l'atelier :</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi :</span>
                  <span className="font-medium">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi :</span>
                  <span className="font-medium">8h00 - 12h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche :</span>
                  <span className="text-red-500 font-medium">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
