import * as React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export const metadata: Metadata = {
  title: 'Offizielle Online-Rechner & Werkzeuge Deutschland 2026 | Kagazo',
  description:
    'Vollständige Suite rechtssicherer Rechner nach deutschem Steuer- und Arbeitsrecht: Brutto-Netto 2026, Firmenwagen 1%-Regelung, Abfindung § 34 EStG, Notarkosten GNotKG, Grunderwerbsteuer und biometrisches Passfoto.',
  alternates: {
    languages: {
      'de-DE': `${SITE_URL}/de`,
      'de': `${SITE_URL}/de`,
      'x-default': `${SITE_URL}/de`,
    },
  },
  openGraph: {
    title: 'Offizielle Online-Rechner & Werkzeuge Deutschland 2026 | Kagazo',
    description:
      'Präzisionsrechner für Arbeitnehmer, Selbstständige, Mieter und Immobilienkäufer nach § 32a EStG, BGB und GNotKG.',
    url: `${SITE_URL}/de`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
};

export default function GermanHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-amber-500/20 selection:text-amber-950 font-sans">
      <InternationalHeader country="de" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="de" />
    </div>
  );
}
