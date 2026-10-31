import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Australian Passport Photo Biometric Tool (35×45 mm) | Kagazo Australia',
  description:
    'Create 100% compliant Australian passport photos meeting exact APO specifications: 35×45 mm dimensions, 32–36 mm chin-to-crown ratio, mandatory light grey or cream background, and downloadable 4×6 inch 300 DPI printable sheets.',
  alternates: {
    canonical: 'https://kagazo.in/au/australian-passport-photo-checker-generator',
    languages: {
      'en-AU': 'https://kagazo.in/au/australian-passport-photo-checker-generator',
      'en': 'https://kagazo.in/au/australian-passport-photo-checker-generator',
      'x-default': 'https://kagazo.in/au/australian-passport-photo-checker-generator',
    },
  },
  openGraph: {
    title: 'Australian Passport Photo Biometric Tool (35×45 mm) | Kagazo Australia',
    description:
      'Create 100% compliant Australian passport photos meeting exact APO specifications: 35×45 mm dimensions, 32–36 mm chin-to-crown ratio, mandatory light grey or cream background, and downloadable 4×6 inch 300 DPI printable sheets.',
    url: 'https://kagazo.in/au/australian-passport-photo-checker-generator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australian Passport Photo Biometric Tool (35×45 mm)',
    description:
      'Create 100% compliant Australian passport photos meeting exact APO specifications: 35×45 mm dimensions, 32–36 mm chin-to-crown ratio, mandatory light grey or cream background, and downloadable 4×6 inch 300 DPI printable sheets.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
