import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import DeadStockEngine from '@/components/business-os/DeadStockEngine';
import { Archive, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dead Stock & Trapped Working Capital Auditor for Retailers | Kagazo',
  description:
    'Calculate how much cash is trapped in unsold inventory sitting in your godown or shop for >90 days. Get actionable clearance liquidation pricing to unlock working capital today.',
  keywords: [
    'dead stock calculator retail india',
    'trapped working capital inventory formula',
    'how to liquidate dead stock retail shop',
    'slow moving inventory audit tool',
    'stock turnover ratio calculator smb',
  ],
  openGraph: {
    title: 'Dead Stock & Trapped Working Capital Auditor for Retailers',
    description:
      'Unsold stock is frozen cash. Calculate your total trapped money and see flash liquidation pricing to unlock bank balance today.',
    url: 'https://Kagazo.org/business-os/inventory-profit-calculator',
  },
};

export default function InventoryProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Dead Stock & Trapped Working Capital Auditor',
    url: 'https://Kagazo.org/business-os/inventory-profit-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Audit slow-moving and stale inventory, calculate total trapped working capital, and generate clearance liquidation pricing.',
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Business OS', href: '/business-os' },
          { label: 'Dead Stock & Capital Auditor' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <Archive className="w-3.5 h-3.5 text-amber-600" />
          <span>Inventory Solvency Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Dead Stock &amp; Trapped Working Capital Auditor
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Stock that has not moved for 90 days is decaying in value, taking up shelf space, and preventing you from buying new fast-moving items. Audit your stale SKUs and calculate how much liquid cash you can unlock this week.
        </p>
      </div>

      {/* Interactive Engine */}
      <DeadStockEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The Psychology of Letting Go of Dead Inventory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Why Indian shopkeepers hold onto old stock for years and why liquidating at cost is a win.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Sunk Cost Fallacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Business owners hate selling an item for ₹500 if they bought it for ₹500. But holding it for 12 months costs shelf rent, dust damage, and interest on working capital loans. Cash in hand today is worth more than a dream margin next year.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. The Reinvestment Velocity Cycle</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you liquidate ₹50,000 of dead stock at cost, you have ₹50,000 liquid cash today. Reinvesting that ₹50,000 into high-demand fast-moving goods that turn over 4 times a year generates ₹30,000 in clean profit!
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Promotional Free Gift Leverage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of slashing prices openly, advertise: &ldquo;Buy 2 items, get a Free Handcrafted Planter worth ₹350!&rdquo;. You delight customers and clear stale inventory without damaging your brand&apos;s premium reputation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
