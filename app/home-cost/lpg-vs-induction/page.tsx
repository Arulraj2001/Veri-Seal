import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Flame,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import LpgVsInductionEngine from '@/components/home-cost/LpgVsInductionEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'LPG Gas Cylinder vs Induction Cooking Cost Calculator India | Which Is Cheaper?',
  description:
    'Compare monthly cooking costs between a 14.2 kg domestic LPG cylinder and an 1800W induction cooktop in India. Thermal efficiency, fuel economics, and solar cooking synergy.',
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/lpg-vs-induction',
  },
  openGraph: {
    title: 'LPG Cylinder vs Induction Cooking Cost Comparison | Kagazo',
    description:
      'Discover whether cooking with an LPG cylinder or an electric induction cooktop is cheaper in Indian households.',
    url: 'https://Kagazo.in/home-cost/lpg-vs-induction',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why is induction cooking more thermally efficient than an LPG gas stove?',
    answer:
      'A traditional gas stove burner transfers only about 55% to 60% of its heat into the cooking vessel; the remaining 40% escapes as hot ambient air into the kitchen. In contrast, induction cooktops use electromagnetic induction to generate heat directly inside the ferrous cooking pan itself, achieving an 84% to 90% thermal transfer efficiency.',
  },
  {
    question: 'How many units of electricity does an induction cooktop consume for 1 hour of cooking?',
    answer:
      'A typical 1,800W induction cooktop running at medium-high power consumes approximately 1.2 to 1.4 units (kWh) per hour. At an average electricity tariff of ₹7.50/unit, 1 hour of daily cooking costs roughly ₹9 to ₹10.50.',
  },
];

export default function LpgVsInductionPage() {
  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Home Cost OS', href: '/home-cost' },
          { label: 'LPG vs Induction Cooking Cost' },
        ]}
      />
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Flame className="w-3.5 h-3.5" />
          <span>Kitchen Cooking Economics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          LPG Cylinder vs Induction Cooking Cost Calculator
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Compare the real monthly fuel cost, boiling speed, and thermal efficiency between 14.2 kg domestic LPG gas cylinders and electric induction cooktops.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <LpgVsInductionEngine />

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
