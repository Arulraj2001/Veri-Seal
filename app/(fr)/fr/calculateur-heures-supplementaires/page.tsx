import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceHeuresSuppEngine } from '@/components/international/FranceHeuresSuppEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Clock, Banknote, BookOpen, CheckCircle2, TrendingUp, Scale } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculateur Heures Supplémentaires 2026 | Majoration 25% & 50%, Défiscalisation',
  description:
    'Calculez le gain net exact de vos heures supplémentaires en France (barème 2026). Majoration 25% et 50%, exonération de cotisations salariales (11,31%) et défiscalisation fiscale jusqu’à 7 500 € (art. 81 quater CGI).',
  keywords: [
    'calculateur heures supplementaires 2026',
    'majoration heures supp 25 pourcent 50 pourcent',
    'defiscalisation heures supplementaires plafond 7500',
    'reduction cotisations salariales 11 31 heures supp',
    'contingent annuel heures supplementaires 220h',
    'calcul salaire net avec heures sup 39h',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-heures-supplementaires`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-heures-supplementaires`,
      'fr': `${SITE_URL}/fr/calculateur-heures-supplementaires`,
      'x-default': `${SITE_URL}/fr/calculateur-heures-supplementaires`,
    },
  },
  openGraph: {
    title: 'Calculateur Heures Supplémentaires 2026 | Majoration & Défiscalisation',
    description:
      'Calculez vos heures supplémentaires : majoration légale 25% et 50%, exonération de cotisations et défiscalisation annuelle.',
    url: `${SITE_URL}/fr/calculateur-heures-supplementaires`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function HeuresSuppPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculateur Heures Supplémentaires France 2026',
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
          'Calculateur officiel des heures supplémentaires avec majorations légales (25% et 50%), déduction forfaitaire de cotisations salariales de 11,31% et défiscalisation fiscale selon l’article 81 quater du CGI.',
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
            name: 'Heures Supplémentaires',
            item: `${SITE_URL}/fr/calculateur-heures-supplementaires`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quels sont les taux légaux de majoration des heures supplémentaires en France ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Selon l’article L. 3121-36 du Code du travail, les heures supplémentaires accomplies au-delà de la 35ème heure sont majorées de 25% pour les 8 premières heures (de la 36ème à la 43ème incluse), et de 50% pour les heures suivantes (à partir de la 44ème heure hebdomadaire). Une convention collective peut fixer un taux différent, sans jamais descendre sous 10%.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne l’exonération fiscale des heures supplémentaires ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En application de l’article 81 quater du Code général des impôts, les rémunérations perçues au titre des heures supplémentaires sont totalement exonérées d’impôt sur le revenu dans la limite annuelle de 7 500 € net imposable (équivalent à 8 037 € brut).',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la réduction de cotisations salariales sur les heures supplémentaires ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les heures supplémentaires bénéficient d’une réduction forfaitaire de cotisations sociales salariales fixée à 11,31% de la rémunération brute de ces heures (art. L. 241-17 du Code de la sécurité sociale), ce qui augmente significativement le montant net perçu par rapport aux heures normales.',
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
          <span className="text-slate-900 font-bold">Heures Supplémentaires</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Clock className="w-3.5 h-3.5" />
            <span>Articles L. 3121-28 et s. du Code du Travail & Art. 81 quater CGI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculateur Heures Supplémentaires 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Estimez le gain net réel apporté par vos heures supplémentaires : majoration légale à 25% et 50%, allègement de cotisations salariales (-11,31%) et défiscalisation annuelle plafonnée à 7 500 € net imposable.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceHeuresSuppEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règle de rémunération des heures supplémentaires</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            En France, toute heure travaillée au-delà de 35h par semaine est majorée de <strong>25% de la 36e à la 43e heure</strong>, puis de <strong>50% dès la 44e heure</strong>. Ces heures bénéficient d’une <strong>réduction de cotisations de 11,31%</strong> et sont <strong>exonérées d’impôt sur le revenu jusqu’à 7 500 € net par an</strong>, rendant une heure supplémentaire 30% à 40% plus rentable qu’une heure normale.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Barème Comparatif : Gain Brut et Net selon le Taux Horaire
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Comparaison entre une heure normale et une heure supplémentaire majorée (avec déduction salariale 11,31%).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Taux Horaire Brut de Base</th>
                  <th className="py-3 px-3">Heure Normale Net</th>
                  <th className="py-3 px-3">Heure Supp +25% Brut</th>
                  <th className="py-3 px-3">Heure Supp +25% Net Réel</th>
                  <th className="py-3 px-3">Heure Supp +50% Brut</th>
                  <th className="py-3 px-3">Heure Supp +50% Net Réel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">11,88 € (SMIC)</td>
                  <td className="py-3 px-3">9,44 €</td>
                  <td className="py-3 px-3">14,85 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">13,26 €</td>
                  <td className="py-3 px-3">17,82 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">15,91 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">15,00 €</td>
                  <td className="py-3 px-3">11,70 €</td>
                  <td className="py-3 px-3">18,75 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">16,74 €</td>
                  <td className="py-3 px-3">22,50 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">20,09 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">20,00 €</td>
                  <td className="py-3 px-3">15,60 €</td>
                  <td className="py-3 px-3">25,00 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">22,32 €</td>
                  <td className="py-3 px-3">30,00 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">26,79 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">25,00 €</td>
                  <td className="py-3 px-3">19,50 €</td>
                  <td className="py-3 px-3">31,25 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">27,90 €</td>
                  <td className="py-3 px-3">37,50 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">33,48 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">30,00 €</td>
                  <td className="py-3 px-3">23,40 €</td>
                  <td className="py-3 px-3">37,50 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">33,48 €</td>
                  <td className="py-3 px-3">45,00 €</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">40,18 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Cadre Légal des Heures Supplémentaires : Contingent, Majoration et RCR
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              1. Définition et Décompte Hebdomadaire
            </h3>
            <p>
              Constitue une heure supplémentaire toute heure de travail effectif accomplie à la demande de l’employeur (ou avec son accord implicite) au-delà de la <strong>durée légale hebdomadaire de 35 heures</strong>. Les heures supplémentaires se décomptent par semaine civile (du lundi 0h00 au dimanche 24h00), sauf accord d’entreprise fixant une période de 7 jours différente.
            </p>
            <p>
              Les durées maximales de travail doivent être scrupuleusement respectées :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Durée quotidienne maximale :</strong> 10 heures par jour (sauf dérogation conventionnelle jusqu’à 12 heures).</li>
              <li><strong>Durée hebdomadaire absolue :</strong> 48 heures au cours d’une même semaine.</li>
              <li><strong>Durée hebdomadaire moyenne :</strong> 44 heures en moyenne sur une période de 12 semaines consécutives (ou 46 heures par accord).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-emerald-600" />
              2. Le Repos Compensateur de Remplacement (RCR)
            </h3>
            <p>
              Une convention collective ou un accord d’entreprise peut prévoir le remplacement de tout ou partie du paiement des heures supplémentaires (et de leur majoration) par un <strong>repos compensateur équivalent</strong>. Par exemple, une heure supplémentaire majorée à 25% donne droit à 1 heure et 15 minutes de repos payé. Les heures ainsi compensées ne s’imputent pas sur le contingent annuel.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              3. Le Contingent Annuel et la Contrepartie Obligatoire en Repos (COR)
            </h3>
            <p>
              Le contingent annuel légal est fixé à <strong>220 heures par an et par salarié</strong> (en l’absence de dispositions conventionnelles spécifiques). L’employeur peut demander des heures supplémentaires dans la limite de ce contingent par simple information du CSE.
            </p>
            <p>
              Toute heure effectuée au-delà du contingent annuel déclenche obligatoirement une <strong>contrepartie obligatoire en repos (COR)</strong> en plus de la rémunération majorée : 50% de repos pour les entreprises de 20 salariés ou moins, et 100% de repos pour les entreprises de plus de 20 salariés.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur les Heures Supplémentaires
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Un salarié peut-il refuser d’effectuer des heures supplémentaires ?</h3>
              <p className="text-slate-600 leading-relaxed">
                En principe non. L’accomplissement des heures supplémentaires ordonnées par l’employeur relève du pouvoir de direction. Un refus sans motif légitime peut constituer une faute professionnelle, sauf délai de prévenance insuffisant ou dépassement des durées maximales légales.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les cadres au forfait-jours ont-ils droit aux heures supplémentaires ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. Les cadres ayant signé une convention de forfait annuel en jours (généralement 218 jours) ne sont pas soumis aux 35 heures hebdomadaires et ne perçoivent pas d’heures supplémentaires. En contrepartie, ils bénéficient de jours de RTT.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quelle différence entre heures supplémentaires et complémentaires ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Les heures supplémentaires s’appliquent aux salariés à temps plein (au-delà de 35h). Les heures complémentaires concernent les salariés à temps partiel (au-delà de leur durée contractuelle, majorées à 10% dans la limite de 1/10e du contrat, puis 25%).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment vérifier la défiscalisation sur sa fiche de paie ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Votre bulletin de paie doit comporter une ligne spécifique intitulée « Réduction de cotisations sur heures supplémentaires » (taux de 11,31%) ainsi que le cumul annuel des heures exonérées d’impôt sur le revenu (plafond 7 500 €).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les heures supplémentaires sont-elles prises en compte pour la retraite ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. La rémunération brute des heures supplémentaires fait partie intégrante de votre assiette de cotisations retraite de base et complémentaire Agirc-Arrco et génère des points de retraite normaux.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Que se passe-t-il si l’accord d’entreprise prévoit 10% au lieu de 25% ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Depuis les ordonnances Travail, l’accord d’entreprise prime sur la convention de branche. Si un accord valide fixe la majoration à 10% (minimum légal d’ordre public absolu), c’est ce taux qui s’applique légalement.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils Complémentaires pour la Gestion du Temps de Travail
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/calculateur-duree-travail-heures-decimales"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Convertisseur Heures Décimales</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-salaire-net-brut"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Salaire Brut en Net</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-cout-embauche-employeur"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Coût Employeur Superbrut</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-indemnite-fin-cdd"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Prime Fin de CDD (10%)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
