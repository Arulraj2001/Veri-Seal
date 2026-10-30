import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceHeuresDecimalesEngine } from '@/components/international/FranceHeuresDecimalesEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Clock, BookOpen, Calculator, CheckCircle2, FileSpreadsheet, ArrowLeftRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Convertisseur Heures en Décimales (Centièmes de Paie) 2026 | Table & Calcul',
  description:
    'Convertissez facilement vos heures et minutes en heures décimales (centièmes d’heure) pour les fiches de paie, feuilles d’heures et logiciels RH (Silae, Sage, Cegid). Tableau d’équivalence officiel.',
  keywords: [
    'convertisseur heures en decimales paie',
    'tableau centiemes d heures conversion',
    'calculateur heures minutes en centiemes',
    'convertir 151 67 heures en heures et minutes',
    'conversion temps de travail silae sage',
    'calcul salaire avec heures decimales',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-duree-travail-heures-decimales`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-duree-travail-heures-decimales`,
      'fr': `${SITE_URL}/fr/calculateur-duree-travail-heures-decimales`,
      'x-default': `${SITE_URL}/fr/calculateur-duree-travail-heures-decimales`,
    },
  },
  openGraph: {
    title: 'Convertisseur Heures en Décimales (Centièmes de Paie) | Kagazo France',
    description:
      'Tableau et convertisseur officiel centièmes d’heure pour bulletins de paie, factures et logiciels de gestion RH.',
    url: `${SITE_URL}/fr/calculateur-duree-travail-heures-decimales`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function HeuresDecimalesPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Convertisseur Heures en Décimales France 2026',
        applicationCategory: 'UtilitiesApplication',
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
          'Outil de conversion instantanée entre heures/minutes sexagésimales et heures décimales (base 100) pour la gestion de paie et du temps de travail.',
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
            name: 'Heures en Décimales',
            item: `${SITE_URL}/fr/calculateur-duree-travail-heures-decimales`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment convertir des minutes en centièmes d’heure pour la paie ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pour convertir des minutes en centièmes d’heure, divisez simplement le nombre de minutes par 60. Par exemple : 15 minutes = 15 / 60 = 0,25 heure décimale. 30 minutes = 30 / 60 = 0,50 heure décimale. 45 minutes = 45 / 60 = 0,75 heure décimale.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi les fiches de paie indiquent-elles 151,67 heures pour 35h par semaine ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En France, la mensualisation du salaire repose sur la formule légale : (35 heures × 52 semaines) ÷ 12 mois = 151,666... arrondi à 151,67 heures décimales par mois. Cela équivaut exactement à 151 heures et 40 minutes de travail mensuel.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment reconvertir des heures décimales en heures et minutes classiques ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Conservez le chiffre entier pour les heures, puis multipliez la partie décimale par 60. Par exemple pour 7,40 heures : 7 heures complètes, et 0,40 × 60 = 24 minutes, soit un temps de travail de 7h24min.',
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
          <span className="text-slate-900 font-bold">Heures en Décimales</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Clock className="w-3.5 h-3.5" />
            <span>Standard Gestion de Paie & Logiciels RH (Silae, Sage, Cegid)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Convertisseur Heures en Décimales (Centièmes de Paie)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Passez sans erreur du format horaire classique (heures et minutes sur base 60) au format décimal (centièmes sur base 100) indispensable pour calculer les salaires, déclarer les pointages et facturer les prestations horaires.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceHeuresDecimalesEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règle de conversion Heures Sexagésimales en Décimales</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Pour transformer des minutes en centièmes d’heure de paie, <strong>divisez les minutes par 60</strong> (ex: 30 min = 0,50 h ; 45 min = 0,75 h ; 10 min = 0,17 h). Inversement, pour repasser en minutes, <strong>multipliez la décimale par 60</strong> (ex: 7,80 h = 7 h + [0,80 × 60] = 7 h 48 min). 35h hebdomadaires correspondent ainsi à 151,67 heures décimales par mois.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau de Correspondance Officiel Minutes vers Centièmes d’Heure
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Grille de conversion rapide standard pour la saisie comptable et la gestion des plannings.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-2.5 px-3">Minutes (base 60)</th>
                  <th className="py-2.5 px-3">Centièmes (base 100)</th>
                  <th className="py-2.5 px-3">Minutes (base 60)</th>
                  <th className="py-2.5 px-3">Centièmes (base 100)</th>
                  <th className="py-2.5 px-3">Minutes (base 60)</th>
                  <th className="py-2.5 px-3">Centièmes (base 100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold">5 min</td>
                  <td className="py-2 px-3 font-bold text-blue-700">0,08 h</td>
                  <td className="py-2 px-3 font-semibold">25 min</td>
                  <td className="py-2 px-3 font-bold text-blue-700">0,42 h</td>
                  <td className="py-2 px-3 font-semibold">45 min</td>
                  <td className="py-2 px-3 font-bold text-emerald-700">0,75 h</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold">10 min</td>
                  <td className="py-2 px-3 font-bold text-blue-700">0,17 h</td>
                  <td className="py-2 px-3 font-semibold">30 min</td>
                  <td className="py-2 px-3 font-bold text-emerald-700">0,50 h</td>
                  <td className="py-2 px-3 font-semibold">50 min</td>
                  <td className="py-2 px-3 font-bold text-blue-700">0,83 h</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold">15 min</td>
                  <td className="py-2 px-3 font-bold text-emerald-700">0,25 h</td>
                  <td className="py-2 px-3 font-semibold">35 min</td>
                  <td className="py-2 px-3 font-bold text-blue-700">0,58 h</td>
                  <td className="py-2 px-3 font-semibold">55 min</td>
                  <td className="py-2 px-3 font-bold text-blue-700">0,92 h</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold">20 min</td>
                  <td className="py-2 px-3 font-bold text-blue-700">0,33 h</td>
                  <td className="py-2 px-3 font-semibold">40 min</td>
                  <td className="py-2 px-3 font-bold text-blue-700">0,67 h</td>
                  <td className="py-2 px-3 font-semibold">60 min</td>
                  <td className="py-2 px-3 font-bold text-emerald-700">1,00 h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Pourquoi et Comment Utiliser les Heures Décimales en Gestion de Paie ?
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              1. Le Piège Classique de la Base Sexagésimale dans les Calculs de Salaire
            </h3>
            <p>
              Dans notre quotidien, le temps se mesure en base 60 (1 heure = 60 minutes). Cependant, les outils comptables, les calculatrices et les logiciels de paie fonctionnent selon le système décimal (base 100).
            </p>
            <p>
              L’erreur la plus fréquente consiste à multiplier directement des minutes par un taux horaire : par exemple, calculer 7h30 de travail à un taux de 20 €/heure en multipliant 7,30 × 20 = 146 €. Le résultat est faux ! 30 minutes représentant une demi-heure (0,50 h), le calcul exact est 7,50 × 20 = 150 €. L’employé perdrait 4 € sur cette seule journée.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              2. La Mensualisation à 151,67 Heures Décimales
            </h3>
            <p>
              Depuis la loi sur les 35 heures et la généralisation de la mensualisation des salaires, les salariés perçoivent une rémunération constante quel que soit le nombre réel de jours et de semaines travaillés dans le mois :
            </p>
            <p className="font-mono bg-slate-50 p-3 rounded-xl border border-slate-200 text-center text-slate-900">
              Heures mensuelles = (35 heures / semaine × 52 semaines / an) ÷ 12 mois = 151,666... ≈ 151,67 h
            </p>
            <p>
              Ces 151,67 heures figurant sur votre fiche de paie correspondent exactement à <strong>151 heures et 40 minutes</strong> (0,666... × 60 = 40 minutes).
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-purple-600" />
              3. Les Règles d’Arrondi en Droit Social Français
            </h3>
            <p>
              Lors de la conversion, le résultat obtenu comporte souvent plusieurs chiffres après la virgule (ex: 20 minutes = 0,3333... h). La pratique comptable et la jurisprudence préconisent un arrondi au centième le plus proche (2 chiffres après la virgule). Si le troisième chiffre après la virgule est égal ou supérieur à 5, on arrondit au centième supérieur.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur la Conversion du Temps de Travail
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">À quoi correspondent 7h42 en heures décimales ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Divisez 42 par 60 : 42 / 60 = 0,70. 7h42 équivaut donc exactement à 7,70 heures décimales.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment convertir 39 heures hebdomadaires en heures mensuelles ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Appliquez la formule de mensualisation : (39 × 52) ÷ 12 = 169 heures décimales par mois. Les 4 heures hebdomadaires au-delà de 35h constituent 17,33 heures supplémentaires mensualisées majorées à 25%.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Que représente 0,80 heure en minutes ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Multipliez 0,80 par 60 : 0,80 × 60 = 48 minutes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment Excel gère-t-il les conversions d’heures ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Dans Excel, une journée vaut 1. Pour convertir une cellule au format heure (ex: 07:30) en nombre décimal, multipliez la cellule par 24 et formatez la cellule cible en « Nombre ».
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Pourquoi les consultants et freelances facturent en centièmes ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La facturation au centième permet une précision chirurgicale sur les relevés d’activité (timesheets) lors des missions facturées au temps passé ou au taux horaire.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quelle est l’équivalence pour un contrat mi-temps (17,5 heures) ?</h3>
              <p className="text-slate-600 leading-relaxed">
                (17,5 heures × 52) ÷ 12 = 75,83 heures décimales par mois, soit 75 heures et 50 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils Complémentaires pour la Gestion du Temps & Paie
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/calculateur-heures-supplementaires"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Heures Supplémentaires</span>
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
              <span>Coût Total Employeur</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/convertisseur-chiffre-en-lettre"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Chiffres en Lettres</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
