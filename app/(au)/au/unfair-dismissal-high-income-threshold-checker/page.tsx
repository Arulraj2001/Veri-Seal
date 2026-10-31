import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Unfair Dismissal High Income Threshold & Eligibility Checker | Kagazo Australia',
  description:
    'Verify whether you are legally protected from unfair dismissal under Section 382 of the Fair Work Act 2009 based on the indexed High Income Threshold ($175,000+), Modern Award coverage, minimum service requirements, and the strict 21-day lodgment window.',
  alternates: {
    canonical: 'https://kagazo.in/au/unfair-dismissal-high-income-threshold-checker',
    languages: {
      'en-AU': 'https://kagazo.in/au/unfair-dismissal-high-income-threshold-checker',
      'en': 'https://kagazo.in/au/unfair-dismissal-high-income-threshold-checker',
      'x-default': 'https://kagazo.in/au/unfair-dismissal-high-income-threshold-checker',
    },
  },
  openGraph: {
    title: 'Unfair Dismissal High Income Threshold & Eligibility Checker | Kagazo Australia',
    description:
      'Verify whether you are legally protected from unfair dismissal under Section 382 of the Fair Work Act 2009 based on the indexed High Income Threshold ($175,000+), Modern Award coverage, minimum service requirements, and the strict 21-day lodgment window.',
    url: 'https://kagazo.in/au/unfair-dismissal-high-income-threshold-checker',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unfair Dismissal High Income Threshold & Eligibility Checker',
    description:
      'Verify whether you are legally protected from unfair dismissal under Section 382 of the Fair Work Act 2009 based on the indexed High Income Threshold ($175,000+), Modern Award coverage, minimum service requirements, and the strict 21-day lodgment window.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
