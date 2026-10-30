import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Landmark, Calculator, Percent } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FrancePretImmoEngine } from '@/components/international/FrancePretImmoEngine';

export const metadata: Metadata = {
  title: 'Simulateur Prêt Immobilier & Mensualité Crédit 2026 | Kagazo',
  description:
    'Calculez votre mensualité de crédit immobilier avec assurance emprunteur, le coût total des intérêts et le tableau d\'amortissement selon les taux 2026.',
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-pret-immobilier-mensualite`,
  },
  openGraph: {
    title: 'Simulateur Prêt Immobilier & Mensualité Crédit 2026 | Kagazo France',
    description:
      'Simulez vos mensualités de crédit immobilier et comparez le coût total des intérêts bancaires et de l\'assurance emprunteur.',
    url: `${SITE_URL}/fr/simulateur-pret-immobilier-mensualite`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function PretImmoPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Simulateur Prêt Immobilier France',
    category: 'MortgageLoan',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo France',
      url: SITE_URL,
    },
    description:
      'Simulateur financier de prêt immobilier à mensualité constante, calcul du TAEG, assurance emprunteur et coût total du crédit.',
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
          <span>Formule financière standard • Amortissement constant • TAEG &amp; Assurance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Simulateur de Prêt Immobilier &amp; Mensualité Crédit 2026
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Estimez en quelques secondes votre future mensualité d&apos;emprunt immobilier (capital + intérêts bancaires + cotisation d&apos;assurance de prêt), ainsi que le coût complet de l&apos;opération pour préparer votre dossier de financement auprès des banques ou courtiers.
        </p>
      </div>

      {/* Interactive Engine */}
      <FrancePretImmoEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Landmark className="w-5 h-5" />
            <span>Comment est calculée la mensualité constante ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            La formule standard appliquée par les établissements bancaires français est : <code>M = P × [r / (1 - (1+r)^-n)]</code>, où <em>P</em> est le capital emprunté, <em>r</em> le taux d&apos;intérêt proportionnel mensuel, et <em>n</em> le nombre total de mois d&apos;amortissement. Les premières années, la part d&apos;intérêts dans la mensualité est prépondérante, puis la part de capital remboursé augmente progressivement.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Percent className="w-5 h-5" />
            <span>L&apos;impact majeur de l&apos;assurance emprunteur</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            L&apos;assurance décès-invalidité-incapacité exigée par la banque peut représenter jusqu&apos;à <strong>30% du coût total du crédit</strong>. Grâce à la Loi Lemoine, vous êtes libre de choisir une délégation d&apos;assurance externe ou de résilier à tout moment votre contrat d&apos;assurance sans frais pour faire baisser votre mensualité globale.
          </p>
        </div>
      </div>
    </div>
  );
}
