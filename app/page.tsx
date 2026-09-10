import * as React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { UploadZone } from '@/components/home/UploadZone';
import { UploadZoneSkeleton } from '@/components/home/UploadZoneSkeleton';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SupportedDocs } from '@/components/home/SupportedDocs';
import { TrustSection } from '@/components/home/TrustSection';
import { FaqSection } from '@/components/home/FaqSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

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

      {/* FAQ Accordion Section */}
      <FaqSection />
    </div>
  );
}
