import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceFraisKmEngine } from '@/components/international/FranceFraisKmEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Car, Zap, FileText, CheckCircle2, Calculator, Fuel, Route } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Barème Kilométrique 2026 Fiscal (DGFiP) | Calcul Frais Réels & Bonus Électrique +20%',
  description:
    'Calculez vos indemnités kilométriques selon le barème officiel 2026 de l’administration fiscale (DGFiP) : puissance fiscale 3 à 7 CV+, tranches de distance (jusqu’à 5 000 km, 5 001 à 20 000 km, +20 000 km) et majoration de +20% pour véhicule électrique. Arbitrage déduction 10% vs frais réels.',
  keywords: [
    'bareme kilometrique 2026 impots dgfip',
    'calcul frais reels kilometriques impot sur le revenu',
    'majoration 20 pourcent voiture electrique bareme km',
    'trajet domicile travail 40 km deduction fiscale',
    'bareme indemnite kilometrique employeur note de frais',
    'comparatif abattement 10 pourcent vs frais reels voiture',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-frais-kilometriques`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/simulateur-frais-kilometriques`,
      'fr': `${SITE_URL}/fr/simulateur-frais-kilometriques`,
      'x-default': `${SITE_URL}/fr/simulateur-frais-kilometriques`,
    },
  },
  openGraph: {
    title: 'Barème Kilométrique 2026 Fiscal (Frais Réels Impôts) | Kagazo France',
    description:
      'Simulateur officiel de déduction des frais réels automobiles pour la déclaration de revenus ou note de frais employeur.',
    url: `${SITE_URL}/fr/simulateur-frais-kilometriques`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FraisKmPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        name: 'Simulateur Barème Kilométrique Fiscal France 2026',
        category: 'TaxDeduction',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo France',
          url: SITE_URL,
        },
        description:
          'Simulateur officiel du barème kilométrique publié par la Direction Générale des Finances Publiques (DGFiP) pour le calcul des frais réels de déplacement et indemnités kilométriques avec bonification électrique de 20%.',
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
            name: 'Frais Kilométriques',
            item: `${SITE_URL}/fr/simulateur-frais-kilometriques`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quels coûts sont couverts par le barème kilométrique officiel ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le barème fiscal forfaitaire intègre la dépréciation du véhicule (usure et décote), les frais d’entretien et de réparation, les pneumatiques, la consommation de carburant (ou électricité) et la prime d’assurance automobile annuelle. Les frais de péage d’autoroute et de stationnement peuvent être déduits en sus sur justificatifs réels.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne la bonification de 20% pour les véhicules électriques ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depuis l’arrêté ministériel en faveur de la transition écologique, le montant des frais de déplacement calculé selon le barème officiel est automatiquement majoré de 20% si le véhicule utilisé est 100% électrique (mention « EL » sur la carte grise à la rubrique P.3).',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la limite de distance pour les trajets domicile-travail ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L’administration fiscale admet par défaut la déduction d’un aller-retour quotidien dans la limite de 40 kilomètres entre le domicile et le lieu de travail (soit 80 km par jour travaillé). Au-delà de 40 km aller, la déduction de la distance supplémentaire exige des justifications particulières (impossibilité de trouver un logement proche, mutation professionnelle, précarité de l’emploi, scolarité des enfants).',
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
          <span className="text-slate-900 font-bold">Frais Kilométriques</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Car className="w-3.5 h-3.5" />
            <span>Barème Officiel DGFiP 2026 • Frais Réels Déductibles • Bonus Électrique +20%</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Barème Kilométrique 2026 (Frais Réels Impôts)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Estimez le montant de vos indemnités kilométriques pour vos notes de frais ou votre déclaration de revenus (déduction des frais réels). Conforme aux grilles fiscales de la DGFiP pour voitures (3 à 7 CV+) et deux-roues, avec majoration légale de +20% pour les véhicules électriques.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceFraisKmEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règle du barème kilométrique fiscal en France</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Le barème officiel de la DGFiP permet de déduire vos frais de déplacement professionnels selon la puissance fiscale (3 à 7 CV) et la distance parcourue. Pour un véhicule thermique 5 CV parcourant 12 000 km/an, l’indemnité déductible est de <strong>5 204 €</strong>. Pour un véhicule 100% électrique, elle bénéficie d’un <strong>bonus de +20% soit 6 245 €</strong>.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Grille Officielle des Formules du Barème Kilométrique Automobile
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Formules de calcul DGFiP pour les voitures particulières selon la puissance fiscale (« d » = distance annuelle en km).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Puissance Fiscale</th>
                  <th className="py-3 px-3">Jusqu’à 5 000 km</th>
                  <th className="py-3 px-3">De 5 001 à 20 000 km</th>
                  <th className="py-3 px-3">Au-delà de 20 000 km</th>
                  <th className="py-3 px-3">Montant pour 12 000 km</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">3 CV et moins</td>
                  <td className="py-3 px-3 font-mono">d × 0,529</td>
                  <td className="py-3 px-3 font-mono">(d × 0,316) + 1 065 €</td>
                  <td className="py-3 px-3 font-mono">d × 0,370</td>
                  <td className="py-3 px-3 font-bold text-blue-700">4 857 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">4 CV</td>
                  <td className="py-3 px-3 font-mono">d × 0,606</td>
                  <td className="py-3 px-3 font-mono">(d × 0,340) + 1 330 €</td>
                  <td className="py-3 px-3 font-mono">d × 0,407</td>
                  <td className="py-3 px-3 font-bold text-blue-700">5 410 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">5 CV (Standard)</td>
                  <td className="py-3 px-3 font-mono">d × 0,636</td>
                  <td className="py-3 px-3 font-mono">(d × 0,357) + 1 395 €</td>
                  <td className="py-3 px-3 font-mono">d × 0,427</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">5 679 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">6 CV</td>
                  <td className="py-3 px-3 font-mono">d × 0,665</td>
                  <td className="py-3 px-3 font-mono">(d × 0,374) + 1 457 €</td>
                  <td className="py-3 px-3 font-mono">d × 0,447</td>
                  <td className="py-3 px-3 font-bold text-blue-700">5 945 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">7 CV et plus</td>
                  <td className="py-3 px-3 font-mono">d × 0,697</td>
                  <td className="py-3 px-3 font-mono">(d × 0,394) + 1 515 €</td>
                  <td className="py-3 px-3 font-mono">d × 0,470</td>
                  <td className="py-3 px-3 font-bold text-blue-700">6 243 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Arbitrage Fiscal : Abattement Forfaitaire de 10% vs Frais Réels
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              1. Quand Choisir la Déduction des Frais Réels ?
            </h3>
            <p>
              Pour calculer l’impôt sur le revenu des salariés, le fisc applique automatiquement un <strong>abattement forfaitaire de 10%</strong> sur les salaires déclarés (avec un plancher d’environ 495 € et un plafond de 14 171 €).
            </p>
            <p>
              Opter pour les frais réels n’est financièrement intéressant que si le total de vos indemnités kilométriques (augmenté de vos éventuels frais de repas professionnels et double résidence) <strong>dépasse ces 10% de vos salaires</strong>. Par exemple, pour un salarié gagnant 30 000 € net par an (abattement de 10% = 3 000 €), dès lors que son trajet domicile-travail en voiture 5 CV dépasse 7 500 km dans l’année (soit plus de 4 000 € d’indemnité), le passage aux frais réels permet d’économiser plusieurs centaines d’euros d’impôt net.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              2. Le Coup de Pouce Électrique : Majoration Automatique de 20%
            </h3>
            <p>
              Pour encourager la transition écologique du parc automobile, l’État accorde une <strong>surcote de 20% sur l’indemnité kilométrique globale</strong> aux conducteurs de véhicules 100% électriques (les hybrides rechargeables demeurent au barème thermique standard).
            </p>
            <p>
              Cette majoration compense le surcoût à l’achat du véhicule électrique tout en offrant une déduction fiscale disproportionnée par rapport au coût réel de la recharge à domicile, constituant une véritable niche fiscale légale pour les gros rouleurs du quotidien.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              3. Justificatifs à Conserver en Cas de Contrôle Fiscal
            </h3>
            <p>
              Si vous optez pour la déduction des frais réels, vous n’avez pas à joindre de justificatifs lors du dépôt en ligne de votre déclaration d’impôt. Vous devez néanmoins obligatoirement conserver pendant 3 ans les pièces suivantes :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>La photocopie de la carte grise (certificat d’immatriculation) prouvant la puissance administrative et l’énergie (mention EL pour électrique). Le véhicule doit appartenir au contribuable ou à son conjoint.</li>
              <li>Un carnet de bord ou relevé récapitulatif des trajets (dates de travail, lieux précis, calendrier de présence de l’employeur attestant des jours télétravaillés).</li>
              <li>Les factures de garage ou contrôles techniques faisant mention du kilométrage annuel pour prouver la cohérence de la distance parcourue.</li>
            </ul>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur le Barème Kilométrique
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on utiliser le barème avec un véhicule en leasing (LOA/LLD) ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. L’administration fiscale autorise les conducteurs de véhicules loués en LOA ou LLD à utiliser le barème forfaitaire. Cependant, dans ce cas, le montant des loyers mensuels de leasing ne peut pas être déduit en plus.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les jours de télétravail réduisent-ils le nombre de kilomètres ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Les jours télétravaillés ne donnent lieu à aucun déplacement domicile-travail. Vous devez déduire ces journées du nombre total de jours travaillés de l’année (habituellement environ 210 à 218 jours pour un salarié à plein temps).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Un employeur peut-il rembourser plus que le barème fiscal ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Si une entreprise verse à son salarié des indemnités kilométriques supérieures au barème officiel de la DGFiP, l’excédent est automatiquement requalifié en avantage en nature soumis aux cotisations URSSAF et à l’impôt sur le revenu.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Le covoiturage est-il déductible pour le passager ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. Seul le propriétaire ou locataire du véhicule qui assume la charge financière effective du déplacement peut déduire les frais kilométriques. Si les passagers participent aux frais, le conducteur doit déduire ces sommes de ses frais déclarés.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on cumuler barème kilométrique et prise en charge Pass Navigo ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Si votre employeur vous rembourse déjà 50% de votre abonnement aux transports en commun, vous ne pouvez pas déduire en plus des trajets en voiture pour ces mêmes parcours, sauf si vous prouvez que l’usage des transports était impossible aux horaires imposés.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Existe-t-il un barème kilométrique pour le vélo ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Pour les déplacements en vélo mécanique ou à assistance électrique, le Forfait Mobilités Durables (FMD) versé par l’employeur remplace le barème kilométrique et est exonéré de cotisations et d’impôt jusqu’à 700 € par an.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils Fiscaux & Droit du Travail Associés
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/calculateur-salaire-net-brut"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Salaire Brut en Net</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-charges-urssaf"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Charges URSSAF Micro</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-heures-supplementaires"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Heures Supplémentaires</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/facture-auto-entrepreneur"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Facture Professionnelle PDF</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
