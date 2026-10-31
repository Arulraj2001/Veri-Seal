import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'CIS Tax Deduction Calculator | Kagazo UK',
  description:
    'Calculate statutory Construction Industry Scheme withholding on labor, exempt materials & plant, and emit deduction statements.',
  alternates: {
    canonical: 'https://kagazo.in/uk/cis-deduction-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/cis-deduction-calculator',
      'en': 'https://kagazo.in/uk/cis-deduction-calculator',
      'x-default': 'https://kagazo.in/uk/cis-deduction-calculator',
    },
  },
  openGraph: {
    title: 'CIS Tax Deduction Calculator | Kagazo UK',
    description:
      'Calculate statutory Construction Industry Scheme withholding on labor, exempt materials & plant, and emit deduction statements.',
    url: 'https://kagazo.in/uk/cis-deduction-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIS Tax Deduction Calculator',
    description:
      'Calculate statutory Construction Industry Scheme withholding on labor, exempt materials & plant, and emit deduction statements.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
