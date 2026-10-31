import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Statutory Redundancy Pay Calculator | Kagazo UK',
  description:
    'Calculate your exact legal redundancy entitlement based on age bands, service length, and statutory weekly pay caps.',
  alternates: {
    canonical: 'https://kagazo.in/uk/redundancy-pay-statutory-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/redundancy-pay-statutory-calculator',
      'en': 'https://kagazo.in/uk/redundancy-pay-statutory-calculator',
      'x-default': 'https://kagazo.in/uk/redundancy-pay-statutory-calculator',
    },
  },
  openGraph: {
    title: 'Statutory Redundancy Pay Calculator | Kagazo UK',
    description:
      'Calculate your exact legal redundancy entitlement based on age bands, service length, and statutory weekly pay caps.',
    url: 'https://kagazo.in/uk/redundancy-pay-statutory-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Statutory Redundancy Pay Calculator',
    description:
      'Calculate your exact legal redundancy entitlement based on age bands, service length, and statutory weekly pay caps.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
