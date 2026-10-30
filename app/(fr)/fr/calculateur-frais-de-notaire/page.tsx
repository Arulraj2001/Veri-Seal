import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceNotaireEngine } from '@/components/international/FranceNotaireEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, BookOpen, Landmark, Home, CheckCircle2, Calculator, Scale } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculateur Frais de Notaire Immobilier 2026 | Ancien (~7-8%) & Neuf (~2-3%)',
  description:
    'Calculez exactement les frais d’acquisition immobilière (frais de notaire) en France en 2026. Droits de mutation DMTO (5,80%), émoluments dégressifs (décret 2020-179), débours et contribution de sécurité immobilière.',
  keywords: [
    'calculateur frais de notaire 2026',
    'frais notaire immobilier ancien neuf vefa',
    'bareme emoluments notaire decret 2020 179',
    'droits de mutation dmto 5 80 pourcent departement',
    'contribution securite immobiliere 0 10',
    'reduction frais notaire mobilier deduire',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-frais-de-notaire`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-frais-de-notaire`,
      'fr': `${SITE_URL}/fr/calculateur-frais-de-notaire`,
      'x-default': `${SITE_URL}/fr/calculateur-frais-de-notaire`,
    },
  },
  openGraph: {
    title: 'Calculateur Frais de Notaire Immobilier 2026 | Kagazo France',
    description:
      'Simulateur précis des droits d’enregistrement fiscaux, émoluments du notaire, TVA et débours selon le Décret n° 2020-179.',
    url: `${SITE_URL}/fr/calculateur-frais-de-notaire`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FraisNotairePage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        name: 'Calculateur Frais de Notaire France 2026',
        category: 'RealEstateAcquisitionFees',
        feesAndCommissionsSpecification: 'Barème officiel réglementé décret n° 2020-179',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo France',
          url: SITE_URL,
        },
        description:
          'Simulateur officiel des frais d’acte et droits de mutation immobiliers en France dans l’ancien et le neuf (VEFA).',
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
            name: 'Frais de Notaire',
            item: `${SITE_URL}/fr/calculateur-frais-de-notaire`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle part des frais de notaire revient réellement au notaire ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Seulement 15% à 20% de la somme totale versée constitue la rémunération réelle du notaire (les émoluments réglementés). Environ 80% des « frais de notaire » sont en réalité des taxes reversées directement au Trésor public et aux collectivités territoriales (droits de mutation DMTO à 5,80%).',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi les frais de notaire sont-ils plus faibles dans le neuf (2-3%) que dans l’ancien (7-8%) ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dans le neuf ou en VEFA (vente en l’état futur d’achèvement), le prix d’achat intègre déjà la TVA à 20% reversée par le promoteur. L’État exonère donc l’opération des DMTO complets (5,80%) au profit d’une taxe de publicité foncière réduite de 0,715%, abaissant l’ensemble des frais à environ 2% à 3% du prix.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment réduire légalement ses frais de notaire lors d’un achat dans l’ancien ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Deux leviers légaux permettent de faire baisser la note : 1° Déduire la valeur des meubles et équipements de cuisine/électroménager présents dans le bien (jusqu’à 5% du prix sans justificatif, ou plus sur factures), car les droits fiscaux ne s’appliquent qu’à la valeur immobilière ; 2° Isoler les frais d’agence immobilière à la charge de l’acquéreur dans le compromis de vente.',
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
          <span className="text-slate-900 font-bold">Frais de Notaire</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Landmark className="w-3.5 h-3.5" />
            <span>Décret n° 2020-179 & Barème National des Droits de Mutation (DMTO)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculateur Frais de Notaire Immobilier 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Estimez le montant exact des frais d’acte pour l’achat d’un appartement ou d’une maison : droits d’enregistrement fiscaux (5,80%), émoluments dégressifs du notaire, formalités, débours et contribution de sécurité immobilière (CSI).
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceNotaireEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Quel pourcentage prévoir pour les frais de notaire ?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            En France, comptez <strong>7% à 8% du prix d’achat dans l’ancien</strong> (ex: environ 18 000 € pour un bien à 250 000 €) contre <strong>2% à 3% dans le neuf ou VEFA</strong> (environ 6 000 € pour 250 000 €). Près de 80% de cette somme correspond à des taxes d’enregistrement reversées à l’État et au Département (DMTO).
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau Comparatif des Frais d’Acquisition : Logement Ancien vs Neuf (VEFA)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Estimations calculées pour un département au taux standard de DMTO (5,80%).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Prix d’Achat</th>
                  <th className="py-3 px-3">Frais Ancien (~7,5%)</th>
                  <th className="py-3 px-3">Droits Fiscaux Ancien (DMTO)</th>
                  <th className="py-3 px-3">Frais Neuf / VEFA (~2,5%)</th>
                  <th className="py-3 px-3">Économie dans le Neuf</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">150 000 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">11 800 €</td>
                  <td className="py-3 px-3 text-slate-600">8 710 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">4 100 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">+7 700 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">250 000 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">18 500 €</td>
                  <td className="py-3 px-3 text-slate-600">14 517 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">6 200 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">+12 300 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">350 000 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">25 100 €</td>
                  <td className="py-3 px-3 text-slate-600">20 323 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">8 300 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">+16 800 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">500 000 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">35 100 €</td>
                  <td className="py-3 px-3 text-slate-600">29 033 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">11 400 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">+23 700 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">800 000 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">54 900 €</td>
                  <td className="py-3 px-3 text-slate-600">46 453 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">17 600 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">+37 300 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Décomposition Détaillée des Frais d’Acquisition Immobilière
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-blue-600" />
              1. Les Droits de Mutation (DMTO) : La Part Prépondérante de l’État
            </h3>
            <p>
              Contrairement à une idée reçue, le terme « frais de notaire » est trompeur. Plus des trois quarts du montant réglé lors de la signature de l’acte authentique sont des taxes collectées par le notaire pour le compte du Trésor public :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Taxe départementale :</strong> 4,50% dans la très grande majorité des départements métropolitains (seuls l’Indre, l’Isère et Mayotte appliquent un taux historique inférieur à 3,80%).</li>
              <li><strong>Taxe communale :</strong> 1,20% reversée à la commune où se situe le bien.</li>
              <li><strong>Frais d’assiette et de recouvrement de l’État :</strong> 2,37% assis sur le montant de la taxe départementale (soit 0,107% du prix de vente).</li>
              <li><strong>Total DMTO dans l’ancien :</strong> 5,80665% du prix net vendeur.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              2. Les Émoluments Dégressifs Réglementés du Notaire
            </h3>
            <p>
              La rémunération du notaire pour la rédaction de l’acte authentique est strictement encadrée par le Décret n° 2020-179. Les tarifs sont identiques sur tout le territoire national et calculés par tranches cumulatives :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>De 0 à 6 500 € : 3,870% HT</li>
              <li>De 6 500 € à 17 000 € : 1,596% HT</li>
              <li>De 17 000 € à 60 000 € : 1,064% HT</li>
              <li>Au-delà de 60 000 € : 0,799% HT</li>
            </ul>
            <p>
              Sur ces émoluments HT s’applique obligatoirement la TVA française au taux légal de 20%.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              3. Débours, Formalités et Contribution de Sécurité Immobilière (CSI)
            </h3>
            <p>
              Le notaire avance des frais administratifs pour le compte de l’acquéreur (demande d’état hypothécaire, extrait de cadastre, purge des droits de préemption urbain auprès de la mairie, géomètre). Ces débours représentent entre 800 € et 1 500 € en moyenne.
            </p>
            <p>
              S’y ajoute la <strong>Contribution de sécurité immobilière (CSI)</strong> perçue par le service de la publicité foncière lors de l’enregistrement de la vente (taux fixe de 0,10% du prix du bien, avec un minimum légal de 15 €).
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur les Frais de Notaire
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quand doit-on verser les frais de notaire ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le montant prévisionnel total des frais doit être viré sur le compte de l’étude notariale au moins 48 heures avant la signature de l’acte authentique de vente définitif.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Pourquoi reçoit-on un remboursement plusieurs mois après ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La provision sur frais demandée lors de la signature est volontairement surévaluée de quelques centaines d’euros pour éviter tout impayé auprès du service de la publicité foncière. Dès la clôture des comptes du dossier, le trop-perçu vous est automatiquement reversé par virement.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les honoraires de négociation sont-ils inclus ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Si c’est l’étude notariale qui a trouvé le bien (service négociation immobilière), des honoraires de négociation libres s’ajoutent aux émoluments d’acte réglementés.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Un notaire peut-il accorder une remise sur ses émoluments ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Depuis la loi Macron, un notaire peut accorder une remise maximale de 20% sur la part de ses émoluments calculée sur la tranche de prix excédant 100 000 €. Cette remise doit être générale et s’appliquer de manière identique à tous ses clients.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Combien coûtent deux notaires sur une même vente ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le recours à deux notaires (le vôtre et celui du vendeur) ne vous coûte pas un centime de plus ! Les deux officiers ministériels se partagent légalement les émoluments fixés par le barème officiel sans aucun surcoût pour l’acheteur.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les frais de garantie bancaire (hypothèque) sont-ils inclus ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Si votre banque exige une hypothèque conventionnelle ou une inscription de privilège de prêteur de deniers (IPPD), des frais d’acte de prêt distincts (environ 1,5% du capital emprunté) sont réclamés en plus des frais de la vente.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour votre Projet d’Achat Immobilier
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
              href="/fr/simulateur-pret-taux-zero-ptz"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Éligibilité Prêt à Taux Zéro (PTZ)</span>
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
              href="/fr/calculateur-rendement-locatif"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Rendement Locatif Brut / Net</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
