import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Section 24 Mortgage Relief Calculator | Kagazo UK',
  description:
    'Compare the tax impact on buy-to-let landlords before and after Section 24, and evaluate limited company SPV incorporation.',
  alternates: {
    canonical: 'https://kagazo.in/uk/section-24-landlord-mortgage-relief-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/section-24-landlord-mortgage-relief-calculator',
      'en': 'https://kagazo.in/uk/section-24-landlord-mortgage-relief-calculator',
      'x-default': 'https://kagazo.in/uk/section-24-landlord-mortgage-relief-calculator',
    },
  },
  openGraph: {
    title: 'Section 24 Mortgage Relief Calculator | Kagazo UK',
    description:
      'Compare the tax impact on buy-to-let landlords before and after Section 24, and evaluate limited company SPV incorporation.',
    url: 'https://kagazo.in/uk/section-24-landlord-mortgage-relief-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 24 Mortgage Relief Calculator',
    description:
      'Compare the tax impact on buy-to-let landlords before and after Section 24, and evaluate limited company SPV incorporation.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
