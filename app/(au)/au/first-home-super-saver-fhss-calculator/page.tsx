import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'First Home Super Saver Scheme (FHSS) Maximum Release Calculator | Kagazo Australia',
  description:
    'Quantify the tax-advantaged home deposit release under the legislated $50,000 individual ($100,000 couple) FHSS rules, compute deemed ATO Shortfall Interest Charge (SIC) earnings, and calculate your total deposit boost over bank savings.',
  alternates: {
    canonical: 'https://kagazo.in/au/first-home-super-saver-fhss-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/first-home-super-saver-fhss-calculator',
      'en': 'https://kagazo.in/au/first-home-super-saver-fhss-calculator',
      'x-default': 'https://kagazo.in/au/first-home-super-saver-fhss-calculator',
    },
  },
  openGraph: {
    title: 'First Home Super Saver Scheme (FHSS) Maximum Release Calculator | Kagazo Australia',
    description:
      'Quantify the tax-advantaged home deposit release under the legislated $50,000 individual ($100,000 couple) FHSS rules, compute deemed ATO Shortfall Interest Charge (SIC) earnings, and calculate your total deposit boost over bank savings.',
    url: 'https://kagazo.in/au/first-home-super-saver-fhss-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Home Super Saver Scheme (FHSS) Maximum Release Calculator',
    description:
      'Quantify the tax-advantaged home deposit release under the legislated $50,000 individual ($100,000 couple) FHSS rules, compute deemed ATO Shortfall Interest Charge (SIC) earnings, and calculate your total deposit boost over bank savings.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
