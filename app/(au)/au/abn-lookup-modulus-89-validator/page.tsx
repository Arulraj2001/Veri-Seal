import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'ABN Lookup Modulus 89 Validator & ACN Extractor | Kagazo Australia',
  description:
    'Verify 11-digit Australian Business Numbers using the ATO\'s statutory Modulus 89 mathematical check algorithm, inspect the step-by-step weighted product proof, and extract the 9-digit Australian Company Number (ACN).',
  alternates: {
    canonical: 'https://kagazo.in/au/abn-lookup-modulus-89-validator',
    languages: {
      'en-AU': 'https://kagazo.in/au/abn-lookup-modulus-89-validator',
      'en': 'https://kagazo.in/au/abn-lookup-modulus-89-validator',
      'x-default': 'https://kagazo.in/au/abn-lookup-modulus-89-validator',
    },
  },
  openGraph: {
    title: 'ABN Lookup Modulus 89 Validator & ACN Extractor | Kagazo Australia',
    description:
      'Verify 11-digit Australian Business Numbers using the ATO\'s statutory Modulus 89 mathematical check algorithm, inspect the step-by-step weighted product proof, and extract the 9-digit Australian Company Number (ACN).',
    url: 'https://kagazo.in/au/abn-lookup-modulus-89-validator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABN Lookup Modulus 89 Validator & ACN Extractor',
    description:
      'Verify 11-digit Australian Business Numbers using the ATO\'s statutory Modulus 89 mathematical check algorithm, inspect the step-by-step weighted product proof, and extract the 9-digit Australian Company Number (ACN).',
  },
};

export default function Page() {
  return <ClientEngine />;
}
