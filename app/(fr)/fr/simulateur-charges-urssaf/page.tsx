import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceUrssafEngine } from '@/components/international/FranceUrssafEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Building2, FileText, CheckCircle2, TrendingUp, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simulateur Charges URSSAF Auto-Entrepreneur 2026 | Calcul Net & Cotisations',
  description:
    'Calculez exactement vos cotisations sociales URSSAF et votre revenu net en micro-entreprise en 2026. Taux BIC (12,3%), Prestations de services (21,2%), BNC (23,1%), exonération ACRE et versement libératoire.',
  keywords: [
    'simulateur charges urssaf auto entrepreneur 2026',
    'calcul cotisations micro entreprise urssaf net',
    'taux cotisations bnc rsi urssaf 2026',
    'versement liberatoire impot revenu micro fiscal',
    'plafond chiffre d affaires micro entreprise 2026',
    'acre exoneration 50 pourcent premiere annee',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-charges-urssaf`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/simulateur-charges-urssaf`,
      'fr': `${SITE_URL}/fr/simulateur-charges-urssaf`,
      'x-default': `${SITE_URL}/fr/simulateur-charges-urssaf`,
    },
  },
  openGraph: {
    title: 'Simulateur Charges URSSAF Auto-Entrepreneur 2026 | Calcul Net',
    description:
      'Calculez vos charges URSSAF et votre revenu net réel en micro-entreprise. Simulation officielle 2026 selon votre activité BIC ou BNC.',
    url: `${SITE_URL}/fr/simulateur-charges-urssaf`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FranceUrssafPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Simulateur Charges URSSAF Auto-Entrepreneur 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Simulateur officiel de calcul des cotisations sociales URSSAF, de la contribution à la formation professionnelle (CFP) et du revenu net en micro-entreprise 2026.',
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
            name: 'Charges URSSAF Micro-Entreprise',
            item: `${SITE_URL}/fr/simulateur-charges-urssaf`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quels sont les taux de cotisations sociales URSSAF en micro-entreprise en 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En 2026, les taux officiels de cotisations sociales sont : 12,3% pour la vente de marchandises et hébergement (BIC), 21,2% pour les prestations de services artisanales et commerciales (BIC), et 23,1% pour les activités libérales relevant du régime général (BNC). S’y ajoutent la CFP (0,1% à 0,3%) et le versement libératoire optionnel.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les plafonds de chiffre d’affaires en micro-entreprise en 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les seuils annuels sont fixés à 188 700 € pour les activités d’achat-revente et fourniture de logement (BIC), et à 77 700 € pour les prestations de services (BIC et BNC). En cas de dépassement deux années consécutives, vous basculez automatiquement au régime réel d’imposition.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne l’exonération ACRE ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L’ACRE (Aide aux créateurs et repreneurs d’entreprise) octroie une réduction de 50% de vos cotisations sociales durant vos 4 premiers trimestres d’activité (ex: le taux de prestations de services passe à 10,6% au lieu de 21,2%), sous réserve d’éligibilité (demandeurs d’emploi, jeunes de moins de 26 ans, etc.).',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/fr" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Charges URSSAF Auto-Entrepreneur</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Barème Officiel URSSAF & Code de la Sécurité Sociale 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simulateur de Charges URSSAF Auto-Entrepreneur 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calculez le montant exact de vos cotisations sociales obligatoires, de la contribution à la formation professionnelle (CFP) et du versement libératoire de l’impôt sur le revenu. Déterminez votre revenu net réellement disponible après déduction de vos frais réels.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceUrssafEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Taux de cotisations URSSAF 2026</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            En micro-entreprise en 2026, les cotisations URSSAF s’élèvent à <strong>12,3% du chiffre d’affaires pour la vente de marchandises</strong> (BIC) et <strong>21,2% pour les prestations de services</strong> (BIC/BNC). Si vous bénéficiez de l’ACRE, vos charges sont divisées par deux pendant un an (10,6% en services). Avec le versement libératoire (+1,7% ou 2,2%), votre prélèvement global est d’environ 23% à 25%.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau Récapitulatif des Taux et Cotisations par Activité (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Barème légal officiel appliqué au chiffre d’affaires encaissé (déclarations mensuelles ou trimestrielles).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Catégorie d’Activité</th>
                  <th className="py-3 px-3">Cotisations Sociales</th>
                  <th className="py-3 px-3">Taux ACRE (1ère année)</th>
                  <th className="py-3 px-3">CFP Formation</th>
                  <th className="py-3 px-3">Versement Libératoire IR</th>
                  <th className="py-3 px-3">Plafond CA Annuel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Vente de marchandises (BIC)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">12,30%</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">6,15%</td>
                  <td className="py-3 px-3">0,10%</td>
                  <td className="py-3 px-3">1,00%</td>
                  <td className="py-3 px-3 font-semibold">188 700 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Prestations de services (BIC)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">21,20%</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">10,60%</td>
                  <td className="py-3 px-3">0,30%</td>
                  <td className="py-3 px-3">1,70%</td>
                  <td className="py-3 px-3 font-semibold">77 700 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Professions Libérales (BNC SSI)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">23,10%</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">11,55%</td>
                  <td className="py-3 px-3">0,20%</td>
                  <td className="py-3 px-3">2,20%</td>
                  <td className="py-3 px-3 font-semibold">77 700 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Professions Libérales (CIPAV)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">23,20%</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">11,60%</td>
                  <td className="py-3 px-3">0,20%</td>
                  <td className="py-3 px-3">2,20%</td>
                  <td className="py-3 px-3 font-semibold">77 700 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Maîtriser la Gestion Fiscale et Sociale de sa Micro-Entreprise
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-blue-600" />
              1. Cotisations Assises sur le Chiffre d’Affaires Encaissé
            </h3>
            <p>
              Le principe fondateur du régime de la micro-entreprise (ex auto-entrepreneur) est le calcul au pourcentage : <strong>pas de chiffre d’affaires encaissé = 0 € de cotisations sociales</strong>. Contrairement aux gérants de SARL ou d’EURL soumis à des cotisations minimales forfaitaires, l’auto-entrepreneur ne paye que s’il facture et encaisse réellement des paiements clients.
            </p>
            <p>
              Les cotisations couvrent l’intégralité de la couverture de base : maladie-maternité, indemnités journalières (sous condition de revenu minimal), allocations familiales, invalidité-décès, et validation des trimestres de retraite de base et complémentaire.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              2. Versement Libératoire vs Barème Progressif de l’IR
            </h3>
            <p>
              Les micro-entrepreneurs dont le revenu fiscal de référence (RFR) de l’avant-dernière année (N-2) ne dépasse pas un plafond (environ 27 500 € par part de quotient familial) peuvent opter pour le <strong>versement libératoire de l’impôt sur le revenu</strong>.
            </p>
            <p>
              Cette option permet de régler son impôt en même temps que ses cotisations URSSAF au taux réduit de 1% (vente), 1,7% (services BIC) ou 2,2% (BNC). Si votre foyer fiscal est non imposable ou faiblement imposé, cette option peut s’avérer défavorable, car l’abattement forfaitaire du barème général (71% en vente, 50% en BIC services, 34% en BNC) peut aboutir à un impôt nul.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              3. Franchise en Base de TVA : Les Seuils à Ne Pas Confondre
            </h3>
            <p>
              En micro-entreprise, vous bénéficiez initialement de la franchise en base de TVA (article 293 B du Code Général des Impôts) : vous facturez hors taxes sans collecter de TVA, et vous ne récupérez pas la TVA sur vos achats. Les seuils de franchise sont distincts des seuils de chiffre d’affaires global :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Vente de biens :</strong> Franchise jusqu’à 85 000 € (seuil majoré à 94 300 €). Dès le premier jour du mois de dépassement du seuil majoré, vous devez facturer avec TVA.</li>
              <li><strong>Prestations de services :</strong> Franchise jusqu’à 37 500 € (seuil majoré à 39 100 €).</li>
            </ul>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur l’Auto-Entreprise et l’URSSAF
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on déduire ses frais professionnels en micro-entreprise ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. L’URSSAF et les impôts appliquent un abattement forfaitaire représentatif de vos charges. Vous ne pouvez ni déduire vos frais réels (loyer, matériel, déplacements), ni amortir vos investissements. Si vos frais dépassent 30% à 50% de vos recettes, le statut de société (SASU, EURL) est souvent plus adapté.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Combien de trimestres de retraite peut-on valider ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Pour valider 4 trimestres de retraite en 2026, vous devez encaisser un chiffre d’affaires minimal d’environ 10 500 € en BNC, 12 500 € en prestations de services BIC, ou 22 500 € en vente de marchandises.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quand doit-on déclarer son chiffre d’affaires à l’URSSAF ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Selon l’option choisie lors de la création : chaque mois (avant le dernier jour du mois suivant) ou chaque trimestre civil (30 avril, 31 juillet, 31 octobre, 31 janvier). Même avec un chiffre d’affaires égal à 0 €, la déclaration reste obligatoire sous peine de pénalités.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que la CFE (Cotisation Foncière des Entreprises) ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La CFE est un impôt local dû par toutes les entreprises. Les auto-entrepreneurs en sont totalement exonérés la première année civile d’activité, ainsi que de façon permanente si leur chiffre d’affaires annuel est inférieur à 5 000 €.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on cumuler chômage (ARE) et statut d’auto-entrepreneur ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Vous pouvez cumuler vos allocations d’aide au retour à l’emploi (ARE) avec vos revenus de micro-entreprise via le maintien partiel de vos droits, ou choisir le versement du capital ARCE (60% de vos droits restants versés en deux fois par France Travail).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment facturer légalement sans TVA ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Tant que vous êtes en franchise en base, chaque facture doit obligatoirement comporter la mention légale : « TVA non applicable, art. 293 B du CGI ».
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour Indépendants & Micro-Entrepreneurs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/facture-auto-entrepreneur"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Générateur Facture PDF</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/validateur-siren-siret"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Vérificateur SIREN / SIRET</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
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
          </div>
        </div>
      </div>
    </div>
  );
}
