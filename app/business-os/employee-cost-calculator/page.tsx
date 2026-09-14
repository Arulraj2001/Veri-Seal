import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import Link from 'next/link';
import EmployeeTrueCostEngine from '@/components/business-os/EmployeeTrueCostEngine';
import { Users, HelpCircle, ChevronRight, Target, TrendingUp, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employee True Cost Calculator India | Why ₹18k Salary Actually Costs ₹23k+',
  description:
    'Free employee true cost and hourly productivity calculator for Indian SMBs. Factor base salary, Diwali bonus, daily chai/snack allowance, PF/ESI, training, and productive working hours to discover real employer cost.',
  keywords: [
    'employee true cost calculator India',
    'salary vs real cost business India',
    'cost of hiring an employee small business India',
    'Diwali festival bonus calculation formula',
    'staff chai lunch allowance employer cost',
    'cost per productive working hour formula India',
    'full time vs freelancer cost comparison India',
    'helper salary true cost calculator',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/business-os/employee-cost-calculator',
  },
  openGraph: {
    title: 'Employee True Cost Calculator India | Why ₹18k Salary Actually Costs ₹23k+',
    description:
      'A ₹18k salary costs ~₹23k in real cash. Calculate Diwali bonuses, tea/snacks, PF/ESI, and true hourly cost.',
    url: 'https://Kagazo.in/business-os/employee-cost-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employee True Cost Calculator India | Real Staff Hiring Expense Sizer',
    description:
      'Calculate the real out-of-pocket employer cost of hiring staff in India including bonuses, allowances, and productive hourly rates.',
  },
};

const FAQS = [
  {
    question: 'Why does an ₹18,000 monthly salary actually cost an employer ₹23,000+ in India?',
    answer:
      'Stated base salary represents only the direct pay envelope. Indian employers must also fund: (1) Mandatory 1-month Diwali/annual bonus (₹1,500/mo amortized), (2) Daily tea, coffee, and snack allowances (₹50/day = ₹1,300/mo), (3) Statutory employer contributions like EPF/ESI or group medical cover (₹1,500–₹2,000/mo), and (4) Paid leave, festival holidays, and training turnover costs. Together, these push your true outlay to ₹23,000–₹24,500 monthly (a 1.28x to 1.35x multiplier).',
  },
  {
    question: 'What hidden employee overheads do Indian shopkeepers often forget to budget?',
    answer:
      'The most common forgotten expenses are: (1) Equipment wear, uniform T-shirts, and company mobile recharges, (2) Festival gifts and sweet boxes during Diwali, Pongal, or Eid, (3) Paid absence days where you have to step in yourself or hire temporary replacements, and (4) Damaged merchandise and billing mistakes during onboarding weeks.',
  },
  {
    question: 'How do I calculate an employee’s cost per productive working hour?',
    answer:
      'Divide the employee’s Total True Monthly Cost (e.g., ₹24,000) by their actual productive hours. If an employee works 26 days × 8 hours = 208 nominal hours, but loses ~1.5 hours daily to tea breaks, lunch, and idle waiting (leaving 6.5 productive hours/day = 169 true hours): Real Hourly Cost = ₹24,000 ÷ 169 hours = ₹142 per productive hour.',
  },
  {
    question: 'When should an Indian SMB hire full-time staff vs using part-time gig helpers?',
    answer:
      'Hire full-time staff only when you have predictable daily core tasks exceeding 35 hours per week (such as full-time counter retail billing or warehouse packing). For tasks with volatile, seasonal spikes (like festival packaging surges, photoshoot modeling, or website design), hiring gig workers or hourly contract helpers avoids locking you into permanent fixed payroll overheads.',
  },
];

const RELATED_TOOLS = [
  { href: '/business-os/break-even-calculator', label: 'Break-Even & Survival Calculator', icon: Target },
  { href: '/business-os/real-profit-calculator', label: 'Monthly P&L & Profit Leak Finder', icon: TrendingUp },
  { href: '/business-os/sales-target-calculator', label: 'Sales Target & Profit Planner', icon: Trophy },
];

export default function EmployeeCostPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Business OS', item: 'https://Kagazo.in/business-os' },
          { '@type': 'ListItem', position: 3, name: 'Employee True Cost Calculator', item: 'https://Kagazo.in/business-os/employee-cost-calculator' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Employee True Cost & Productivity Calculator',
        url: 'https://Kagazo.in/business-os/employee-cost-calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Calculates the full out-of-pocket employer cost of hiring full-time staff including bonuses, allowances, and productive hourly rates in India.',
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
          { label: 'Employee Cost & Productivity Calculator' },
        ]}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          <span>Human Capital Economics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Employee True Cost Calculator India — Why ₹18k Salary Actually Costs ₹23k+
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          When you hire a helper or associate, their base salary is only ~75% of your true cash obligation. Add annual festival bonuses, daily refreshments, uniform wear, and employer taxes to discover your true hourly cost.
        </p>
      </div>

      {/* Interactive Engine */}
      <EmployeeTrueCostEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Hiring Full-Time vs Outsourcing to Freelancers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How smart Indian small businesses decide whether to add permanent headcount.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. The 1.25x Rule</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In Indian retail and service businesses, the actual cash needed to maintain an employee is 1.25x to 1.35x their stated base salary. Always calculate this multiplier before extending an offer letter.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Idle Downtime Costs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full-time staff must be paid during quiet monsoon seasons or mid-week lulls. If your core work fluctuates with festivals, hiring freelance contractors keeps your fixed overhead flexible.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Output-Linked Incentives</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structuring compensation as a reliable base salary plus per-order packaging or sales commission aligns employee effort with your daily cash register, turning payroll into a profit driver.
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
