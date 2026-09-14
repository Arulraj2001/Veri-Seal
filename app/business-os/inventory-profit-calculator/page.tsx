import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import DeadStockEngine from '@/components/business-os/DeadStockEngine';
import { Archive, HelpCircle, ChevronRight, Percent, Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dead Stock & Slow Inventory Cost Calculator India | Unlock Trapped Working Capital',
  description:
    'Free dead stock and trapped capital calculator for Indian retailers, wholesalers, and e-commerce sellers. Audit stale SKUs >90 days, calculate holding costs and interest losses, and get flash liquidation discount pricing.',
  keywords: [
    'dead stock calculator India',
    'slow moving inventory cost calculator',
    'trapped working capital inventory formula India',
    'how to liquidate dead stock retail shop India',
    'inventory holding cost calculator rupees',
    'stock turnover ratio calculator kirana India',
    'clearance sale pricing calculator SMB',
    'godown dead inventory audit tool',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/inventory-profit-calculator',
  },
  openGraph: {
    title: 'Dead Stock & Slow Inventory Cost Calculator India | Unlock Trapped Working Capital',
    description:
      'Unsold stock is frozen cash. Calculate your total trapped capital, carrying costs, and clearance liquidation pricing to unlock bank balance today.',
    url: 'https://Kagazo.in/business-os/inventory-profit-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dead Stock & Trapped Capital Calculator India | Retail Inventory Auditor',
    description:
      'Discover how much working capital is locked in unsold stock and generate liquidation pricing strategies.',
  },
};

const FAQS = [
  {
    question: 'What qualifies as "dead stock" in Indian retail and wholesale businesses?',
    answer:
      'In Indian retail, any SKU that has remained on your shelves or in your godown for over 90–120 days without a single unit sold is classified as slow-moving or dead stock. In fast-fashion apparel, cosmetics, and seasonal goods, items past 60 days without velocity often begin losing value permanently.',
  },
  {
    question: 'How much does holding unsold inventory actually cost an Indian shopkeeper?',
    answer:
      'Inventory carrying costs in India typically range from 20% to 30% of product value per year. This includes: (1) Working capital interest/opportunity cost (10%–14% per annum), (2) Commercial storage/shelf rent (5%–8%), and (3) Physical damage, expiry, dust staining, or obsolescence (5%–10%). Holding ₹2,00,000 in dead stock for a year burns ₹40,000 to ₹60,000 in invisible losses!',
  },
  {
    question: 'Why is selling dead stock at purchase cost (zero profit) actually a financial win?',
    answer:
      'Because of the "Velocity of Capital." If you liquidate ₹50,000 of dead stock at cost (break-even), you instantly receive ₹50,000 in liquid bank balance. When reinvested into fast-moving inventory with a 25% margin that turns over 4 times a year, that same ₹50,000 generates ₹50,000 in clean new profit within 12 months rather than sitting idle gathering dust.',
  },
  {
    question: 'What are the best channels in India to liquidate slow-moving inventory quickly?',
    answer:
      '(1) Bundle slow items with bestsellers as a free gift ("Buy Kurti, get Dupatta free"), (2) Run an end-of-season flash sale with a "Flat 50% Off Clearance" banner on WhatsApp and Instagram, (3) Sell bulk lots to local discount liquidators or flea markets at cost price, or (4) Use dead stock as bonus gifts for customer reviews or loyalty point redemptions.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/discount-profit-calculator', label: 'Discount Profit Crash Calculator', icon: Percent },
  { href: '/business-os/cash-flow-survival-calculator', label: 'Cash Flow Survival Runway', icon: Clock },
  { href: '/business-os/product-pricing-calculator', label: 'Product Pricing & Margin Calculator', icon: Tag },
];

export default function InventoryProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Dead Stock & Capital Auditor', item: 'https://Kagazo.in/business-os/inventory-profit-calculator' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Dead Stock & Trapped Working Capital Auditor',
        url: 'https://Kagazo.in/business-os/inventory-profit-calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Audit slow-moving and stale inventory, calculate total trapped working capital, and generate clearance liquidation pricing in India.',
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
          { label: 'Dead Stock & Capital Auditor' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <Archive className="w-3.5 h-3.5 text-amber-600" />
          <span>Inventory Solvency Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Dead Stock &amp; Slow Inventory Cost Calculator India — Unlock Trapped Capital
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
