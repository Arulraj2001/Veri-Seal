import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import ConstructionMaterialEngine from '@/components/home-cost/ConstructionMaterialEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Home Construction Material Calculator India | Cement, Sand, Steel & Brick Sizer',
  description:
    'Calculate exact quantities of Cement bags, TMT Steel (kg), M-Sand, Coarse Aggregate, and AAC blocks or red clay bricks per square foot of built-up area in India.',
  alternates: {
    canonical: 'https://veriseal.in/home-cost/construction-materials',
  },
  openGraph: {
    title: 'House Construction Material Quantity Calculator | VeriSeal',
    description:
      'Estimate civil engineering material quantities and total turnkey house building budget in India.',
    url: 'https://veriseal.in/home-cost/construction-materials',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How many cement bags and steel are required for a 1,000 sq ft house in India?',
    answer:
      'Based on standard Indian civil engineering thumb rules, a 1,000 sq ft built-up house requires approximately 400 bags of cement (0.4 bags/sq ft), 3.8 to 4.0 tonnes of TMT steel (3.8 kg/sq ft), 1,750 cu ft of M-sand, and 1,350 cu ft of coarse aggregate for RCC foundations, columns, beams, and slabs.',
  },
  {
    question: 'Are AAC blocks cheaper and better than traditional red clay bricks?',
    answer:
      'Yes. Autoclaved Aerated Concrete (AAC) blocks are 3× larger than red bricks, significantly reducing joint mortar consumption by 60% and speeding up construction. They are also 50% lighter (reducing structural dead load on columns) and provide superior thermal insulation, keeping rooms cooler in summer.',
  },
];

export default function ConstructionMaterialsPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Building2 className="w-3.5 h-3.5" />
          <span>Civil Engineering Quantity Estimator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          House Construction Material &amp; Turnkey Cost Calculator
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Input your plot or built-up area in square feet to estimate exact quantities of cement bags, TMT steel rebar, sand, aggregate, bricks, and total building budget.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <ConstructionMaterialEngine />

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
