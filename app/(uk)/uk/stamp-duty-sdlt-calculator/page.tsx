import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Stamp Duty Land Tax (SDLT) Calculator | Kagazo UK',
  description:
    'Calculate your exact Stamp Duty obligation with First-Time Buyer Relief, +3% buy-to-let surcharge, and +2% non-resident surcharge.',
  alternates: {
    canonical: 'https://kagazo.in/uk/stamp-duty-sdlt-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/stamp-duty-sdlt-calculator',
      'en': 'https://kagazo.in/uk/stamp-duty-sdlt-calculator',
      'x-default': 'https://kagazo.in/uk/stamp-duty-sdlt-calculator',
    },
  },
  openGraph: {
    title: 'Stamp Duty Land Tax (SDLT) Calculator | Kagazo UK',
    description:
      'Calculate your exact Stamp Duty obligation with First-Time Buyer Relief, +3% buy-to-let surcharge, and +2% non-resident surcharge.',
    url: 'https://kagazo.in/uk/stamp-duty-sdlt-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stamp Duty Land Tax (SDLT) Calculator',
    description:
      'Calculate your exact Stamp Duty obligation with First-Time Buyer Relief, +3% buy-to-let surcharge, and +2% non-resident surcharge.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
