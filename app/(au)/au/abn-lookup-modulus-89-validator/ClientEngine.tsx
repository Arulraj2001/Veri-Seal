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
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function AbnValidatorPage() {
  const [abnInput, setAbnInput] = React.useState<string>('51 824 753 556'); // Atlassian Pty Ltd valid sample
  const [copied, setCopied] = React.useState<boolean>(false);

  // Statutory ABN Modulus 89 Weights
  const WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

  const validation = React.useMemo(() => {
    // Strip non-digits
    const clean = abnInput.replace(/\D/g, '');

    if (clean.length !== 11) {
      return {
        isValid: false,
        clean,
        error: clean.length < 11 ? `Incomplete: ${clean.length}/11 digits` : `Too long: ${clean.length} digits`,
        steps: [],
        sum: 0,
        remainder: -1,
        acn: null,
      };
    }

    const digits = clean.split('').map(Number);
    const adjustedFirstDigit = digits[0] - 1;

    let totalSum = 0;
    const steps = digits.map((digit, idx) => {
      const calculationDigit = idx === 0 ? adjustedFirstDigit : digit;
      const weight = WEIGHTS[idx];
      const product = calculationDigit * weight;
      totalSum += product;
      return {
        idx,
        originalDigit: digit,
        calculationDigit,
        weight,
        product,
      };
    });

    const remainder = totalSum % 89;
    const isValid = remainder === 0;

    // Digits 3 to 11 represent the 9-digit ACN for corporate entities
    const acn = clean.substring(2);

    return {
      isValid,
      clean,
      error: isValid ? null : `Modulus 89 checksum failed (Remainder ${remainder} !== 0)`,
      steps,
      sum: totalSum,
      remainder,
      acn,
    };
  }, [abnInput]);

  // Generate a random valid ABN for testing
  const handleGenerateValidAbn = () => {
    // Generate random 9-digit suffix
    const suffix = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    // Try candidate first two digits until remainder is 0
    for (let d1 = 1; d1 <= 9; d1++) {
      for (let d2 = 0; d2 <= 9; d2++) {
        const candidate = [d1, d2, ...suffix];
        let sum = (candidate[0] - 1) * WEIGHTS[0];
        for (let i = 1; i < 11; i++) {
          sum += candidate[i] * WEIGHTS[i];
        }
        if (sum % 89 === 0) {
          const formatted = `${candidate[0]}${candidate[1]} ${candidate[2]}${candidate[3]}${candidate[4]} ${candidate[5]}${candidate[6]}${candidate[7]} ${candidate[8]}${candidate[9]}${candidate[10]}`;
          setAbnInput(formatted);
          return;
        }
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(abnInput.replace(/\s+/g, ' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian Business Number (ABN) Modulus 89 Validator & ACN Extractor',
    operatingSystem: 'All',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Official Australian Business Number (ABN) 11-digit Modulus 89 check algorithm validator. Verify ABR numbers, extract 9-digit ACNs, and generate valid test ABNs.',
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
        <span className="text-slate-900 font-bold">ABN Modulus 89 Validator</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Building2 className="w-3.5 h-3.5" />
          <span>Australian Business Register (ABR) Modulus 89</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          ABN Lookup Modulus 89 Validator &amp; ACN Extractor
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Verify 11-digit Australian Business Numbers using the ATO&apos;s statutory Modulus 89 mathematical check algorithm, inspect the step-by-step weighted product proof, and extract the 9-digit Australian Company Number (ACN).
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">ABN Verification</h2>
            <button
              type="button"
              onClick={handleGenerateValidAbn}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate Test ABN</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Enter 11-Digit ABN</label>
            <div className="relative">
              <input
                type="text"
                maxLength={15}
                value={abnInput}
                onChange={(e) => setAbnInput(e.target.value)}
                placeholder="XX XXX XXX XXX"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-amber-600 font-mono text-slate-900 font-bold text-lg tracking-wider"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Copy ABN"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Input can be entered with or without spaces. Validated in real-time.
            </p>
          </div>

          {/* Quick Info Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Taxation Administration Act 1953:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              If an Australian supplier does not quote a valid ABN on an invoice exceeding $75, the paying enterprise is legally mandated to withhold 47% tax from the payment (No-ABN withholding under Section 12-190).
            </p>
          </div>
        </div>

        {/* Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Algorithm Verification Status
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                validation.isValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {validation.isValid ? 'Mathematically Valid' : 'Invalid ABN'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-white">
                {validation.clean.length === 11
                  ? `${validation.clean.substring(0, 2)} ${validation.clean.substring(2, 5)} ${validation.clean.substring(5, 8)} ${validation.clean.substring(8)}`
                  : validation.clean || 'No Digits'}
              </div>
              <p className="text-xs text-slate-400">
                {validation.isValid
                  ? `Weighted Sum: ${validation.sum} ÷ 89 = Exactly ${validation.sum / 89} (Remainder 0)`
                  : validation.error}
              </p>
            </div>

            {validation.isValid && validation.acn && (
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Corporate ACN Equivalent (Last 9 Digits):</span>
                  <div className="font-mono font-bold text-amber-300 mt-0.5">
                    {validation.acn.substring(0, 3)} {validation.acn.substring(3, 6)} {validation.acn.substring(6)}
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  ASIC ACN
                </span>
              </div>
            )}
          </div>

          {/* Mathematical Proof Table */}
          {validation.steps.length === 11 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
                Statutory Modulus 89 Calculation Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border border-slate-100 rounded-xl font-mono">
                  <thead className="bg-slate-50 text-slate-700 font-bold">
                    <tr>
                      <th className="py-2 px-2 text-center">Pos</th>
                      <th className="py-2 px-2 text-center">Digit</th>
                      <th className="py-2 px-2 text-center">Adj</th>
                      <th className="py-2 px-2 text-center">Weight</th>
                      <th className="py-2 px-2 text-right">Product</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {validation.steps.map((step) => (
                      <tr key={step.idx} className="hover:bg-slate-50">
                        <td className="py-1 px-2 text-center text-slate-400">{step.idx + 1}</td>
                        <td className="py-1 px-2 text-center font-bold text-slate-900">{step.originalDigit}</td>
                        <td className="py-1 px-2 text-center text-slate-500">{step.calculationDigit}</td>
                        <td className="py-1 px-2 text-center text-amber-800 font-bold">{step.weight}</td>
                        <td className="py-1 px-2 text-right font-bold text-slate-900">{step.product}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold">
                      <td colSpan={4} className="py-2 px-2 text-right font-sans">Total Weighted Sum:</td>
                      <td className="py-2 px-2 text-right text-amber-800">{validation.sum}</td>
                    </tr>
                    <tr className="bg-amber-50/50 font-bold">
                      <td colSpan={4} className="py-2 px-2 text-right font-sans">Total Modulo 89 ({validation.sum} % 89):</td>
                      <td className={`py-2 px-2 text-right ${validation.isValid ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {validation.remainder} {validation.isValid ? '(Valid)' : '(Fail)'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AdSlot */}
      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance */}
      <article className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Australian Business Register (ABR) Modulus 89 Algorithm
          </h2>
          <p>
            An Australian Business Number (ABN) is a unique 11-digit identifier issued by the Australian Business Register under the A New Tax System (Australian Business Number) Act 1999. The first two digits are check digits calculated via Modulus 89 arithmetic.
          </p>
          <p>
            The algorithm works by subtracting 1 from the first digit, multiplying each of the eleven digits by its predetermined weighting coefficient [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19], and summing the products. A valid ABN produces a total sum that is divisible by 89 with zero remainder.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            ABN to ACN Structural Relationship
          </h2>
          <p>
            For corporate entities registered with the Australian Securities and Investments Commission (ASIC), an ABN is formed by prefixing the company&apos;s 9-digit Australian Company Number (ACN) with two check digits. Thus, digits 3 to 11 of any Australian company ABN constitute its official ASIC corporate registration identifier.
          </p>
        </section>
      </article>
    </div>
  );
}

