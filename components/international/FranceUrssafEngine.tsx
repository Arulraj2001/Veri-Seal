'use client';

import * as React from 'react';
import { calculateAutoEntrepreneurFrance } from '@/lib/international/france-tax';
import type { AutoEntrepreneurInput, AutoEntrepreneurResult } from '@/lib/international/france-tax';
import { ShieldAlert, CheckCircle2, TrendingUp, Info } from 'lucide-react';

export function FranceUrssafEngine() {
  const [ca, setCa] = React.useState<number>(42000);
  const [activite, setActivite] = React.useState<AutoEntrepreneurInput['typeActivite']>('prestations_bic');
  const [acre, setAcre] = React.useState<boolean>(false);
  const [versementLib, setVersementLib] = React.useState<boolean>(true);

  const result: AutoEntrepreneurResult = React.useMemo(() => {
    return calculateAutoEntrepreneurFrance({
      chiffreAffairesAnnuel: ca,
      typeActivite: activite,
      beneficieAcre: acre,
      versementLiberatoire: versementLib,
    });
  }, [ca, activite, acre, versementLib]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Nature de l'Activité */}
          <div className="space-y-2">
            <label htmlFor="activite-urssaf" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Catégorie d'Activité Micro-Entrepreneur
            </label>
            <select
              id="activite-urssaf"
              value={activite}
              onChange={(e) => setActivite(e.target.value as AutoEntrepreneurInput['typeActivite'])}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="prestations_bic">Prestations de services commerciales / artisanales (BIC — 21,2%)</option>
              <option value="professions_bnc">Professions libérales non réglementées & réglementées (BNC — 23,1%)</option>
              <option value="vente_marchandises">Vente de marchandises, hébergement, restauration (BIC — 12,3%)</option>
            </select>
          </div>

          {/* Chiffre d'Affaires Annuel Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="ca-annuel" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Chiffre d'Affaires Encaissé HT
              </label>
              <div className="font-mono text-sm font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200/60">
                {ca.toLocaleString('fr-FR')} € / an
              </div>
            </div>
            <input
              id="ca-annuel"
              type="range"
              min={5000}
              max={120000}
              step={1000}
              value={ca}
              onChange={(e) => setCa(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
            />
            <div className="text-[11px] text-slate-500 flex justify-between font-mono">
              <span>Moyenne: {(ca / 12).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} € / mois</span>
              <span>Plafond micro: {result.plafondChiffreAffaires.toLocaleString('fr-FR')} €</span>
            </div>
          </div>

          {/* Options & Dispositifs */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700">
              <div className="space-y-0.5">
                <span>Bénéficiaire de l'ACRE (1ère année)</span>
                <span className="block text-[11px] text-slate-500 font-normal">
                  Taux de cotisations réduit de moitié durant les 4 premiers trimestres civils
                </span>
              </div>
              <input
                type="checkbox"
                checked={acre}
                onChange={(e) => setAcre(e.target.checked)}
                className="rounded text-blue-600 focus:ring-0 ml-3"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700">
              <div className="space-y-0.5">
                <span>Option pour le Versement Libératoire de l'IR</span>
                <span className="block text-[11px] text-slate-500 font-normal">
                  Règlement de l'impôt sur le revenu directement auprès de l'URSSAF (taux : {result.tauxVersementLiberatoire}%)
                </span>
              </div>
              <input
                type="checkbox"
                checked={versementLib}
                onChange={(e) => setVersementLib(e.target.checked)}
                className="rounded text-blue-600 focus:ring-0 ml-3"
              />
            </label>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Revenu Net Estimé dans la Poche
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Après URSSAF & Impôts
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{result.revenuNetPocheMensuel.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</span>
                <span className="text-blue-400 text-2xl sm:text-3xl font-sans">€/mois</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Total annuel net:{' '}
                <strong className="text-slate-200 font-mono">
                  {result.revenuNetPocheAnnuel.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </strong>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Cotisations URSSAF ({result.tauxCotisationsUrssaf}%) :</span>
                <span className="font-mono font-bold text-blue-400">
                  {result.montantCotisationsSocialesAnnuelles.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €/an
                </span>
              </div>
              {result.montantVersementLiberatoireAnnuel > 0 && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Versement libératoire de l'IR ({result.tauxVersementLiberatoire}%) :</span>
                  <span className="font-mono font-bold text-amber-400">
                    {result.montantVersementLiberatoireAnnuel.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €/an
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-300">
                <span>Contribution Formation Professionnelle (CFP) :</span>
                <span className="font-mono font-bold text-slate-400">
                  {result.contributionFormationPro.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €/an
                </span>
              </div>
            </div>
          </div>

          {/* Franchise TVA Threshold Notification */}
          {result.alerteDepassementTva ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold">Seuil de franchise en base de TVA dépassé :</strong>
                <p className="text-amber-800 leading-relaxed">
                  Votre CA ({ca.toLocaleString('fr-FR')} €) est supérieur au seuil de franchise ({result.seuilFranchiseTva.toLocaleString('fr-FR')} €). Vous devez facturer la TVA à 20% à vos clients dès le premier jour du mois de dépassement.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold">Franchise en base de TVA applicable :</strong>
                <p className="text-emerald-800 leading-relaxed">
                  Votre activité est exonérée de TVA jusqu'à {result.seuilFranchiseTva.toLocaleString('fr-FR')} € de CA. Mention légale obligatoire : <em>« TVA non applicable, art. 293 B du CGI »</em>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
