'use client';

import * as React from 'react';
import { calculateMietkautionGermany, MietkautionResult } from '@/lib/international/germany-tax';
import { ShieldCheck, Wallet, Calendar, AlertCircle } from 'lucide-react';

export function GermanyMietkautionEngine() {
  const [nettokaltmiete, setNettokaltmiete] = React.useState<number>(750);

  const result: MietkautionResult = React.useMemo(() => {
    return calculateMietkautionGermany(nettokaltmiete);
  }, [nettokaltmiete]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            Mietkaution nach § 551 BGB berechnen
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gesetzliche Obergrenze von maximal 3 Nettokaltmieten und gesetzlicher Anspruch auf Zahlung in 3 Monatsraten.
          </p>
        </div>

        <div className="max-w-md space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            Vereinbarte monatliche Nettokaltmiete (€)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="50"
              value={nettokaltmiete || ''}
              onChange={(e) => setNettokaltmiete(Math.max(Number(e.target.value), 0))}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
              €
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Achtung: Heiz- und Betriebskostenvorauszahlungen dürfen laut BGB nicht in die Kaution eingerechnet werden!
          </p>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Gesetzliche Höchstgrenze der Kaution
          </span>
          <div className="text-4xl font-black font-mono">
            {result.maximaleKautionGesetzlich.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Exakt 3 Nettokaltmieten (§ 551 Abs. 1 BGB). Jede höhere Forderung ist unwirksam!
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Gesetzliche 3-Raten-Zahlung (§ 551 Abs. 2)
          </span>
          <div className="text-4xl font-black font-mono text-emerald-600">
            {result.monatlicheRateDreiRaten.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            3 gleiche Raten: 1. Rate zu Mietbeginn, 2. &amp; 3. Rate mit den folgenden Monatsmieten.
          </p>
        </div>
      </div>
    </div>
  );
}
