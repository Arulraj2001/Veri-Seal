import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import SalesTargetEngine from '@/components/business-os/SalesTargetEngine';
import { Trophy, HelpCircle, ChevronRight, Target, Coins, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sales Target Calculator India | How to Earn ₹1 Lakh/Month Net Profit',
  description:
    'Free reverse sales target calculator for Indian entrepreneurs, retail shops, and D2C brands. Calculate the exact monthly turnover and daily orders needed to pocket ₹1 Lakh, ₹2 Lakh, or any target net income.',
  keywords: [
    'sales target calculator India',
    'how to earn 1 lakh per month profit business India',
    'daily sales quota calculator retail India',
    'monthly turnover needed for 1 lakh net income',
    'small business revenue target formula India',
    'reverse profit calculator Indian rupees',
    'orders per day to make 1 lakh salary',
    'kirana shop monthly profit target planner',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/sales-target-calculator',
  },
  openGraph: {
    title: 'Sales Target Calculator India | How to Earn ₹1 Lakh/Month Net Profit',
    description:
      'Start from your dream take-home pay and reverse-engineer your required daily sales pace, monthly turnover, and order volume.',
    url: 'https://Kagazo.in/business-os/sales-target-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Target Calculator India | Reverse-Engineered Net Profit Planner',
    description:
      'Determine how many daily orders and total monthly revenue you must generate to pocket ₹1 Lakh or more in net profit.',
  },
};

const FAQS = [
  {
    question: 'How much turnover do I need to earn ₹1 Lakh per month profit in India?',
    answer:
      'It depends on your gross margin and fixed overheads. If your fixed expenses (shop rent + staff salaries) are ₹45,000/month and you maintain a 40% gross margin: Required Gross Margin = ₹1,00,000 (target profit) + ₹45,000 (fixed overheads) = ₹1,45,000. Required Monthly Turnover = ₹1,45,000 ÷ 0.40 = ₹3,62,500. If your average order value is ₹1,000, you need 363 orders a month, or just 14 orders per day across 26 working days.',
  },
  {
    question: 'Should I increase order count or increase order value to hit my profit target?',
    answer:
      'Increasing Average Order Value (AOV) is almost always 3x easier than doubling customer footfall. Packaging complementary products into ₹1,500 bundles or setting a ₹999 free-delivery threshold increases order value without increasing acquisition cost or fixed rent.',
  },
  {
    question: 'How many working days should I assume in an Indian business monthly target?',
    answer:
      'Standard practice for Indian retail, wholesale, and service businesses is 26 working days per month (allowing 4 weekly Sundays off). In high-volume retail or food businesses operating 30 days, using 26 days builds a healthy 4-day safety cushion for festival holidays, monsoon slumps, or unexpected downtime.',
  },
  {
    question: 'What is the biggest mistake Indian founders make when setting sales targets?',
    answer:
      'Confusing revenue with profit. Founders often celebrate reaching ₹10 Lakhs in monthly turnover while actually taking home less than ₹40,000 because they ignored delivery return costs (RTO), customer acquisition costs (CAC), and working capital interest. Setting targets backward from your desired owner take-home pay guarantees solvency.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/break-even-calculator', label: 'Break-Even & Survival Calculator', icon: Target },
  { href: '/business-os/daily-profit-calculator', label: 'Daily Profit & Cash/UPI Ledger', icon: Coins },
  { href: '/business-os/real-profit-calculator', label: 'Monthly P&L & Profit Leak Finder', icon: TrendingUp },
];

export default function SalesTargetPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Sales Target Calculator', item: 'https://Kagazo.in/business-os/sales-target-calculator' },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Reverse-Engineer Your Sales Target for ₹1 Lakh Profit',
        description: 'Calculate the exact daily orders and monthly turnover needed to achieve your target owner salary in India.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Set your target net profit', text: 'Input how much personal monthly income you want in your bank account (e.g., ₹1,00,000).' },
          { '@type': 'HowToStep', position: 2, name: 'Enter monthly fixed costs', text: 'Add your shop rent, staff wages, electricity, and recurring business overheads.' },
          { '@type': 'HowToStep', position: 3, name: 'Provide margin and average ticket size', text: 'Enter your average gross profit margin percentage and average order value in rupees.' },
          { '@type': 'HowToStep', position: 4, name: 'Get your daily order quota', text: 'See the required monthly revenue and exact daily orders required over 26 working days.' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Reverse Sales Target Calculator',
        url: 'https://Kagazo.in/business-os/sales-target-calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Reverse-engineers required daily and monthly revenue to pocket a designated clean net profit after overheads.',
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
          { label: 'Sales Target & Profit Calculator' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-emerald-600" />
          <span>Goal-Oriented Revenue Modeling</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Sales Target Calculator India — How to Earn ₹1 Lakh/Month Net Profit
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
