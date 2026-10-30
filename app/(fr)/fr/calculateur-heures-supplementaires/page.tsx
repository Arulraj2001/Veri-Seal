import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Clock, Banknote, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceHeuresSuppEngine } from '@/components/international/FranceHeuresSuppEngine';

export const metadata: Metadata = {
  title: 'Calculateur Heures Supplémentaires (Loi TEPA & Déduction) | Kagazo',
  description:
    'Calculez la rémunération de vos heures supplémentaires (majorations de 25% et 50%), l\'allègement de cotisations salariales (11,31%) et l\'exonération d\'impôt sur le revenu.',
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-heures-supplementaires`,
  },
  openGraph: {
    title: 'Calculateur Heures Supplémentaires (Loi TEPA & Déduction) | Kagazo France',
    description:
      'Simulateur précis du gain net réel procuré par les heures supplémentaires selon le Code du travail et l\'Article 81 quater du CGI.',
    url: `${SITE_URL}/fr/calculateur-heures-supplementaires`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function HeuresSuppPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculateur Heures Supplémentaires France',
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
      'Calculateur officiel des heures supplémentaires avec majorations légales (25% et 50%), déduction forfaitaire de cotisations salariales et défiscalisation Loi TEPA.',
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
          <span>Code du travail • Article L. 3121-28 • Exonération Article 81 quater CGI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Calculateur d&apos;Heures Supplémentaires : Brut, Net &amp; Exonérations
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          En France, les heures accomplies au-delà de la durée légale de 35 heures hebdomadaires ouvrent droit à une majoration salariale obligatoire, à une réduction de charges sociales salariales (11,31%) et à une exonération d&apos;impôt sur le revenu dans la limite annuelle de 7 500 €.
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceHeuresSuppEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Clock className="w-5 h-5" />
            <span>Taux de majoration légaux en vigueur</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sauf accord de branche ou d&apos;entreprise prévoyant un taux dérogatoire (qui ne peut être inférieur à 10%) : les <strong>8 premières heures supplémentaires</strong> effectuées au cours d&apos;une semaine (de la 36e à la 43e heure incluse) sont majorées de <strong>25%</strong>. Les heures suivantes (à partir de la 44e heure) sont majorées de <strong>50%</strong>.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Banknote className="w-5 h-5" />
            <span>Exonération d&apos;impôt sur le revenu (Loi TEPA)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            La rémunération perçue au titre des heures supplémentaires ou complémentaires est totalement <strong>exonérée d&apos;impôt sur le revenu</strong> jusqu&apos;à <strong>7 500 € par an</strong>. De plus, elle bénéficie d&apos;une réduction de cotisations de sécurité sociale d&apos;environ 11,31%, ce qui permet au salarié de percevoir un montant net très proche de son montant brut.
          </p>
        </div>
      </div>
    </div>
  );
}
