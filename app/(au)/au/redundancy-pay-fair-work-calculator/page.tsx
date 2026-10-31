import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Statutory Redundancy Pay & Tax-Free ETP Calculator | Kagazo Australia',
  description:
    'Compute statutory redundancy severance under National Employment Standards (NES) continuous service tables, assess the small business exemption, and calculate the ATO tax-free genuine redundancy threshold under s.83-170.',
  alternates: {
    canonical: 'https://kagazo.in/au/redundancy-pay-fair-work-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/redundancy-pay-fair-work-calculator',
      'en': 'https://kagazo.in/au/redundancy-pay-fair-work-calculator',
      'x-default': 'https://kagazo.in/au/redundancy-pay-fair-work-calculator',
    },
  },
  openGraph: {
    title: 'Statutory Redundancy Pay & Tax-Free ETP Calculator | Kagazo Australia',
    description:
      'Compute statutory redundancy severance under National Employment Standards (NES) continuous service tables, assess the small business exemption, and calculate the ATO tax-free genuine redundancy threshold under s.83-170.',
    url: 'https://kagazo.in/au/redundancy-pay-fair-work-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Statutory Redundancy Pay & Tax-Free ETP Calculator',
    description:
      'Compute statutory redundancy severance under National Employment Standards (NES) continuous service tables, assess the small business exemption, and calculate the ATO tax-free genuine redundancy threshold under s.83-170.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
