import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Car, Zap, FileText } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceFraisKmEngine } from '@/components/international/FranceFraisKmEngine';

export const metadata: Metadata = {
  title: 'Barème Kilométrique 2026 Fiscal (Frais Réels Impôts) | Kagazo',
  description:
    'Calculez vos indemnités kilométriques selon le barème officiel 2026 de l\'administration fiscale (DGFiP) : puissance administrative 3 à 7 CV, tranches de distance et bonus de 20% pour véhicule électrique.',
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-frais-kilometriques`,
  },
  openGraph: {
    title: 'Barème Kilométrique 2026 Fiscal (Frais Réels Impôts) | Kagazo France',
    description:
      'Simulateur officiel de déduction des frais réels automobiles pour la déclaration de revenus ou note de frais employeur.',
    url: `${SITE_URL}/fr/simulateur-frais-kilometriques`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FraisKmPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Simulateur Barème Kilométrique Fiscal France 2026',
    category: 'TaxDeduction',
    provider: {
      '@type': 'Organization',
      name: 'Kagazo France',
      url: SITE_URL,
    },
    description:
      'Simulateur officiel du barème kilométrique publié par la Direction Générale des Finances Publiques pour les frais réels de déplacement.',
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
          <span>Barème Officiel DGFiP 2026 • Frais Réels Déductibles • Bonification Électrique +20%</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Barème Kilométrique 2026 : Simulateur Frais Réels &amp; Impôts
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Si vous utilisez votre véhicule personnel pour vos trajets professionnels ou domicile-travail, vous pouvez déduire vos dépenses réelles sur votre déclaration de revenus ou vous faire rembourser par votre employeur. Calculez instantanément votre indemnité déductible selon la puissance fiscale (CV) et la distance parcourue.
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceFraisKmEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Car className="w-5 h-5" />
            <span>Abattement forfaitaire de 10% ou Frais réels ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Par défaut, le fisc applique automatiquement une déduction forfaitaire de <strong>10%</strong> sur vos salaires pour frais professionnels. Si vos dépenses réelles de déplacement (trajets domicile-travail dans la limite de 40 km aller, soit 80 km/jour, sauf circonstances particulières) dépassent ce forfait de 10%, opter pour les <strong>frais réels</strong> vous permet de réduire substantiellement votre impôt sur le revenu.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Zap className="w-5 h-5" />
            <span>Majoration de 20% pour les véhicules 100% électriques</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Afin d&apos;encourager la transition écologique, l&apos;État applique une <strong>majoration automatique de 20%</strong> sur le montant total des indemnités kilométriques pour les contribuables utilisant une voiture ou une moto 100% électrique. Cette majoration est prise en compte dans notre simulateur.
          </p>
        </div>
      </div>
    </div>
  );
}
