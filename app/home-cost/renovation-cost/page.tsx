import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Paintbrush,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import RenovationCostEngine from '@/components/home-cost/RenovationCostEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Home Renovation Cost Calculator India | Painting Litres & Floor Tile Estimator',
  description:
    'Calculate wall painting litres, coats, paint cost, and labor alongside vitrified floor tiles count with 10% wastage. Turnkey room renovation budget for Indian homes.',
  alternates: {
    canonical: 'https://veriseal.in/home-cost/renovation-cost',
  },
  openGraph: {
    title: 'Home Renovation Painting & Tile Cost Calculator | VeriSeal',
    description:
      'Estimate exact paint litres, labor charges, and vitrified floor tile boxes for room makeovers in India.',
    url: 'https://veriseal.in/home-cost/renovation-cost',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How many litres of paint are needed for a 10×12 ft room in India?',
    answer:
      'A standard 10×12 ft room with a 10 ft ceiling height has approximately 400 sq ft of wall surface area. Subtracting standard door and window openings leaves roughly 360 sq ft. For 2 coats of premium acrylic emulsion (coverage ~120–130 sq ft/L), you will need approximately 3 to 4 litres of paint, plus 1 coat of primer (3 litres).',
  },
  {
    question: 'Why is 10% wastage added to floor tile calculations?',
    answer:
      'Tilers must cut tiles along room perimeters, door frames, and column corners. Odd angled off-cuts cannot always be reused. Adding a 10% safety buffer guarantees you won’t run out of tiles from the same production batch (preventing visible shade variations).',
  },
];

export default function RenovationCostPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Paintbrush className="w-3.5 h-3.5" />
          <span>Renovation Quantity Surveyor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Home Renovation Cost Calculator: Painting &amp; Floor Tiles
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Input your room length, width, and height to estimate exact paint litres, vitrified tile counts with wastage, materials budget, and contractor labor costs.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <RenovationCostEngine />

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
