import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Corporation Tax & Marginal Relief Calculator | Kagazo UK',
  description:
    'Determine your company\'s exact Corporation Tax liability between 19% and 25% with statutory 3/200 marginal relief and associated company adjustments.',
  alternates: {
    canonical: 'https://kagazo.in/uk/corporation-tax-marginal-relief-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/corporation-tax-marginal-relief-calculator',
      'en': 'https://kagazo.in/uk/corporation-tax-marginal-relief-calculator',
      'x-default': 'https://kagazo.in/uk/corporation-tax-marginal-relief-calculator',
    },
  },
  openGraph: {
    title: 'Corporation Tax & Marginal Relief Calculator | Kagazo UK',
    description:
      'Determine your company\'s exact Corporation Tax liability between 19% and 25% with statutory 3/200 marginal relief and associated company adjustments.',
    url: 'https://kagazo.in/uk/corporation-tax-marginal-relief-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporation Tax & Marginal Relief Calculator',
    description:
      'Determine your company\'s exact Corporation Tax liability between 19% and 25% with statutory 3/200 marginal relief and associated company adjustments.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
