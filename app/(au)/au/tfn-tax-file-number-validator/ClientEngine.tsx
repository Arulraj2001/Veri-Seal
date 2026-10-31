'use client';

import * as React from 'react';
import Link from 'next/link';
import {
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
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function TfnValidatorPage() {
  const [tfnInput, setTfnInput] = React.useState<string>('123 456 782');
  const [showTfn, setShowTfn] = React.useState<boolean>(false);

  // ATO Statutory 9-Digit Weights: [1, 4, 3, 7, 5, 8, 6, 9, 10]
  const NINE_DIGIT_WEIGHTS = [1, 4, 3, 7, 5, 8, 6, 9, 10];
  // ATO 8-Digit Legacy Weights: [10, 7, 8, 4, 6, 3, 5, 1]
  const EIGHT_DIGIT_WEIGHTS = [10, 7, 8, 4, 6, 3, 5, 1];

  const validation = React.useMemo(() => {
    const clean = tfnInput.replace(/\D/g, '');

    if (clean.length !== 8 && clean.length !== 9) {
      return {
        isValid: false,
        clean,
        error: `Invalid length: ${clean.length} digits (Australian TFNs are 8 or 9 digits)`,
        steps: [],
        sum: 0,
        remainder: -1,
        type: clean.length < 8 ? 'Incomplete' : 'Exceeds 9 digits',
      };
    }

    const digits = clean.split('').map(Number);
    const weights = clean.length === 9 ? NINE_DIGIT_WEIGHTS : EIGHT_DIGIT_WEIGHTS;

    let sum = 0;
    const steps = digits.map((digit, idx) => {
      const weight = weights[idx];
      const product = digit * weight;
      sum += product;
      return {
        idx,
        digit,
        weight,
        product,
      };
    });

    const remainder = sum % 11;
    const isValid = remainder === 0;

    return {
      isValid,
      clean,
      error: isValid ? null : `Modulus 11 checksum failed (${sum} % 11 = ${remainder} !== 0)`,
      steps,
      sum,
      remainder,
      type: clean.length === 9 ? 'Standard 9-Digit TFN' : 'Legacy 8-Digit TFN',
    };
  }, [tfnInput]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian Tax File Number (TFN) Modulus 11 Validator',
    operatingSystem: 'All',
    applicationCategory: 'SecurityApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Official ATO Modulus 11 algorithm validator for 9-digit and 8-digit Australian Tax File Numbers. 100% in-browser client-side privacy with zero data transmission.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/au" className="hover:text-amber-800 transition-colors">Australia Suite</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">TFN Modulus 11 Validator</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Lock className="w-3.5 h-3.5" />
          <span>Taxation Administration Act 1953 (TAA)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Tax File Number (TFN) Modulus 11 Checker &amp; Validator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Verify 8-digit and 9-digit Australian Tax File Numbers against the ATO&apos;s statutory Modulus 11 mathematical weighting algorithm. 100% client-side execution in compliance with the Privacy (Tax File Number) Rule 2015.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">TFN Input</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              ATO Mod 11
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Enter Tax File Number</label>
            <div className="relative">
              <input
                type={showTfn ? 'text' : 'password'}
                maxLength={12}
                value={tfnInput}
                onChange={(e) => setTfnInput(e.target.value)}
                placeholder="XXX XXX XXX"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-amber-600 font-mono text-slate-900 font-bold text-lg tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowTfn(!showTfn)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title={showTfn ? 'Hide TFN' : 'Show TFN'}
              >
                {showTfn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Strict Privacy Guarantee Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-black text-amber-950">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Strict Privacy Act Protection:</span>
            </div>
            <p className="leading-relaxed">
              This validator executes purely in your browser&apos;s memory. No Tax File Numbers are logged, transmitted, or recorded. Under Section 8WA of the Taxation Administration Act 1953, unauthorized collection of TFNs carries penalties of up to 2 years imprisonment.
            </p>
          </div>
        </div>

        {/* Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Verification Verdict
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                validation.isValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {validation.isValid ? 'Algorithm Passed' : 'Invalid TFN'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-white">
                {showTfn
                  ? validation.clean.length === 9
                    ? `${validation.clean.substring(0, 3)} ${validation.clean.substring(3, 6)} ${validation.clean.substring(6)}`
                    : validation.clean
                  : '••• ••• •••'}
              </div>
              <p className="text-xs text-slate-400">
                {validation.isValid
                  ? `${validation.type}: Modulo 11 check passed with zero remainder.`
                  : validation.error}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-slate-400">Weighted Product Sum:</div>
                <div className="font-mono font-bold text-white text-base mt-0.5">{validation.sum}</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-slate-400">Sum Modulo 11:</div>
                <div className={`font-mono font-bold text-base mt-0.5 ${validation.isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {validation.remainder} {validation.isValid ? '(Valid)' : '(Fail)'}
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Proof Matrix */}
          {validation.steps.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
                ATO Modulus 11 Weighting Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border border-slate-100 rounded-xl font-mono">
                  <thead className="bg-slate-50 text-slate-700 font-bold">
                    <tr>
                      <th className="py-2 px-2 text-center">Digit Position</th>
                      <th className="py-2 px-2 text-center">Digit</th>
                      <th className="py-2 px-2 text-center">Weight</th>
                      <th className="py-2 px-2 text-right">Product</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {validation.steps.map((step) => (
                      <tr key={step.idx} className="hover:bg-slate-50">
                        <td className="py-1 px-2 text-center text-slate-400">Pos {step.idx + 1}</td>
                        <td className="py-1 px-2 text-center font-bold text-slate-900">
                          {showTfn ? step.digit : '•'}
                        </td>
                        <td className="py-1 px-2 text-center text-amber-800 font-bold">{step.weight}</td>
                        <td className="py-1 px-2 text-right font-bold text-slate-900">{step.product}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold">
                      <td colSpan={3} className="py-2 px-2 text-right font-sans">Weighted Sum:</td>
                      <td className="py-2 px-2 text-right text-amber-800">{validation.sum}</td>
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
            Australian Taxation Office Modulus 11 Check Algorithm
          </h2>
          <p>
            The Australian Taxation Office issues 9-digit (and historically 8-digit) Tax File Numbers to individuals, companies, partnerships, and superannuation funds. The final digit acts as a check digit derived via Modulus 11 mathematics. For 9-digit TFNs, each digit is multiplied by its statutory weighting coefficient: [1, 4, 3, 7, 5, 8, 6, 9, 10]. If the cumulative sum is evenly divisible by 11 with no remainder, the number passes the structural validation test.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Privacy (Tax File Number) Rule 2015
          </h2>
          <p>
            Under the Privacy Act 1988 and the Privacy (Tax File Number) Rule 2015, TFNs may only be requested, used, or disclosed for authorized taxation, superannuation, and personal assistance purposes. Unlawful storage, sharing, or misuse of TFN information is a federal criminal offence carrying severe statutory penalties under Section 8WB of the Taxation Administration Act 1953.
          </p>
        </section>
      </article>
    </div>
  );
}

