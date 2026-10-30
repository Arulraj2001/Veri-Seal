'use client';

import * as React from 'react';
import { calculateStundenlohnGermany } from '@/lib/international/germany-tax';
import type { StundenlohnInput, StundenlohnResult } from '@/lib/international/germany-tax';
import { CheckCircle2, AlertCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export function GermanyStundenlohnEngine() {
  const [monatsgehalt, setMonatsgehalt] = React.useState<number>(3600);
  const [wochenstunden, setWochenstunden] = React.useState<number>(40);
  const [urlaubstage, setUrlaubstage] = React.useState<number>(30);

  const result: StundenlohnResult = React.useMemo(() => {
    return calculateStundenlohnGermany({
      monatsGehaltBrutto: monatsgehalt,
      wochenStunden: wochenstunden,
      urlaubstage,
    });
  }, [monatsgehalt, wochenstunden, urlaubstage]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Brutto-Monatsgehalt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="monatsgehalt-stunden" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Brutto-Monatsgehalt
              </label>
              <div className="font-mono text-sm font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60">
                {monatsgehalt.toLocaleString('de-DE')} € / Monat
              </div>
            </div>
            <input
              id="monatsgehalt-stunden"
              type="range"
              min={400}
              max={10000}
              step={50}
              value={monatsgehalt}
              onChange={(e) => setMonatsgehalt(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
            />
            <div className="text-[11px] text-slate-500 font-mono flex justify-between">
              <span>Jahresgehalt: {(monatsgehalt * 12).toLocaleString('de-DE')} €</span>
              <span>Status: <strong className="text-slate-800">{result.statusKategorie}</strong></span>
            </div>
          </div>

          {/* Wöchentliche Arbeitszeit */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="wochenstunden-slider" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Wöchentliche Arbeitsstunden
              </label>
              <div className="font-mono text-sm font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl">
                {wochenstunden} Std. / Woche
              </div>
            </div>
            <input
              id="wochenstunden-slider"
              type="range"
              min={5}
              max={50}
              step={1}
              value={wochenstunden}
              onChange={(e) => setWochenstunden(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
            <div className="text-[11px] text-slate-500 font-mono">
              Monatliche Arbeitsstunden im Schnitt: {result.arbeitsstundenProMonat} Std.
            </div>
          </div>

          {/* Jahresurlaub */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="urlaubstage-slider" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Gesetzlicher / Vertraglicher Jahresurlaub
              </label>
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                {urlaubstage} Tage
              </span>
            </div>
            <input
              id="urlaubstage-slider"
              type="range"
              min={20}
              max={40}
              step={1}
              value={urlaubstage}
              onChange={(e) => setUrlaubstage(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ihr Rechnerischer Stundenlohn
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                BAG-Formel
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.stundenlohnBrutto.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                <span className="text-amber-400 text-2xl sm:text-3xl font-sans">€ / Std. Brutto</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Geschätzter Netto-Stundenlohn:{' '}
                <strong className="text-slate-200 font-mono">
                  ca. {result.stundenlohnNettoGeschaetzt.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € / Std.
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Gesetzlicher Mindestlohn 2026:</span>
                <span className="font-mono font-bold text-slate-200">
                  {result.gesetzlicherMindestlohn2026.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € / Std.
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Erfüllung des Mindestlohngesetzes (MiLoG):</span>
                <span className={`font-mono font-bold ${result.mindestlohnErfuellt ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.mindestlohnErfuellt ? 'Erfüllt ✓' : 'Nicht erfüllt ✕'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Beschäftigungsform:</span>
                <span className="font-mono font-bold text-amber-400">
                  {result.statusKategorie}
                </span>
              </div>
            </div>
          </div>

          {/* Minijob / Midijob statutory badge */}
          {result.statusKategorie === 'Minijob (538 €)' ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold">Minijob-Grenze (538 € monatlich):</strong>
                <p className="text-emerald-800 leading-relaxed">
                  Ihr Gehalt liegt innerhalb der gesetzlichen Minijob-Grenze. Für den Arbeitnehmer fallen bei Befreiung von der Rentenversicherungspflicht <strong>weder Steuern noch Sozialabgaben</strong> an. Brutto = Netto.
                </p>
              </div>
            </div>
          ) : result.statusKategorie === 'Midijob (Übergangsbereich)' ? (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold">Midijob-Übergangsbereich (538,01 € bis 2.000 €):</strong>
                <p className="text-blue-800 leading-relaxed">
                  Sie profitieren von reduzierten Arbeitnehmer-Beiträgen zur Sozialversicherung mit vollem Rentenanspruch.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-700">
              <ShieldCheck className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold text-slate-900">Reguläres Beschäftigungsverhältnis:</strong>
                <p className="leading-relaxed">
                  Volle Beitragspflicht zu Kranken-, Renten-, Pflege- und Arbeitslosenversicherung nach dem regulären Lohnsteuertarif.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

