import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Camera, CheckCircle2, FileCheck } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FrancePhotoAntsEngine } from '@/components/international/FrancePhotoAntsEngine';

export const metadata: Metadata = {
  title: 'Photo d\'Identité Biométrique ANTS 35×45mm Gratuite | Kagazo',
  description:
    'Créez et recadrez vos photos d\'identité biométriques 35x45 mm conformes aux normes ANTS pour carte d\'identité, passeport français ou permis de conduire.',
  alternates: {
    canonical: `${SITE_URL}/fr/photo-identite-passeport-ants`,
  },
  openGraph: {
    title: 'Photo d\'Identité Biométrique ANTS 35×45mm Gratuite | Kagazo France',
    description:
      'Générez une planche d\'impression 10x15 cm de 6 photos d\'identité conformes aux exigences du Ministère de l\'Intérieur et de l\'ANTS.',
    url: `${SITE_URL}/fr/photo-identite-passeport-ants`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function PhotoAntsPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Générateur Photo d\'Identité Biométrique ANTS France',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: {
      '@type': 'Organization',
      name: 'Kagazo France',
      url: SITE_URL,
    },
    description:
      'Outil en ligne gratuit de recadrage de photos d\'identité biométriques 35×45 mm aux normes officielles françaises ISO/IEC 19794-5.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-4 h-4" />
          <span>Norme ISO/IEC 19794-5 • Conforme ANTS &amp; Ministère de l&apos;Intérieur</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Photo d&apos;Identité Biométrique ANTS 35×45 mm en Ligne
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Recadrez facilement une photo prise depuis votre smartphone pour obtenir des clichés d&apos;identité parfaitement dimensionnés aux normes officielles françaises : 35 mm de large sur 45 mm de haut, hauteur du visage entre 32 et 36 mm, et export sur planche photo standard 10×15 cm prête à imprimer.
        </p>
      </div>

      {/* Interactive Engine */}
      <FrancePhotoAntsEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Camera className="w-5 h-5" />
            <span>Critères officiels de validation par la mairie et la préfecture</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pour être acceptée lors d&apos;une demande de Passeport, Carte Nationale d&apos;Identité (CNI) ou Permis de conduire : la photo doit être récente (moins de 6 mois), le fond doit être uni de couleur claire (gris clair ou bleu clair, le fond blanc pur est rejeté), le visage doit être dégagé (sans lunettes teintées, frange sur les yeux ou couvre-chef religieux), et l&apos;expression strictement neutre bouche fermée.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <FileCheck className="w-5 h-5" />
            <span>Confidentialité biométrique &amp; respect RGPD</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Vos photographies personnelles et traits de visage ne sont <strong>jamais transmis à aucun serveur externe</strong>. L&apos;ensemble des calculs de zoom, d&apos;ajustement et de découpage s&apos;exécute à 100% dans la mémoire locale de votre navigateur internet, garantissant une confidentialité totale de vos données d&apos;identité.
          </p>
        </div>
      </div>
    </div>
  );
}
