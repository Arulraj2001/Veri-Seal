'use client';

import * as React from 'react';
import { calculateHeuresSuppFrance, HeuresSuppResult } from '@/lib/international/france-tax';
import { Clock, ShieldCheck, Banknote, Info } from 'lucide-react';

export function FranceHeuresSuppEngine() {
  const [tauxHoraireBrut, setTauxHoraireBrut] = React.useState<number>(18.5);
  const [heuresMajorees25Pct, setHeuresMajorees25Pct] = React.useState<number>(12); // 36e à 43e h
  const [heuresMajorees50Pct, setHeuresMajorees50Pct] = React.useState<number>(4); // > 43e h

  const result: HeuresSuppResult = React.useMemo(() => {
    return calculateHeuresSuppFrance({
      tauxHoraireBrut,
      heuresMajorees25Pct,
      heuresMajorees50Pct,
    });
  }, [tauxHoraireBrut, heuresMajorees25Pct, heuresMajorees50Pct]);

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Heures supplémentaires effectuées dans le mois
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Majorations légales (Article L. 3121-28 du Code du travail) et exonérations fiscales / allègement cotisations (Loi TEPA).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Taux horaire de base */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Taux horaire brut habituel (€/h)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={tauxHoraireBrut || ''}
              onChange={(e) => setTauxHoraireBrut(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Heures à 25% */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Heures majorées à 25% (36e à 43e h)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={heuresMajorees25Pct || ''}
              onChange={(e) => setHeuresMajorees25Pct(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
            <span className="text-[11px] text-slate-500">Taux payé : {(tauxHoraireBrut * 1.25).toFixed(2)} €/h</span>
          </div>

          {/* Heures à 50% */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Heures majorées à 50% (dès la 44e h)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={heuresMajorees50Pct || ''}
              onChange={(e) => setHeuresMajorees50Pct(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
            <span className="text-[11px] text-slate-500">Taux payé : {(tauxHoraireBrut * 1.50).toFixed(2)} €/h</span>
          </div>
        </div>
      </div>

      {/* Synthesis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Gain Net Estimé en Poche
          </span>
          <div className="text-3xl font-black font-mono">
            {result.remunerationSuppNetteEstimee.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            Avec exonération fiscale (0 € d&apos;impôt sur le revenu)
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Rémunération Supplémentaire Brute
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.remunerationSuppBruteTotale.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Montant brut porté sur votre fiche de paie
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Allègement Cotisations Salariales
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            +{result.allegementCotisationsSalariales.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Exonération de cotisations vieillesse (~11,31%)
          </p>
        </div>
      </div>
    </div>
  );
}

