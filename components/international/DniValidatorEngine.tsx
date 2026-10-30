'use client';

import * as React from 'react';
import { validateDniNieCif } from '@/lib/international/dni-validator';
import type { DniValidationResult } from '@/lib/international/types';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, Copy, Check } from 'lucide-react';

export function DniValidatorEngine() {
  const [inputVal, setInputVal] = React.useState<string>('12345678Z');
  const [copied, setCopied] = React.useState(false);

  const result: DniValidationResult = React.useMemo(() => {
    return validateDniNieCif(inputVal);
  }, [inputVal]);

  const handleCopy = () => {
    if (result.formatted) {
      navigator.clipboard.writeText(result.formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sampleNumbers = [
    { label: 'DNI Ejemplo', val: '12345678Z' },
    { label: 'NIE Ejemplo', val: 'X1234567L' },
    { label: 'CIF Ejemplo', val: 'B12345678' },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="dni-input"
          className="text-xs font-bold text-slate-900 uppercase tracking-wider block"
        >
          Introduce DNI, NIE o CIF
        </label>
        <div className="relative">
          <input
            id="dni-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ej: 12345678Z, X1234567L o B12345678"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-base sm:text-lg font-mono font-bold text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
          {result.formatted && (
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all cursor-pointer"
              title="Copiar formato limpio"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Quick Samples */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[10px] text-slate-400 font-mono">Probar muestras:</span>
          {sampleNumbers.map((s) => (
            <button
              key={s.val}
              type="button"
              onClick={() => setInputVal(s.val)}
              className="text-[11px] font-mono px-2 py-0.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              {s.label} ({s.val})
            </button>
          ))}
        </div>
      </div>

      {/* Validation Result Box */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          result.isValid
            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
            : result.rawInput
            ? 'bg-rose-50/70 border-rose-300 text-rose-950'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              result.isValid
                ? 'bg-emerald-600 text-white'
                : result.rawInput
                ? 'bg-rose-600 text-white'
                : 'bg-slate-200 text-slate-500'
            }`}
          >
            {result.isValid ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">
                {result.isValid
                  ? `${result.type} Válido y Correcto`
                  : result.rawInput
                  ? `${result.type !== 'INVALID' ? result.type : 'Documento'} Inválido o Erróneo`
                  : 'Esperando entrada'}
              </span>
              {result.formatted && (
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/80 border border-current font-bold">
                  {result.formatted}
                </span>
              )}
            </div>
            <p className="opacity-90 leading-relaxed">{result.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

