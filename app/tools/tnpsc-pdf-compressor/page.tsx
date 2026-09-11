import * as React from 'react';
import type { Metadata } from 'next';
import { CompressorPageTemplate } from '@/components/tools/CompressorPageTemplate';
import { TOOL_CONFIGS } from '@/components/tools/tool-configs';

const config = TOOL_CONFIGS['tnpsc-pdf-compressor'];

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  keywords: config.seoKeywords,
  alternates: {
    canonical: config.canonicalUrl,
  },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: config.canonicalUrl,
    siteName: 'VeriSeal',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.title,
    description: config.metaDescription,
  },
};

export default function TnpscPdfCompressorPage() {
  return <CompressorPageTemplate config={config} />;
}
