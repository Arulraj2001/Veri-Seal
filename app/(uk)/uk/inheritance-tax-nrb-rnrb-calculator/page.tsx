import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Inheritance Tax (IHT) Calculator | Kagazo UK',
  description:
    'Model estate tax liability with Nil-Rate Band (£325k), Residence Nil-Rate Band (£175k), spousal transfers (up to £1M), and £2M taper rules.',
  alternates: {
    canonical: 'https://kagazo.in/uk/inheritance-tax-nrb-rnrb-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/inheritance-tax-nrb-rnrb-calculator',
      'en': 'https://kagazo.in/uk/inheritance-tax-nrb-rnrb-calculator',
      'x-default': 'https://kagazo.in/uk/inheritance-tax-nrb-rnrb-calculator',
    },
  },
  openGraph: {
    title: 'Inheritance Tax (IHT) Calculator | Kagazo UK',
    description:
      'Model estate tax liability with Nil-Rate Band (£325k), Residence Nil-Rate Band (£175k), spousal transfers (up to £1M), and £2M taper rules.',
    url: 'https://kagazo.in/uk/inheritance-tax-nrb-rnrb-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inheritance Tax (IHT) Calculator',
    description:
      'Model estate tax liability with Nil-Rate Band (£325k), Residence Nil-Rate Band (£175k), spousal transfers (up to £1M), and £2M taper rules.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
