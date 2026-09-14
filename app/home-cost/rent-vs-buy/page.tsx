import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  HelpCircle,
  Paintbrush,
  Wallet,
  Flame,
} from 'lucide-react';
import RentVsBuyEngine from '@/components/home-cost/RentVsBuyEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator India 2025 | Home Loan EMI vs SIP 10-Year Wealth Model',
  description:
    'Should you buy a house or rent and invest in mutual funds? Indian real estate financial model calculating 10-year net worth — home loan EMI, down payment opportunity cost, property appreciation vs Nifty 50 SIP returns, and Section 24b tax benefit.',
  keywords: [
    'rent vs buy calculator India 2025',
    'should I rent or buy house India',
    'home loan EMI vs rent comparison India',
    'opportunity cost of down payment vs SIP India',
    'rent vs buy break-even calculator India',
    'down payment investment vs home purchase India',
    'Section 24b home loan tax benefit calculator',
    'property appreciation vs mutual fund SIP India',
    'is it better to rent or buy in Bangalore Mumbai Delhi',
    'net worth comparison rent vs buy India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/rent-vs-buy',
  },
  openGraph: {
    title: 'Rent vs Buy Calculator India 2025 — 10-Year Wealth Comparison | Kagazo',
    description:
      'Compare buying a house with an 8.5% home loan vs renting and investing the down payment in a Nifty 50 equity SIP. Includes stamp duty, Section 24b, and property appreciation.',
    url: 'https://Kagazo.in/home-cost/rent-vs-buy',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy Calculator India 2025 | Home Loan EMI vs SIP Investment',
    description:
      'India\'s most detailed rent vs buy financial model. Compare 10-year wealth: home loan + property appreciation vs rent + SIP investing.',
  },
};

const FAQS = [
  {
    question: 'Why is comparing Rent vs Buy not just about comparing Rent with EMI?',
    answer:
      'A true financial comparison must account for the substantial opportunity cost of your upfront down payment (e.g. 20% + 7% stamp duty and registration). If you rent, that lump sum can compound in a 12% equity index mutual fund. Additionally, you must factor in home loan interest tax benefits (Section 24b), annual property appreciation (5%–7%), rent inflation (5%), and ongoing building maintenance charges of ₹3,000–₹8,000/month.',
  },
  {
    question: 'When does buying a home make more financial sense in India?',
    answer:
      'Buying makes financial sense when: (1) Your property is in a high-appreciation micro-market (8%+ annual growth), (2) You plan to stay for 10+ years to amortize stamp duty and brokerage costs, (3) Your effective home loan rate is below 8.5%, and (4) The rental yield in your area is low (below 2.5%), indicating rents are cheap relative to property prices.',
  },
  {
    question: 'How does the Section 24b home loan tax benefit work in India?',
    answer:
      'Under Section 24(b) of the Income Tax Act, you can claim a deduction of up to ₹2 Lakhs per year on the interest paid on a home loan for a self-occupied property. For a person in the 30% tax bracket, this saves up to ₹60,000 in taxes annually. Additionally, the principal repayment (up to ₹1.5 Lakhs/year) qualifies under Section 80C deduction. Our calculator models both benefits to give you the actual post-tax cost of owning.',
  },
  {
    question: 'How much stamp duty and registration cost is applicable when buying a home in India?',
    answer:
      'Stamp duty varies by state: Maharashtra charges 5–6% (1% additional Metro Cess), Karnataka charges 5%, Tamil Nadu charges 7%, Delhi charges 4–6% (varies by gender). Registration fees are typically 1% of the property value, capped at ₹30,000 in most states. For a ₹60 Lakh property in Mumbai, stamp duty + registration can add ₹3.6–₹4.2 Lakhs upfront — a major hidden cost that significantly reduces early-year ROI.',
  },
  {
    question: 'Is investing the down payment in a Nifty 50 SIP better than buying a home in India?',
    answer:
      'Historically (2010–2024), Nifty 50 delivered 12–14% CAGR while average Indian residential real estate returned 5–8% CAGR. On paper, SIP wins financially in most Indian metros. However, homeownership provides forced savings discipline, eliminates rent-hike risk, and gives lifestyle stability — intangible benefits that many Indian families value above pure financial optimization. The best answer depends on your personal timeline, city-specific real estate market, and risk tolerance.',
  },
];

const RELATED_TOOLS = [
  { href: '/home-cost/renovation-cost', label: 'Home Renovation Cost Calculator', icon: Paintbrush },
  { href: '/home-cost/lpg-vs-induction', label: 'LPG vs Induction Cost', icon: Flame },
  { href: '/home-cost', label: 'Home Cost Hub', icon: Wallet },
];

export default function RentVsBuyPage() {
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
            name: 'Rent vs Buy Calculator India',
            item: 'https://Kagazo.in/home-cost/rent-vs-buy',
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
          { label: 'Rent vs Buy Calculator India' },
        ]}
      />

      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Home className="w-3.5 h-3.5" />
          <span>10-Year Net Wealth · EMI vs SIP · Section 24b · Stamp Duty</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Rent vs Buy Calculator India 2025 — 10-Year Home Loan EMI vs SIP Wealth Model
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Should you buy a house in India or rent and invest the down payment in mutual funds? This
          10-year financial model accounts for home loan EMI, stamp duty, property appreciation,
          Nifty 50 SIP returns, and Section 24b tax benefits.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <RentVsBuyEngine />

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
