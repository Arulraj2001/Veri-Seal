'use client';

import * as React from 'react';
import {
  calculateGrunderwerbsteuerGermany,
  BundeslandKey,
  GRUNDERWERBSTEUER_SAETZE,
  GrunderwerbsteuerResult,
} from '@/lib/international/germany-tax';
import { Landmark, MapPin, Calculator, Info } from 'lucide-react';

export function GermanyGrunderwerbsteuerEngine() {
  const [kaufpreis, setKaufpreis] = React.useState<number>(350000);
  const [bundesland, setBundesland] = React.useState<BundeslandKey>('NW');

  const result: GrunderwerbsteuerResult = React.useMemo(() => {
    return calculateGrunderwerbsteuerGermany(kaufpreis, bundesland);
  }, [kaufpreis, bundesland]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-600" />
            Kaufpreis &amp; Bundesland
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Offizielle Grunderwerbsteuersätze der 16 deutschen Bundesländer nach dem Grunderwerbsteuergesetz (GrEStG).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kaufpreis */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Notarieller Kaufpreis der Immobilie (€)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="5000"
                value={kaufpreis || ''}
                onChange={(e) => setKaufpreis(Math.max(Number(e.target.value), 0))}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                €
              </span>
            </div>
          </div>

          {/* Bundesland */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Bundesland der Immobilie
            </label>
            <select
              value={bundesland}
              onChange={(e) => setBundesland(e.target.value as BundeslandKey)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            >
              {(Object.keys(GRUNDERWERBSTEUER_SAETZE) as BundeslandKey[]).map((key) => {
                const item = GRUNDERWERBSTEUER_SAETZE[key];
                return (
                  <option key={key} value={key}>
                    {item.name} ({item.satz.toFixed(1)} %)
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Fällige Grunderwerbsteuer
          </span>
          <div className="text-3xl font-black font-mono">
            {result.steuerbetrag.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Steuersatz in {result.bundeslandName} : {result.steuersatzProzent}%
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Gesamtpreis inkl. Steuer
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.gesamtpreisInklSteuer.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Kaufpreis + Steuerbetrag (ohne Notar &amp; Makler)
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Bundesland Steuersatz
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.steuersatzProzent.toFixed(1)} %
          </div>
          <p className="text-xs text-slate-500">
            Spanne reicht von 3,5% (Bayern) bis 6,5% (z.B. NRW, Hessen)
          </p>
        </div>
      </div>
    </div>
  );
}
