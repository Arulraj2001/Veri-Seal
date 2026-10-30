'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  Scale,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface DissidioResult {
  salarioAnterior: number;
  percentualReajusteTotal: number;
  novoSalario: number;
  aumentoMensal: number;
  mesesAtraso: number;
  diferencaSalarioRetroativo: number;
  reflexoFeriasRetroativo: number;
  reflexoDecimoRetroativo: number;
  totalRetroativoReceber: number;
  fgtsComplementar: number;
}

export default function CalculadoraDissidioSalarialPage() {
  const [salarioAnterior, setSalarioAnterior] = React.useState<number>(3600);
  const [indiceInflacao, setIndiceInflacao] = React.useState<number>(4.8); // INPC/IPCA %
  const [aumentoReal, setAumentoReal] = React.useState<number>(1.2); // Ganho real %
  const [mesesAtraso, setMesesAtraso] = React.useState<number>(3); // Meses de retroatividade
  const [incluirFerias13, setIncluirFerias13] = React.useState<boolean>(true);

  const calcolaDissidio = React.useCallback((): DissidioResult => {
    const salario = Math.max(0, salarioAnterior);
    const inflacao = Math.max(0, indiceInflacao);
    const ganho = Math.max(0, aumentoReal);

    // Reajuste total composto: (1 + inflacao) * (1 + ganho) - 1 ou soma direta conforme CCT
    const percentualTotal = inflacao + ganho;
    const aumentoMensal = salario * (percentualTotal / 100);
    const novoSalario = salario + aumentoMensal;

    const meses = Math.max(0, mesesAtraso);
    const diferencaSalarioRetroativo = aumentoMensal * meses;

    let reflexoFerias = 0;
    let reflexo13 = 0;

    if (incluirFerias13 && meses > 0) {
      // Reflexo proporcional sobre 13º e férias do período de atraso
      reflexo13 = (aumentoMensal / 12) * meses;
      reflexoFerias = ((aumentoMensal / 12) * meses) * (4 / 3);
    }

    const totalRetroativoReceber =
      diferencaSalarioRetroativo + reflexoFerias + reflexo13;

    // FGTS complementar de 8% que a empresa deve recolher
    const fgtsComplementar = totalRetroativoReceber * 0.08;

    return {
      salarioAnterior: salario,
      percentualReajusteTotal: percentualTotal,
      novoSalario,
      aumentoMensal,
      mesesAtraso: meses,
      diferencaSalarioRetroativo,
      reflexoFeriasRetroativo: reflexoFerias,
      reflexoDecimoRetroativo: reflexo13,
      totalRetroativoReceber,
      fgtsComplementar,
    };
  }, [salarioAnterior, indiceInflacao, aumentoReal, mesesAtraso, incluirFerias13]);

  const res = calcolaDissidio();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Dissídio e Reajuste Salarial</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Art. 611 da CLT, Lei 7.238/1984 & Sistema Mediador MTE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calculadora de Reajuste Salarial por Dissídio / CCT <br className="hidden sm:inline" />
          <span className="text-emerald-600">Aumento Nominal, INPC e Pagamento Retroativo</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Trabalhista Direta:</strong> O <strong>dissídio coletivo</strong> ou reajuste salarial por Convenção Coletiva de Trabalho (CCT) atualiza o salário com base na inflação do período (INPC/IPCA) mais eventual aumento real. Quando a convenção é homologada meses após a <strong>data-base da categoria</strong>, o empregador é obrigado por lei a pagar todas as <strong>diferenças salariais retroativas</strong> acumuladas nos meses de atraso, com reflexos em férias, 13º salário e depósitos de FGTS.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Salário & Índices de Reajuste</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSalarioAnterior(3600);
                setIndiceInflacao(4.8);
                setAumentoReal(1.2);
                setMesesAtraso(3);
                setIncluirFerias13(true);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Salário Anterior */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                <span>Salário Anterior ao Reajuste (R$)</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  R$ {salarioAnterior.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={salarioAnterior || ''}
                onChange={(e) => setSalarioAnterior(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                placeholder="Ex. 3600.00"
              />
            </div>

            {/* Índices: Inflação + Ganho Real */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Índice de Inflação (% INPC/IPCA)</span>
                  <span className="font-mono text-emerald-700">{indiceInflacao}%</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={indiceInflacao}
                  onChange={(e) => setIndiceInflacao(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Ganho Real Acima da Inflação (%)</span>
                  <span className="font-mono text-emerald-700">+{aumentoReal}%</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={aumentoReal}
                  onChange={(e) => setAumentoReal(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Retroatividade */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex justify-between">
                <span>Meses de Retroatividade (Atraso na Homologação)</span>
                <span className="font-mono text-emerald-700 font-bold">{mesesAtraso} meses acumulados</span>
              </label>
              <input
                type="number"
                min={0}
                max={24}
                value={mesesAtraso}
                onChange={(e) => setMesesAtraso(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
              />
              <span className="text-[11px] text-slate-500 block">
                Exemplo: Data-base em maio, mas CCT homologada apenas em agosto = 3 meses de retroativo.
              </span>
            </div>

            {/* Incluir reflexos em férias e 13º */}
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={incluirFerias13}
                onChange={(e) => setIncluirFerias13(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-800 font-medium">
                Calcular <strong>reflexos proporcionais sobre Férias (+1/3) e 13º Salário</strong> do período de atraso
              </span>
            </label>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Reajuste total acumulado: {res.percentualReajusteTotal.toFixed(2)}% de aumento sobre o salário contratual.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Novo Salário Reajustado
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              +{res.percentualReajusteTotal.toFixed(2)}%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Novo Salário Mensal</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              R$ {res.novoSalario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
              Aumento de +R$ {res.aumentoMensal.toFixed(2)} em cada mês subsequente
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Salário Original Anterior</span>
              <span className="font-mono text-white">R$ {res.salarioAnterior.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Diferença Salarial Retroativa ({res.mesesAtraso} meses)</span>
              <span className="font-mono text-emerald-400 font-bold">R$ {res.diferencaSalarioRetroativo.toFixed(2)}</span>
            </div>
            {res.reflexoFeriasRetroativo > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Reflexo em Férias + 1/3</span>
                <span className="font-mono text-emerald-400 font-bold">+ R$ {res.reflexoFeriasRetroativo.toFixed(2)}</span>
              </div>
            )}
            {res.reflexoDecimoRetroativo > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Reflexo em 13º Salário</span>
                <span className="font-mono text-emerald-400 font-bold">+ R$ {res.reflexoDecimoRetroativo.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1.5 pt-2 border-t border-slate-800 text-white font-bold">
              <span>Total Retroativo Bruto a Receber</span>
              <span className="font-mono text-cyan-300 font-black">
                R$ {res.totalRetroativoReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1 text-slate-400">
              <span>Depósito FGTS Complementar 8%</span>
              <span className="font-mono text-emerald-400">R$ {res.fgtsComplementar.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Artigo 9º da Lei nº 7.238/1984:</strong>
            <p>O empregado dispensado sem justa causa nos 30 dias que antecedem a data-base tem direito à indenização adicional equivalente a 1 salário mensal integral.</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Como Funciona o Dissídio Salarial e a Data-Base na CLT
          </h2>
          <p>
            O <strong>dissídio coletivo</strong> é a controvérsia judicial ou negocial instaurada perante a Justiça do Trabalho ou mesa de negociação sindical quando não há consenso direto entre empregados e empregadores quanto às condições de trabalho e reajustes salariais (Artigos 611 e 643 da CLT).
          </p>
          <p>
            Toda categoria profissional possui uma <strong>data-base</strong> (sempre no primeiro dia de um determinado mês do ano, como 1º de maio ou 1º de setembro), data em que os contratos coletivos expiram e devem ser renovados.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Diferença Retroativa Obrigatória
          </h3>
          <p>
            É muito comum que as negociações salariais se estendam por meses após a data-base. No entanto, uma vez assinada e homologada a Convenção Coletiva de Trabalho (CCT) no sistema Mediador do Ministério do Trabalho e Emprego (MTE):
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              <strong>Eficácia Retroativa:</strong> Os efeitos financeiros do reajuste retroagem integralmente ao primeiro dia da data-base da categoria.
            </li>
            <li>
              <strong>Folha de Pagamento Complementar:</strong> A empresa deve creditar as diferenças salariais de todos os meses decorridos na primeira folha de pagamento seguinte à publicação da CCT.
            </li>
            <li>
              <strong>Reflexos Acessórios:</strong> As diferenças apuradas geram reflexos proporcionais obrigatórios sobre férias gozadas ou pagas, 13º salário e geram guias de recolhimento complementar de FGTS (8%).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
