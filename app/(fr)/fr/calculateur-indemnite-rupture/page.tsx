import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceRuptureEngine } from '@/components/international/FranceRuptureEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Scale, FileText, CheckCircle2, Calculator, AlertCircle } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculateur Rupture Conventionnelle 2026 | Indemnité Légale (Code du travail)',
  description:
    'Calculez le montant minimum légal de votre indemnité spécifique de rupture conventionnelle ou de licenciement selon les articles L. 1237-13 et R. 1234-2. Salaire de référence, forfait social 30% et fiscalité.',
  keywords: [
    'calculateur rupture conventionnelle 2026',
    'calcul indemnite rupture conventionnelle formule 1/4 1/3',
    'salaire de reference 12 mois ou 3 mois',
    'forfait social rupture conventionnelle 30 pourcent lfss',
    'fiscalite indemnite rupture cdi impot csg',
    'delai homologation dreets rupture conventionnelle',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-indemnite-rupture`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-indemnite-rupture`,
      'fr': `${SITE_URL}/fr/calculateur-indemnite-rupture`,
      'x-default': `${SITE_URL}/fr/calculateur-indemnite-rupture`,
    },
  },
  openGraph: {
    title: 'Calculateur Rupture Conventionnelle 2026 | Indemnité Légale',
    description:
      'Calculez le montant légal minimum de votre indemnité de rupture conventionnelle ou licenciement selon les articles L. 1237-13 et R. 1234-2 du Code du travail.',
    url: `${SITE_URL}/fr/calculateur-indemnite-rupture`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FranceRupturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculateur Indemnité Rupture Conventionnelle 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Simulateur officiel de calcul de l’indemnité spécifique de rupture conventionnelle et de licenciement selon les articles L. 1237-13 et R. 1234-2 du Code du travail.',
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
            name: 'Rupture Conventionnelle',
            item: `${SITE_URL}/fr/calculateur-indemnite-rupture`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la formule légale de calcul de l’indemnité de rupture conventionnelle ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Selon l’article R. 1234-2 du Code du travail, l’indemnité légale minimale est égale à 1/4 de mois de salaire par année d’ancienneté pour les 10 premières années, plus 1/3 de mois de salaire par année d’ancienneté au-delà de 10 ans. En cas d’année incomplète, le calcul est proportionnel au nombre de mois.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment se calcule le salaire de référence ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le salaire de référence correspond à la formule la plus avantageuse pour le salarié entre : 1° La moyenne mensuelle des 12 derniers mois précédant la signature de la convention, ou 2° Le tiers des 3 derniers mois (toute prime ou gratification annuelle ou exceptionnelle étant alors proratisée).',
            },
          },
          {
            '@type': 'Question',
            name: 'L’indemnité de rupture conventionnelle est-elle imposable ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L’indemnité légale ou conventionnelle de rupture conventionnelle est totalement exonérée d’impôt sur le revenu dans la limite du montant légal ou de 2 fois la rémunération brute annuelle perçue au cours de l’année civile précédente (plafonnée à 6 fois le PASS, soit 282 600 € en 2026), à condition que le salarié n’ait pas atteint l’âge légal de la retraite.',
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
          <span className="text-slate-900 font-bold">Rupture Conventionnelle</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Scale className="w-3.5 h-3.5" />
            <span>Articles L. 1237-13 & R. 1234-2 du Code du Travail</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculateur Rupture Conventionnelle 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Déterminez le plancher légal absolu de votre indemnité spécifique de rupture conventionnelle (CDI) ou indemnité de licenciement. Intègre les proratas de mois, les primes annuelles, le salaire de référence et le régime fiscal d’exonération.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceRuptureEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règle légale de l’indemnité de rupture conventionnelle</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            En France, l’indemnité minimale de rupture conventionnelle est strictement égale à l’indemnité légale de licenciement (Art. R. 1234-2) : <strong>1/4 de mois de salaire par an</strong> pour les 10 premières années, et <strong>1/3 de mois par an</strong> au-delà. Pour 3 000 € de salaire moyen et 6 ans d’ancienneté, l’indemnité plancher est de <strong>4 500 € net</strong>, totalement défiscalisée.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau d’Exemples de Calcul d’Indemnité Légale selon l’Ancienneté
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Simulations indicatives pour différents niveaux de salaire de référence brut mensuel.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Ancienneté</th>
                  <th className="py-3 px-3">Formule Légale Appliquée</th>
                  <th className="py-3 px-3">Salaire 2 000 €</th>
                  <th className="py-3 px-3">Salaire 3 000 €</th>
                  <th className="py-3 px-3">Salaire 4 500 €</th>
                  <th className="py-3 px-3">Fiscalité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">2 ans</td>
                  <td className="py-3 px-3">2 × (1/4 × S)</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">1 000 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">1 500 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">2 250 €</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Exonéré 100%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">5 ans</td>
                  <td className="py-3 px-3">5 × (1/4 × S)</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">2 500 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">3 750 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">5 625 €</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Exonéré 100%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">10 ans</td>
                  <td className="py-3 px-3">10 × (1/4 × S)</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">5 000 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">7 500 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">11 250 €</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Exonéré 100%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">15 ans</td>
                  <td className="py-3 px-3">[10 × 1/4 + 5 × 1/3] × S</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">8 333 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">12 500 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">18 750 €</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Exonéré 100%</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">20 ans</td>
                  <td className="py-3 px-3">[10 × 1/4 + 10 × 1/3] × S</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">11 667 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">17 500 €</td>
                  <td className="py-3 px-3 font-semibold text-blue-700">26 250 €</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Exonéré 100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Procédure, Négociation et Régime Social de la Rupture Conventionnelle
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              1. Les Règles de Calcul du Salaire de Référence
            </h3>
            <p>
              Le calcul de l’indemnité ne s’effectue pas sur le salaire net, mais sur un <strong>salaire de référence brut</strong>. Le Code du travail impose de retenir la formule la plus favorable entre deux options :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Option A (12 mois) :</strong> La moyenne mensuelle de l’ensemble des rémunérations brutes perçues au cours des 12 derniers mois précédant la signature de la convention (ou sur la durée d’emploi si inférieure à un an).</li>
              <li><strong>Option B (3 mois) :</strong> Le tiers des 3 derniers mois. Si des primes annuelles ou exceptionnelles ont été versées pendant ces 3 mois (par exemple le 13ème mois ou un bonus annuel), elles ne sont prises en compte que prorata temporis (1/12ème chacune).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              2. Les Étapes et Délais Obligatoires : Rétractation et Homologation
            </h3>
            <p>
              La rupture conventionnelle individuelle d’un CDI suit un calendrier réglementé très strict visant à protéger le consentement libre des deux parties :
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li><strong>Entretiens préalables :</strong> Au moins un entretien (souvent deux ou trois) pour convenir du principe et du montant supra-légal éventuel. Le salarié peut se faire assister par un représentant du personnel ou un conseiller du salarié.</li>
              <li><strong>Délai de rétractation de 15 jours calendaires :</strong> À compter du lendemain du jour de la signature de la convention Cerfa, chacune des deux parties dispose de 15 jours calendaires pour renoncer par lettre recommandée ou remise en main propre. Si le 15ème jour tombe un samedi, dimanche ou jour férié, l’échéance est reportée au premier jour ouvrable suivant.</li>
              <li><strong>Instruction et homologation DREETS :</strong> Dès le lendemain de l’expiration du délai de rétractation, le dossier est télétransmis à la DREETS (via le portail TéléRC). L’administration dispose de 15 jours ouvrables pour instruire la demande. Le silence vaut homologation tacite.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              3. Forfait Social Employeur à 30% (LFSS) et Droits France Travail
            </h3>
            <p>
              Depuis la réforme de la loi de financement de la sécurité sociale (LFSS), le régime social a été unifié : l’employeur est redevable d’une contribution patronale unique de <strong>30% sur la part de l’indemnité exonérée de cotisations</strong> sociales (alors qu’elle était auparavant de 20%). Cela renforce le coût global de la rupture conventionnelle pour les entreprises.
            </p>
            <p>
              Pour le salarié, la rupture conventionnelle ouvre immédiatement droit à l’<strong>Allocation d’Aide au Retour à l’Emploi (ARE)</strong> versée par France Travail, sous réserve de remplir les conditions d’affiliation (6 mois travaillés). Attention : toute indemnité supra-légale négociée au-delà du barème légal déclenche un <strong>différé d’indemnisation spécifique</strong> (carence jusqu’à 150 jours maximum).
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur la Rupture Conventionnelle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on négocier une indemnité supérieure au montant légal ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Le calcul du Code du travail constitue un montant plancher en dessous duquel l’accord est automatiquement rejeté par la DREETS. En pratique, le salarié peut négocier une « indemnité supra-légale » selon son ancienneté, le contexte du départ et ses performances.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’en est-il si la convention collective prévoit un meilleur calcul ?</h3>
              <p className="text-slate-600 leading-relaxed">
                L’article L. 1237-13 stipule que l’indemnité ne peut être inférieure ni à l’indemnité légale, ni à l’indemnité conventionnelle de licenciement. Si la convention collective de branche (ex: Syntec, Métallurgie, Banque) offre un barème plus généreux, c’est obligatoirement ce barème supérieur qui s’applique.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les congés payés restants sont-ils inclus dans cette indemnité ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. L’indemnité compensatrice de congés payés et les éventuelles heures de RTT non prises sont réglées séparément sur le reçu pour solde de tout compte et soumises aux cotisations sociales courantes et à l’impôt sur le revenu.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment est calculée l’ancienneté en cas de mois incomplets ?</h3>
              <p className="text-slate-600 leading-relaxed">
                L’ancienneté s’apprécie à la date de rupture effective du contrat de travail. En cas d’année incomplète, l’indemnité est calculée proportionnellement au nombre de mois complets de présence (ex: 4 ans et 6 mois = 4,5 années).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">La rupture conventionnelle s’applique-t-elle aux CDD ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non, la rupture conventionnelle est réservée exclusivement aux contrats à durée indéterminée (CDI). Pour un CDD, la fin de contrat anticipée ne peut intervenir que par accord d’une rupture d’un commun accord ou embauche en CDI ailleurs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quel est le délai de carence France Travail ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Il existe un délai d’attente incompressible de 7 jours, majoré des jours de congés payés non pris. Toute indemnité supra-légale donne lieu à un différé spécifique calculé en divisant le montant supplémentaire par un coefficient journalier (plafonné à 150 jours).
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Simulateurs & Outils Droit du Travail Associés
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
              href="/fr/calculateur-indemnite-fin-cdd"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Prime Fin de CDD (10%)</span>
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
              href="/fr/compresseur-pdf-france-travail"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>PDF Démarches France Travail</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
