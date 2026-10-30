import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Home, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FrancePtzEngine } from '@/components/international/FrancePtzEngine';

export const metadata: Metadata = {
  title: 'Simulateur PTZ 2026 (Prêt à Taux Zéro) | Kagazo',
  description:
    'Vérifiez votre éligibilité au PTZ 2026, calculez le montant maximal empruntable à 0%, les tranches de revenus et la durée du différé selon votre zone (A, B1, B2, C).',
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-pret-taux-zero-ptz`,
  },
  openGraph: {
    title: 'Simulateur PTZ 2026 (Prêt à Taux Zéro) | Kagazo France',
    description:
      'Testez votre droit au PTZ selon les nouveaux plafonds de ressources et les quotités de financement de la Loi de finances 2026.',
    url: `${SITE_URL}/fr/simulateur-pret-taux-zero-ptz`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function PtzPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Simulateur Prêt à Taux Zéro PTZ France',
    category: 'GovernmentSubsidizedLoan',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo France',
      url: SITE_URL,
    },
    description:
      'Simulateur officiel de prêt à taux zéro pour l\'accession à la propriété en France selon les barèmes 2026.',
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
          <span>Barème Officiel Loi de finances 2026 • Ministère du Logement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Simulateur PTZ 2026 : Éligibilité &amp; Montant du Prêt à Taux Zéro
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Le Prêt à Taux Zéro (PTZ) est une aide publique majeure permettant aux primo-accédants de financer l&apos;achat d&apos;une première résidence principale sans intérêts ni frais de dossier. Découvrez instantanément votre tranche de ressources, le montant maximum accordé et la durée de votre différé d&apos;amortissement.
        </p>
      </div>

      {/* Interactive Engine */}
      <FrancePtzEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Home className="w-5 h-5" />
            <span>Qui a droit au PTZ en 2026 ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pour être éligible, vous ne devez pas avoir été propriétaire de votre résidence principale au cours des deux années précédant l&apos;opération (primo-accession). Les ressources du foyer (Revenu Fiscal de Référence de l&apos;année N-2) ne doivent pas dépasser des plafonds légaux fixés en fonction de la composition du ménage et de la zone géographique (Zone A, B1, B2 ou C).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Sparkles className="w-5 h-5" />
            <span>Avantage du différé d&apos;amortissement</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Le PTZ offre une période de différé (de 5 à 10 ans selon vos ressources). Durant toute cette période initiale, vous ne remboursez aucune mensualité sur le PTZ (mensualité de 0 €), ce qui allège considérablement votre effort financier global pendant que vous commencez à amortir votre prêt bancaire principal classique.
          </p>
        </div>
      </div>
    </div>
  );
}
