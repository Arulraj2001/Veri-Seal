'use client';

import * as React from 'react';
import {
  Building2,
  ShieldCheck,
  RotateCcw,
  Store,
  Truck,
  Wrench,
} from 'lucide-react';

interface DasMeiResult {
  salarioMinimo: number;
  inssValor: number;
  icmsValor: number;
  issValor: number;
  valorTotalDasMensal: number;
  custoAnualDas: number;
  faturamentoAcumuladoAno: number;
  limiteAnual: number;
  statusFaturamento: 'dentro_limite' | 'alerta_20' | 'desenquadramento_grave';
  percentualUtilizadoLimite: number;
}

export function CalculadoraDasMeiClient() {
  const [salarioMinimo, setSalarioMinimo] = React.useState<number>(1412);
  const [tipoAtividade, setTipoAtividade] = React.useState<'comercio' | 'servicos' | 'comercio_servicos' | 'caminhoneiro'>('servicos');
  const [faturamentoEstimadoAno, setFaturamentoEstimadoAno] = React.useState<number>(60000);

  const calcolaDas = React.useCallback((): DasMeiResult => {
    const sm = Math.max(0, salarioMinimo);
    const fat = Math.max(0, faturamentoEstimadoAno);

    let inssValor = 0;
    let icmsValor = 0;
    let issValor = 0;
    let limiteAnual = 81000;

    if (tipoAtividade === 'caminhoneiro') {
      inssValor = sm * 0.12;
      icmsValor = 1.0;
      issValor = 5.0;
      limiteAnual = 251600;
    } else {
      inssValor = sm * 0.05;

      if (tipoAtividade === 'comercio') {
        icmsValor = 1.0;
        issValor = 0;
      } else if (tipoAtividade === 'servicos') {
        icmsValor = 0;
        issValor = 5.0;
      } else {
        icmsValor = 1.0;
        issValor = 5.0;
      }
    }

    const valorTotalDasMensal = inssValor + icmsValor + issValor;
    const custoAnualDas = valorTotalDasMensal * 12;

    const percentualUtilizadoLimite = limiteAnual > 0 ? (fat / limiteAnual) * 100 : 0;
    let statusFaturamento: 'dentro_limite' | 'alerta_20' | 'desenquadramento_grave' = 'dentro_limite';

    if (fat <= limiteAnual) {
      statusFaturamento = 'dentro_limite';
    } else if (fat <= limiteAnual * 1.2) {
      statusFaturamento = 'alerta_20';
    } else {
      statusFaturamento = 'desenquadramento_grave';
    }

    return {
      salarioMinimo: sm,
      inssValor,
      icmsValor,
      issValor,
      valorTotalDasMensal,
      custoAnualDas,
      faturamentoAcumuladoAno: fat,
      limiteAnual,
      statusFaturamento,
      percentualUtilizadoLimite,
    };
  }, [salarioMinimo, tipoAtividade, faturamentoEstimadoAno]);

  const res = calcolaDas();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Atividade & Faturamento</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSalarioMinimo(1412);
              setTipoAtividade('servicos');
              setFaturamentoEstimadoAno(60000);
            }}
            className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Tipo de Atividade */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Tipo de Atividade Econômica</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTipoAtividade('servicos')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  tipoAtividade === 'servicos'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Prestação de Serviços</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-1">INSS + R$ 5,00 ISS</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoAtividade('comercio')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  tipoAtividade === 'comercio'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Comércio ou Indústria</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-1">INSS + R$ 1,00 ICMS</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoAtividade('comercio_servicos')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  tipoAtividade === 'comercio_servicos'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>Comércio e Serviços (Misto)</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-1">INSS + R$ 1,00 + R$ 5,00</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoAtividade('caminhoneiro')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  tipoAtividade === 'caminhoneiro'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>MEI Caminhoneiro</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-1">12% INSS (LC 188/21)</span>
              </button>
            </div>
          </div>

          {/* Salário Mínimo */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex justify-between">
              <span>Salário Mínimo Nacional de Referência (R$)</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400">R$ {salarioMinimo.toFixed(2)}</span>
            </label>
            <input
              type="number"
              min={1300}
              step={10}
              value={salarioMinimo || ''}
              onChange={(e) => setSalarioMinimo(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
            />
          </div>

          {/* Faturamento Anual Estimado */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex justify-between">
              <span>Faturamento Anual do MEI (R$)</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                R$ {faturamentoEstimadoAno.toLocaleString('pt-BR')}
              </span>
            </label>
            <input
              type="number"
              min={0}
              step={1000}
              value={faturamentoEstimadoAno || ''}
              onChange={(e) => setFaturamentoEstimadoAno(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 transition-all font-mono"
              placeholder="Ex. 60000"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              Limite do MEI: R$ {res.limiteAnual.toLocaleString('pt-BR')} por ano civil (
              {res.percentualUtilizadoLimite.toFixed(1)}% utilizado).
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Guia DAS oficial calculada conforme as resoluções do Comitê Gestor do Simples Nacional (CGSN).</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Valor da Guia Mensal DAS
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            Vencimento Dia 20
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-200 font-medium">Valor Mensal Fixo Unificado</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.valorTotalDasMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-300 font-medium block">
            R$ {res.custoAnualDas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por ano (12 guias)
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>INSS Previdência Social ({tipoAtividade === 'caminhoneiro' ? '12%' : '5%'})</span>
            <span className="font-mono text-emerald-400 font-bold">R$ {res.inssValor.toFixed(2)}</span>
          </div>
          {res.icmsValor > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>ICMS Estadual (Comércio/Indústria)</span>
              <span className="font-mono text-cyan-400 font-bold">R$ {res.icmsValor.toFixed(2)}</span>
            </div>
          )}
          {res.issValor > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>ISS Municipal (Prestador de Serviços)</span>
              <span className="font-mono text-cyan-400 font-bold">R$ {res.issValor.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Alerta de Faturamento */}
        <div
          className={`p-3.5 rounded-xl border text-[11px] space-y-1 ${
            res.statusFaturamento === 'dentro_limite'
              ? 'bg-slate-900 border-slate-800 text-slate-300'
              : res.statusFaturamento === 'alerta_20'
              ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
              : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
          }`}
        >
          <strong className="block font-bold">Status do Faturamento Anual:</strong>
          {res.statusFaturamento === 'dentro_limite' && (
            <p>Faturamento regular dentro do teto anual do MEI ({res.percentualUtilizadoLimite.toFixed(1)}%).</p>
          )}
          {res.statusFaturamento === 'alerta_20' && (
            <p>Atenção: Faturamento ultrapassou o teto em até 20%. Será necessário recolher DAS complementar e migrar para ME no próximo ano.</p>
          )}
          {res.statusFaturamento === 'desenquadramento_grave' && (
            <p>Crítico: Faturamento ultrapassou 20% do teto. Desenquadramento do MEI com tributação retroativa pelo Simples Nacional.</p>
          )}
        </div>
      </div>
    </div>
  );
}

