'use client';

import * as React from 'react';
import { calculateBaufinanzierungGermany, BaufinanzierungResult } from '@/lib/international/germany-tax';
import { Landmark, Calculator, Percent, ShieldCheck } from 'lucide-react';

export function GermanyBaufinanzierungEngine() {
  const [darlehensbetrag, setDarlehensbetrag] = React.useState<number>(300000);
  const [sollzinsProzent, setSollzinsProzent] = React.useState<number>(3.6);
  const [anfaenglicheTilgungProzent, setAnfaenglicheTilgungProzent] = React.useState<number>(2.0);
  const [zinsbindungJahre, setZinsbindungJahre] = React.useState<number>(15);

  const result: BaufinanzierungResult = React.useMemo(() => {
    return calculateBaufinanzierungGermany({
      darlehensbetrag,
      sollzinsProzent,
      anfaenglicheTilgungProzent,
      zinsbindungJahre,
    });
  }, [darlehensbetrag, sollzinsProzent, anfaenglicheTilgungProzent, zinsbindungJahre]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-amber-600" />
            Darlehensbetrag &amp; Konditionen
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Annuitätendarlehen mit gebundenem Sollzinssatz und anfänglicher Tilgung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Darlehensbetrag / Nettodarlehen (€)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={darlehensbetrag || ''}
              onChange={(e) => setDarlehensbetrag(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Gebundener Sollzins p.a. (%)
            </label>
            <input
              type="number"
              min="0.1"
              max="15"
              step="0.05"
              value={sollzinsProzent || ''}
              onChange={(e) => setSollzinsProzent(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Anfängliche Tilgung (%)
            </label>
            <div className="flex gap-2">
              {[1.5, 2.0, 2.5, 3.0].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAnfaenglicheTilgungProzent(t)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    anfaenglicheTilgungProzent === t
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t.toFixed(1)}%
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Zinsbindungsfrist (Jahre)
            </label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => setZinsbindungJahre(j)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    zinsbindungJahre === j
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {j} J.
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Monatliche Kreditrate (Annuität)
          </span>
          <div className="text-3xl font-black font-mono">
            {result.monatlicheRate.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Feste Rate für die nächsten {zinsbindungJahre} Jahre
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Restschuld nach {zinsbindungJahre} Jahren
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.restschuldNachZinsbindung.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Bereits getilgt : {result.getilgterBetragGesamt.toLocaleString('de-DE')} €
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Gezahlte Zinsen Gesamt
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.gezahlteZinsenGesamt.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Zinskosten über die gesamte Zinsbindung
          </p>
        </div>
      </div>
    </div>
  );
}
