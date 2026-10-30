import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { NumberToWordsEngine } from '@/components/international/NumberToWordsEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, BookOpen, CheckCircle2, Edit3, Scale, FileText, Landmark } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Convertisseur Chiffre en Lettre 2026 | Remplir un Chèque en Euros (Règles Académie)',
  description:
    'Convertissez instantanément n’importe quel montant en chiffres en toutes lettres pour rédiger vos chèques bancaires, devis et factures. Conforme aux règles d’accord de l’Académie française (règles de 1990, accord de vingt, cent et mille).',
  keywords: [
    'convertisseur chiffre en lettre euro cheque',
    'ecrire somme en toutes lettres cheque regle',
    'accord vingt et cent orthographe 1990',
    'mille invariable cheque francais',
    'redaction cheque somme en lettre prime chiffre',
    'traducteur montant lettre pour contrat',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
    languages: HREFLANG_REGISTRY.french_numbers.locales,
  },
  openGraph: {
    title: 'Convertisseur Chiffre en Lettre en Ligne | Remplir un Chèque en Euros',
    description:
      'Générez l’orthographe exacte de vos sommes d’argent en euros pour vos chèques bancaires et contrats légaux.',
    url: `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function NumberToWordsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Convertisseur Chiffres en Lettres France 2026',
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
          'Outil de conversion instantanée de montants monétaires et nombres en toutes lettres conforme aux règles de l’Académie française et à l’article L. 131-10 du Code monétaire et financier.',
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
            name: 'Chiffres en Lettres',
            item: `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle somme fait foi en cas d’erreur entre chiffres et lettres sur un chèque ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En vertu de l’article L. 131-10 du Code monétaire et financier, en cas de divergence entre le montant inscrit en chiffres dans la case et le montant écrit en toutes lettres sur les lignes du chèque, c’est obligatoirement la somme écrite en toutes lettres qui prévaut légalement auprès de la banque.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quand doit-on mettre un « s » à cent et à vingt ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '« Cent » et « vingt » prennent la marque du pluriel « s » uniquement lorsqu’ils sont multipliés ET qu’aucun autre adjectif numéral ne les suit directement (ex: « quatre-vingts euros » et « quatre cents euros », mais « quatre-vingt-trois euros » et « quatre cent cinquante euros »).',
            },
          },
          {
            '@type': 'Question',
            name: 'Le mot « mille » s’accorde-t-il au pluriel ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Non, jamais. L’adjectif numéral « mille » est strictement invariable dans la langue française (ex: « trois mille euros », « dix mille euros »). En revanche, « million » et « milliard » sont des substantifs (noms communs) qui prennent obligatoirement un « s » au pluriel (ex: « deux millions d’euros »).',
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
          <span className="text-slate-900 font-bold">Chiffres en Lettres</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Règles Officielles de l’Académie Française & Réforme de 1990</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Convertisseur de Chiffres en Lettres (Euros)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Traduisez instantanément tout montant en euros et centimes en toutes lettres. Rédigez vos chèques bancaires, reconnaissances de dette, actes notariés et factures sans aucune faute grammaticale ni risque de contestation bancaire.
          </p>
        </div>

        {/* Interactive Engine */}
        <NumberToWordsEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Règles d’écriture des chèques en français</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Pour rédiger un chèque sans erreur : liez tous les mots par des tirets (réforme 1990 : <em>« deux-mille-quatre-vingts euros »</em>). <strong>« Vingt » et « cent » prennent un « s » au pluriel uniquement s’ils terminent le nombre</strong> (ex: 80 = quatre-vingts, 82 = quatre-vingt-deux). <strong>« Mille » est strictement invariable</strong>. En cas de litige, la somme en lettres prévaut sur les chiffres (Art. L. 131-10 CMF).
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Tableau des Montants Courants Rédigés en Toutes Lettres
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Orthographe exacte recommandée pour les chèques bancaires selon les rectifications de 1990 de l’Académie française.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Montant en Chiffres</th>
                  <th className="py-3 px-3">Orthographe Recommandée (1990)</th>
                  <th className="py-3 px-3">Particularité Grammaticale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">80,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">quatre-vingts euros</td>
                  <td className="py-3 px-3 text-slate-600">Vingt multiplié sans chiffre derrière → prend un « s »</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">85,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">quatre-vingt-cinq euros</td>
                  <td className="py-3 px-3 text-slate-600">Vingt suivi de cinq → reste invariable sans « s »</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">200,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">deux cents euros</td>
                  <td className="py-3 px-3 text-slate-600">Cent multiplié en position finale → prend un « s »</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">250,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">deux cent cinquante euros</td>
                  <td className="py-3 px-3 text-slate-600">Cent suivi de cinquante → reste invariable sans « s »</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">1 000,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">mille euros</td>
                  <td className="py-3 px-3 text-slate-600">On n’écrit pas « un mille » pour la valeur 1 000</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">3 000,00 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">trois mille euros</td>
                  <td className="py-3 px-3 text-slate-600">Mille est invariable, jamais de « s »</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">1 480,50 €</td>
                  <td className="py-3 px-3 font-bold text-blue-700">mille-quatre-cent-quatre-vingts euros et cinquante centimes</td>
                  <td className="py-3 px-3 text-slate-600">Application combinée des traits d’union et accords</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Les Règles d’Orthographe des Nombres et la Rédaction Juridique
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" />
              1. La Réforme de l’Orthographe de 1990 (Traits d’Union Systématiques)
            </h3>
            <p>
              Dans l’orthographe traditionnelle, les traits d’union n’étaient utilisés que pour lier les dizaines et les unités inférieures à 100 non reliées par la conjonction « et » (ex: « soixante-dix-neuf », mais « soixante et onze » et « deux cent quatre »).
            </p>
            <p>
              Pour simplifier l’usage et éviter toute contestation sur les documents bancaires et contrats légaux, l’Académie française et le Conseil supérieur de la langue française recommandent depuis 1990 d’<strong>unir tous les éléments numéraux par des traits d’union</strong> : <em>« deux-cent-quarante-trois »</em>, <em>« un-million-deux-cent-mille »</em>. Les deux orthographes sont acceptées par les banques.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              2. La Prééminence Légale des Lettres sur les Chiffres (Art. L. 131-10 CMF)
            </h3>
            <p>
              L’article L. 131-10 du Code monétaire et financier protège les émetteurs de chèques contre les fraudes par ajout de chiffres (par exemple, un escroc rajoutant un zéro pour transformer 100 € en 1 000 €). La loi dispose expressément :
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 py-1.5 italic bg-blue-50/50 rounded-r-xl text-slate-800 font-medium">
              « Le chèque dont le montant est écrit à la fois en toutes lettres et en chiffres vaut, en cas de différence, pour la somme écrite en toutes lettres. »
            </blockquote>
            <p>
              C’est pourquoi il est essentiel de tirer un trait continu après le dernier mot écrit sur les lignes du chèque pour interdire tout ajout ultérieur frauduleux.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              3. Gestion des Centimes sur un Chèque
            </h3>
            <p>
              Pour indiquer les centimes sur un chèque bancaire, deux formulations sont couramment admises par les établissements de crédit :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Formule 100% en lettres :</strong> <em>« deux-cent-cinquante euros et quarante-deux centimes »</em>.</li>
              <li><strong>Formule fractionnaire :</strong> <em>« deux-cent-cinquante euros et 42/100 »</em>. Cette méthode est très utilisée dans les logiciels comptables et d’émission de chèques d’entreprise.</li>
            </ul>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur l’Écriture des Sommes en Lettres
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on utiliser un stylo effaçable pour remplir un chèque ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Absolument pas. L’utilisation de stylos à encre thermosensible ou effaçable est formellement proscrite pour les chèques et documents officiels en raison des risques évidents de falsification après émission. Utilisez toujours un stylo à bille noir ou bleu indélébile.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Faut-il mettre une majuscule au début de la somme ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Il est d’usage de commencer par une majuscule (ex: « Trois cents euros... ») et de coller le premier mot au début de la ligne d’écriture pour empêcher quiconque de rajouter un mot devant.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quelle est la durée de validité légale d’un chèque ?</h3>
              <p className="text-slate-600 leading-relaxed">
                En France métropolitaine, un chèque bancaire peut être encaissé pendant 1 an et 8 jours à compter de sa date de rédaction. Passé ce délai, la banque le rejettera pour prescription légale.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment écrire les montants en Belgique et en Suisse ?</h3>
              <p className="text-slate-600 leading-relaxed">
                En Belgique et en Suisse, on utilise « septante » (70) et « nonante » (90). En Suisse francophone, « huitante » (80) est également courant. Notre outil propose l’orthographe standard de l’Académie française en vigueur pour les chèques français.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on raturer un mot sur un chèque ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Toute rature, correction au blanc correcteur ou surcharge entraîne quasi-systématiquement le rejet automatique du chèque par le centre de traitement bancaire. En cas d’erreur, barrez le chèque avec la mention « ANNULÉ » et rédigez-en un nouveau.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">L’écriture de la devise « euros » est-elle obligatoire ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. Sur la ligne d’ordre du montant en toutes lettres, vous devez expressément faire figurer le mot « euros » (avec un « s » au pluriel) après la somme entière.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils de Facturation & Documents Administratifs
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
              href="/fr/calculateur-duree-travail-heures-decimales"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Convertisseur Heures Décimales</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-tva-francaise"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Calculateur TVA</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
