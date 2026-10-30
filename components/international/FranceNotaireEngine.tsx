'use client';

import * as React from 'react';
import { calculateFraisNotaireFrance, FraisNotaireResult } from '@/lib/international/france-tax';
import { Home, Landmark, Calculator, Info } from 'lucide-react';

export function FranceNotaireEngine() {
  const [prixAchatBien, setPrixAchatBien] = React.useState<number>(250000);
  const [typeBien, setTypeBien] = React.useState<'ancien' | 'neuf'>('ancien');
  const [departementTauxPlein, setDepartementTauxPlein] = React.useState<boolean>(true);

  const result: FraisNotaireResult = React.useMemo(() => {
    return calculateFraisNotaireFrance({
      prixAchatBien,
      typeBien,
      departementTauxPlein,
    });
  }, [prixAchatBien, typeBien, departementTauxPlein]);

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-blue-600" />
            Paramètres du projet d&apos;acquisition immobilière
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Barème officiel réglementé (Décret 2016-230, taxes départementales et émoluments de formalités).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prix du bien */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Prix d&apos;achat du bien net vendeur (€)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="5000"
                value={prixAchatBien || ''}
                onChange={(e) => setPrixAchatBien(Math.max(Number(e.target.value), 0))}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                €
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              {[150000, 250000, 350000, 500000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPrixAchatBien(val)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono font-medium transition-colors ${
                    prixAchatBien === val
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  }`}
                >
                  {(val / 1000).toFixed(0)} k€
                </button>
              ))}
            </div>
          </div>

          {/* Type de bien */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Type de bien immobilier
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTypeBien('ancien')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  typeBien === 'ancien'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Logement Ancien (~7-8%)
              </button>
              <button
                type="button"
                onClick={() => setTypeBien('neuf')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  typeBien === 'neuf'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Logement Neuf / VEFA (~2-3%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Frais d&apos;Acquisition Totaux
          </span>
          <div className="text-3xl font-black font-mono">
            {result.totalFraisAcquisition.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            Soit environ {result.pourcentageEffectif}% du prix d&apos;achat
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Droits de Mutation (État / Département)
          </span>
          <div className="text-3xl font-black font-mono text-slate-900">
            {result.droitsEnregistrementFiscaux.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Représente l&apos;essentiel des frais dits « de notaire » (impôts)
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Émoluments Réels du Notaire
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {(result.emolumentsNotaireHT + result.tvaEmolumentsNotaire).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-slate-500">
            Rémunération de l&apos;étude notariale TTC
          </p>
        </div>
      </div>

      {/* Detailed Legal Breakdown */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Détail poste par poste des frais d&apos;acte
        </h3>
        <div className="space-y-3 font-mono text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Droits d&apos;enregistrement &amp; taxe de publicité foncière :</span>
            <span className="font-bold text-slate-900">
              {result.droitsEnregistrementFiscaux.toLocaleString('fr-FR')} €
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Émoluments proportionnels réglementés (HT) :</span>
            <span className="font-bold text-slate-900">
              {result.emolumentsNotaireHT.toLocaleString('fr-FR')} €
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">TVA sur émoluments (20%) :</span>
            <span className="font-bold text-slate-900">
              {result.tvaEmolumentsNotaire.toLocaleString('fr-FR')} €
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Contribution de sécurité immobilière (CSI 0,10%) :</span>
            <span className="font-bold text-slate-900">
              {result.contributionSecuriteImmobiliere.toLocaleString('fr-FR')} €
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600 font-sans">Frais de formalités et débours forfaitaires :</span>
            <span className="font-bold text-slate-900">
              {result.fraisFormalitesDebours.toLocaleString('fr-FR')} €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

