import * as React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export const metadata: Metadata = {
  title: 'Official Australian Statutory Calculators 2026/27 | ATO PAYG, Super Guarantee & Fair Work',
  description:
    'Comprehensive Australian statutory suite: Revised Stage 3 PAYG salary take-home, 12% Superannuation Guarantee, Fair Work NES redundancy, state stamp duty, HECS/HELP repayments, and ABN/TFN validators.',
  alternates: {
    languages: {
      'en-AU': `${SITE_URL}/au`,
      'en': `${SITE_URL}/au`,
      'x-default': `${SITE_URL}/au`,
    },
  },
  openGraph: {
    title: 'Official Australian Statutory Calculators 2026/27 | Kagazo',
    description:
      'High-precision statutory micro-tools calibrated to ATO tax cuts, Superannuation Guarantee Act 1992, Fair Work Act 2009 NES, and state transfer duty legislation. 100% in-browser client execution.',
    url: `${SITE_URL}/au`,
    locale: 'en_AU',
    siteName: 'Kagazo Australia',
    type: 'website',
  },
};

export default function AustraliaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 antialiased font-sans">
      <InternationalHeader country="au" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="au" />
    </div>
  );
}
