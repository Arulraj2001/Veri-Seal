'use client';

import * as React from 'react';
import { calculatePlusValueImmoFrance, PlusValueImmoResult } from '@/lib/international/france-tax';
import { TrendingUp, ShieldCheck, Calendar, Info } from 'lucide-react';

export function FrancePlusValueEngine() {
  const [prixVente, setPrixVente] = React.useState<number>(320000);
  const [prixAchat, setPrixAchat] = React.useState<number>(200000);
  const [anneesDetention, setAnneesDetention] = React.useState<number>(12);
  const [forfaitTravaux, setForfaitTravaux] = React.useState<boolean>(true);
  const [forfaitAcquisition, setForfaitAcquisition] = React.useState<boolean>(true);

  const result: PlusValueImmoResult = React.useMemo(() => {
    return calculatePlusValueImmoFrance({
      prixVente,
      prixAchat,
      anneesDetention,
      forfaitTravaux,
      forfaitAcquisition,
    });
  }, [prixVente, prixAchat, anneesDetention, forfaitTravaux, forfaitAcquisition]);

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Paramètres de la cession immobilière
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Article 150 VC du Code Général des Impôts (abattements IR 22 ans et prélèvements sociaux 30 ans).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prix de vente */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Prix de cession net (€)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={prixVente || ''}
              onChange={(e) => setPrixVente(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Prix d'achat initial */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Prix d&apos;acquisition d&apos;origine (€)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={prixAchat || ''}
              onChange={(e) => setPrixAchat(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Durée de détention */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Nombre d&apos;années de détention du bien
              </label>
              <span className="font-mono font-bold text-blue-600 text-sm">
                {anneesDetention} ans
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="1"
              value={anneesDetention}
              onChange={(e) => setAnneesDetention(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>1 an (taux plein)</span>
              <span>22 ans (exonéré IR)</span>
              <span>30 ans (exonéré total PS)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Impôt Total Plus-Value Dû
          </span>
          <div className="text-3xl font-black font-mono">
            {result.impotTotalPlusValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            {result.exonereTotalement ? 'Exonération totale atteinte !' : 'IR (19%) + Prélèvements Sociaux (17,2%)'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Plus-Value Brute
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.plusValueBrute.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Après majoration forfaitaire ({result.prixAchatMajore.toLocaleString('fr-FR')} € d&apos;achat retenu)
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Net Vendeur en Poche
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.netVendeurEnPoche.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Montant viré par le notaire après prélèvement fiscal
          </p>
        </div>
      </div>

      {/* Abatements breakdown */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Abattements officiels selon la durée de détention
        </h3>
        <div className="space-y-3 font-mono text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Abattement Impôt sur le Revenu (IR 19%) :</span>
            <span className="font-bold text-emerald-600">{(result.tauxAbattementIR * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Abattement Prélèvements Sociaux (PS 17,2%) :</span>
            <span className="font-bold text-emerald-600">{(result.tauxAbattementPS * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Impôt sur le Revenu net exigible :</span>
            <span className="font-bold text-slate-900">{result.impotRevenu19Pct.toLocaleString('fr-FR')} €</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Prélèvements Sociaux (CSG/CRDS) exigibles :</span>
            <span className="font-bold text-slate-900">{result.prelevementsSociaux17Pct2.toLocaleString('fr-FR')} €</span>
          </div>
        </div>
      </div>
    </div>
  );
}

