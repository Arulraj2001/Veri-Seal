'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  ShieldCheck,
  Building2,
  FileText,
  ArrowRight,
  Sparkles,
  Info,
  DollarSign,
  TrendingDown,
  CheckCircle2,
  Clock,
  HelpCircle,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function ShamContractingCheckerPage() {
  const [control, setControl] = React.useState<'contractor' | 'employee'>('employee');
  const [delegation, setDelegation] = React.useState<'contractor' | 'employee'>('employee');
  const [paymentBasis, setPaymentBasis] = React.useState<'contractor' | 'employee'>('employee');
  const [riskInsurance, setRiskInsurance] = React.useState<'contractor' | 'employee'>('contractor');
  const [toolsEquipment, setToolsEquipment] = React.useState<'contractor' | 'employee'>('employee');
  const [integration, setIntegration] = React.useState<'contractor' | 'employee'>('employee');
  const [annualContractValue, setAnnualContractValue] = React.useState<number>(90000);

  const evaluation = React.useMemo(() => {
    const factors = [control, delegation, paymentBasis, riskInsurance, toolsEquipment, integration];
    const employeeCount = factors.filter((f) => f === 'employee').length;
    const contractorCount = factors.filter((f) => f === 'contractor').length;

    let classification = '';
    let statusClass = '';
    let riskLevel = '';

    if (employeeCount >= 4) {
      classification = 'Deemed Employee / High Risk of Sham Contracting';
      statusClass = 'text-rose-600 bg-rose-50 border-rose-200';
      riskLevel = 'High Risk (s.357 Fair Work Act)';
    } else if (employeeCount >= 2) {
      classification = 'Borderline Engagement: Significant Legal Ambiguity';
      statusClass = 'text-amber-800 bg-amber-50 border-amber-200';
      riskLevel = 'Moderate Risk';
    } else {
      classification = 'Genuine Independent Contractor Relationship';
      statusClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      riskLevel = 'Compliant';
    }

    // Potential backpay liability if misclassified (12% SG + 4 wks annual leave + public holidays)
    const superBackpay = annualContractValue * 0.12;
    const annualLeaveBackpay = annualContractValue * (4 / 52);
    const totalPotentialLiability = superBackpay + annualLeaveBackpay;

    return {
      employeeCount,
      contractorCount,
      classification,
      statusClass,
      riskLevel,
      superBackpay,
      annualLeaveBackpay,
      totalPotentialLiability,
    };
  }, [control, delegation, paymentBasis, riskInsurance, toolsEquipment, integration, annualContractValue]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian Contractor vs Employee Sham Contracting Checker',
    operatingSystem: 'All',
    applicationCategory: 'LegalApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Australian employment law checker under Fair Work Act 2009 s.357, Closing Loopholes Act Section 15AA, and High Court multifactorial tests.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/au" className="hover:text-amber-800 transition-colors">Australia Suite</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Sham Contracting Checker</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Scale className="w-3.5 h-3.5" />
          <span>Fair Work Act 2009 &amp; Section 15AA (Closing Loopholes)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Contractor vs Employee Sham Contracting Checker
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Evaluate workforce engagements against the 6-pillar Australian common law multifactorial test and Section 15AA of the Fair Work Act 2009 to identify sham contracting risks and quantify superannuation and leave backpay liabilities.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Multifactorial Assessment Indicators</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              s.357 FWA
            </span>
          </div>

          {/* 1. Control */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">1. Operational Control</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setControl('employee')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  control === 'employee' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Principal sets hours &amp; directs work
              </button>
              <button
                type="button"
                onClick={() => setControl('contractor')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  control === 'contractor' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Worker controls how &amp; when done
              </button>
            </div>
          </div>

          {/* 2. Subcontracting / Delegation */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">2. Right to Delegate / Subcontract</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDelegation('employee')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  delegation === 'employee' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Must perform work personally
              </button>
              <button
                type="button"
                onClick={() => setDelegation('contractor')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  delegation === 'contractor' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Can hire others / delegate freely
              </button>
            </div>
          </div>

          {/* 3. Basis of Payment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">3. Basis of Remuneration</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentBasis('employee')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  paymentBasis === 'employee' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Paid hourly or weekly wage
              </button>
              <button
                type="button"
                onClick={() => setPaymentBasis('contractor')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  paymentBasis === 'contractor' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Paid for a quoted result or milestone
              </button>
            </div>
          </div>

          {/* 4. Commercial Risk & Insurance */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">4. Commercial Risk &amp; Defect Rectification</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRiskInsurance('employee')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  riskInsurance === 'employee' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Employer bears all commercial risks
              </button>
              <button
                type="button"
                onClick={() => setRiskInsurance('contractor')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  riskInsurance === 'contractor' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Worker rectifies defects at own cost
              </button>
            </div>
          </div>

          {/* 5. Tools & Equipment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">5. Tools, Equipment &amp; Assets</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setToolsEquipment('employee')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  toolsEquipment === 'employee' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Principal supplies laptop/tools/uniform
              </button>
              <button
                type="button"
                onClick={() => setToolsEquipment('contractor')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-left ${
                  toolsEquipment === 'contractor' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Worker supplies major tools &amp; assets
              </button>
            </div>
          </div>

          {/* Contract Value for Backpay Estimation */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Annual Invoiced Contract Value ($ AUD)</span>
              <span className="font-mono text-amber-800">${annualContractValue.toLocaleString()}</span>
            </label>
            <input
              type="number"
              min="10000"
              step="5000"
              value={annualContractValue}
              onChange={(e) => setAnnualContractValue(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-900 text-xs"
            />
          </div>
        </div>

        {/* Outputs (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Classification Verdict
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
                {evaluation.employeeCount} Employee vs {evaluation.contractorCount} Contractor Markers
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {evaluation.classification}
              </h3>
              <p className="text-xs text-slate-300">
                Risk Classification: <span className="font-bold text-amber-300">{evaluation.riskLevel}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">12% Super Guarantee Exposure</div>
                <div className="text-base sm:text-lg font-black text-rose-400 mt-1">
                  ${Math.round(evaluation.superBackpay).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Annual Leave Liability</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  ${Math.round(evaluation.annualLeaveBackpay).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Potential Employer Exposure (Per Year of Misclassification)
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Unpaid Super Guarantee (12.0% SGAA 1992)</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(evaluation.superBackpay).toLocaleString()}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600">Unpaid NES Annual Leave (4 Weeks)</span>
                <span className="font-mono font-bold text-slate-900">${Math.round(evaluation.annualLeaveBackpay).toLocaleString()}</span>
              </div>
              <div className="py-3 flex justify-between font-black text-sm text-slate-950 border-t-2 border-slate-200">
                <span>Total Statutory Backpay Risk</span>
                <span className="font-mono text-rose-600">${Math.round(evaluation.totalPotentialLiability).toLocaleString()} AUD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Fair Work Act 2009 Part 3-1 Division 6: Sham Contracting Prohibition
          </h2>
          <p>
            Under Section 357 of the Fair Work Act 2009, an employer must not misrepresent an employment relationship as an independent contracting arrangement. Engaging an individual as an &apos;ABN contractor&apos; when the reality of their work resembles employment exposes businesses to civil penalties exceeding $93,900 per contravention for corporations, alongside mandatory back-payment of superannuation, annual leave, and overtime loadings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Section 15AA: Statutory Definition of Employment (Closing Loopholes Reform)
          </h2>
          <p>
            The Fair Work Legislation Amendment (Closing Loopholes No. 2) Act 2024 inserted Section 15AA into the Fair Work Act, effectively recalibrating the High Court&apos;s 2022 decisions in <em>Personnel Contracting</em> and <em>Jamsek</em>. Decision-makers must now determine whether an individual is an employee or independent contractor by examining the real substance, practical reality, and totality of the relationship, rather than relying solely on the written contract.
          </p>
        </section>
      </article>
    </div>
  );
}

