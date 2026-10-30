'use client';

import * as React from 'react';
import { calculateSoldesRemisesFrance } from '@/lib/international/france-tax';
import { Tag, Percent, ArrowDownRight, Sparkles } from 'lucide-react';

export function FranceSoldesEngine() {
  const [prixInitial, setPrixInitial] = React.useState<number>(89);
  const [pourcentage1, setPourcentage1] = React.useState<number>(30);
  const [pourcentage2, setPourcentage2] = React.useState<number>(0);

  const result = React.useMemo(() => {
    return calculateSoldesRemisesFrance(prixInitial, pourcentage1, pourcentage2);
  }, [prixInitial, pourcentage1, pourcentage2]);

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Tag className="w-6 h-6 text-blue-600" />
            Prix initial &amp; pourcentages de démarque
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Calculateur pour soldes, promotions et remises successives (ex : -30% puis -20% supplémentaires).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Prix d&apos;origine (€)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={prixInitial || ''}
              onChange={(e) => setPrixInitial(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              1ère Remise (%)
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {[20, 30, 40, 50, 70].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPourcentage1(p)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-mono font-bold transition-all ${
                    pourcentage1 === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  -{p}%
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              2e Remise additionnelle (%)
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {[0, 10, 20, 30].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPourcentage2(p)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-mono font-bold transition-all ${
                    pourcentage2 === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p === 0 ? 'Aucune' : `-${p}%`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Nouveau Prix à Payer
          </span>
          <div className="text-4xl font-black font-mono">
            {result.prixFinal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            Économie réelle totale : {result.tauxReductionReelTotal}%
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Économie Totale Réalisée
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            -{result.montantTotalEconomie.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Montant déduit du ticket de caisse
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Prix après 1ère démarque
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.prixApresPremiereRemise.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Avant application de la 2e remise
          </p>
        </div>
      </div>
    </div>
  );
}
