import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceRendementEngine } from '@/components/international/FranceRendementEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Building, Wallet, TrendingUp, CheckCircle2, Home, Calculator, Percent } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculateur Rendement Locatif 2026 : Brut, Net de Charges & Net Fiscal (LMNP vs Foncier)',
  description:
    'Calculez la rentabilité locative réelle de votre investissement immobilier en France : rendement brut, net de charges (taxe foncière, PNO, copropriété) et net fiscal (micro-foncier vs régime réel vs LMNP amortissable). Cash-flow mensuel.',
  keywords: [
    'calculateur rendement locatif 2026 brut net',
    'calcul rentabilite locative nette nette impot',
    'simulation cash flow investissement immobilier',
    'comparatif lmnp amortissement micro foncier',
    'deduction interets pret deficit foncier 10700',
    'taux rentabilite locative par ville france',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-rendement-locatif`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-rendement-locatif`,
      'fr': `${SITE_URL}/fr/calculateur-rendement-locatif`,
      'x-default': `${SITE_URL}/fr/calculateur-rendement-locatif`,
    },
  },
  openGraph: {
    title: 'Calculateur Rendement Locatif Brut & Net Fiscal | Kagazo France',
    description:
      'Simulateur complet de rentabilité immobilière : rendement brut, net de charges et de taxe foncière, et cash-flow mensuel net d’impôt.',
    url: `${SITE_URL}/fr/calculateur-rendement-locatif`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function RendementLocatifPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        name: 'Calculateur Rendement Locatif France 2026',
        category: 'RealEstateInvestment',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo France',
          url: SITE_URL,
        },
        description:
          'Simulateur complet de rentabilité locative brute, nette de charges et nette d’impôt avec fiscalité foncière (TMI + prélèvements sociaux 17,2%) et LMNP.',
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
            name: 'Rendement Locatif',
            item: `${SITE_URL}/fr/calculateur-rendement-locatif`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre rendement brut, rendement net et rendement net-net ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le rendement brut compare uniquement les loyers annuels au coût d’achat total. Le rendement net déduit les charges réelles d’exploitation (taxe foncière, charges de copropriété non récupérables, assurance PNO, gestion locative et vacance). Le rendement net-net (ou net fiscal) intègre en plus l’impôt sur le revenu (TMI) et les prélèvements sociaux (17,2%), reflétant votre enrichissement réel net en poche.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel est un bon taux de rendement locatif en France ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dans les grandes métropoles patrimoniales (Paris, Lyon, Bordeaux), le rendement brut se situe généralement entre 3% et 4,5% avec une forte sécurité sur la valorisation du capital. Dans les villes moyennes et étudiantes (Rennes, Lille, Angers, Toulouse), il oscille entre 5% et 7%. Pour obtenir 8% à 10% et un cash-flow positif immédiat, il faut souvent cibler des villes secondaires ou des immeubles de rapport.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi le statut LMNP au réel est-il plus avantageux que la location nue ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le régime du Loueur en Meublé Non Professionnel (LMNP) au réel permet d’amortir comptablement la valeur des murs du bien immobilier (hors terrain) et du mobilier sur 10 à 30 ans. Cet amortissement neutralise fiscalement les loyers perçus pendant 10 à 15 ans, rendant vos revenus locatifs quasiment défiscalisés d’IR et de prélèvements sociaux.',
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
          <span className="text-slate-900 font-bold">Rendement Locatif</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Building className="w-3.5 h-3.5" />
            <span>Formules Financières Complètes & Fiscalité Immobilière 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculateur Rendement Locatif Brut & Net Fiscal 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Analysez la viabilité financière de votre investissement immobilier locatif : rendement brut, net de charges, net d’impôts selon votre tranche marginale (TMI), cash-flow mensuel et comparaison Location Nue (micro/réel) vs Location Meublée (LMNP).
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceRendementEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Comment se calcule le rendement locatif en France ?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Le rendement brut s’obtient en divisant le <strong>loyer annuel hors charges par le coût total d’achat</strong> (prix + notaire + travaux) × 100. Pour obtenir le rendement net réel, retranchez la <strong>taxe foncière, les charges de copropriété, l’assurance PNO et la vacance locative</strong>. Un bien acheté 150 000 € loué 650 €/mois génère 5,20% brut et environ 3,90% net avant impôts.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau Comparatif : Brut vs Net vs Net Fiscal selon le Régime
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Exemple pour un investissement de 150 000 € financé à crédit (frais notaire 12 000 €, loyer 700 €/mois, TMI 30%).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Régime d’Exploitation</th>
                  <th className="py-3 px-3">Rendement Brut</th>
                  <th className="py-3 px-3">Charges & Taxes Annuelles</th>
                  <th className="py-3 px-3">Impôts Annuels (IR + PS)</th>
                  <th className="py-3 px-3">Rendement Net Fiscal</th>
                  <th className="py-3 px-3">Cash-Flow Mensuel Estimé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Location Nue (Micro-foncier abattement 30%)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">5,18%</td>
                  <td className="py-3 px-3 text-slate-600">1 850 €</td>
                  <td className="py-3 px-3 text-red-600 font-semibold">2 775 € (TMI 30% + 17,2%)</td>
                  <td className="py-3 px-3 font-bold text-slate-900">2,33%</td>
                  <td className="py-3 px-3 text-red-600 font-semibold">-190 €/mois (Effort d’épargne)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Location Nue (Régime Réel déduction travaux)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">5,18%</td>
                  <td className="py-3 px-3 text-slate-600">1 850 €</td>
                  <td className="py-3 px-3 text-emerald-700 font-semibold">0 € (Déficit foncier déduit)</td>
                  <td className="py-3 px-3 font-bold text-slate-900">4,04%</td>
                  <td className="py-3 px-3 text-emerald-700 font-semibold">+41 €/mois (Équilibre)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Meublé LMNP (Régime Réel avec amortissements)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">5,18%</td>
                  <td className="py-3 px-3 text-slate-600">1 950 € (avec comptable)</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">0 € (Amortissements déduits)</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">3,98%</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">+33 €/mois (Zéro impôt)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Les Charges Indispensables à Intégrer pour un Calcul Réaliste
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              1. Les Charges d’Exploitation Récurrentes
            </h3>
            <p>
              Calculer un rendement locatif sur la seule base du loyer perçu est une erreur majeure. Pour anticiper vos flux de trésorerie réels, vous devez systématiquement déduire :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>La taxe foncière :</strong> En constante progression dans la plupart des communes françaises (représente souvent entre 1 et 2 mois de loyer par an).</li>
              <li><strong>Les charges de copropriété non récupérables :</strong> Honoraires de syndic professionnel, entretien des parties communes, assurance de l’immeuble (en moyenne 15% à 25% des charges totales restent à la charge du propriétaire).</li>
              <li><strong>L’assurance Propriétaire Non-Occupant (PNO) :</strong> Obligatoire en copropriété (loi Alur), comptez environ 100 € à 200 € par an.</li>
              <li><strong>La provision pour vacance locative :</strong> Prévoyez a minima 1 mois de vacance tous les 2 à 3 ans (environ 4% à 8% des loyers).</li>
              <li><strong>Les frais de gestion locative :</strong> Si vous déléguez la gestion à une agence immobilière (environ 6% à 8% TTC des loyers encaissés).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              2. L’Impact Dévastateur de la Fiscalité Foncière Classique
            </h3>
            <p>
              En location nue, les loyers sont imposés au barème progressif de l’impôt sur le revenu (selon votre tranche marginale TMI : 11%, 30%, 41% ou 45%) <strong>majoré des prélèvements sociaux de 17,20%</strong>. Pour un contribuable dans la tranche à 30%, les revenus fonciers nets sont taxés à <strong>47,20%</strong> !
            </p>
            <p>
              Sans stratégie fiscale adaptée (réalisation de travaux déductibles au réel ou basculement en LMNP meublé), près de la moitié de vos bénéfices locatifs est absorbée par le fisc, transformant un investissement apparemment rentable en cash-flow négatif exigeant un effort d’épargne mensuel imprévu.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-purple-600" />
              3. Le Cash-Flow : Le Vrai Baromètre de Sérénité
            </h3>
            <p>
              Le rendement en pourcentage mesure la rentabilité du capital investi. Le <strong>cash-flow</strong> mesure quant à lui la trésorerie disponible chaque mois dans votre poche après paiement de la mensualité de crédit bancaire, de l’assurance emprunteur, des charges et des impôts. Un cash-flow positif signifie que le locataire et le fisc vous enrichissent chaque mois sans que vous n’ayez à injecter un centime de votre salaire.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur le Rendement Locatif
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que le mécanisme du déficit foncier ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Au régime réel de location nue, lorsque vos charges déductibles (travaux d’amélioration, de réparation et d’entretien) excèdent vos loyers perçus, le déficit créé peut être déduit de vos autres revenus globaux (salaires) jusqu’à 10 700 € par an (porté à 21 400 € pour la rénovation énergétique de passoires thermiques).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Le diagnostic DPE (passoire thermique) affecte-t-il la rentabilité ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui, de façon critique : les logements classés G sont interdits à la location depuis 2025, et les logements classés F le seront à compter de 2028. L’obligation de travaux de rénovation énergétique doit impérativement être intégrée dans le calcul du coût d’acquisition global.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">L’encadrement des loyers s’applique-t-il à mon bien ?</h3>
              <p className="text-slate-600 leading-relaxed">
                À Paris, Lyon, Villeurbanne, Lille, Montpellier, Bordeaux et dans les communes de Plaine Commune et Est Ensemble, les loyers sont plafonnés à un loyer de référence majoré fixé par arrêté préfectoral.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que l’assurance loyers impayés (GLI) ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La Garantie Loyers Impayés (GLI) couvre les défauts de paiement du locataire et les dégradations éventuelles. Son coût (environ 2,5% à 3,5% des loyers) est intégralement déductible de vos revenus fonciers au régime réel.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Faut-il privilégier un studio ou un grand appartement ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Les petites surfaces (studios, T1) offrent généralement les rendements bruts les plus élevés au mètre carré, mais subissent une rotation plus fréquente des locataires. Les grandes surfaces (T3, T4) offrent un rendement légèrement inférieur mais une stabilité locative supérieure avec des familles.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">La colocation est-elle plus rentable ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Louer un grand appartement chambre par chambre à des étudiants ou jeunes actifs permet souvent d’augmenter le loyer global de 30% à 50% par rapport à une location familiale classique, tout en mutualisant le risque d’impayé avec des baux individuels.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour Optimiser vos Projets Immobiliers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/simulateur-pret-immobilier-mensualite"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Simulateur Prêt Immobilier</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-frais-de-notaire"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Frais de Notaire</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-plus-value-immobiliere"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Plus-Value Immobilière</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-pret-taux-zero-ptz"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Prêt à Taux Zéro (PTZ)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
