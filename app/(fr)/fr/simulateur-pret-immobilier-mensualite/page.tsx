import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FrancePretImmoEngine } from '@/components/international/FrancePretImmoEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Landmark, Calculator, Percent, CheckCircle2, Home, Scale, DollarSign } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simulateur Prêt Immobilier 2026 | Mensualité Crédit, Taux HCSF (35%) & Assurance',
  description:
    'Calculez votre mensualité de crédit immobilier, le coût total des intérêts bancaires et de l’assurance emprunteur (loi Lemoine) selon les critères stricts du HCSF (taux d’endettement max 35% sur 25 ans).',
  keywords: [
    'simulateur pret immobilier 2026',
    'calcul mensualite credit immobilier tableau amortissement',
    'norme hcsf taux endettement 35 pourcent',
    'cout total credit immobilier interets assurance',
    'duree pret 25 ans 20 ans 15 ans',
    'delegation assurance pret loi lemoine',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/simulateur-pret-immobilier-mensualite`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/simulateur-pret-immobilier-mensualite`,
      'fr': `${SITE_URL}/fr/simulateur-pret-immobilier-mensualite`,
      'x-default': `${SITE_URL}/fr/simulateur-pret-immobilier-mensualite`,
    },
  },
  openGraph: {
    title: 'Simulateur Prêt Immobilier & Mensualité Crédit 2026 | Kagazo France',
    description:
      'Simulez vos mensualités de crédit immobilier et comparez le coût total des intérêts bancaires et de l’assurance emprunteur selon les critères HCSF.',
    url: `${SITE_URL}/fr/simulateur-pret-immobilier-mensualite`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function PretImmoPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        name: 'Simulateur Prêt Immobilier France 2026',
        category: 'MortgageLoan',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo France',
          url: SITE_URL,
        },
        description:
          'Simulateur financier de prêt immobilier à mensualité constante, calcul du TAEG, assurance emprunteur loi Lemoine et respect du taux d’endettement maximal de 35% (HCSF).',
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
            name: 'Prêt Immobilier & Mensualité',
            item: `${SITE_URL}/fr/simulateur-pret-immobilier-mensualite`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la règle impérative du HCSF sur le taux d’endettement ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depuis la décision juridiquement contraignante du Haut Conseil de Stabilité Financière (HCSF), les banques françaises ne peuvent plus prêter si le taux d’endettement de l’emprunteur excède 35% de ses revenus nets avant impôt, assurance emprunteur comprise. De plus, la durée du prêt ne peut excéder 25 ans (portée à 27 ans pour un logement neuf en VEFA ou ancien avec 25% de travaux).',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment se calcule la mensualité d’un prêt immobilier ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La formule mathématique standard de mensualité constante est : M = [Capital × (taux mensuel)] ÷ [1 − (1 + taux mensuel)^(-nombre de mois)]. À ce montant s’ajoute chaque mois la prime d’assurance emprunteur.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment changer d’assurance emprunteur grâce à la loi Lemoine ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La loi Lemoine permet à tout emprunteur de résilier son assurance de prêt immobilier à tout moment, sans frais, dès le lendemain de la signature de l’offre de prêt, à condition que le nouveau contrat présente un niveau de garanties équivalent à celui exigé par la banque prêteuse.',
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
          <span className="text-slate-900 font-bold">Prêt Immobilier & Mensualité</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Landmark className="w-3.5 h-3.5" />
            <span>Critères Prudentiels HCSF & Amortissement Réglementé 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simulateur de Prêt Immobilier & Mensualités 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calculez votre échéance mensuelle de remboursement, le coût total des intérêts et de l’assurance emprunteur selon la durée (15, 20 ou 25 ans). Vérifiez le respect du taux d’endettement maximal légal de 35% imposé par le HCSF.
          </p>
        </div>

        {/* Interactive Engine */}
        <FrancePretImmoEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règle de mensualité et endettement maximal</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Pour emprunter en France en 2026, vos mensualités (assurance comprise) ne doivent pas dépasser <strong>35% de vos revenus nets</strong> sur <strong>25 ans au maximum</strong> (norme HCSF). Pour un crédit de 200 000 € sur 20 ans à un taux de 3,50% (avec assurance 0,30%), la mensualité s’élève à environ <strong>1 210 €/mois</strong>, nécessitant un salaire net de 3 460 €/mois.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau des Mensualités Indicatives et Coût du Crédit selon la Durée
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Simulations indicatives basées sur un taux nominal moyen de 3,50% et assurance à 0,30% du capital.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Capital Emprunté</th>
                  <th className="py-3 px-3">Durée</th>
                  <th className="py-3 px-3">Mensualité (hors ass.)</th>
                  <th className="py-3 px-3">Assurance Mensuelle</th>
                  <th className="py-3 px-3">Coût Total Intérêts</th>
                  <th className="py-3 px-3">Salaire Net Requis (35%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">150 000 €</td>
                  <td className="py-3 px-3">15 ans (180 m)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">1 072 €</td>
                  <td className="py-3 px-3 text-slate-500">38 €</td>
                  <td className="py-3 px-3 text-slate-700">43 015 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">3 171 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">200 000 €</td>
                  <td className="py-3 px-3">20 ans (240 m)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">1 160 €</td>
                  <td className="py-3 px-3 text-slate-500">50 €</td>
                  <td className="py-3 px-3 text-slate-700">78 381 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">3 457 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">250 000 €</td>
                  <td className="py-3 px-3">25 ans (300 m)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">1 252 €</td>
                  <td className="py-3 px-3 text-slate-500">63 €</td>
                  <td className="py-3 px-3 text-slate-700">125 478 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">3 757 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">300 000 €</td>
                  <td className="py-3 px-3">20 ans (240 m)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">1 740 €</td>
                  <td className="py-3 px-3 text-slate-500">75 €</td>
                  <td className="py-3 px-3 text-slate-700">117 572 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">5 186 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">400 000 €</td>
                  <td className="py-3 px-3">25 ans (300 m)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">2 003 €</td>
                  <td className="py-3 px-3 text-slate-500">100 €</td>
                  <td className="py-3 px-3 text-slate-700">200 765 €</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">6 009 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Les Critères Bancaires pour Décrocher son Prêt Immobilier
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              1. Le Respect Impératif des Normes HCSF
            </h3>
            <p>
              Le Haut Conseil de Stabilité Financière a fixé des règles d’octroi devenues juridiquement contraignantes pour tous les établissements bancaires français :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Taux d’effort plafonné à 35% :</strong> La somme de toutes vos charges de remboursement (crédit immo + crédit auto + crédits conso) divisée par vos revenus nets ne peut excéder 35%.</li>
              <li><strong>Durée maximale d’emprunt de 25 ans :</strong> Une dérogation jusqu’à 27 ans est accordée pour les achats dans le neuf (VEFA) ou les acquisitions dans l’ancien avec un montant de travaux représentant au moins 25% du coût total de l’opération.</li>
              <li><strong>Marge de flexibilité de 20% :</strong> Les banques disposent d’un quota dérogatoire de 20% de leurs dossiers, réservé à au moins 70% pour l’acquisition d’une résidence principale (dont 30% dédiés aux primo-accédants).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-600" />
              2. L’Apport Personnel Recommandé
            </h3>
            <p>
              Si les prêts à 110% (finançant le bien + les frais de notaire) étaient possibles par le passé, ils sont aujourd’hui quasi-inexistants. Les banques exigent généralement un apport personnel minimal couvrant au moins les <strong>frais de notaire et frais de garantie (soit environ 8% à 10% du prix d’achat)</strong>. Présenter un apport de 20% ou plus permet de négocier les taux d’intérêt les plus compétitifs du marché.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Percent className="w-4 h-4 text-purple-600" />
              3. Le TAEG et la Délégation d’Assurance Emprunteur
            </h3>
            <p>
              Le Taux Annuel Effectif Global (TAEG) est le seul indicateur fiable pour comparer les offres de crédit. Il intègre obligatoirement : le taux nominal du crédit, les frais de dossier bancaires, le coût de la garantie (hypothèque ou caution Crédit Logement) et l’assurance décès-invalidité.
            </p>
            <p>
              Depuis la loi Lemoine, vous n’avez plus aucune obligation d’accepter le contrat de groupe proposé par votre banque : vous pouvez souscrire une <strong>assurance individuelle déléguée</strong> et économiser entre 5 000 € et 15 000 € sur le coût total de votre financement.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur le Prêt Immobilier
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que le reste à vivre exigé par les banques ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le reste à vivre est la somme résiduelle dont dispose le ménage après paiement des mensualités de crédit. Les banques exigent en moyenne 700 € à 1 000 € pour une personne seule, et 300 € à 500 € supplémentaires par enfant à charge.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on rembourser son prêt par anticipation sans pénalités ?</h3>
              <p className="text-slate-600 leading-relaxed">
                En vertu de l’article L. 313-48 du Code de la consommation, les indemnités de remboursement anticipé (IRA) sont plafonnées à 6 mois d’intérêts ou 3% du capital restant dû. Aucune pénalité n’est due en cas de vente du bien consécutive à une mutation professionnelle, licenciement ou décès.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment les revenus des indépendants sont-ils évalués ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Pour les professions libérales, chefs d’entreprise et auto-entrepreneurs, les banques calculent le revenu net moyen sur la base des 3 dernières liasses fiscales (bilans ou déclarations 2042 C Pro).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que la caution Crédit Logement ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Alternative moderne à l’hypothèque notariale, Crédit Logement est une société financière qui se porte caution pour l’emprunteur. Elle évite les frais de mainlevée d’hypothèque en cas de revente et rembourse une fraction du Fonds Mutuel de Garantie (FMG) à la fin du prêt.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les loyers futurs d’un investissement locatif sont-ils comptabilisés ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Les banques retiennent généralement 70% du montant des futurs loyers perçus (pondération de sécurité pour vacance locative et impayés) pour les ajouter à vos revenus dans le calcul du taux d’endettement.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que le taux d’usure publié par la Banque de France ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le taux d’usure est le taux effectif global maximal (TAEG) auquel les banques ont légalement le droit de prêter. Il est réactualisé régulièrement par la Banque de France pour protéger les particuliers contre les taux abusifs.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils de Financement & Fiscalité Immobilière
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
              href="/fr/simulateur-pret-taux-zero-ptz"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Éligibilité PTZ 2026</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-rendement-locatif"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Rendement Locatif Brut/Net</span>
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
