import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Droplets,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import WaterTankEngine from '@/components/home-cost/WaterTankEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Home Water Tank Size Calculator India | Overhead & Sump Capacity (IS 1172)',
  description:
    'Calculate the recommended overhead water tank and underground sump capacity in Litres for Indian homes, independent houses, and apartments based on Bureau of Indian Standards (IS 1172).',
  alternates: {
    canonical: 'https://veriseal.in/home-cost/water-tank-calculator',
  },
  openGraph: {
    title: 'Home Water Tank Size Calculator (IS 1172) | VeriSeal',
    description:
      'Size your rooftop overhead tank (500L, 1000L, 1500L, 2000L) and underground sump based on family members and municipal buffer days.',
    url: 'https://veriseal.in/home-cost/water-tank-calculator',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What is the Indian standard for daily domestic water consumption?',
    answer:
      'According to the Bureau of Indian Standards code IS 1172, the standard daily domestic water consumption for an Indian household in full plumbing conditions is 135 Litres Per Capita per Day (LPCD): including drinking (3L), cooking (4L), bathing (55L), toilet flushing (30L), washing clothes (20L), washing utensils (10L), and house cleaning (13L).',
  },
  {
    question: 'How much water sump capacity should I construct compared to overhead tank?',
    answer:
      'Structural and plumbing engineers recommend sizing your underground sump between 1.5× to 2.0× your overhead tank capacity (e.g. 2,000L to 3,000L sump for a 1,000L overhead tank). This ensures you can store sufficient water from irregular municipal tanker supply without overflowing.',
  },
];

export default function WaterTankCalculatorPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
          <Droplets className="w-3.5 h-3.5" />
          <span>IS 1172 Plumbing Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Home Water Tank &amp; Underground Sump Size Calculator
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Determine the exact overhead loft tank and underground storage sump capacity required for your family to ensure zero dry-tap days.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <WaterTankEngine />

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                <span className="text-emerald-600 font-extrabold">Q:</span>
                {faq.question}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Space */}
      <AdSlot slot="in_content" />
    </div>
  );
}
