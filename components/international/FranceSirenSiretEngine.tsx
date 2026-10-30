'use client';

import * as React from 'react';
import { validateSirenSiretFrance, SirenSiretResult } from '@/lib/international/france-tax';
import { CheckCircle2, AlertCircle, Building2, Search, Copy, Check } from 'lucide-react';

export function FranceSirenSiretEngine() {
  const [inputCode, setInputCode] = React.useState<string>('73282932000074');
  const [copied, setCopied] = React.useState<boolean>(false);

  const result: SirenSiretResult = React.useMemo(() => {
    return validateSirenSiretFrance(inputCode);
  }, [inputCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Vérification de validité SIREN / SIRET
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Algorithme de contrôle de Luhn officiel de l&apos;Institut National de la Statistique et des Études Économiques (INSEE).
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            Numéro SIREN (9 chiffres) ou SIRET (14 chiffres)
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Ex : 732 829 320 ou 732 829 320 00074"
              className="w-full pl-4 pr-24 py-3.5 rounded-xl border border-slate-300 font-mono text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 uppercase tracking-widest"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copié' : 'Copier'}
            </button>
          </div>
          <div className="flex gap-2 pt-1 flex-wrap">
            <span className="text-xs text-slate-500">Exemples valides :</span>
            <button
              type="button"
              onClick={() => setInputCode('732829320')}
              className="text-xs text-blue-600 underline font-mono"
            >
              732829320 (SIREN)
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => setInputCode('73282932000074')}
              className="text-xs text-blue-600 underline font-mono"
            >
              73282932000074 (SIRET)
            </button>
          </div>
        </div>
      </div>

      {/* Validation Result Box */}
      <div
        className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 transition-all ${
          result.valide
            ? 'bg-emerald-50/40 border-emerald-200'
            : 'bg-rose-50/40 border-rose-200'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-2xl bg-white shadow-xs shrink-0">
            {result.valide ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            ) : (
              <AlertCircle className="w-8 h-8 text-rose-600" />
            )}
          </div>
          <div className="space-y-1">
            <h3
              className={`text-lg font-black ${
                result.valide ? 'text-emerald-900' : 'text-rose-900'
              }`}
            >
              {result.message}
            </h3>
            <p className="text-xs text-slate-600">
              {result.valide
                ? `Ce numéro ${result.type} respecte strictement la formule mathématique de vérification de Luhn imposée par l'INSEE.`
                : 'Vérifiez la frappe du numéro. La clé de contrôle calculée ne correspond pas au numéro saisi.'}
            </p>
          </div>
        </div>

        {result.valide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-emerald-200/60 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white border border-emerald-100">
              <span className="text-slate-500 block uppercase font-sans">Identifiant Entreprise (SIREN)</span>
              <span className="text-base font-bold text-slate-900 mt-1 block tracking-wider">
                {result.siren}
              </span>
            </div>
            {result.nic && (
              <div className="p-4 rounded-2xl bg-white border border-emerald-100">
                <span className="text-slate-500 block uppercase font-sans">Numéro Interne de Classement (NIC)</span>
                <span className="text-base font-bold text-slate-900 mt-1 block tracking-wider">
                  {result.nic}
                </span>
              </div>
            )}
            <div className="p-4 rounded-2xl bg-white border border-emerald-100">
              <span className="text-slate-500 block uppercase font-sans">Clé de Contrôle Luhn</span>
              <span className="text-base font-bold text-emerald-700 mt-1 block">
                {result.cleLuhn} (Conforme)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

