import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import DailyProfitEngine from '@/components/business-os/DailyProfitEngine';
import { Coins, HelpCircle, ChevronRight, TrendingUp, Target, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Daily Profit Calculator for Kirana Shops & Indian Retailers | Cash vs UPI vs Udhaar',
  description:
    'Free daily profit calculator for Indian kirana shops, retail stores, and small businesses. Separate Cash, PhonePe/GPay UPI, and Udhaar credit sales. See your real take-home cash and interactive ₹100 rupee anatomy breakdown.',
  keywords: [
    'daily profit calculator kirana shop India',
    'cash vs UPI profit daily ledger India',
    'how to calculate daily profit retail store India',
    'kirana shop daily income calculator',
    'daily net profit after rent and wages India',
    'udhaar vs cash sales daily profit',
    'small business daily expense and profit tracker',
    'daily margin percentage calculator India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/daily-profit-calculator',
  },
  openGraph: {
    title: 'Daily Profit Calculator for Kirana Shops & Retailers India | Cash vs UPI vs Udhaar',
    description:
      "Enter today's Cash, UPI, and Credit sales to see your real daily profit and interactive ₹100 anatomy breakdown. Free and private.",
    url: 'https://Kagazo.in/business-os/daily-profit-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Profit Calculator India | Kirana Shop Cash vs UPI vs Udhaar',
    description:
      'Calculate your real daily profit after separating Cash, UPI, and Udhaar credit sales. Includes ₹100 rupee anatomy breakdown.',
  },
};

const FAQS = [
  {
    question: 'Why should I separate Cash, UPI, and Udhaar in daily profit calculations?',
    answer:
      'Udhaar (credit) sales represent revenue on paper, but zero immediate cash in your drawer. If 30% of your daily sales are credit, you cannot use that money today to pay helper wages, supplier invoices, or shop rent. Separating channels shows you your actual liquid cash position versus your accounting position.',
  },
  {
    question: 'What is the ideal daily net margin for Indian retail kirana stores?',
    answer:
      'In Indian kirana and FMCG retail, gross margins hover between 12% and 18%. After helper wages, electricity, and shop rent, a healthy net margin is typically 6% to 10% of total turnover. If you are below 5%, you are likely subsidizing customers with your own time and capital.',
  },
  {
    question: 'How do I reduce Udhaar (credit) dependency in my retail shop in India?',
    answer:
      'To reduce credit dependency: (1) Offer a 1–2% UPI discount to incentivize immediate digital payment, (2) Set a strict monthly Udhaar limit per customer (e.g., ₹500 maximum), (3) Send a WhatsApp message on the 1st of every month with outstanding balances, and (4) Stop extending new credit to customers who haven\'t paid for 30+ days. Even reducing Udhaar from 30% to 10% of sales dramatically improves your daily cash position.',
  },
  {
    question: 'How to use the ₹100 Rupee Anatomy breakdown?',
    answer:
      'The ₹100 anatomy shows you where every hundred rupees of your revenue goes: e.g., ₹65 to product cost (COGS), ₹8 to rent, ₹6 to helper wages, ₹3 to electricity and packaging — leaving ₹18 as net profit. If your net profit slice is below ₹8 per ₹100, it means your operating expenses or purchase costs are too high relative to your selling price.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/real-profit-calculator', label: 'Monthly P&L & Profit Leak Finder', icon: TrendingUp },
  { href: '/business-os/break-even-calculator', label: 'Break-Even & Survival Calculator', icon: Target },
  { href: '/business-os/reconciliation', label: 'Day-End Cash Reconciliation', icon: Coins },
];

export default function DailyProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Daily Profit Calculator', item: 'https://Kagazo.in/business-os/daily-profit-calculator' },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your Daily Business Profit in India',
        description: 'Use this free calculator to see your real daily take-home profit after separating Cash, UPI, and Udhaar sales.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter your total sales for the day', text: 'Input your total revenue from all sales channels combined.' },
          { '@type': 'HowToStep', position: 2, name: 'Split by payment channel', text: 'Allocate how much was received in Cash, UPI (PhonePe/GPay), and Udhaar credit.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter your daily expenses', text: 'Add product cost (COGS), rent, helper wages, electricity, and packaging costs.' },
          { '@type': 'HowToStep', position: 4, name: 'View your ₹100 breakdown', text: 'See exactly how much of every ₹100 earned goes to costs vs your pocket, and your net take-home profit.' },
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
          { label: 'Daily Profit Calculator' },
        ]}
      />

      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          <span>Daily Cash Flow & Margin Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Daily Profit Calculator for Kirana Shops & Indian Retailers — Cash vs UPI vs Udhaar
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Enter your sales across Cash, UPI (PhonePe/GPay), and Udhaar credit. Calculate your net take-home profit today and uncover where every ₹100 of turnover goes.
        </p>
      </div>

      <DailyProfitEngine />

      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The Daily Cash Reconciliation Blueprint for Indian Retailers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How smart shopkeepers close their books every evening in under 2 minutes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Drawer vs UPI vs Khata</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always tally physical cash in your drawer separately from UPI settlements and Udhaar slips. Cash and UPI give you today&apos;s spending power, while credit requires active follow-ups.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Amortize Monthly Overheads Daily</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rent and electricity don&apos;t wait for month-end. Divide your monthly rent (e.g. ₹18,000) by 26 working days to allocate ₹692/day. This ensures you never face a month-end rent panic.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. The ₹100 Anatomy Target</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For every ₹100 entering your till, aim to preserve at least ₹15–₹20 as clean net profit. If your net profit drops below ₹8 per ₹100, analyze supplier discounts and packaging overheads.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Related Tools */}
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
