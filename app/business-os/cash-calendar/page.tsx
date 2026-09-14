import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import CashCalendarEngine from '@/components/business-os/CashCalendarEngine';
import { Calendar, HelpCircle, ChevronRight, Clock, Coins, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: '30-Day Business Cash Flow Calendar India | Predict Bank Balance & Crunch Days',
  description:
    'Free 30-day cash flow forecasting calendar for Indian businesses. Schedule customer receivables against shop rent, staff salaries, GST 3B dues on the 20th, and vendor payments to prevent bank overdrafts.',
  keywords: [
    '30 day cash flow forecast calculator India',
    'business cash crunch day predictor',
    'cash flow calendar small business India',
    'GST 3B tax payment schedule cash flow',
    'rent salary GST cash outflow planner',
    'bank balance projection tool Indian SMB',
    'working capital timeline calculator',
    'kirana shop monthly cash flow planner',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/cash-calendar',
  },
  openGraph: {
    title: '30-Day Business Cash Flow Calendar India | Predict Bank Balance & Crunch Days',
    description:
      'Predict your bank balance on every upcoming day after shop rent, staff salaries, GST 3B, and vendor cheques clear.',
    url: 'https://Kagazo.in/business-os/cash-calendar',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '30-Day Business Cash Flow Calendar India | Liquidity Forecaster',
    description:
      'Map upcoming customer inflows against fixed vendor outflows to detect cash crunch dates up to 30 days ahead.',
  },
};

const FAQS = [
  {
    question: 'Why do Indian businesses face cash crunches around the 20th of every month?',
    answer:
      'In India, the 20th of each month is the statutory deadline for filing GSTR-3B and paying monthly GST dues. Because businesses also pay rent between the 1st and 5th, and employee salaries between the 7th and 10th, the 20th GST payment arrives right when current account balances are at their lowest point. Planning for GST as a protected reserve prevents tax payment defaults.',
  },
  {
    question: 'How should I structure my monthly rent and salary payment dates to avoid liquidity bottlenecks?',
    answer:
      'Instead of concentrating all outflows in the first 7 days: (1) Pay shop rent on the 1st, (2) Schedule staff salaries on the 7th or 10th (standard under the Payment of Wages Act for businesses with <1,000 workers), and (3) Schedule major distributor payments on the 15th and 25th. Spreading payments into bi-weekly waves ensures daily sales can continuously replenish working capital.',
  },
  {
    question: 'What happens when customer payments arrive 10 days later than scheduled?',
    answer:
      'A 10-day payment delay from a major client creates an artificial "cash hole." While your business remains solvent on paper, your bank balance drops below zero, triggering bounced cheque penalties, loss of supplier credit, and panic borrowing at 24%+ interest. A 30-day cash calendar highlights these danger dates before cheques bounce.',
  },
  {
    question: 'How much minimum bank balance buffer should an Indian enterprise keep?',
    answer:
      'A rule of thumb for Indian MSMEs is keeping a liquid buffer equal to at least 15–20 days of fixed operational expenses (rent + utility bills + core salaries) untouched in your current account. This buffer absorbs irregular UPI payment settlement holidays and delayed customer clearances.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/cash-flow-survival-calculator', label: 'Cash Flow Survival Runway', icon: Clock },
  { href: '/business-os/reconciliation', label: 'Day-End Cash & UPI Reconciliation', icon: Coins },
  { href: '/business-os/employee-cost-calculator', label: 'Employee True Cost Calculator', icon: Users },
];

export default function CashCalendarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: '30-Day Cash Flow Calendar', item: 'https://Kagazo.in/business-os/cash-calendar' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: '30-Day Business Cash Flow Calendar & Liquidity Forecaster',
        url: 'https://Kagazo.in/business-os/cash-calendar',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Forecasts bank balance over 30 days by scheduling customer receivables against fixed operational outflows in India.',
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
          { label: '30-Day Cash Flow Calendar' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>Timeline Solvency Forecasting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          30-Day Business Cash Flow Calendar India — Predict Bank Balance &amp; Crunch Days
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          A profitable business can still bounce a cheque if major bills fall due before customer payments arrive. Input your current bank balance and upcoming dues to foresee the exact date of your lowest liquidity cushion.
        </p>
      </div>

      {/* Interactive Engine */}
      <CashCalendarEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The Indian Business Liquidity Calendar Rhythm
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How seasoned entrepreneurs structure monthly payables to avoid crisis weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Stagger Rent vs Staff Wages</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paying rent on the 1st and salaries on the 5th creates a double blow in the first week. Whenever possible, negotiate rent payment on the 10th or staff salaries on the 7th to distribute cash outflows evenly.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. The 20th GST Tax Wall</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every month by the 20th, GST 3B taxes must be settled in cash. Never treat collected GST as your own spending money. Allocate a separate sub-account or sweep-in fixed deposit for tax obligations.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Synchronize Wholesaler Invoices</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always negotiate 14 to 21-day credit terms with primary distributors. Paying cash on delivery for raw inventory when your own customers pay on 10-day credit produces an unsustainable liquidity deficit.
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
