'use client';

import * as React from 'react';
import { calculateRendementLocatifFrance, RendementLocatifResult } from '@/lib/international/france-tax';
import { Percent, Building, Wallet, TrendingUp } from 'lucide-react';

export function FranceRendementEngine() {
  const [prixAchat, setPrixAchat] = React.useState<number>(180000);
  const [fraisNotaire, setFraisNotaire] = React.useState<number>(14000);
  const [travauxRenovation, setTravauxRenovation] = React.useState<number>(10000);
  const [loyerMensuelHorsCharges, setLoyerMensuelHorsCharges] = React.useState<number>(850);
  const [chargesCoproprieteNonRecuperablesAnnuelles, setChargesCoproprieteNonRecuperablesAnnuelles] = React.useState<number>(800);
  const [taxeFonciereAnnuelle, setTaxeFonciereAnnuelle] = React.useState<number>(900);
  const [assurancePnoAnnuelle, setAssurancePnoAnnuelle] = React.useState<number>(200);
  const [regimeFiscal, setRegimeFiscal] = React.useState<'micro_foncier' | 'reel'>('micro_foncier');
  const [trancheMarginaleImpot, setTrancheMarginaleImpot] = React.useState<number>(30);

  const result: RendementLocatifResult = React.useMemo(() => {
    return calculateRendementLocatifFrance({
      prixAchat,
      fraisNotaire,
      travauxRenovation,
      loyerMensuelHorsCharges,
      chargesCoproprieteNonRecuperablesAnnuelles,
      taxeFonciereAnnuelle,
      assurancePnoAnnuelle,
      regimeFiscal,
      trancheMarginaleImpot,
    });
  }, [
    prixAchat,
    fraisNotaire,
    travauxRenovation,
    loyerMensuelHorsCharges,
    chargesCoproprieteNonRecuperablesAnnuelles,
    taxeFonciereAnnuelle,
    assurancePnoAnnuelle,
    regimeFiscal,
    trancheMarginaleImpot,
  ]);

  return (
    <div className="space-y-8">
      {/* Configuration Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-6 h-6 text-blue-600" />
            Paramètres d&apos;investissement locatif
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Calcul des rendements brut, net de charges et net après fiscalité (Micro-foncier vs Réel).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Prix d&apos;achat (€)
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

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Frais de notaire estimés (€)
            </label>
            <input
              type="number"
              min="0"
              step="500"
              value={fraisNotaire || ''}
              onChange={(e) => setFraisNotaire(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Loyer mensuel HC (€)
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={loyerMensuelHorsCharges || ''}
              onChange={(e) => setLoyerMensuelHorsCharges(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Taxe foncière annuelle (€)
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={taxeFonciereAnnuelle || ''}
              onChange={(e) => setTaxeFonciereAnnuelle(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Charges annuelles non récupérables (€)
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={chargesCoproprieteNonRecuperablesAnnuelles || ''}
              onChange={(e) => setChargesCoproprieteNonRecuperablesAnnuelles(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Tranche Marginale d&apos;Imposition (TMI)
            </label>
            <div className="flex gap-1.5">
              {[0, 11, 30, 41].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrancheMarginaleImpot(t)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    trancheMarginaleImpot === t
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t}%
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
            Rendement Brut Annuel
          </span>
          <div className="text-3xl font-black font-mono">
            {result.rendementBrut.toFixed(2)} %
          </div>
          <p className="text-xs text-blue-100">
            Loyer annuel rapporté à l&apos;investissement total ({result.revenusLocatifsAnnuels.toLocaleString('fr-FR')} €/an)
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Rendement Net de Charges
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.rendementNetCharges.toFixed(2)} %
          </div>
          <p className="text-xs text-slate-500">
            Déduction faite de la taxe foncière et des charges de copropriété
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Cash-Flow Net Mensuel (Après Impôts)
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.cashFlowMensuelNet.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Après impôt sur le revenu ({trancheMarginaleImpot}%) et prélèvements sociaux (17,2%)
          </p>
        </div>
      </div>
    </div>
  );
}
