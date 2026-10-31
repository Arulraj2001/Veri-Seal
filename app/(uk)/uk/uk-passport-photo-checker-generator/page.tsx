import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'UK Passport Photo Checker & Generator | Kagazo UK',
  description:
    'Enforce official 35×45mm biometric passport specifications, head height standards (29–34mm), and create 4×6 inch printable sheets.',
  alternates: {
    canonical: 'https://kagazo.in/uk/uk-passport-photo-checker-generator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/uk-passport-photo-checker-generator',
      'en': 'https://kagazo.in/uk/uk-passport-photo-checker-generator',
      'x-default': 'https://kagazo.in/uk/uk-passport-photo-checker-generator',
    },
  },
  openGraph: {
    title: 'UK Passport Photo Checker & Generator | Kagazo UK',
    description:
      'Enforce official 35×45mm biometric passport specifications, head height standards (29–34mm), and create 4×6 inch printable sheets.',
    url: 'https://kagazo.in/uk/uk-passport-photo-checker-generator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Passport Photo Checker & Generator',
    description:
      'Enforce official 35×45mm biometric passport specifications, head height standards (29–34mm), and create 4×6 inch printable sheets.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
