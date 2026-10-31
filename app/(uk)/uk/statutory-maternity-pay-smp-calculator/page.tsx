import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Statutory Maternity Pay (SMP) Calculator | Kagazo UK',
  description:
    'Estimate 39 weeks of maternity pay: 6 weeks @ 90% uncapped earnings plus 33 weeks statutory standard allowance.',
  alternates: {
    canonical: 'https://kagazo.in/uk/statutory-maternity-pay-smp-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/statutory-maternity-pay-smp-calculator',
      'en': 'https://kagazo.in/uk/statutory-maternity-pay-smp-calculator',
      'x-default': 'https://kagazo.in/uk/statutory-maternity-pay-smp-calculator',
    },
  },
  openGraph: {
    title: 'Statutory Maternity Pay (SMP) Calculator | Kagazo UK',
    description:
      'Estimate 39 weeks of maternity pay: 6 weeks @ 90% uncapped earnings plus 33 weeks statutory standard allowance.',
    url: 'https://kagazo.in/uk/statutory-maternity-pay-smp-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Statutory Maternity Pay (SMP) Calculator',
    description:
      'Estimate 39 weeks of maternity pay: 6 weeks @ 90% uncapped earnings plus 33 weeks statutory standard allowance.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
