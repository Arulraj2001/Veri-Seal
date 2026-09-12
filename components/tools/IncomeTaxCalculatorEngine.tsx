'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Printer,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Sliders,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  Award,
  DollarSign,
  ArrowRight,
  User,
  Calendar,
  FileText,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { printIsolatedDocument } from '@/lib/print-utils';

export default function IncomeTaxCalculatorEngine() {
  // Inputs
  const [taxpayerName, setTaxpayerName] = useState<string>('');
  const [ageCategory, setAgeCategory] = useState<'general' | 'senior' | 'super_senior'>('general');
  const [grossSalary, setGrossSalary] = useState<number>(1050000); // Default ₹10.5 Lakhs
  const [otherIncome, setOtherIncome] = useState<number>(0);

  // Old Regime Deductions
  const [sec80C, setSec80C] = useState<number>(150000); // Max 1.5L
  const [sec80D, setSec80D] = useState<number>(25000); // Health insurance
  const [sec80CCD, setSec80CCD] = useState<number>(50000); // NPS Tier 1 extra 50K
  const [sec80E, setSec80E] = useState<number>(0); // Education loan interest
  const [sec80TTA, setSec80TTA] = useState<number>(10000); // Savings bank interest
  const [hraExemption, setHraExemption] = useState<number>(60000);
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0); // Sec 24b Max 2L
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

  // New Regime Calculation FY 2025-26 (AY 2026-27)
  const newRegimeResult = useMemo(() => {
    const totalIncome = grossSalary + otherIncome;
    const stdDeduction = 75000; // Increased to ₹75,000 in Budget 2024-25 / 2025-26
    const taxableIncome = Math.max(0, totalIncome - stdDeduction);

    let tax = 0;
    // New Regime Revised Slabs:
    // 0 to 3L: Nil
    // 3L to 7L: 5% (on 4L = 20,000)
    // 7L to 10L: 10% (on 3L = 30,000)
    // 10L to 12L: 15% (on 2L = 30,000)
    // 12L to 15L: 20% (on 3L = 60,000)
    // Above 15L: 30%
    if (taxableIncome > 1500000) {
      tax += (taxableIncome - 1500000) * 0.3;
      tax += 300000 * 0.2; // 12L to 15L
      tax += 200000 * 0.15; // 10L to 12L
      tax += 300000 * 0.1; // 7L to 10L
      tax += 400000 * 0.05; // 3L to 7L
    } else if (taxableIncome > 1200000) {
      tax += (taxableIncome - 1200000) * 0.2;
      tax += 200000 * 0.15;
      tax += 300000 * 0.1;
      tax += 400000 * 0.05;
    } else if (taxableIncome > 1000000) {
      tax += (taxableIncome - 1000000) * 0.15;
      tax += 300000 * 0.1;
      tax += 400000 * 0.05;
    } else if (taxableIncome > 700000) {
      tax += (taxableIncome - 700000) * 0.1;
      tax += 400000 * 0.05;
    } else if (taxableIncome > 300000) {
      tax += (taxableIncome - 300000) * 0.05;
    }

    // Section 87A Full Rebate: Zero tax if taxable income <= 7,00,000
    let rebate87A = 0;
    if (taxableIncome <= 700000) {
      rebate87A = tax;
      tax = 0;
    }

    const cess = Math.round(tax * 0.04);
    const totalTax = tax + cess;
    const monthlyTds = Math.round(totalTax / 12);
    const monthlyInHand = Math.round((totalIncome - totalTax) / 12);

    return {
      grossTotal: totalIncome,
      stdDeduction,
      taxableIncome,
      baseTax: tax,
      rebate87A,
      cess,
      totalTax,
      monthlyTds,
      monthlyInHand,
    };
  }, [grossSalary, otherIncome]);

  // Old Regime Calculation FY 2025-26
  const oldRegimeResult = useMemo(() => {
    const totalIncome = grossSalary + otherIncome;
    const stdDeduction = 50000;
    const capped80C = Math.min(150000, sec80C);
    const capped80D = Math.min(ageCategory === 'general' ? 25000 : 50000, sec80D);
    const capped80CCD = Math.min(50000, sec80CCD);
    const cappedHomeLoan = Math.min(200000, homeLoanInterest);
    const capped80TTA = Math.min(ageCategory === 'general' ? 10000 : 50000, sec80TTA);

    const totalDeductions =
      stdDeduction +
      capped80C +
      capped80D +
      capped80CCD +
      sec80E +
      capped80TTA +
      hraExemption +
      cappedHomeLoan +
      otherDeductions;

    const taxableIncome = Math.max(0, totalIncome - totalDeductions);

    let tax = 0;
    const basicExemption = ageCategory === 'super_senior' ? 500000 : ageCategory === 'senior' ? 300000 : 250000;

    if (taxableIncome > 1000000) {
      tax += (taxableIncome - 1000000) * 0.3;
      tax += 500000 * 0.2; // 5L to 10L
      if (basicExemption < 500000) {
        tax += (500000 - basicExemption) * 0.05;
      }
    } else if (taxableIncome > 500000) {
      tax += (taxableIncome - 500000) * 0.2;
      if (basicExemption < 500000) {
        tax += (500000 - basicExemption) * 0.05;
      }
    } else if (taxableIncome > basicExemption) {
      tax += (taxableIncome - basicExemption) * 0.05;
    }

    // Section 87A Rebate in Old Regime: Zero tax if taxable income <= 5,00,000
    let rebate87A = 0;
    if (taxableIncome <= 500000) {
      rebate87A = tax;
      tax = 0;
    }

    const cess = Math.round(tax * 0.04);
    const totalTax = tax + cess;
    const monthlyTds = Math.round(totalTax / 12);
    const monthlyInHand = Math.round((totalIncome - totalTax) / 12);

    return {
      grossTotal: totalIncome,
      totalDeductions,
      taxableIncome,
      baseTax: tax,
      rebate87A,
      cess,
      totalTax,
      monthlyTds,
      monthlyInHand,
      capped80C,
      capped80D,
      capped80CCD,
      cappedHomeLoan,
    };
  }, [
    grossSalary,
    otherIncome,
    ageCategory,
    sec80C,
    sec80D,
    sec80CCD,
    sec80E,
    sec80TTA,
    hraExemption,
    homeLoanInterest,
    otherDeductions,
  ]);

  // Comparison Verdict
  const taxDiff = Math.abs(newRegimeResult.totalTax - oldRegimeResult.totalTax);
  const isNewBetter = newRegimeResult.totalTax <= oldRegimeResult.totalTax;

  // Print Isolated Tax Planning Sheet
  const handlePrintAssessment = () => {
    const assessmentHtml = `
      <div style="width: 210mm; min-height: 297mm; margin: 0 auto; padding: 15mm 18mm; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0F172A; background: #FFFFFF; box-sizing: border-box;">
        <!-- Header -->
        <div style="border-bottom: 2px solid #0F172A; padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="font-size: 16pt; font-weight: 800; margin: 0; text-transform: uppercase;">
              TAX PLANNING &amp; REGIME SELECTION REPORT
            </h1>
            <p style="font-size: 9pt; color: #475569; margin: 3px 0 0 0;">
              Assessment Year 2026–27 (Financial Year 2025–26) • Prepared for HR / Form 16 Declaration
            </p>
          </div>
          <div style="text-align: right; font-size: 9pt;">
            <p style="margin: 0; font-weight: bold;">Date: ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <!-- Taxpayer Details Card -->
        <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 4px; padding: 10px 14px; margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 9pt;">
          <div>
            <p style="margin: 0;">Employee / Taxpayer: <strong>${taxpayerName || 'Individual Taxpayer'}</strong></p>
            <p style="margin: 3px 0 0 0; color: #64748B;">Category: ${ageCategory === 'general' ? 'Individual (< 60 yrs)' : ageCategory === 'senior' ? 'Senior Citizen (60-80 yrs)' : 'Super Senior Citizen (> 80 yrs)'}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0;">Gross Salaried Income: <strong>₹${grossSalary.toLocaleString('en-IN')}</strong></p>
            <p style="margin: 3px 0 0 0; color: #64748B;">Other Sources: ₹${otherIncome.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <!-- Comparative Assessment Table -->
        <table style="width: 100%; border: 1px solid #0F172A; font-size: 9.5pt; margin-bottom: 24px; border-collapse: collapse;">
          <thead>
            <tr style="background: #0F172A; color: #FFFFFF;">
              <th style="padding: 8px 12px; text-align: left; width: 44%;">Tax Computation Components</th>
              <th style="padding: 8px 12px; text-align: right; width: 28%; border-left: 1px solid #475569;">NEW TAX REGIME (Default)</th>
              <th style="padding: 8px 12px; text-align: right; width: 28%; border-left: 1px solid #475569;">OLD TAX REGIME</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">Gross Total Income</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; font-weight: bold;">₹${newRegimeResult.grossTotal.toLocaleString('en-IN')}</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; font-weight: bold; border-left: 1px solid #CBD5E1;">₹${oldRegimeResult.grossTotal.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">Standard Deduction (Salaried)</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; color: #047857; font-weight: 600;">₹75,000</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">₹50,000</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">Sec 80C Deductions (PPF, EPF, ELSS)</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; color: #94A3B8;">Not Applicable</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">₹${oldRegimeResult.capped80C.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">Sec 80D Health Insurance</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; color: #94A3B8;">Not Applicable</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">₹${oldRegimeResult.capped80D.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">Sec 80CCD(1B) NPS Additional</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; color: #94A3B8;">Not Applicable</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">₹${oldRegimeResult.capped80CCD.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">HRA / Home Loan Interest Exemption</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; color: #94A3B8;">Not Applicable</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">₹${(hraExemption + oldRegimeResult.cappedHomeLoan).toLocaleString('en-IN')}</td>
            </tr>
            <tr style="background: #F8FAFC; font-weight: bold;">
              <td style="padding: 8px 12px; border-bottom: 1px solid #0F172A;">Net Taxable Income</td>
              <td style="padding: 8px 12px; text-align: right; border-bottom: 1px solid #0F172A;">₹${newRegimeResult.taxableIncome.toLocaleString('en-IN')}</td>
              <td style="padding: 8px 12px; text-align: right; border-bottom: 1px solid #0F172A; border-left: 1px solid #CBD5E1;">₹${oldRegimeResult.taxableIncome.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">Base Income Tax Computed</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${newRegimeResult.baseTax.toLocaleString('en-IN')}</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">₹${oldRegimeResult.baseTax.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">Sec 87A Tax Rebate</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; color: #047857;">- ₹${newRegimeResult.rebate87A.toLocaleString('en-IN')}</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; color: #047857; border-left: 1px solid #CBD5E1;">- ₹${oldRegimeResult.rebate87A.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; border-bottom: 1px solid #E2E8F0;">Health &amp; Education Cess (4%)</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${newRegimeResult.cess.toLocaleString('en-IN')}</td>
              <td style="padding: 6px 12px; text-align: right; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">₹${oldRegimeResult.cess.toLocaleString('en-IN')}</td>
            </tr>
            <tr style="background: #F1F5F9; font-weight: 800; font-size: 11pt;">
              <td style="padding: 8px 12px; border-top: 2px solid #0F172A; border-bottom: 2px solid #0F172A;">TOTAL ANNUAL TAX PAYABLE</td>
              <td style="padding: 8px 12px; text-align: right; border-top: 2px solid #0F172A; border-bottom: 2px solid #0F172A; color: ${isNewBetter ? '#059669' : '#0F172A'};">
                ₹${newRegimeResult.totalTax.toLocaleString('en-IN')}
              </td>
              <td style="padding: 8px 12px; text-align: right; border-top: 2px solid #0F172A; border-bottom: 2px solid #0F172A; border-left: 1px solid #CBD5E1; color: ${!isNewBetter ? '#059669' : '#0F172A'};">
                ₹${oldRegimeResult.totalTax.toLocaleString('en-IN')}
              </td>
            </tr>
            <tr style="font-size: 9pt;">
              <td style="padding: 6px 12px;">Monthly Estimated TDS Deduction</td>
              <td style="padding: 6px 12px; text-align: right; font-weight: bold;">₹${newRegimeResult.monthlyTds.toLocaleString('en-IN')} / mo</td>
              <td style="padding: 6px 12px; text-align: right; font-weight: bold; border-left: 1px solid #CBD5E1;">₹${oldRegimeResult.monthlyTds.toLocaleString('en-IN')} / mo</td>
            </tr>
          </tbody>
        </table>

        <!-- Formal Recommendation Callout -->
        <div style="background: ${isNewBetter ? '#ECFDF5' : '#EEF2FF'}; border: 2px solid ${isNewBetter ? '#059669' : '#4F46E5'}; padding: 14px 18px; border-radius: 6px; margin-bottom: 30px;">
          <h3 style="font-size: 12pt; font-weight: 800; margin: 0 0 4px 0; color: ${isNewBetter ? '#065F46' : '#312E81'}; text-transform: uppercase;">
            RECOMMENDED CHOICE: ${isNewBetter ? 'NEW TAX REGIME' : 'OLD TAX REGIME'} (SAVES ₹${taxDiff.toLocaleString('en-IN')} ANNUALLY)
          </h3>
          <p style="font-size: 8.5pt; color: #334155; margin: 0; line-height: 1.4;">
            ${isNewBetter
              ? `You save ₹${taxDiff.toLocaleString('en-IN')} in taxes under the New Tax Regime due to revised slabs and the enhanced ₹75,000 standard deduction. Opting for New Regime maximizes your monthly take-home salary.`
              : `You save ₹${taxDiff.toLocaleString('en-IN')} under the Old Tax Regime due to substantial deductions claimed under Section 80C, 80D, 80CCD, and HRA.`
            }
          </p>
        </div>

        <!-- Form 16 Employee Declaration Sign-Off -->
        <div style="margin-top: 40px; border-top: 1px dashed #64748B; padding-top: 16px; font-size: 8.5pt;">
          <p style="font-weight: bold; margin: 0 0 6px 0; text-transform: uppercase;">EMPLOYEE DECLARATION FOR PAYROLL &amp; TDS:</p>
          <p style="margin: 0 0 30px 0; color: #475569;">
            I hereby declare that I have evaluated my tax liabilities and intend to opt for the <strong>${isNewBetter ? 'NEW TAX REGIME' : 'OLD TAX REGIME'}</strong> for Financial Year 2025–26. Please deduct TDS accordingly from my monthly compensation.
          </p>
          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <p style="margin: 0;">Date: ________________________</p>
              <p style="margin: 4px 0 0 0;">Place: ________________________</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 220px; border-bottom: 1px solid #0F172A; margin-bottom: 4px;"></div>
              <p style="font-weight: bold; margin: 0;">Signature of Employee</p>
              <p style="color: #64748B; font-size: 8pt; margin: 0;">(${taxpayerName || 'Employee'})</p>
            </div>
          </div>
        </div>
      </div>
    `;

    printIsolatedDocument({
      title: `Tax_Assessment_${taxpayerName.replace(/\s+/g, '_')}_FY2025-26`,
      bodyHtml: assessmentHtml,
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Engine Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Income Tax Calculator FY 2025–26 (AY 2026–27)
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  UNION BUDGET UPDATED
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Side-by-side New vs Old Regime comparison with ₹75,000 standard deduction and printable Form 16 declaration.
              </p>
            </div>
          </div>

          <button
            onClick={handlePrintAssessment}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>1-Click Print Tax Planning Sheet</span>
          </button>
        </div>

        {/* Studio Workspace */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Income & Deductions Inputs */}
          <div className="lg:col-span-5 space-y-6 text-xs">
            {/* Taxpayer Demographics */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Taxpayer Profile &amp; Age Group</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Taxpayer Name
                  </label>
                  <input
                    type="text"
                    value={taxpayerName}
                    onChange={(e) => setTaxpayerName(e.target.value)}
                    placeholder="e.g. Full Name as per PAN"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Age Group
                  </label>
                  <select
                    value={ageCategory}
                    onChange={(e) => setAgeCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  >
                    <option value="general">&lt; 60 Yrs (General)</option>
                    <option value="senior">60–80 Yrs (Senior)</option>
                    <option value="super_senior">&gt; 80 Yrs (Super Senior)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Income Sources */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Annual Gross Income (₹)</span>
              </span>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Gross Annual Salary (CTC / Form 16)
                  </label>
                  <span className="font-bold text-emerald-600">₹{grossSalary.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={300000}
                  max={5000000}
                  step={25000}
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="w-full accent-emerald-600 mb-2"
                />
                <input
                  type="number"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Income from Other Sources (Interest, Rental, Freelance)
                </label>
                <input
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                />
              </div>
            </div>

            {/* Deductions (Old Tax Regime) */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 space-y-3">
              <span className="font-bold text-indigo-950 dark:text-indigo-200 block border-b border-indigo-200/60 dark:border-indigo-800/40 pb-2 flex items-center justify-between">
                <span>Deductions &amp; Exemptions (Old Regime)</span>
                <span className="text-[10px] text-indigo-600 font-normal">Section 80C, 80D, 80CCD, HRA</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Sec 80C (Max ₹1.5L)
                  </label>
                  <input
                    type="number"
                    value={sec80C}
                    onChange={(e) => setSec80C(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Sec 80D Health Ins.
                  </label>
                  <input
                    type="number"
                    value={sec80D}
                    onChange={(e) => setSec80D(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Sec 80CCD(1B) NPS (₹50K)
                  </label>
                  <input
                    type="number"
                    value={sec80CCD}
                    onChange={(e) => setSec80CCD(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    HRA Rent Exemption
                  </label>
                  <input
                    type="number"
                    value={hraExemption}
                    onChange={(e) => setHraExemption(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Sec 24(b) Home Loan
                  </label>
                  <input
                    type="number"
                    value={homeLoanInterest}
                    onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Sec 80E (Edu Loan)
                  </label>
                  <input
                    type="number"
                    value={sec80E}
                    onChange={(e) => setSec80E(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Side-by-Side Comparison Verdict */}
          <div className="lg:col-span-7 space-y-5">
            {/* Winner Verdict Banner */}
            <div
              className={`p-6 rounded-3xl border shadow-lg flex items-center justify-between gap-4 transition-all ${
                isNewBetter
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-indigo-600 text-white border-indigo-500'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/15 inline-block">
                  RECOMMENDED TAX REGIME
                </span>
                <h3 className="text-xl font-extrabold tracking-tight">
                  {isNewBetter ? 'NEW TAX REGIME SAVES MORE' : 'OLD TAX REGIME SAVES MORE'}
                </h3>
                <p className="text-xs opacity-90">
                  You save <strong>₹{taxDiff.toLocaleString('en-IN')}</strong> in annual taxes by choosing the{' '}
                  <strong>{isNewBetter ? 'New Regime' : 'Old Regime'}</strong>.
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-semibold block opacity-80">Annual Tax Savings</span>
                <span className="text-2xl font-black">₹{taxDiff.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Side-by-Side Regime Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* New Regime Card */}
              <div
                className={`p-5 rounded-3xl border space-y-4 transition-all ${
                  isNewBetter
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/50 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    New Tax Regime
                  </span>
                  {isNewBetter && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      BEST CHOICE
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Total Tax Payable</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ₹{newRegimeResult.totalTax.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    TDS: ₹{newRegimeResult.monthlyTds.toLocaleString('en-IN')}/mo • In-Hand: ₹{newRegimeResult.monthlyInHand.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <div className="space-y-1.5 text-xs pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Standard Deduction</span>
                    <span className="font-semibold text-emerald-600">₹75,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Taxable Income</span>
                    <span className="font-semibold">₹{newRegimeResult.taxableIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sec 87A Rebate</span>
                    <span className="font-semibold text-emerald-600">- ₹{newRegimeResult.rebate87A.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">4% Health &amp; Edu Cess</span>
                    <span className="font-semibold">₹{newRegimeResult.cess.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Old Regime Card */}
              <div
                className={`p-5 rounded-3xl border space-y-4 transition-all ${
                  !isNewBetter
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/20 border-indigo-500/50 shadow-md ring-2 ring-indigo-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    Old Tax Regime
                  </span>
                  {!isNewBetter && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-500 text-white">
                      BEST CHOICE
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Total Tax Payable</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ₹{oldRegimeResult.totalTax.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    TDS: ₹{oldRegimeResult.monthlyTds.toLocaleString('en-IN')}/mo • In-Hand: ₹{oldRegimeResult.monthlyInHand.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <div className="space-y-1.5 text-xs pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Deductions</span>
                    <span className="font-semibold text-indigo-600">₹{oldRegimeResult.totalDeductions.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Taxable Income</span>
                    <span className="font-semibold">₹{oldRegimeResult.taxableIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sec 87A Rebate</span>
                    <span className="font-semibold text-emerald-600">- ₹{oldRegimeResult.rebate87A.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">4% Health &amp; Edu Cess</span>
                    <span className="font-semibold">₹{oldRegimeResult.cess.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Zero Server Upload Guarantee */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero Financial Data Retention:</strong> All income tax calculations run 100% locally inside your browser. No financial figures or personal identifiers are stored or tracked.
              </span>
            </div>
          </div>
        </div>

        {/* Ad Placement */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <AdSlot slot="in_content" />
        </div>
      </div>
    </div>
  );
}
