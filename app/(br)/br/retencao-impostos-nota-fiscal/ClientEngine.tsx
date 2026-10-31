'use client';

import * as React from 'react';
import {
  ShieldCheck,
  RotateCcw,
  Receipt,
} from 'lucide-react';

interface RetencaoResult {
  valorBrutoNota: number;
  aliquotaIrrf: number;
  valorIrrf: number;
  dispensaIrrf10Reais: boolean;
  aliquotaPis: number;
  valorPis: number;
  aliquotaCofins: number;
  valorCofins: number;
  aliquotaCsll: number;
  valorCsll: number;
  totalCsrf465: number;
  dispensaCsrf10Reais: boolean;
  valorIssRetido: number;
  valorInssRetido: number;
  totalRetencoes: number;
  valorLiquidoReceber: number;
  ehSimplesNacional: boolean;
}

export function RetencaoImpostosNotaFiscalClient() {
  const [valorNota, setValorNota] = React.useState<number>(5000);
  const [tipoServico, setTipoServico] = React.useState<'profissional_15' | 'limpeza_10' | 'geral'>('profissional_15');
  const [regimePrestador, setRegimePrestador] = React.useState<'lucro_presumido_real' | 'simples_nacional'>('lucro_presumido_real');
  const [aliquotaIss, setAliquotaIss] = React.useState<number>(5.0);
  const [reterInss11, setReterInss11] = React.useState<boolean>(false);

  const calcolaRetencao = React.useCallback((): RetencaoResult => {
    const bruto = Math.max(0, valorNota);
    const ehSimples = regimePrestador === 'simples_nacional';

    if (ehSimples) {
      const valorIss = bruto * (Math.max(0, aliquotaIss) / 100);
      const valorInss = reterInss11 ? bruto * 0.11 : 0;
      const totalRet = valorIss + valorInss;

      return {
        valorBrutoNota: bruto,
        aliquotaIrrf: 0,
        valorIrrf: 0,
        dispensaIrrf10Reais: false,
        aliquotaPis: 0,
        valorPis: 0,
        aliquotaCofins: 0,
        valorCofins: 0,
        aliquotaCsll: 0,
        valorCsll: 0,
        totalCsrf465: 0,
        dispensaCsrf10Reais: false,
        valorIssRetido: valorIss,
        valorInssRetido: valorInss,
        totalRetencoes: totalRet,
        valorLiquidoReceber: Math.max(0, bruto - totalRet),
        ehSimplesNacional: true,
      };
    }

    const aliquotaIrrf = tipoServico === 'limpeza_10' ? 1.0 : 1.5;
    let valorIrrf = bruto * (aliquotaIrrf / 100);
    const dispensaIrrf10Reais = valorIrrf < 10.0;
    if (dispensaIrrf10Reais) valorIrrf = 0;

    let valorPis = bruto * 0.0065;
    let valorCofins = bruto * 0.03;
    let valorCsll = bruto * 0.01;
    let totalCsrf = valorPis + valorCofins + valorCsll;

    const dispensaCsrf10Reais = totalCsrf <= 10.0;
    if (dispensaCsrf10Reais) {
      valorPis = 0;
      valorCofins = 0;
      valorCsll = 0;
      totalCsrf = 0;
    }

    const valorIssRetido = bruto * (Math.max(0, aliquotaIss) / 100);
    const valorInssRetido = reterInss11 ? bruto * 0.11 : 0;

    const totalRetencoes = valorIrrf + totalCsrf + valorIssRetido + valorInssRetido;
    const valorLiquidoReceber = Math.max(0, bruto - totalRetencoes);

    return {
      valorBrutoNota: bruto,
      aliquotaIrrf,
      valorIrrf,
      dispensaIrrf10Reais,
      aliquotaPis: 0.65,
      valorPis,
      aliquotaCofins: 3.0,
      valorCofins,
      aliquotaCsll: 1.0,
      valorCsll,
      totalCsrf465: totalCsrf,
      dispensaCsrf10Reais,
      valorIssRetido,
      valorInssRetido,
      totalRetencoes,
      valorLiquidoReceber,
      ehSimplesNacional: false,
    };
  }, [valorNota, tipoServico, regimePrestador, aliquotaIss, reterInss11]);

  const res = calcolaRetencao();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-slate-800/60 p-6 sm:p-7 rounded-2xl border border-slate-700/60 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-100 uppercase tracking-wider">
            <Receipt className="w-4 h-4 text-emerald-400" />
            <span>Dados da Nota Fiscal de Serviços (NFS-e)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setValorNota(5000);
              setTipoServico('profissional_15');
              setRegimePrestador('lucro_presumido_real');
              setAliquotaIss(5.0);
              setReterInss11(false);
            }}
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Regime Tributário do Prestador */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Regime Tributário do Prestador do Serviço</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRegimePrestador('lucro_presumido_real')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  regimePrestador === 'lucro_presumido_real'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600 bg-slate-900'
                }`}
              >
                <span className="text-white font-semibold">Lucro Presumido ou Real</span>
                <span className="text-[10px] text-slate-400 font-normal mt-1">Retenção obrigatória (4,65% + IR)</span>
              </button>

              <button
                type="button"
                onClick={() => setRegimePrestador('simples_nacional')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  regimePrestador === 'simples_nacional'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600 bg-slate-900'
                }`}
              >
                <span className="text-white font-semibold">Optante pelo Simples Nacional</span>
                <span className="text-[10px] text-slate-400 font-normal mt-1">Dispensa legal de retenção federal</span>
              </button>
            </div>
          </div>

          {/* Valor Bruto da Nota */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Valor Total dos Serviços na Nota (R$)</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">
                R$ {valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </label>
            <input
              type="number"
              min={0}
              step={250}
              value={valorNota || ''}
              onChange={(e) => setValorNota(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-white transition-all font-mono"
              placeholder="Ex. 5000.00"
            />
          </div>

          {/* Tipo de Serviço & Alíquota IRRF */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Natureza do Serviço Prestado</label>
              <select
                disabled={regimePrestador === 'simples_nacional'}
                value={tipoServico}
                onChange={(e) => setTipoServico(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:bg-slate-800 disabled:text-slate-500"
              >
                <option value="profissional_15">Serviços Profissionais / Regulamentados (IRRF 1,5%)</option>
                <option value="limpeza_10">Limpeza, Conservação, Segurança (IRRF 1,0%)</option>
                <option value="geral">Serviços Gerais sem retenção de IR</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Alíquota ISS do Município (%)</span>
                <span className="font-mono text-emerald-400">{aliquotaIss}%</span>
              </label>
              <select
                value={aliquotaIss}
                onChange={(e) => setAliquotaIss(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value={0}>0% (Sem retenção de ISS pelo tomador)</option>
                <option value={2}>2,0% (Mínimo constitucional)</option>
                <option value={3}>3,0%</option>
                <option value={4}>4,0%</option>
                <option value={5}>5,0% (Teto máximo constitucional)</option>
              </select>
            </div>
          </div>

          {/* INSS 11% Cessão Mão de Obra */}
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-700 cursor-pointer hover:bg-slate-800/70 transition-colors">
            <input
              type="checkbox"
              checked={reterInss11}
              onChange={(e) => setReterInss11(e.target.checked)}
              className="w-4 h-4 text-emerald-500 rounded border-slate-600 bg-slate-900 focus:ring-emerald-500"
            />
            <span className="text-xs text-slate-200 font-medium">
              Atividade com <strong>Cessão de Mão de Obra ou Empreitada</strong> (Reter 11% INSS - Art. 31 Lei 8.212/91)
            </span>
          </label>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Regra de dispensa de retenção para valores iguais ou inferiores a R$ 10,00 aplicada automaticamente.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Valor Líquido da Nota Fiscal
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            A Pagar ao Prestador
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-300 font-medium">Valor Líquido do Boleto / Transferência</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.valorLiquidoReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block">
            Total de impostos retidos: R$ {res.totalRetencoes.toFixed(2)}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Valor Bruto Faturado</span>
            <span className="font-mono text-white">R$ {res.valorBrutoNota.toFixed(2)}</span>
          </div>

          {res.ehSimplesNacional ? (
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-emerald-300">
              <strong>Simples Nacional:</strong> Isento de retenção federal de PIS, COFINS, CSLL e IRRF conforme Art. 32 da Lei 10.833/2003.
            </div>
          ) : (
            <>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>IRRF ({res.aliquotaIrrf}%) - DARF 1708</span>
                <span className="font-mono text-rose-400 font-bold">
                  {res.dispensaIrrf10Reais ? 'Dispensado (< R$ 10)' : `- R$ ${res.valorIrrf.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>PIS (0,65%)</span>
                <span className="font-mono text-rose-400">- R$ {res.valorPis.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>COFINS (3,00%)</span>
                <span className="font-mono text-rose-400">- R$ {res.valorCofins.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>CSLL (1,00%)</span>
                <span className="font-mono text-rose-400">- R$ {res.valorCsll.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300 font-semibold">
                <span>Total CSRF 4,65% - DARF 5952</span>
                <span className="font-mono text-rose-400 font-bold">
                  {res.dispensaCsrf10Reais ? 'Dispensado (≤ R$ 10)' : `- R$ ${res.totalCsrf465.toFixed(2)}`}
                </span>
              </div>
            </>
          )}

          {res.valorIssRetido > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>ISS Municipal Retido ({aliquotaIss}%)</span>
              <span className="font-mono text-amber-400 font-bold">- R$ {res.valorIssRetido.toFixed(2)}</span>
            </div>
          )}
          {res.valorInssRetido > 0 && (
            <div className="flex justify-between py-1 text-slate-300">
              <span>INSS Retido Mão de Obra (11%)</span>
              <span className="font-mono text-amber-400 font-bold">- R$ {res.valorInssRetido.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-300 block">Códigos de Arrecadação para o Tomador:</strong>
          <p>• <strong>CSRF (4,65%):</strong> DARF Código 5952 (vence no último dia útil do 2º decêndio do mês subsequente).</p>
          <p>• <strong>IRRF (1,5%):</strong> DARF Código 1708.</p>
        </div>
      </div>
    </div>
  );
}

