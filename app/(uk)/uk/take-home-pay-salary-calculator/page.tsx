import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'UK Take-Home Pay Salary Calculator | Kagazo UK',
  description:
    'Determine your true monthly and annual take-home wage after Income Tax, 8% NICs, workplace pension, and student loan deductions.',
  alternates: {
    canonical: 'https://kagazo.in/uk/take-home-pay-salary-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/take-home-pay-salary-calculator',
      'en': 'https://kagazo.in/uk/take-home-pay-salary-calculator',
      'x-default': 'https://kagazo.in/uk/take-home-pay-salary-calculator',
    },
  },
  openGraph: {
    title: 'UK Take-Home Pay Salary Calculator | Kagazo UK',
    description:
      'Determine your true monthly and annual take-home wage after Income Tax, 8% NICs, workplace pension, and student loan deductions.',
    url: 'https://kagazo.in/uk/take-home-pay-salary-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Take-Home Pay Salary Calculator',
    description:
      'Determine your true monthly and annual take-home wage after Income Tax, 8% NICs, workplace pension, and student loan deductions.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
