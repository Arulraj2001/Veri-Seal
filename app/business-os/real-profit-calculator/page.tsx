import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import RealProfitLeakEngine from '@/components/business-os/RealProfitLeakEngine';
import { TrendingUp, HelpCircle, ChevronRight, Coins, Target, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Monthly P&L & Hidden Profit Leak Finder for Indian Small Business | Kagazo',
  description:
    'Free monthly Profit & Loss (P&L) calculator for Indian SMBs, D2C brands, and kirana shops. Autodetects hidden profit leaks across Amazon/Flipkart marketplace commissions, Shiprocket courier freight, commercial rent, and ad spend.',
  keywords: [
    'monthly profit and loss calculator India small business',
    'hidden profit leak finder Indian shop',
    'amazon seller net profit after fees calculator',
    'ecommerce profit and loss statement India',
    'real profit vs revenue calculator India',
    'marketplace commission profit impact calculator',
    'small business monthly expense calculator India',
    'profit leak detector SMB India 2025',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/real-profit-calculator',
  },
  openGraph: {
    title: 'Monthly P&L & Hidden Profit Leak Finder for Indian SMBs | Kagazo',
    description:
      'Uncover where your business is silently bleeding cash. Autodetects hidden leaks in Amazon/Flipkart marketplace cuts, courier freight, rent, and ad spend.',
    url: 'https://Kagazo.in/business-os/real-profit-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monthly P&L & Profit Leak Finder India | Amazon, Flipkart & D2C SMBs',
    description:
      'Find your hidden profit drains: marketplace commissions, courier RTO losses, packaging. Free monthly P&L calculator for Indian small businesses.',
  },
};

const FAQS = [
  {
    question: 'What are the top hidden profit leaks for Indian small businesses?',
    answer:
      'The four biggest hidden profit leaks in Indian SMBs are: (1) Marketplace commission fees — Amazon/Flipkart charge 8–18% referral fees plus GST on those fees, which most sellers ignore when pricing, (2) COD Return-to-Origin (RTO) losses — 15–30% of Cash-on-Delivery orders are returned, costing double freight, (3) Packaging material costs — bubble wrap, cardboard boxes, and tape add ₹25–₹80 per order in uncounted costs, and (4) Udhaar credit risk — unpaid customer credit translates directly into bad debt that vanishes from visible revenue.',
  },
  {
    question: 'Why is my business profitable on paper but always low on cash?',
    answer:
      'This classic "profit on paper, no cash in hand" situation happens when: (1) You have large Udhaar balances customers haven\'t paid, (2) You have paid for bulk inventory that hasn\'t sold yet (working capital locked in stock), (3) You have an upcoming GST quarterly payment due, or (4) Your collection cycle is longer than your payment cycle — meaning you pay suppliers before customers pay you. This calculator helps identify which of these is your primary culprit.',
  },
  {
    question: 'How do Amazon India\'s referral fees and closing fees work?',
    answer:
      'Amazon India charges two types of fees per sale: (1) Referral Fee — a percentage of the selling price that varies by category (8% for consumer electronics, 15% for clothing, 18% for beauty products). (2) Closing Fee — a flat per-order amount based on price slab (₹15 for products under ₹250, ₹25 for ₹250–₹500, ₹45 for above ₹500). Both fees attract 18% GST on top. For a ₹500 clothing item, total marketplace deduction can reach ₹90–₹110 before courier charges.',
  },
  {
    question: 'What is a healthy net profit margin for an Indian e-commerce or D2C business?',
    answer:
      'A sustainable Indian D2C business should target: Gross Margin 45%+ (selling price minus product cost, packaging, and shipping), Operating Margin 20%+ (after ads, marketplace fees, and salaries), and Net Margin 12%–18%+ (after all fixed overhead). If you are below 10% net margin, the business is surviving but not building owner wealth. Below 5%, you are effectively working for your marketplace platform.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/daily-profit-calculator', label: 'Daily Profit Calculator', icon: Coins },
  { href: '/business-os/product-pricing-calculator', label: 'Marketplace Pricing Calculator', icon: Tag },
  { href: '/business-os/break-even-calculator', label: 'Break-Even Calculator', icon: Target },
];

export default function RealProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Monthly P&L & Profit Leak Finder', item: 'https://Kagazo.in/business-os/real-profit-calculator' },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'Monthly P&L & Profit Leak Finder' },
        ]}
      />

      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
          <span>Profit Leak Diagnostics & Monthly P&L</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Monthly P&L & Hidden Profit Leak Finder for Indian Small Business
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Stop confusing top-line revenue with true profit. This calculator autodetects hidden bleeds across Amazon/Flipkart commissions, Shiprocket courier freight, commercial rent, and ad spend to show your real net take-home.
        </p>
      </div>

      <RealProfitLeakEngine />

      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">The 4 Profit Leak Categories in Indian SMBs</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Where every Indian small business bleeds money invisibly.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Platform Commission Drain</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Amazon and Flipkart charge 8–18% referral fees plus closing fees and 18% GST on those fees. Many sellers forget GST on marketplace fees, underestimating their cost by 3–5%.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">RTO & Returns Bleed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              COD RTO returns double your courier cost — you pay both forward and reverse freight. A 25% RTO rate on 500g orders at ₹60 each costs ₹1,500 per 100 orders in avoidable freight loss.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Invisible Fixed Overhead</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shop rent, helper wages, and electricity are fixed. Dividing them per order reveals the true minimum turnover needed. Most small businesses never do this math explicitly.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-slate-200/60 pb-4">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                <span className="text-indigo-600 font-extrabold">Q:</span>
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Related Business OS Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RELATED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl transition-all group shadow-xs">
                <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 leading-tight">{tool.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
