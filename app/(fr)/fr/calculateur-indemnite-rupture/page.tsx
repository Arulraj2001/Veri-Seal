import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceRuptureEngine } from '@/components/international/FranceRuptureEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculateur Rupture Conventionnelle 2026 | Indemnité Légale',
  description:
    'Calculez le montant minimum légal de votre indemnité de rupture conventionnelle ou licenciement en 2026 selon le Code du travail. Barème officiel 1/4 et 1/3.',
  keywords: [
    'calculateur rupture conventionnelle',
    'calcul indemnite rupture conventionnelle 2026',
    'bareme indemnite licenciement code du travail',
    'simulation rupture conventionnelle cdi',
    'indemnite conges payes fin contrat',
    'fiscalite indemnite rupture conventionnelle',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-indemnite-rupture`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-indemnite-rupture`,
      'fr': `${SITE_URL}/fr/calculateur-indemnite-rupture`,
      'x-default': `${SITE_URL}/fr/calculateur-indemnite-rupture`,
    },
  },
  openGraph: {
    title: 'Calculateur Rupture Conventionnelle 2026 | Indemnité Légale',
    description:
      'Calculez le montant légal minimum de votre indemnité de rupture conventionnelle ou de licenciement selon les articles L1237-13 et R1234-2 du Code du travail.',
    url: `${SITE_URL}/fr/calculateur-indemnite-rupture`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FranceRupturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculateur Indemnité Rupture Conventionnelle 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Simulateur officiel de calcul d’indemnité spécifique de rupture conventionnelle et de licenciement selon le Code du travail français (Articles L.1237-13 et R.1234-2).',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la formule légale de calcul de l’indemnité de rupture conventionnelle ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L’indemnité légale ne peut être inférieure à : 1/4 de mois de salaire par année d’ancienneté pour les années jusqu’à 10 ans, et 1/3 de mois de salaire par année d’ancienneté pour les années au-delà de 10 ans. En cas d’année incomplète, le calcul s’effectue au prorata du nombre de mois complets.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment détermine-t-on le salaire brut de référence ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le salaire de référence retenu est le montant le plus avantageux pour le salarié entre la moyenne des 12 derniers mois de salaire brut précédant la rupture, ou la moyenne des 3 derniers mois (les primes annuelles ou exceptionnelles étant intégrées au prorata temporis).',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/fr" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculateur Rupture Conventionnelle</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Code du Travail (Articles L.1237-13 & R.1234-2)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Calculateur d'Indemnité de Rupture Conventionnelle
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Évaluez en quelques clics le montant légal plancher obligatoire de votre indemnité de rupture de CDI,
            majoré du solde de tout compte et de l'indemnité compensatrice de congés payés.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-blue-50/60 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Règle Légale de Calcul en France
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            L'indemnité légale de rupture conventionnelle équivaut au quart du salaire mensuel brut de référence
            par année d'ancienneté jusqu'à 10 ans, puis au tiers de mois par an au-delà de 10 ans, cumulée avec
            le paiement des congés payés non pris.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceRuptureEngine />

        {/* AdSense Placement Slot 1 */}
        <div className="w-full border border-dashed border-slate-200 bg-slate-50/40 rounded-2xl py-8 text-center">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Emplacement Publicitaire
          </span>
        </div>

        {/* Statutory Comparison Table */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Barème Légal de l'Indemnité de Licenciement et Rupture
            </h2>
            <p className="text-sm text-slate-600">
              Dispositions légales applicables à défaut de clause conventionnelle de branche plus avantageuse.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Tranche d'Ancienneté</th>
                  <th className="py-3 px-4 font-mono">Taux Légal Obligatoire</th>
                  <th className="py-3 px-4">Exonération Fiscale</th>
                  <th className="py-3 px-4">Éligibilité France Travail (Chômage)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Jusqu'à 10 ans d'ancienneté</td>
                  <td className="py-3 px-4 font-bold text-blue-600">1/4 de mois de salaire / an</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Oui (art. 80 duodecies CGI)</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Oui (ARE)</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Au-delà de 10 ans d'ancienneté</td>
                  <td className="py-3 px-4 font-bold text-blue-600">1/3 de mois de salaire / an</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Oui (art. 80 duodecies CGI)</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Oui (ARE)</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">Moins de 8 mois d'ancienneté</td>
                  <td className="py-3 px-4 text-slate-400">0 € (sauf convention plus favorable)</td>
                  <td className="py-3 px-4 font-sans text-slate-400">—</td>
                  <td className="py-3 px-4 font-sans text-emerald-600 font-bold">Oui</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">En recherche d'un nouveau contrat ou négociation de rémunération ?</h3>
            <p className="text-xs text-slate-400">
              Convertissez instantanément votre salaire brut en net mensuel après cotisations cadre/non-cadre et impôt à la source.
            </p>
          </div>
          <Link
            href="/fr/calculateur-salaire-net-brut"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Calculateur Salaire Brut Net</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
