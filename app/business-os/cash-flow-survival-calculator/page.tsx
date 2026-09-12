import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import CashFlowSurvivalEngine from '@/components/business-os/CashFlowSurvivalEngine';
import { Clock, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cash-Flow Survival Runway Calculator for Small Business | Kagazo',
  description:
    'Calculate your exact cash runway in days and months. Uncover when your bank balance will hit zero if collections or sales slow down.',
  keywords: [
    'cash flow runway calculator small business',
    'burn rate calculator smb india',
    'days of cash remaining formula',
    'working capital survival calculator',
    'small business liquidity crisis calculator',
  ],
  openGraph: {
    title: 'Cash-Flow Survival Runway Calculator for Small Business',
    description:
      'Profit on paper does not pay suppliers. Calculate your exact days of cash buffer before default.',
    url: 'https://Kagazo.org/business-os/cash-flow-survival-calculator',
  },
};

export default function CashFlowSurvivalPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cash-Flow Survival Runway Calculator',
    url: 'https://Kagazo.org/business-os/cash-flow-survival-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Calculates available liquidity, net monthly cash burn, and exact days until a cash crunch for small businesses.',
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'Cash-Flow Survival Calculator' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-orange-600" />
          <span>Liquidity &amp; Solvency Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Cash-Flow Survival Runway Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          A profitable business can still go bankrupt if cash dries up before customer payments arrive. Track your available bank balance, pending 30-day Udhaar receivables, and monthly vendor outflows to know your exact safety runway.
        </p>
      </div>

      {/* Interactive Engine */}
      <CashFlowSurvivalEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Why Working Capital Kills More Businesses Than Lack of Profit
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The difference between accounting profit and real cash solvency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">The Udhaar Cash Gap</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When customers owe you ₹50,000 in credit, your books show revenue, but your bank balance is ₹0. If your landlord demands rent tomorrow, paper profits won&apos;t clear the cheque.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Over-Purchasing Dead Inventory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Buying ₹1,00,000 worth of slow-moving stock because the wholesaler gave a 5% bulk discount locks your precious liquid cash on a wooden shelf for months. Always preserve cash over marginal volume discounts.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">The 90-Day Safety Rule</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every healthy Indian enterprise should maintain at least 60 to 90 days of fixed operating expenses in a liquid savings account or sweep-in fixed deposit to weather seasonal dips and festive delays.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
