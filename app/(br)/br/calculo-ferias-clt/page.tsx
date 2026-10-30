'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  Sun,
  Palmtree,
  DollarSign,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface FeriasResult {
  diasDireito: number;
  diasGozados: number;
  diasAbono: number;
  valorDiasGozados: number;
  tercoConstitucionalGozo: number;
  totalGozoBruto: number;
  valorAbonoPecuniario: number;
  tercoAbonoPecuniario: number;
  totalAbonoIsento: number;
  adiantamento13Salario: number;
  descontoInssFerias: number;
  descontoIrrfFerias: number;
  totalLiquidoFerias: number;
  prazoPagamentoTexto: string;
}

export default function CalculoFeriasCltPage() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(4000);
  const [diasDescanso, setDiasDescanso] = React.useState<number>(20);
  const [vender10Dias, setVender10Dias] = React.useState<boolean>(true); // Abono Pecuniário Art. 143
  const [adiantar13, setAdiantar13] = React.useState<boolean>(false);
  const [faltasInjustificadas, setFaltasInjustificadas] = React.useState<number>(0);
  const [dependentes, setDependentes] = React.useState<number>(0);

  const calcolaFerias = React.useCallback((): FeriasResult => {
    const salario = Math.max(0, salarioBruto);
    const valorDia = salario / 30;

    // Tabela de dias de direito a férias conforme faltas (Art. 130 CLT)
    let diasDireito = 30;
    if (faltasInjustificadas <= 5) diasDireito = 30;
    else if (faltasInjustificadas <= 14) diasDireito = 24;
    else if (faltasInjustificadas <= 23) diasDireito = 18;
    else if (faltasInjustificadas <= 32) diasDireito = 12;
    else diasDireito = 0;

    const diasAbono = vender10Dias ? Math.min(10, Math.floor(diasDireito / 3)) : 0;
    const diasGozados = Math.max(0, diasDireito - diasAbono);

    // 1. Dias de Gozo e Terço Constitucional
    const valorDiasGozados = valorDia * diasGozados;
    const tercoConstitucionalGozo = valorDiasGozados / 3;
    const totalGozoBruto = valorDiasGozados + tercoConstitucionalGozo;

    // 2. Abono Pecuniário (Isento de INSS e IRRF - Súmulas 125/136 STJ)
    const valorAbonoPecuniario = valorDia * diasAbono;
    const tercoAbonoPecuniario = valorAbonoPecuniario / 3;
    const totalAbonoIsento = valorAbonoPecuniario + tercoAbonoPecuniario;

    // 3. Adiantamento de 50% do 13º Salário (Lei 4.749/65)
    const adiantamento13Salario = adiantar13 ? salario * 0.5 : 0;

    // 4. Tributação (INSS e IRRF incidem apenas sobre o total de gozo)
    let inss = 0;
    const f1 = 1412.0;
    const f2 = 2666.68;
    const f3 = 4000.03;
    const teto = 7786.02;

    if (totalGozoBruto <= f1) inss = totalGozoBruto * 0.075;
    else if (totalGozoBruto <= f2) inss = f1 * 0.075 + (totalGozoBruto - f1) * 0.09;
    else if (totalGozoBruto <= f3) inss = f1 * 0.075 + (f2 - f1) * 0.09 + (totalGozoBruto - f2) * 0.12;
    else if (totalGozoBruto <= teto)
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (totalGozoBruto - f3) * 0.14;
    else inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (teto - f3) * 0.14;

    const baseIrrf = Math.max(0, totalGozoBruto - inss - dependentes * 189.59);
    let irrf = 0;
    if (baseIrrf <= 2259.2) irrf = 0;
    else if (baseIrrf <= 2826.65) irrf = baseIrrf * 0.075 - 169.44;
    else if (baseIrrf <= 3751.05) irrf = baseIrrf * 0.15 - 381.44;
    else if (baseIrrf <= 4664.68) irrf = baseIrrf * 0.225 - 662.77;
    else irrf = baseIrrf * 0.275 - 896.0;
    irrf = Math.max(0, irrf);

    const totalLiquidoFerias =
      totalGozoBruto - inss - irrf + totalAbonoIsento + adiantamento13Salario;

    const prazoPagamentoTexto =
      'O pagamento da remuneração das férias e do abono deve ser efetuado até 2 (dois) dias antes do início do período de gozo (Artigo 145 da CLT).';

    return {
      diasDireito,
      diasGozados,
      diasAbono,
      valorDiasGozados,
      tercoConstitucionalGozo,
      totalGozoBruto,
      valorAbonoPecuniario,
      tercoAbonoPecuniario,
      totalAbonoIsento,
      adiantamento13Salario,
      descontoInssFerias: inss,
      descontoIrrfFerias: irrf,
      totalLiquidoFerias,
      prazoPagamentoTexto,
    };
  }, [salarioBruto, diasDescanso, vender10Dias, adiantar13, faltasInjustificadas, dependentes]);

  const res = calcolaFerias();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Cálculo de Férias CLT</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Art. 129 a 145 da CLT, Art. 7º XVII CF/88 & Abono Pecuniário</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Cálculo de Férias CLT e Abono Pecuniário <br className="hidden sm:inline" />
          <span className="text-emerald-600">Terço Constitucional (1/3), Venda de Dias e 13º</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Trabalhista Direta:</strong> A cada 12 meses de trabalho (período aquisitivo), o empregado CLT adquire direito a <strong>30 dias de férias</strong> remuneradas com acréscimo de <strong>1/3 constitucional</strong>. É direito facultativo do trabalhador vender até 1/3 das férias (<strong>10 dias de abono pecuniário</strong>), quantia que é <em>totalmente isenta de desconto de INSS e IRRF</em>. O pagamento deve ser realizado impreterivelmente até 2 dias antes do início do descanso.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Palmtree className="w-4 h-4 text-emerald-600" />
              <span>Configuração das Férias</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSalarioBruto(4000);
                setDiasDescanso(20);
                setVender10Dias(true);
                setAdiantar13(false);
                setFaltasInjustificadas(0);
                setDependentes(0);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Salário Base */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Salário Bruto Mensal (R$)</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={salarioBruto || ''}
                onChange={(e) => setSalarioBruto(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                placeholder="Ex. 4000.00"
              />
            </div>

            {/* Venda de Dias (Abono) e Adiantamento 13º */}
            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={vender10Dias}
                  onChange={(e) => setVender10Dias(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div className="text-xs text-slate-800">
                  <strong className="block text-slate-900">Vender 10 dias de férias (Abono Pecuniário Art. 143 CLT)</strong>
                  <span className="text-slate-500 text-[11px]">Goza 20 dias de descanso e recebe 10 dias em dinheiro com 1/3, isentos de imposto.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={adiantar13}
                  onChange={(e) => setAdiantar13(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div className="text-xs text-slate-800">
                  <strong className="block text-slate-900">Adiantar 1ª Parcela do 13º Salário (50%)</strong>
                  <span className="text-slate-500 text-[11px]">Solicitado em janeiro ou conforme convenção coletiva, sem desconto de INSS.</span>
                </div>
              </label>
            </div>

            {/* Faltas Injustificadas e Dependentes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Faltas Injustificadas no Ano</span>
                  <span className="text-slate-400 font-normal">Art. 130 CLT</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={35}
                  value={faltasInjustificadas}
                  onChange={(e) => setFaltasInjustificadas(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Dependentes IRRF</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={dependentes}
                  onChange={(e) => setDependentes(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>O abono pecuniário não sofre retenção de encargos trabalhistas conforme Súmulas 125 e 136 do STJ.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Total Líquido de Férias
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              {res.diasGozados} Dias de Descanso
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Valor Líquido a Receber</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              R$ {res.totalLiquidoFerias.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
              {res.diasAbono > 0 ? `Inclui ${res.diasAbono} dias de abono pecuniário isento` : 'Férias integrais de 30 dias'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Remuneração Dias Gozados ({res.diasGozados} dias)</span>
              <span className="font-mono text-white">R$ {res.valorDiasGozados.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Terço Constitucional (1/3 sobre gozo)</span>
              <span className="font-mono text-white">+ R$ {res.tercoConstitucionalGozo.toFixed(2)}</span>
            </div>
            {res.totalAbonoIsento > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Abono Pecuniário ({res.diasAbono} dias + 1/3)</span>
                <span className="font-mono text-emerald-400 font-bold">+ R$ {res.totalAbonoIsento.toFixed(2)}</span>
              </div>
            )}
            {res.adiantamento13Salario > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Adiantamento 1ª Parcela 13º (50%)</span>
                <span className="font-mono text-cyan-400 font-bold">+ R$ {res.adiantamento13Salario.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Desconto INSS Férias</span>
              <span className="font-mono text-rose-400 font-bold">- R$ {res.descontoInssFerias.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Desconto IRRF Férias</span>
              <span className="font-mono text-rose-400 font-bold">- R$ {res.descontoIrrfFerias.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Prazo Legal de Pagamento (Art. 145 CLT):</strong>
            <p>{res.prazoPagamentoTexto}</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Direito a Férias na CLT: Período Aquisitivo e Concessivo
          </h2>
          <p>
            O instituto das férias remuneradas é um direito social fundamental previsto no <strong>Artigo 7º, inciso XVII da Constituição Federal de 1988</strong> e detalhado nos <strong>Artigos 129 a 145 da Consolidação das Leis do Trabalho</strong>.
          </p>
          <p>
            O trabalhador completa o <em>período aquisitivo</em> a cada 12 (doze) meses de vigência do contrato de trabalho. Nos 12 meses seguintes (o <em>período concessivo</em>), o empregador deve obrigatoriamente conceder e remunerar os dias de descanso sob pena de ter que pagar a remuneração em dobro (Art. 137 da CLT).
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Abono Pecuniário: Venda de 1/3 das Férias (Art. 143 CLT)
          </h3>
          <p>
            O <strong>abono pecuniário</strong> é a conversão em dinheiro de 1/3 dos dias de férias a que o empregado tem direito. É um direito potestativo do empregado — ou seja, a empresa não pode obrigar o funcionário a vender suas férias, tampouco pode recusar a venda se solicitada no prazo de até 15 dias antes do término do período aquisitivo.
          </p>
          <p className="text-xs text-slate-600">
            <em>Vantagem Fiscal:</em> Por possuir natureza puramente indenizatória, o valor dos dias de abono e de seu 1/3 constitucional não integra o salário de contribuição da previdência (sem desconto de INSS) e não sofre tributação de imposto de renda retido na fonte (Súmulas 125 e 136 do Superior Tribunal de Justiça).
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Tabela de Redução por Faltas Injustificadas (Art. 130 CLT)
          </h3>
          <p>
            As ausências ao trabalho não justificadas legalmente (sem atestado médico ou previsão no Art. 473 CLT) reduzem a quantidade de dias de férias a que o trabalhador terá direito:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th className="py-2.5 px-3 font-bold">Número de Faltas Injustificadas</th>
                  <th className="py-2.5 px-3 font-bold">Dias de Férias a Gozar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="py-2.5 px-3">Até 5 faltas</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">30 dias corridos</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">De 6 a 14 faltas</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">24 dias corridos</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">De 15 a 23 faltas</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">18 dias corridos</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">De 24 a 32 faltas</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">12 dias corridos</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Mais de 32 faltas</td>
                  <td className="py-2.5 px-3 font-bold text-rose-600">Perde o direito às férias</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
