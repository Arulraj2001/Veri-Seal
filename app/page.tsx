import * as React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { IntentGateway } from '@/components/home/IntentGateway';
import { UploadZone } from '@/components/home/UploadZone';
import { UploadZoneSkeleton } from '@/components/home/UploadZoneSkeleton';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SupportedDocs } from '@/components/home/SupportedDocs';
import { TrustSection } from '@/components/home/TrustSection';
import { FaqSection } from '@/components/home/FaqSection';
import { ApiOfferingBanner } from '@/components/home/ApiOfferingBanner';
import { OstruneAgencyBanner } from '@/components/home/OstruneAgencyBanner';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* 3-Pillar Intent Gateway (Psychological Navigation) */}
      <IntentGateway />

      {/* Upload Zone (Main Interactive Tool) with Suspense & Zero CLS Skeleton */}
      <React.Suspense fallback={<UploadZoneSkeleton />}>
        <UploadZone />
      </React.Suspense>

      {/* How It Works (3 Steps) */}
      <HowItWorks />

      {/* Supported Documents & States Tabs */}
      <SupportedDocs />

      {/* Trust & RCAI Security Cards */}
      <TrustSection />

      {/* Developer & Enterprise REST API Offering Ad */}
      <ApiOfferingBanner />

      {/* Ostrune Agency Engineering & SEO Showcase */}
      <OstruneAgencyBanner />

      {/* FAQ Accordion Section */}
      <FaqSection />
    </div>
  );
}
