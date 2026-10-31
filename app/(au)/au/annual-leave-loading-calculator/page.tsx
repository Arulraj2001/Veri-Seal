import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Annual Leave Loading (17.5%) & Termination Payout Calculator | Kagazo Australia',
  description:
    'Calculate statutory annual leave payments with 17.5% modern award leave loading, assess s.90(2) Fair Work termination pay rules, and forecast net holiday take-home pay.',
  alternates: {
    canonical: 'https://kagazo.in/au/annual-leave-loading-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/annual-leave-loading-calculator',
      'en': 'https://kagazo.in/au/annual-leave-loading-calculator',
      'x-default': 'https://kagazo.in/au/annual-leave-loading-calculator',
    },
  },
  openGraph: {
    title: 'Annual Leave Loading (17.5%) & Termination Payout Calculator | Kagazo Australia',
    description:
      'Calculate statutory annual leave payments with 17.5% modern award leave loading, assess s.90(2) Fair Work termination pay rules, and forecast net holiday take-home pay.',
    url: 'https://kagazo.in/au/annual-leave-loading-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annual Leave Loading (17.5%) & Termination Payout Calculator',
    description:
      'Calculate statutory annual leave payments with 17.5% modern award leave loading, assess s.90(2) Fair Work termination pay rules, and forecast net holiday take-home pay.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
