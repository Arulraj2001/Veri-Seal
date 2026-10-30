'use client';

import * as React from 'react';
import { validateIbanGermany, GermanyIbanResult } from '@/lib/international/germany-tax';
import { CheckCircle2, AlertCircle, Building2, Copy, Check } from 'lucide-react';

export function GermanyIbanEngine() {
  const [ibanInput, setIbanInput] = React.useState<string>('DE89 3704 0044 0532 0130 00');
  const [copied, setCopied] = React.useState<boolean>(false);

  const result: GermanyIbanResult = React.useMemo(() => {
    return validateIbanGermany(ibanInput);
  }, [ibanInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.ibanFormatiert);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-600" />
            Deutsche IBAN prüfen &amp; Bankleitzahl auflösen
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Offizieller Prüfziffern-Algorithmus ISO 13616 / MOD 97-10 und Bundesbank BLZ-Verzeichnis.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            Deutsche IBAN (22 Stellen)
          </label>
          <div className="relative">
            <input
              type="text"
              value={ibanInput}
              onChange={(e) => setIbanInput(e.target.value)}
              placeholder="DE..."
              className="w-full pl-4 pr-24 py-3.5 rounded-xl border border-slate-300 font-mono text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50 uppercase tracking-widest"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Kopiert' : 'Kopieren'}
            </button>
          </div>
          <div className="flex gap-2 pt-1 flex-wrap">
            <span className="text-xs text-slate-500">Muster-IBANs:</span>
            <button
              type="button"
              onClick={() => setIbanInput('DE89370400440532013000')}
              className="text-xs text-amber-700 underline font-mono"
            >
              Commerzbank
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => setIbanInput('DE27100700240123456789')}
              className="text-xs text-amber-700 underline font-mono"
            >
              Deutsche Bank
            </button>
          </div>
        </div>
      </div>

      {/* Validation Result Box */}
      <div
        className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 transition-all ${
          result.valide
            ? 'bg-emerald-50/40 border-emerald-200'
            : 'bg-rose-50/40 border-rose-200'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-2xl bg-white shadow-xs shrink-0">
            {result.valide ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            ) : (
              <AlertCircle className="w-8 h-8 text-rose-600" />
            )}
          </div>
          <div className="space-y-1">
            <h3
              className={`text-lg font-black ${
                result.valide ? 'text-emerald-900' : 'text-rose-900'
              }`}
            >
              {result.message}
            </h3>
            <p className="text-xs text-slate-600">
              {result.valide
                ? 'Die Bankleitzahl und Kontonummer sind mathematisch konsistent und die Prüfsumme stimmt überein.'
                : 'Die IBAN ist fehlerhaft. Bei einer Überweisung würde die Bank den Auftrag ablehnen.'}
            </p>
          </div>
        </div>

        {result.valide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-emerald-200/60 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white border border-emerald-100">
              <span className="text-slate-500 block uppercase font-sans">Kreditinstitut (Bank)</span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                {result.bankName}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-emerald-100">
              <span className="text-slate-500 block uppercase font-sans">Bankleitzahl (BLZ)</span>
              <span className="text-base font-bold text-slate-900 mt-1 block tracking-wider">
                {result.bankleitzahl}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-emerald-100">
              <span className="text-slate-500 block uppercase font-sans">Kontonummer</span>
              <span className="text-base font-bold text-emerald-700 mt-1 block tracking-wider">
                {result.kontonummer}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
