import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Leasehold Extension Calculator | Kagazo UK',
  description:
    'Estimate statutory lease extension premiums, freeholder compensation, and 50% marriage value penalties under the 80-year rule.',
  alternates: {
    canonical: 'https://kagazo.in/uk/ground-rent-leasehold-extension-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/ground-rent-leasehold-extension-calculator',
      'en': 'https://kagazo.in/uk/ground-rent-leasehold-extension-calculator',
      'x-default': 'https://kagazo.in/uk/ground-rent-leasehold-extension-calculator',
    },
  },
  openGraph: {
    title: 'Leasehold Extension Calculator | Kagazo UK',
    description:
      'Estimate statutory lease extension premiums, freeholder compensation, and 50% marriage value penalties under the 80-year rule.',
    url: 'https://kagazo.in/uk/ground-rent-leasehold-extension-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasehold Extension Calculator',
    description:
      'Estimate statutory lease extension premiums, freeholder compensation, and 50% marriage value penalties under the 80-year rule.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
