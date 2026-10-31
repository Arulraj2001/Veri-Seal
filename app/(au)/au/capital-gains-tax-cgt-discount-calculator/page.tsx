import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Australian Capital Gains Tax (50% CGT Discount) Calculator | Kagazo Australia',
  description:
    'Evaluate statutory capital gains on real property, shares, and managed funds under the Income Tax Assessment Act 1997 with full 5-element cost base adjustments, capital loss offsets, and the 50% general discount.',
  alternates: {
    canonical: 'https://kagazo.in/au/capital-gains-tax-cgt-discount-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/capital-gains-tax-cgt-discount-calculator',
      'en': 'https://kagazo.in/au/capital-gains-tax-cgt-discount-calculator',
      'x-default': 'https://kagazo.in/au/capital-gains-tax-cgt-discount-calculator',
    },
  },
  openGraph: {
    title: 'Australian Capital Gains Tax (50% CGT Discount) Calculator | Kagazo Australia',
    description:
      'Evaluate statutory capital gains on real property, shares, and managed funds under the Income Tax Assessment Act 1997 with full 5-element cost base adjustments, capital loss offsets, and the 50% general discount.',
    url: 'https://kagazo.in/au/capital-gains-tax-cgt-discount-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australian Capital Gains Tax (50% CGT Discount) Calculator',
    description:
      'Evaluate statutory capital gains on real property, shares, and managed funds under the Income Tax Assessment Act 1997 with full 5-element cost base adjustments, capital loss offsets, and the 50% general discount.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
