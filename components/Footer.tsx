import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-[#0a0a0a] text-white">
      {/* Red separator line */}
      <div className="h-1 bg-[#C41E2E]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Logo + info */}
          <div>
            <div className="mb-2">
              <div className="relative h-40 w-70 mb-0">
                <Image
                  src="/logo.png"
                  alt="OZ Truck Trailer TP/BTP"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="text-gray-400 text-sm font-medium">OZ Truck Trailer TP/BTP</div>
            </div>
            <p className="text-gray-400 text-sm mb-2 leading-relaxed">
              Votre spécialiste en vente, location et réparation de matériel TP et transport en Loire-Atlantique.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C41E2E] shrink-0 mt-0.5" />
                <span>8 Allée Du Foirail<br />44110 Châteaubriant</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C41E2E] shrink-0" />
                <a href="tel:0244051090" className="hover:text-white transition-colors">02 44 05 10 90</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C41E2E] shrink-0" />
                <a href="mailto:oz-truck-trailer@outlook.com" className="hover:text-white transition-colors text-xs break-all">
                  oz-truck-trailer@outlook.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-4 pb-2 border-b border-gray-700">
              Nos Produits
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/produits/remorques-semi-remorques" className="hover:text-[#C41E2E] transition-colors">Remorques & Semi-Remorques</Link></li>
              <li><Link href="/produits/remorques-semi-remorques/benne-tp" className="hover:text-[#C41E2E] transition-colors">Bennes TP</Link></li>
              <li><Link href="/produits/remorques-semi-remorques/plateau" className="hover:text-[#C41E2E] transition-colors">Plateaux</Link></li>
              <li><Link href="/produits/remorques-semi-remorques/porte-container" className="hover:text-[#C41E2E] transition-colors">Porte-Containers</Link></li>
              <li><Link href="/produits/materiel-tp" className="hover:text-[#C41E2E] transition-colors">Matériel TP/BTP</Link></li>
              <li><Link href="/produits/materiel-tp/mini-pelle" className="hover:text-[#C41E2E] transition-colors">Mini-Pelles</Link></li>
              <li><Link href="/produits/materiel-tp/pelle-a-chenille" className="hover:text-[#C41E2E] transition-colors">Pelles à Chenilles</Link></li>
              <li><Link href="/produits/materiel-tp/tractopelle" className="hover:text-[#C41E2E] transition-colors">Tractopelles</Link></li>
              <li><Link href="/produits/poids-lourds" className="hover:text-[#C41E2E] transition-colors">Poids-Lourds</Link></li>
              <li><Link href="/produits/occasions" className="hover:text-[#C41E2E] transition-colors">Occasions</Link></li>
              <li><Link href="/produits/pieces-detachees" className="hover:text-[#C41E2E] transition-colors">Pièces Détachées</Link></li>
              <li>
                <Link href="/produits" className="text-[#C41E2E] font-semibold hover:underline">
                  → Tous nos produits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & Company */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-4 pb-2 border-b border-gray-700">
              Services & Entreprise
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li><Link href="/services/entretien" className="hover:text-[#C41E2E] transition-colors">Entretien</Link></li>
              <li><Link href="/services/reparation" className="hover:text-[#C41E2E] transition-colors">Réparation</Link></li>
              <li><Link href="/entreprise/a-propos" className="hover:text-[#C41E2E] transition-colors">À Propos De Nous</Link></li>
              <li><Link href="/entreprise/notre-entreprise" className="hover:text-[#C41E2E] transition-colors">Notre Entreprise</Link></li>
              <li><Link href="/entreprise/actualites" className="hover:text-[#C41E2E] transition-colors">Actualités & Nouveautés</Link></li>
              <li><Link href="/photos-videos" className="hover:text-[#C41E2E] transition-colors">Photos & Vidéos</Link></li>
              <li><Link href="/ventes-realisees" className="hover:text-[#C41E2E] transition-colors">Ventes Réalisées</Link></li>
              <li><Link href="/contact" className="hover:text-[#C41E2E] transition-colors">Contact</Link></li>
            </ul>

            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-3">Horaires</h4>
            <div className="text-sm text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Lun - Ven:</span>
                <span>8h00 - 18h00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi:</span>
                <span>8h00 - 12h00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche:</span>
                <span className="text-red-400">Fermé</span>
              </div>
            </div>
          </div>

          {/* Column 4: Social + Partners */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-4 pb-2 border-b border-gray-700">
              Suivez-Nous
            </h3>
            <div className="flex gap-3 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-[#1877F2] rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-[#E4405F] rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-[#0A66C2] rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-[#FF0000] rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-3">Nos Partenaires</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="bg-gray-800 rounded px-3 py-2 font-medium text-white">Hidromek</div>
              <div className="bg-gray-800 rounded px-3 py-2 font-medium text-white">Eurocomach</div>
              <div className="bg-gray-800 rounded px-3 py-2 font-medium text-white">Scorpion Trailer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="text-center sm:px-3 py-3 text-xs text-gray-500">
          <span>© {currentYear} OZ Truck Trailer TP/BTP. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  )
}
