'use client';

import * as React from 'react';
import { calculatePretImmobilierFrance, PretImmoResult } from '@/lib/international/france-tax';
import { Landmark, Calculator, Percent, ShieldCheck } from 'lucide-react';

export function FrancePretImmoEngine() {
  const [montantEmprunte, setMontantEmprunte] = React.useState<number>(200000);
  const [dureeAnnees, setDureeAnnees] = React.useState<number>(20);
  const [tauxInteretAnnuel, setTauxInteretAnnuel] = React.useState<number>(3.5);
  const [tauxAssuranceAnnuel, setTauxAssuranceAnnuel] = React.useState<number>(0.30);

  const result: PretImmoResult = React.useMemo(() => {
    return calculatePretImmobilierFrance({
      montantEmprunte,
      dureeAnnees,
      tauxInteretAnnuel,
      tauxAssuranceAnnuel,
    });
  }, [montantEmprunte, dureeAnnees, tauxInteretAnnuel, tauxAssuranceAnnuel]);

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-blue-600" />
            Paramètres du prêt bancaire &amp; assurance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tableau d&apos;amortissement à mensualités constantes avec assurance emprunteur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Montant Emprunté */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Capital Emprunté (€)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={montantEmprunte || ''}
              onChange={(e) => setMontantEmprunte(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Durée */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Durée du prêt
              </label>
              <span className="font-mono font-bold text-blue-600 text-sm">
                {dureeAnnees} ans ({dureeAnnees * 12} mensualités)
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={dureeAnnees}
              onChange={(e) => setDureeAnnees(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Taux Nominal */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Taux d&apos;intérêt nominal annuel (%)
            </label>
            <input
              type="number"
              min="0.1"
              max="15"
              step="0.05"
              value={tauxInteretAnnuel || ''}
              onChange={(e) => setTauxInteretAnnuel(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Taux Assurance */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Taux assurance emprunteur annuel (%)
            </label>
            <input
              type="number"
              min="0"
              max="2"
              step="0.05"
              value={tauxAssuranceAnnuel || ''}
              onChange={(e) => setTauxAssuranceAnnuel(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Mensualité Totale (avec assurance)
          </span>
          <div className="text-3xl font-black font-mono">
            {result.mensualiteTotale.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            Hors assurance : {result.mensualiteHorsAssurance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € / mois
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Coût Total des Intérêts
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.coutTotalInterets.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Intérêts versés sur {dureeAnnees} ans
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Coût Total du Crédit
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.coutTotalCredit.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Intérêts + Assurance ({result.coutTotalAssurance.toLocaleString('fr-FR')} € d&apos;assurance)
          </p>
        </div>
      </div>
    </div>
  );
}
