import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'HECS / HELP Compulsory Repayment & Indexation Calculator | Kagazo Australia',
  description:
    'Determine compulsory HECS-HELP debt withholding under statutory Repayment Income (RI) thresholds ($54,435+), assess indexation capped at the lower of CPI or WPI, and forecast debt amortization.',
  alternates: {
    canonical: 'https://kagazo.in/au/hecs-help-repayment-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/hecs-help-repayment-calculator',
      'en': 'https://kagazo.in/au/hecs-help-repayment-calculator',
      'x-default': 'https://kagazo.in/au/hecs-help-repayment-calculator',
    },
  },
  openGraph: {
    title: 'HECS / HELP Compulsory Repayment & Indexation Calculator | Kagazo Australia',
    description:
      'Determine compulsory HECS-HELP debt withholding under statutory Repayment Income (RI) thresholds ($54,435+), assess indexation capped at the lower of CPI or WPI, and forecast debt amortization.',
    url: 'https://kagazo.in/au/hecs-help-repayment-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HECS / HELP Compulsory Repayment & Indexation Calculator',
    description:
      'Determine compulsory HECS-HELP debt withholding under statutory Repayment Income (RI) thresholds ($54,435+), assess indexation capped at the lower of CPI or WPI, and forecast debt amortization.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
