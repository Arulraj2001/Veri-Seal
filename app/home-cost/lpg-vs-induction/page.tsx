import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Flame,
  ChevronRight,
  HelpCircle,
  Zap,
  Home,
  Droplets,
} from 'lucide-react';
import LpgVsInductionEngine from '@/components/home-cost/LpgVsInductionEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'LPG vs Induction Cooking Cost Calculator India | Which Is Cheaper in 2025?',
  description:
    'Compare monthly cooking costs between a 14.2 kg domestic LPG cylinder and an 1800W induction cooktop in India. Thermal efficiency analysis, fuel economics, and solar synergy. Find which saves more per month.',
  keywords: [
    'LPG vs induction cooking cost India',
    'LPG cylinder vs induction cooktop which is cheaper India',
    '14.2 kg LPG cylinder monthly cooking cost India',
    'induction cooktop electricity cost per hour India',
    'is induction cheaper than LPG India 2025',
    'cooking cost calculator India',
    'LPG price per month family India',
    'induction cooktop vs gas stove electricity bill',
    'piped gas vs LPG cylinder cost India',
    'best cooking option for Indian home 2025',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/lpg-vs-induction',
  },
  openGraph: {
    title: 'LPG Cylinder vs Induction Cooking Cost Comparison India 2025 | Kagazo',
    description:
      'Discover whether cooking with a 14.2 kg LPG cylinder or an 1800W electric induction cooktop is cheaper per month for an Indian household.',
    url: 'https://Kagazo.in/home-cost/lpg-vs-induction',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LPG vs Induction Cooking Cost Calculator India | Which Is Cheaper?',
    description:
      'Monthly cooking cost comparison: 14.2 kg LPG cylinder vs 1800W induction cooktop. Find the cheaper option for your Indian home.',
  },
};

const FAQS = [
  {
    question: 'Why is induction cooking more thermally efficient than an LPG gas stove?',
    answer:
      'A traditional gas stove burner transfers only about 55% to 60% of its heat into the cooking vessel; the remaining 40% escapes as hot ambient air into the kitchen. In contrast, induction cooktops use electromagnetic induction to generate heat directly inside the ferrous cooking pan itself, achieving 84% to 90% thermal transfer efficiency — making induction 30–35% more efficient than LPG per unit of food cooked.',
  },
  {
    question: 'How many units of electricity does an induction cooktop consume for 1 hour of cooking?',
    answer:
      'A standard 1800W induction cooktop set to maximum heat consumes 1.8 units (kWh) per hour. In practice, most cooking uses medium heat settings (900W–1200W), consuming 0.9 to 1.2 units per hour. A family of 4 cooking for 2 hours daily consumes approximately 54 to 72 units per month on induction, costing ₹430–₹575 at ₹8/unit.',
  },
  {
    question: 'How many LPG cylinders does an average Indian family use per month?',
    answer:
      'An average Indian family of 4 cooking 3 meals daily uses approximately 0.8 to 1.0 LPG cylinders per month (14.2 kg domestic). At the 2025 subsidized price of approximately ₹900–₹950 per cylinder in major cities, monthly LPG cooking cost is ₹720 to ₹950. Larger families or those making traditional slow-cooked dishes use up to 1.5 cylinders per month.',
  },
  {
    question: 'Is induction cooking cheaper than LPG in India in 2025?',
    answer:
      'At current 2025 rates (LPG ≈ ₹900/cylinder, electricity ≈ ₹8/unit), induction cooking costs approximately ₹430–₹575/month versus LPG at ₹720–₹950/month for a family of 4. Induction is typically 30–40% cheaper. However, induction requires purchasing compatible flat-bottomed steel or iron cookware (not aluminium), which has an initial cost of ₹2,000–₹5,000 for a full set.',
  },
  {
    question: 'Can I use my existing LPG cooktop cookware on an induction stove?',
    answer:
      'Only if your existing cookware is made of ferrous (magnetic) material. Steel pressure cookers and iron kadais typically work on induction. Aluminium vessels, copper-bottomed pans, and glass cookware do NOT work on induction. A simple test: if a fridge magnet sticks firmly to the base of your vessel, it will work on induction. Most Indian households need to replace their aluminium cookers and non-stick kadais when switching to induction.',
  },
];

const RELATED_TOOLS = [
  { href: '/home-cost/electricity-bill-calculator', label: 'Electricity Bill Calculator', icon: Zap },
  { href: '/home-cost/geyser-cost-calculator', label: 'Geyser Cost Calculator', icon: Droplets },
  { href: '/home-cost/rent-vs-buy', label: 'Rent vs Buy Calculator', icon: Home },
];

export default function LpgVsInductionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Home Cost OS', item: 'https://Kagazo.in/home-cost' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'LPG vs Induction Cost Calculator',
            item: 'https://Kagazo.in/home-cost/lpg-vs-induction',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="space-y-10">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Home Cost OS', href: '/home-cost' },
          { label: 'LPG vs Induction Cost Calculator' },
        ]}
      />

      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
          <Flame className="w-3.5 h-3.5" />
          <span>14.2 kg LPG Cylinder vs 1800W Induction Cooktop</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          LPG vs Induction Cooking Cost Calculator India — Which Is Cheaper in 2025?
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Compare monthly cooking costs between a 14.2 kg domestic LPG cylinder and an 1800W
          induction cooktop for an Indian household of 4. Includes thermal efficiency, fuel economics,
          and 2025 price comparison.
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
              <p className="text-xs text-muted-foreground leading-relaxed pl-5">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Related Home Cost Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RELATED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl transition-all group shadow-xs"
              >
                <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 leading-tight">
                  {tool.label}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Ad Space */}
      <AdSlot slot="in_content" />
    </div>
  );
}
