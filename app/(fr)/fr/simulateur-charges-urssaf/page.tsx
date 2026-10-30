import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceUrssafEngine } from '@/components/international/FranceUrssafEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simulateur Charges URSSAF Auto-Entrepreneur 2026 | Calcul Net',
  description:
    'Calculez exactement vos cotisations sociales URSSAF et votre revenu net en micro-entreprise en 2026. Taux BIC, BNC, ACRE et versement libératoire.',
  keywords: [
    'simulateur charges urssaf auto entrepreneur',
    'calcul cotisations micro entreprise 2026',
    'calcul salaire net auto entrepreneur',
    'taux cotisations bnc urssaf 2026',
    'versement liberatoire impot auto entrepreneur',
    'seuil tva franchise auto entrepreneur',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-charges-urssaf`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/simulateur-charges-urssaf`,
      'fr': `${SITE_URL}/fr/simulateur-charges-urssaf`,
      'x-default': `${SITE_URL}/fr/simulateur-charges-urssaf`,
    },
  },
  openGraph: {
    title: 'Simulateur Charges URSSAF Auto-Entrepreneur 2026 | Calcul Net',
    description:
      'Calculez vos charges URSSAF et votre revenu net réel en micro-entreprise. Simulation officielle 2026.',
    url: `${SITE_URL}/fr/simulateur-charges-urssaf`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FranceUrssafPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Simulateur de Charges URSSAF Auto-Entrepreneur 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Simulateur officiel de calcul des cotisations sociales URSSAF, de la contribution à la formation professionnelle et du versement libératoire de l’impôt sur le revenu pour auto-entrepreneurs.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quels sont les taux de cotisations sociales URSSAF en 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En 2026, les taux forfaitaires de cotisations sociales s’élèvent à : 12,3% pour l’achat et la revente de marchandises (BIC), 21,2% pour les prestations de services commerciales ou artisanales (BIC) et 23,1% pour les professions libérales non réglementées et réglementées relevant de la CIPAV ou du régime général (BNC).',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne l’exonération ACRE la première année ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L’Aide à la Création ou à la Reprise d’Entreprise (ACRE) accorde une réduction de 50% sur le taux de vos cotisations sociales URSSAF pendant les 4 premiers trimestres d’activité sous condition de revenus inférieurs au plafond annuel de la sécurité sociale (PASS).',
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
          <span className="text-slate-900 font-bold">Simulateur Charges URSSAF</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Barème Officiel URSSAF & Code de la Sécurité Sociale 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Simulateur de Charges URSSAF Micro-Entrepreneur
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Estimez précisément le montant de vos cotisations sociales mensuelles ou trimestrielles,
            votre versement libératoire fiscal et votre bénéfice net réel dans la poche.
          </p>
        </div>

        {/* Google AI Overview / Featured Snippet 45-Word Answer Capsule */}
        <div className="bg-blue-50/60 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-2xl text-slate-900 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Calcul Express des Charges Auto-Entrepreneur
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Le revenu net d’un auto-entrepreneur correspond à son chiffre d’affaires hors taxes diminué des cotisations
            URSSAF (12,3% en vente, 21,2% en services BIC, 23,1% en BNC libéral), de la contribution à la formation
            professionnelle (0,1% à 0,2%) et de l’impôt libératoire (1% à 2,2%).
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceUrssafEngine />

        {/* AdSense Placement Slot 1 */}
        <div className="w-full border border-dashed border-slate-200 bg-slate-50/40 rounded-2xl py-8 text-center">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Emplacement Publicitaire
          </span>
        </div>

        {/* Statutory Reference Table */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Plafonds de Chiffre d'Affaires et Taux de Cotisations 2026
            </h2>
            <p className="text-sm text-slate-600">
              Synthèse des seuils fiscaux et sociaux applicables au régime de la micro-entreprise en France.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Secteur d'Activité</th>
                  <th className="py-3 px-4 font-mono">Taux URSSAF</th>
                  <th className="py-3 px-4 font-mono">Versement Libératoire</th>
                  <th className="py-3 px-4 font-mono">Franchise TVA</th>
                  <th className="py-3 px-4 font-mono">Plafond Micro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Vente de marchandises (BIC)</td>
                  <td className="py-3 px-4 font-bold text-blue-600">12,30%</td>
                  <td className="py-3 px-4">1,00%</td>
                  <td className="py-3 px-4">85 000 €</td>
                  <td className="py-3 px-4 font-bold">188 700 €</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Prestations de services commerciales (BIC)</td>
                  <td className="py-3 px-4 font-bold text-blue-600">21,20%</td>
                  <td className="py-3 px-4">1,70%</td>
                  <td className="py-3 px-4">37 500 €</td>
                  <td className="py-3 px-4 font-bold">77 700 €</td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Professions libérales (BNC)</td>
                  <td className="py-3 px-4 font-bold text-blue-600">23,10%</td>
                  <td className="py-3 px-4">2,20%</td>
                  <td className="py-3 px-4">37 500 €</td>
                  <td className="py-3 px-4 font-bold">77 700 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-tool Navigation Pills */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Besoin d'émettre des factures conformes pour vos clients ?</h3>
            <p className="text-xs text-slate-400">
              Générez instantanément vos factures auto-entrepreneur avec mentions légales et dispense de TVA.
            </p>
          </div>
          <Link
            href="/fr/facture-auto-entrepreneur"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition-all shadow-md shrink-0"
          >
            <span>Facture Auto-Entrepreneur PDF</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
