import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Companies House PDF Filing Compressor | Kagazo UK',
  description:
    'Compress and format company accounts, resolutions, and confirmation statements under the strict 4 MB Companies House and HMRC portal upload limits.',
  alternates: {
    canonical: 'https://kagazo.in/uk/pdf-compressor-companies-house',
    languages: {
      'en-GB': 'https://kagazo.in/uk/pdf-compressor-companies-house',
      'en': 'https://kagazo.in/uk/pdf-compressor-companies-house',
      'x-default': 'https://kagazo.in/uk/pdf-compressor-companies-house',
    },
  },
  openGraph: {
    title: 'Companies House PDF Filing Compressor | Kagazo UK',
    description:
      'Compress and format company accounts, resolutions, and confirmation statements under the strict 4 MB Companies House and HMRC portal upload limits.',
    url: 'https://kagazo.in/uk/pdf-compressor-companies-house',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Companies House PDF Filing Compressor',
    description:
      'Compress and format company accounts, resolutions, and confirmation statements under the strict 4 MB Companies House and HMRC portal upload limits.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
