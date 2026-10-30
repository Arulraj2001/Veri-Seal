import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Landmark, Home, Info } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceNotaireEngine } from '@/components/international/FranceNotaireEngine';

export const metadata: Metadata = {
  title: 'Calculateur Frais de Notaire Immobilier 2026 | Kagazo',
  description:
    'Calculez précisément les frais d\'acquisition immobilière (frais de notaire) pour un achat dans l\'ancien (~7-8%) ou le neuf (~2-3%) selon le barème officiel réglementé.',
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-frais-de-notaire`,
  },
  openGraph: {
    title: 'Calculateur Frais de Notaire Immobilier 2026 | Kagazo France',
    description:
      'Simulateur précis des droits d\'enregistrement fiscaux, émoluments du notaire, TVA et débours selon le Décret n° 2016-230.',
    url: `${SITE_URL}/fr/calculateur-frais-de-notaire`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FraisNotairePage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Calculateur Frais de Notaire France 2026',
    category: 'RealEstateAcquisitionFees',
    feesAndCommissionsSpecification: 'Barème officiel réglementé décret n° 2016-230',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo France',
      url: SITE_URL,
    },
    description:
      'Calculateur officiel des frais d\'acte et droits de mutation immobiliers en France (ancien vs neuf/VEFA).',
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
          <span>Décret n° 2016-230 • Arrêté du 28 février 2020 • Barème Réglementé</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Calculateur de Frais de Notaire Immobilier 2026
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Lors de l&apos;achat d&apos;une maison ou d&apos;un appartement en France, les frais d&apos;acquisition (couramment appelés « frais de notaire ») s&apos;ajoutent au prix de vente. Obtenez une décomposition légale exacte : droits d&apos;enregistrement fiscaux reversés au département et à l&apos;État, émoluments réglementés de l&apos;officier public, débours et contribution de sécurité immobilière.
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceNotaireEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Landmark className="w-5 h-5" />
            <span>Pourquoi parle-t-on d&apos;impôts et non du notaire seul ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Contrairement à une idée répandue, environ <strong>80% de la somme versée</strong> au notaire constitue en réalité des taxes fiscales reversées au Trésor public (les droits de mutation à titre onéreux ou taxe de publicité foncière). La rémunération effective de l&apos;office notarial (émoluments proportionnels) ne représente qu&apos;environ 10% à 15% du total perçu.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Home className="w-5 h-5" />
            <span>Différence entre l&apos;immobilier ancien et le neuf (VEFA)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dans le logement neuf ou en Vente en l&apos;État Futur d&apos;Achèvement (VEFA), les frais d&apos;acte dits « frais de notaire réduits » s&apos;élèvent à seulement <strong>2% à 3% du prix</strong>, car la vente est déjà soumise à la TVA à 20% (incluse dans le prix promoteur). Dans l&apos;ancien, ils atteignent généralement <strong>7% à 8%</strong> du prix d&apos;acquisition.
          </p>
        </div>
      </div>
    </div>
  );
}
