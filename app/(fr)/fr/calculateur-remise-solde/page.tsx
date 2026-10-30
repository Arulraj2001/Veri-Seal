import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Tag, Percent, ArrowDownRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceSoldesEngine } from '@/components/international/FranceSoldesEngine';

export const metadata: Metadata = {
  title: 'Calculateur Soldes & Remises en Cascade (-30%, -50%) | Kagazo',
  description:
    'Calculez instantanément le prix final après remise simple ou double démarque en cascade (ex: -40% puis -20% supplémentaires), le montant économisé et le pourcentage réel.',
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-remise-solde`,
  },
  openGraph: {
    title: 'Calculateur Soldes & Remises en Cascade | Kagazo France',
    description:
      'Calculateur gratuit de promotions, soldes d\'été et d\'hiver, et remises cumulées.',
    url: `${SITE_URL}/fr/calculateur-remise-solde`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function SoldesPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculateur Soldes et Remises France',
    applicationCategory: 'ShoppingApplication',
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
      'Calculateur de soldes, promotions et remises en chaîne pour les achats en magasin et e-commerce en France.',
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
          <span>Code de la consommation • Affichage du prix de référence &amp; remises</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Calculateur de Soldes &amp; Remises en Cascade
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Pendant les soldes d&apos;été, les soldes d&apos;hiver ou les ventes privées, déterminez en un clin d&apos;œil le prix net à payer en caisse. Gérez facilement les remises simples ainsi que les doubles démarques cumulées (ex : « -30% sur le prix déjà démarqué à -20% »).
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceSoldesEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Percent className="w-5 h-5" />
            <span>Pourquoi -30% puis -20% ne font pas -50% ?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            C&apos;est le piège classique des remises successives : la deuxième remise s&apos;applique <strong>sur le prix déjà réduit</strong>, et non sur le prix de départ. Par exemple, sur un article à 100 € : une première remise de -30% ramène le prix à 70 €. Les -20% supplémentaires s&apos;appliquent sur 70 € (-14 €), soit un prix final de <strong>56 €</strong>. La réduction globale réelle est donc de <strong>44%</strong> et non de 50%.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Tag className="w-5 h-5" />
            <span>Réglementation sur le prix de référence (Directive Omnibus)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            En application de la directive européenne Omnibus transposée dans le Code de la consommation, tout commerçant annonçant une réduction de prix doit obligatoirement afficher le prix le plus bas qu&apos;il a pratiqué au cours des <strong>30 derniers jours</strong> précédant la promotion, empêchant ainsi les fausses réductions artificielles.
          </p>
        </div>
      </div>
    </div>
  );
}
