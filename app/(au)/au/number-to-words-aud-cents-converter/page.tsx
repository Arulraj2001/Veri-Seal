import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'AUD Legal Number to Words Currency Converter | Kagazo Australia',
  description:
    'Convert Australian Dollar amounts into formal legal wording for bank cheques, commercial deeds, promissory notes, and property conveyance settlement adjustments.',
  alternates: {
    canonical: 'https://kagazo.in/au/number-to-words-aud-cents-converter',
    languages: {
      'en-AU': 'https://kagazo.in/au/number-to-words-aud-cents-converter',
      'en': 'https://kagazo.in/au/number-to-words-aud-cents-converter',
      'x-default': 'https://kagazo.in/au/number-to-words-aud-cents-converter',
    },
  },
  openGraph: {
    title: 'AUD Legal Number to Words Currency Converter | Kagazo Australia',
    description:
      'Convert Australian Dollar amounts into formal legal wording for bank cheques, commercial deeds, promissory notes, and property conveyance settlement adjustments.',
    url: 'https://kagazo.in/au/number-to-words-aud-cents-converter',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AUD Legal Number to Words Currency Converter',
    description:
      'Convert Australian Dollar amounts into formal legal wording for bank cheques, commercial deeds, promissory notes, and property conveyance settlement adjustments.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
