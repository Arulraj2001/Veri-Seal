import * as React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export const metadata: Metadata = {
  title: 'Official UK Statutory Calculators & HMRC Tools 2026/27 | Kagazo',
  description:
    'Comprehensive UK statutory calculator suite: PAYE Take-Home Pay 2026/27, Stamp Duty (SDLT), Section 24 Landlord Mortgage Relief, Statutory Redundancy Pay, and Modulus 11 Sort Code Validators.',
  alternates: {
    languages: {
      'en-GB': `${SITE_URL}/uk`,
      'en': `${SITE_URL}/uk`,
      'x-default': `${SITE_URL}/uk`,
    },
  },
  openGraph: {
    title: 'Official UK Statutory Calculators & HMRC Tools 2026/27 | Kagazo',
    description:
      'Precision statutory calculators compliant with the Finance Act 2026, HMRC PAYE tax thresholds, National Insurance Class 1, and UK property legislation.',
    url: `${SITE_URL}/uk`,
    locale: 'en_GB',
    siteName: 'Kagazo United Kingdom',
    type: 'website',
  },
};

export default function UkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 antialiased font-sans">
      <InternationalHeader country="uk" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="uk" />
    </div>
  );
}
