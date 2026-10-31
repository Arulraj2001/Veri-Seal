import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'UK VAT & Reverse Charge Calculator | Kagazo UK',
  description:
    'Add or remove UK VAT at 20%, 5%, or 0%, and generate compliant CIS domestic reverse charge invoice wording.',
  alternates: {
    canonical: 'https://kagazo.in/uk/vat-calculator-uk-reverse-charge',
    languages: {
      'en-GB': 'https://kagazo.in/uk/vat-calculator-uk-reverse-charge',
      'en': 'https://kagazo.in/uk/vat-calculator-uk-reverse-charge',
      'x-default': 'https://kagazo.in/uk/vat-calculator-uk-reverse-charge',
    },
  },
  openGraph: {
    title: 'UK VAT & Reverse Charge Calculator | Kagazo UK',
    description:
      'Add or remove UK VAT at 20%, 5%, or 0%, and generate compliant CIS domestic reverse charge invoice wording.',
    url: 'https://kagazo.in/uk/vat-calculator-uk-reverse-charge',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK VAT & Reverse Charge Calculator',
    description:
      'Add or remove UK VAT at 20%, 5%, or 0%, and generate compliant CIS domestic reverse charge invoice wording.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
