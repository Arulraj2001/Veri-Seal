'use client';

import * as React from 'react';
import { calculateTvaFrance, TvaFranceResult } from '@/lib/international/france-tax';
import { Percent, ArrowRightLeft, ShieldCheck, Building2, Copy, Check } from 'lucide-react';

export function FranceTvaEngine() {
  const [montant, setMontant] = React.useState<number>(1000);
  const [sens, setSens] = React.useState<'ht_vers_ttc' | 'ttc_vers_ht'>('ht_vers_ttc');
  const [tauxPourcent, setTauxPourcent] = React.useState<20 | 10 | 5.5 | 2.1>(20);
  const [sirenPourCle, setSirenPourCle] = React.useState<string>('732829320');
  const [copied, setCopied] = React.useState<boolean>(false);

  const result: TvaFranceResult = React.useMemo(() => {
    return calculateTvaFrance(montant, sens, tauxPourcent, sirenPourCle);
  }, [montant, sens, tauxPourcent, sirenPourCle]);

  const handleCopyTva = () => {
    if (result.numeroTvaIntracommunautaire) {
      navigator.clipboard.writeText(result.numeroTvaIntracommunautaire);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Percent className="w-6 h-6 text-blue-600" />
            Paramètres du calcul de TVA française
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Taux officiels 2026 : Normal (20%), Intermédiaire (10%), Réduit (5,5%), Spécifique (2,1%).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sens de calcul */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Sens de conversion
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSens('ht_vers_ttc')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  sens === 'ht_vers_ttc'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Hors Taxes &rarr; TTC
              </button>
              <button
                type="button"
                onClick={() => setSens('ttc_vers_ht')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  sens === 'ttc_vers_ht'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                TTC &rarr; Hors Taxes
              </button>
            </div>
          </div>

          {/* Montant */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Montant {sens === 'ht_vers_ttc' ? 'Hors Taxes (HT)' : 'Toutes Taxes Comprises (TTC)'} (€)
            </label>
            <input
              type="number"
              min="0"
              step="10"
              value={montant || ''}
              onChange={(e) => setMontant(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Choix du taux */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Taux légal de TVA
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { taux: 20 as const, label: 'Normal 20%', desc: 'Services & biens standards' },
                { taux: 10 as const, label: 'Intermédiaire 10%', desc: 'Restauration, transports' },
                { taux: 5.5 as const, label: 'Réduit 5,5%', desc: 'Alimentation, livres, énergie' },
                { taux: 2.1 as const, label: 'Particulier 2,1%', desc: 'Médicaments remboursés, presse' },
              ].map((item) => (
                <button
                  key={item.taux}
                  type="button"
                  onClick={() => setTauxPourcent(item.taux)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    tauxPourcent === item.taux
                      ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold text-xs block">{item.label}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">{item.desc}</span>
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
            Montant TTC Final
          </span>
          <div className="text-3xl font-black font-mono">
            {result.montantTTC.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            Total payé par le client final
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Montant Hors Taxes (HT)
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.montantHT.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Base nette de facturation entreprise
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Montant de la TVA ({result.tauxTvaPourcent}%)
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {result.montantTVA.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            TVA collectée / déductible
          </p>
        </div>
      </div>

      {/* TVA Intracommunautaire Generator */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Générateur de numéro de TVA intracommunautaire depuis le SIREN
        </h3>
        <p className="text-xs text-slate-500">
          Formule officielle : FR + [clé = (12 + 3 × (SIREN mod 97)) mod 97] + SIREN (9 chiffres).
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <input
            type="text"
            maxLength={9}
            value={sirenPourCle}
            onChange={(e) => setSirenPourCle(e.target.value.replace(/\D/g, ''))}
            placeholder="Ex : 732829320"
            className="w-full sm:w-60 px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm font-bold text-slate-900"
          />
          {result.numeroTvaIntracommunautaire && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="font-mono font-bold text-blue-700 text-base bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                {result.numeroTvaIntracommunautaire}
              </span>
              <button
                type="button"
                onClick={handleCopyTva}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Copier le numéro"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

