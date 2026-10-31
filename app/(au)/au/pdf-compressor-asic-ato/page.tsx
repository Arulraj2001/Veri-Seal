import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'ASIC & ATO PDF Filing Document Compressor (< 10 MB) | Kagazo Australia',
  description:
    'Optimize company annual returns, financial statements, and ATO audit evidence bundles to strictly comply with statutory portal upload ceilings (< 10 MB). 100% client-side compression: zero corporate documents ever leave your device.',
  alternates: {
    canonical: 'https://kagazo.in/au/pdf-compressor-asic-ato',
    languages: {
      'en-AU': 'https://kagazo.in/au/pdf-compressor-asic-ato',
      'en': 'https://kagazo.in/au/pdf-compressor-asic-ato',
      'x-default': 'https://kagazo.in/au/pdf-compressor-asic-ato',
    },
  },
  openGraph: {
    title: 'ASIC & ATO PDF Filing Document Compressor (< 10 MB) | Kagazo Australia',
    description:
      'Optimize company annual returns, financial statements, and ATO audit evidence bundles to strictly comply with statutory portal upload ceilings (< 10 MB). 100% client-side compression: zero corporate documents ever leave your device.',
    url: 'https://kagazo.in/au/pdf-compressor-asic-ato',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASIC & ATO PDF Filing Document Compressor (< 10 MB)',
    description:
      'Optimize company annual returns, financial statements, and ATO audit evidence bundles to strictly comply with statutory portal upload ceilings (< 10 MB). 100% client-side compression: zero corporate documents ever leave your device.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
