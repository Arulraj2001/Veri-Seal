import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import AiAdvisorEngine from '@/components/business-os/AiAdvisorEngine';
import { Sparkles, HelpCircle, ChevronRight, TrendingUp, Target, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Business Diagnostic & Advisor for Indian SMBs | 0–100 Health Score',
  description:
    'Free AI financial health diagnostic and strategic advisor for Indian small business owners. Diagnoses root causes of cash crunches, Amazon/Flipkart margin leaks, and dead stock, with 3 high-ROI tactical weekly action items.',
  keywords: [
    'AI business advisor Indian SMB',
    'business health score calculator India',
    'small business financial health diagnostic tool',
    'how to fix declining retail profit margin India',
    'kirana shop business advice free',
    'ecommerce profit margin improvement advisor',
    'heuristic business diagnostic tool rupees',
    'SMB working capital optimization guide',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/ai-advisor',
  },
  openGraph: {
    title: 'AI Business Diagnostic & Advisor for Indian SMBs | 0–100 Health Score',
    description:
      'Pinpoint the exact operational leaks dragging your business down and receive 3 high-ROI tactical fixes for this week.',
    url: 'https://Kagazo.in/business-os/ai-advisor',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Business Diagnostic & Advisor for Indian SMBs | Kagazo',
    description:
      'Diagnose cash crunches, marketplace fees, and inventory traps with an instant 0–100 business health score.',
  },
};

const FAQS = [
  {
    question: 'How does the AI Business Diagnostic calculate my business health score?',
    answer:
      'The diagnostic uses a heuristic rules-engine calibrated specifically for the Indian MSME economy. It evaluates four core pillars: (1) Gross and Net Profit Margin sufficiency against your business category baseline, (2) Cash runway and working capital liquidity cushion, (3) Customer credit (Udhaar) and receivables risk, and (4) Marketplace or shipping cost leakages, producing a synthesized 0–100 operational resilience score.',
  },
  {
    question: 'What are the most common operational profit leaks discovered by this tool?',
    answer:
      'Across Indian small businesses, the top 4 leaks are: (1) Uncalculated marketplace deductions (closing fees, referral fees, pick & pack) taking 30%+ of selling price, (2) High RTO (Return to Origin) rates on Cash on Delivery orders wiping out delivery margins, (3) Uncollected customer Udhaar exceeding 30 days, and (4) Stale dead stock trapping working capital on godown shelves.',
  },
  {
    question: 'Why does customer retention beat paid social media advertising for Indian SMBs?',
    answer:
      'Customer Acquisition Cost (CAC) on Meta and Google has tripled across India over the past three years, with new customer acquisition often costing ₹250 to ₹500 per order. In contrast, broadcasting special offers to past buyers via a VIP WhatsApp Community or SMS costs almost zero. Re-engaging your existing customer base every 30–45 days is the single most effective way to double your net take-home profit without increasing ad spend.',
  },
  {
    question: 'Is my financial data uploaded or stored anywhere when using this AI advisor?',
    answer:
      'No. The diagnostic algorithm executes 100% client-side inside your browser session. None of your revenue figures, margins, or business challenges are ever sent to a remote cloud server or stored in a persistent database, guaranteeing complete commercial confidentiality.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/real-profit-calculator', label: 'Monthly P&L & Profit Leak Finder', icon: TrendingUp },
  { href: '/business-os/break-even-calculator', label: 'Break-Even & Survival Calculator', icon: Target },
  { href: '/business-os/cash-flow-survival-calculator', label: 'Cash Flow Survival Runway', icon: Clock },
];

export default function AiAdvisorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'AI Business Diagnostic & Advisor', item: 'https://Kagazo.in/business-os/ai-advisor' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'AI Business Diagnostic & Margin Advisor',
        url: 'https://Kagazo.in/business-os/ai-advisor',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Heuristic business diagnostic advisor analyzing turnover, margins, and operational bottlenecks for Indian small businesses.',
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
          { label: 'AI Business Diagnostic & Advisor' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Heuristic Profit Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          AI Business Diagnostic &amp; Advisor for Indian SMBs — 0–100 Health Score
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
