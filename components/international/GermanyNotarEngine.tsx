'use client';

import * as React from 'react';
import { calculateNotarGrundbuchGermany, NotarGrundbuchResult } from '@/lib/international/germany-tax';
import { Landmark, Home, Calculator, Info } from 'lucide-react';

export function GermanyNotarEngine() {
  const [kaufpreisImmobilie, setKaufpreisImmobilie] = React.useState<number>(350000);
  const [grundschuldbetrag, setGrundschuldbetrag] = React.useState<number>(280000);

  const result: NotarGrundbuchResult = React.useMemo(() => {
    return calculateNotarGrundbuchGermany({
      kaufpreisImmobilie,
      grundschuldbetrag,
    });
  }, [kaufpreisImmobilie, grundschuldbetrag]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-amber-600" />
            Kaufpreis &amp; Grundschuldbestellung
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gesetzliche Notar- und Grundbuchamtsgebühren nach Gerichts- und Notarkostengesetz (GNotKG).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Kaufpreis der Immobilie (€)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="5000"
                value={kaufpreisImmobilie || ''}
                onChange={(e) => setKaufpreisImmobilie(Math.max(Number(e.target.value), 0))}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                €
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              {[200000, 350000, 500000, 750000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setKaufpreisImmobilie(val)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono font-medium transition-colors ${
                    kaufpreisImmobilie === val
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  }`}
                >
                  {(val / 1000).toFixed(0)} k€
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Einzutragende Grundschuld (€)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="5000"
                value={grundschuldbetrag || ''}
                onChange={(e) => setGrundschuldbetrag(Math.max(Number(e.target.value), 0))}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                €
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Darlehenssumme zur Absicherung der Bank im Grundbuch (0 € bei Barzahlung).
            </p>
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Gesamtkosten Notar &amp; Grundbuch
          </span>
          <div className="text-3xl font-black font-mono">
            {result.gesamtkostenNotarUndGrundbuch.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Entspricht ca. {result.kostenquoteVomKaufpreisProzent}% des Kaufpreises
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Notarkosten (inkl. 19% MwSt.)
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {(result.notargebuehrenNetto + result.notarTvaMwSt).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Beurkundung Kaufvertrag, Grundschuld &amp; Betreuungsgebühr
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Grundbuchamtsgebühren
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.grundbuchamtsgebuehren.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Auflassungsvormerkung, Eigentumsumschreibung &amp; Grundschuld
          </p>
        </div>
      </div>
    </div>
  );
}

