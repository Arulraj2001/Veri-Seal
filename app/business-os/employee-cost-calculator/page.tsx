import { Metadata } from 'next';
import EmployeeTrueCostEngine from '@/components/business-os/EmployeeTrueCostEngine';
import { Users, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employee True Cost & Productivity Calculator for Indian SMBs | VeriSeal',
  description:
    'Calculate the true employer cost of hiring staff in India. Factor festival bonuses, daily tea/food allowances, PF/ESI, uniform wear, and calculate real cost per productive working hour.',
  keywords: [
    'employee true cost calculator india',
    'real cost of hiring an employee smb',
    'cost per productive hour formula',
    'full time vs freelancer cost comparison',
    'staff bonus tea allowance employer overhead',
  ],
  openGraph: {
    title: 'Employee True Cost & Productivity Calculator for Indian SMBs',
    description:
      'A ₹18k salary costs ~₹23k in real cash. Calculate bonuses, tea, PF/ESI, and true hourly cost.',
    url: 'https://veriseal.org/business-os/employee-cost-calculator',
  },
};

export default function EmployeeCostPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Employee True Cost & Productivity Calculator',
    url: 'https://veriseal.org/business-os/employee-cost-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Calculates the full out-of-pocket employer cost of hiring full-time staff including bonuses, allowances, and productive hourly rates.',
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
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          <span>Human Capital Economics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Employee True Cost &amp; Productivity Sizer
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
    </div>
  );
}
