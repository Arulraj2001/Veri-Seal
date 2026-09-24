import * as React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { UploadZone } from '@/components/home/UploadZone';
import { UploadZoneSkeleton } from '@/components/home/UploadZoneSkeleton';
import { ToolsMatrix } from '@/components/home/ToolsMatrix';
import { DecisionEnginesShowcase } from '@/components/home/DecisionEnginesShowcase';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SupportedDocs } from '@/components/home/SupportedDocs';
import { TrustSection } from '@/components/home/TrustSection';
import { BlogShowcase } from '@/components/home/BlogShowcase';
import { ApiOfferingBanner } from '@/components/home/ApiOfferingBanner';
import { OstruneAgencyBanner } from '@/components/home/OstruneAgencyBanner';
import { FaqSection } from '@/components/home/FaqSection';
import { SITE_URL } from '@/lib/constants';
import { getMergedSettings } from '@/lib/settings-store';

export const metadata: Metadata = {
  title: "Kagazo — India's Sovereign Document, Exam Compliance & Citizen Tool Suite",
  description:
    'Instantly fix government PDF digital signatures (green checkmark), resize exam photos for UPSC, TNPSC & SSC, create 5-in-1 A4 ID gang sheets, mask Aadhaar, and compress PDFs. 100% free, in-browser RAM privacy.',
  keywords: [
    'verify government pdf signature',
    'fix yellow question mark aadhaar pdf',
    'upsc 200kb pdf compressor',
    'tnpsc otr photo resizer',
    'ibps declaration size converter',
    'mask aadhaar online free',
    'aadhaar front back merge pdf',
    'a4 multi id card maker epson',
    'pvc id card maker',
    'free ats resume builder india',
    'digital signature verify india',
    'tn esevai certificate signature verify',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Kagazo — India's Sovereign Document, Exam Compliance & Citizen Tool Suite",
    description:
      'Verify government PDF signatures with cryptographic green tick, format zero-rejection exam photos for UPSC/TNPSC, print 5-in-1 A4 sheets, and mask Aadhaar. 100% free & private.',
    url: SITE_URL,
    siteName: 'Kagazo India',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Kagazo — India's Sovereign Document & Exam Suite")}&subtitle=${encodeURIComponent('Verify Signatures · 57 Free Tools · 100% Client-Side RAM')}&type=home`,
        width: 1200,
        height: 630,
        alt: 'Kagazo India - Sovereign Document & Citizen Tool Suite',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kagazo — India's Sovereign Document, Exam Compliance & Citizen Tool Suite",
    description:
      'Instantly fix PDF signatures, format UPSC/TNPSC exam photos, create A4 gang sheets, and compress PDFs in browser RAM.',
    images: [
      `${SITE_URL}/api/og?title=${encodeURIComponent("Kagazo — India's Sovereign Document & Exam Suite")}&subtitle=${encodeURIComponent('Verify Signatures · 57 Free Tools · 100% Client-Side RAM')}&type=home`,
    ],
    creator: '@Kagazo_in',
  },
};

export default async function HomePage() {
  const settings = await getMergedSettings();
  const hideDecisionEngines = settings.hide_decision_engines;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Kagazo India',
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        sameAs: [
          'https://x.com/Kagazo_in',
          'https://www.producthunt.com/products/kagazo',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Kagazo',
        description: "India's Sovereign Document, Exam Compliance & Citizen Tool Suite",
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/tools?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#application`,
        name: 'Kagazo Sovereign Citizen Suite',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All (Web, Android, iOS, Windows, macOS, Linux)',
        author: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '4820',
          bestRating: '5',
          worstRating: '1',
        },
        description: hideDecisionEngines
          ? '57+ free client-side sovereign utilities including digital signature verification, exam photo resizing, A4 multi-card printing, and PDF tools.'
          : '57+ free client-side sovereign utilities including digital signature verification, exam photo resizing, A4 multi-card printing, and construction calculators.',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why does my government PDF show a yellow question mark?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Indian government PDFs are digitally signed using certificates from NIC, eMudhra, or other CCA India licensed authorities. Most PDF viewers don't include India's Root Certifying Authority (RCAI) in their default trust store. Kagazo validates the signature against official CCA hierarchy and creates a permanent green tick.",
            },
          },
          {
            '@type': 'Question',
            name: 'Is my document safe? Do you store my PDF or photos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Zero storage. All document verification, photo resizing, and PDF compression executes 100% in browser RAM. Files are never written to disk or saved on cloud servers, adhering to India DPDP Act 2023.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does Kagazo ensure zero rejection for UPSC, TNPSC & SSC exam portals?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Recruitment boards enforce strict pixel dimensions (e.g. 125x165px for TNPSC) and tight file size ceilings (20KB-50KB for photos, under 200KB for certificates). Kagazo tools calibrate files precisely to official criteria on the first upload.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is UIDAI Aadhaar Masking and is it legally valid?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under UIDAI and RBI KYC guidelines, masked Aadhaar hides the first 8 digits while keeping the photo and last 4 digits visible. Kagazo produces legally compliant masked Aadhaar copies client-side.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. Hero Section (H1, Command Search, Hot-Pills, Live Counter) */}
      <HeroSection hideDecisionEngines={hideDecisionEngines} />

      {/* 2. Real-time Stats Bar */}
      <StatsBar />

      {/* 3. Core Interactive PDF Signature Verification Engine (with Suspense & Zero CLS) */}
      <React.Suspense fallback={<UploadZoneSkeleton />}>
        <UploadZone />
      </React.Suspense>

      {/* 4. Supported Documents & States Tabs (Immediately validates which official state certificates work in the verifier) */}
      <SupportedDocs />

      {/* 5. How It Works (3 Steps & Quick Upload CTA directly back to the tool) */}
      <HowItWorks />

      {/* 6. Curated 57+ Sovereign Tools Matrix (Exam Suite, KYC Privacy, CSC Print Lab, PDF Tools) */}
      <ToolsMatrix />

      {/* 7. Flagship Citizen Decision Engines (Conditionally rendered when not hidden) */}
      {!hideDecisionEngines && <DecisionEnginesShowcase />}

      {/* 8. Sovereign Trust & RCAI Security Cards */}
      <TrustSection />

      {/* 9. Sovereign Knowledge Hub (Trending Research Guides from Blog) */}
      <BlogShowcase />

      {/* 10. Developer & Enterprise REST API Offering */}
      <ApiOfferingBanner />

      {/* 11. Ostrune Agency Engineering & SEO Showcase */}
      <OstruneAgencyBanner />

      {/* 12. FAQ Accordion Section */}
      <FaqSection hideDecisionEngines={hideDecisionEngines} />
    </div>
  );
}
