import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Tax File Number (TFN) Modulus 11 Checker & Validator | Kagazo Australia',
  description:
    'Verify 8-digit and 9-digit Australian Tax File Numbers against the ATO\'s statutory Modulus 11 mathematical weighting algorithm. 100% client-side execution in compliance with the Privacy (Tax File Number) Rule 2015.',
  alternates: {
    canonical: 'https://kagazo.in/au/tfn-tax-file-number-validator',
    languages: {
      'en-AU': 'https://kagazo.in/au/tfn-tax-file-number-validator',
      'en': 'https://kagazo.in/au/tfn-tax-file-number-validator',
      'x-default': 'https://kagazo.in/au/tfn-tax-file-number-validator',
    },
  },
  openGraph: {
    title: 'Tax File Number (TFN) Modulus 11 Checker & Validator | Kagazo Australia',
    description:
      'Verify 8-digit and 9-digit Australian Tax File Numbers against the ATO\'s statutory Modulus 11 mathematical weighting algorithm. 100% client-side execution in compliance with the Privacy (Tax File Number) Rule 2015.',
    url: 'https://kagazo.in/au/tfn-tax-file-number-validator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax File Number (TFN) Modulus 11 Checker & Validator',
    description:
      'Verify 8-digit and 9-digit Australian Tax File Numbers against the ATO\'s statutory Modulus 11 mathematical weighting algorithm. 100% client-side execution in compliance with the Privacy (Tax File Number) Rule 2015.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
