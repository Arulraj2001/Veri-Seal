import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FrancePhotoAntsEngine } from '@/components/international/FrancePhotoAntsEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Sparkles, Camera, CheckCircle2, FileCheck, AlertCircle, Eye, Printer, Lock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Photo d’Identité Biométrique ANTS 35×45mm Gratuite 2026 | Norme ISO/IEC 19794-5',
  description:
    'Créez et recadrez vos photos d’identité biométriques 35x45 mm conformes aux critères officiels du Ministère de l’Intérieur et de l’ANTS pour passeport français, carte nationale d’identité (CNI), titre de séjour et permis de conduire. Planche 10x15 cm prête à imprimer.',
  keywords: [
    'photo identite biometrique ants gratuit en ligne',
    'norme photo passeport francais 35x45 mm',
    'hauteur visage photo ants 32 a 36 mm',
    'planche photo identite 10x15 a imprimer',
    'criteres conformite photo carte identite cni',
    'fond gris clair bleu photo biometrique refus',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/photo-identite-passeport-ants`,
    languages: {
      'fr-FR': `${SITE_URL}/fr/photo-identite-passeport-ants`,
      'fr': `${SITE_URL}/fr/photo-identite-passeport-ants`,
      'x-default': `${SITE_URL}/fr/photo-identite-passeport-ants`,
    },
  },
  openGraph: {
    title: 'Photo d’Identité Biométrique ANTS 35×45mm Gratuite | Kagazo France',
    description:
      'Générez une planche d’impression 10x15 cm de 6 photos d’identité conformes aux exigences du Ministère de l’Intérieur et de l’ANTS.',
    url: `${SITE_URL}/fr/photo-identite-passeport-ants`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function PhotoAntsPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Générateur Photo d’Identité Biométrique ANTS France 2026',
        applicationCategory: 'MultimediaApplication',
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
          'Outil en ligne gratuit de recadrage et calibrage de photos d’identité biométriques 35×45 mm aux normes officielles françaises ISO/IEC 19794-5 et de l’ANTS.',
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
            name: 'Photo d’Identité ANTS',
            item: `${SITE_URL}/fr/photo-identite-passeport-ants`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelles sont les dimensions officielles d’une photo d’identité en France ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La photo doit mesurer 35 mm de large sur 45 mm de haut. La taille du visage (du bas du menton au sommet du crâne, hors chevelure) doit obligatoirement occuper entre 32 et 36 mm, soit environ 70% à 80% de la surface du cliché.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi le fond blanc est-il formellement interdit en France ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le Ministère de l’Intérieur exige un fond uni de couleur claire (gris clair ou bleu clair). Le fond blanc pur est strictement interdit car il se confond avec le fond des titres officiels sécurisés et empêche le découpage automatique par les scanners préfectoraux de l’ANTS.',
            },
          },
          {
            '@type': 'Question',
            name: 'Peut-on porter des lunettes de vue sur une photo d’identité ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les lunettes sont autorisées mais déconseillées. Si vous les portez : la monture ne doit pas masquer les yeux, les verres ne doivent être ni teintés ni colorés, et il ne doit y avoir aucun reflet de flash sur les verres. En cas de doute en mairie, retirez simplement vos lunettes.',
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
          <span className="text-slate-900 font-bold">Photo d’Identité ANTS</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Camera className="w-3.5 h-3.5" />
            <span>Norme Biométrique ISO/IEC 19794-5 & Critères Officiels ANTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Générateur Photo d’Identité Biométrique ANTS (35×45 mm)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Cadrez et téléchargez gratuitement vos photos d’identité aux normes officielles françaises pour votre passeport, carte nationale d’identité (CNI), titre de séjour ou permis de conduire. Exportez une planche 10×15 cm prête à imprimer pour quelques centimes en borne photo.
          </p>
        </div>

        {/* Interactive Engine */}
        <FrancePhotoAntsEngine />

        {/* Answer Capsule (GEO Rule of 45-60 Words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Réponse Directe : Critères officiels d’une photo d’identité en France</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Une photo biométrique conforme pour les démarches françaises doit mesurer <strong>35 × 45 mm</strong>, avec une hauteur de tête comprise entre <strong>32 et 36 mm</strong>. Le fond doit être <strong>uni et clair (gris ou bleu, blanc interdit)</strong>, le visage dégagé sans couvre-chef, le regard droit et l’expression strictement neutre (bouche fermée).
          </p>
        </div>

        {/* Worked Statutory Comparison Matrix */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Grille d’Audit Officielle de Conformité Biométrique ANTS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Vérifiez scrupuleusement ces 6 critères obligatoires pour éviter tout rejet de votre dossier en mairie ou préfecture.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-900 font-bold">
                  <th className="py-3 px-3">Critère Technique</th>
                  <th className="py-3 px-3">Norme Obligatoire</th>
                  <th className="py-3 px-3">À Faire Absolument</th>
                  <th className="py-3 px-3">Cause Fréquente de Rejet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Dimensions du Cliché</td>
                  <td className="py-3 px-3">35 × 45 mm</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Respecter le gabarit de cadrage</td>
                  <td className="py-3 px-3 text-red-600">Photo 50×50 mm (format visa USA invalide)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Hauteur du Visage</td>
                  <td className="py-3 px-3">32 à 36 mm (70-80%)</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Menton au sommet du crâne centré</td>
                  <td className="py-3 px-3 text-red-600">Tête trop petite ou coupée en haut</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Couleur d’Arrière-plan</td>
                  <td className="py-3 px-3">Gris clair ou Bleu clair</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Fond parfaitement uni et sans ombre</td>
                  <td className="py-3 px-3 text-red-600">Fond blanc pur ou fond de pièce texturé</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Posture et Regard</td>
                  <td className="py-3 px-3">Face à l’objectif, regard droit</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Yeux ouverts, niveau de l’horizon</td>
                  <td className="py-3 px-3 text-red-600">Tête penchée ou regard fuyant de côté</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Expression Faciale</td>
                  <td className="py-3 px-3">Strictement neutre</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Bouche fermée, aucun sourire</td>
                  <td className="py-3 px-3 text-red-600">Sourire même léger ou dents visibles</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-slate-900">Cheveux & Accessoires</td>
                  <td className="py-3 px-3">Visage entièrement dégagé</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Oreilles visibles, mèches derrière</td>
                  <td className="py-3 px-3 text-red-600">Frange sur les yeux, serre-tête, chapeau</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Statutory Editorial Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Conseils d’Experts pour Réussir sa Photo d’Identité chez Soi
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              1. L’Éclairage : Clé Absolue contre les Ombres Portées
            </h3>
            <p>
              Pour éviter les ombres dures sur le visage ou en arrière-plan (cause majeure de rejet des photos artisanales) :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Placez-vous face à une fenêtre en lumière naturelle indirecte (évitez le plein soleil direct qui crée des reflets sur la peau).</li>
              <li>Tenez-vous à environ 50 cm à 1 mètre devant un mur blanc ou gris clair pour que votre ombre ne se projette pas sur le fond.</li>
              <li>N’utilisez pas le flash direct de votre smartphone s’il crée des yeux rouges ou un point blanc brillant sur le front.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-4 h-4 text-emerald-600" />
              2. L’Impression sur Papier Photo Brillant 10×15 cm
            </h3>
            <p>
              Ne tentez pas d’imprimer vos photos sur du papier bureautique standard 80g : l’encre bave et le cliché sera immédiatement rejeté par l’officier d’état civil.
            </p>
            <p>
              Notre outil génère une <strong>planche au format standard 10 × 15 cm (4×6 pouces) contenant 6 photos identiques</strong>. Transférez le fichier généré sur une clé USB ou votre smartphone, puis rendez-vous à la borne photo automatique de n’importe quel supermarché ou pharmacie : un tirage de haute qualité sur papier photo argentique brillant 10x15 cm vous coûtera entre 0,20 € et 0,35 € seulement (contre 8 € à 10 € en cabine Photomaton).
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-600" />
              3. Confidentialité et Traitement 100% Local
            </h3>
            <p>
              Votre vie privée et vos données biométriques sont précieuses. Sur Kagazo, <strong>votre photo ne quitte jamais votre appareil</strong> : aucun visage n’est téléversé, traité ou stocké sur un serveur distant. Tout le traitement de cadrage, redimensionnement et génération de planche s’effectue en JavaScript localement dans votre propre navigateur.
            </p>
          </div>
        </div>

        {/* Deep FAQ Section (6 Items) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Questions Fréquentes sur les Photos d’Identité ANTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Qu’est-ce que la e-photo avec signature numérique ?</h3>
              <p className="text-slate-600 leading-relaxed">
                La e-photo (avec code numérique à 22 caractères) est exigée pour les pré-demandes en ligne de permis de conduire sur le site de l’ANTS. Pour une carte d’identité ou un passeport déposé en mairie, des photos papier classiques découpées suffisent parfaitement.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Les bébés et jeunes enfants doivent-ils respecter les mêmes règles ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Oui, les dimensions et critères biométriques sont identiques pour les nouveau-nés. Aucun adulte ne doit apparaître sur la photo (ni main qui soutient la tête), et les yeux de l’enfant doivent être bien ouverts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Quelle ancienneté maximale pour la photo ?</h3>
              <p className="text-slate-600 leading-relaxed">
                L’administration préfectorale exige que les photos d’identité soient récentes et datent de moins de 6 mois au moment du dépôt de la demande en mairie.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Peut-on porter des piercings ou bijoux ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Les piercings faciaux discrets sont tolérés s’ils ne créent pas de reflets lumineux violents et ne masquent pas les traits caractéristiques des yeux, du nez ou de la bouche.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Le port du voile ou foulard est-il autorisé ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Le foulard religieux est toléré pour raisons de croyance uniquement si l’ovale entier du visage est totalement visible du bas du menton jusqu’à la racine des cheveux du front, sans aucune ombre sur le visage.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900">Faut-il découper les photos avant le rendez-vous en mairie ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Il est vivement conseillé de ne pas découper la planche vous-même si vous ne disposez pas d’un massicot de précision : les agents en mairie préfèrent souvent découper les clichés eux-mêmes avec leur emporte-pièce calibré à 35x45 mm.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Cluster Cross-Linking */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Outils pour vos Démarches Administratives Officielles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/fr/compresseur-pdf-france-travail"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Compresseur PDF Démarches</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/validateur-siren-siret"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Validateur SIREN / SIRET</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/convertisseur-chiffre-en-lettre"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Chiffres en Lettres</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/fr/simulateur-frais-kilometriques"
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>Barème Kilométrique 2026</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
