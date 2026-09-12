import * as React from 'react';
import type { Metadata } from 'next';
import GstinVerifierEngine from '@/components/tools/GstinVerifierEngine';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'GST Verifier Online Free | Live GSTN Taxpayer Search & MOD 36',
  description:
    'Mathematically verify 15-digit Indian GST numbers online for free. Decode state codes, embedded business PAN, and entity registration numbers with official MOD 36 checksum calculation.',
  alternates: {
    canonical: 'https://veriseal.in/tools/gst-verifier',
  },
  openGraph: {
    title: 'Free GST Number Verifier | VeriSeal',
    description:
      'Verify Indian GSTIN numbers, decode State & PAN, and validate MOD 36 checksum instantly.',
    url: 'https://veriseal.in/tools/gst-verifier',
    siteName: 'VeriSeal',
    type: 'website',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('GST Verifier Online Free')}&subtitle=${encodeURIComponent('Live GSTN Taxpayer Search & MOD 36 Checksum')}&type=tool`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function GstVerifierPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'GST Verifier' },
          ]}
          showHomeIcon
        />
        <GstinVerifierEngine />
        <RelatedTools currentSlug="/tools/gst-verifier" />
      </div>
    </div>
  );
}
