import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import DeliveryProfitEngine from '@/components/business-os/DeliveryProfitEngine';
import { Truck, HelpCircle, ChevronRight, Tag, TrendingUp, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'COD RTO Loss Calculator India | Shiprocket & Delhivery Delivery Profit Per Order',
  description:
    'Free COD Return-to-Origin (RTO) loss calculator for Indian D2C brands, Instagram sellers, and Meesho/Flipkart sellers. Calculate the hidden RTO tax per delivered order across Shiprocket, Delhivery, and Blue Dart. Discover how to slash return rates by 50%.',
  keywords: [
    'RTO loss calculator India COD e-commerce',
    'Shiprocket delivery profit calculator',
    'Delhivery COD RTO cost calculator',
    'how to calculate return to origin loss India',
    'ecommerce delivery profit per order India',
    'COD vs prepaid UPI profit comparison India',
    'courier shipping margin calculator 500g India',
    'reduce RTO rate India D2C brand',
    'true delivered profit calculator ecommerce India',
    'COD return rate calculator India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/delivery-profit-calculator',
  },
  openGraph: {
    title: 'COD RTO Loss Calculator India | Shiprocket Delivery Profit Per Order | Kagazo',
    description:
      'Cash on Delivery (COD) returns ruin margins. Calculate the hidden RTO tax per delivered order across Shiprocket, Delhivery, and Blue Dart logistics partners.',
    url: 'https://Kagazo.in/business-os/delivery-profit-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COD RTO Loss Calculator India | Shiprocket & Delhivery Delivery Profit',
    description:
      'Find out how much COD returns are costing per delivered order. Free RTO tax calculator for Indian D2C and Instagram sellers.',
  },
};

const FAQS = [
  {
    question: 'What is a good (acceptable) RTO rate for Indian e-commerce in 2025?',
    answer:
      'Industry benchmarks for Indian e-commerce RTO rates: Fashion & Clothing 25–40% (high), Electronics 5–12% (low), Home Decor 15–25% (medium), and Beauty/Personal Care 10–18% (medium). Top-performing Indian D2C brands that have implemented prepaid incentives and WhatsApp address verification typically achieve 8–15% overall RTO across all categories. Anything above 25% significantly erodes profitability.',
  },
  {
    question: 'How does the COD collection charge work on Shiprocket and Delhivery?',
    answer:
      'When a customer pays cash at doorstep on delivery, the courier collects the money and remits it to your bank account — but charges a COD handling fee of 1–1.5% of the order value (minimum ₹28–₹45 depending on the logistics partner). Shiprocket charges 1.25% COD fee, Delhivery charges 1.5%. For a ₹500 order, this adds ₹6.25–₹7.50 per delivered order as an invisible cost that many sellers ignore.',
  },
  {
    question: 'How much does an RTO return actually cost per order in India?',
    answer:
      'Full RTO cost per returned order: Forward freight ₹65–₹120 (paid regardless) + Reverse freight ₹45–₹90 (paid for the return) + Lost packaging material ₹20–₹50 + Re-stocking/re-labeling labor ₹15–₹30 + COD collection charge waived revenue ₹28–₹45. Total hidden RTO cost per returned order = ₹173 to ₹335. If your product margin is only ₹200, a single return wipes out 1.5 successful deliveries worth of profit.',
  },
  {
    question: 'Should I stop Cash on Delivery (COD) completely for my Indian D2C store?',
    answer:
      'No — removing COD completely typically reduces conversion rates by 30–50% in Indian markets, as many customers (especially in Tier-2 and Tier-3 cities) prefer or require COD. The optimal strategy is a hybrid approach: (1) Offer a 5–8% prepaid UPI discount to incentivize digital payment, (2) Restrict COD for high-RTO pin codes, (3) Send WhatsApp confirmation before dispatch to verify intent, and (4) Place COD surcharge of ₹30–₹50 to partially offset handling costs.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/product-pricing-calculator', label: 'Amazon & Flipkart Pricing', icon: Tag },
  { href: '/business-os/real-profit-calculator', label: 'Monthly P&L & Profit Leaks', icon: TrendingUp },
  { href: '/business-os/minimum-order-calculator', label: 'Free Delivery MOV Calculator', icon: Target },
];

export default function DeliveryProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'COD RTO Loss Calculator', item: 'https://Kagazo.in/business-os/delivery-profit-calculator' },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your True Delivered Profit Per Order in Indian E-Commerce',
        description: 'Calculate net profit per delivered order after accounting for COD RTO returns, forward and reverse freight.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter your product selling price and cost', text: 'Input your selling price (MRP), product cost (COGS), and packaging cost.' },
          { '@type': 'HowToStep', position: 2, name: 'Enter your courier freight charges', text: 'Add your forward shipping cost and COD collection charge percentage (1–1.5%).' },
          { '@type': 'HowToStep', position: 3, name: 'Set your COD RTO return rate', text: 'Enter your actual RTO percentage (industry average: 20–30%). Add reverse freight cost.' },
          { '@type': 'HowToStep', position: 4, name: 'View true delivered profit', text: 'See profit per successfully delivered order, hidden RTO tax per order, and total monthly RTO losses.' },
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
          { label: 'COD RTO Loss Calculator' },
        ]}
      />

      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-indigo-600" />
          <span>Shiprocket · Delhivery · Blue Dart COD RTO Reality</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          COD RTO Loss Calculator India — Shiprocket & Delhivery Delivery Profit Per Order
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          In Indian e-commerce, 15% to 30% of Cash-on-Delivery orders are refused at the doorstep and returned as RTO. Enter your forward courier, reverse freight, and return rate to find your true delivered net margin.
        </p>
      </div>

      <DeliveryProfitEngine />

      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">The Indian E-Commerce RTO Defense Playbook</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">How top direct-to-consumer brands slash delivery failure rates below 10%.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Instant UPI Cash Discount</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Offering a flat ₹50 or 5% discount for instant UPI payments converts 30%–45% of COD shoppers into prepaid buyers. Prepaid orders have virtually zero doorstep rejection.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. WhatsApp Address Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Send an automated WhatsApp confirmation message before dispatching. If the buyer does not confirm within 24 hours, call them to confirm their pin code and intent to pay.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Blacklist High-RTO Pin Codes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Certain postal pin codes consistently suffer from 50%+ courier non-delivery. Restrict COD availability in those specific zones to protect your shipping budget.
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
