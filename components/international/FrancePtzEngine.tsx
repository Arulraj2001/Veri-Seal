'use client';

import * as React from 'react';
import { calculatePtzFrance, PtzResult } from '@/lib/international/france-tax';
import { Sparkles, CheckCircle2, AlertCircle, Home } from 'lucide-react';

export function FrancePtzEngine() {
  const [zone, setZone] = React.useState<'A' | 'B1' | 'B2' | 'C'>('A');
  const [nbPersonnesFoyer, setNbPersonnesFoyer] = React.useState<number>(2);
  const [coutProjet, setCoutProjet] = React.useState<number>(240000);
  const [revenuFiscalReferenceNMoins2, setRevenuFiscalReferenceNMoins2] = React.useState<number>(36000);

  const result: PtzResult = React.useMemo(() => {
    return calculatePtzFrance({
      zone,
      nbPersonnesFoyer,
      coutProjet,
      revenuFiscalReferenceNMoins2,
    });
  }, [zone, nbPersonnesFoyer, coutProjet, revenuFiscalReferenceNMoins2]);

  return (
    <div className="space-y-8">
      {/* Configuration Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            Critères d&apos;éligibilité au PTZ 2026
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Barème officiel du Prêt à Taux Zéro (Loi de finances 2026, zones tendues et non-tendues).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zone géographique */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Zone géographique du bien
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['A', 'B1', 'B2', 'C'] as const).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZone(z)}
                  className={`py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    zone === z
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Zone {z}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Zone A : Paris, IDF, Côte d&apos;Azur. B1 : Grandes agglomérations. B2/C : Villes moyennes et communes rurales.
            </p>
          </div>

          {/* Nombre d'occupants */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Nombre de personnes destinées à occuper le logement
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNbPersonnesFoyer(n)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    nbPersonnesFoyer === n
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {n === 5 ? '5+' : n}
                </button>
              ))}
            </div>
          </div>

          {/* Coût de l'opération */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Coût total de l&apos;opération TTC (€)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              value={coutProjet || ''}
              onChange={(e) => setCoutProjet(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* RFR N-2 */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Revenu Fiscal de Référence N-2 (€)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={revenuFiscalReferenceNMoins2 || ''}
              onChange={(e) => setRevenuFiscalReferenceNMoins2(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
            <p className="text-[11px] text-slate-500">
              Figure sur votre avis d&apos;imposition reçu en N-1 sur les revenus N-2.
            </p>
          </div>
        </div>
      </div>

      {/* Synthesis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl text-white shadow-md space-y-2 ${result.estEligible ? 'bg-blue-600' : 'bg-slate-700'}`}>
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Montant Maximum du PTZ
          </span>
          <div className="text-3xl font-black font-mono">
            {result.montantPtzMax.toLocaleString('fr-FR')} €
          </div>
          <p className="text-xs text-blue-100">
            {result.estEligible
              ? `Quotité de ${result.quotiteFinancement}% du plafond retenu`
              : 'Revenu supérieur au plafond légal'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Statut d&apos;Éligibilité
          </span>
          <div className="flex items-center gap-2 pt-1">
            {result.estEligible ? (
              <>
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <span className="text-xl font-black text-emerald-600">Éligible au PTZ</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-7 h-7 text-rose-500 shrink-0" />
                <span className="text-xl font-black text-rose-600">Non Éligible</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Plafond de ressources max : {result.revenuMaxAdmissible.toLocaleString('fr-FR')} €
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Modalités de Remboursement
          </span>
          <div className="text-2xl font-black font-mono text-slate-900">
            {result.dureeRemboursementAnnees} ans
          </div>
          <p className="text-xs text-slate-500">
            Dont différé d&apos;amortissement de {result.differeAmortissementAnnees} ans (remboursement 0 € au début)
          </p>
        </div>
      </div>
    </div>
  );
}
