import * as React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export const metadata: Metadata = {
  title: 'Outils et Calculateurs Officiels France 2026 | Kagazo',
  description:
    'Suite complète de calculateurs statutaires conformes URSSAF et Code du travail : salaire brut en net 2026, charges auto-entrepreneur, indemnité rupture conventionnelle, frais de notaire, PTZ, TVA et outils administratifs.',
  alternates: {
    canonical: `${SITE_URL}/fr`,
    languages: {
      'fr-FR': `${SITE_URL}/fr`,
      'fr': `${SITE_URL}/fr`,
      'x-default': `${SITE_URL}/fr`,
    },
  },
  openGraph: {
    title: 'Outils et Calculateurs Officiels France 2026 | Kagazo',
    description:
      'Calculateurs de référence pour salariés, auto-entrepreneurs, emprunteurs et citoyens en France. Conformes aux barèmes officiels URSSAF, DGFiP et Code du travail.',
    url: `${SITE_URL}/fr`,
    locale: 'fr_FR',
    siteName: 'Kagazo France',
    type: 'website',
  },
};

export default function FrenchHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-blue-500/20 selection:text-blue-950 font-sans">
      <InternationalHeader country="fr" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="fr" />
    </div>
  );
}
