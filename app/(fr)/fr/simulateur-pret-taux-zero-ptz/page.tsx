import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FrancePtzEngine } from '@/components/international/FrancePtzEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Home, Landmark, CheckCircle2, TrendingUp, Key, Users } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simulateur PTZ 2026 (Prêt à Taux Zéro) | Plafonds de Ressources & Montant Max',
  description:
    'Vérifiez votre éligibilité au PTZ 2026 réformé (Loi de finances). Calculez le montant maximal de votre prêt à 0% (jusqu’à 50% du projet), les tranches de revenus (RFR N-2), le différé de remboursement et le zonage A, B1, B2, C.',
  keywords: [
    'simulateur ptz 2026 eligibilite montant',
    'pret a taux zero plafonds ressources 2026',
    'ptz 50 pourcent tranche 1 revenus modestes',
    'zones ptz a b1 b2 c neuf et ancien travaux',
    'differe remboursement pret a taux zero',
    'primo accedant achat residence principale ptz',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-pret-taux-zero-ptz`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/simulateur-pret-taux-zero-ptz`,
      'fr': `${SITE_URL}/fr/simulateur-pret-taux-zero-ptz`,
      'x-default': `${SITE_URL}/fr/simulateur-pret-taux-zero-ptz`,
    },
  },
  openGraph: {
    title: 'Simulateur PTZ 2026 (Prêt à Taux Zéro) | Kagazo France',
    description:
      'Testez votre droit au PTZ selon les nouveaux plafonds de ressources et les quotités de financement de la Loi de finances.',
    url: `${SITE_URL}/fr/simulateur-pret-taux-zero-ptz`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function PtzPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        name: 'Simulateur Prêt à Taux Zéro PTZ France 2026',
        category: 'GovernmentSubsidizedLoan',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo France',
          url: SITE_URL,
        },
        description:
          'Simulateur officiel du Prêt à Taux Zéro (PTZ) pour l’accession à la propriété en France selon la Loi de finances et les articles L. 31-10-1 du Code de la construction et de l’habitation.',
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
            name: 'Prêt à Taux Zéro (PTZ)',
            item: `${SITE_URL}/fr/simulateur-pret-taux-zero-ptz`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quels sont les logements éligibles au PTZ en 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le PTZ est accordé pour : 1° L’achat d’un logement neuf en habitat collectif dans les zones tendues (A bis, A et B1) ; 2° L’achat d’un logement ancien avec travaux de rénovation énergétique représentant au moins 25% du coût total de l’opération dans les zones détendues (B2 et C) ; 3° L’acquisition d’un logement social existant par son occupant (vente HLM).',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la quotité maximale financée par le PTZ 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depuis la dernière réforme du PTZ, la quotité finançable a été portée jusqu’à 50% du coût total de l’opération pour les ménages de la première tranche de revenus les plus modestes (contre 40% auparavant). Pour les tranches supérieures, la quotité est fixée à 40%, 20% et 20%.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne le différé de remboursement du PTZ ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le PTZ se rembourse en deux périodes : une période de différé (durant laquelle vous ne remboursez aucune mensualité sur le PTZ pendant 5, 10 ou 15 ans selon vos revenus), suivie d’une période de remboursement effectif du capital sur 10 à 15 ans. Ce différé allège drastiquement l’effort financier au début de votre projet.',
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
          <span className="text-slate-900 font-bold">Prêt à Taux Zéro (PTZ)</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Réforme Officielle Loi de Finances & Ministère du Logement 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simulateur PTZ 2026 (Prêt à Taux Zéro)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Déterminez votre éligibilité immédiate au PTZ, votre tranche de revenus (RFR N-2), la quotité d’emprunt sans intérêt (jusqu’à 50% de l’acquisition) et la durée de votre période de différé total de remboursement.
          </p>
        </div>

        {/* Interactive Engine */}
        <FrancePtzEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Conditions et montant du PTZ en 2026</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Le PTZ 2026 permet aux primo-accédants d’emprunter jusqu’à <strong>50% du montant de leur résidence principale à taux zéro</strong> sans frais de dossier. Réservé aux ménages sous plafonds de ressources (RFR N-2), il s’applique au neuf collectif en zone tendue (A, B1) et à l’ancien avec 25% de travaux en zone B2 et C, avec un différé de remboursement jusqu’à 15 ans.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Plafonds de Ressources (Revenu Fiscal N-2) et Quotités du PTZ 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Montants maximaux du Revenu Fiscal de Référence N-2 pour être éligible au PTZ selon la zone et la composition du foyer.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Nombre d’Occupants</th>
                  <th className="py-3 px-3">Zone A & A bis (Paris, Côte d’Azur)</th>
                  <th className="py-3 px-3">Zone B1 (Grandes Métropoles)</th>
                  <th className="py-3 px-3">Zone B2 (Villes Moyennes)</th>
                  <th className="py-3 px-3">Zone C (Zones Rurales)</th>
                  <th className="py-3 px-3">Quotité Max</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">1 personne</td>
                  <td className="py-3 px-3 font-medium">49 000 €</td>
                  <td className="py-3 px-3 font-medium">34 500 €</td>
                  <td className="py-3 px-3 font-medium">31 500 €</td>
                  <td className="py-3 px-3 font-medium">28 500 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">Jusqu’à 50%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">2 personnes</td>
                  <td className="py-3 px-3 font-medium">73 500 €</td>
                  <td className="py-3 px-3 font-medium">51 750 €</td>
                  <td className="py-3 px-3 font-medium">47 250 €</td>
                  <td className="py-3 px-3 font-medium">42 750 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">Jusqu’à 50%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">3 personnes</td>
                  <td className="py-3 px-3 font-medium">88 200 €</td>
                  <td className="py-3 px-3 font-medium">62 100 €</td>
                  <td className="py-3 px-3 font-medium">56 700 €</td>
                  <td className="py-3 px-3 font-medium">51 300 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">Jusqu’à 50%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">4 personnes</td>
                  <td className="py-3 px-3 font-medium">102 900 €</td>
                  <td className="py-3 px-3 font-medium">72 450 €</td>
                  <td className="py-3 px-3 font-medium">66 150 €</td>
                  <td className="py-3 px-3 font-medium">59 850 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">Jusqu’à 50%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">5 personnes et +</td>
                  <td className="py-3 px-3 font-medium">117 600 €</td>
                  <td className="py-3 px-3 font-medium">82 800 €</td>
                  <td className="py-3 px-3 font-medium">75 600 €</td>
                  <td className="py-3 px-3 font-medium">68 400 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">Jusqu’à 50%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Fonctionnement et Règles d’Octroi du Prêt à Taux Zéro
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-600" />
              1. La Condition de Primo-Accession
            </h3>
            <p>
              Le PTZ s’adresse aux emprunteurs qui achètent leur <strong>résidence principale</strong> et qui n’ont pas été propriétaires de leur logement au cours des deux dernières années précédant la demande de prêt (condition de primo-accession). Des dérogations existent pour les titulaires d’une carte d’invalidité, les bénéficiaires de l’AAH ou les personnes dont le logement a été rendu définitivement inhabitable suite à une catastrophe naturelle.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-600" />
              2. Le PTZ Ancien avec Travaux en Zone B2 et C
            </h3>
            <p>
              Pour dynamiser la revitalisation des centres-bourgs et des villes moyennes, le PTZ est maintenu dans les zones B2 et C pour l’achat de logements anciens, sous deux conditions strictes :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Quota de travaux minimal de 25% :</strong> Les travaux de rénovation doivent représenter au minimum 25% du coût total de l’opération (soit au moins 1/3 du prix d’achat du bien).</li>
              <li><strong>Performance énergétique visée :</strong> Les travaux doivent permettre au logement d’atteindre au moins la classe énergétique D du DPE (Diagnostic de Performance Énergétique).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              3. Cumul avec les Autres Prêts d’Aide à l’Accession
            </h3>
            <p>
              Le PTZ ne finance jamais 100% de l’acquisition immobilière : il doit être obligatoirement complété par un prêt bancaire classique amortissable. Il peut en revanche être combiné sans restriction avec d’autres dispositifs avantageux :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Le <strong>Prêt Action Logement</strong> (ex 1% Logement) à taux préférentiel de 1%.</li>
              <li>Le <strong>Prêt d’Accession Sociale (PAS)</strong> ou le Prêt Conventionné (PC).</li>
              <li>Les subventions de rénovation MaPrimeRénov’ de l’ANAH pour les travaux.</li>
              <li>Les prêts d’aide aux primo-accédants des collectivités locales (ex: Prêt Paris Logement 0%).</li>
            </ul>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur le Prêt à Taux Zéro (PTZ)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on mettre en location un bien acheté avec un PTZ ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le bien doit impérativement constituer votre résidence principale pendant au moins 6 ans après le versement du prêt. La mise en location est interdite durant cette période, sauf exceptions strictes (mutation professionnelle à plus de 50 km, chômage prolongé, divorce ou invalidité).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quels revenus sont pris en compte pour l’éligibilité ?</h3>
              <p className="text-slate-600 leading-relaxed">
                C’est le Revenu Fiscal de Référence (RFR) de l’avant-dernière année (année N-2) de l’ensemble des personnes destinées à habiter le logement qui est retenu (ex: avis d’imposition 2025 sur les revenus 2024 pour un prêt en 2026).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Y a-t-il des frais de dossier bancaires sur le PTZ ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. La réglementation interdit formellement aux banques de facturer des frais de dossier, des intérêts ou des commissions d’instruction sur la part financée en Prêt à Taux Zéro.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les maisons individuelles neuves ont-elles droit au PTZ ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La réforme a recentré le PTZ dans le neuf sur l’habitat collectif (appartements). La construction de maisons individuelles neuves n’est plus éligible au PTZ, sauf dérogations exceptionnelles spécifiques dans certaines zones rurales B2/C.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quelle est la durée totale d’un PTZ ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La durée totale de remboursement d’un PTZ varie entre 20 et 25 ans, comprenant une période de différé total de 5 à 15 ans suivie d’une période d’amortissement de 10 à 15 ans.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Toutes les banques proposent-elles le PTZ ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Seuls les établissements de crédit ayant signé une convention officielle avec l’État et la SGFGAS (Société de Gestion des Financements de l’Habitat) peuvent distribuer le PTZ, ce qui inclut l’ensemble des grands réseaux bancaires français.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour Réussir votre Financement Immobilier
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
              href="/fr/calculateur-rendement-locatif"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Rendement Locatif</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-plus-value-immobiliere"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Plus-Value Immobilière</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
