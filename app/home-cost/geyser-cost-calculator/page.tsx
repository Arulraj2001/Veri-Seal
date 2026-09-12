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
import GeyserBattleEngine from '@/components/home-cost/GeyserBattleEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Water Geyser Cost Calculator India | Electric vs Gas vs Solar Water Heater',
  description:
    'Compare annual running costs for Electric Storage Geysers, Instant LPG Gas Geysers, and Rooftop Solar Water Heaters in India. Calculate 5-year savings and solar water heater payback period.',
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/geyser-cost-calculator',
  },
  openGraph: {
    title: 'Electric vs Gas vs Solar Water Heater Cost Comparison | Kagazo',
    description:
      'Discover whether a solar water heater or 5-Star electric geyser saves the most money for your Indian family.',
    url: 'https://Kagazo.in/home-cost/geyser-cost-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How much electricity does a 25 Litre electric geyser consume in India?',
    answer:
      'A standard 25L electric storage geyser has a 2,000 Watt (2 kW) heating element. It takes approximately 25 to 30 minutes to heat the water to 50°C, consuming around 0.9 to 1.0 unit (kWh) per hot bucket/shower. For a family of 4 taking daily hot baths, it consumes around 100 to 120 units monthly (~₹800 to ₹1,100/mo).',
  },
  {
    question: 'How long does a rooftop solar water heater take to pay for itself?',
    answer:
      'A 150 Litre Per Day (LPD) ETC solar water heater costs approximately ₹26,000 to ₹30,000 with installation. By replacing electric water heating for 300+ days a year, it saves around ₹6,000 to ₹8,500 annually in electricity bills, fully paying for itself in approximately 3.5 to 4.2 years.',
  },
];

export default function GeyserCostCalculatorPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Flame className="w-3.5 h-3.5" />
          <span>3-Way Hot Water Economics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Water Heater Cost Calculator: Electric vs Gas vs Solar
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Compare annual operating costs and payback timelines between electric storage geysers, instant LPG gas geysers, and rooftop solar thermal systems.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <GeyserBattleEngine />

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
