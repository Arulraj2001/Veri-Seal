import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'UK Rental Yield & Cap Rate Calculator | Kagazo UK',
  description:
    'Calculate your true buy-to-let return after letting fees (+VAT), service charges, ground rent, and statutory safety compliance.',
  alternates: {
    canonical: 'https://kagazo.in/uk/rental-yield-cap-rate-calculator-uk',
    languages: {
      'en-GB': 'https://kagazo.in/uk/rental-yield-cap-rate-calculator-uk',
      'en': 'https://kagazo.in/uk/rental-yield-cap-rate-calculator-uk',
      'x-default': 'https://kagazo.in/uk/rental-yield-cap-rate-calculator-uk',
    },
  },
  openGraph: {
    title: 'UK Rental Yield & Cap Rate Calculator | Kagazo UK',
    description:
      'Calculate your true buy-to-let return after letting fees (+VAT), service charges, ground rent, and statutory safety compliance.',
    url: 'https://kagazo.in/uk/rental-yield-cap-rate-calculator-uk',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Rental Yield & Cap Rate Calculator',
    description:
      'Calculate your true buy-to-let return after letting fees (+VAT), service charges, ground rent, and statutory safety compliance.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
