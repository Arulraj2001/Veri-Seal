import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Calculator, Building2, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceSuperbrutEngine } from '@/components/international/FranceSuperbrutEngine';

export const metadata: Metadata = {
  title: 'Coût Salarié & Simulateur Superbrut Employeur 2026 | Kagazo',
  description:
    'Calculez le coût réel d\'un salarié pour l\'entreprise (Superbrut) : charges patronales URSSAF, retraite, allègement Fillon (réduction générale) et salaire net perçu.',
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-cout-embauche-employeur`,
  },
  openGraph: {
    title: 'Coût Salarié & Simulateur Superbrut Employeur 2026 | Kagazo France',
    description:
      'Estimez le coût total employeur pour une embauche en CDI ou CDD. Conforme aux barèmes URSSAF 2026 et aux allègements généraux de charges.',
    url: `${SITE_URL}/fr/simulateur-cout-embauche-employeur`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function SuperbrutPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Simulateur Coût Embauche Employeur et Superbrut France',
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
      'Simulateur du coût total employeur (superbrut), charges patronales URSSAF et allègement général de cotisations (ex-Fillon) 2026.',
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
          <span>Barème URSSAF 2026 • Réduction Générale des Cotisations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Simulateur de Coût Salarié &amp; Superbrut Employeur 2026
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Déterminez précisément ce que coûte réellement une embauche pour l&apos;entreprise : salaire brut, cotisations patronales obligatoires (maladie, retraite complémentaire, AT/MP, chômage) et déduction automatique de l&apos;allègement général (ex-Fillon).
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceSuperbrutEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Building2 className="w-5 h-5" />
            <span>Qu&apos;est-ce que le Superbrut employeur ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Le « superbrut » correspond à la dépense financière globale engagée par l&apos;employeur pour rémunérer un collaborateur. Il comprend le <strong>salaire brut contractuel</strong> additionné de l&apos;ensemble des <strong>charges patronales</strong> (environ 42% à 45% du salaire brut pour un non-cadre ou cadre), déduction faite des allègements légaux consentis par l&apos;État.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <BookOpen className="w-5 h-5" />
            <span>Fonctionnement de la Réduction Générale (ex-Fillon)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instaurée pour encourager l&apos;embauche des rémunérations inférieures ou égales à <strong>1,6 SMIC</strong>, la réduction générale diminue fortement le montant des cotisations patronales patronales d&apos;assurance maladie, vieillesse, allocations familiales et FNAL. Le montant de l&apos;allègement est maximal au niveau du SMIC puis devient dégressif pour s&apos;annuler au-delà de 1,6 SMIC.
          </p>
        </div>
      </div>
    </div>
  );
}
