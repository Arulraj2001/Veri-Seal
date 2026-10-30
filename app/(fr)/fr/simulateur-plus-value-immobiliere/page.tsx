import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FrancePlusValueEngine } from '@/components/international/FrancePlusValueEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, TrendingUp, Calendar, BookOpen, CheckCircle2, Home, Landmark, Calculator } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simulateur Plus-Value Immobilière 2026 | Abattements Détention (Art. 150 VC CGI)',
  description:
    'Calculez l’impôt sur la plus-value immobilière des particuliers en France (IR 19% et prélèvements sociaux 17,2%). Barème officiel des abattements pour durée de détention (exonération IR après 22 ans, PS après 30 ans), forfaits travaux 15% et frais 7,5%.',
  keywords: [
    'simulateur plus value immobiliere 2026',
    'calcul impot plus value residence secondaire locatif',
    'abattement duree detention 22 ans 30 ans cgi',
    'forfait travaux 15 pourcent 5 ans detention',
    'exoneration residence principale plus value',
    'surtaxe plus value superieure 50000 euros',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-plus-value-immobiliere`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/simulateur-plus-value-immobiliere`,
      'fr': `${SITE_URL}/fr/simulateur-plus-value-immobiliere`,
      'x-default': `${SITE_URL}/fr/simulateur-plus-value-immobiliere`,
    },
  },
  openGraph: {
    title: 'Simulateur Plus-Value Immobilière & Abattements 2026 | Kagazo France',
    description:
      'Calcul précis de l’impôt de plus-value immobilière lors de la vente d’une résidence secondaire ou investissement locatif.',
    url: `${SITE_URL}/fr/simulateur-plus-value-immobiliere`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function PlusValueImmoPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        name: 'Simulateur Plus-Value Immobilière France 2026',
        category: 'CapitalGainsTax',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo France',
          url: SITE_URL,
        },
        description:
          'Simulateur fiscal officiel de l’impôt sur les plus-values immobilières des particuliers en France selon les articles 150 U à 150 VH du Code Général des Impôts.',
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
            name: 'Plus-Value Immobilière',
            item: `${SITE_URL}/fr/simulateur-plus-value-immobiliere`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'La vente de sa résidence principale est-elle soumise à la plus-value ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Non. En application de l’article 150 U II 1° du Code Général des Impôts, la plus-value réalisée lors de la vente de la résidence principale du cédant au jour de la cession est totalement exonérée d’impôt sur le revenu et de prélèvements sociaux, quel que soit le montant de la plus-value ou la durée de détention.',
            },
          },
          {
            '@type': 'Question',
            name: 'Au bout de combien d’années une plus-value immobilière est-elle totalement exonérée ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Grâce aux abattements pour durée de détention de l’article 150 VC du CGI : la plus-value est totalement exonérée d’impôt sur le revenu (19%) au terme de 22 années de détention révolues. En revanche, pour être totalement exonérée de prélèvements sociaux (17,2%), il faut détenir le bien pendant 30 années révolues.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionnent les forfaits de frais d’acquisition (7,5%) et de travaux (15%) ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pour minorer la plus-value brute imposable, le prix d’achat peut être majoré légalement : 1° D’un forfait de 7,5% pour les frais de notaire initiaux (ou frais réels sur justificatifs) ; 2° D’un forfait de 15% pour travaux sans aucun justificatif à fournir si vous détenez le bien depuis plus de 5 ans.',
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
          <span className="text-slate-900 font-bold">Plus-Value Immobilière</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Articles 150 U à 150 VC du CGI • Barème Dégressif 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simulateur Plus-Value Immobilière 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calculez l’impôt exact exigible lors de la vente d’une résidence secondaire, d’un investissement locatif ou d’un terrain à bâtir : impôt sur le revenu (19%), prélèvements sociaux (17,2%), abattements pour durée de détention, forfait travaux 15% et éventuelle surtaxe.
          </p>
        </div>

        {/* Interactive Engine */}
        <FrancePlusValueEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Imposition de la plus-value immobilière en France</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            La vente d’un bien immobilier (hors résidence principale exonérée à 100%) subit une taxation globale de <strong>36,20%</strong> (19% d’impôt sur le revenu + 17,2% de prélèvements sociaux). Les <strong>abattements pour durée de détention</strong> permettent une <strong>exonération totale d’impôt après 22 ans</strong> et de <strong>prélèvements sociaux après 30 ans</strong> de détention.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Grille des Abattements Légaux pour Durée de Détention (Article 150 VC)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Évolution du taux d’abattement cumulé et du taux d’imposition effectif global au fil des années.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Années de Détention</th>
                  <th className="py-3 px-3">Abattement IR (19%)</th>
                  <th className="py-3 px-3">Abattement PS (17,2%)</th>
                  <th className="py-3 px-3">Taux Global d’Imposition Effectif</th>
                  <th className="py-3 px-3">Exonération</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Moins de 6 ans</td>
                  <td className="py-3 px-3">0,0%</td>
                  <td className="py-3 px-3">0,0%</td>
                  <td className="py-3 px-3 font-bold text-red-600">36,20%</td>
                  <td className="py-3 px-3 text-slate-400">Aucune</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">10 ans</td>
                  <td className="py-3 px-3">30,0% (5 ans × 6%)</td>
                  <td className="py-3 px-3">8,25% (5 ans × 1,65%)</td>
                  <td className="py-3 px-3 font-bold text-amber-600">29,08%</td>
                  <td className="py-3 px-3 text-slate-600">Partielle</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">15 ans</td>
                  <td className="py-3 px-3">60,0% (10 ans × 6%)</td>
                  <td className="py-3 px-3">16,50% (10 ans × 1,65%)</td>
                  <td className="py-3 px-3 font-bold text-blue-600">21,96%</td>
                  <td className="py-3 px-3 text-slate-600">Partielle</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">20 ans</td>
                  <td className="py-3 px-3">90,0% (15 ans × 6%)</td>
                  <td className="py-3 px-3">24,75% (15 ans × 1,65%)</td>
                  <td className="py-3 px-3 font-bold text-emerald-600">14,84%</td>
                  <td className="py-3 px-3 text-slate-600">Partielle</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">22 ans révolus</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">100,0% (Exonération IR)</td>
                  <td className="py-3 px-3">28,00%</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">12,38% (PS seuls)</td>
                  <td className="py-3 px-3 text-emerald-800 font-semibold">Exonération IR Totale</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">30 ans et plus</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">100,0%</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">100,0% (Exonération PS)</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">0,00%</td>
                  <td className="py-3 px-3 text-emerald-800 font-bold">Exonération Fiscale 100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Modalités Pratiques de Calcul de la Plus-Value Nette Imposable
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              1. Détermination du Prix de Vente et d’Acquisition Corrigés
            </h3>
            <p>
              La plus-value brute est égale à la différence entre le <strong>prix de cession corrigé</strong> et le <strong>prix d’acquisition corrigé</strong> :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Prix de cession corrigé :</strong> Prix de vente diminué des frais supportés par le vendeur lors de la vente (frais d’intermédiaire d’agence immobilière à sa charge, coût des diagnostics techniques obligatoires).</li>
              <li><strong>Prix d’acquisition majoré :</strong> Prix d’achat initial augmenté :
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li>Des frais d’acquisition : soit les frais réels sur justificatifs de notaire, soit une majoration forfaitaire automatique de <strong>7,5%</strong>.</li>
                  <li>Des dépenses de travaux de construction, reconstruction ou agrandissement : soit les factures réelles acquittées à des entreprises, soit un forfait de <strong>15%</strong> du prix d’achat si le bien est détenu depuis plus de 5 ans (sans facture à produire).</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-600" />
              2. La Surtaxe sur les Plus-Values Supérieures à 50 000 €
            </h3>
            <p>
              Instaurée par l’article 1609 nonies G du Code Général des Impôts, une <strong>taxe supplémentaire progressive de 2% à 6%</strong> s’applique aux plus-values nettes imposables (après application des abattements pour durée de détention) dès lors que celles-ci excèdent 50 000 €. Cette surtaxe est directement prélevée par le notaire lors de la vente pour le compte du Trésor public.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-purple-600" />
              3. Cas Particuliers d’Exonération Légale
            </h3>
            <p>
              Outre la résidence principale, plusieurs situations permettent d’échapper légalement à la taxation :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Cession inférieure à 15 000 € :</strong> Les ventes dont le prix de cession est inférieur ou égal à 15 000 € (pour une personne seule, ou 30 000 € pour un couple) sont intégralement exonérées.</li>
              <li><strong>Première cession d’un logement pour acquérir sa résidence principale (Art. 150 U II 1° bis) :</strong> Exonération du produit de vente d’une résidence secondaire si vous n’avez pas été propriétaire de votre résidence principale dans les 4 ans et que les fonds sont réemployés sous 24 mois pour acheter votre logement principal.</li>
              <li><strong>Retraités et personnes invalides de condition modeste :</strong> Titulaires d’une pension de retraite ou carte mobilité inclusion dont le revenu fiscal de référence ne dépasse pas certains plafonds.</li>
            </ul>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur la Plus-Value Immobilière
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qui paye et déclare la plus-value lors de la vente ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le notaire s’occupe de tout : il calcule le montant exact de la plus-value, remplit la déclaration officielle Cerfa n° 2048-IMM et prélève directement l’impôt sur le prix de vente pour le reverser au service de la publicité foncière.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les travaux réalisés soi-même sont-ils déductibles ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. Si vous réalisez les travaux vous-même, vous ne pouvez déduire ni votre temps de travail, ni le coût des matériaux achetés. Seul le forfait automatique de 15% (après 5 ans de détention) peut alors être appliqué.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment est calculée la plus-value sur un bien reçu par donation ou succession ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le prix d’acquisition retenu est la valeur vénale du bien telle qu’elle a été déclarée dans la déclaration de succession ou l’acte notarié de donation, augmentée des frais d’acte acquittés.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Une moins-value immobilière est-elle déductible d’autres plus-values ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. Pour les particuliers, les moins-values subies lors d’une vente immobilière ne sont jamais imputables sur les plus-values réalisées sur d’autres biens, ni reportables sur les années suivantes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Le régime est-il identique pour une Société Civile Immobilière (SCI) ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Pour une SCI à l’impôt sur le revenu (SCI transparente), c’est le régime des plus-values des particuliers qui s’applique aux associés. En revanche, pour une SCI à l’impôt sur les sociétés (IS), la plus-value professionnelle est calculée sur la valeur nette comptable après amortissements.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Dois-je reporter la plus-value sur ma déclaration de revenus ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Même si l’impôt a déjà été payé chez le notaire, vous devez obligatoirement reporter le montant net de la plus-value imposable sur le formulaire 2042 C pour qu’il soit intégré dans votre revenu fiscal de référence (RFR).
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils Fiscaux & Immobiliers Associés
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/calculateur-frais-de-notaire"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Frais de Notaire</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-rendement-locatif"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Rendement Locatif Brut / Net</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-pret-immobilier-mensualite"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Simulateur Prêt Immobilier</span>
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
