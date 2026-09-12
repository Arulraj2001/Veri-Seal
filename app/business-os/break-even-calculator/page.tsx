import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import BreakEvenEngine from '@/components/business-os/BreakEvenEngine';
import { Target, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Break-Even & Survival Volume Calculator for Indian SMBs | Kagazo',
  description:
    'Free break-even calculator in Indian Rupees. Calculate the exact monthly turnover, total orders, and daily order quota needed to cover rent, staff, and fixed bills.',
  keywords: [
    'break even calculator india rupees',
    'small business break even point calculation',
    'how to calculate break even retail shop',
    'contribution margin calculator ecommerce india',
    'daily orders required to break even',
  ],
  openGraph: {
    title: 'Break-Even & Survival Volume Calculator for Indian SMBs',
    description:
      'Know the exact day of the month and order volume after which your business stops paying bills and starts pocketing true profit.',
    url: 'https://Kagazo.org/business-os/break-even-calculator',
  },
};

export default function BreakEvenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Break-Even & Survival Volume Calculator',
    url: 'https://Kagazo.org/business-os/break-even-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Calculate contribution margins, break-even monthly revenue, and daily order targets for Indian small businesses.',
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'Break-Even & Survival Calculator' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
          <Target className="w-3.5 h-3.5 text-cyan-600" />
          <span>Survival Threshold Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Break-Even &amp; Survival Target Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Find out exactly how many orders and how much revenue you must generate every month just to avoid taking a loss. Once your fixed costs are cleared, every subsequent sale translates directly into owner profit.
        </p>
      </div>

      {/* Interactive Engine */}
      <BreakEvenEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The Mechanics of Contribution Margin
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding why every single order contributes to clearing your monthly landlord and salary dues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Contribution Margin per Unit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Selling Price minus Direct Costs (COGS + delivery + packaging). If you sell an item for ₹1,200 and it costs ₹680 to fulfill, your contribution margin is ₹520. That ₹520 goes directly toward paying off fixed rent.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Fixed Cost Absorption</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your fixed costs are ₹50,000 and your contribution margin is ₹500/order, you need exactly 100 orders to break even. Order #101 pays ₹0 toward rent and ₹500 straight into your pocket.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">The 26-Day Daily Pace</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Most Indian SMBs operate 26 days a month. Dividing your monthly order quota by 26 gives you a daily operational baseline. If you need 4 orders/day to survive, anything above 4 is pure profit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
