import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FranceSirenSiretEngine } from '@/components/international/FranceSirenSiretEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, BookOpen, Building2, CheckCircle2, Search, Hash, Lock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Validateur SIREN & SIRET Gratuit 2026 | Contrôle Algorithme de Luhn (INSEE)',
  description:
    'Vérifiez instantanément la validité d’un numéro SIREN (9 chiffres) ou SIRET (14 chiffres) d’une entreprise française avec l’algorithme officiel de contrôle de Luhn (clé INSEE) et calculez son numéro de TVA intracommunautaire.',
  keywords: [
    'validateur siren siret gratuit luhn',
    'verifier numero siren insee en ligne',
    'calculer cle luhn siret 14 chiffres',
    'structure identifiant siret nic siege',
    'calculer tva intracommunautaire a partir siren',
    'annuaire entreprise registre insee',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/validateur-siren-siret`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/validateur-siren-siret`,
      'fr': `${SITE_URL}/fr/validateur-siren-siret`,
      'x-default': `${SITE_URL}/fr/validateur-siren-siret`,
    },
  },
  openGraph: {
    title: 'Validateur SIREN & SIRET Gratuit (Contrôle Luhn INSEE) | Kagazo France',
    description:
      'Vérifiez la structure et la conformité d’un SIREN (9 chiffres) ou SIRET (14 chiffres) selon la formule officielle de Luhn de l’INSEE.',
    url: `${SITE_URL}/fr/validateur-siren-siret`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function SirenSiretPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Validateur Officiel SIREN et SIRET France 2026',
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
          'Outil de vérification de conformité des identifiants d’entreprises françaises SIREN et SIRET selon l’algorithme de contrôle de Luhn défini par l’INSEE.',
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
            name: 'Validateur SIREN / SIRET',
            item: `${SITE_URL}/fr/validateur-siren-siret`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre un numéro SIREN et un numéro SIRET ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le SIREN (9 chiffres) identifie l’entreprise ou l’entité juridique dans sa globalité. Le SIRET (14 chiffres) identifie un établissement géographique précis de cette entreprise. Il est composé des 9 chiffres du SIREN suivis du NIC de 5 chiffres (Numéro Interne de Classement). Une entreprise possède un seul SIREN, mais autant de SIRET que d’adresses d’exercice.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne l’algorithme de Luhn sur le SIREN et le SIRET ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L’INSEE applique la formule de Luhn (modulo 10) : en partant de la droite vers la gauche, on double un chiffre sur deux. Si le double dépasse 9, on soustrait 9. On additionne l’ensemble des chiffres obtenus : pour qu’un SIREN ou SIRET soit valide, cette somme totale doit obligatoirement être un multiple de 10 (excluant La Poste qui suit une règle dérogatoire).',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment retrouver le numéro de TVA intracommunautaire depuis un SIREN ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En France, le numéro de TVA intracommunautaire est composé du code pays FR, d’une clé de contrôle à 2 chiffres, et du numéro SIREN (ex: FR XX 123456789). La clé se calcule par la formule mathématique : Clé = [12 + 3 × (SIREN modulo 97)] modulo 97.',
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
          <span className="text-slate-900 font-bold">Validateur SIREN / SIRET</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Building2 className="w-3.5 h-3.5" />
            <span>Algorithme de Contrôle Officiel INSEE (Formule de Luhn)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Validateur SIREN & SIRET (Contrôle Luhn 2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Contrôlez instantanément la conformité mathématique d’un numéro SIREN (9 chiffres) ou SIRET (14 chiffres) avant d’émettre un contrat, de régler une facture fournisseur ou d’enregistrer un nouveau client professionnel.
          </p>
        </div>

        {/* Interactive Engine */}
        <FranceSirenSiretEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Structure et validation SIREN / SIRET en France</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            En France, le <strong>SIREN (9 chiffres)</strong> identifie l’entreprise et le <strong>SIRET (14 chiffres)</strong> identifie son établissement géographique (SIREN + NIC 5 chiffres). Leur validité est garantie par la <strong>formule de contrôle de Luhn (modulo 10)</strong>. Un SIREN valide permet également de calculer immédiatement le numéro de TVA intracommunautaire (FR + clé à 2 chiffres).
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Anatomie des Identifiants d’Entreprise en France
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Décomposition des différents numéros officiels attribués par l’INSEE et l’administration fiscale.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Identifiant</th>
                  <th className="py-3 px-3">Longueur</th>
                  <th className="py-3 px-3">Structure Interne</th>
                  <th className="py-3 px-3">Portée Juridique</th>
                  <th className="py-3 px-3">Algorithme de Contrôle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Numéro SIREN</td>
                  <td className="py-3 px-3">9 chiffres</td>
                  <td className="py-3 px-3 font-mono text-blue-700">123 456 789</td>
                  <td className="py-3 px-3">Entité juridique unique (Société, Micro-entreprise)</td>
                  <td className="py-3 px-3 font-medium text-emerald-700">Clé de Luhn (mod 10)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Code NIC</td>
                  <td className="py-3 px-3">5 chiffres</td>
                  <td className="py-3 px-3 font-mono text-blue-700">00014</td>
                  <td className="py-3 px-3">Numéro d’ordre de l’établissement (00014 = Siège social)</td>
                  <td className="py-3 px-3 font-medium text-slate-500">Inclus dans le SIRET</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Numéro SIRET</td>
                  <td className="py-3 px-3">14 chiffres</td>
                  <td className="py-3 px-3 font-mono text-blue-700">123 456 789 00014</td>
                  <td className="py-3 px-3">Établissement physique localisé (siège, succursale, magasin)</td>
                  <td className="py-3 px-3 font-medium text-emerald-700">Clé de Luhn (mod 10)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">TVA Intracommunautaire</td>
                  <td className="py-3 px-3">13 caractères</td>
                  <td className="py-3 px-3 font-mono text-purple-700">FR 44 123456789</td>
                  <td className="py-3 px-3">Facturation intracommunautaire UE et douanes</td>
                  <td className="py-3 px-3 font-medium text-emerald-700">Clé modulo 97</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Comprendre le Rôle du SIREN et du SIRET dans les Échanges Commerciaux
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              1. L’Attribution par le Répertoire Sirene de l’INSEE
            </h3>
            <p>
              Toute entreprise, société commerciale (SAS, SARL, SA), société civile (SCI), artisan, commerçant ou micro-entrepreneur exerçant en France se voit attribuer un numéro SIREN unique lors de son immatriculation au Guichet Unique de l’INPI.
            </p>
            <p>
              Ce numéro reste inchangé pendant toute la vie de l’entreprise, jusqu’à sa dissolution ou cessation d’activité. Même en cas de changement de nom, d’objet social ou de transfert de siège, le SIREN ne change jamais.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Hash className="w-4 h-4 text-emerald-600" />
              2. L’Algorithme de Luhn : Sécurité Mathématique Anti-Fraude
            </h3>
            <p>
              L’algorithme de Luhn permet de détecter instantanément les erreurs de frappe (inversion de deux chiffres, omission ou faute de saisie). Lorsque vous saisissez un numéro SIREN ou SIRET sur Kagazo, notre moteur exécute les calculs en temps réel dans votre navigateur :
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li>On parcourt les chiffres de droite à gauche.</li>
              <li>Chaque chiffre situé en position impaire (à partir de la fin) est multiplié par 2.</li>
              <li>Si le produit est supérieur à 9, on soustrait 9 (ce qui équivaut à additionner les deux chiffres du produit).</li>
              <li>On somme tous les chiffres (ceux multipliés et ceux laissés intacts).</li>
              <li>Si la somme finale est un multiple de 10 (ex: 30, 50, 70), le numéro est conforme à l’algorithme INSEE.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-600" />
              3. Protection des Données Personnelles et Statut Non-Diffusible
            </h3>
            <p>
              Les entrepreneurs individuels et micro-entrepreneurs ont le droit légal de demander à l’INSEE que leurs données soient classées comme <strong>non-diffusibles</strong> (article A123-96 du Code de commerce). Dans ce cas, les informations de l’entreprise ne sont pas rendues publiques sur les annuaires ouverts, mais le numéro SIREN/SIRET reste pleinement valide juridiquement et vérifiable par l’algorithme de Luhn.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur le SIREN et le SIRET
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Un numéro mathématiquement valide existe-t-il forcément ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Pas obligatoirement. L’algorithme de Luhn valide la structure mathématique et élimine les fautes de frappe. Pour s’assurer que l’entreprise est bien immatriculée et active, vous pouvez consulter le répertoire officiel de l’INSEE ou l’INPI.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quelle est l’exception de La Poste pour le SIRET ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Les établissements de La Poste (SIREN 356 000 000) ne suivent pas la formule de Luhn pour leur code NIC. Leur clé de contrôle repose sur une somme de chiffres devant être un multiple de 5.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Une association loi 1901 possède-t-elle un SIRET ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Une association n’a de SIRET que si elle emploie des salariés, demande des subventions publiques ou exerce une activité économique lucrative soumise aux impôts commerciaux.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Le numéro SIREN change-t-il lors d’un déménagement ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Non. Le SIREN reste rigoureusement identique. En revanche, le déménagement entraîne la fermeture de l’ancien établissement et l’ouverture d’un nouveau, ce qui modifie les 5 derniers chiffres (NIC) et donne un nouveau numéro SIRET.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Où trouver le code APE / NAF d’une entreprise ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le code APE (Activité Principale Exercée, 4 chiffres et 1 lettre) est attribué par l’INSEE en même temps que le SIREN sur l’avis de situation Sirene, à des fins principalement statistiques.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Combien de temps faut-il pour obtenir son SIRET après création ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Après dépôt du dossier sur le Guichet Unique de l’INPI, l’INSEE génère généralement le certificat d’immatriculation avec SIREN et SIRET sous 24 à 72 heures ouvrées pour une micro-entreprise.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour Vérifications d’Entreprises & Facturation
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
              href="/fr/calculateur-tva-francaise"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Calculateur TVA 20% & 10%</span>
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
              <span>Coût Embauche Employeur</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
