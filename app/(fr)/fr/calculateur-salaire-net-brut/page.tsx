import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceSalaryEngine } from '@/components/international/FranceSalaryEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculateur Salaire Brut en Net 2026 | Cadre & Non-Cadre France',
  description:
    'Calculez votre salaire net mensuel et annuel à partir du brut en France (barème 2026). Prise en compte exacte des cotisations URSSAF et du prélèvement à la source.',
  keywords: [
    'calculateur salaire brut net',
    'salaire brut en net 2026',
    'calcul salaire net cadre non cadre',
    'combien net pour 35000 brut',
    'prelevement a la source impot salaire',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-salaire-net-brut`,
    languages: HREFLANG_REGISTRY.salary_calculator.locales,
  },
};

export default function FranceSalaryPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculateur Salaire Brut en Net France 2026',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description:
      'Simulateur gratuit de conversion salaire brut en net en France avec cotisations URSSAF et impôt sur le revenu 2026.',
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/fr" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculateur Salaire Brut en Net</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <span>Conforme Barème Officiel URSSAF 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculateur de Salaire Brut en Net (France 2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Estimez instantanément le montant net qui sera versé sur votre compte bancaire après déduction des cotisations salariales et du prélèvement à la source.
          </p>
        </div>

        <FranceSalaryEngine />

        {/* Answer Capsule (GEO Rule of 45 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Combien reste-t-il sur un salaire de 35 000 € brut ?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Pour un salaire brut de <strong>35 000 € par an</strong> en France (statut non-cadre), vous percevez environ <strong>2 275 € net avant impôt par mois</strong> (soit 27 300 € par an). Après application du prélèvement à la source moyen (~5,5%), le salaire net final en poche est d’environ <strong>2 150 € par mois</strong>.
          </p>
        </div>

        {/* URSSAF & Cotisations details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Comprendre la différence entre Brut, Net et Net Après Impôt
          </h2>
          <p>
            En France, le <strong>salaire brut</strong> correspond à la rémunération fixée dans votre contrat de travail avant toute déduction. De ce montant sont d&apos;abord retirées les <strong>cotisations sociales salariales</strong> (assurance maladie, retraite de base et complémentaire Agirc-Arrco, CSG et CRDS), qui représentent environ <strong>22% pour les non-cadres</strong> et <strong>25% pour les cadres</strong>.
          </p>
          <p>
            Le résultat obtenu est le <strong>salaire net avant impôt</strong>. Depuis la mise en place du prélèvement à la source, l&apos;administration fiscale communique à votre employeur votre taux d&apos;imposition personnalisé, qui est déduit directement pour donner le <strong>net payé en euros</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

