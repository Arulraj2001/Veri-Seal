import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Briefcase, FileCheck } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceFinCddEngine } from '@/components/international/FranceFinCddEngine';

export const metadata: Metadata = {
  title: 'Calcul Prime de Précarité & Fin de CDD 2026 | Kagazo',
  description:
    'Calculez votre indemnité de fin de contrat CDD (prime de précarité de 10%) et votre indemnité de congés payés selon l\'Article L. 1243-8 du Code du travail.',
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-indemnite-fin-cdd`,
  },
  openGraph: {
    title: 'Calcul Prime de Précarité & Fin de CDD 2026 | Kagazo France',
    description:
      'Simulateur gratuit d\'indemnité de fin de CDD et solde de tout compte conforme au droit du travail français.',
    url: `${SITE_URL}/fr/calculateur-indemnite-fin-cdd`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FinCddPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculateur Prime de Précarité et Fin de CDD France',
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
      'Calculateur officiel de la prime de fin de contrat CDD (10%) et des indemnités compensatrices de congés payés selon le Code du travail.',
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
          <span>Code du travail • Article L. 1243-8 • Solde de tout compte</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Calculateur de Prime de Précarité &amp; Fin de CDD 2026
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          À l&apos;échéance d&apos;un contrat à durée déterminée (CDD), le salarié a droit à une indemnité de fin de contrat destinée à compenser la précarité de sa situation. Calculez exactement le montant brut de votre prime de précarité (10%) et de vos congés payés restants.
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceFinCddEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Briefcase className="w-5 h-5" />
            <span>Comment est calculée la prime de précarité ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            L&apos;indemnité légale s&apos;élève à <strong>10% de la rémunération brute totale</strong> perçue par le salarié durant toute l&apos;exécution du contrat CDD (salaires de base, primes, heures supplémentaires et majorations incluses). Une convention collective de branche peut parfois prévoir un taux réduit à 6% en contrepartie d&apos;un accès privilégié à la formation professionnelle.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <FileCheck className="w-5 h-5" />
            <span>Dans quels cas la prime n&apos;est-elle pas due ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            La prime de fin de CDD n&apos;est pas versée si : le contrat est immédiatement transformé en CDI, en cas de démission anticipée du salarié, en cas de faute grave ou lourde, pour les contrats saisonniers ou conclus dans le cadre d&apos;un emploi d&apos;usage constant, ou pour les contrats d&apos;apprentissage ou de professionnalisation.
          </p>
        </div>
      </div>
    </div>
  );
}
