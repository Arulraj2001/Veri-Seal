import { Metadata } from 'next';
import AiAdvisorEngine from '@/components/business-os/AiAdvisorEngine';
import { Sparkles, HelpCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Business Diagnostic & Margin Advisor for Indian SMBs | VeriSeal',
  description:
    'Free heuristic financial diagnostic advisor for Indian small business owners. Diagnoses root causes of cash crunches, high marketplace cuts, and slow inventory, with 3 high-ROI weekly action items.',
  keywords: [
    'ai business advisor small business india',
    'financial health diagnostic tool smb',
    'how to fix declining retail profit margin',
    'kirana shop business advice free',
    'ecommerce profit margin improvement strategy',
  ],
  openGraph: {
    title: 'AI Business Diagnostic & Margin Advisor for Indian SMBs',
    description:
      'Pinpoint the exact operational leaks dragging your profit down and get 3 high-ROI fixes for this week.',
    url: 'https://veriseal.org/business-os/ai-advisor',
  },
};

export default function AiAdvisorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Business Diagnostic & Margin Advisor',
    url: 'https://veriseal.org/business-os/ai-advisor',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Heuristic business diagnostic advisor analyzing turnover, margins, and operational bottlenecks for Indian small businesses.',
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
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Heuristic Profit Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          AI Business Diagnostic &amp; Margin Advisor
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          When profits drop or cash gets tight, traditional accounting reports only state the numbers without explaining why. Input your monthly turnover and primary business headache to diagnose root causes and receive 3 tactical levers to execute this week.
        </p>
      </div>

      {/* Interactive Engine */}
      <AiAdvisorEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The 3 High-Leverage Principles for Indian Micro-Enterprises
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Focusing on the 20% of decisions that produce 80% of your bank balance increase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Protect Unit Economics First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never scale an order that loses money. If fulfilling a product earns you ₹40 while carrying ₹50 of risk (returns, customer support, packaging), growing from 10 to 100 orders per day only accelerates your insolvency.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Customer Retention Beats Paid Ads</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Acquiring a new buyer via Meta/Google ads costs ₹200–₹400 in India. A repeat customer ordering through a VIP WhatsApp group costs ₹0. Re-engaging your existing customer base every 30 days is the fastest way to double net profits.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Speed of Cash Conversion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The secret of wealthy kirana and retail operators isn&apos;t massive percentage margins—it&apos;s fast cash turnover. Turning over your working capital 15 times a year at 12% margin produces 3x more wealth than turning it over 3 times at 30%.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
