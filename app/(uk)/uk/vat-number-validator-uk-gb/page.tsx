import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'UK (GB) VAT Number Validator | Kagazo UK',
  description:
    'Validate British VAT registration numbers against the official HMRC Modulo 97 algorithm and format masks.',
  alternates: {
    canonical: 'https://kagazo.in/uk/vat-number-validator-uk-gb',
    languages: {
      'en-GB': 'https://kagazo.in/uk/vat-number-validator-uk-gb',
      'en': 'https://kagazo.in/uk/vat-number-validator-uk-gb',
      'x-default': 'https://kagazo.in/uk/vat-number-validator-uk-gb',
    },
  },
  openGraph: {
    title: 'UK (GB) VAT Number Validator | Kagazo UK',
    description:
      'Validate British VAT registration numbers against the official HMRC Modulo 97 algorithm and format masks.',
    url: 'https://kagazo.in/uk/vat-number-validator-uk-gb',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK (GB) VAT Number Validator',
    description:
      'Validate British VAT registration numbers against the official HMRC Modulo 97 algorithm and format masks.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
