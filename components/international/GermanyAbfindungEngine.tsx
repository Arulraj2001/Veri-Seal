'use client';

import * as React from 'react';
import { calculateAbfindungGermany } from '@/lib/international/germany-tax';
import type { AbfindungCalculationInput, AbfindungCalculationResult } from '@/lib/international/germany-tax';
import { ShieldCheck, CheckCircle2, TrendingDown, HelpCircle, ArrowRight } from 'lucide-react';

export function GermanyAbfindungEngine() {
  const [abfindung, setAbfindung] = React.useState<number>(35000);
  const [jahresgehalt, setJahresgehalt] = React.useState<number>(55000);
  const [monatsgehalt, setMonatsgehalt] = React.useState<number>(4500);
  const [jahre, setJahre] = React.useState<number>(8);
  const [steuerklasse, setSteuerklasse] = React.useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  const result: AbfindungCalculationResult = React.useMemo(() => {
    return calculateAbfindungGermany({
      bruttoJahresgehaltRegulaer: jahresgehalt,
      abfindungsBetrag: abfindung,
      steuerklasse,
      jahreBetriebszugehoerigkeit: jahre,
      monatsGehaltBrutto: monatsgehalt,
    });
  }, [jahresgehalt, abfindung, steuerklasse, jahre, monatsgehalt]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Abfindungssumme */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="abfindung-betrag" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Vereinbarte Abfindungssumme (Brutto)
              </label>
              <div className="font-mono text-sm font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60">
                {abfindung.toLocaleString('de-DE')} €
              </div>
            </div>
            <input
              id="abfindung-betrag"
              type="range"
              min={5000}
              max={150000}
              step={1000}
              value={abfindung}
              onChange={(e) => setAbfindung(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Gesetzlicher KSchG-Richtwert: {result.regelAbfindungNachKSchG.toLocaleString('de-DE')} €</span>
              <span>(0,5 × Monatsgehalt × {jahre} Jahre)</span>
            </div>
          </div>

          {/* Reguläres Bruttojahreseinkommen */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="jahresgehalt-regulaer" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Reguläres Bruttojahreseinkommen im Entlassungsjahr
              </label>
              <div className="font-mono text-sm font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl">
                {jahresgehalt.toLocaleString('de-DE')} € / Jahr
              </div>
            </div>
            <input
              id="jahresgehalt-regulaer"
              type="range"
              min={15000}
              max={120000}
              step={1000}
              value={jahresgehalt}
              onChange={(e) => setJahresgehalt(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
          </div>

          {/* Steuerklasse & Betriebszugehörigkeit */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="steuerklasse-select" className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1">
                Lohnsteuerklasse
              </label>
              <select
                id="steuerklasse-select"
                value={steuerklasse}
                onChange={(e) => setSteuerklasse(Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
              >
                <option value={1}>Klasse 1 (Ledig / Single)</option>
                <option value={2}>Klasse 2 (Alleinerziehend)</option>
                <option value={3}>Klasse 3 (Verheiratet - Alleinverdiener)</option>
                <option value={4}>Klasse 4 (Verheiratet - Doppelverdiener)</option>
                <option value={5}>Klasse 5 (Zweitverdiener)</option>
                <option value={6}>Klasse 6 (Zweitjob)</option>
              </select>
            </div>

            <div>
              <label htmlFor="dienstjahre-input" className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1">
                Beschäftigungsjahre
              </label>
              <input
                id="dienstjahre-input"
                type="number"
                min={1}
                max={45}
                value={jahre}
                onChange={(e) => setJahre(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Netto-Auszahlung der Abfindung
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                § 34 EStG Fünftelregelung
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.nettoAbfindung.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                <span className="text-amber-400 text-2xl sm:text-3xl font-sans">€ Netto</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Effektiver Steuersatz auf die Abfindung:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.effektiverSteuersatzAbfindungProzent}%
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Steuerabzug auf die Abfindung (mit Fünftelregelung):</span>
                <span className="font-mono font-bold text-amber-400">
                  {result.steuerAufAbfindung.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Steuerersparnis durch Fünftelregelung:</span>
                <span className="font-mono font-bold text-emerald-400">
                  +{result.steuerersparnisDurchFuenftelregelung.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € gespart
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Sozialabgaben (Kranken-, Pflege-, Rentenversicherung):</span>
                <span className="font-mono font-bold text-emerald-400">
                  0,00 € (100% beitragsfrei)
                </span>
              </div>
            </div>
          </div>

          {/* Sozialversicherungsfreiheit Alert */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Keine Sozialabgaben auf echte Entlassungsabfindungen:</strong>
              <p className="text-emerald-800 leading-relaxed">
                Nach ständiger Rechtsprechung des Bundessozialgerichts (BSG) unterliegen echte Abfindungen wegen Beendigung des Arbeitsverhältnisses <strong>weder der Renten-, Kranken-, Pflege- noch der Arbeitslosenversicherung</strong>. Es fällt lediglich ermäßigte Lohnsteuer an.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
