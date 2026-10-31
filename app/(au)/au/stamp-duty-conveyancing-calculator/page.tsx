import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'State Stamp Duty (Transfer Duty) & FHB Concession Calculator | Kagazo Australia',
  description:
    'Accurate state conveyance transfer duty model covering New South Wales (FHBAS), Victoria, Queensland, and Western Australia with official first home buyer exemption thresholds and foreign purchaser duty surcharges.',
  alternates: {
    canonical: 'https://kagazo.in/au/stamp-duty-conveyancing-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/stamp-duty-conveyancing-calculator',
      'en': 'https://kagazo.in/au/stamp-duty-conveyancing-calculator',
      'x-default': 'https://kagazo.in/au/stamp-duty-conveyancing-calculator',
    },
  },
  openGraph: {
    title: 'State Stamp Duty (Transfer Duty) & FHB Concession Calculator | Kagazo Australia',
    description:
      'Accurate state conveyance transfer duty model covering New South Wales (FHBAS), Victoria, Queensland, and Western Australia with official first home buyer exemption thresholds and foreign purchaser duty surcharges.',
    url: 'https://kagazo.in/au/stamp-duty-conveyancing-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'State Stamp Duty (Transfer Duty) & FHB Concession Calculator',
    description:
      'Accurate state conveyance transfer duty model covering New South Wales (FHBAS), Victoria, Queensland, and Western Australia with official first home buyer exemption thresholds and foreign purchaser duty surcharges.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
