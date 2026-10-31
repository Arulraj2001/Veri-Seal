'use client';

import * as React from 'react';
import {
  ShieldCheck,
  TrendingDown,
  Clock,
  Coins,
} from 'lucide-react';

interface AmortizacaoResult {
  saldoAnterior: number;
  valorAmortizado: number;
  novoSaldoDevedor: number;
  prazoOriginalMeses: number;
  novoPrazoMeses: number;
  mesesEconomizados: number;
  anosEconomizados: string;
  parcelaReducaoPrazo: number;
  economiaJurosPrazo: number;
  novaParcelaReducao: number;
  reducaoMensalParcela: number;
  economiaJurosParcela: number;
}

export function AmortizacaoFinanciamentoFgtsClient() {
  const [saldoDevedor, setSaldoDevedor] = React.useState<number>(280000);
  const [prazoMeses, setPrazoMeses] = React.useState<number>(360);
  const [taxaJurosAnual, setTaxaJurosAnual] = React.useState<number>(9.99);
  const [valorAmortizacao, setValorAmortizacao] = React.useState<number>(30000);
  const [sistemaAmortizacao, setSistemaAmortizacao] = React.useState<'sac' | 'price'>('sac');
  const [estrategiaVisualizacao, setEstrategiaVisualizacao] = React.useState<'prazo' | 'parcela'>('prazo');

  const calcularAmortizacao = React.useCallback((): AmortizacaoResult => {
    const saldo = Math.max(0, saldoDevedor);
    const prazo = Math.max(1, prazoMeses);
    const taxaMes = Math.pow(1 + Math.max(0, taxaJurosAnual) / 100, 1 / 12) - 1;
    const amort = Math.min(saldo, Math.max(0, valorAmortizacao));
    const novoSaldo = Math.max(0, saldo - amort);

    let parcelaAtual = 0;
    if (sistemaAmortizacao === 'sac') {
      const amortMensal = saldo / prazo;
      parcelaAtual = amortMensal + (saldo * taxaMes);
    } else {
      parcelaAtual = (saldo * taxaMes) / (1 - Math.pow(1 + taxaMes, -prazo));
    }

    let novoPrazoMeses = prazo;
    let economiaJurosPrazo = 0;
    if (sistemaAmortizacao === 'sac') {
      const amortizacaoMensalOriginal = saldo / prazo;
      novoPrazoMeses = Math.max(1, Math.ceil(novoSaldo / amortizacaoMensalOriginal));
      const jurosOriginal = (prazo + 1) * (saldo * taxaMes) / 2;
      const jurosNovo = (novoPrazoMeses + 1) * (novoSaldo * taxaMes) / 2;
      economiaJurosPrazo = Math.max(0, jurosOriginal - jurosNovo);
    } else {
      if (parcelaAtual > novoSaldo * taxaMes) {
        novoPrazoMeses = Math.ceil(-Math.log(1 - (novoSaldo * taxaMes) / parcelaAtual) / Math.log(1 + taxaMes));
      } else {
        novoPrazoMeses = 1;
      }
      const totalOriginal = parcelaAtual * prazo;
      const totalNovo = parcelaAtual * novoPrazoMeses;
      economiaJurosPrazo = Math.max(0, (totalOriginal - saldo) - (totalNovo - novoSaldo));
    }

    const mesesEconomizados = Math.max(0, prazo - novoPrazoMeses);
    const anosFormatados = `${Math.floor(mesesEconomizados / 12)} anos e ${mesesEconomizados % 12} meses`;

    let novaParcelaReducao = 0;
    let economiaJurosParcela = 0;
    if (sistemaAmortizacao === 'sac') {
      const amortNovo = novoSaldo / prazo;
      novaParcelaReducao = amortNovo + (novoSaldo * taxaMes);
      const jurosOriginal = (prazo + 1) * (saldo * taxaMes) / 2;
      const jurosNovo = (prazo + 1) * (novoSaldo * taxaMes) / 2;
      economiaJurosParcela = Math.max(0, jurosOriginal - jurosNovo);
    } else {
      novaParcelaReducao = (novoSaldo * taxaMes) / (1 - Math.pow(1 + taxaMes, -prazo));
      const totalOriginal = parcelaAtual * prazo;
      const totalNovo = novaParcelaReducao * prazo;
      economiaJurosParcela = Math.max(0, (totalOriginal - saldo) - (totalNovo - novoSaldo));
    }

    const reducaoMensalParcela = Math.max(0, parcelaAtual - novaParcelaReducao);

    return {
      saldoAnterior: saldo,
      valorAmortizado: amort,
      novoSaldoDevedor: novoSaldo,
      prazoOriginalMeses: prazo,
      novoPrazoMeses,
      mesesEconomizados,
      anosEconomizados: anosFormatados,
      parcelaReducaoPrazo: parcelaAtual,
      economiaJurosPrazo,
      novaParcelaReducao,
      reducaoMensalParcela,
      economiaJurosParcela,
    };
  }, [saldoDevedor, prazoMeses, taxaJurosAnual, valorAmortizacao, sistemaAmortizacao]);

  const res = calcularAmortizacao();

  const formatarBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Form Parameters */}
      <div className="md:col-span-7 bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 space-y-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
          <Coins className="w-5 h-5 text-emerald-400" />
          Dados do Financiamento Imobiliário
        </h2>

        {/* Saldo Devedor */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Saldo Devedor Atual (R$)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">R$</span>
            <input
              type="number"
              min="1000"
              step="5000"
              value={saldoDevedor || ''}
              onChange={(e) => setSaldoDevedor(parseFloat(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* Valor da Amortização */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Valor a Amortizar (FGTS ou Recursos Próprios)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">R$</span>
            <input
              type="number"
              min="500"
              step="1000"
              value={valorAmortizacao || ''}
              onChange={(e) => setValorAmortizacao(parseFloat(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-emerald-500 bg-emerald-950/30 font-bold text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* Prazo Restante e Taxa de Juros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Prazo Restante (Meses)
            </label>
            <input
              type="number"
              min="6"
              max="420"
              value={prazoMeses || ''}
              onChange={(e) => setPrazoMeses(parseInt(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Ex: 360 meses (30 anos)
            </span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Taxa Efetiva de Juros (% a.a.)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={taxaJurosAnual || ''}
                onChange={(e) => setTaxaJurosAnual(parseFloat(e.target.value) || 0)}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Média SFH: 9,5% a 10,5% a.a.
            </span>
          </div>
        </div>

        {/* Sistema de Amortização */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Sistema de Amortização Contratado
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setSistemaAmortizacao('sac')}
              className={`p-3 rounded-xl border text-center font-semibold transition cursor-pointer ${
                sistemaAmortizacao === 'sac'
                  ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-sm'
                  : 'border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Tabela SAC (Decrescente)
            </button>
            <button
              type="button"
              onClick={() => setSistemaAmortizacao('price')}
              className={`p-3 rounded-xl border text-center font-semibold transition cursor-pointer ${
                sistemaAmortizacao === 'price'
                  ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-sm'
                  : 'border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Tabela Price (Fixa)
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary Column */}
      <div className="md:col-span-5 space-y-6">
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60">
          <h2 className="text-base font-bold text-white mb-3 pb-2 border-b border-slate-700 flex items-center justify-between">
            <span>Estratégia de Amortização</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              SFH
            </span>
          </h2>

          {/* Strategy Selector Pills */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              type="button"
              onClick={() => setEstrategiaVisualizacao('prazo')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                estrategiaVisualizacao === 'prazo'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Reduzir Prazo
            </button>
            <button
              type="button"
              onClick={() => setEstrategiaVisualizacao('parcela')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                estrategiaVisualizacao === 'parcela'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              Reduzir Parcela
            </button>
          </div>

          {/* Highlight Box */}
          {estrategiaVisualizacao === 'prazo' ? (
            <div className="p-4 rounded-xl bg-slate-950 text-white mb-5 space-y-2 border border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block">
                Economia Estimada em Juros
              </span>
              <div className="text-3xl font-black tracking-tight text-white font-mono">
                {formatarBRL(res.economiaJurosPrazo)}
              </div>
              <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                <span>Tempo Eliminado:</span>
                <span className="font-bold text-emerald-400">{res.anosEconomizados}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 text-white mb-5 space-y-2 border border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block">
                Alívio Mensal na Parcela
              </span>
              <div className="text-3xl font-black tracking-tight text-white font-mono">
                -{formatarBRL(res.reducaoMensalParcela)} / mês
              </div>
              <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                <span>Nova Parcela:</span>
                <span className="font-bold text-emerald-400 font-mono">{formatarBRL(res.novaParcelaReducao)}</span>
              </div>
            </div>
          )}

          {/* Detalhes Comparativos */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-700 text-slate-300">
              <span className="text-slate-400">Saldo Anterior:</span>
              <span className="font-semibold text-white font-mono">{formatarBRL(res.saldoAnterior)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700 text-slate-300">
              <span className="text-slate-400">Amortização Aplicada:</span>
              <span className="font-semibold text-emerald-400 font-mono">-{formatarBRL(res.valorAmortizado)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700 text-slate-300">
              <span className="text-slate-400">Novo Saldo Devedor:</span>
              <span className="font-bold text-white font-mono">{formatarBRL(res.novoSaldoDevedor)}</span>
            </div>
            {estrategiaVisualizacao === 'prazo' ? (
              <>
                <div className="flex justify-between py-1.5 border-b border-slate-700 text-slate-300">
                  <span className="text-slate-400">Prazo Restante:</span>
                  <span className="font-semibold text-white">
                    {res.novoPrazoMeses} meses (antes: {res.prazoOriginalMeses})
                  </span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span className="text-slate-400">Parcelas Eliminadas:</span>
                  <span className="font-bold text-emerald-400">{res.mesesEconomizados} parcelas a menos</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between py-1.5 border-b border-slate-700 text-slate-300">
                  <span className="text-slate-400">Juros Economizados no Total:</span>
                  <span className="font-semibold text-emerald-400 font-mono">
                    {formatarBRL(res.economiaJurosParcela)}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span className="text-slate-400">Prazo Mantido:</span>
                  <span className="font-semibold text-white">{res.prazoOriginalMeses} meses</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Informational Callout */}
        <div className="rounded-2xl p-5 bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-xs space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Amortização Direta do Saldo
          </div>
          <p className="text-slate-300">
            A amortização extraordinária atua integralmente sobre o montante principal da dívida, expurgando os juros compostos que incidiriam nos anos futuros.
          </p>
        </div>
      </div>
    </div>
  );
}

