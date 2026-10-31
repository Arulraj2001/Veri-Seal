import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Self-Assessment Payment on Account Calculator | Kagazo UK',
  description:
    'Model your statutory 31 January balancing payment and advance 31 July installments under HMRC Section 59A rules.',
  alternates: {
    canonical: 'https://kagazo.in/uk/self-assessment-payment-on-account-calculator',
    languages: {
      'en-GB': 'https://kagazo.in/uk/self-assessment-payment-on-account-calculator',
      'en': 'https://kagazo.in/uk/self-assessment-payment-on-account-calculator',
      'x-default': 'https://kagazo.in/uk/self-assessment-payment-on-account-calculator',
    },
  },
  openGraph: {
    title: 'Self-Assessment Payment on Account Calculator | Kagazo UK',
    description:
      'Model your statutory 31 January balancing payment and advance 31 July installments under HMRC Section 59A rules.',
    url: 'https://kagazo.in/uk/self-assessment-payment-on-account-calculator',
    siteName: 'Kagazo United Kingdom',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self-Assessment Payment on Account Calculator',
    description:
      'Model your statutory 31 January balancing payment and advance 31 July installments under HMRC Section 59A rules.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
