import { Metadata } from 'next';
import CashCalendarEngine from '@/components/business-os/CashCalendarEngine';
import { Calendar, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: '30-Day Business Cash Flow Calendar & Liquidity Forecaster | Kagazo',
  description:
    'Forecast your bank balance over the next 30 days. Model incoming customer receivables against shop rent, staff wages, GST taxes, and supplier cheques to detect cash shortages early.',
  keywords: [
    'cash flow calendar small business india',
    '30 day cash flow forecast template',
    'business bank balance projection tool',
    'rent salary gst cash outflow schedule',
    'working capital timeline calculator smb',
  ],
  openGraph: {
    title: '30-Day Business Cash Flow Calendar & Liquidity Forecaster',
    description:
      'Predict your bank balance on every upcoming date after rent, salaries, GST, and supplier dues clear.',
    url: 'https://Kagazo.org/business-os/cash-calendar',
  },
};

export default function CashCalendarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '30-Day Business Cash Flow Calendar & Liquidity Forecaster',
    url: 'https://Kagazo.org/business-os/cash-calendar',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Forecasts bank balance over 30 days by scheduling customer receivables against fixed operational outflows.',
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>Timeline Solvency Forecasting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          30-Day Business Cash Flow Calendar
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
    </div>
  );
}
