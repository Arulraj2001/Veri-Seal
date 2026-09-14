import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BatteryCharging,
  ChevronRight,
  HelpCircle,
  Zap,
  Sun,
  Wind,
} from 'lucide-react';
import InverterBatteryEngine from '@/components/home-cost/InverterBatteryEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Inverter Battery Calculator India | Find the Right VA & Ah for Your Home Load',
  description:
    'Calculate the perfect inverter capacity (VA) and battery size (Ah) for your Indian home. Sizing guide for fans, lights, TV, fridge, and AC with realistic power cut backup duration. Tubular vs Lithium battery comparison.',
  keywords: [
    'inverter battery calculator India',
    'inverter size calculator for home India',
    'how many Ah battery for 4 hour backup India',
    '150Ah vs 200Ah battery which is better India',
    'inverter VA calculator for fans and lights',
    'tubular vs lithium battery home inverter India',
    '1 kVA inverter how many hours backup',
    'home UPS battery capacity calculator',
    'how to calculate inverter capacity for home',
    'best inverter battery for frequent power cut India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/inverter-battery-calculator',
  },
  openGraph: {
    title: 'Inverter & Battery Capacity Calculator India — VA & Ah Sizing | Kagazo',
    description:
      'Size your home backup inverter and 150Ah/200Ah tubular or lithium battery with exact backup hours calculation for Indian power cuts.',
    url: 'https://Kagazo.in/home-cost/inverter-battery-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inverter Battery Calculator India | VA & Ah Sizing for Home Backup',
    description:
      'Find the right inverter capacity and battery Ah for your home. Supports fans, lights, TV, fridge. Tubular vs lithium comparison included.',
  },
};

const FAQS = [
  {
    question: 'How do I calculate inverter VA capacity from total appliance Watts?',
    answer:
      'Inverters are rated in Volt-Amperes (VA), whereas appliances are rated in Watts. To convert Watts to VA, divide total wattage by the power factor (typically 0.8) and add a 20–25% safety surge headroom: Inverter VA = (Total Watts / 0.8) × 1.25. For example, a 500W load needs a (500 / 0.8) × 1.25 = ~780 VA (or standard 900VA / 1 kVA) inverter.',
  },
  {
    question: 'What is the difference between Tubular Lead-Acid and Lithium batteries for home inverters?',
    answer:
      'Tubular lead-acid batteries (150Ah, 200Ah) cost ₹12,000–₹18,000 per unit, last 5–7 years, require maintenance (distilled water top-up), and support 1,200–1,500 charge cycles. Lithium Iron Phosphate (LiFePO4) batteries cost ₹25,000–₹40,000 but last 10–15 years, support 3,000+ cycles, are maintenance-free, and are 30% lighter. Lithium pays back in 6–8 years compared to replacing tubular batteries twice.',
  },
  {
    question: 'How many Ah battery do I need for 4 hours of power backup in India?',
    answer:
      'Battery Ah = (Total Load in Watts × Backup Hours) / (Battery Voltage × Efficiency). For a 400W load over 4 hours with a 12V battery at 80% efficiency: (400 × 4) / (12 × 0.8) = 167 Ah. You would need a 180Ah or 200Ah tubular battery. For a 24V system (two 12V batteries in series), each battery only needs to be 100Ah.',
  },
  {
    question: 'Can I run a refrigerator on a home inverter during a power cut?',
    answer:
      'Yes, but with important caveats. A typical 250L refrigerator draws 150–200W during normal operation but has a high motor startup surge of 600–800W. Your inverter must handle this surge — a 900VA inverter may trip. A 1.5 kVA or 2 kVA inverter is recommended if you want to run a fridge + other appliances simultaneously. Also, running a fridge significantly reduces backup duration: a 200Ah battery will last only 3–4 hours instead of 8 hours for lights and fans.',
  },
  {
    question: 'What is the difference between a home UPS and a home inverter?',
    answer:
      'A Home UPS (Uninterruptible Power Supply) switches to battery within 10–20 milliseconds of a power outage — fast enough that computers, TVs, and sensitive electronics do not restart or lose data. A conventional home inverter has a 20–200 ms switching delay, which can cause computers to restart and some electronic devices to malfunction. Home UPS systems are recommended if you work from home or have a desktop PC, while standard inverters are sufficient for fans, lights, and TVs.',
  },
];

const RELATED_TOOLS = [
  { href: '/home-cost/electricity-bill-calculator', label: 'Electricity Bill Calculator', icon: Zap },
  { href: '/home-cost/solar-calculator', label: 'Solar & PM Surya Ghar Subsidy', icon: Sun },
  { href: '/home-cost/ac-cost-calculator', label: 'AC Running Cost Calculator', icon: Wind },
];

export default function InverterBatteryCalculatorPage() {
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
            name: 'Inverter & Battery Capacity Calculator',
            item: 'https://Kagazo.in/home-cost/inverter-battery-calculator',
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
          { label: 'Inverter & Battery Capacity Calculator' },
        ]}
      />

      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
          <BatteryCharging className="w-3.5 h-3.5" />
          <span>VA · Ah · Backup Duration · Tubular vs Lithium</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Home Inverter & Battery Capacity Calculator India — VA & Ah Sizing
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Calculate the perfect inverter capacity (VA) and battery size (Ah) for your Indian home.
          Supports fans, lights, TV, fridge, and AC load with realistic power cut backup duration
          and tubular vs lithium battery comparison.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <InverterBatteryEngine />

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
