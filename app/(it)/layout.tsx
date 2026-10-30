import * as React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export const metadata: Metadata = {
  title: 'Calcolatori e Utilità Statutarie Ufficiali Italia 2026 | Kagazo',
  description:
    'Suite completa di 20 calcolatori legali e fiscali per l\'Italia: Stipendio Netto 2026, Calcolo TFR, IMU F24, Regime Forfettario, Foto Tessera CIE e Ravvedimento Operoso.',
  alternates: {
    canonical: `${SITE_URL}/it`,
    languages: {
      'it-IT': `${SITE_URL}/it`,
      'it': `${SITE_URL}/it`,
      'x-default': `${SITE_URL}/it`,
    },
  },
  openGraph: {
    title: 'Calcolatori e Utilità Statutarie Ufficiali Italia 2026 | Kagazo',
    description:
      'Strumenti gratuiti e conformi alle norme vigenti per stipendi, tasse, casa e documenti in Italia. 100% nel browser con massima privacy.',
    url: `${SITE_URL}/it`,
    locale: 'it_IT',
    siteName: 'Kagazo Italia',
    type: 'website',
  },
};

export default function ItalianHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-sky-500/20 selection:text-sky-950 font-sans">
      <InternationalHeader country="it" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="it" />
    </div>
  );
}

