'use client';

import * as React from 'react';
import { calculateSuperbrutEmployeurFrance, SuperbrutResult } from '@/lib/international/france-tax';
import { Calculator, ArrowRight, ShieldCheck, Building2, UserCheck, Info } from 'lucide-react';

export function FranceSuperbrutEngine() {
  const [salaireBrutMensuel, setSalaireBrutMensuel] = React.useState<number>(3000);
  const [statut, setStatut] = React.useState<'non_cadre' | 'cadre'>('non_cadre');
  const [tailleEntreprise, setTailleEntreprise] = React.useState<'moins_de_50' | '50_et_plus'>('moins_de_50');

  const result: SuperbrutResult = React.useMemo(() => {
    return calculateSuperbrutEmployeurFrance({
      salaireBrutMensuel,
      statut,
      tailleEntreprise,
    });
  }, [salaireBrutMensuel, statut, tailleEntreprise]);

  return (
    <div className="space-y-8">
      {/* Interactive Form Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Paramètres du contrat &amp; rémunération
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Simulateur conforme aux barèmes URSSAF 2026 et à la réduction générale des cotisations patronales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salaire Brut Mensuel */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Salaire Brut Mensuel (€)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="50"
                value={salaireBrutMensuel || ''}
                onChange={(e) => setSalaireBrutMensuel(Math.max(Number(e.target.value), 0))}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                €/mois
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              {[1802, 2500, 3200, 4500].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSalaireBrutMensuel(val)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono font-medium transition-colors ${
                    salaireBrutMensuel === val
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  }`}
                >
                  {val === 1802 ? 'SMIC' : `${val} €`}
                </button>
              ))}
            </div>
          </div>

          {/* Statut Professionnel */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Statut du salarié
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatut('non_cadre')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  statut === 'non_cadre'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Non-Cadre
              </button>
              <button
                type="button"
                onClick={() => setStatut('cadre')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  statut === 'cadre'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Cadre (APEC)
              </button>
            </div>
          </div>

          {/* Taille de l'entreprise */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Effectif de l&apos;entreprise (FNAL)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTailleEntreprise('moins_de_50')}
                className={`py-3 px-4 rounded-xl border text-xs font-medium text-left transition-all ${
                  tailleEntreprise === 'moins_de_50'
                    ? 'bg-blue-50 border-blue-500 text-blue-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold block">Moins de 50 salariés</span>
                <span className="text-[11px] text-slate-500">FNAL à 0,10% &amp; réduction Fillon standard</span>
              </button>
              <button
                type="button"
                onClick={() => setTailleEntreprise('50_et_plus')}
                className={`py-3 px-4 rounded-xl border text-xs font-medium text-left transition-all ${
                  tailleEntreprise === '50_et_plus'
                    ? 'bg-blue-50 border-blue-500 text-blue-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold block">50 salariés et plus</span>
                <span className="text-[11px] text-slate-500">FNAL à 0,50%</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coût Employeur Mensuel */}
        <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Coût Total Employeur (Superbrut)
          </span>
          <div className="text-3xl font-black font-mono">
            {result.coutTotalEmployeurMensuel.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            Soit {result.coutTotalEmployeurAnnuel.toLocaleString('fr-FR')} € / an
          </p>
        </div>

        {/* Salaire Brut Mensuel */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Salaire Brut Contrat
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.salaireBrutMensuel.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Charges patronales : +{result.chargesPatronalesMensuelles.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </p>
        </div>

        {/* Salaire Net Salarié */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Salaire Net Perçu Estimé
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.salaireNetEstimeMensuel.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            1 € net versé = {result.ratioSuperbrutSurNet.toFixed(2)} € de coût entreprise
          </p>
        </div>
      </div>

      {/* Detailed Breakdown Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Décomposition des cotisations patronales &amp; allègements
        </h3>
        <div className="space-y-3 font-mono text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Charges patronales URSSAF &amp; Retraite :</span>
            <span className="font-bold text-slate-900">
              {result.chargesPatronalesAnnuelles.toLocaleString('fr-FR')} € / an
            </span>
          </div>
          {result.reductionGeneraleAnnuelle > 0 && (
            <div className="flex justify-between py-2 border-b border-slate-100 text-emerald-600">
              <span className="font-sans">Réduction générale déduite (ex-Fillon) :</span>
              <span className="font-bold">
                -{result.reductionGeneraleAnnuelle.toLocaleString('fr-FR')} € / an
              </span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Taux effectif de charges patronales :</span>
            <span className="font-bold text-slate-900">{result.tauxChargesPatronalesEffectif}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
