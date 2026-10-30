'use client';

import * as React from 'react';
import { validateIbanSpain } from '@/lib/international/spain-tax';
import { ShieldCheck, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';

export function SpainIbanEngine() {
  const [ibanInput, setIbanInput] = React.useState('ES91 2100 0418 4502 0005 1234');

  const result = React.useMemo(() => {
    return validateIbanSpain(ibanInput);
  }, [ibanInput]);

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="space-y-2">
            <label htmlFor="iban-input-field" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Introduce el IBAN Español (24 caracteres):
            </label>
            <input
              id="iban-input-field"
              type="text"
              placeholder="ESXX XXXX XXXX XX XXXXXXXXXX"
              value={ibanInput}
              onChange={(e) => setIbanInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-base sm:text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 uppercase"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Ejemplos de entidades bancarias españolas:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIbanInput('ES91 2100 0418 4502 0005 1234')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
              >
                CaixaBank (2100)
              </button>
              <button
                type="button"
                onClick={() => setIbanInput('ES76 0049 1500 0512 3456 7890')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
              >
                Banco Santander (0049)
              </button>
              <button
                type="button"
                onClick={() => setIbanInput('ES12 0182 1000 6802 0154 3210')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
              >
                BBVA (0182)
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Verificación Algorítmica ISO 13616
              </span>
              <span
                className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${
                  result.isValid ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {result.isValid ? 'IBAN VÁLIDO ✓' : 'IBAN INVÁLIDO ✕'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white break-all">
                {result.cleanIban || '—'}
              </div>
              <div className="text-xs text-orange-400 font-bold flex items-center gap-1.5 mt-2">
                <Building2 className="w-4 h-4 shrink-0" />
                <span>{result.bancoNombre}</span>
              </div>
            </div>

            {/* Breakdown Items */}
            {result.isValid && (
              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Código de Entidad Bancaria:</span>
                  <span className="font-mono font-bold text-slate-100">{result.codigoBanco}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Código de Sucursal / Oficina:</span>
                  <span className="font-mono font-bold text-slate-100">{result.codigoSucursal}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Dígitos de Control (DC):</span>
                  <span className="font-mono font-bold text-orange-400">{result.digitosControl}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Número de Cuenta Corriente:</span>
                  <span className="font-mono font-bold text-slate-100">{result.numeroCuenta}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Estructura del Código IBAN en España:</strong>
              <p className="text-emerald-800 leading-relaxed">
                El IBAN español consta de 24 caracteres: <strong>ES</strong> (código de país), <strong>2 dígitos de control</strong> globales, <strong>4 dígitos de la entidad</strong> bancaria, <strong>4 de la sucursal</strong>, <strong>2 dígitos de control internos</strong> y <strong>10 dígitos del número de cuenta</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
