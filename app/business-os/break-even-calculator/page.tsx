import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import BreakEvenEngine from '@/components/business-os/BreakEvenEngine';
import { Target, HelpCircle, ChevronRight, TrendingUp, Coins, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Break-Even Calculator India | Daily Orders & Monthly Turnover to Cover Rent & Staff',
  description:
    'Free Indian break-even point calculator in Rupees. Find the exact daily orders and monthly turnover needed to cover shop rent, helper salaries, and fixed bills. Includes contribution margin and target profit simulator.',
  keywords: [
    'break even point calculator Indian rupees',
    'daily orders to break even kirana store',
    'small business break even calculator India',
    'how to calculate break even retail shop India',
    'contribution margin formula Indian business',
    'ecommerce break even orders Shiprocket India',
    'monthly turnover to cover rent and staff wages',
    'retail break even day of month simulator',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/break-even-calculator',
  },
  openGraph: {
    title: 'Break-Even Calculator India | Daily Orders & Monthly Turnover to Cover Rent & Staff',
    description:
      'Know the exact day of the month and order quota after which your Indian business covers all bills and starts pocketing true owner profit.',
    url: 'https://Kagazo.in/business-os/break-even-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Break-Even Point Calculator India | Daily Order Target for SMBs',
    description:
      'Calculate contribution margins, break-even monthly turnover, and daily order quotas for retail shops and D2C brands in India.',
  },
};

const FAQS = [
  {
    question: 'What is contribution margin in simple terms for an Indian shopkeeper?',
    answer:
      'Contribution margin is the money left from each sale after paying only the direct product and delivery costs (Selling Price minus COGS, shipping, and packaging). For instance, if you sell an apparel item for ₹1,200 and procurement + packaging costs ₹700, your contribution margin is ₹500. This ₹500 does NOT go straight to your pocket — it "contributes" directly toward paying off your fixed shop rent, helper salary, and electricity bills until your break-even point is reached.',
  },
  {
    question: 'What fixed costs should I include in my break-even calculation?',
    answer:
      'Include every expense you must pay whether you sell 0 units or 1,000 units: (1) Shop/godown rent, (2) Fixed employee and helper salaries, (3) Electricity baseline and Wi-Fi internet bills, (4) Software, POS, or SaaS subscriptions, (5) Trade license or accounting retainer fees, and (6) Loan EMIs or equipment depreciation.',
  },
  {
    question: 'On which day of the month does an average Indian retail business break even?',
    answer:
      'Most healthy Indian retail businesses break even between the 18th and 22nd day of a 26-day working month. If your business takes until day 25 or 26 to cover fixed costs, you are operating on razor-thin survival margins where a 2-day dip in footfall or a delayed customer payment creates an immediate cash crisis.',
  },
  {
    question: 'How can I lower my break-even point without cutting staff salaries?',
    answer:
      'You can lower your break-even quota in three ways: (1) Negotiate raw material or wholesale purchase prices by 5% to expand your contribution margin per order, (2) Increase average order value (AOV) through combo kits and cross-sells so each customer covers a bigger chunk of overheads, or (3) Sublet unused shop/storage space to another business or install a bill-payment/courier pickup counter to offset fixed rent.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/sales-target-calculator', label: 'Sales Target & Profit Target Finder', icon: TrendingUp },
  { href: '/business-os/daily-profit-calculator', label: 'Daily Profit & Cash/UPI Ledger', icon: Coins },
  { href: '/business-os/cash-flow-survival-calculator', label: 'Cash Flow Survival Runway', icon: Calendar },
];

export default function BreakEvenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Break-Even Calculator', item: 'https://Kagazo.in/business-os/break-even-calculator' },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your Business Break-Even Point in India',
        description: 'Find out the exact turnover and number of daily orders required to cover all shop overheads.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter total monthly fixed expenses', text: 'Tally shop rent, staff wages, electricity, Wi-Fi, software, and loan EMIs.' },
          { '@type': 'HowToStep', position: 2, name: 'Set average selling price and direct cost', text: 'Enter your typical order value and the direct product, packaging, and shipping cost per order.' },
          { '@type': 'HowToStep', position: 3, name: 'Calculate contribution margin', text: 'The tool calculates your gross margin and rupee contribution margin per order.' },
          { '@type': 'HowToStep', position: 4, name: 'View break-even threshold and daily pace', text: 'See your required monthly revenue, total units, and daily orders required across 26 working days.' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Break-Even & Survival Target Calculator',
        url: 'https://Kagazo.in/business-os/break-even-calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Calculate contribution margins, break-even monthly revenue, and daily order targets for Indian small businesses.',
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
          { label: 'Break-Even & Survival Calculator' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
          <Target className="w-3.5 h-3.5 text-cyan-600" />
          <span>Survival Threshold Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Break-Even Calculator India — Daily Orders &amp; Monthly Turnover to Cover Rent &amp; Staff
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
