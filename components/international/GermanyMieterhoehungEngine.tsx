'use client';

import * as React from 'react';
import { calculateMieterhoehungGermany, MieterhoehungResult } from '@/lib/international/germany-tax';
import { Home, AlertCircle, CheckCircle2, Percent } from 'lucide-react';

export function GermanyMieterhoehungEngine() {
  const [aktuelleNettokaltmiete, setAktuelleNettokaltmiete] = React.useState<number>(850);
  const [ortsueblicheVergleichsmiete, setOrtsueblicheVergleichsmiete] = React.useState<number>(1050);
  const [letzteMieterhoehungVorMonaten, setLetzteMieterhoehungVorMonaten] = React.useState<number>(36);
  const [gebietMitAngespanntemWohnungsmarkt, setGebietMitAngespanntemWohnungsmarkt] = React.useState<boolean>(true);

  const result: MieterhoehungResult = React.useMemo(() => {
    return calculateMieterhoehungGermany({
      aktuelleNettokaltmiete,
      ortsueblicheVergleichsmiete,
      letzteMieterhoehungVorMonaten,
      gebietMitAngespanntemWohnungsmarkt,
    });
  }, [
    aktuelleNettokaltmiete,
    ortsueblicheVergleichsmiete,
    letzteMieterhoehungVorMonaten,
    gebietMitAngespanntemWohnungsmarkt,
  ]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Home className="w-6 h-6 text-amber-600" />
            Mietdaten &amp; Kappungsgrenzen
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gesetzliche Mieterhöhung nach § 558 BGB (Mietspiegel, 15% vs. 20% Kappungsgrenze innerhalb von 3 Jahren).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Aktuelle monatliche Nettokaltmiete (€)
            </label>
            <input
              type="number"
              min="0"
              step="20"
              value={aktuelleNettokaltmiete || ''}
              onChange={(e) => setAktuelleNettokaltmiete(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Ortsübliche Vergleichsmiete laut Mietspiegel (€)
            </label>
            <input
              type="number"
              min="0"
              step="20"
              value={ortsueblicheVergleichsmiete || ''}
              onChange={(e) => setOrtsueblicheVergleichsmiete(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Letzte Mieterhöhung vor (Monaten)
            </label>
            <input
              type="number"
              min="0"
              max="120"
              value={letzteMieterhoehungVorMonaten}
              onChange={(e) => setLetzteMieterhoehungVorMonaten(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
            <span className="text-[11px] text-slate-500">
              Jahressperrfrist: Mindestens 12 Monate seit der letzten Mieterhöhung.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Lage der Wohnung
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGebietMitAngespanntemWohnungsmarkt(true)}
                className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                  gebietMitAngespanntemWohnungsmarkt
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Angespannter Markt (15%)
              </button>
              <button
                type="button"
                onClick={() => setGebietMitAngespanntemWohnungsmarkt(false)}
                className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                  !gebietMitAngespanntemWohnungsmarkt
                    ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Regulär (20%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Maximal Zulässige Neue Miete
          </span>
          <div className="text-3xl font-black font-mono">
            {result.maximalZulaessigeMieteNachKappung.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-amber-100">
            Kappungsgrenze von {result.zulaessigeKappungsgrenzeProzent}% eingehalten
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Maximale Erhöhung
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            +{result.maximalZulaessigeErhoehungEuro.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Höchstmöglicher Aufschlag pro Monat
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Fristprüfung (§ 558 BGB)
          </span>
          <div className="flex items-center gap-2 pt-1">
            {result.istJahresfristErfuellt ? (
              <>
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <span className="text-lg font-black text-emerald-600">Frist erfüllt</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-7 h-7 text-rose-500 shrink-0" />
                <span className="text-lg font-black text-rose-600">Sperrfrist aktiv</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Mindestens 12 Monate seit letzter Mieterhöhung
          </p>
        </div>
      </div>
    </div>
  );
}

