import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Capital Gains Tax (CGT) Calculator | Kagazo UK',
  description:
    'Model capital gains liability on residential property (18%/24%) and shares (10%/20%) after allowable costs and the £3,000 annual exemption.',
  alternates: {
    canonical: 'https://kagazo.in/uk/capital-gains-tax-residential-shares-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/capital-gains-tax-residential-shares-calculator',
      'en': 'https://kagazo.in/uk/capital-gains-tax-residential-shares-calculator',
      'x-default': 'https://kagazo.in/uk/capital-gains-tax-residential-shares-calculator',
    },
  },
  openGraph: {
    title: 'Capital Gains Tax (CGT) Calculator | Kagazo UK',
    description:
      'Model capital gains liability on residential property (18%/24%) and shares (10%/20%) after allowable costs and the £3,000 annual exemption.',
    url: 'https://kagazo.in/uk/capital-gains-tax-residential-shares-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital Gains Tax (CGT) Calculator',
    description:
      'Model capital gains liability on residential property (18%/24%) and shares (10%/20%) after allowable costs and the £3,000 annual exemption.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
