import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Division 43 Capital Works Building Depreciation Calculator | Kagazo Australia',
  description:
    'Calculate the statutory 2.5% per annum building structural depreciation allowance over 40 years under Income Tax Assessment Act 1997 Division 43 and assess the CGT cost base adjustment impact.',
  alternates: {
    canonical: 'https://kagazo.in/au/capital-works-div-43-depreciation-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/capital-works-div-43-depreciation-calculator',
      'en': 'https://kagazo.in/au/capital-works-div-43-depreciation-calculator',
      'x-default': 'https://kagazo.in/au/capital-works-div-43-depreciation-calculator',
    },
  },
  openGraph: {
    title: 'Division 43 Capital Works Building Depreciation Calculator | Kagazo Australia',
    description:
      'Calculate the statutory 2.5% per annum building structural depreciation allowance over 40 years under Income Tax Assessment Act 1997 Division 43 and assess the CGT cost base adjustment impact.',
    url: 'https://kagazo.in/au/capital-works-div-43-depreciation-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Division 43 Capital Works Building Depreciation Calculator',
    description:
      'Calculate the statutory 2.5% per annum building structural depreciation allowance over 40 years under Income Tax Assessment Act 1997 Division 43 and assess the CGT cost base adjustment impact.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
