'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  TrendingDown,
  Building,
  Scale,
  Percent,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface FinanciamentoResult {
  valorFinanciado: number;
  prazoMeses: number;
  taxaMensalEfetiva: number;
  // SAC
  primeiraParcelaSac: number;
  ultimaParcelaSac: number;
  totalJurosSac: number;
  totalGeralSac: number;
  rendaMinimaSac: number;
  // Price
  parcelaPrice: number;
  totalJurosPrice: number;
  totalGeralPrice: number;
  rendaMinimaPrice: number;
  // Comparativo
  economiaJurosSacVsPrice: number;
}

export default function SimuladorFinanciamentoSacPricePage() {
  const [valorImovel, setValorImovel] = React.useState<number>(400000);
  const [valorEntrada, setValorEntrada] = React.useState<number>(80000); // 20%
  const [prazoAnos, setPrazoAnos] = React.useState<number>(30); // 360 meses
  const [taxaJurosAnual, setTaxaJurosAnual] = React.useState<number>(9.99); // 9.99% a.a.

  const calcolaFinanciamento = React.useCallback((): FinanciamentoResult => {
    const imovel = Math.max(0, valorImovel);
    const entrada = Math.max(0, Math.min(imovel, valorEntrada));
    const financiado = imovel - entrada;
    const n = Math.max(12, prazoAnos * 12);

    // Taxa mensal equivalente: i = (1 + i_ano)^(1/12) - 1
    const iAno = taxaJurosAnual / 100;
    const iMes = Math.pow(1 + iAno, 1 / 12) - 1;

    // 1. Cálculo Sistema SAC (Amortização Constante)
    const amortizacaoConstante = financiado / n;
    const jurosPrimeiroMesSac = financiado * iMes;
    const primeiraParcelaSac = amortizacaoConstante + jurosPrimeiroMesSac;
    const ultimaParcelaSac = amortizacaoConstante + (amortizacaoConstante * iMes);
    // Total de juros no SAC: PA decrescente
    // Total Juros = n * (J_primeiro + J_ultimo) / 2
    const totalJurosSac = (n * (jurosPrimeiroMesSac + amortizacaoConstante * iMes)) / 2;
    const totalGeralSac = financiado + totalJurosSac;
    // Renda mínima pelo limite de 30% do SFH (primeira parcela / 0.30)
    const rendaMinimaSac = primeiraParcelaSac / 0.3;

    // 2. Cálculo Tabela Price (Parcelas Fixas)
    // P = PV * [i / (1 - (1+i)^-n)]
    let parcelaPrice = 0;
    if (iMes > 0) {
      parcelaPrice = financiado * (iMes / (1 - Math.pow(1 + iMes, -n)));
    } else {
      parcelaPrice = financiado / n;
    }
    const totalGeralPrice = parcelaPrice * n;
    const totalJurosPrice = Math.max(0, totalGeralPrice - financiado);
    const rendaMinimaPrice = parcelaPrice / 0.3;

    const economiaJurosSacVsPrice = Math.max(0, totalJurosPrice - totalJurosSac);

    return {
      valorFinanciado: financiado,
      prazoMeses: n,
      taxaMensalEfetiva: iMes * 100,
      primeiraParcelaSac,
      ultimaParcelaSac,
      totalJurosSac,
      totalGeralSac,
      rendaMinimaSac,
      parcelaPrice,
      totalJurosPrice,
      totalGeralPrice,
      rendaMinimaPrice,
      economiaJurosSacVsPrice,
    };
  }, [valorImovel, valorEntrada, prazoAnos, taxaJurosAnual]);

  const res = calcolaFinanciamento();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Financiamento SAC vs Price</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sistema Financeiro da Habitação (SFH / SFI) & Regras da Caixa</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Simulador de Financiamento Habitacional: SAC vs Price <br className="hidden sm:inline" />
          <span className="text-emerald-600">Comparativo de Parcelas, Juros Totais e Renda Mínima</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Financeira Direta:</strong> Na <strong>Tabela SAC (Amortização Constante)</strong>, a primeira parcela é mais alta, mas as parcelas diminuem todo mês e o total de juros pagos ao final é <strong>substancialmente menor</strong>. Na <strong>Tabela Price</strong>, as parcelas são fixas e a prestação inicial é mais baixa — facilitando a aprovação de renda pela regra de comprometimento de 30% do SFH —, mas o custo total de juros é significativamente mais elevado.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Home className="w-4 h-4 text-emerald-600" />
              <span>Valores & Prazos do Imóvel</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setValorImovel(400000);
                setValorEntrada(80000);
                setPrazoAnos(30);
                setTaxaJurosAnual(9.99);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Valor do Imóvel & Entrada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                  <span>Valor do Imóvel (R$)</span>
                </label>
                <input
                  type="number"
                  min={50000}
                  step={10000}
                  value={valorImovel || ''}
                  onChange={(e) => setValorImovel(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                  placeholder="Ex. 400000"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                  <span>Valor da Entrada (R$)</span>
                  <span className="text-emerald-700 font-normal font-mono">
                    {valorImovel > 0 ? ((valorEntrada / valorImovel) * 100).toFixed(0) : 0}%
                  </span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={valorEntrada || ''}
                  onChange={(e) => setValorEntrada(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                  placeholder="Ex. 80000"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex justify-between text-xs font-mono font-bold text-emerald-950">
              <span>Valor Efetivo a Financiar:</span>
              <span>R$ {res.valorFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Prazo e Taxa de Juros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Prazo de Financiamento</span>
                  <span className="text-emerald-700 font-mono font-bold">{res.prazoMeses} meses</span>
                </label>
                <select
                  value={prazoAnos}
                  onChange={(e) => setPrazoAnos(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value={35}>35 anos (420 parcelas mensais - Caixa máx)</option>
                  <option value={30}>30 anos (360 parcelas mensais)</option>
                  <option value={25}>25 anos (300 parcelas mensais)</option>
                  <option value={20}>20 anos (240 parcelas mensais)</option>
                  <option value={15}>15 anos (180 parcelas mensais)</option>
                  <option value={10}>10 anos (120 parcelas mensais)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Taxa Nominal de Juros (% a.a.)</span>
                  <span className="font-mono text-emerald-700">{res.taxaMensalEfetiva.toFixed(3)}% ao mês</span>
                </label>
                <input
                  type="number"
                  min={5}
                  max={25}
                  step={0.1}
                  value={taxaJurosAnual}
                  onChange={(e) => setTaxaJurosAnual(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Fórmula de juros compostos exponencial compatível com os simuladores habitacionais do SFH.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Economia Escolhendo SAC
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              Juros Menores
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Economia Total de Juros no SAC</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-400">
              R$ {res.economiaJurosSacVsPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-200 font-medium block">
              Diferença líquida de juros pagos ao longo dos {prazoAnos} anos
            </span>
          </div>

          {/* Cards Comparativos Lado a Lado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Coluna SAC */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-800/60 space-y-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block">
                Sistema SAC
              </span>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span>1ª Parcela:</span>
                  <span className="font-mono text-white font-bold">R$ {res.primeiraParcelaSac.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Última Parcela:</span>
                  <span className="font-mono text-emerald-400">R$ {res.ultimaParcelaSac.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span>Total Juros:</span>
                  <span className="font-mono text-emerald-300">R$ {res.totalJurosSac.toFixed(0)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                  <span>Renda Mínima:</span>
                  <span className="font-mono text-slate-300">R$ {res.rendaMinimaSac.toFixed(0)}</span>
                </div>
              </div>
            </div>

            {/* Coluna Price */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] block">
                Tabela Price
              </span>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span>Parcela Fixa:</span>
                  <span className="font-mono text-white font-bold">R$ {res.parcelaPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Última Parcela:</span>
                  <span className="font-mono text-amber-400">R$ {res.parcelaPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span>Total Juros:</span>
                  <span className="font-mono text-rose-400 font-bold">R$ {res.totalJurosPrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                  <span>Renda Mínima:</span>
                  <span className="font-mono text-slate-300">R$ {res.rendaMinimaPrice.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Regra do Comprometimento de Renda:</strong>
            <p>Pelas diretrizes do SFH e Banco Central, a primeira prestação habitacional não pode exceder <strong>30% da renda bruta familiar</strong> comprovada dos proponentes.</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Diferença Prática entre o Sistema SAC e a Tabela Price
          </h2>
          <p>
            No crédito habitacional brasileiro, regido pelo <strong>Sistema Financeiro da Habitação (SFH, Lei nº 4.380/1964)</strong> e pelo <strong>Sistema de Financiamento Imobiliário (SFI, Lei nº 9.514/1997)</strong>, a escolha do sistema de amortização é a decisão financeira mais determinante para o custo final do mutuário.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            1. Sistema de Amortização Constante (SAC)
          </h3>
          <p>
            No SAC, a cada mês você abate exatamente a mesma quantia da dívida principal (saldo devedor dividido pelo número de meses). Como os juros são calculados sempre sobre o saldo devedor restante, e este diminui a passos rápidos, o valor dos juros cai mês a mês:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>As parcelas começam mais altas e vão diminuindo continuamente até a quitação;</li>
            <li>Ao final do contrato, o total de juros pagos é muito menor que na Tabela Price;</li>
            <li>É o sistema amplamente recomendado por educadores financeiros e adotado em mais de 80% dos contratos da Caixa Econômica Federal.</li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            2. Tabela Price (Sistema Francês de Amortização)
          </h3>
          <p>
            Na Tabela Price, as parcelas mensais são niveladas (iguais). Nas primeiras parcelas, quase todo o pagamento é destinado aos juros do banco e pouquíssimo dinheiro é usado para abater a dívida:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>A primeira parcela é cerca de 15% a 25% mais barata que no SAC;</li>
            <li>Exige menor comprovação de renda inicial para aprovação do cadastro;</li>
            <li>Em contrapartida, a dívida demora muito para diminuir e o total de juros pagos ao banco ao final de 30 anos é consideravelmente superior.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
