import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceFinCddEngine } from '@/components/international/FranceFinCddEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, BookOpen, Briefcase, FileCheck, CheckCircle2, AlertTriangle, Calculator } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calcul Prime de Précarité & Fin de CDD 2026 | 10% & Congés Payés (L. 1243-8)',
  description:
    'Calculez le montant exact de votre prime de fin de contrat CDD (prime de précarité de 10%) et de votre indemnité compensatrice de congés payés selon les articles L. 1243-8 et L. 1242-16 du Code du travail.',
  keywords: [
    'calcul prime de precarite cdd 10 pourcent',
    'indemnite fin de contrat cdd 2026',
    'calcul solde de tout compte cdd',
    'indemnite conges payes fin cdd 10',
    'cas refus prime precarite cdi',
    'taxe cdd forfaitaire 10 euros',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-indemnite-fin-cdd`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-indemnite-fin-cdd`,
      'fr': `${SITE_URL}/fr/calculateur-indemnite-fin-cdd`,
      'x-default': `${SITE_URL}/fr/calculateur-indemnite-fin-cdd`,
    },
  },
  openGraph: {
    title: 'Calcul Prime de Précarité & Fin de CDD 2026 | 10% Légaux',
    description:
      'Simulateur d’indemnité de fin de contrat CDD et solde de tout compte conforme au droit du travail français (Art. L. 1243-8).',
    url: `${SITE_URL}/fr/calculateur-indemnite-fin-cdd`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FinCddPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculateur Prime de Précarité et Fin de CDD France 2026',
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
          'Calculateur officiel de la prime de fin de contrat CDD (10%) et des indemnités compensatrices de congés payés selon les articles L. 1243-8 et L. 1242-16 du Code du travail.',
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
            name: 'Fin de CDD & Précarité',
            item: `${SITE_URL}/fr/calculateur-indemnite-fin-cdd`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment se calcule la prime de précarité de fin de CDD ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Selon l’article L. 1243-8 du Code du travail, la prime de précarité s’élève au minimum à 10% de la rémunération totale brute perçue par le salarié pendant toute la durée de son contrat (y compris primes, heures supplémentaires et majorations, mais hors indemnité de congés payés). Elle peut être réduite à 6% si une convention collective de branche offre une contrepartie en formation.',
            },
          },
          {
            '@type': 'Question',
            name: 'L’indemnité de congés payés se calcule-t-elle sur la prime de précarité ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui. Selon la jurisprudence constante de la Cour de cassation, l’indemnité compensatrice de congés payés (au moins 10%) est calculée sur la rémunération totale brute incluant la prime de fin de contrat (précarité), ce qui maximise le solde de tout compte du salarié.',
            },
          },
          {
            '@type': 'Question',
            name: 'Dans quels cas la prime de précarité n’est-elle pas due ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La prime de précarité n’est pas versée en cas : 1° D’embauche immédiate en CDI à l’issue du CDD ; 2° De refus d’un CDI pour le même emploi avec rémunération équivalente ; 3° De rupture anticipée à l’initiative du salarié ou pour faute grave ; 4° De contrat saisonnier ou contrat d’usage constant (CDDU) ; 5° De contrat conclu avec un jeune durant ses vacances scolaires ou universitaires.',
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
          <span className="text-slate-900 font-bold">Fin de CDD & Précarité</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Articles L. 1243-8 & L. 1242-16 du Code du Travail</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculateur Prime de Précarité & Fin de CDD 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calculez votre indemnité de fin de contrat (prime de précarité à 10%), vos indemnités compensatrices de congés payés restants et votre solde de tout compte brut et net en France.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceFinCddEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règle de calcul de la prime de précarité en CDD</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            À l’échéance d’un CDD, le salarié a droit à une <strong>prime de précarité égale à 10% de la rémunération totale brute</strong> perçue pendant son contrat (Art. L. 1243-8). S’y ajoute l’<strong>indemnité de congés payés (10%)</strong> calculée sur le total cumulé. Pour 6 mois de CDD à 2 000 € brut, la prime de précarité est de 1 200 € brut, et le solde total atteint 2 520 € brut.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau d’Exemples de Solde de Fin de CDD (Prime 10% + Congés 10%)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Projections pour un salarié sans congés pris durant la période (hypothèse taux plein 10%).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Durée du CDD</th>
                  <th className="py-3 px-3">Salaire Brut Mensuel</th>
                  <th className="py-3 px-3">Cumul Brut Salaires</th>
                  <th className="py-3 px-3">Prime Précarité (10%)</th>
                  <th className="py-3 px-3">Congés Payés (10%)</th>
                  <th className="py-3 px-3">Total Solde Brut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">3 mois</td>
                  <td className="py-3 px-3">1 801,80 € (SMIC)</td>
                  <td className="py-3 px-3">5 405,40 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">540,54 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">594,59 €</td>
                  <td className="py-3 px-3 font-bold text-slate-900">1 135,13 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">6 mois</td>
                  <td className="py-3 px-3">2 200,00 €</td>
                  <td className="py-3 px-3">13 200,00 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">1 320,00 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">1 452,00 €</td>
                  <td className="py-3 px-3 font-bold text-slate-900">2 772,00 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">9 mois</td>
                  <td className="py-3 px-3">2 500,00 €</td>
                  <td className="py-3 px-3">22 500,00 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">2 250,00 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">2 475,00 €</td>
                  <td className="py-3 px-3 font-bold text-slate-900">4 725,00 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">12 mois</td>
                  <td className="py-3 px-3">3 000,00 €</td>
                  <td className="py-3 px-3">36 000,00 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">3 600,00 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">3 960,00 €</td>
                  <td className="py-3 px-3 font-bold text-slate-900">7 560,00 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">18 mois</td>
                  <td className="py-3 px-3">3 500,00 €</td>
                  <td className="py-3 px-3">63 000,00 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">6 300,00 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">6 930,00 €</td>
                  <td className="py-3 px-3 font-bold text-slate-900">13 230,00 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Les Règles Juridiques de la Fin de Contrat à Durée Déterminée
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              1. L’Assiette de Calcul de la Prime de Précarité
            </h3>
            <p>
              La prime de précarité a pour objet de compenser la situation de précarité dans laquelle se trouve le salarié à la fin de son contrat. Elle est assise sur l’ensemble des rémunérations brutes perçues au titre du contrat :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Le salaire de base mensuel.</li>
              <li>Les majorations pour heures supplémentaires et complémentaires.</li>
              <li>Les primes diverses (prime de rendement, 13ème mois au prorata, prime de froid, de nuit, etc.).</li>
              <li>Les avantages en nature soumis à cotisations.</li>
            </ul>
            <p>
              En revanche, les indemnités ayant le caractère de remboursement de frais professionnels (indemnités kilométriques, panier repas) sont exclues de l’assiette.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              2. Les 5 Motifs Légaux d’Exclusion de la Prime
            </h3>
            <p>
              L’employeur n’est pas tenu de verser la prime de précarité dans les situations expressément prévues par la loi (Article L. 1243-10 du Code du travail) :
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li><strong>Poursuite en CDI immédiate :</strong> Le contrat de travail se poursuit immédiatement en contrat à durée indéterminée, sans interruption (même d’un seul jour ouvrable).</li>
              <li><strong>Refus d’une offre de CDI :</strong> Le salarié refuse une proposition écrite d’embauche en CDI pour occuper le même emploi ou un emploi similaire, assorti d’une rémunération au moins équivalente.</li>
              <li><strong>Rupture anticipée fautive :</strong> La rupture anticipée du contrat intervient à l’initiative du salarié, en cas de faute grave ou de force majeure.</li>
              <li><strong>Contrats d’usage et saisonniers :</strong> Contrats de travail saisonniers (agriculture, hôtellerie de station) ou contrats d’usage constant (spectacle, audiovisuel, restauration rapide).</li>
              <li><strong>Contrats aidés et étudiants :</strong> Contrats d’apprentissage, de professionnalisation, ou CDD conclus avec des jeunes pendant leurs vacances scolaires.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              3. Documents Obligatoires Remis à la Fin du Contrat
            </h3>
            <p>
              Au dernier jour travaillé, l’employeur doit impérativement remettre au salarié un ensemble de documents légaux de fin de contrat :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Le certificat de travail :</strong> Précisant la date d’entrée, la date de sortie et la nature des emplois occupés.</li>
              <li><strong>L’attestation France Travail (ex Pôle Emploi) :</strong> Transmise électroniquement pour faire valoir vos droits à l’ARE sans délai.</li>
              <li><strong>Le reçu pour solde de tout compte :</strong> Récapitulant l’ensemble des sommes versées. Le salarié dispose d’un délai de 6 mois pour le contester s’il l’a signé, ou de 3 ans s’il ne l’a pas signé.</li>
            </ul>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur la Fin de CDD
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">La prime de précarité est-elle soumise aux cotisations et à l’impôt ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Contrairement à l’indemnité de licenciement ou de rupture conventionnelle, la prime de précarité a la nature d’un complément de salaire. Elle est donc intégralement soumise aux cotisations sociales salariales (environ 22%) et au prélèvement à la source de l’impôt sur le revenu.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Que se passe-t-il en cas de renouvellement du CDD ?</h3>
              <p className="text-slate-600 leading-relaxed">
                En cas de renouvellement par avenant d’un CDD avec le même salarié, la prime de précarité n’est pas versée à la fin du premier terme : elle est calculée sur l’ensemble de la période globale et versée uniquement à l’échéance du dernier contrat.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on toucher le chômage après un CDD ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. L’arrivée au terme d’un CDD constitue une perte involontaire d’emploi. Elle ouvre directement droit aux allocations chômage ARE de France Travail, à condition d’avoir cotisé au moins 6 mois (130 jours ou 910 heures) sur les 24 derniers mois.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Que risque l’employeur en cas de non-paiement de la prime ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le non-versement de l’indemnité de précarité ouvre droit à un recours devant le Conseil de prud’hommes, avec intérêts de retard au taux légal et éventuels dommages et intérêts pour préjudice financier.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment est calculée l’indemnité compensatrice de congés payés ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Elle est calculée selon la règle du dixième (10% du total brut perçu avec prime de précarité) ou selon la règle du maintien de salaire (montant qu’aurait perçu le salarié s’il avait travaillé durant ses congés), la méthode la plus favorable étant obligatoirement retenue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">La prime peut-elle être de 6% au lieu de 10% ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui, uniquement si une convention collective de branche étendue ou un accord d’entreprise le stipule expressément et offre en contrepartie au salarié un accès effectif à un bilan de compétences ou une action de formation professionnelle.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour Salariés en Fin de Contrat & Recrutement
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
              href="/fr/calculateur-indemnite-rupture"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Rupture Conventionnelle</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/compresseur-pdf-france-travail"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Compresseur PDF France Travail</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-cout-embauche-employeur"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Coût Embauche Employeur</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
