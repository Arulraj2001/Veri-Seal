import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Right to Work Share Code & Expiry Checker | Kagazo UK',
  description:
    'Model statutory excuse deadlines for 90-day share codes, time-limited eVisas, and protect your business against £45,000+ civil penalties.',
  alternates: {
    canonical: 'https://kagazo.in/uk/right-to-work-share-code-expiry-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/right-to-work-share-code-expiry-calculator',
      'en': 'https://kagazo.in/uk/right-to-work-share-code-expiry-calculator',
      'x-default': 'https://kagazo.in/uk/right-to-work-share-code-expiry-calculator',
    },
  },
  openGraph: {
    title: 'Right to Work Share Code & Expiry Checker | Kagazo UK',
    description:
      'Model statutory excuse deadlines for 90-day share codes, time-limited eVisas, and protect your business against £45,000+ civil penalties.',
    url: 'https://kagazo.in/uk/right-to-work-share-code-expiry-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Right to Work Share Code & Expiry Checker',
    description:
      'Model statutory excuse deadlines for 90-day share codes, time-limited eVisas, and protect your business against £45,000+ civil penalties.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
