import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Mortgage Affordability & Stress Test | Kagazo UK',
  description:
    'Model your borrowing capacity against the 4.5x household income cap and the statutory +3% PRA interest rate stress test.',
  alternates: {
    canonical: 'https://kagazo.in/uk/mortgage-affordability-stress-test-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/mortgage-affordability-stress-test-calculator',
      'en': 'https://kagazo.in/uk/mortgage-affordability-stress-test-calculator',
      'x-default': 'https://kagazo.in/uk/mortgage-affordability-stress-test-calculator',
    },
  },
  openGraph: {
    title: 'Mortgage Affordability & Stress Test | Kagazo UK',
    description:
      'Model your borrowing capacity against the 4.5x household income cap and the statutory +3% PRA interest rate stress test.',
    url: 'https://kagazo.in/uk/mortgage-affordability-stress-test-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Affordability & Stress Test',
    description:
      'Model your borrowing capacity against the 4.5x household income cap and the statutory +3% PRA interest rate stress test.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
