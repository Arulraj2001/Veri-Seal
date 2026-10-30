'use client';

import * as React from 'react';
import { calculateSkontoGermany, SkontoResult } from '@/lib/international/germany-tax';
import { Percent, TrendingUp, DollarSign, Info } from 'lucide-react';

export function GermanySkontoEngine() {
  const [rechnungsbetragBrutto, setRechnungsbetragBrutto] = React.useState<number>(5000);
  const [skontoSatzProzent, setSkontoSatzProzent] = React.useState<number>(2.0);
  const [skontoFristTage, setSkontoFristTage] = React.useState<number>(10);
  const [nettoZahlungszielTage, setNettoZahlungszielTage] = React.useState<number>(30);

  const result: SkontoResult = React.useMemo(() => {
    return calculateSkontoGermany({
      rechnungsbetragBrutto,
      skontoSatzProzent,
      skontoFristTage,
      nettoZahlungszielTage,
    });
  }, [rechnungsbetragBrutto, skontoSatzProzent, skontoFristTage, nettoZahlungszielTage]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Percent className="w-6 h-6 text-amber-600" />
            Rechnungsbetrag &amp; Skontokonditionen
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Berechnung des Skontoabzugs und des effektiven Jahreszinses (Lieferantenkredit vs. Kontokorrentkredit).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Rechnungsbetrag brutto (€)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={rechnungsbetragBrutto || ''}
              onChange={(e) => setRechnungsbetragBrutto(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Skontosatz (%)
            </label>
            <div className="flex gap-2">
              {[1.0, 2.0, 3.0, 4.0].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSkontoSatzProzent(s)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    skontoSatzProzent === s
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {s.toFixed(1)}%
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Skontofrist (z.B. 10 Tage)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={skontoFristTage}
              onChange={(e) => setSkontoFristTage(Math.max(Number(e.target.value), 1))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Reguläres Zahlungsziel netto (z.B. 30 Tage)
            </label>
            <input
              type="number"
              min="2"
              max="120"
              value={nettoZahlungszielTage}
              onChange={(e) => setNettoZahlungszielTage(Math.max(Number(e.target.value), 2))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Zahlbetrag mit Skonto
          </span>
          <div className="text-3xl font-black font-mono">
            {result.zahlbetragMitSkonto.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Sie sparen exakt {result.skontobetrag.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Effektiver Jahreszins
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.effektiverJahreszinsProzent.toFixed(1)} % p.a.
          </div>
          <p className="text-xs text-slate-500">
            Vergleichszinssatz des Lieferantenkredits
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Kreditvergleich-Empfehlung
          </span>
          <div className="text-xl font-black text-emerald-600 pt-1">
            {result.lohntSichKreditaufnahme ? 'Skonto unbedingt ziehen!' : 'Skontonutzung prüfen'}
          </div>
          <p className="text-xs text-slate-500">
            Selbst mit 10–12% Dispo-Zins lohnt sich die vorzeitige Zahlung finanziell.
          </p>
        </div>
      </div>
    </div>
  );
}
