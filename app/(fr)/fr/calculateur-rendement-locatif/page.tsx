import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Building, Wallet, TrendingUp } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceRendementEngine } from '@/components/international/FranceRendementEngine';

export const metadata: Metadata = {
  title: 'Calculateur Rendement Locatif Brut & Net Fiscal | Kagazo',
  description:
    'Calculez la rentabilité locative brute, nette de charges et nette d\'impôts (Micro-foncier vs Régime réel) de votre investissement immobilier en France.',
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-rendement-locatif`,
  },
  openGraph: {
    title: 'Calculateur Rendement Locatif Brut & Net Fiscal | Kagazo France',
    description:
      'Simulateur complet de rentabilité immobilière : rendement brut, net de taxe foncière et charges copropriété, et cash-flow mensuel net d\'impôt.',
    url: `${SITE_URL}/fr/calculateur-rendement-locatif`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RendementLocatifPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Calculateur Rendement Locatif France',
    category: 'RealEstateInvestment',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo France',
      url: SITE_URL,
    },
    description:
      'Calculateur de rendement locatif brut, net et net fiscal avec fiscalité des revenus fonciers (TMI + prélèvements sociaux 17,2%).',
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
          <span>Formules professionnelles • Fiscalité foncière 2026 • Cash-flow net</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Calculateur de Rendement Locatif Brut, Net &amp; Net Fiscal
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Évaluez la performance financière réelle de votre investissement immobilier locatif. Ce calculateur distingue rigoureusement la rentabilité brute commerciale, le rendement net après déduction des charges et taxes obligatoires, et le cash-flow net en poche après impôts.
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceRendementEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Building className="w-5 h-5" />
            <span>Rendement brut vs Rendement net de charges</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Le <strong>rendement brut</strong> se contente de diviser les loyers annuels par le prix d&apos;achat. En pratique, il est trompeur car il omet les <strong>frais de notaire</strong> (7% à 8%), les <strong>charges de copropriété non récupérables</strong>, la <strong>taxe foncière</strong> et l&apos;assurance Propriétaire Non-Occupant (PNO). Le <strong>rendement net</strong> intègre l&apos;intégralité de ces dépenses réelles.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Wallet className="w-5 h-5" />
            <span>Régime Micro-Foncier vs Régime Réel</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            En location nue, si vos revenus fonciers sont inférieurs à 15 000 €/an, le <strong>micro-foncier</strong> vous fait bénéficier d&apos;un abattement forfaitaire de <strong>30%</strong>. Le <strong>régime réel</strong> s&apos;avère souvent plus avantageux si vos charges réelles (intérêts d&apos;emprunt, travaux de rénovation, taxes) dépassent 30% des loyers perçus.
          </p>
        </div>
      </div>
    </div>
  );
}
