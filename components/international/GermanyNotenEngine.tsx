'use client';

import * as React from 'react';
import { calculateBayerischeFormel } from '@/lib/international/germany-tax';
import { GraduationCap, Award, BookOpen, Info } from 'lucide-react';

export function GermanyNotenEngine() {
  const [noteAusland, setNoteAusland] = React.useState<number>(85);
  const [maxNote, setMaxNote] = React.useState<number>(100);
  const [minBestehensnote, setMinBestehensnote] = React.useState<number>(50);

  const result = React.useMemo(() => {
    return calculateBayerischeFormel(noteAusland, maxNote, minBestehensnote);
  }, [noteAusland, maxNote, minBestehensnote]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-600" />
            Notenparameter nach Bayerischer Formel
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Offizieller Beschluss der Kultusministerkonferenz (KMK) zur Umrechnung ausländischer Schul- und Studienabschlüsse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Erzielte ausländische Note (Nd)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={noteAusland}
              onChange={(e) => setNoteAusland(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Maximal erreichbare Bestnote (Nmax)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={maxNote}
              onChange={(e) => setMaxNote(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Mindestbestehensnote (Nmin)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={minBestehensnote}
              onChange={(e) => setMinBestehensnote(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-amber-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-amber-100">
            Deutsche Note (Deutsche Notenskala 1,0 - 5,0)
          </span>
          <div className="text-5xl font-black font-mono">
            {result.deutscheNote.toFixed(1)}
          </div>
          <p className="text-xs text-amber-100">
            Bewertung: <strong>{result.bewertung}</strong>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Formel der Hochschulrektorenkonferenz
          </span>
          <div className="text-base font-mono font-bold text-slate-900 pt-2">
            N = 1 + 3 × (Nmax - Nd) / (Nmax - Nmin)
          </div>
          <p className="text-xs text-slate-500">
            Standardisiertes Verfahren zur Anerkennung von Bachelor-, Master- und Abitur-Zeugnissen in Deutschland.
          </p>
        </div>
      </div>
    </div>
  );
}
