import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Superannuation Guarantee (12.0%) & Concessional Cap Calculator | Kagazo Australia',
  description:
    'Statutory superannuation tool compliant with the legislated 12.0% SG rate, Ordinary Time Earnings (OTE) rules, quarterly maximum contribution base ($65,070/quarter), and the $30,000 annual concessional contributions cap.',
  alternates: {
    canonical: 'https://kagazo.in/au/superannuation-guarantee-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/superannuation-guarantee-calculator',
      'en': 'https://kagazo.in/au/superannuation-guarantee-calculator',
      'x-default': 'https://kagazo.in/au/superannuation-guarantee-calculator',
    },
  },
  openGraph: {
    title: 'Superannuation Guarantee (12.0%) & Concessional Cap Calculator | Kagazo Australia',
    description:
      'Statutory superannuation tool compliant with the legislated 12.0% SG rate, Ordinary Time Earnings (OTE) rules, quarterly maximum contribution base ($65,070/quarter), and the $30,000 annual concessional contributions cap.',
    url: 'https://kagazo.in/au/superannuation-guarantee-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Superannuation Guarantee (12.0%) & Concessional Cap Calculator',
    description:
      'Statutory superannuation tool compliant with the legislated 12.0% SG rate, Ordinary Time Earnings (OTE) rules, quarterly maximum contribution base ($65,070/quarter), and the $30,000 annual concessional contributions cap.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
