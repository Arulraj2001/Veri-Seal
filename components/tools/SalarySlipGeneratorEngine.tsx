'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  FileText,
  Printer,
  Download,
  Building,
  User,
  DollarSign,
  Languages,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Building2,
  Upload,
  Plus,
  Trash2,
  Sliders,
  Check,
  RefreshCw,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { printIsolatedDocument } from '@/lib/print-utils';

interface DynamicItem {
  id: string;
  name: string;
  amount: number;
}

interface SalaryDetails {
  companyName: string;
  companyAddress: string;
  companyCin: string;
  payMonth: string;
  payYear: string;
  employeeName: string;
  employeeId: string;
  designation: string;
  department: string;
  doj: string;
  bankName: string;
  bankAccount: string;
  ifsc: string;
  pan: string;
  uan: string;
  totalDays: number;
  paidDays: number;
  lopDays: number;
  // Standard Earnings
  basicPay: number;
  hra: number;
  conveyance: number;
  specialAllowance: number;
  // Standard Deductions
  pfDeduction: number;
  esiDeduction: number;
  profTax: number;
  tdsDeduction: number;
}

// Helper to convert Indian numbers to words
function numberToIndianWords(num: number): string {
  if (num <= 0) return 'Zero Rupees Only';
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n: number): string {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + inWords(n % 100) : '');
    if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + inWords(n % 1000) : '');
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + inWords(n % 100000) : '');
    return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + inWords(n % 10000000) : '');
  }

  return inWords(Math.round(num)) + ' Rupees Only';
}

export default function SalarySlipGeneratorEngine() {
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [autoStatutory, setAutoStatutory] = useState<boolean>(true);

  // Custom Extra Allowances and Deductions
  const [extraEarnings, setExtraEarnings] = useState<DynamicItem[]>([
    { id: '1', name: 'Performance Bonus', amount: 2500 },
  ]);
  const [extraDeductions, setExtraDeductions] = useState<DynamicItem[]>([]);

  const logoInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<SalaryDetails>({
    companyName: 'APEX TECHNOLOGIES PRIVATE LIMITED',
    companyAddress: 'Tidel Park, 4th Floor, Rajiv Gandhi Salai, Chennai, Tamil Nadu - 600113',
    companyCin: 'U72900TN2022PTC149870',
    payMonth: 'September',
    payYear: '2026',
    employeeName: '',
    employeeId: 'EMP-2024-89',
    designation: 'Senior Software Engineer',
    department: 'Engineering & Product',
    doj: '15/06/2022',
    bankName: 'State Bank of India',
    bankAccount: '••••••••8912',
    ifsc: 'SBIN0001428',
    pan: 'ABCDE1234F',
    uan: '101298471928',
    totalDays: 30,
    paidDays: 30,
    lopDays: 0,
    basicPay: 28000,
    hra: 14000,
    conveyance: 3000,
    specialAllowance: 7500,
    pfDeduction: 1800,
    esiDeduction: 0,
    profTax: 208,
    tdsDeduction: 1500,
  });

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setLogoUrl(url);
  };

  // Add Dynamic Allowance
  const addEarning = () => {
    setExtraEarnings([
      ...extraEarnings,
      { id: Date.now().toString(), name: 'Other Allowance', amount: 1000 },
    ]);
  };

  // Add Dynamic Deduction
  const addDeduction = () => {
    setExtraDeductions([
      ...extraDeductions,
      { id: Date.now().toString(), name: 'Salary Advance / Loan', amount: 1000 },
    ]);
  };

  // Auto-calculated statutory
  const calculatedPf = useMemo(() => {
    if (!autoStatutory) return data.pfDeduction;
    // Standard EPFO rule: 12% of basic, capped at 1800 if desired or full 12%
    return Math.min(1800, Math.round(data.basicPay * 0.12));
  }, [data.basicPay, autoStatutory, data.pfDeduction]);

  const grossEarnings = useMemo(() => {
    const base = data.basicPay + data.hra + data.conveyance + data.specialAllowance;
    const extras = extraEarnings.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    return base + extras;
  }, [data.basicPay, data.hra, data.conveyance, data.specialAllowance, extraEarnings]);

  const totalDeductions = useMemo(() => {
    const base = calculatedPf + data.esiDeduction + data.profTax + data.tdsDeduction;
    const extras = extraDeductions.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    return base + extras;
  }, [calculatedPf, data.esiDeduction, data.profTax, data.tdsDeduction, extraDeductions]);

  const netPay = useMemo(() => Math.max(0, grossEarnings - totalDeductions), [grossEarnings, totalDeductions]);
  const netPayWords = useMemo(() => numberToIndianWords(netPay), [netPay]);

  // Generate Isolated Printable HTML
  const generateSlipHtml = (): string => {
    const isTa = lang === 'ta';
    return `
      <div style="
        width: 210mm;
        min-height: 297mm;
        margin: 0 auto;
        padding: 12mm 15mm;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #0F172A;
        background: #FFFFFF;
        box-sizing: border-box;
      ">
        <!-- Company Header Block -->
        <div style="border-bottom: 2px solid #0F172A; padding-bottom: 12px; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
          ${logoUrl ? `<img src="${logoUrl}" style="max-height: 48px; max-width: 140px; object-fit: contain;" alt="Logo" />` : '<div></div>'}
          <div style="text-align: ${logoUrl ? 'right' : 'center'}; flex: 1;">
            <h1 style="font-size: 16pt; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
              ${data.companyName}
            </h1>
            <p style="font-size: 9pt; color: #475569; margin: 2px 0 0 0;">${data.companyAddress}</p>
            ${data.companyCin ? `<p style="font-size: 8pt; color: #64748B; margin: 1px 0 0 0;">CIN / Reg No: ${data.companyCin}</p>` : ''}
          </div>
        </div>

        <!-- Payslip Title Bar -->
        <div style="background: #F1F5F9; border: 1px solid #CBD5E1; padding: 6px 12px; text-align: center; margin-bottom: 14px; border-radius: 4px;">
          <h2 style="font-size: 11pt; font-weight: 700; margin: 0; text-transform: uppercase; color: #0F172A;">
            ${isTa ? `சம்பள ரசீது — ${data.payMonth} ${data.payYear}` : `PAYSLIP FOR THE MONTH OF ${data.payMonth.toUpperCase()} ${data.payYear}`}
          </h2>
        </div>

        <!-- Employee & Attendance Info Grid -->
        <table style="width: 100%; border: 1px solid #CBD5E1; font-size: 9pt; margin-bottom: 14px; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600; width: 22%;">Employee Name</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; font-weight: 700; width: 28%; text-transform: uppercase;">${data.employeeName}</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600; width: 22%;">Employee ID</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; width: 28%; font-family: monospace;">${data.employeeId}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Designation</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0;">${data.designation}</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Department</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0;">${data.department}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Bank &amp; Account</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0;">${data.bankName} (${data.bankAccount})</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">IFSC Code</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; font-family: monospace;">${data.ifsc}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">PAN Number</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; font-family: monospace;">${data.pan}</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">UAN / PF Number</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; font-family: monospace;">${data.uan}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Paid / Working Days</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0;"><strong>${data.paidDays}</strong> / ${data.totalDays} Days</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 600;">Loss of Pay (LOP)</td>
              <td style="padding: 5px 8px; border: 1px solid #E2E8F0;">${data.lopDays} Days</td>
            </tr>
          </tbody>
        </table>

        <!-- Earnings & Deductions Dual Table -->
        <table style="width: 100%; border: 1px solid #0F172A; font-size: 9pt; margin-bottom: 14px; border-collapse: collapse;">
          <thead>
            <tr style="background: #0F172A; color: #FFFFFF;">
              <th style="padding: 6px 10px; text-align: left; width: 35%;">${isTa ? 'வருமானம் (Earnings)' : 'EARNINGS'}</th>
              <th style="padding: 6px 10px; text-align: right; width: 15%;">${isTa ? 'தொகை (₹)' : 'AMOUNT (₹)'}</th>
              <th style="padding: 6px 10px; text-align: left; width: 35%; border-left: 1px solid #475569;">${isTa ? 'பிடித்தங்கள் (Deductions)' : 'DEDUCTIONS'}</th>
              <th style="padding: 6px 10px; text-align: right; width: 15%;">${isTa ? 'தொகை (₹)' : 'AMOUNT (₹)'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0;">Basic Pay</td>
              <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${data.basicPay.toLocaleString('en-IN')}</td>
              <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">Provident Fund (EPF 12%)</td>
              <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${calculatedPf.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0;">House Rent Allowance (HRA)</td>
              <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${data.hra.toLocaleString('en-IN')}</td>
              <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">Employee State Insurance (ESIC)</td>
              <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${data.esiDeduction.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0;">Conveyance Allowance</td>
              <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${data.conveyance.toLocaleString('en-IN')}</td>
              <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">Professional Tax (PT)</td>
              <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${data.profTax.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0;">Special Allowance</td>
              <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${data.specialAllowance.toLocaleString('en-IN')}</td>
              <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">Tax Deducted at Source (TDS)</td>
              <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${data.tdsDeduction.toLocaleString('en-IN')}</td>
            </tr>

            <!-- Dynamic Extra Rows -->
            ${extraEarnings.map((earn, i) => `
              <tr>
                <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0;">${earn.name}</td>
                <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">₹${Number(earn.amount).toLocaleString('en-IN')}</td>
                <td style="padding: 5px 10px; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #CBD5E1;">
                  ${extraDeductions[i] ? extraDeductions[i].name : ''}
                </td>
                <td style="padding: 5px 10px; text-align: right; border-bottom: 1px solid #E2E8F0;">
                  ${extraDeductions[i] ? `₹${Number(extraDeductions[i].amount).toLocaleString('en-IN')}` : ''}
                </td>
              </tr>
            `).join('')}

            <!-- Subtotals Row -->
            <tr style="background: #F8FAFC; font-weight: 700; border-top: 1px solid #0F172A;">
              <td style="padding: 6px 10px;">${isTa ? 'மொத்த வருமானம் (Gross)' : 'Gross Earnings'}</td>
              <td style="padding: 6px 10px; text-align: right;">₹${grossEarnings.toLocaleString('en-IN')}</td>
              <td style="padding: 6px 10px; border-left: 1px solid #CBD5E1;">${isTa ? 'மொத்த பிடித்தங்கள்' : 'Total Deductions'}</td>
              <td style="padding: 6px 10px; text-align: right;">₹${totalDeductions.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <!-- Net Take Home Pay Highlight Box -->
        <div style="background: #F8FAFC; border: 2px solid #0F172A; border-radius: 4px; padding: 10px 14px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span style="font-size: 8.5pt; font-weight: 700; text-transform: uppercase; color: #475569; display: block;">
              ${isTa ? 'நிகர ஊதியம் (NET TAKE-HOME PAY)' : 'NET PAY TRANSFERRED TO BANK'}
            </span>
            <span style="font-size: 8.5pt; color: #334155; font-weight: 600;">${netPayWords}</span>
          </div>
          <div style="font-size: 16pt; font-weight: 800; color: #0F172A;">
            ₹${netPay.toLocaleString('en-IN')}
          </div>
        </div>

        <!-- Authorization Disclaimer & Signatures -->
        <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 8.5pt;">
          <div style="color: #64748B; max-width: 55%;">
            <p style="margin: 0; font-style: italic;">
              * This is a computer-generated salary slip and does not require a physical signature when verified with employee ID and PAN.
            </p>
          </div>
          <div style="text-align: center;">
            <div style="width: 180px; border-bottom: 1px solid #0F172A; margin-bottom: 4px;"></div>
            <p style="font-weight: 700; margin: 0; text-transform: uppercase;">Authorized Signatory</p>
            <p style="color: #475569; font-size: 8pt; margin: 0;">${data.companyName}</p>
          </div>
        </div>
      </div>
    `;
  };

  // Isolated 1-Click Print
  const handlePrint = () => {
    printIsolatedDocument({
      title: `${data.employeeName}_Payslip_${data.payMonth}_${data.payYear}`,
      bodyHtml: generateSlipHtml(),
      pageSize: 'A4',
      orientation: 'portrait',
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Engine Container */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Bilingual Salary Slip / Pay Slip Generator
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500 text-white uppercase tracking-wide">
                  ENGLISH + தமிழ்
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Generate bank-grade corporate pay slips with custom allowances, logo upload, and isolated print.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'ta' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white transition-all shadow-md active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>1-Click Print A4 Payslip</span>
            </button>
          </div>
        </div>

        {/* Studio Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Inputs */}
          <div className="lg:col-span-5 space-y-5 text-xs">
            {/* Employer Branding & Logo */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Company Branding &amp; Details</span>
                </span>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {logoUrl ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Replace Logo</span>
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={() => setLogoUrl(null)}
                      className="text-[10px] text-rose-500 font-bold hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload Logo</span>
                  </button>
                )}
              </span>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={data.companyName}
                  onChange={(e) => setData({ ...data, companyName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold uppercase"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Company Address</label>
                <input
                  type="text"
                  value={data.companyAddress}
                  onChange={(e) => setData({ ...data, companyAddress: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Pay Month</label>
                  <select
                    value={data.payMonth}
                    onChange={(e) => setData({ ...data, payMonth: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                  >
                    {[
                      'January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December',
                    ].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Pay Year</label>
                  <input
                    type="text"
                    value={data.payYear}
                    onChange={(e) => setData({ ...data, payYear: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Employee Details & Attendance */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span>Employee &amp; Attendance Info</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Employee Name</label>
                  <input
                    type="text"
                    value={data.employeeName}
                    onChange={(e) => setData({ ...data, employeeName: e.target.value })}
                    placeholder="e.g. Employee Full Name"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={data.employeeId}
                    onChange={(e) => setData({ ...data, employeeId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Designation</label>
                  <input
                    type="text"
                    value={data.designation}
                    onChange={(e) => setData({ ...data, designation: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Department</label>
                  <input
                    type="text"
                    value={data.department}
                    onChange={(e) => setData({ ...data, department: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Total Days</label>
                  <input
                    type="number"
                    value={data.totalDays}
                    onChange={(e) => setData({ ...data, totalDays: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Paid Days</label>
                  <input
                    type="number"
                    value={data.paidDays}
                    onChange={(e) => setData({ ...data, paidDays: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">LOP Days</label>
                  <input
                    type="number"
                    value={data.lopDays}
                    onChange={(e) => setData({ ...data, lopDays: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Compensation & Custom Allowances */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Earnings Breakdown (₹)</span>
                </span>
                <button
                  onClick={addEarning}
                  className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Item</span>
                </button>
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Basic Pay</label>
                  <input
                    type="number"
                    value={data.basicPay}
                    onChange={(e) => setData({ ...data, basicPay: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">HRA (Rent)</label>
                  <input
                    type="number"
                    value={data.hra}
                    onChange={(e) => setData({ ...data, hra: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Conveyance</label>
                  <input
                    type="number"
                    value={data.conveyance}
                    onChange={(e) => setData({ ...data, conveyance: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Special Allowance</label>
                  <input
                    type="number"
                    value={data.specialAllowance}
                    onChange={(e) => setData({ ...data, specialAllowance: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Dynamic Extra Allowances */}
              {extraEarnings.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...extraEarnings];
                      updated[index].name = e.target.value;
                      setExtraEarnings(updated);
                    }}
                    className="w-2/3 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => {
                      const updated = [...extraEarnings];
                      updated[index].amount = Number(e.target.value);
                      setExtraEarnings(updated);
                    }}
                    className="w-1/3 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  />
                  <button
                    onClick={() => setExtraEarnings(extraEarnings.filter((_, i) => i !== index))}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Deductions Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-rose-500" />
                  <span>Deductions (₹)</span>
                </span>
                <div className="flex items-center gap-3">
                  <label className="text-[10px] text-slate-500 flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={autoStatutory}
                      onChange={(e) => setAutoStatutory(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-indigo-600 accent-indigo-600"
                    />
                    <span>Auto EPF (12%)</span>
                  </label>
                  <button
                    onClick={addDeduction}
                    className="text-[10px] font-bold text-rose-500 hover:underline flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                    Provident Fund (EPF)
                  </label>
                  <input
                    type="number"
                    disabled={autoStatutory}
                    value={calculatedPf}
                    onChange={(e) => setData({ ...data, pfDeduction: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Professional Tax</label>
                  <input
                    type="number"
                    value={data.profTax}
                    onChange={(e) => setData({ ...data, profTax: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">TDS / Income Tax</label>
                  <input
                    type="number"
                    value={data.tdsDeduction}
                    onChange={(e) => setData({ ...data, tdsDeduction: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">ESIC</label>
                  <input
                    type="number"
                    value={data.esiDeduction}
                    onChange={(e) => setData({ ...data, esiDeduction: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Dynamic Extra Deductions */}
              {extraDeductions.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...extraDeductions];
                      updated[index].name = e.target.value;
                      setExtraDeductions(updated);
                    }}
                    className="w-2/3 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => {
                      const updated = [...extraDeductions];
                      updated[index].amount = Number(e.target.value);
                      setExtraDeductions(updated);
                    }}
                    className="w-1/3 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  />
                  <button
                    onClick={() => setExtraDeductions(extraDeductions.filter((_, i) => i !== index))}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (7 Cols): Live Payslip Sheet Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Live Corporate Payslip (A4 Standard)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300">
                Net Pay: ₹{netPay.toLocaleString('en-IN')}
              </span>
            </div>

            {/* A4 Preview Container */}
            <div className="w-full bg-slate-200 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-inner overflow-auto max-h-[880px]">
              <div
                className="bg-white text-slate-900 mx-auto shadow-xl rounded-xs p-6 text-xs transition-all"
                style={{ width: '100%', maxWidth: '210mm', minHeight: '297mm' }}
              >
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-3 mb-3 flex items-center justify-between gap-4">
                  {logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logoUrl} alt="Logo" className="max-h-12 max-w-[140px] object-contain" />
                  ) : (
                    <div />
                  )}
                  <div className={logoUrl ? 'text-right' : 'text-center w-full'}>
                    <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-900">
                      {data.companyName}
                    </h2>
                    <p className="text-[11px] text-slate-600 mt-0.5">{data.companyAddress}</p>
                    {data.companyCin && (
                      <p className="text-[10px] text-slate-400">CIN: {data.companyCin}</p>
                    )}
                  </div>
                </div>

                {/* Subheader */}
                <div className="bg-slate-100 border border-slate-300 py-1.5 px-3 text-center mb-4 rounded-sm font-bold uppercase tracking-wider text-slate-800">
                  {lang === 'ta' ? `சம்பள ரசீது — ${data.payMonth} ${data.payYear}` : `PAYSLIP FOR ${data.payMonth.toUpperCase()} ${data.payYear}`}
                </div>

                {/* Employee Details Grid */}
                <table className="w-full border border-slate-300 text-[11px] mb-4 border-collapse">
                  <tbody>
                    <tr>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold w-1/4">Employee Name</td>
                      <td className="p-1.5 border border-slate-200 font-bold uppercase w-1/4">{data.employeeName}</td>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold w-1/4">Employee ID</td>
                      <td className="p-1.5 border border-slate-200 font-mono font-bold w-1/4">{data.employeeId}</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold">Designation</td>
                      <td className="p-1.5 border border-slate-200">{data.designation}</td>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold">Department</td>
                      <td className="p-1.5 border border-slate-200">{data.department}</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold">Bank Details</td>
                      <td className="p-1.5 border border-slate-200">{data.bankName} ({data.bankAccount})</td>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold">IFSC Code</td>
                      <td className="p-1.5 border border-slate-200 font-mono">{data.ifsc}</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold">PAN Number</td>
                      <td className="p-1.5 border border-slate-200 font-mono">{data.pan}</td>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold">UAN / PF</td>
                      <td className="p-1.5 border border-slate-200 font-mono">{data.uan}</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold">Working Days</td>
                      <td className="p-1.5 border border-slate-200 font-bold">{data.paidDays} / {data.totalDays} Days</td>
                      <td className="p-1.5 bg-slate-50 border border-slate-200 font-semibold">Loss of Pay (LOP)</td>
                      <td className="p-1.5 border border-slate-200">{data.lopDays} Days</td>
                    </tr>
                  </tbody>
                </table>

                {/* Earnings & Deductions Table */}
                <table className="w-full border border-slate-900 text-[11px] mb-4 border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="p-1.5 text-left w-1/3">EARNINGS</th>
                      <th className="p-1.5 text-right w-1/6">AMOUNT (₹)</th>
                      <th className="p-1.5 text-left w-1/3 border-l border-slate-700">DEDUCTIONS</th>
                      <th className="p-1.5 text-right w-1/6">AMOUNT (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5">Basic Pay</td>
                      <td className="p-1.5 text-right">₹{data.basicPay.toLocaleString('en-IN')}</td>
                      <td className="p-1.5 border-l border-slate-300">Provident Fund (EPF)</td>
                      <td className="p-1.5 text-right">₹{calculatedPf.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5">House Rent Allowance (HRA)</td>
                      <td className="p-1.5 text-right">₹{data.hra.toLocaleString('en-IN')}</td>
                      <td className="p-1.5 border-l border-slate-300">Professional Tax (PT)</td>
                      <td className="p-1.5 text-right">₹{data.profTax.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5">Conveyance Allowance</td>
                      <td className="p-1.5 text-right">₹{data.conveyance.toLocaleString('en-IN')}</td>
                      <td className="p-1.5 border-l border-slate-300">TDS / Income Tax</td>
                      <td className="p-1.5 text-right">₹{data.tdsDeduction.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-1.5">Special Allowance</td>
                      <td className="p-1.5 text-right">₹{data.specialAllowance.toLocaleString('en-IN')}</td>
                      <td className="p-1.5 border-l border-slate-300">ESIC</td>
                      <td className="p-1.5 text-right">₹{data.esiDeduction.toLocaleString('en-IN')}</td>
                    </tr>

                    {/* Extras */}
                    {extraEarnings.map((earn, idx) => (
                      <tr key={earn.id} className="border-b border-slate-200">
                        <td className="p-1.5">{earn.name}</td>
                        <td className="p-1.5 text-right">₹{Number(earn.amount).toLocaleString('en-IN')}</td>
                        <td className="p-1.5 border-l border-slate-300">
                          {extraDeductions[idx] ? extraDeductions[idx].name : ''}
                        </td>
                        <td className="p-1.5 text-right">
                          {extraDeductions[idx] ? `₹${Number(extraDeductions[idx].amount).toLocaleString('en-IN')}` : ''}
                        </td>
                      </tr>
                    ))}

                    <tr className="bg-slate-50 font-bold border-t border-slate-900">
                      <td className="p-2">Gross Earnings</td>
                      <td className="p-2 text-right">₹{grossEarnings.toLocaleString('en-IN')}</td>
                      <td className="p-2 border-l border-slate-300">Total Deductions</td>
                      <td className="p-2 text-right">₹{totalDeductions.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Net Pay Callout */}
                <div className="border-2 border-slate-900 rounded-sm p-3 mb-8 flex items-center justify-between bg-slate-50">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                      NET TAKE-HOME PAY
                    </span>
                    <span className="text-[11px] font-bold text-slate-800">{netPayWords}</span>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900">
                    ₹{netPay.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Signature line */}
                <div className="mt-12 flex justify-between items-end text-[10px] text-slate-500">
                  <p className="max-w-[55%] italic">
                    * This is a computer-generated salary slip and does not require a physical signature when verified with employee ID and PAN.
                  </p>
                  <div className="text-center">
                    <div className="w-44 border-b border-slate-900 mb-1"></div>
                    <p className="font-bold uppercase text-slate-800">Authorized Signatory</p>
                    <p>{data.companyName}</p>
                  </div>
                </div>
              </div>
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
