import * as React from 'react';
import type { Metadata } from 'next';
import ClientEngine from './ClientEngine';

export const metadata: Metadata = {
  title: 'Australian GST 10% & Business Activity Statement (BAS) Calculator | Kagazo Australia',
  description:
    'Calculate 10% Goods and Services Tax additions, 1/11th GST removals from inclusive invoices, and quarterly BAS 1A vs 1B reconciliation for ATO compliance.',
  alternates: {
    canonical: 'https://kagazo.in/au/goods-and-services-tax-gst-calculator',
    languages: {
      'en-AU': 'https://kagazo.in/au/goods-and-services-tax-gst-calculator',
      'en': 'https://kagazo.in/au/goods-and-services-tax-gst-calculator',
      'x-default': 'https://kagazo.in/au/goods-and-services-tax-gst-calculator',
    },
  },
  openGraph: {
    title: 'Australian GST 10% & Business Activity Statement (BAS) Calculator | Kagazo Australia',
    description:
      'Calculate 10% Goods and Services Tax additions, 1/11th GST removals from inclusive invoices, and quarterly BAS 1A vs 1B reconciliation for ATO compliance.',
    url: 'https://kagazo.in/au/goods-and-services-tax-gst-calculator',
    siteName: 'Kagazo Australia',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australian GST 10% & Business Activity Statement (BAS) Calculator',
    description:
      'Calculate 10% Goods and Services Tax additions, 1/11th GST removals from inclusive invoices, and quarterly BAS 1A vs 1B reconciliation for ATO compliance.',
  },
};

export default function Page() {
  return <ClientEngine />;
}
