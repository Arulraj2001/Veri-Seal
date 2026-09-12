import { Metadata } from 'next';
import Link from 'next/link';
import {
  Coins,
  TrendingUp,
  Tag,
  Percent,
  Target,
  Trophy,
  Clock,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Building,
  HelpCircle,
  Smartphone,
  CreditCard,
  ShoppingBag,
  Archive,
  Calendar,
  Users,
} from 'lucide-react';
import BusinessHealthScoreCard from '@/components/business-os/BusinessHealthScoreCard';

export const metadata: Metadata = {
  title: 'Small Business Cash-Flow & Profitability OS for Indian SMBs | Kagazo',
  description:
    'Free, zero-login cash-flow and profit intelligence for Indian small businesses, retail shops, Instagram/WhatsApp sellers, home bakeries, and freelancers. Answer: Am I actually making money?',
  keywords: [
    'small business profit calculator india',
    'kirana shop daily profit calculator',
    'instagram seller profit margin calculator',
    'break even calculator indian rupees',
    'ecommerce rto cost calculator india',
    'whatsapp quote generator free',
    'udhaar reminder message generator',
    'small business cash flow calendar',
  ],
  openGraph: {
    title: 'Small Business Cash-Flow & Profitability OS for Indian SMBs',
    description:
      'Answer the #1 small business question: Am I actually making money, and where is my money going? 100% Free, zero-login tools with authentic Indian marketplace slabs.',
    type: 'website',
    url: 'https://Kagazo.org/business-os',
  },
};

const PROFIT_INTELLIGENCE_TOOLS = [
  {
    href: '/business-os/daily-profit-calculator',
    title: 'Daily Profit & Rupee Breakdown',
    icon: Coins,
    badge: 'Flagship Tool',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description:
      'Enter today’s sales across Cash, UPI, and Udhaar credit. See your exact net take-home cash and where every ₹100 earned went.',
    metrics: ['Cash vs UPI vs Udhaar', '₹100 Stack Anatomy', 'Daily Margin %'],
  },
  {
    href: '/business-os/real-profit-calculator',
    title: 'Monthly P&L & Profit Leak Finder',
    icon: TrendingUp,
    badge: 'Leak Diagnostics',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description:
      'Stop confusing top-line revenue with true profit. Autodetects hidden bleeds across marketplace commissions, courier freight, rent, and ad spend.',
    metrics: ['Real Net Profit', 'Annual Run Rate', 'Top 4 Profit Bleeds'],
  },
  {
    href: '/business-os/product-pricing-calculator',
    title: 'Product Pricing with Marketplace Slabs',
    icon: Tag,
    badge: 'Amazon / Flipkart / Meesho',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description:
      'Never underprice on e-commerce again. Reverse-engineers selling prices with authentic Indian referral fees, closing fees, GST, and gateway cuts.',
    metrics: ['Auto Fee Slabs', 'Target In-Hand Margin', 'Shiprocket Ready'],
  },
  {
    href: '/business-os/discount-profit-calculator',
    title: 'Discount Profit Crash Simulator',
    icon: Percent,
    badge: 'Eye-Opener',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description:
      'Think a 20% discount costs 20%? See how it destroys over 50% of your real profit and forces you to sell 2x volume just to stay even.',
    metrics: ['Profit Erosion %', 'Required Volume Multiplier', 'Unit Margin Shock'],
  },
  {
    href: '/business-os/break-even-calculator',
    title: 'Break-Even & Survival Quota',
    icon: Target,
    badge: 'Zero-Risk Threshold',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    description:
      'Calculate the exact monthly turnover and daily orders needed just to pay your rent, staff salaries, electricity, and loan EMIs.',
    metrics: ['Daily Order Quota', 'Monthly Turnover Target', 'Contribution Margin'],
  },
  {
    href: '/business-os/sales-target-calculator',
    title: 'Sales Targeter (Pocket ₹1 Lakh Net)',
    icon: Trophy,
    badge: 'Goal Planner',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description:
      'Reverse-engineers your daily sales and order volume from your personal dream salary after deducting all product costs and overheads.',
    metrics: ['Custom Take-Home Pay', 'Daily Order Pace', '26-Day Quota'],
  },
  {
    href: '/business-os/cash-flow-survival-calculator',
    title: 'Cash-Flow Survival Runway',
    icon: Clock,
    badge: 'Crisis Prevention',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
    description:
      'Profit on paper doesn’t pay suppliers. Calculate the exact number of days before your bank balance runs dry if receivables stall.',
    metrics: ['Days Until Cash Crunch', 'Receivables Liquidity', 'Survival Status'],
  },
  {
    href: '/business-os/delivery-profit-calculator',
    title: 'Courier Delivery & RTO Bleed Sizer',
    icon: Truck,
    badge: 'E-Commerce Reality',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    description:
      'Cash on Delivery (COD) returns ruin margins. Calculate the hidden RTO tax per delivered order and discover how to slash returns by 50%.',
    metrics: ['Hidden RTO Tax / Order', 'True Delivered Profit', 'Prepaid UPI Gains'],
  },
];

const OPERATIONAL_TOOLS = [
  {
    href: '/business-os/quote-generator',
    title: '1-Click WhatsApp Quote Generator',
    icon: Smartphone,
    badge: 'Chat Commerce',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description:
      'Generate professional estimates for WhatsApp with itemized line items, delivery, discount, and direct UPI payment ID.',
    metrics: ['1-Click WhatsApp Share', 'UPI QR Ready', '7-Day Validity'],
  },
  {
    href: '/business-os/payment-follow-up',
    title: 'Udhaar Ledger & Payment Reminders',
    icon: CreditCard,
    badge: 'Cash Recovery',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description:
      'Never feel awkward collecting pending money. Select from 4 tones (Friendly, Formal, Firm, Urgent) and dispatch reminders in 1 click.',
    metrics: ['4 Polite Tones', 'Direct UPI Link', 'Overdue Days Tracker'],
  },
  {
    href: '/business-os/order-manager',
    title: 'WhatsApp & DM Order Manager',
    icon: ShoppingBag,
    badge: 'Order Log',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description:
      'Log customer chat orders, track prepaid vs COD delivery status, and calculate live gross profit on every sale.',
    metrics: ['Live Profit / Order', 'COD Transit Tracker', '100% In-Browser'],
  },
  {
    href: '/business-os/inventory-profit-calculator',
    title: 'Dead Stock & Capital Auditor',
    icon: Archive,
    badge: 'Frozen Cash',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description:
      'Uncover money trapped in stock not sold for >90 days. Get actionable flash liquidation pricing to unlock working capital.',
    metrics: ['Trapped Capital ₹', 'Flash Sale Pricing', 'Storage Age Audit'],
  },
  {
    href: '/business-os/cash-calendar',
    title: '30-Day Business Cash Calendar',
    icon: Calendar,
    badge: 'Forecaster',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description:
      'Forecast your bank balance over the next 30 days after rent, staff wages, GST taxes, and supplier cheques clear.',
    metrics: ['Crunch Day Alert', 'Payable Timeline', 'Balance Trajectory'],
  },
  {
    href: '/business-os/reconciliation',
    title: 'Day-End Cash & UPI Reconciliation',
    icon: Coins,
    badge: 'Register Closing',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description:
      'Close your shop register in 90 seconds. Tally drawer cash count against expected sales and verify digital PhonePe/GPay settlements.',
    metrics: ['Cash Shortage Alert', 'Fake UPI Detection', 'Closing Summary'],
  },
  {
    href: '/business-os/employee-cost-calculator',
    title: 'Employee True Cost & Hourly Rate',
    icon: Users,
    badge: 'Payroll Reality',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    description:
      'A ₹18k salary costs ~₹23k in real cash. Factor bonuses, daily tea allowances, uniform wear, and PF/ESI to calculate true hourly costs.',
    metrics: ['Multiplier Ratio', 'Productive Hourly Rate', 'Full-time vs Freelance'],
  },
  {
    href: '/business-os/minimum-order-calculator',
    title: 'Minimum Order Value (MOV) Sizer',
    icon: Truck,
    badge: 'Free Shipping',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description:
      'Stop losing money on small ₹299 free delivery orders. Calculate your exact profitable minimum cart threshold.',
    metrics: ['Break-Even Threshold', 'Recommended Free Delivery', 'Test Cart Simulator'],
  },
  {
    href: '/business-os/ai-advisor',
    title: 'AI Business Diagnostic & Advisor',
    icon: Sparkles,
    badge: 'Strategic AI',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description:
      'Heuristic financial intelligence pinpointing root causes of declining margins, with 3 high-ROI weekly action items.',
    metrics: ['Root Cause Diagnostic', 'Weekly Levers', 'Annual Impact ₹'],
  },
];

const FAQS = [
  {
    q: 'Why do Indian small businesses confuse turnover with real profit?',
    a: 'Most small business owners look at their UPI collections or bank credits and assume high sales equal high profits. In reality, product purchase costs (COGS), marketplace commission fees (12–18%), packaging, 500g shipping freight, shop rent, staff wages, and electricity quietly eat up 80%–90% of revenue. Kagazo breaks down every single rupee so you know your true take-home pay.',
  },
  {
    q: 'How does the 0–100 Business Health Score work?',
    a: 'Our proprietary algorithm evaluates your business across 5 critical pillars: Gross Margin Safety (>=45%), Net Margin Buffer (>=18%), Udhaar / Credit Dependency (<20% of sales), Operating Expense Burden (<25% of turnover), and Cash Runway (>90 days). It awards a score from 0 to 100 and outputs the 3 highest-priority fixes for this week.',
  },
  {
    q: 'Why is there no login or phone number required?',
    a: 'Unlike Khatabook or Vyapar which lock you behind mobile OTP walls and app downloads, Kagazo is 100% web-first and runs all financial formulas client-side inside your browser. Your sensitive daily sales numbers never touch our servers.',
  },
  {
    q: 'How do the WhatsApp tools work?',
    a: 'Both the WhatsApp Quote Generator and Udhaar Reminder tool run directly in your browser. When you click "Send via WhatsApp", they automatically format your text and open official WhatsApp Web or the WhatsApp mobile app using secure WhatsApp Deep Links (`https://wa.me/...`). Zero third-party API tokens or access permissions required.',
  },
];

export default function BusinessOsHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Small Business Cash-Flow & Profitability OS',
    url: 'https://Kagazo.org/business-os',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All modern web browsers',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Free, zero-login cash-flow and profit intelligence for Indian small businesses, retail shops, Instagram/WhatsApp sellers, home bakeries, and freelancers.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/90 text-indigo-800 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Small Business Cash-Flow &amp; Profitability OS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          &ldquo;Am I Actually Making Money, and Where is My Money Going?&rdquo;
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
          Tailored for Indian retail kirana shops, Instagram &amp; WhatsApp sellers, home bakeries, freelancers, and local service businesses. Zero complicated accounting jargon. 100% free with zero login.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% In-Browser Privacy
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Zero Mobile OTP / App Wall
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            17 Free Web Tools
          </span>
        </div>
      </div>

      {/* Interactive Business Health Score Hero Card */}
      <section aria-label="Business Health Diagnostic" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Live Business Health &amp; Leak Score (0–100)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Instant multi-pillar diagnostic with prioritized action items for this week.
            </p>
          </div>
          <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 hidden sm:inline-block">
            Auto-Scored
          </span>
        </div>

        <BusinessHealthScoreCard />
      </section>

      {/* Section 1: Operational SMB Utilities & WhatsApp Tools */}
      <section aria-label="Operational Utilities" className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-700 uppercase tracking-wider mb-1">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phase 2 Operational OS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Operational Utilities &amp; WhatsApp Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Daily habit loops: generate estimates, send polite payment reminders, track DM orders, and forecast cash flow.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">9 Daily Utilities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPERATIONAL_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${tool.badgeColor}`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {tool.metrics.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600 pt-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Open Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Section 2: 8 Profit Intelligence Engines */}
      <section aria-label="Profit Intelligence Tools" className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase tracking-wider mb-1">
              <Coins className="w-3.5 h-3.5" />
              <span>Phase 1 Core Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Profit Intelligence &amp; Margin Sizing
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Reverse-engineer your pricing, stop profit leaks, protect margins against discounts, and size delivery RTO losses.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">8 Sizing Engines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFIT_INTELLIGENCE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${tool.badgeColor}`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {tool.metrics.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600 pt-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Open Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Target Indian Business Profiles Section */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Built for Real Indian Small Business Realities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standard Western SaaS tools assume 100% card payments and next-day deposits. We build for the Indian SMB operating reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-4.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900">Retail Kirana &amp; General Stores</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track Cash in drawer vs PhonePe/GPay QR vs local customer Udhaar ledger. Know your actual net margin after helper daily wages and shelf rent.
            </p>
          </div>

          <div className="p-4.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900">Instagram &amp; WhatsApp D2C Sellers</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Model 500g shipping freight, bubble packaging, and 25% COD Return to Origin (RTO) losses before quoting prices in direct messages.
            </p>
          </div>

          <div className="p-4.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900">Home Bakeries &amp; Cloud Kitchens</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Factor electricity bursts for commercial ovens, customized cake packaging, delivery rider charges, and raw ingredient price spikes.
            </p>
          </div>

          <div className="p-4.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900">Freelancers &amp; Boutique Agencies</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Know your real billable day rate after accounting for unpaid client payment delays, TDS deductions, and software subscriptions.
            </p>
          </div>

          <div className="p-4.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900">Salons, Spas &amp; Beauty Parlours</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate service margins after product consumption (bleach, wax, shampoo), water heaters, AC power bills, and staff commission splits.
            </p>
          </div>

          <div className="p-4.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900">Mobile &amp; Electronics Repair</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate true repair profit per screen or battery replacement after deducting spare part transit, warranty replacements, and shop rent.
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQs */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Common financial and cash-flow questions answered for Indian entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
              <h3 className="text-sm font-black text-slate-900">
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
