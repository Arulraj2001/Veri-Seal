'use client';

import * as React from 'react';
import { calculateFraisKilometriquesFrance, FraisKmResult } from '@/lib/international/france-tax';
import { Car, Zap, FileText, Info } from 'lucide-react';

export function FranceFraisKmEngine() {
  const [puissanceFiscaleCV, setPuissanceFiscaleCV] = React.useState<number>(5);
  const [distanceAnnuelleKm, setDistanceAnnuelleKm] = React.useState<number>(12000);
  const [motorisation, setMotorisation] = React.useState<'thermique' | 'electrique'>('thermique');

  const result: FraisKmResult = React.useMemo(() => {
    return calculateFraisKilometriquesFrance({
      puissanceFiscaleCV,
      distanceAnnuelleKm,
      motorisation,
    });
  }, [puissanceFiscaleCV, distanceAnnuelleKm, motorisation]);

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-600" />
            Paramètres du véhicule &amp; déplacements professionnels
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Barème fiscal officiel de l&apos;administration des impôts (DGFiP) pour déduction des frais réels ou remboursement kilométrique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Puissance fiscale */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Puissance administrative (CV)
            </label>
            <div className="flex gap-2">
              {[3, 4, 5, 6, 7].map((cv) => (
                <button
                  key={cv}
                  type="button"
                  onClick={() => setPuissanceFiscaleCV(cv)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    puissanceFiscaleCV === cv
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cv === 7 ? '7+' : `${cv} CV`}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Indiquée à la rubrique (P.6) de votre certificat d&apos;immatriculation (carte grise).
            </p>
          </div>

          {/* Distance parcourue */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Distance professionnelle annuelle (km)
            </label>
            <input
              type="number"
              min="0"
              step="500"
              value={distanceAnnuelleKm || ''}
              onChange={(e) => setDistanceAnnuelleKm(Math.max(Number(e.target.value), 0))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Motorisation */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Type de motorisation
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMotorisation('thermique')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  motorisation === 'thermique'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Thermique / Hybride
              </button>
              <button
                type="button"
                onClick={() => setMotorisation('electrique')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  motorisation === 'electrique'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                100% Électrique (+20%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-md space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-blue-100">
            Indemnité Déductible Totale
          </span>
          <div className="text-3xl font-black font-mono">
            {result.indemniteKilometriqueTotale.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-xs text-blue-100">
            Montant déductible au titre des frais réels ou remboursable sans charges
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Formule Officielle Appliquée
          </span>
          <div className="text-lg font-black font-mono text-slate-900 pt-1">
            {result.baremeFormuleUtilisee}
          </div>
          <p className="text-xs text-slate-500">
            Tranche {distanceAnnuelleKm <= 5000 ? 'jusqu\'à 5 000 km' : distanceAnnuelleKm <= 20000 ? 'de 5 001 à 20 000 km' : 'au-delà de 20 000 km'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-500">
            Bonification Électrique (+20%)
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            {motorisation === 'electrique' ? `+${result.majorationElectrique.toLocaleString('fr-FR')} €` : '0 €'}
          </div>
          <p className="text-xs text-slate-500">
            Majoration d&apos;État pour inciter aux véhicules propres
          </p>
        </div>
      </div>
    </div>
  );
}

