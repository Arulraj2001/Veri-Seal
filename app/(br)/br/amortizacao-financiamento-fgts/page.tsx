'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Banknote,
  ShieldCheck,
  TrendingDown,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Coins,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface AmortizacaoResult {
  saldoAnterior: number;
  valorAmortizado: number;
  novoSaldoDevedor: number;
  // Redução de Prazo
  prazoOriginalMeses: number;
  novoPrazoMeses: number;
  mesesEconomizados: number;
  anosEconomizados: string;
  parcelaReducaoPrazo: number;
  economiaJurosPrazo: number;
  // Redução de Parcela
  novaParcelaReducao: number;
  reducaoMensalParcela: number;
  economiaJurosParcela: number;
}

export default function AmortizacaoFgtsPage() {
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

    // Prestação inicial estimada
    let parcelaAtual = 0;
    if (sistemaAmortizacao === 'sac') {
      const amortMensal = saldo / prazo;
      parcelaAtual = amortMensal + (saldo * taxaMes);
    } else {
      parcelaAtual = (saldo * taxaMes) / (1 - Math.pow(1 + taxaMes, -prazo));
    }

    // 1. Cenário REDUÇÃO DE PRAZO (mantendo a parcela próxima ao valor atual)
    let novoPrazoMeses = prazo;
    let economiaJurosPrazo = 0;
    if (sistemaAmortizacao === 'sac') {
      const amortizacaoMensalOriginal = saldo / prazo;
      novoPrazoMeses = Math.max(1, Math.ceil(novoSaldo / amortizacaoMensalOriginal));
      // Juros totais SAC = (n + 1) / 2 * Saldo * taxa
      const jurosOriginal = (prazo + 1) * (saldo * taxaMes) / 2;
      const jurosNovo = (novoPrazoMeses + 1) * (novoSaldo * taxaMes) / 2;
      economiaJurosPrazo = Math.max(0, jurosOriginal - jurosNovo);
    } else {
      // Price: n = -ln(1 - (Saldo * i / P)) / ln(1 + i)
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

    // 2. Cenário REDUÇÃO DE PARCELA (mantendo o prazo original intacto)
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
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org FAQ & SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'Simulador de Amortização de Financiamento Imobiliário com FGTS',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'BRL',
                },
                description:
                  'Calculadora de amortização extraordinária de crédito imobiliário pelo SFH. Compare a redução de prazo (menos juros) versus redução de parcela.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'O que vale mais a pena: amortizar reduzindo o prazo ou a parcela?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Financeiramente, reduzir o prazo do financiamento gera uma economia de juros substancialmente maior (muitas vezes o dobro ou triplo), pois elimina parcelas com juros compostos calculados para o final do contrato. Já reduzir o valor da parcela é indicado quando a renda familiar está apertada e precisa de alívio no fluxo de caixa mensal imediato.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Quais as regras da Caixa para usar o saldo do FGTS na amortização?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Para usar o FGTS na amortização ou liquidação do financiamento pelo SFH, o trabalhador deve possuir ao menos 3 anos de trabalho sob regime do FGTS, não ser proprietário de outro imóvel residencial urbano no mesmo município, e deve respeitar o intervalo mínimo de 2 anos entre uma utilização e outra para amortização de saldo devedor.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Qual o valor máximo do imóvel financiado permitido pelo SFH?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Pelas normas do Conselho Monetário Nacional (CMN) e Resolução CCFGTS nº 994/2021, o teto de avaliação do imóvel para enquadramento no Sistema Financeiro de Habitação (SFH) com direito a uso do FGTS é de R$ 1.500.000,00 em todo o território nacional.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/br" className="hover:text-emerald-700 transition">
            Brasil
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Amortização com FGTS</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Banknote className="w-3.5 h-3.5" />
            SFH & Resolução CCFGTS nº 994/2021
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simulador de Amortização com FGTS
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Descubra a economia real de juros ao abater o saldo devedor do imóvel com FGTS ou recursos próprios: Prazo vs Parcela.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Form Parameters */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Coins className="w-5 h-5 text-emerald-600" />
              Dados do Financiamento Imobiliário
            </h2>

            {/* Saldo Devedor */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
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
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Valor da Amortização */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
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
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/20 font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Prazo Restante e Taxa de Juros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Prazo Restante (Meses)
                </label>
                <input
                  type="number"
                  min="6"
                  max="420"
                  value={prazoMeses || ''}
                  onChange={(e) => setPrazoMeses(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Ex: 360 meses (30 anos)
                </span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Taxa Efetiva de Juros (% a.a.)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={taxaJurosAnual || ''}
                    onChange={(e) => setTaxaJurosAnual(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-xs">%</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Média SFH: 9,5% a 10,5% a.a.
                </span>
              </div>
            </div>

            {/* Sistema de Amortização */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sistema de Amortização Contratado
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setSistemaAmortizacao('sac')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    sistemaAmortizacao === 'sac'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Tabela SAC (Decrescente)
                </button>
                <button
                  type="button"
                  onClick={() => setSistemaAmortizacao('price')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    sistemaAmortizacao === 'price'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Tabela Price (Fixa)
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Estratégia de Amortização</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  SFH
                </span>
              </h2>

              {/* Strategy Selector Pills */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => setEstrategiaVisualizacao('prazo')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    estrategiaVisualizacao === 'prazo'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Reduzir Prazo
                </button>
                <button
                  type="button"
                  onClick={() => setEstrategiaVisualizacao('parcela')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    estrategiaVisualizacao === 'parcela'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <TrendingDown className="w-3.5 h-3.5" />
                  Reduzir Parcela
                </button>
              </div>

              {/* Highlight Box */}
              {estrategiaVisualizacao === 'prazo' ? (
                <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block">
                    Economia Estimada em Juros
                  </span>
                  <div className="text-3xl font-black tracking-tight text-white">
                    {formatarBRL(res.economiaJurosPrazo)}
                  </div>
                  <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                    <span>Tempo Eliminado:</span>
                    <span className="font-bold text-emerald-400">{res.anosEconomizados}</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 text-white mb-5 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block">
                    Alívio Mensal na Parcela
                  </span>
                  <div className="text-3xl font-black tracking-tight text-white">
                    -{formatarBRL(res.reducaoMensalParcela)} / mês
                  </div>
                  <div className="text-xs text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
                    <span>Nova Parcela:</span>
                    <span className="font-bold text-emerald-400">{formatarBRL(res.novaParcelaReducao)}</span>
                  </div>
                </div>
              )}

              {/* Detalhes Comparativos */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Saldo Anterior:</span>
                  <span className="font-semibold text-slate-800">{formatarBRL(res.saldoAnterior)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Amortização Aplicada:</span>
                  <span className="font-semibold text-emerald-700">-{formatarBRL(res.valorAmortizado)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Novo Saldo Devedor:</span>
                  <span className="font-bold text-slate-900">{formatarBRL(res.novoSaldoDevedor)}</span>
                </div>
                {estrategiaVisualizacao === 'prazo' ? (
                  <>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Prazo Restante:</span>
                      <span className="font-semibold text-slate-800">
                        {res.novoPrazoMeses} meses (antes: {res.prazoOriginalMeses})
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Parcelas Eliminadas:</span>
                      <span className="font-bold text-emerald-700">{res.mesesEconomizados} parcelas a menos</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Juros Economizados no Total:</span>
                      <span className="font-semibold text-emerald-700">
                        {formatarBRL(res.economiaJurosParcela)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Prazo Mantido:</span>
                      <span className="font-semibold text-slate-800">{res.prazoOriginalMeses} meses</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-emerald-50/70 border border-emerald-100 text-emerald-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Cálculo Financeiro Local
              </div>
              <p className="text-emerald-800">
                As simulações consideram a taxa nominal pactuada e amortização extraordinária direta sobre o saldo principal, em total conformidade com as diretrizes do Banco Central do Brasil.
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Placement */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Regras e Diretrizes para Amortizar o Financiamento com FGTS
            </h2>
            <p>
              A utilização do saldo vinculado da conta do Fundo de Garantia do Tempo de Serviço (FGTS) para amortização extraordinária de dívidas decorrentes de financiamento imobiliário é regulamentada pela <strong>Lei Federal nº 8.036/1990 (Art. 20)</strong> e pelas sucessivas resoluções do Conselho Curador do FGTS (notadamente a <strong>Resolução CCFGTS nº 994/2021</strong>).
            </p>
            <p className="mt-3">
              O trabalhador brasileiro possui o direito de usar o saldo disponível na conta do FGTS para três finalidades precípuas no crédito imobiliário:
            </p>
            <ol className="list-decimal pl-5 mt-3 space-y-2">
              <li>
                <strong>Amortização extraordinária do saldo devedor:</strong> Pagamento antecipado de parte do montante principal financiado, reduzindo o número de meses vincendos ou o valor unitário das prestações.
              </li>
              <li>
                <strong>Liquidação total do financiamento:</strong> Quitação integral antecipada de toda a dívida remanescente junto ao agente financeiro (Caixa Econômica Federal, Bradesco, Itaú, Santander, Banco do Brasil, etc.).
              </li>
              <li>
                <strong>Abatimento de até 80% do valor das prestações:</strong> Utilização programada do saldo para pagar até 80% do boleto mensal durante o período de 12 meses consecutivos.
              </li>
            </ol>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Condições Obrigatórias Exigidas pela Legislação
            </h3>
            <p>
              Para ter a operação autorizada pelo agente operador do FGTS, tanto o mutuário quanto o imóvel devem cumprir cumulativamente os seguintes requisitos legais:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong>Tempo de trabalho sob o FGTS:</strong> Contar com o mínimo de 3 (três) anos de trabalho sob o regime do FGTS, somando-se os períodos trabalhados, consecutivos ou não, na mesma ou em diferentes empresas.
              </li>
              <li>
                <strong>Ausência de outro financiamento ativo:</strong> Não ser titular de outro financiamento ativo no âmbito do Sistema Financeiro de Habitação (SFH) em qualquer parte do território nacional.
              </li>
              <li>
                <strong>Propriedade imobiliária no mesmo município:</strong> Não ser proprietário, usufrutuário, posseiro ou cessionário de outro imóvel residencial concluído ou em construção no mesmo município onde reside ou trabalha, nem em municípios limítrofes ou integrantes da mesma Região Metropolitana.
              </li>
              <li>
                <strong>Intervalo mínimo de 2 anos:</strong> Para nova utilização de FGTS voltada à amortização de saldo devedor ou liquidação, deve transcorrer o interstício de 2 (dois) anos contados a partir da data da última movimentação com essa mesma finalidade.
              </li>
              <li>
                <strong>Teto de Avaliação do Imóvel:</strong> O imóvel deve ter sido avaliado em valor não superior a R$ 1.500.000,00 na data da contratação.
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Comparativo Técnico: Reduzir Prazo vs Reduzir Parcela
            </h3>
            <p>
              Ao comparecer ao banco ou simular pelo aplicativo Habitação Caixa, o mutuário deve obrigatoriamente optar entre duas modalidades de abatimento:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Redução do Prazo (Eliminar Meses)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ao manter a prestação mensal quase inalterada, cada real amortizado abate diretamente o capital inicial emprestado, cortando meses futuros inteiros. Como os juros são calculados mensalmente sobre o saldo restante multiplicados pelo prazo, você deixa de pagar os juros compostos que incidiriam durante anos. Em quase 100% dos casos de análise financeira, esta é a opção que traz a maior economia de patrimônio familiar.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Redução da Prestação (Alívio de Fluxo)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  O saldo devedor menor é recalculado dividindo-se pelos mesmos 360 ou 420 meses contratados originalmente. Isso reduz imediatamente a mensalidade a pagar no final do mês. É a estratégia ideal quando a família enfrentou perda momentânea de renda, nascimento de filho, ou precisa recompor a folga orçamentária do mês.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Taxa de Administração de Operação do FGTS
            </h3>
            <p>
              A Caixa Econômica Federal e os bancos privados autorizados costumam cobrar uma pequena tarifa operacional de intermediação da documentação perante o Agente Operador do FGTS, que varia usualmente de R$ 300 a R$ 600 por evento de saque, a qual pode ser debitada diretamente da conta do FGTS ou paga em guia avulsa pelo mutuário.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
