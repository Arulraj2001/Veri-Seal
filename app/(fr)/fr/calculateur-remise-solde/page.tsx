import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceSoldesEngine } from '@/components/international/FranceSoldesEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Tag, Percent, ArrowDownRight, CheckCircle2, ShoppingBag, Scale, Calculator } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculateur Soldes & Remises en Cascade 2026 | Prix Réduit & Directive Omnibus',
  description:
    'Calculez instantanément le prix soldé, l’économie en euros et le pourcentage réel après une remise simple (-20%, -30%, -50%) ou double démarque en cascade (ex: -50% puis -20% supplémentaires). Conforme à l’article L. 112-1-1 du Code de la consommation (prix de référence 30 jours).',
  keywords: [
    'calculateur soldes remise en cascade 2026',
    'calcul prix reduit pourcentage reduction',
    'double demarque 50 plus 20 pourcent calcul',
    'directive omnibus prix le plus bas 30 jours',
    'calculateur promotion black friday soldes',
    'formule calcul remise pourcentage euro',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-remise-solde`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-remise-solde`,
      'fr': `${SITE_URL}/fr/calculateur-remise-solde`,
      'x-default': `${SITE_URL}/fr/calculateur-remise-solde`,
    },
  },
  openGraph: {
    title: 'Calculateur Soldes & Remises en Cascade | Kagazo France',
    description:
      'Calculateur gratuit de promotions, soldes d’été et d’hiver, et remises cumulées conformes au droit de la consommation.',
    url: `${SITE_URL}/fr/calculateur-remise-solde`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function SoldesPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculateur Soldes et Remises France 2026',
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
          'Calculateur en ligne de soldes, promotions et remises en chaîne selon les dispositions de l’article L. 112-1-1 du Code de la consommation et de la Directive Omnibus.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${SITE_URL}/fr`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Soldes & Remises',
            item: `${SITE_URL}/fr/calculateur-remise-solde`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment se calcule une double démarque en cascade (ex: -50% puis -20% supplémentaires) ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Attention au piège : deux remises successives ne s’additionnent pas arithmétiquement (-50% + -20% ne font pas -70%). La deuxième démarque s’applique sur le prix déjà réduit ! Pour un article à 100 € : -50% donne 50 €, puis -20% sur 50 € donne 40 €. L’économie réelle totale est de 60% (et non 70%).',
            },
          },
          {
            '@type': 'Question',
            name: 'Qu’impose la Directive européenne Omnibus sur l’affichage des prix barrés ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L’article L. 112-1-1 du Code de la consommation interdit aux commerçants (en boutique comme en ligne) de gonfler artificiellement les prix avant une promotion. Le prix de référence barré doit obligatoirement être le prix le plus bas pratiqué par le vendeur au cours des 30 jours précédant la réduction.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la différence légale entre des soldes et des promotions privées ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En France, les soldes (d’hiver et d’été, limités à 4 semaines) sont les seules périodes où les commerçants ont légalement le droit de revendre à perte pour écouler des stocks d’articles payés depuis au moins un mois (Art. L. 310-3 du Code de commerce). Les promotions privées ou le Black Friday interdisent formellement la revente à perte.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/fr" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Soldes & Remises</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Tag className="w-3.5 h-3.5" />
            <span>Conforme Directive Omnibus & Art. L. 112-1-1 Code de la Consommation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculateur Soldes & Remises en Cascade
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calculez en un instant le prix final remisé, l’économie en euros et le pourcentage de rabais global réel lors des soldes, opérations promotionnelles ou doubles démarques successives en magasin et sur internet.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceSoldesEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règle de calcul d’une remise et démarque en cascade</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Pour calculer une réduction simple : multipliez le prix par <strong>(1 − taux de remise)</strong> (ex: 80 € à -30% = 80 × 0,70 = 56 €). Pour une <strong>démarque en cascade</strong> (-50% puis -20% supplémentaires), la seconde réduction s’applique sur le prix déjà réduit : un article à 100 € passe à 50 €, puis à <strong>40 € (soit -60% d’économie réelle globale, et non -70%)</strong>.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau Rapide de Conversion des Soldes et Économies Réelles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Barème des prix finaux à payer selon le montant initial de l’étiquette.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Prix de Base</th>
                  <th className="py-3 px-3">Remise -20%</th>
                  <th className="py-3 px-3">Remise -30%</th>
                  <th className="py-3 px-3">Remise -50%</th>
                  <th className="py-3 px-3">Remise -70%</th>
                  <th className="py-3 px-3">Cascade -50% + -20%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">30,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">24,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">21,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">15,00 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">9,00 €</td>
                  <td className="py-3 px-3 font-bold text-purple-700">12,00 € (-60%)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">50,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">40,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">35,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">25,00 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">15,00 €</td>
                  <td className="py-3 px-3 font-bold text-purple-700">20,00 € (-60%)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">80,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">64,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">56,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">40,00 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">24,00 €</td>
                  <td className="py-3 px-3 font-bold text-purple-700">32,00 € (-60%)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">120,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">96,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">84,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">60,00 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">36,00 €</td>
                  <td className="py-3 px-3 font-bold text-purple-700">48,00 € (-60%)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">200,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">160,00 €</td>
                  <td className="py-3 px-3 font-medium text-slate-700">140,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">100,00 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">60,00 €</td>
                  <td className="py-3 px-3 font-bold text-purple-700">80,00 € (-60%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Le Droit Français des Promotions et la Protection des Acheteurs
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              1. La Règle du Prix de Référence des 30 Jours (Directive Omnibus)
            </h3>
            <p>
              Transposée à l’article L. 112-1-1 du Code de la consommation, la directive européenne « Omnibus » a mis fin à la pratique commerciale trompeuse consistant à augmenter artificiellement le prix d’un produit quelques jours avant une opération promotionnelle (Soldes, French Days, Black Friday) pour afficher ensuite un pourcentage de réduction spectaculaire mais mensonger.
            </p>
            <p>
              Désormais, tout professionnel qui annonce une réduction de prix doit obligatoirement afficher le <strong>prix le plus bas pratiqué au cours des 30 jours civils précédant la première annonce de réduction</strong>. La DGCCRF veille activement au respect de cette règle sous peine de lourdes sanctions pénales pour pratique commerciale déloyale (amendes jusqu’à 300 000 € ou 10% du chiffre d’affaires moyen).
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              2. Les Garanties Légales S’Appliquent-elles aux Articles Soldés ?
            </h3>
            <p>
              La fameuse pancarte en magasin « Ni repris, ni échangé pendant les soldes » n’a aucune valeur juridique absolue !
            </p>
            <p>
              Si un article soldé présente un défaut de conformité ou un vice caché (fermeture éclair défectueuse, couture déchirée, panne technique non signalée sur l’étiquette), le commerçant a <strong>l’obligation légale absolue de le réparer, le remplacer ou vous rembourser intégralement</strong> en application de la garantie légale de conformité de 2 ans (articles L. 217-3 et suivants du Code de la consommation). La mention « non remboursable » ne s’applique qu’aux convenances personnelles (ex: erreur de taille ou changement d’avis sans défaut sur le vêtement).
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-600" />
              3. Le Droit de Rétractation de 14 Jours pour les Achats en Ligne
            </h3>
            <p>
              Pour tout achat réalisé sur internet (e-commerce), le consommateur bénéficie d’un <strong>délai légal de rétractation de 14 jours calendaires</strong> à compter de la réception du colis pour renvoyer le produit et exiger le remboursement total (incluant les frais de livraison standard initiaux). Cette règle d’ordre public s’applique sans exception aux articles achetés en soldes ou en promotion.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur les Soldes et Réductions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Un commerçant peut-il refuser les paiements par carte bancaire en soldes ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le commerçant est libre de fixer un montant minimum pour les cartes bancaires, mais cette condition doit obligatoirement être affichée de manière claire et visible à la caisse de l’établissement avant l’achat.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quelle est la différence entre une réduction en pourcentage et en montant fixe ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Une réduction en pourcentage (-30%) est proportionnelle et devient plus intéressante sur les articles chers. Une réduction en montant fixe (bon d’achat de 10 €) offre un taux de remise bien plus élevé sur les petits paniers d’achat.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les soldes durent-ils la même durée en France métropolitaine ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La durée légale nationale est de 4 semaines consécutives en hiver (démarrant le deuxième mercredi de janvier) et 4 semaines en été (dernier mercredi de juin), avec des dates dérogatoires pour certains départements frontaliers ou d’outre-mer.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment vérifier si une promotion en ligne est réelle ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Utilisez des comparateurs de prix indépendants ou des historiques de prix qui enregistrent les variations de tarifs au cours des 6 derniers mois pour vérifier si le produit n’était pas moins cher avant l’opération.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce qu’une vente privée avant les soldes ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Les « ventes privées » organisées quelques jours avant le lancement officiel des soldes sont réservées aux porteurs de cartes de fidélité ou clients inscrits. Contrairement aux soldes, le commerçant n’a pas le droit d’y pratiquer la revente à perte.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Que faire en cas de prix affiché différent en rayon et en caisse ?</h3>
              <p className="text-slate-600 leading-relaxed">
                En cas d’erreur d’étiquetage entre le prix en rayon et le prix scanné en caisse, la doctrine DGCCRF et la jurisprudence retiennent que le commerçant doit faire payer le prix le plus bas affiché au consommateur de bonne foi.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils Pratiques du Quotidien & Finances
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/calculateur-tva-francaise"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Calculateur TVA 20% & 10%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-frais-kilometriques"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Barème Frais Kilométriques</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/convertisseur-chiffre-en-lettre"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Chiffres en Lettres Chèque</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-salaire-net-brut"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Salaire Brut en Net</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
