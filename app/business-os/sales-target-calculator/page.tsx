import { Metadata } from 'next';
import SalesTargetEngine from '@/components/business-os/SalesTargetEngine';
import { Trophy, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reverse Sales Target Calculator (Pocket ₹1 Lakh Net Profit) | VeriSeal',
  description:
    'Reverse-engineer your monthly turnover and daily order quotas. Set your desired personal salary (e.g. ₹1 Lakh) and let math calculate required daily sales after all costs.',
  keywords: [
    'how to make 1 lakh profit small business india',
    'sales target calculator reverse engineered',
    'daily sales quota calculator retail',
    'monthly turnover needed for 1 lakh income',
    'small business revenue target formula',
  ],
  openGraph: {
    title: 'Reverse Sales Target Calculator | Pocket ₹1 Lakh Net Profit',
    description:
      'Start from your dream take-home pay and reverse-engineer your required daily sales pace and order volume.',
    url: 'https://veriseal.org/business-os/sales-target-calculator',
  },
};

export default function SalesTargetPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse Sales Target Calculator',
    url: 'https://veriseal.org/business-os/sales-target-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Reverse-engineers required daily and monthly revenue to pocket a designated clean net profit after overheads.',
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-emerald-600" />
          <span>Goal-Oriented Revenue Modeling</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Reverse-Engineered Net Profit Targeter
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Most business plans set arbitrary sales targets. Instead, decide how much personal income you want in your bank account every month (₹1 Lakh, ₹2 Lakh, or more) and calculate your daily order quota.
        </p>
      </div>

      {/* Interactive Engine */}
      <SalesTargetEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            How to Hit ₹1 Lakh / Month Clean In-Pocket Profit
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The practical mathematics behind Indian micro-enterprise profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Step 1: The Total Margin Sum</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your fixed expenses (rent + staff) are ₹45,000 and you want ₹1,00,000 salary, your business needs to generate ₹1,45,000 in gross margin every single month.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Step 2: Margin Fraction Calculation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your product cost is 50%, you need ₹1,45,000 / 0.50 = ₹2,90,000 in gross monthly turnover. Dividing by an average order value of ₹1,400 yields 207 orders/month.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Step 3: The 8-Order Daily Sprint</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Across 26 working days, 207 orders equals just 8 orders per day! Framing your goal as &ldquo;8 orders a day&rdquo; makes earning ₹1 Lakh net feel actionable and achievable for your team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
