'use client';

import * as React from 'react';
import { calculateFirmenwagenGermany, FirmenwagenResult } from '@/lib/international/germany-tax';
import { Car, Zap, Percent, Info, ShieldCheck } from 'lucide-react';

export function GermanyFirmenwagenEngine() {
  const [bruttolistenpreis, setBruttolistenpreis] = React.useState<number>(45000);
  const [antriebsart, setAntriebsart] = React.useState<'verbrenner' | 'hybrid' | 'elektro'>('verbrenner');
  const [entfernungWohnungArbeitsstaetteKm, setEntfernungWohnungArbeitsstaetteKm] = React.useState<number>(18);
  const [persoenlicherSteuersatzProzent, setPersoenlicherSteuersatzProzent] = React.useState<number>(35);

  const result: FirmenwagenResult = React.useMemo(() => {
    return calculateFirmenwagenGermany({
      bruttolistenpreis,
      antriebsart,
      entfernungWohnungArbeitsstaetteKm,
      persoenlicherSteuersatzProzent,
    });
  }, [bruttolistenpreis, antriebsart, entfernungWohnungArbeitsstaetteKm, persoenlicherSteuersatzProzent]);

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Car className="w-6 h-6 text-amber-600" />
            Fahrzeugdaten &amp; Arbeitsweg
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Geldwerter Vorteil nach § 6 Abs. 1 Nr. 4 EStG (1%-Regelung, 0,5% Hybrid, 0,25% Elektrofahrzeug).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bruttolistenpreis */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Inländischer Bruttolistenpreis (BLP) zur Erstzulassung (€)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1000"
                value={bruttolistenpreis || ''}
                onChange={(e) => setBruttolistenpreis(Math.max(Number(e.target.value), 0))}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                €
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              UVP des Herstellers inklusive Sonderausstattung und Umsatzsteuer (nicht der Rabattpreis).
            </p>
          </div>

          {/* Antriebsart */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Antriebsart des Dienstwagens
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAntriebsart('verbrenner')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                  antriebsart === 'verbrenner'
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Verbrenner (1%)
              </button>
              <button
                type="button"
                onClick={() => setAntriebsart('hybrid')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                  antriebsart === 'hybrid'
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Plug-in Hybrid (0,5%)
              </button>
              <button
                type="button"
                onClick={() => setAntriebsart('elektro')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                  antriebsart === 'elektro'
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Elektro (0,25%)
              </button>
            </div>
          </div>

          {/* Entfernung Wohnung - Arbeitsstätte */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Einfache Entfernung Wohnung &ndash; erste Tätigkeitsstätte (km)
            </label>
            <input
              type="number"
              min="0"
              max="200"
              value={entfernungWohnungArbeitsstaetteKm}
              onChange={(e) => setEntfernungWohnungArbeitsstaetteKm(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
            <span className="text-[11px] text-slate-500">
              0,03% des BLP je Kilometer und Kalendermonat (§ 8 Abs. 2 EStG).
            </span>
          </div>

          {/* Steuersatz */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Persönlicher Grenzsteuersatz (%)
            </label>
            <div className="flex gap-2">
              {[25, 30, 35, 42].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPersoenlicherSteuersatzProzent(s)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    persoenlicherSteuersatzProzent === s
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {s}%
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
            Geldwerter Vorteil Monatlich
          </span>
          <div className="text-3xl font-black font-mono">
            {result.geldwerterVorteilMonatlichGesamt.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Zu versteuernder Bruttobetrag auf der Lohnabrechnung
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Tatsächliche Netto-Kosten / Monat
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            ~{result.steuerlicheMehrbelastungMonatlich.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Effektiver Netto-Gehaltsverlust bei {persoenlicherSteuersatzProzent}% Steuersatz
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Geldwerter Vorteil Jährlich
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.geldwerterVorteilJaehrlich.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Anrechenbarer Listenpreis : {result.anrechenbarerListenpreis.toLocaleString('de-DE')} €
          </p>
        </div>
      </div>
    </div>
  );
}
