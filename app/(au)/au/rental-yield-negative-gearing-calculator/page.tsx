import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Rental Yield & Negative Gearing Tax Shield Calculator | Kagazo Australia',
  description:
    'Simulate gross and net rental yields, quantify mortgage interest deductions and non-cash depreciation write-offs, and calculate your ATO annual tax refund shield.',
  alternates: {
    canonical: 'https://kagazo.in/au/rental-yield-negative-gearing-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/rental-yield-negative-gearing-calculator',
      'en': 'https://kagazo.in/au/rental-yield-negative-gearing-calculator',
      'x-default': 'https://kagazo.in/au/rental-yield-negative-gearing-calculator',
    },
  },
  openGraph: {
    title: 'Rental Yield & Negative Gearing Tax Shield Calculator | Kagazo Australia',
    description:
      'Simulate gross and net rental yields, quantify mortgage interest deductions and non-cash depreciation write-offs, and calculate your ATO annual tax refund shield.',
    url: 'https://kagazo.in/au/rental-yield-negative-gearing-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rental Yield & Negative Gearing Tax Shield Calculator',
    description:
      'Simulate gross and net rental yields, quantify mortgage interest deductions and non-cash depreciation write-offs, and calculate your ATO annual tax refund shield.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
