import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Clock, BookOpen, Calculator } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceHeuresDecimalesEngine } from '@/components/international/FranceHeuresDecimalesEngine';

export const metadata: Metadata = {
  title: 'Convertisseur Heures Minutes en Heures Décimales (Centièmes) | Kagazo',
  description:
    'Convertissez facilement vos heures et minutes en heures décimales (centièmes d\'heure) pour le calcul de paie, facturation horaire et déclarations de temps.',
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-duree-travail-heures-decimales`,
  },
  openGraph: {
    title: 'Convertisseur Heures Minutes en Heures Décimales | Kagazo France',
    description:
      'Tableau et convertisseur officiel centièmes d\'heure pour bulletins de paie et factures d\'honoraires.',
    url: `${SITE_URL}/fr/calculateur-duree-travail-heures-decimales`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function HeuresDecimalesPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Convertisseur Heures Minutes en Décimales France',
    applicationCategory: 'UtilitiesApplication',
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
      'Outil de conversion instantanée entre heures/minutes sexagésimales et heures décimales (base 100) pour la gestion de paie et du temps de travail.',
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
          <span>Norme Gestion de Paie • Conversion Base 60 / Base 100</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Convertisseur Heures:Minutes en Heures Décimales (Centièmes)
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Les logiciels de comptabilité et les bulletins de paie n&apos;utilisent pas le format d&apos;heure classique (base 60), mais le format centésimal (base 100). Convertissez précisément vos heures et minutes en décimales pour calculer un salaire ou une facture sans erreur d&apos;arrondi.
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceHeuresDecimalesEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Clock className="w-5 h-5" />
            <span>Tableau des équivalences usuelles minutes / centièmes</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            • 15 minutes = 0,25 heure (quart d&apos;heure)<br />
            • 30 minutes = 0,50 heure (demi-heure)<br />
            • 45 minutes = 0,75 heure (trois quarts d&apos;heure)<br />
            • 35 heures standard = 35,00 h | 39 heures = 39,00 h<br />
            • 151,67 heures / mois = 151h 40min (durée mensuelle légale 35h)
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Calculator className="w-5 h-5" />
            <span>Formule mathématique de conversion</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pour transformer des minutes en centièmes : divisez simplement le nombre de minutes par 60. Par exemple : 35 heures et 18 minutes = <code>35 + (18 / 60) = 35,30 heures</code>. Multipliez ensuite ce chiffre décimal par votre taux horaire brut pour obtenir votre rémunération exacte.
          </p>
        </div>
      </div>
    </div>
  );
}
