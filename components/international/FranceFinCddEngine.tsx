'use client';

import * as React from 'react';
import { calculateFinCddFrance, FinCddResult } from '@/lib/international/france-tax';
import { Calculator, Briefcase, FileCheck, Info } from 'lucide-react';

export function FranceFinCddEngine() {
  const [remunerationBruteTotale, setRemunerationBruteTotale] = React.useState<number>(18000);
  const [joursCongesNonPris, setJoursCongesNonPris] = React.useState<number>(5);
  const [salaireDernierMoisBrut, setSalaireDernierMoisBrut] = React.useState<number>(3000);

  const result: FinCddResult = React.useMemo(() => {
    return calculateFinCddFrance({
      remunerationBruteTotale,
      joursCongesNonPris,
      salaireDernierMoisBrut,
    });
  }, [remunerationBruteTotale, joursCongesNonPris, salaireDernierMoisBrut]);

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            Paramètres du contrat à durée déterminée (CDD)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Calcul conforme à l&apos;Article L. 1243-8 du Code du travail (indemnité de fin de contrat de 10%).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total des salaires bruts perçus */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Total des salaires bruts perçus pendant le CDD (€)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={remunerationBruteTotale || ''}
              onChange={(e) => setRemunerationBruteTotale(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
            <p className="text-[11px] text-slate-500">
              Cumul des salaires bruts indiqués sur vos bulletins de paie (hors remboursements de frais).
            </p>
          </div>

          {/* Salaire brut du dernier mois */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Salaire brut du dernier mois (€)
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={salaireDernierMoisBrut || ''}
              onChange={(e) => setSalaireDernierMoisBrut(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
            <p className="text-[11px] text-slate-500">
              Sert au calcul de la valeur journalière des congés payés restants.
            </p>
          </div>

          {/* Jours de congés payés non pris */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Jours de congés payés restants non pris
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={joursCongesNonPris}
                onChange={(e) => setJoursCongesNonPris(Number(e.target.value))}
                className="flex-1 accent-blue-600 cursor-pointer"
              />
              <span className="font-mono font-bold text-lg text-slate-900 min-w-16 text-right">
                {joursCongesNonPris} j
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Total Indemnités Brutes (STC)
          </span>
          <div className="text-3xl font-black font-mono">
            {result.soldeToutCompteFinalBrut.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            Montant brut à faire figurer sur le solde de tout compte
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Prime de Précarité (10%)
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.primePrecarite10Pct.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            10% de la rémunération brute totale perçue
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Indemnité Congés Payés
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.indemniteCongesPayes.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Calculée sur la base de {joursCongesNonPris} jours restants
          </p>
        </div>
      </div>
    </div>
  );
}
