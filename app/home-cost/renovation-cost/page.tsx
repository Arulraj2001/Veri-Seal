import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Paintbrush,
  ChevronRight,
  HelpCircle,
  Home,
  Flame,
  Wallet,
} from 'lucide-react';
import RenovationCostEngine from '@/components/home-cost/RenovationCostEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Home Renovation Cost Calculator India | Painting Litres, Tiles & Labour 2025',
  description:
    'Calculate wall painting litres, coats, paint cost, and labour charges — plus vitrified floor tile box count with 10% wastage. Accurate room renovation budget estimator for Indian homes in 2025.',
  keywords: [
    'home renovation cost calculator India',
    'wall painting cost calculator India',
    'how many litres of paint for room India',
    'floor tile quantity calculator India',
    'home painting cost per sqft India 2025',
    'vitrified tile calculator India',
    'house painting labour cost India',
    'renovation budget calculator 2BHK India',
    'paint calculator for room wall India',
    'tile flooring cost estimate India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/renovation-cost',
  },
  openGraph: {
    title: 'Home Renovation Cost Calculator India — Painting & Tile Estimator 2025 | Kagazo',
    description:
      'Estimate exact paint litres, labour charges, and vitrified floor tile boxes for room makeovers in India. Accounts for door/window area deduction and 10% tile wastage.',
    url: 'https://Kagazo.in/home-cost/renovation-cost',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Renovation Cost Calculator India | Paint Litres & Tile Estimator',
    description:
      'Calculate exact paint litres, labour cost, and tile quantity for home renovation in India. Room-by-room estimator with wastage buffer.',
  },
};

const FAQS = [
  {
    question: 'How many litres of paint are needed for a 10×12 ft room in India?',
    answer:
      'A standard 10×12 ft room with a 10 ft ceiling height has approximately 400 sq ft of wall surface area. Subtracting standard door and window openings leaves roughly 360 sq ft. For 2 coats of premium acrylic emulsion (coverage ~120–130 sq ft/L), you will need approximately 3 to 4 litres of paint per coat, plus 3 litres of primer for the first coat.',
  },
  {
    question: 'Why is 10% wastage added to floor tile calculations?',
    answer:
      'Tile wastage accounts for cuts made near walls and corners, breakage during installation and transport, and tiles reserved for future repairs if one cracks. For standard rectangular layouts, 10% is the industry standard. For diagonal or herringbone patterns, increase wastage to 15–18% due to significantly more cut pieces.',
  },
  {
    question: 'What is the current painting labour cost per sq ft in India for 2025?',
    answer:
      'Labour costs vary by city and finish type. For standard emulsion painting (2 coats + 1 primer), labour is approximately ₹12–₹18 per sq ft in Tier-2 cities and ₹18–₹28 per sq ft in metros (Mumbai, Delhi, Bangalore). Texture and designer finishes command ₹40–₹80 per sq ft. Always get 3 quotes from local contractors — rates can vary 30–40% for the same work.',
  },
  {
    question: 'How many boxes of vitrified tiles do I need for a 200 sq ft floor?',
    answer:
      'For a standard 600×600 mm (2×2 ft) vitrified tile, each box contains approximately 4 tiles covering 1.44 sq m (15.5 sq ft). For a 200 sq ft floor with 10% wastage (220 sq ft effective): 220 / 15.5 = ~14.2 boxes. You would need 15 boxes. For 800×800 mm premium tiles, box coverage is different — always check the specific tile box label for sq ft per box.',
  },
  {
    question: 'Which paint brand is best for Indian homes — Asian Paints, Berger, or Indigo?',
    answer:
      'All three are strong choices for Indian climates. Asian Paints Royale and Berger Silk offer similar washability and coverage for premium interiors at ~₹350–₹450 per litre. Indigo Paints has strong UV resistance suited for exterior walls. For humid climates (coastal areas, Kerala, Maharashtra monsoon zones), opt for anti-fungal variants. For standard interior rooms, Asian Paints Tractor Emulsion at ~₹180/litre is the best value-for-money option.',
  },
];

const RELATED_TOOLS = [
  { href: '/home-cost/rent-vs-buy', label: 'Rent vs Buy Calculator', icon: Home },
  { href: '/home-cost/lpg-vs-induction', label: 'LPG vs Induction Cost', icon: Flame },
  { href: '/home-cost', label: 'Home Cost Hub', icon: Wallet },
];

export default function RenovationCostPage() {
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
            name: 'Home Renovation Cost Calculator',
            item: 'https://Kagazo.in/home-cost/renovation-cost',
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
          { label: 'Home Renovation Cost Calculator' },
        ]}
      />

      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <Paintbrush className="w-3.5 h-3.5" />
          <span>Paint Litres · Tile Boxes · Labour Cost Estimator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Home Renovation Cost Calculator India — Painting, Tiles & Labour Budget 2025
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Calculate wall painting litres, coats, paint cost, and labour charges alongside vitrified
          floor tile box count with 10% wastage. Accurate room renovation budget for Indian homes.
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
