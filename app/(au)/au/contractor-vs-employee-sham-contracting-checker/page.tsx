import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Contractor vs Employee Sham Contracting Checker | Kagazo Australia',
  description:
    'Evaluate workforce engagements against the 6-pillar Australian common law multifactorial test and Section 15AA of the Fair Work Act 2009 to identify sham contracting risks and quantify superannuation and leave backpay liabilities.',
  alternates: {
    canonical: 'https://kagazo.in/au/contractor-vs-employee-sham-contracting-checker',
    languages: {
      'en-AU': 'https://kagazo.in/au/contractor-vs-employee-sham-contracting-checker',
      'en': 'https://kagazo.in/au/contractor-vs-employee-sham-contracting-checker',
      'x-default': 'https://kagazo.in/au/contractor-vs-employee-sham-contracting-checker',
    },
  },
  openGraph: {
    title: 'Contractor vs Employee Sham Contracting Checker | Kagazo Australia',
    description:
      'Evaluate workforce engagements against the 6-pillar Australian common law multifactorial test and Section 15AA of the Fair Work Act 2009 to identify sham contracting risks and quantify superannuation and leave backpay liabilities.',
    url: 'https://kagazo.in/au/contractor-vs-employee-sham-contracting-checker',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contractor vs Employee Sham Contracting Checker',
    description:
      'Evaluate workforce engagements against the 6-pillar Australian common law multifactorial test and Section 15AA of the Fair Work Act 2009 to identify sham contracting risks and quantify superannuation and leave backpay liabilities.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
