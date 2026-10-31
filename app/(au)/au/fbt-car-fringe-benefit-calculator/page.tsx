import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'FBT Car Fringe Benefit Calculator (Statutory Formula & Operating Cost) | Kagazo Australia',
  description:
    'Compute employer Fringe Benefits Tax liabilities on company passenger vehicles under the 20% statutory formula, evaluate logbook operating costs, and assess the Electric Vehicle (EV) zero-FBT exemption.',
  alternates: {
    canonical: 'https://kagazo.in/au/fbt-car-fringe-benefit-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/fbt-car-fringe-benefit-calculator',
      'en': 'https://kagazo.in/au/fbt-car-fringe-benefit-calculator',
      'x-default': 'https://kagazo.in/au/fbt-car-fringe-benefit-calculator',
    },
  },
  openGraph: {
    title: 'FBT Car Fringe Benefit Calculator (Statutory Formula & Operating Cost) | Kagazo Australia',
    description:
      'Compute employer Fringe Benefits Tax liabilities on company passenger vehicles under the 20% statutory formula, evaluate logbook operating costs, and assess the Electric Vehicle (EV) zero-FBT exemption.',
    url: 'https://kagazo.in/au/fbt-car-fringe-benefit-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FBT Car Fringe Benefit Calculator (Statutory Formula & Operating Cost)',
    description:
      'Compute employer Fringe Benefits Tax liabilities on company passenger vehicles under the 20% statutory formula, evaluate logbook operating costs, and assess the Electric Vehicle (EV) zero-FBT exemption.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
