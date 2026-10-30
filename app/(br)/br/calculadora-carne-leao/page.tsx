'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  BookOpen,
  Receipt,
  Scale,
  Calendar,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface CarneLeaoResult {
  rendimentoBruto: number;
  totalLivroCaixa: number;
  deducaoInss: number;
  deducaoDependentes: number;
  deducaoPensao: number;
  totalDeducoes: number;
  baseCalculo: number;
  aliquotaNominal: number;
  parcelaDeduzir: number;
  impostoDevidoDarf: number;
  aliquotaEfetiva: number;
  economiaGeradaLivroCaixa: number;
}

export default function CalculadoraCarneLeaoPage() {
  const [rendimentoBruto, setRendimentoBruto] = React.useState<number>(8500);
  const [livroCaixa, setLivroCaixa] = React.useState<number>(1800);
  const [inssAutonomo, setInssAutonomo] = React.useState<number>(800);
  const [dependentes, setDependentes] = React.useState<number>(1);
  const [pensaoAlimenticia, setPensaoAlimenticia] = React.useState<number>(0);

  const calcolaCarneLeao = React.useCallback((): CarneLeaoResult => {
    const bruto = Math.max(0, rendimentoBruto);
    const despesas = Math.max(0, livroCaixa);
    const inss = Math.max(0, inssAutonomo);
    const depValor = dependentes * 189.59;
    const pensao = Math.max(0, pensaoAlimenticia);

    const totalDeducoes = despesas + inss + depValor + pensao;
    const baseCalculo = Math.max(0, bruto - totalDeducoes);

    // Tabela Mensal IRPF Receita Federal
    let aliquotaNominal = 0;
    let parcelaDeduzir = 0;

    if (baseCalculo <= 2259.2) {
      aliquotaNominal = 0;
      parcelaDeduzir = 0;
    } else if (baseCalculo <= 2826.65) {
      aliquotaNominal = 7.5;
      parcelaDeduzir = 169.44;
    } else if (baseCalculo <= 3751.05) {
      aliquotaNominal = 15.0;
      parcelaDeduzir = 381.44;
    } else if (baseCalculo <= 4664.68) {
      aliquotaNominal = 22.5;
      parcelaDeduzir = 662.77;
    } else {
      aliquotaNominal = 27.5;
      parcelaDeduzir = 896.0;
    }

    const impostoDevidoDarf = Math.max(0, baseCalculo * (aliquotaNominal / 100) - parcelaDeduzir);
    const aliquotaEfetiva = bruto > 0 ? (impostoDevidoDarf / bruto) * 100 : 0;

    // Cálculo do imposto se não houvesse Livro Caixa para mensurar a economia
    const baseSemLivroCaixa = Math.max(0, bruto - (inss + depValor + pensao));
    let impostoSemLivro = 0;
    if (baseSemLivroCaixa <= 2259.2) impostoSemLivro = 0;
    else if (baseSemLivroCaixa <= 2826.65) impostoSemLivro = baseSemLivroCaixa * 0.075 - 169.44;
    else if (baseSemLivroCaixa <= 3751.05) impostoSemLivro = baseSemLivroCaixa * 0.15 - 381.44;
    else if (baseSemLivroCaixa <= 4664.68) impostoSemLivro = baseSemLivroCaixa * 0.225 - 662.77;
    else impostoSemLivro = baseSemLivroCaixa * 0.275 - 896.0;
    impostoSemLivro = Math.max(0, impostoSemLivro);

    const economiaGeradaLivroCaixa = Math.max(0, impostoSemLivro - impostoDevidoDarf);

    return {
      rendimentoBruto: bruto,
      totalLivroCaixa: despesas,
      deducaoInss: inss,
      deducaoDependentes: depValor,
      deducaoPensao: pensao,
      totalDeducoes,
      baseCalculo,
      aliquotaNominal,
      parcelaDeduzir,
      impostoDevidoDarf,
      aliquotaEfetiva,
      economiaGeradaLivroCaixa,
    };
  }, [rendimentoBruto, livroCaixa, inssAutonomo, dependentes, pensaoAlimenticia]);

  const res = calcolaCarneLeao();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Carnê-Leão e Autônomos</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Art. 104 e 118 do RIR/2018 (Decreto 9.580/18) & DARF Código 0190</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Simulador de Carnê-Leão e IRPF Autônomo <br className="hidden sm:inline" />
          <span className="text-emerald-600">Deduções de Livro Caixa e Imposto Mensal (DARF)</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Tributária Direta:</strong> O <strong>Carnê-Leão</strong> é o recolhimento mensal obrigatório do imposto de renda incidente sobre rendimentos recebidos por pessoas físicas sem retenção na fonte — como <strong>honorários de profissionais liberais (médicos, advogados, psicólogos)</strong>, <strong>aluguéis de imóveis</strong> e <strong>rendimentos do exterior</strong>. As despesas profissionais escrituradas no <strong>Livro Caixa</strong> reduzem diretamente a base de cálculo tributável.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Receitas & Livro Caixa do Mês</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setRendimentoBruto(8500);
                setLivroCaixa(1800);
                setInssAutonomo(800);
                setDependentes(1);
                setPensaoAlimenticia(0);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Rendimento Bruto */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                <span>Rendimento Bruto Recebido no Mês (R$)</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  R$ {rendimentoBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </label>
              <input
                type="number"
                min={0}
                step={200}
                value={rendimentoBruto || ''}
                onChange={(e) => setRendimentoBruto(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                placeholder="Ex. 8500.00"
              />
              <span className="text-[11px] text-slate-500 block">
                Total de honorários recebidos de pessoas físicas, locação de imóveis ou remessas do exterior.
              </span>
            </div>

            {/* Livro Caixa e INSS Autônomo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Despesas de Livro Caixa (R$)</span>
                  <span className="text-slate-400 font-normal">Art. 104 RIR</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={livroCaixa || ''}
                  onChange={(e) => setLivroCaixa(Number(e.target.value))}
                  placeholder="Ex. 1800.00"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
                />
                <span className="text-[10px] text-slate-400 block">Aluguel, água, luz, internet do consultório/escritório</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>INSS Autônomo Pago (R$)</span>
                  <span className="text-slate-400 font-normal">Guia GPS</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={inssAutonomo || ''}
                  onChange={(e) => setInssAutonomo(Number(e.target.value))}
                  placeholder="Ex. 800.00"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
                />
                <span className="text-[10px] text-slate-400 block">Contribuição previdenciária oficial do mês</span>
              </div>
            </div>

            {/* Dependentes & Pensão */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Dependentes Legais</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={dependentes}
                  onChange={(e) => setDependentes(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Pensão Judicial Paga (R$)</label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={pensaoAlimenticia || ''}
                  onChange={(e) => setPensaoAlimenticia(Number(e.target.value))}
                  placeholder="0,00"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>DARF emitido sob o código oficial de receita 0190 com vencimento no último dia útil do mês subsequente.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Imposto Devido no Carnê-Leão
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              DARF 0190
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Valor do DARF a Pagar no Mês</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              R$ {res.impostoDevidoDarf.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
              Alíquota efetiva real: {res.aliquotaEfetiva.toFixed(2)}% sobre o rendimento bruto
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Rendimento Bruto Tributável</span>
              <span className="font-mono text-white">R$ {res.rendimentoBruto.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Deduções de Livro Caixa</span>
              <span className="font-mono text-emerald-400 font-bold">- R$ {res.totalLivroCaixa.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Dedução de INSS Oficial</span>
              <span className="font-mono text-emerald-400 font-bold">- R$ {res.deducaoInss.toFixed(2)}</span>
            </div>
            {res.deducaoDependentes > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Dedução por Dependentes</span>
                <span className="font-mono text-emerald-400 font-bold">- R$ {res.deducaoDependentes.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Base de Cálculo Tributável Líquida</span>
              <span className="font-mono text-cyan-300 font-bold">R$ {res.baseCalculo.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-300">
              <span>Faixa Aplicada da Tabela Progressiva</span>
              <span className="font-mono text-amber-300">{res.aliquotaNominal}% (Dedução R$ {res.parcelaDeduzir.toFixed(2)})</span>
            </div>
          </div>

          {res.economiaGeradaLivroCaixa > 0 && (
            <div className="p-3.5 rounded-xl bg-emerald-900/30 border border-emerald-700/50 text-[11px] text-emerald-200 space-y-1">
              <strong className="block text-emerald-300">Economia com Livro Caixa:</strong>
              <p>A escrituração correta das despesas profissionais gerou uma economia de <strong>R$ {res.economiaGeradaLivroCaixa.toFixed(2)}</strong> neste mês.</p>
            </div>
          )}
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Obrigatoriedade e Funcionamento do Carnê-Leão (RIR/2018)
          </h2>
          <p>
            O <strong>Carnê-Leão</strong> é o regime de recolhimento mensal obrigatório do Imposto de Renda da Pessoa Física (IRPF) instituído pelo <strong>Decreto-Lei nº 1.709/1979</strong> e atualmente disciplinado nos <strong>Artigos 118 a 122 do Regulamento do Imposto de Renda (Decreto nº 9.580/2018)</strong>.
          </p>
          <p>
            Estão sujeitos ao Carnê-Leão todos os contribuintes pessoas físicas residentes no Brasil que recebam rendimentos tributáveis de outras pessoas físicas ou de fontes situadas no exterior que não tenham sofrido retenção de imposto na fonte pagadora.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Despesas Dedutíveis no Livro Caixa (Art. 104 RIR/2018)
          </h3>
          <p>
            O profissional autônomo pode deduzir da receita bruta mensal as despesas indispensáveis à realização de sua atividade profissional e à manutenção do local de trabalho:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <strong className="text-emerald-950 block font-bold">Despesas Permitidas:</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Aluguel, condomínio, IPTU e taxa de limpeza do consultório ou escritório;</li>
                <li>Energia elétrica, água, telefone e internet comercial;</li>
                <li>Remuneração paga a terceiros com vínculo empregatício e encargos trabalhistas (INSS, FGTS da secretária);</li>
                <li>Materiais de escritório, consumo clínico e descartáveis;</li>
                <li>Contribuições aos órgãos e conselhos de classe profissional.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
              <strong className="text-rose-950 block font-bold">Despesas Não Dedutíveis:</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Gastos com locomoção, combustível ou manutenção de veículo próprio (salvo para representantes comerciais);</li>
                <li>Compra de bens de capital, computadores, maquinários ou reformas imobiliárias permanentes;</li>
                <li>Despesas pessoais, vestuário ordinário e alimentação própria.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Penalidades pelo Não Recolhimento Mensal
          </h3>
          <p>
            O recolhimento do Carnê-Leão não é facultativo: deixar para pagar todo o imposto devido na Declaração Anual de Ajuste em abril sujeita o contribuinte à <strong>multa isolada de 50%</strong> sobre o valor do imposto não recolhido no mês de competência, além de juros de mora calculados pela taxa Selic.
          </p>
        </div>
      </div>
    </div>
  );
}

