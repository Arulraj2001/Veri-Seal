import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FrancePlusValueEngine } from '@/components/international/FrancePlusValueEngine';

export const metadata: Metadata = {
  title: 'Simulateur Plus-Value Immobilière & Abattements 2026 | Kagazo',
  description:
    'Calculez l\'impôt sur la plus-value immobilière (IR 19% et prélèvements sociaux 17,2%) selon la durée de détention et les abattements de l\'Article 150 VC du CGI.',
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-plus-value-immobiliere`,
  },
  openGraph: {
    title: 'Simulateur Plus-Value Immobilière & Abattements 2026 | Kagazo France',
    description:
      'Calcul précis de l\'impôt de plus-value immobilière lors de la vente d\'une résidence secondaire ou investissement locatif.',
    url: `${SITE_URL}/fr/simulateur-plus-value-immobiliere`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function PlusValueImmoPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Simulateur Plus-Value Immobilière France',
    category: 'CapitalGainsTax',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo France',
      url: SITE_URL,
    },
    description:
      'Simulateur fiscal de l\'impôt sur les plus-values immobilières des particuliers en France, abattements pour durée de détention et net vendeur en poche.',
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
          <span>Article 150 VC du Code Général des Impôts • Abattements officiels 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Simulateur de Plus-Value Immobilière &amp; Abattements
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Lors de la vente d&apos;un bien immobilier autre que votre résidence principale (résidence secondaire, investissement locatif, terrain), le gain réalisé est soumis à l&apos;impôt sur le revenu (19%) et aux prélèvements sociaux (17,2%). Calculez vos abattements par année de détention et votre montant net vendeur.
        </p>
      </div>

      {/* Interactive Engine */}
      <FrancePlusValueEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Calendar className="w-5 h-5" />
            <span>Quand intervient l&apos;exonération totale ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Le barème de dégressivité est double : l&apos;exonération de l&apos;<strong>Impôt sur le Revenu (19%)</strong> est totale après <strong>22 ans</strong> de détention révolus. En revanche, l&apos;exonération des <strong>prélèvements sociaux (17,2%)</strong> nécessite <strong>30 ans</strong> de détention complète. Entre la 22e et la 30e année, vous ne réglez donc que les prélèvements sociaux dégressifs.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <TrendingUp className="w-5 h-5" />
            <span>Majoration forfaitaire du prix d&apos;achat</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            La loi autorise le vendeur à majorer son prix d&apos;achat d&apos;origine de <strong>7,5% pour frais d&apos;acquisition</strong> (sans justificatif), et de <strong>15% au titre des travaux de rénovation</strong> si le logement est détenu depuis plus de 5 ans, réduisant mécaniquement la plus-value imposable.
          </p>
        </div>
      </div>
    </div>
  );
}
