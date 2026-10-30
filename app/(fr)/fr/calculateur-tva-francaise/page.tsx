import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceTvaEngine } from '@/components/international/FranceTvaEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Percent, Building2, BookOpen, CheckCircle2, Calculator, Receipt } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculateur TVA 2026 : HT en TTC & TTC en HT (Taux 20%, 10%, 5,5%, 2,1%)',
  description:
    'Calculez facilement la TVA en France (20%, 10%, 5,5%, 2,1%) : conversion Hors Taxes (HT) en TTC et calcul de TVA inversée (TTC vers HT). Générateur de numéro de TVA intracommunautaire depuis le SIREN.',
  keywords: [
    'calculateur tva 2026 ht ttc',
    'calcul tva inverse ttc en ht',
    'taux tva france 20 10 5 5 2 1',
    'formule tva calcul montant taxe',
    'generateur tva intracommunautaire siren',
    'tva renovation batiment 10 et 5 5',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/calculateur-tva-francaise`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/calculateur-tva-francaise`,
      'fr': `${SITE_URL}/fr/calculateur-tva-francaise`,
      'x-default': `${SITE_URL}/fr/calculateur-tva-francaise`,
    },
  },
  openGraph: {
    title: 'Calculateur TVA 2026 & Numéro TVA Intracommunautaire | Kagazo France',
    description:
      'Calculateur gratuit de TVA française (HT vers TTC et inversement) et générateur officiel de clé de TVA intracommunautaire.',
    url: `${SITE_URL}/fr/calculateur-tva-francaise`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function TvaPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculateur TVA France 2026 et Clé Intracommunautaire',
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
          'Calculateur officiel des 4 taux de TVA en France (20%, 10%, 5.5%, 2.1%) et algorithme de calcul de numéro de TVA intracommunautaire.',
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
            name: 'Calculateur TVA',
            item: `${SITE_URL}/fr/calculateur-tva-francaise`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment calculer le montant Hors Taxes (HT) à partir du prix TTC ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pour retrouver le montant HT à partir du TTC (calcul inversé), divisez le TTC par (1 + le taux de TVA exprimé en décimale). Pour un taux normal à 20% : HT = TTC ÷ 1,20. Pour un taux intermédiaire à 10% : HT = TTC ÷ 1,10. Pour un taux réduit à 5,5% : HT = TTC ÷ 1,055.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les 4 taux de TVA en vigueur en France métropolitaine ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les 4 taux légaux sont : 1° Taux normal à 20% (majorité des biens et services) ; 2° Taux intermédiaire à 10% (restauration, transports, rénovation thermique simple) ; 3° Taux réduit à 5,5% (alimentation de première nécessité, énergie, livres, rénovation énergétique) ; 4° Taux super-réduit à 2,1% (médicaments remboursables, presse).',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment calculer son numéro de TVA intracommunautaire ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En France, le numéro de TVA intracommunautaire est composé des lettres FR, suivies d’une clé à 2 chiffres et de votre numéro SIREN à 9 chiffres. La clé se calcule par la formule mathématique : Clé = [12 + 3 × (SIREN modulo 97)] modulo 97.',
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
          <span className="text-slate-900 font-bold">Calculateur TVA France</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Percent className="w-3.5 h-3.5" />
            <span>Barème Officiel Code Général des Impôts (Articles 278 et s.)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculateur TVA 2026 : HT en TTC & TTC en HT
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calculez instantanément le montant Hors Taxes (HT), la taxe sur la valeur ajoutée et le prix Toutes Taxes Comprises (TTC) selon les 4 taux applicables en France métropolitaine, Corse et DOM. Générez votre clé de TVA intracommunautaire.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceTvaEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Formules de conversion TVA en France</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Pour passer du <strong>HT au TTC au taux de 20% : multipliez le HT par 1,20</strong> (ex: 100 € HT = 120 € TTC). Pour obtenir le <strong>HT à partir du TTC : divisez le TTC par 1,20</strong> (ex: 120 € TTC ÷ 1,20 = 100 € HT). Pour les taux de 10% et 5,5%, appliquez respectivement les diviseurs <strong>1,10</strong> et <strong>1,055</strong>.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau des Taux de TVA en France et Champs d’Application Légaux
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Synthèse officielle des articles 278, 278 bis, 278 quater et 281 quater du CGI.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Taux de TVA</th>
                  <th className="py-3 px-3">Multiplicateur (HT vers TTC)</th>
                  <th className="py-3 px-3">Diviseur Inversé (TTC vers HT)</th>
                  <th className="py-3 px-3">Principaux Produits & Services Concernés</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-blue-700">20,00% (Normal)</td>
                  <td className="py-3 px-3 font-mono">× 1,200</td>
                  <td className="py-3 px-3 font-mono">÷ 1,200</td>
                  <td className="py-3 px-3">Biens de consommation courante, matériel, prestations intellectuelles, alcool</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-emerald-700">10,00% (Intermédiaire)</td>
                  <td className="py-3 px-3 font-mono">× 1,100</td>
                  <td className="py-3 px-3 font-mono">÷ 1,100</td>
                  <td className="py-3 px-3">Restauration sur place, transports en commun, rénovation de logements &gt; 2 ans</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-purple-700">5,50% (Réduit)</td>
                  <td className="py-3 px-3 font-mono">× 1,055</td>
                  <td className="py-3 px-3 font-mono">÷ 1,055</td>
                  <td className="py-3 px-3">Nourriture de base, livres, abonnements électricité/gaz, isolation thermique RGE</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-amber-700">2,10% (Super-Réduit)</td>
                  <td className="py-3 px-3 font-mono">× 1,021</td>
                  <td className="py-3 px-3 font-mono">÷ 1,021</td>
                  <td className="py-3 px-3">Médicaments remboursés par la Sécurité sociale, presse papier et en ligne IPG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Mécanisme de Déclaration et Déductibilité de la TVA en Entreprise
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-blue-600" />
              1. TVA Collectée vs TVA Déductible : Le Calcul du Versement au Fisc
            </h3>
            <p>
              Pour une entreprise assujettie à la TVA, cet impôt indirect est financièrement neutre. L’entreprise agit comme collecteur pour le compte de l’État :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>TVA collectée :</strong> La taxe facturée et perçue auprès de vos clients sur vos ventes ou prestations.</li>
              <li><strong>TVA déductible :</strong> La taxe que vous avez payée à vos propres fournisseurs sur les achats nécessaires à votre activité.</li>
              <li><strong>TVA à décaisser :</strong> TVA collectée − TVA déductible. Si la TVA déductible excède la TVA collectée, vous constatez un <strong>crédit de TVA</strong> dont vous pouvez demander le remboursement au Trésor Public.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              2. Régimes d’Imposition : Réel Simplifié vs Réel Normal
            </h3>
            <p>
              En fonction du chiffre d’affaires de votre entreprise, vous relevez de deux régimes de déclaration de TVA :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Régime réel simplifié :</strong> Deux acomptes semestriels (en juillet et décembre) et une régularisation annuelle au moyen du formulaire CA12.</li>
              <li><strong>Régime réel normal :</strong> Déclaration et télérèglement mensuels (formulaire CA3) déposés sur votre espace professionnel impots.gouv.fr entre le 15 et le 24 de chaque mois.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-600" />
              3. Ventes Transfrontalières dans l’Union Européenne
            </h3>
            <p>
              Lorsqu’une entreprise française assujettie vend un bien ou réalise une prestation pour un client professionnel établi dans un autre État membre de l’UE disposant d’un numéro de TVA intracommunautaire valide (vérifié via le système VIES de la Commission européenne), la facture est émise <strong>hors taxes</strong> en application du mécanisme d’autoliquidation de la taxe (art. 262 ter I du CGI pour les livraisons de biens, ou art. 283-2 pour les prestations de services).
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur la TVA en France
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on récupérer la TVA sur l’essence et le gazole ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Pour les véhicules utilitaires professionnels, la TVA sur le gazole et l’essence est déductible à 100%. Pour les véhicules de tourisme, la TVA sur les carburants est déductible à 80% (essence et gazole). L’électricité pour véhicules électriques est déductible à 100%.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">La TVA sur les nuits d’hôtel est-elle déductible ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. Selon l’article 206 de l’annexe II du CGI, la TVA grevant les dépenses de logement et d’hébergement engagées pour les dirigeants et salariés de l’entreprise n’est jamais déductible, même en déplacement professionnel.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que l’autoliquidation de la TVA dans le bâtiment ?</h3>
              <p className="text-slate-600 leading-relaxed">
                En cas de sous-traitance dans les travaux de construction ou rénovation immobilière (article 283-2 nonies du CGI), le sous-traitant facture ses travaux sans TVA. C’est l’entreprise principale qui doit autoliquider la taxe sur sa propre déclaration.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment vérifier la validité d’un numéro de TVA européen ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Utilisez le portail officiel VIES (système d’échange d’informations sur la TVA) de la Commission européenne pour confirmer que le numéro est actif et correspond au nom officiel de l’entreprise partenaire.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quel taux appliquer pour les travaux de rénovation énergétique ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Les travaux d’amélioration de la qualité énergétique (isolation thermique, pompes à chaleur, chaudières biomasse) réalisés dans un logement achevé depuis plus de 2 ans bénéficient du taux super-réduit de 5,5% (art. 278-0 bis A du CGI).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Existe-t-il un taux de TVA à 0% en France ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Les exportations hors Union européenne et les livraisons intracommunautaires sont exonérées de TVA (taux effectif de 0%), tout en conservant le droit à déduction de la TVA d’amont.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils de Facturation & Fiscalité d’Entreprise
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
              <span>Validateur SIREN & SIRET</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-charges-urssaf"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Charges URSSAF Micro</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-cout-embauche-employeur"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Coût Superbrut Employeur</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
