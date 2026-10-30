'use client';

import * as React from 'react';
import { calculateGewerbesteuerGermany, GewerbesteuerResult } from '@/lib/international/germany-tax';
import { Building2, Percent, Calculator, ShieldCheck } from 'lucide-react';

export function GermanyGewerbesteuerEngine() {
  const [gewerbeertragVorVerlust, setGewerbeertragVorVerlust] = React.useState<number>(60000);
  const [rechtsform, setRechtsform] = React.useState<'einzelunternehmen' | 'kapitalgesellschaft'>('einzelunternehmen');
  const [hebesatzGemeindeProzent, setHebesatzGemeindeProzent] = React.useState<number>(410);

  const result: GewerbesteuerResult = React.useMemo(() => {
    return calculateGewerbesteuerGermany({
      gewerbeertragVorVerlust,
      rechtsform,
      hebesatzGemeindeProzent,
    });
  }, [gewerbeertragVorVerlust, rechtsform, hebesatzGemeindeProzent]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-600" />
            Gewerbeertrag &amp; Hebesatz der Gemeinde
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gewerbesteuerberechnung nach § 11 und § 14 GewStG (Steuermesszahl 3,5% und ESt-Anrechnung nach § 35 EStG).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Gewerbeertrag vor Steuern (€)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={gewerbeertragVorVerlust || ''}
              onChange={(e) => setGewerbeertragVorVerlust(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Rechtsform des Unternehmens
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRechtsform('einzelunternehmen')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                  rechtsform === 'einzelunternehmen'
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Einzelunternehmer / GbR (24.500 € Freibetrag)
              </button>
              <button
                type="button"
                onClick={() => setRechtsform('kapitalgesellschaft')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                  rechtsform === 'kapitalgesellschaft'
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                GmbH / UG (Kein Freibetrag)
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Hebesatz der Gemeinde (%)
            </label>
            <input
              type="number"
              min="200"
              max="900"
              step="5"
              value={hebesatzGemeindeProzent || ''}
              onChange={(e) => setHebesatzGemeindeProzent(Math.max(Number(e.target.value), 200))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
            <span className="text-[11px] text-slate-500">
              Beispiele: Berlin 410%, Hamburg 470%, München 490%, Frankfurt 460%.
            </span>
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Fällige Gewerbesteuer (Zahllast)
          </span>
          <div className="text-3xl font-black font-mono">
            {result.gewerbesteuerZahllast.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Steuermessbetrag ({result.steuermessbetrag.toLocaleString('de-DE')} €) × {hebesatzGemeindeProzent}%
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Einkommensteuer-Ermäßigung (§ 35 EStG)
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            -{result.anrechnungEStMaximal.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Maximal auf die Einkommensteuer anrechenbar
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Steuerpflichtiger Ertrag
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.steuerpflichtigerErtrag.toLocaleString('de-DE')} €
          </div>
          <p className="text-xs text-slate-500">
            Nach Abzug des Freibetrags ({result.freibetrag.toLocaleString('de-DE')} €)
          </p>
        </div>
      </div>
    </div>
  );
}
