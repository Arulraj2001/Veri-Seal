import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Percent, Building2, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceTvaEngine } from '@/components/international/FranceTvaEngine';

export const metadata: Metadata = {
  title: 'Calculateur TVA 2026 & Numéro TVA Intracommunautaire | Kagazo',
  description:
    'Calculez facilement la TVA en France (20%, 10%, 5,5%, 2,1%) de HT à TTC ou de TTC à HT. Générez automatiquement votre numéro de TVA intracommunautaire depuis votre SIREN.',
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-tva-francaise`,
  },
  openGraph: {
    title: 'Calculateur TVA 2026 & Numéro TVA Intracommunautaire | Kagazo France',
    description:
      'Calculateur gratuit de TVA française (HT vers TTC et inversement) et générateur officiel de clé de TVA intracommunautaire.',
    url: `${SITE_URL}/fr/calculateur-tva-francaise`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function TvaPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculateur TVA France et Clé Intracommunautaire',
    applicationCategory: 'BusinessApplication',
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
      'Calculateur officiel des taux de TVA en France (20%, 10%, 5.5%, 2.1%) et algorithme de calcul de numéro de TVA intracommunautaire.',
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
          <span>Code Général des Impôts • Articles 278 et suivants • Algorithme TVA UE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Calculateur TVA Française (HT &harr; TTC) &amp; Numéro Intracommunautaire
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Convertissez instantanément vos montants Hors Taxes (HT) en Toutes Taxes Comprises (TTC) ou inversement selon les quatre taux légaux en vigueur en France métropolitaine, et calculez la clé officielle de votre numéro de TVA intracommunautaire à partir de votre numéro SIREN.
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceTvaEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Percent className="w-5 h-5" />
            <span>Les 4 taux de TVA applicables en France</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            • <strong>Taux normal (20%)</strong> : s&apos;applique par défaut à la majorité des ventes de biens et prestations de services.<br />
            • <strong>Taux intermédiaire (10%)</strong> : restauration sur place, hôtellerie, transports et certains travaux de rénovation de logements.<br />
            • <strong>Taux réduit (5,5%)</strong> : produits alimentaires de première nécessité, livres, énergie (abonnement gaz/électricité).<br />
            • <strong>Taux particulier (2,1%)</strong> : médicaments remboursables par la sécurité sociale et publications de presse.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Building2 className="w-5 h-5" />
            <span>Calcul du numéro de TVA intracommunautaire</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pour commercer avec un client ou fournisseur au sein de l&apos;Union européenne, une entreprise française dispose d&apos;un identifiant fiscal unique constitué de <code>FR</code>, d&apos;une clé de 2 chiffres, et de son SIREN (9 chiffres). La clé mathématique se calcule selon la formule légale : <code>Clé = [12 + 3 × (SIREN modulo 97)] modulo 97</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
