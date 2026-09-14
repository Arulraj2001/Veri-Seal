import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import CashFlowSurvivalEngine from '@/components/business-os/CashFlowSurvivalEngine';
import { Clock, HelpCircle, ChevronRight, Calendar, Target, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cash Flow Survival Runway Calculator India | How Many Days Until Your Business Runs Out of Cash',
  description:
    'Free cash runway calculator for Indian SMBs, kirana stores, and startups. Enter current bank balance, pending Udhaar receivables, and monthly burn to calculate exact days of cash buffer before liquidity crisis.',
  keywords: [
    'cash runway calculator small business India',
    'days until cash crunch business India',
    'working capital survival calculator Indian SMB',
    'burn rate calculator rupees India',
    'udhaar cash gap liquidity calculator',
    'small business cash flow forecast India',
    'kirana emergency cash buffer calculator',
    'business solvency runway calculator',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/cash-flow-survival-calculator',
  },
  openGraph: {
    title: 'Cash Flow Survival Runway Calculator India | How Many Days Until Cash Runs Out',
    description:
      'Profit on paper does not pay suppliers or shop rent. Calculate your exact days of cash buffer before default.',
    url: 'https://Kagazo.in/business-os/cash-flow-survival-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cash Flow Survival Runway Calculator India | Small Business Liquidity Tool',
    description:
      'Determine how many days of cash runway your business has left and avoid sudden working capital emergencies.',
  },
};

const FAQS = [
  {
    question: 'What is the difference between paper profit and cash flow survival?',
    answer:
      'Accounting profit counts sales the moment an invoice or bill is issued, even if the customer hasn’t paid you a single rupee (e.g., Udhaar or 45-day corporate credit). Cash flow survival measures actual liquid rupees sitting in your Current Account and cash till. You cannot pay GST, staff salaries, or supplier invoices with unpaid receivables. Hundreds of profitable Indian businesses collapse every year simply because their cash is trapped in customer credit.',
  },
  {
    question: 'How many days of cash runway should an Indian small business maintain?',
    answer:
      'Healthy Indian MSMEs and retail merchants should target a minimum of 60 to 90 days of cash runway (covering rent, utilities, supplier dues, and staff salaries). If your runway is below 30 days, any external shock — such as a GST refund delay, a major client defaulting, or monsoon slow season — can push your business into insolvency.',
  },
  {
    question: 'How does customer Udhaar (credit) cause a cash crunch even when sales are high?',
    answer:
      'When you extend ₹1,00,000 in credit, you have already paid cash upfront to buy that inventory from wholesalers. Until that customer repays, you are effectively acting as an interest-free bank for your customers using your own working capital. If credit sales exceed 25% of turnover without strict 15-day recovery limits, your bank balance will steadily drain toward zero.',
  },
  {
    question: 'What immediate emergency actions should I take if my cash runway is under 30 days?',
    answer:
      '(1) Send immediate WhatsApp payment recovery reminders offering a 2% spot-settlement discount for cleared payments within 24 hours, (2) Liquidate slow-moving dead inventory at cost price to instantly release trapped cash, (3) Pause all non-essential marketing spend and discretionary capital purchases, and (4) Negotiate 15-day supplier payment extensions before cheques bounce.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/cash-calendar', label: '30-Day Cash Flow Calendar', icon: Calendar },
  { href: '/business-os/payment-follow-up', label: 'Udhaar Payment Reminder Generator', icon: MessageSquare },
  { href: '/business-os/break-even-calculator', label: 'Break-Even & Survival Calculator', icon: Target },
];

export default function CashFlowSurvivalPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Cash-Flow Survival Calculator', item: 'https://Kagazo.in/business-os/cash-flow-survival-calculator' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Cash-Flow Survival Runway Calculator',
        url: 'https://Kagazo.in/business-os/cash-flow-survival-calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Calculates available liquidity, net monthly cash burn, and exact days until a cash crunch for small businesses in India.',
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
          { label: 'Cash-Flow Survival Calculator' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-orange-600" />
          <span>Liquidity &amp; Solvency Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Cash Flow Survival Runway Calculator India — Days Until Cash Crunch
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
