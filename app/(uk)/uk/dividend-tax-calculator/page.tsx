import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'UK Dividend Tax Calculator | Kagazo UK',
  description:
    'Calculate your tax liability on UK company dividends across basic (8.75%), higher (33.75%), and additional (39.35%) rate bands.',
  alternates: {
    canonical: 'https://kagazo.in/uk/dividend-tax-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/dividend-tax-calculator',
      'en': 'https://kagazo.in/uk/dividend-tax-calculator',
      'x-default': 'https://kagazo.in/uk/dividend-tax-calculator',
    },
  },
  openGraph: {
    title: 'UK Dividend Tax Calculator | Kagazo UK',
    description:
      'Calculate your tax liability on UK company dividends across basic (8.75%), higher (33.75%), and additional (39.35%) rate bands.',
    url: 'https://kagazo.in/uk/dividend-tax-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Dividend Tax Calculator',
    description:
      'Calculate your tax liability on UK company dividends across basic (8.75%), higher (33.75%), and additional (39.35%) rate bands.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
