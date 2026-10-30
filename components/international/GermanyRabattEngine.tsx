'use client';

import * as React from 'react';
import { calculateRabattGermany } from '@/lib/international/germany-tax';
import { Tag, Percent, ArrowDownRight, Sparkles } from 'lucide-react';

export function GermanyRabattEngine() {
  const [grundpreis, setGrundpreis] = React.useState<number>(129);
  const [rabattProzent, setRabattProzent] = React.useState<number>(25);

  const result = React.useMemo(() => {
    return calculateRabattGermany(grundpreis, rabattProzent);
  }, [grundpreis, rabattProzent]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Tag className="w-6 h-6 text-amber-600" />
            Ausgangspreis &amp; Rabattprozentsatz
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Prozentrechner für Preisnachlässe, Schlussverkäufe, Rabattaktionen und Preisreduzierungen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Ursprünglicher Preis (€)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={grundpreis || ''}
              onChange={(e) => setGrundpreis(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Rabatt in Prozent (%)
            </label>
            <div className="flex gap-2 flex-wrap">
              {[10, 20, 25, 30, 50, 70].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setRabattProzent(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-mono font-bold transition-all ${
                    rabattProzent === p
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  -{p}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Endpreis nach Rabatt
          </span>
          <div className="text-4xl font-black font-mono">
            {result.ermaessigterPreis.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Sie zahlen nur noch {(100 - rabattProzent)}% des Ausgangspreises
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Ersparnis in Euro
          </span>
          <div className="text-4xl font-black font-mono text-emerald-600">
            -{result.ersparnis.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Effektiver Rabattbetrag an der Kasse
          </p>
        </div>
      </div>
    </div>
  );
}
