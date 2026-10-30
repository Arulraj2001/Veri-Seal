'use client';

import * as React from 'react';
import { calculateIndemniteRuptureFrance } from '@/lib/international/france-tax';
import type { RuptureCalculationInput, RuptureCalculationResult } from '@/lib/international/france-tax';
import { Briefcase, CheckCircle2, ShieldCheck, Scale, ArrowRight } from 'lucide-react';

export function FranceRuptureEngine() {
  const [salaireBrut, setSalaireBrut] = React.useState<number>(3200);
  const [annees, setAnnees] = React.useState<number>(4);
  const [mois, setMois] = React.useState<number>(6);
  const [conges, setConges] = React.useState<number>(8);
  const [typeRupture, setTypeRupture] = React.useState<RuptureCalculationInput['typeRupture']>('conventionnelle');

  const result: RuptureCalculationResult = React.useMemo(() => {
    return calculateIndemniteRuptureFrance({
      salaireMensuelBrutMoyen: salaireBrut,
      anneesAnciennete: annees,
      moisAnciennete: mois,
      joursCongesRestants: conges,
      typeRupture,
    });
  }, [salaireBrut, annees, mois, conges, typeRupture]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Motif du départ */}
          <div className="space-y-2">
            <label htmlFor="motif-rupture" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Type de Rupture du Contrat CDI
            </label>
            <select
              id="motif-rupture"
              value={typeRupture}
              onChange={(e) => setTypeRupture(e.target.value as RuptureCalculationInput['typeRupture'])}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="conventionnelle">Rupture Conventionnelle Individuelle (Indemnité légale mini)</option>
              <option value="licenciement_economique">Licenciement Économique</option>
              <option value="licenciement_personnel">Licenciement pour motif personnel (hors faute grave)</option>
            </select>
          </div>

          {/* Salaire Brut de Référence */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="salaire-ref" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Salaire Brut Mensuel de Référence
              </label>
              <div className="font-mono text-sm font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200/60">
                {salaireBrut.toLocaleString('fr-FR')} € / mois
              </div>
            </div>
            <input
              id="salaire-ref"
              type="range"
              min={1500}
              max={10000}
              step={50}
              value={salaireBrut}
              onChange={(e) => setSalaireBrut(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 block">
              La moyenne des 12 derniers mois de salaire brut (ou 3 derniers mois si plus avantageux avec prorata des primes).
            </span>
          </div>

          {/* Ancienneté dans l'entreprise */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Ancienneté Salariée dans l'Entreprise
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Années révolues :</span>
                <input
                  type="number"
                  min={0}
                  max={45}
                  value={annees}
                  onChange={(e) => setAnnees(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900"
                />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Mois supplémentaires :</span>
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={mois}
                  onChange={(e) => setMois(Math.min(11, Math.max(0, Number(e.target.value))))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Jours de congés payés restants */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="conges-restants" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Jours de Congés Payés Acquis Non Pris
              </label>
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                {conges} jours
              </span>
            </div>
            <input
              id="conges-restants"
              type="range"
              min={0}
              max={35}
              step={1}
              value={conges}
              onChange={(e) => setConges(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Indemnité Totale de Fin de Contrat
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Code du Travail
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.totalIndemniteBrute.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</span>
                <span className="text-blue-400 text-2xl sm:text-3xl font-sans">€</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Ancienneté retenue :{' '}
                <strong className="text-slate-200 font-mono">
                  {result.ancienneteTotaleAnnees} ans
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Indemnité légale de rupture :</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {result.indemniteLegaleMinimum.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Indemnité compensatrice de congés payés ({conges} jours) :</span>
                <span className="font-mono font-bold text-amber-300">
                  {result.indemniteCongesPayes.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Formule légale :</span> {result.formuleDetaillee}
              </div>
            </div>
          </div>

          {/* Fiscal Exoneration Info */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Régime fiscal et social avantageux :</strong>
              <p className="text-emerald-800 leading-relaxed">
                L’indemnité spécifique de rupture conventionnelle est exonérée d’impôt sur le revenu dans la limite du montant légal prévu par le Code du travail (ou du montant conventionnel). L’indemnité de congés payés reste imposable comme un salaire ordinaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

