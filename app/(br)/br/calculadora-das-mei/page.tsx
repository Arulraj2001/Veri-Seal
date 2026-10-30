'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  Store,
  Truck,
  Wrench,
  Percent,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

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

export default function CalculadoraDasMeiPage() {
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
      // MEI Caminhoneiro: 12% do salário mínimo (LC 188/2021)
      inssValor = sm * 0.12;
      icmsValor = 1.0;
      issValor = 5.0;
      limiteAnual = 251600;
    } else {
      // MEI Geral: 5% do salário mínimo
      inssValor = sm * 0.05;

      if (tipoAtividade === 'comercio') {
        icmsValor = 1.0;
        issValor = 0;
      } else if (tipoAtividade === 'servicos') {
        icmsValor = 0;
        issValor = 5.0;
      } else {
        // Comércio e Serviços
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">DAS MEI 2026</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Lei Complementar 123/2006, LC 188/2021 & Portal do Empreendedor</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calculadora DAS MEI 2026 Atualizada <br className="hidden sm:inline" />
          <span className="text-emerald-600">Valor da Guia Mensal, ICMS, ISS e Limite Anual</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Tributária Direta:</strong> O <strong>Microempreendedor Individual (MEI)</strong> recolhe mensalmente a guia única do <strong>DAS (Documento de Arrecadação do Simples Nacional)</strong>, com vencimento em todo dia 20. O valor compõe-se de <strong>5% do Salário Mínimo (INSS)</strong>, acrescido de <strong>R$ 1,00 de ICMS</strong> (comércio/indústria) e/ou <strong>R$ 5,00 de ISS</strong> (prestação de serviços). O limite anual de faturamento geral é de <strong>R$ 81.000,00</strong>.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Atividade & Faturamento</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSalarioMinimo(1412);
                setTipoAtividade('servicos');
                setFaturamentoEstimadoAno(60000);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Tipo de Atividade */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Tipo de Atividade Econômica</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTipoAtividade('servicos')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    tipoAtividade === 'servicos'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Prestação de Serviços</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">INSS + R$ 5,00 ISS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTipoAtividade('comercio')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    tipoAtividade === 'comercio'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Comércio ou Indústria</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">INSS + R$ 1,00 ICMS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTipoAtividade('comercio_servicos')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    tipoAtividade === 'comercio_servicos'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Comércio e Serviços (Misto)</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">INSS + R$ 1,00 + R$ 5,00</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTipoAtividade('caminhoneiro')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    tipoAtividade === 'caminhoneiro'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>MEI Caminhoneiro</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">12% INSS (LC 188/21)</span>
                </button>
              </div>
            </div>

            {/* Salário Mínimo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex justify-between">
                <span>Salário Mínimo Nacional de Referência (R$)</span>
                <span className="font-mono text-emerald-700">R$ {salarioMinimo.toFixed(2)}</span>
              </label>
              <input
                type="number"
                min={1300}
                step={10}
                value={salarioMinimo || ''}
                onChange={(e) => setSalarioMinimo(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
              />
            </div>

            {/* Faturamento Anual Estimado */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                <span>Faturamento Anual do MEI (R$)</span>
                <span className="font-mono text-emerald-700 font-bold">
                  R$ {faturamentoEstimadoAno.toLocaleString('pt-BR')}
                </span>
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={faturamentoEstimadoAno || ''}
                onChange={(e) => setFaturamentoEstimadoAno(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                placeholder="Ex. 60000"
              />
              <span className="text-[11px] text-slate-500 block">
                Limite do MEI: R$ {res.limiteAnual.toLocaleString('pt-BR')} por ano civil (
                {res.percentualUtilizadoLimite.toFixed(1)}% utilizado).
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Como Funciona a Tributação do MEI no Brasil
          </h2>
          <p>
            O <strong>Microempreendedor Individual (MEI)</strong> foi instituído pela <strong>Lei Complementar nº 128/2008</strong>, que inseriu novos dispositivos na <strong>Lei Complementar nº 123/2006</strong> (Estatuto Nacional da Microempresa).
          </p>
          <p>
            A principal vantagem do MEI é o enquadramento no <strong>SIMEI (Sistema de Recolhimento em Valores Fixos Mensais dos Tributos do Simples Nacional)</strong>. Em vez de pagar percentuais sobre cada nota fiscal emitida, o empreendedor recolhe uma quantia fixa mensal, independentemente do volume faturado naquele mês.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Benefícios Previdenciários Assegurados pelo DAS
          </h3>
          <p>
            O pagamento pontual da guia mensal DAS garante ao microempreendedor a qualidade de segurado da Previdência Social, assegurando:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Aposentadoria por idade (62 anos para mulheres e 65 anos para homens, com carência mínima de 15 anos de contribuição);</li>
            <li>Auxílio por incapacidade temporária (antigo auxílio-doença);</li>
            <li>Salário-maternidade (com carência de 10 contribuições mensais);</li>
            <li>Pensão por morte e auxílio-reclusão para os dependentes diretos.</li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Regras de Desenquadramento por Excesso de Receita
          </h3>
          <p>
            Ao monitorar o faturamento anual do MEI, existem duas situações previstas na legislação:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">1. Excesso de até 20% (Até R$ 97.200,00)</strong>
              <p className="text-slate-600">
                O empreendedor continua pagando o DAS normal até dezembro. Em janeiro do ano seguinte, gera uma guia complementar sobre o valor excedido e passa a atuar como Microempresa (ME).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">2. Excesso Superior a 20% (Acima de R$ 97.200,00)</strong>
              <p className="text-slate-600">
                O desenquadramento é retroativo a janeiro do mesmo ano (ou mês de abertura), obrigando o recolhimento de tributos pelo Simples Nacional com juros e multa sobre todas as notas fiscais emitidas no ano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
