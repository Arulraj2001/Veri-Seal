'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles,
  Info,
  DollarSign,
  TrendingDown,
  CheckCircle2,
  Clock,
  HelpCircle,
  Copy,
  Check,
  Scale,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { SITE_URL } from '@/lib/constants';

export default function NumberToWordsAudConverterPage() {
  const [numericAmount, setNumericAmount] = React.useState<number>(145250.75);
  const [formatStyle, setFormatStyle] = React.useState<'title' | 'upper' | 'cheque'>('title');
  const [copied, setCopied] = React.useState<boolean>(false);

  // Australian English Number to Words Conversion Logic
  const wordsResult = React.useMemo(() => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const convertChunk = (num: number): string => {
      let str = '';
      if (num >= 100) {
        str += units[Math.floor(num / 100)] + ' Hundred ';
        num %= 100;
        if (num > 0) str += 'and ';
      }
      if (num >= 20) {
        str += tens[Math.floor(num / 10)];
        if (num % 10 > 0) str += '-' + units[num % 10];
        str += ' ';
      } else if (num > 0) {
        str += units[num] + ' ';
      }
      return str;
    };

    const dollars = Math.floor(numericAmount);
    const cents = Math.round((numericAmount - dollars) * 100);

    if (dollars === 0 && cents === 0) {
      return 'Zero Australian Dollars and Zero Cents (AUD)';
    }

    let words = '';
    const billions = Math.floor(dollars / 1000000000);
    const millions = Math.floor((dollars % 1000000000) / 1000000);
    const thousands = Math.floor((dollars % 1000000) / 1000);
    const remainderDollars = dollars % 1000;

    if (billions > 0) words += convertChunk(billions) + 'Billion ';
    if (millions > 0) words += convertChunk(millions) + 'Million ';
    if (thousands > 0) words += convertChunk(thousands) + 'Thousand ';
    if (remainderDollars > 0) words += convertChunk(remainderDollars);

    const dollarWord = dollars === 1 ? 'Australian Dollar' : 'Australian Dollars';
    const centsWord = cents === 1 ? 'Cent' : 'Cents';
    const centsString = cents > 0 ? `${convertChunk(cents).trim()} ${centsWord}` : 'Zero Cents';

    let formattedResult = '';
    if (formatStyle === 'upper') {
      formattedResult = `(${words.trim()} ${dollarWord} and ${centsString} AUD)`.toUpperCase();
    } else if (formatStyle === 'cheque') {
      formattedResult = `${words.trim()} Dollars and ${cents.toString().padStart(2, '0')}/100 AUD Only`;
    } else {
      formattedResult = `${words.trim()} ${dollarWord} and ${centsString} (AUD)`;
    }

    return formattedResult;
  }, [numericAmount, formatStyle]);

  const handleCopy = () => {
    navigator.clipboard.writeText(wordsResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Australian Dollar (AUD) Number to Words Legal Converter',
    operatingSystem: 'All',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description:
      'Official Australian legal currency wording converter compliant with the Bills of Exchange Act 1909 s.14. Convert AUD numbers to words for cheques, loan deeds, and contracts.',
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
        <span className="text-slate-900 font-bold">AUD Number to Words</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Scale className="w-3.5 h-3.5" />
          <span>Bills of Exchange Act 1909 Section 14</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          AUD Legal Number to Words Currency Converter
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Convert Australian Dollar amounts into formal legal wording for bank cheques, commercial deeds, promissory notes, and property conveyance settlement adjustments.
        </p>
      </div>

      {/* Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">Currency Amount</h2>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              AUD ($)
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Enter Number / Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={numericAmount}
                onChange={(e) => setNumericAmount(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-amber-600 font-mono text-slate-900 font-bold text-lg"
              />
            </div>
          </div>

          {/* Format Options */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Legal Output Style</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormatStyle('title')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${
                  formatStyle === 'title' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Standard Title
              </button>
              <button
                type="button"
                onClick={() => setFormatStyle('upper')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${
                  formatStyle === 'upper' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Legal Deed (CAPS)
              </button>
              <button
                type="button"
                onClick={() => setFormatStyle('cheque')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${
                  formatStyle === 'cheque' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Cheque Format
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-900">Bills of Exchange Act 1909 s.14(2):</span>
            <p className="leading-relaxed">
              &quot;Where the sum payable is expressed in words and also in figures, and there is a discrepancy between the two, the sum denoted by the words is the amount payable.&quot;
            </p>
          </div>
        </div>

        {/* Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Official Legal Currency Wording
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-white leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                &ldquo;{wordsResult}&rdquo;
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Figures: ${numericAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AUD
              </p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">
              Sample Promissory / Deed Covenant Clause
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-serif text-xs text-slate-800 leading-relaxed italic">
              &quot;The Borrower irrevocably covenants to pay to the Lender the principal sum of <strong>{wordsResult}</strong> on or before the Maturity Date without deduction, set-off, or counterclaim.&quot;
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
            Australian Common Law and the Bills of Exchange Act 1909
          </h2>
          <p>
            In commercial contract law and banking conveyance across Australia, expressing consideration in words serves as the conclusive legal barrier against clerical transposition errors and check alteration fraud. Under Section 14 of the Bills of Exchange Act 1909, words hold absolute legal supremacy over numerical figures if a discrepancy arises in a financial instrument.
          </p>
        </section>
      </article>
    </div>
  );
}

