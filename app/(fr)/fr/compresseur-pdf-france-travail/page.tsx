import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileUp, CheckCircle2, Lock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { FrancePdfCompressorEngine } from '@/components/international/FrancePdfCompressorEngine';

export const metadata: Metadata = {
  title: 'Compresseur PDF France Travail, CAF & Ameli (<2 Mo) | Kagazo',
  description:
    'Compressez gratuitement vos documents PDF sous la limite de 2 Mo ou 4 Mo pour les démarches en ligne sur France Travail, la CAF, Ameli et impots.gouv.fr. 100% sécurisé et local.',
  alternates: {
    canonical: `${SITE_URL}/fr/compresseur-pdf-france-travail`,
  },
  openGraph: {
    title: 'Compresseur PDF France Travail, CAF & Ameli (<2 Mo) | Kagazo France',
    description:
      'Réduisez la taille de vos PDF administratifs pour téléprocédures publiques en France sans perte de lisibilité.',
    url: `${SITE_URL}/fr/compresseur-pdf-france-travail`,
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function PdfCompressorPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Compresseur PDF Démarches Administratives France',
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
      'Compresseur PDF haute performance pour respecter les plafonds de 2 Mo et 4 Mo imposés par les téléprocédures de l\'administration française.',
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
          <span>Norme Téléprocédures Publiques • Traitement 100% Local &amp; RGPD</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Compresseur PDF pour France Travail, la CAF &amp; Ameli
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Les plateformes de l&apos;administration publique française (France Travail, Caf.fr, Ameli.fr, impots.gouv.fr) bloquent systématiquement les fichiers PDF dépassant <strong>2 Mo ou 4 Mo</strong>. Cet outil compresse vos justificatifs, contrats et fiches de paie pour les rendre immédiatement téléversables tout en préservant une parfaite netteté d&apos;écriture.
        </p>
      </div>

      {/* Interactive Engine */}
      <FrancePdfCompressorEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Lock className="w-5 h-5" />
            <span>Sécurité absolue des documents sensibles</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Vos pièces justificatives (avis d&apos;imposition, fiches de paie confidentielles, attestations employeur, relevés bancaires) contiennent des données extrêmement personnelles. Notre outil traite l&apos;intégralité du fichier directement dans votre navigateur internet via l&apos;API WebAssembly/HTML5 : <strong>aucun document ne transite par nos serveurs</strong>.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <FileUp className="w-5 h-5" />
            <span>Plafonds imposés par les portails administratifs</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Les limites réglementaires standard sont : <strong>2 Mo</strong> pour France Travail (Pôle Emploi) et la CAF ; <strong>4 Mo</strong> pour la déclaration en ligne des revenus sur le portail des Finances Publiques (DGFiP) et pour les plateformes juridiques du Ministère de la Justice (Télérecours).
          </p>
        </div>
      </div>
    </div>
  );
}
