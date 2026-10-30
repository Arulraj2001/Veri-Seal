'use client';

import * as React from 'react';
import { convertNumberToFrenchWords } from '@/lib/international/france-tax';
import type { NumberToWordsResult } from '@/lib/international/types';
import { Copy, Check, Sparkles } from 'lucide-react';

export function NumberToWordsEngine() {
  const [numInput, setNumInput] = React.useState<number>(1450.75);
  const [copied, setCopied] = React.useState(false);

  const result: NumberToWordsResult = React.useMemo(() => {
    return convertNumberToFrenchWords(numInput);
  }, [numInput]);

  const handleCopy = () => {
    if (result.formattedOfficial) {
      navigator.clipboard.writeText(result.formattedOfficial);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sampleValues = [150, 480.50, 1250, 3499.99, 10000];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
      <div className="space-y-2">
        <label htmlFor="amount-input" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
          Montant en Chiffres (€)
        </label>
        <div className="relative">
          <input
            id="amount-input"
            type="number"
            step="0.01"
            min="0"
            value={numInput}
            onChange={(e) => setNumInput(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xl font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[10px] text-slate-400 font-mono">Exemples courants :</span>
          {sampleValues.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setNumInput(v)}
              className="text-[11px] font-mono px-2 py-0.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              {v} €
            </button>
          ))}
        </div>
      </div>

      {/* Output Display */}
      <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 text-blue-950 space-y-3 relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Écriture Officielle en Toutes Lettres
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-blue-300 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-all cursor-pointer shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>

        <div className="text-lg sm:text-2xl font-bold font-serif leading-relaxed text-slate-900">
          « {result.formattedOfficial} »
        </div>

        <div className="text-[11px] text-blue-800/80 pt-2 border-t border-blue-200/60">
          Format normalisé conforme pour la rédaction de chèques bancaires et mentions obligatoires de facturation.
        </div>
      </div>
    </div>
  );
}

