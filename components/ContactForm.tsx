'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const searchParams = useSearchParams()
  const sent = searchParams.get('sent') === 'true'

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Message envoyé !
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Nous avons bien reçu votre message et vous répondrons dans les meilleurs délais.
        </p>
      </div>
    )
  }

  return (
    <form
      action="https://formsubmit.co/oz-truck-trailer@outlook.com"
      method="POST"
      className="space-y-5"
    >
      <input type="hidden" name="_subject" value="Nouveau message - OZ Truck Trailer" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/contact?sent=true` : '/contact?sent=true'} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nom <span className="text-[#C41E2E]">*</span>
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C41E2E] focus:border-transparent outline-none transition-colors"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prénom <span className="text-[#C41E2E]">*</span>
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C41E2E] focus:border-transparent outline-none transition-colors"
            placeholder="Votre prénom"
          />
        </div>
      </div>

      <div>
        <label htmlFor="raison_sociale" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Raison Sociale
        </label>
        <input
          type="text"
          id="raison_sociale"
          name="raison_sociale"
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C41E2E] focus:border-transparent outline-none transition-colors"
          placeholder="Nom de votre entreprise (facultatif)"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            N° Téléphone
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C41E2E] focus:border-transparent outline-none transition-colors"
            placeholder="0X XX XX XX XX"
          />
        </div>
        <div>
          <label htmlFor="ville" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ville <span className="text-[#C41E2E]">*</span>
          </label>
          <input
            type="text"
            id="ville"
            name="ville"
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C41E2E] focus:border-transparent outline-none transition-colors"
            placeholder="Votre ville"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email <span className="text-[#C41E2E]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C41E2E] focus:border-transparent outline-none transition-colors"
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message <span className="text-[#C41E2E]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C41E2E] focus:border-transparent outline-none transition-colors resize-none"
          placeholder="Décrivez votre demande, le matériel recherché, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#C41E2E] hover:bg-[#a01824] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
      >
        Envoyer le message
      </button>

      <p className="text-xs text-gray-400 text-center">
        * Champs obligatoires. Vos données sont utilisées uniquement pour vous répondre.
      </p>
    </form>
  )
}
