import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FrancePdfCompressorEngine } from '@/components/international/FrancePdfCompressorEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, FileUp, CheckCircle2, Lock, FileText, Landmark, ServerOff } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Compresseur PDF France Travail, CAF & Ameli (< 2 Mo) 2026 | 100% Local & Sécurisé',
  description:
    'Compressez gratuitement vos documents PDF confidentiels sous la limite de 2 Mo ou 4 Mo pour les téléprocédures France Travail, CAF, Ameli, ANTS et impots.gouv.fr. Traitement 100% dans votre navigateur sans téléversement sur serveur.',
  keywords: [
    'compresseur pdf france travail moins de 2 mo',
    'reduire taille pdf caf ameli gratuit',
    'compresser document justificatif ants',
    'compression pdf confidentiel local sans serveur',
    'taille max fichier teleprocedure service public',
    'reduire poids pdf fiche de paie contrat',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/compresseur-pdf-france-travail`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/compresseur-pdf-france-travail`,
      'fr': `${SITE_URL}/fr/compresseur-pdf-france-travail`,
      'x-default': `${SITE_URL}/fr/compresseur-pdf-france-travail`,
    },
  },
  openGraph: {
    title: 'Compresseur PDF France Travail, CAF & Ameli (<2 Mo) | Kagazo France',
    description:
      'Réduisez la taille de vos PDF administratifs pour téléprocédures publiques en France sans perte de lisibilité ni envoi sur serveur.',
    url: `${SITE_URL}/fr/compresseur-pdf-france-travail`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function PdfCompressorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Compresseur PDF Démarches Administratives France 2026',
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
          'Compresseur PDF sécurisé exécuté 100% dans le navigateur pour respecter les plafonds de 2 Mo et 4 Mo imposés par les téléprocédures administratives françaises (France Travail, CAF, Ameli, ANTS).',
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
            name: 'Compresseur PDF Démarches',
            item: `${SITE_URL}/fr/compresseur-pdf-france-travail`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la taille maximale autorisée pour un document sur France Travail ou la CAF ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sur les portails France Travail (ex-Pôle Emploi) et de la CAF, la taille limite de chaque document téléversé est strictement fixée à 2 Mo (2 048 Ko). Les fichiers scannés en haute résolution dépassent souvent 5 Mo à 10 Mo et sont systématiquement rejetés par le serveur.',
            },
          },
          {
            '@type': 'Question',
            name: 'Mes documents personnels et confidentiels sont-ils stockés sur vos serveurs ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Non, absolument pas. Notre compresseur utilise la technologie WebAssembly et JavaScript local : la compression est exécutée intégralement sur votre propre ordinateur ou smartphone. Aucun fichier ne transite sur internet, garantissant une conformité RGPD absolue pour vos fiches de paie, avis d’impôt et contrats.',
            },
          },
          {
            '@type': 'Question',
            name: 'Le document compressé reste-t-il parfaitement lisible pour l’administration ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui. L’algorithme réduit la résolution excessive des images scannées à 150 DPI (la résolution idéale pour la lecture écran et l’impression administrative) sans jamais altérer la lisibilité des textes, chiffres ou tampons officiels.',
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
          <span className="text-slate-900 font-bold">Compresseur PDF Démarches</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Lock className="w-3.5 h-3.5" />
            <span>Traitement 100% Local Sécurisé • Conforme RGPD Sans Serveur</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Compresseur PDF France Travail, CAF & Ameli (&lt; 2 Mo)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Réduisez la taille de vos fichiers PDF pour débloquer vos démarches en ligne sur les portails publics français (plafonds stricts de 2 Mo ou 4 Mo). Vos documents sensibles (bulletins de paie, avis d’imposition, contrats) ne quittent jamais votre appareil.
          </p>
        </div>

        {/* Interactive Engine */}
        <FrancePdfCompressorEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Plafonds de taille PDF pour l’administration française</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Les téléprocédures publiques en France (<strong>France Travail, CAF, Ameli, ANTS</strong>) imposent une limite stricte de <strong>2 Mo par fichier PDF téléversé</strong> (4 Mo sur impots.gouv.fr). Grâce à notre moteur client local, vos PDF volumineux sont allégés de 60% à 85% sans perte de lisibilité et sans aucun envoi vers un serveur externe.
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Plafonds Techniques des Portails Publics Français (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Vérifiez la taille maximale admise par portail officiel pour vos pièces justificatives.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Portail Administratif</th>
                  <th className="py-3 px-3">Taille Max par Document</th>
                  <th className="py-3 px-3">Formats Acceptés</th>
                  <th className="py-3 px-3">Pièces Fréquemment Concernées</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">France Travail (Pôle Emploi)</td>
                  <td className="py-3 px-3 font-bold text-red-600">2 Mo (2 048 Ko)</td>
                  <td className="py-3 px-3 font-mono">PDF, JPG, PNG</td>
                  <td className="py-3 px-3">Attestation employeur, bulletins de salaire, convention de rupture</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">CAF (Allocations Familiales)</td>
                  <td className="py-3 px-3 font-bold text-red-600">2 Mo</td>
                  <td className="py-3 px-3 font-mono">PDF, JPG</td>
                  <td className="py-3 px-3">Quittances de loyer, déclarations de ressources trimestrielles, RIB</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Ameli (Assurance Maladie)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">2 à 4 Mo</td>
                  <td className="py-3 px-3 font-mono">PDF, JPG, PNG</td>
                  <td className="py-3 px-3">Feuilles de soins scannées, arrêts de travail, certificats médicaux</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">ANTS (Titres sécurisés)</td>
                  <td className="py-3 px-3 font-bold text-blue-700">3 Mo</td>
                  <td className="py-3 px-3 font-mono">PDF, JPG, PNG</td>
                  <td className="py-3 px-3">Justificatifs de domicile de moins de 6 mois, acte de naissance</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Impots.gouv.fr</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">5 Mo</td>
                  <td className="py-3 px-3 font-mono">PDF, JPG</td>
                  <td className="py-3 px-3">Justificatifs de dons, reçus fiscaux, déclarations 2044 foncières</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Pourquoi Vos PDF Scannés Pèsent Trop Lourd et Comment les Alléger ?
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileUp className="w-4 h-4 text-blue-600" />
              1. Le Piège de la Résolution des Scanners Domestiques
            </h3>
            <p>
              Lorsque vous numérisez un document avec une imprimante multifonction ou l’appareil photo d’un smartphone moderne, la résolution par défaut est souvent de 300 à 600 DPI (dots per inch) en couleurs 24 bits. Un simple contrat de 4 pages génère ainsi un PDF de 12 à 25 Mo !
            </p>
            <p>
              Or, pour les serveurs de l’administration publique, une résolution de <strong>150 DPI en noir et blanc ou niveaux de gris</strong> est amplement suffisante pour garantir une lisibilité optique parfaite et la reconnaissance automatique des caractères (OCR).
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ServerOff className="w-4 h-4 text-emerald-600" />
              2. Sécurité Maximale : Le Traitement « Zero-Server »
            </h3>
            <p>
              La plupart des compresseurs PDF en ligne gratuits (iLovePDF, Smallpdf) envoient vos fichiers sur leurs serveurs distants dans le cloud pour les convertir. Téléverser un bulletin de paie mentionnant votre numéro de sécurité sociale ou un avis d’imposition complet sur un serveur inconnu représente un risque majeur pour votre vie privée.
            </p>
            <p>
              Notre outil fonctionne à 100% dans votre navigateur via des bibliothèques JavaScript compilées : <strong>aucun octet ne transite par nos serveurs</strong>. Vous pouvez même couper votre connexion internet après le chargement de la page : la compression continue de fonctionner hors ligne !
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              3. Astuces pour les Documents Multipage Récalcitrants
            </h3>
            <p>
              Si votre document comporte plus de 15 pages et reste supérieur à 2 Mo même après compression, appliquez ces recommandations :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Supprimez les pages blanches ou de conditions générales inutiles à l’instruction de votre dossier.</li>
              <li>Optez pour le mode de compression « Niveaux de gris » si la couleur n’apporte aucune information légale essentielle.</li>
              <li>Scindez le document en deux tomes (ex: Bulletin-1.pdf et Bulletin-2.pdf) lorsque le portail autorise le dépôt de plusieurs pièces.</li>
            </ul>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur la Compression PDF
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Le compresseur fonctionne-t-il sur smartphone (iPhone / Android) ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. L’outil est parfaitement optimisé pour Safari Mobile et Chrome sur smartphone ou tablette. Vous pouvez directement compresser les photos de documents prises depuis votre appareil photo.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Le document garde-t-il sa valeur juridique après compression ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui. La compression n’altère ni le texte, ni la disposition, ni les signatures manuscrites. Le document conserve sa pleine force probante auprès des organismes sociaux et des tribunaux.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Combien coûte l’outil et y a-t-il une limite de fichiers ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le service est 100% gratuit, sans inscription, sans publicité intrusive et sans aucune limite quotidienne sur le nombre de documents que vous pouvez traiter.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Que faire si mon PDF est protégé par un mot de passe ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Un document PDF chiffré par mot de passe doit être déverrouillé avant d’être compressé. Ouvrez-le avec votre lecteur habituel et faites « Imprimer vers PDF » pour générer une copie non verrouillée.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Pourquoi mon fichier ne réduit-il pas beaucoup ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Si votre PDF ne contient que du texte vectoriel pur (généré par un traitement de texte comme Word) sans images scannées, il est déjà optimisé et sa taille ne peut être que très peu réduite.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Comment vérifier la taille exacte d’un fichier sur ordinateur ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Sous Windows, faites un clic droit sur le fichier puis « Propriétés » ; sous Mac, faites « Lire les informations » (Cmd + I). Vérifiez la valeur en Mo ou Ko (2 Mo = 2 048 Ko).
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour vos Démarches Sociales & Professionnelles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/photo-identite-passeport-ants"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Photo d’Identité ANTS</span>
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
              href="/fr/calculateur-indemnite-fin-cdd"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Prime Fin de CDD</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/calculateur-salaire-net-brut"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Salaire Brut en Net</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
