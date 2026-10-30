'use client';

import * as React from 'react';
import { calculateKugGermany, KugResult } from '@/lib/international/germany-tax';
import { Briefcase, Users, Calculator, ShieldCheck } from 'lucide-react';

export function GermanyKugEngine() {
  const [sollEntgeltBrutto, setSollEntgeltBrutto] = React.useState<number>(3500);
  const [istEntgeltBrutto, setIstEntgeltBrutto] = React.useState<number>(1750); // 50% Kurzarbeit
  const [steuerklasse, setSteuerklasse] = React.useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [hatKinder, setHatKinder] = React.useState<boolean>(false);

  const result: KugResult = React.useMemo(() => {
    return calculateKugGermany({
      sollEntgeltBrutto,
      istEntgeltBrutto,
      steuerklasse,
      hatKinder,
    });
  }, [sollEntgeltBrutto, istEntgeltBrutto, steuerklasse, hatKinder]);

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-600" />
            Gehaltsdaten &amp; Arbeitsausfall
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Berechnung des Kurzarbeitergeldes nach § 105 und § 106 SGB III (Leistungssatz 60% bzw. 67% mit Kindern).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Soll-Entgelt */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Reguläres Bruttomonatsgehalt ohne Kurzarbeit (€)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={sollEntgeltBrutto || ''}
              onChange={(e) => setSollEntgeltBrutto(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          {/* Ist-Entgelt */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Tatsächlich erzieltes Brutto während Kurzarbeit (€)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={istEntgeltBrutto || ''}
              onChange={(e) => setIstEntgeltBrutto(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
            <span className="text-[11px] text-slate-500">
              Tragen Sie 0 € ein bei Kurzarbeit Null (100% Arbeitsausfall).
            </span>
          </div>

          {/* Steuerklasse */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Lohnsteuerklasse
            </label>
            <div className="flex gap-2">
              {([1, 2, 3, 4, 5, 6] as const).map((sk) => (
                <button
                  key={sk}
                  type="button"
                  onClick={() => setSteuerklasse(sk)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    steuerklasse === sk
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {sk}
                </button>
              ))}
            </div>
          </div>

          {/* Kinder */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Kinderfreibetrag vorhanden?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHatKinder(false)}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  !hatKinder
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Nein (60% KUG)
              </button>
              <button
                type="button"
                onClick={() => setHatKinder(true)}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  hatKinder
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Ja (67% KUG)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Gesamtes Nettoeinkommen im Monat
          </span>
          <div className="text-3xl font-black font-mono">
            {result.gesamtesNettoeinkommenMitKug.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Ist-Netto ({result.istNettoPauschal.toLocaleString('de-DE')} €) + KUG
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Kurzarbeitergeld (KUG)
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.kurzarbeitergeldMonatlich.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            {result.kugLeistungssatzProzent}% des Nettoentgeltausfalls ({result.nettoEntgeltausfall.toLocaleString('de-DE')} €)
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Reguläres Netto (Vergleich)
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.sollNettoPauschal.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Pauschaliertes Nettoentgelt ohne Kurzarbeitsausfall
          </p>
        </div>
      </div>
    </div>
  );
}

