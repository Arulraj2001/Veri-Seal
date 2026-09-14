import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import ReconciliationEngine from '@/components/business-os/ReconciliationEngine';
import { Coins, HelpCircle, ChevronRight, TrendingUp, MessageSquare, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Day-End Cash & UPI Reconciliation Calculator India | Evening Shop Closing in 90 Seconds',
  description:
    'Free daily cash register closing and reconciliation tool for Indian kirana shops, supermarkets, and restaurants. Tally opening float, cash sales, petty expenses, and digital UPI soundbox payments to spot shortages immediately.',
  keywords: [
    'day end cash register closing calculator India',
    'UPI cash tally shopkeeper India',
    'daily cash drawer reconciliation online free',
    'evening cash tally sheet retail shop India',
    'how to reconcile cash drawer daily kirana',
    'PhonePe GPay soundbox reconciliation tool',
    'petty cash and drawer shortage tracker',
    'retail cash register closing template rupees',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/reconciliation',
  },
  openGraph: {
    title: 'Day-End Cash & UPI Reconciliation Calculator India | Evening Shop Closing in 90 Seconds',
    description:
      'Tally drawer cash against sales, verify PhonePe/GPay soundbox settlements, and spot register shortages in under 90 seconds.',
    url: 'https://Kagazo.in/business-os/reconciliation',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day-End Cash & UPI Reconciliation Calculator India | Shop Register Closing',
    description:
      'Eliminate evening cash shortages. Enter opening float, cash sales, petty cash payouts, and tally physical drawer currency.',
  },
};

const FAQS = [
  {
    question: 'How do I reconcile physical cash drawer vs UPI sales at the end of the day?',
    answer:
      'Use the 4-part formula: Expected Cash in Drawer = Morning Opening Float + Today’s Cash Inflow − Petty Cash Paid Out. Count your physical currency notes and coins. If your physical count matches the expected cash, your drawer is balanced. Compare your UPI merchant dashboard (PhonePe/Paytm/BharatPe) totals against your billing software to ensure zero digital discrepancies.',
  },
  {
    question: 'Why does my cash register show a shortage even when sales were high?',
    answer:
      'The top 3 causes of false register shortages in Indian retail are: (1) Unrecorded petty cash expenditures (e.g., paying ₹30 for tea, ₹120 for packaging tape, or ₹500 helper advance directly from the drawer without writing it down), (2) Giving incorrect change during peak rush hours, and (3) Customers promising to pay via UPI but walking away before the transaction cleared.',
  },
  {
    question: 'How do I protect my shop from fake UPI payment screenshot scams?',
    answer:
      'Never rely on a customer showing you their phone screen with a green "Payment Successful" banner. Fraudulent apps mimic PhonePe and Google Pay interfaces convincingly. Always verify through: (1) An active merchant soundbox announcing payment in real time, (2) Your own merchant app notification on your counter phone, or (3) Bank incoming credit SMS before handing over valuable merchandise.',
  },
  {
    question: 'What is an opening cash float and how much change should a retail store keep?',
    answer:
      'An opening float is the initial base amount of currency notes and coins (₹10, ₹20, ₹50, ₹100, ₹200) kept in the till every morning to provide change to early-bird customers. For a typical Indian neighborhood store, keeping a fixed float of ₹2,000 to ₹3,000 in smaller denominations ensures smooth transactions without depleting the till on the first ₹500 note.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/daily-profit-calculator', label: 'Daily Profit & Cash/UPI Ledger', icon: Coins },
  { href: '/business-os/payment-follow-up', label: 'Udhaar Payment Reminder Generator', icon: MessageSquare },
  { href: '/business-os/real-profit-calculator', label: 'Monthly P&L & Profit Leak Finder', icon: TrendingUp },
];

export default function ReconciliationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Day-End Cash Reconciliation', item: 'https://Kagazo.in/business-os/reconciliation' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Day-End Cash & UPI Register Reconciliation Tool',
        url: 'https://Kagazo.in/business-os/reconciliation',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Tallies physical drawer cash against expected cash sales and verifies digital UPI QR settlements for retail businesses in India.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'Day-End Cash & Register Reconciliation' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          <span>Evening Operational Discipline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Day-End Cash &amp; UPI Reconciliation Calculator India — Evening Closing in 90 Seconds
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Eliminate evening cash shortages. Enter your morning cash float, today&apos;s cash sales, petty expenses paid out, and your physical cash count. In 90 seconds, know if your register is balanced or missing money.
        </p>
      </div>

      {/* Interactive Engine */}
      <ReconciliationEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The 3 Most Common Sources of Register Leakage in India
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Where unrecorded rupees disappear between opening and closing the shutter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Unrecorded Petty Cash Outflows</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paying ₹40 for morning chai, ₹150 for courier tape, and ₹500 helper advance directly from the till without noting it down causes a false &ldquo;₹690 cash shortage&rdquo; at night. Always record petty expenses immediately.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Fake UPI Screenshot Scams</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customers occasionally show a pre-recorded video or fake UPI receipt app showing &ldquo;Payment Successful&rdquo; without the transaction actually going through. Always check for your merchant soundbox or banking SMS notification.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. The 90-Second Evening Habit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reconciling every single night catches mistakes while memories are fresh. If you wait until Saturday night to balance the week, finding where ₹1,200 went is virtually impossible.
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
