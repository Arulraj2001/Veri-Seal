import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceSuperbrutEngine } from '@/components/international/FranceSuperbrutEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, BookOpen, Calculator, Building2, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Coût Embauche Employeur & Simulateur Superbrut 2026 | URSSAF & Réduction Fillon',
  description:
    'Calculez le coût réel d’un salarié pour l’entreprise (Superbrut) en 2026 : charges patronales URSSAF, retraite Agirc-Arrco, allègement général de cotisations (ex-Fillon) et salaire net perçu.',
  keywords: [
    'simulateur cout embauche employeur 2026',
    'calcul superbrut salaire france',
    'charges patronales urssaf pourcentage 2026',
    'reduction generale fillon calcul 1 6 smic',
    'combien coute un salarie au smic a l employeur',
    'cout global cdi cdd entreprise',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-cout-embauche-employeur`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/simulateur-cout-embauche-employeur`,
      'fr': `${SITE_URL}/fr/simulateur-cout-embauche-employeur`,
      'x-default': `${SITE_URL}/fr/simulateur-cout-embauche-employeur`,
    },
  },
  openGraph: {
    title: 'Coût Salarié & Simulateur Superbrut Employeur 2026 | Kagazo France',
    description:
      'Estimez le coût total employeur pour une embauche en CDI ou CDD selon les barèmes URSSAF 2026 et les allègements généraux de charges.',
    url: `${SITE_URL}/fr/simulateur-cout-embauche-employeur`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function SuperbrutPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Simulateur Coût Embauche Employeur et Superbrut France 2026',
        applicationCategory: 'BusinessApplication',
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
          'Simulateur officiel du coût total employeur (superbrut), charges patronales URSSAF et allègement général de cotisations (ex-Fillon) 2026.',
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
            name: 'Coût Embauche Superbrut',
            item: `${SITE_URL}/fr/simulateur-cout-embauche-employeur`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Combien coûte réellement un salarié au SMIC pour une entreprise en 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Au SMIC 2026 (1 801,80 € brut mensuel pour 35h), l’employeur bénéficie de la réduction générale maximale des cotisations (ex-Fillon). Les charges patronales résiduelles ne représentent qu’environ 7% à 12% du brut. Le coût global employeur (superbrut) pour un salarié au SMIC s’élève à environ 1 950 € à 2 020 € par mois.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel est le pourcentage moyen des charges patronales en France ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pour les salaires supérieurs à 1,6 SMIC (où la réduction Fillon s’éteint), les cotisations patronales représentent entre 40% et 45% du salaire brut. Ainsi, pour un salaire brut de 3 000 € mensuel, l’employeur verse environ 1 250 € à 1 350 € de charges patronales, portant le coût total employeur à plus de 4 250 € par mois.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne la réduction générale de cotisations (ex-allègement Fillon) ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La réduction générale s’applique aux rémunérations inférieures à 1,6 SMIC annuel. Le coefficient de réduction est maximal au niveau du SMIC (environ 0,32) et décroît de manière linéaire pour s’annuler à 1,6 SMIC. Elle réduit drastiquement les cotisations d’assurance maladie, vieillesse, allocations familiales et accidents du travail.',
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
          <span className="text-slate-900 font-bold">Coût Embauche Superbrut</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Building2 className="w-3.5 h-3.5" />
            <span>Barème URSSAF & Réduction Générale des Cotisations 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simulateur Coût Embauche & Superbrut 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calculez le coût global annuel et mensuel pour l’entreprise lors d’un recrutement en CDI ou CDD. Déterminez la masse salariale réelle : salaire brut, charges patronales URSSAF, mutuelle d’entreprise obligatoire, prévoyance et allègements de charges.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceSuperbrutEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Coût d’un salarié pour l’employeur en France</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            En France, le <strong>coût total employeur (superbrut)</strong> est égal au salaire brut majoré de <strong>25% à 45% de cotisations patronales</strong>. Au SMIC (1 801,80 € brut), grâce à la réduction générale Fillon, le coût employeur est limité à environ <strong>1 980 €/mois</strong>. Pour un salaire cadre de 4 000 € brut, le coût réel entreprise dépasse <strong>5 700 €/mois</strong>.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau Comparatif du Coût Salarié : Du Net Versé au Coût Total Entreprise (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Projections pour un statut non-cadre (ou cadre dès 40k) à 35 heures hebdomadaires dans une entreprise de moins de 50 salariés.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Salaire Brut Mensuel</th>
                  <th className="py-3 px-3">Net Avant Impôt</th>
                  <th className="py-3 px-3">Charges Salariales (~22%)</th>
                  <th className="py-3 px-3">Charges Patronales Estimées</th>
                  <th className="py-3 px-3">Coût Total Mensuel (Superbrut)</th>
                  <th className="py-3 px-3">Ratio Coût / Net</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">1 801,80 € (SMIC)</td>
                  <td className="py-3 px-3">1 432 €</td>
                  <td className="py-3 px-3">370 €</td>
                  <td className="py-3 px-3 text-emerald-700 font-semibold">178 € (Allègement max)</td>
                  <td className="py-3 px-3 font-bold text-slate-900">1 980 €</td>
                  <td className="py-3 px-3 text-slate-500">1,38</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">2 500,00 €</td>
                  <td className="py-3 px-3">1 950 €</td>
                  <td className="py-3 px-3">550 €</td>
                  <td className="py-3 px-3 text-blue-700 font-semibold">780 € (Allègement partiel)</td>
                  <td className="py-3 px-3 font-bold text-slate-900">3 280 €</td>
                  <td className="py-3 px-3 text-slate-500">1,68</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">3 500,00 €</td>
                  <td className="py-3 px-3">2 730 €</td>
                  <td className="py-3 px-3">770 €</td>
                  <td className="py-3 px-3 text-amber-700 font-semibold">1 470 € (Taux plein ~42%)</td>
                  <td className="py-3 px-3 font-bold text-slate-900">4 970 €</td>
                  <td className="py-3 px-3 text-slate-500">1,82</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">5 000,00 € (Cadre)</td>
                  <td className="py-3 px-3">3 750 €</td>
                  <td className="py-3 px-3">1 250 €</td>
                  <td className="py-3 px-3 text-amber-700 font-semibold">2 150 € (Taux plein ~43%)</td>
                  <td className="py-3 px-3 font-bold text-slate-900">7 150 €</td>
                  <td className="py-3 px-3 text-slate-500">1,91</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">7 000,00 € (Cadre Sup)</td>
                  <td className="py-3 px-3">5 250 €</td>
                  <td className="py-3 px-3">1 750 €</td>
                  <td className="py-3 px-3 text-amber-700 font-semibold">3 080 € (Taux plein ~44%)</td>
                  <td className="py-3 px-3 font-bold text-slate-900">10 080 €</td>
                  <td className="py-3 px-3 text-slate-500">1,92</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Les Composantes du Coût Global d’Embauche pour l’Entreprise
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              1. Détail des Cotisations Patronales de Sécurité Sociale
            </h3>
            <p>
              Pour financer le modèle social français, les employeurs versent à l’URSSAF et aux caisses de retraite un ensemble de cotisations calculées sur l’assiette brute de paie :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Assurance maladie, maternité, invalidité, décès :</strong> 7% ou 13% selon que la rémunération annuelle dépasse ou non 2,5 SMIC.</li>
              <li><strong>Allocations familiales :</strong> 3,45% pour les salaires inférieurs à 3,5 SMIC, et 5,25% au-delà.</li>
              <li><strong>Assurance vieillesse (retraite de base) :</strong> 8,55% sous plafond de la sécurité sociale (PMSS = 3 925 €/mois) et 2,02% sur la totalité du salaire.</li>
              <li><strong>Retraite complémentaire Agirc-Arrco :</strong> 4,72% en tranche 1 (et 12,95% en tranche 2 au-delà du PMSS).</li>
              <li><strong>Assurance chômage :</strong> 4,05% à la charge exclusive de l’employeur.</li>
              <li><strong>Accidents du travail et maladies professionnelles (AT/MP) :</strong> Taux fixé par la CARSAT en fonction du secteur d’activité et de la sinistralité de l’entreprise (en moyenne 2,1%).</li>
              <li><strong>FNAL, Versement Mobilité, CSA, Taxe d’apprentissage et Formation continue.</strong></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              2. Les Frais Périphériques Obligatoires : Mutuelle, Titres-Restaurant et Transport
            </h3>
            <p>
              Le coût d’un salarié ne se limite pas aux cotisations URSSAF. D’autres charges annexes sont rendues légalement obligatoires :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Complémentaire santé d’entreprise (Loi ANI) :</strong> L’employeur doit obligatoirement prendre en charge au minimum 50% du coût de la mutuelle collective pour chaque salarié (panier de soins minimum).</li>
              <li><strong>Prise en charge des titres de transport :</strong> Remboursement obligatoire de 50% des abonnements aux transports publics (Pass Navigo, abonnements TER/bus) ou forfait mobilités durables.</li>
              <li><strong>Titres-restaurant :</strong> Si mis en place, participation employeur comprise obligatoirement entre 50% et 60% de la valeur faciale (exonérée de cotisations dans la limite légale).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              3. Arbitrage : Embauche Salariée vs Sous-traitance Indépendante
            </h3>
            <p>
              Pour une jeune entreprise ou une PME, le ratio coût total / net perçu (généralement compris entre 1,7 et 1,9 pour un salarié qualifié) incite souvent à comparer le coût d’une embauche en CDI avec le recours à un prestataire indépendant (auto-entrepreneur ou freelance). Si l’indépendant facture un taux journalier moyen (TJM) plus élevé, il n’engendre aucun engagement à long terme, ni coût de rupture, ni congés payés ou mutuelle obligatoire.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur le Coût Salarié & Superbrut
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que le superbrut sur un bulletin de paie ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le salaire superbrut (ou coût total employeur) correspond à l’addition du salaire brut contractuel et de la totalité des cotisations et contributions sociales patronales payées par l’entreprise. C’est la somme totale réellement décaissée pour financer le poste.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Existe-t-il des aides à l’embauche pour les apprentis ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. L’État accorde une aide financière pour le recrutement d’un apprenti de moins de 30 ans (6 000 € pour la première année de contrat), ce qui réduit drastiquement le coût d’embauche la première année pour les entreprises.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Le seuil d’effectif de 50 salariés change-t-il les cotisations ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. À partir de 50 salariés, le taux de contribution FNAL passe de 0,10% à 0,50% sur la totalité des salaires, et l’entreprise devient assujettie à l’obligation de participation aux bénéfices ainsi qu’à des seuils renforcés de formation professionnelle.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Un stagiaire engendre-t-il des charges patronales ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La gratification minimale légale de stage (environ 4,35 € par heure de présence effective) est totalement exonérée de cotisations sociales salariales et patronales. En revanche, si la gratification dépasse ce plafond horaire, la fraction excédentaire est soumise aux cotisations courantes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment budgétiser les congés payés ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Les 5 semaines de congés payés annuels représentent environ 10% de la masse salariale brute totale. En comptabilité d’entreprise, ils font l’objet d’une provision mensuelle pour congés payés intégrant les charges patronales afférentes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que le versement mobilité ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Il s’agit d’une contribution locale prélevée auprès des employeurs de plus de 11 salariés situés dans les périmètres urbains (ex: Île-de-France Mobilités ou métropoles régionales) pour financer les infrastructures de transports en commun (taux variant de 0,5% à 3,2%).
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour Employeurs, RH et Gestionnaires d’Entreprise
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
              href="/fr/calculateur-duree-travail-heures-decimales"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Convertisseur Heures Décimales</span>
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
              href="/fr/calculateur-heures-supplementaires"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Heures Supplémentaires</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
