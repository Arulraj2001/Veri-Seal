import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Building2, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FranceSirenSiretEngine } from '@/components/international/FranceSirenSiretEngine';

export const metadata: Metadata = {
  title: 'Validateur SIREN & SIRET Gratuit (Contrôle Luhn) | Kagazo',
  description:
    'Vérifiez la validité d\'un numéro SIREN (9 chiffres) ou SIRET (14 chiffres) d\'entreprise française avec l\'algorithme officiel de contrôle de Luhn de l\'INSEE.',
  alternates: {
    canonical: `${SITE_URL}/fr/validateur-siren-siret`,
  },
  openGraph: {
    title: 'Validateur SIREN & SIRET Gratuit (Contrôle Luhn) | Kagazo France',
    description:
      'Outil officiel de contrôle de conformité des identifiants d\'entreprises françaises (SIREN, SIRET, clé de Luhn INSEE).',
    url: `${SITE_URL}/fr/validateur-siren-siret`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function SirenSiretPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Validateur Officiel SIREN et SIRET France',
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
      'Vérificateur instantané de validité légale des numéros SIREN et SIRET via l\'algorithme de Luhn officiel de l\'INSEE.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-4 h-4" />
          <span>Algorithme de Luhn INSEE • Contrôle mathématique officiel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Validateur SIREN &amp; SIRET Gratuit (Contrôle Luhn INSEE)
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Vérifiez instantanément la conformité structurelle d&apos;un identifiant d&apos;entreprise ou d&apos;établissement en France. Cet outil applique l&apos;algorithme officiel de contrôle de clé de Luhn utilisé par l&apos;INSEE, le Registre du Commerce et des Sociétés (RCS) et les services fiscaux.
        </p>
      </div>

      {/* Interactive Engine */}
      <FranceSirenSiretEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Building2 className="w-5 h-5" />
            <span>Différence fondamentale entre SIREN et SIRET</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Le <strong>SIREN</strong> (Système d&apos;Identification du Répertoire des Entreprises) comporte <strong>9 chiffres</strong> et identifie l&apos;entité juridique dans son ensemble (société, association ou travailleur indépendant). Le <strong>SIRET</strong> comporte <strong>14 chiffres</strong> : il est composé du SIREN (9 chiffres) auquel s&apos;ajoute le <strong>NIC</strong> (Numéro Interne de Classement, 5 chiffres) identifiant l&apos;adresse géographique précise d&apos;un établissement particulier de l&apos;entreprise.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <BookOpen className="w-5 h-5" />
            <span>Principe mathématique de la clé de Luhn</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            L&apos;algorithme de Luhn (ou « modulo 10 ») est une formule de somme de contrôle permettant de détecter instantanément les erreurs de saisie ou les faux numéros. En partant de la droite, un chiffre sur deux est multiplié par 2 (si le résultat dépasse 9, on soustrait 9), puis la somme de l&apos;ensemble des chiffres obtenus doit obligatoirement être un multiple de 10.
          </p>
        </div>
      </div>
    </div>
  );
}
