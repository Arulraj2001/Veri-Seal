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
  TrendingDown,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface SalarioLiquidoResult {
  salarioBruto: number;
  inssDesconto: number;
  inssAliquotaEfetiva: number;
  baseCalculoIrrf: number;
  irrfDesconto: number;
  irrfAliquotaEfetiva: number;
  descontoValeTransporte: number;
  outrosDescontosTotal: number;
  salarioLiquido: number;
  fgtsEmpresa: number; // 8% pago pelo empregador
  aliquotaTotalDescontos: number;
  usouDescontoSimplificado: boolean;
}

export default function CalculadoraSalarioLiquidoCltPage() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(4500);
  const [dependentes, setDependentes] = React.useState<number>(1);
  const [pensaoAlimenticia, setPensaoAlimenticia] = React.useState<number>(0);
  const [percentualVT, setPercentualVT] = React.useState<number>(0); // 0% a 6%
  const [outrosDescontos, setOutrosDescontos] = React.useState<number>(0);

  const calcolaSalario = React.useCallback((): SalarioLiquidoResult => {
    const bruto = Math.max(0, salarioBruto);

    // 1. Tabela Progressiva INSS 2026 (Portaria MPS/MF)
    // Faixa 1: Até 1.412,00 (7,5%)
    // Faixa 2: De 1.412,01 até 2.666,68 (9%)
    // Faixa 3: De 2.666,69 até 4.000,03 (12%)
    // Faixa 4: De 4.000,04 até 7.786,02 (14% - Teto)
    let inss = 0;
    const f1 = 1412.0;
    const f2 = 2666.68;
    const f3 = 4000.03;
    const teto = 7786.02;

    if (bruto <= f1) {
      inss = bruto * 0.075;
    } else if (bruto <= f2) {
      inss = f1 * 0.075 + (bruto - f1) * 0.09;
    } else if (bruto <= f3) {
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (bruto - f2) * 0.12;
    } else if (bruto <= teto) {
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (bruto - f3) * 0.14;
    } else {
      // Acima do teto, desconta o valor máximo
      inss = f1 * 0.075 + (f2 - f1) * 0.09 + (f3 - f2) * 0.12 + (teto - f3) * 0.14;
    }

    const inssAliquotaEfetiva = bruto > 0 ? (inss / bruto) * 100 : 0;

    // 2. Base de Cálculo IRRF e Desconto Simplificado
    // Dedução por dependente: R$ 189,59
    const deducaoDependentes = dependentes * 189.59;
    const deducoesLegais = inss + deducaoDependentes + pensaoAlimenticia;

    // Desconto simplificado mensal da Receita Federal: R$ 564,80
    const descontoSimplificadoRF = 564.8;
    const usouDescontoSimplificado = descontoSimplificadoRF > deducoesLegais;

    let baseIrrf = 0;
    if (usouDescontoSimplificado) {
      baseIrrf = Math.max(0, bruto - descontoSimplificadoRF);
    } else {
      baseIrrf = Math.max(0, bruto - deducoesLegais);
    }

    // Tabela Mensal IRRF 2026:
    // Até 2.259,20: Isento
    // 2.259,21 até 2.826,65: 7,5% (dedução 169,44)
    // 2.826,66 até 3.751,05: 15,0% (dedução 381,44)
    // 3.751,06 até 4.664,68: 22,5% (dedução 662,77)
    // Acima de 4.664,68: 27,5% (dedução 896,00)
    let irrf = 0;
    if (baseIrrf <= 2259.2) {
      irrf = 0;
    } else if (baseIrrf <= 2826.65) {
      irrf = baseIrrf * 0.075 - 169.44;
    } else if (baseIrrf <= 3751.05) {
      irrf = baseIrrf * 0.15 - 381.44;
    } else if (baseIrrf <= 4664.68) {
      irrf = baseIrrf * 0.225 - 662.77;
    } else {
      irrf = baseIrrf * 0.275 - 896.0;
    }
    irrf = Math.max(0, irrf);
    const irrfAliquotaEfetiva = bruto > 0 ? (irrf / bruto) * 100 : 0;

    // 3. Vale Transporte (máximo 6% CLT)
    const descontoVT = bruto * (Math.min(6, Math.max(0, percentualVT)) / 100);

    // 4. Outros descontos e Pensão
    const outrosTotal = outrosDescontos + pensaoAlimenticia;

    // 5. Salário Líquido Final
    const totalDescontos = inss + irrf + descontoVT + outrosTotal;
    const salarioLiquido = Math.max(0, bruto - totalDescontos);
    const aliquotaTotalDescontos = bruto > 0 ? (totalDescontos / bruto) * 100 : 0;

    // 6. FGTS (8% recolhido pela empresa, não desconta do trabalhador)
    const fgtsEmpresa = bruto * 0.08;

    return {
      salarioBruto: bruto,
      inssDesconto: inss,
      inssAliquotaEfetiva,
      baseCalculoIrrf: baseIrrf,
      irrfDesconto: irrf,
      irrfAliquotaEfetiva,
      descontoValeTransporte: descontoVT,
      outrosDescontosTotal: outrosTotal,
      salarioLiquido,
      fgtsEmpresa,
      aliquotaTotalDescontos,
      usouDescontoSimplificado,
    };
  }, [salarioBruto, dependentes, pensaoAlimenticia, percentualVT, outrosDescontos]);

  const res = calcolaSalario();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Salário Líquido CLT</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>CLT, Portaria MPS/MF & Tabela Progressiva INSS/IRRF 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calculadora de Salário Líquido CLT 2026 <br className="hidden sm:inline" />
          <span className="text-emerald-600">Desconto do INSS, IRRF e Dedução Simplificada</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Trabalhista Direta:</strong> O <strong>salário líquido CLT</strong> é o valor final que cai na conta bancária do trabalhador após a dedução progressiva do <strong>INSS (7,5% a 14%)</strong>, do <strong>Imposto de Renda Retido na Fonte (IRRF)</strong> — aplicando automaticamente a dedução legal ou o desconto simplificado mais vantajoso —, e de eventuais descontos como vale-transporte (até 6%), pensão alimentícia e coparticipações.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Dados do Contracheque (Holerite)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSalarioBruto(4500);
                setDependentes(1);
                setPensaoAlimenticia(0);
                setPercentualVT(0);
                setOutrosDescontos(0);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Salário Bruto */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Salário Bruto Registrado (R$)</span>
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
                placeholder="Ex. 4500.00"
              />
            </div>

            {/* Dependentes & Pensão */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Número de Dependentes</span>
                  <span className="text-slate-400 font-normal">R$ 189,59 cada</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={15}
                  value={dependentes}
                  onChange={(e) => setDependentes(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Pensão Alimentícia (R$)</label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={pensaoAlimenticia || ''}
                  onChange={(e) => setPensaoAlimenticia(Number(e.target.value))}
                  placeholder="0,00"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Vale Transporte & Outros Descontos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Vale-Transporte (%)</span>
                  <span className="text-slate-400 font-normal">Máx. 6% CLT</span>
                </label>
                <select
                  value={percentualVT}
                  onChange={(e) => setPercentualVT(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value={0}>0% (Não optante / Empresa custeia)</option>
                  <option value={2}>2%</option>
                  <option value={4}>4%</option>
                  <option value={6}>6% (Desconto padrão integral)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Plano de Saúde / Outros (R$)</label>
                <input
                  type="number"
                  min={0}
                  step={20}
                  value={outrosDescontos || ''}
                  onChange={(e) => setOutrosDescontos(Number(e.target.value))}
                  placeholder="0,00"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Cálculo automático comparativo entre deduções legais e o desconto simplificado da Receita Federal.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Salário Líquido Mensal
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              CLT 2026
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Valor Líquido a Receber</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              R$ {res.salarioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
              {(100 - res.aliquotaTotalDescontos).toFixed(1)}% do salário bruto preservado
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Salário Bruto</span>
              <span className="font-mono text-white">R$ {res.salarioBruto.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Desconto INSS ({res.inssAliquotaEfetiva.toFixed(2)}% efetivo)</span>
              <span className="font-mono text-rose-400 font-bold">- R$ {res.inssDesconto.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Desconto IRRF ({res.irrfAliquotaEfetiva.toFixed(2)}% efetivo)</span>
              <span className="font-mono text-rose-400 font-bold">- R$ {res.irrfDesconto.toFixed(2)}</span>
            </div>
            {res.descontoValeTransporte > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Vale-Transporte ({percentualVT}%)</span>
                <span className="font-mono text-amber-400">- R$ {res.descontoValeTransporte.toFixed(2)}</span>
              </div>
            )}
            {res.outrosDescontosTotal > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>Outros Descontos & Pensão</span>
                <span className="font-mono text-amber-400">- R$ {res.outrosDescontosTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 pt-2 border-t border-slate-800 text-slate-300">
              <span>Depósito FGTS 8% (Empresa recolhe)</span>
              <span className="font-mono text-emerald-400 font-bold">+ R$ {res.fgtsEmpresa.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Opção Tributária Aplicada:</strong>
            <p>
              {res.usouDescontoSimplificado
                ? 'Aplicado o Desconto Simplificado da Receita Federal (R$ 564,80), que proporcionou menor imposto retido que as deduções legais.'
                : 'Aplicadas as Deduções Legais Tradicionais (INSS + dependentes + pensão), por serem mais vantajosas que o desconto simplificado.'}
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Como Funciona o Cálculo do Salário Líquido no Brasil (CLT)
          </h2>
          <p>
            O cálculo do salário líquido sob o regime da <strong>Consolidação das Leis do Trabalho (Decreto-Lei nº 5.452/1943)</strong> segue uma sequência legal estrita de apuração e descontos compulsórios determinados pela legislação previdenciária e tributária brasileira.
          </p>
          <p>
            O empregador atua como substituto tributário, recolhendo e repassando diretamente aos cofres públicos a contribuição previdenciária destinada ao <strong>Instituto Nacional do Seguro Social (INSS)</strong> e o <strong>Imposto de Renda Retido na Fonte (IRRF)</strong> à Receita Federal do Brasil.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            1. Tabela Progressiva de Contribuição ao INSS
          </h3>
          <p>
            A partir da Reforma da Previdência (Emenda Constitucional nº 103/2019), o desconto do INSS deixou de ser uma alíquota única sobre o total do salário e passou a ser calculado de forma <strong>progressiva por faixas</strong>, idêntico ao modelo do imposto de renda:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th className="py-2.5 px-3 font-bold">Faixa Salarial</th>
                  <th className="py-2.5 px-3 font-bold">Alíquota Nominal</th>
                  <th className="py-2.5 px-3 font-bold">Incidência da Alíquota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Até R$ 1.412,00</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">7,50%</td>
                  <td className="py-2.5 px-3">Incide exclusivamente sobre o valor até o salário mínimo.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">De R$ 1.412,01 até R$ 2.666,68</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">9,00%</td>
                  <td className="py-2.5 px-3">Incide sobre a fatia entre R$ 1.412,01 e R$ 2.666,68.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">De R$ 2.666,69 até R$ 4.000,03</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">12,00%</td>
                  <td className="py-2.5 px-3">Incide sobre a fatia entre R$ 2.666,69 e R$ 4.000,03.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">De R$ 4.000,04 até R$ 7.786,02</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">14,00%</td>
                  <td className="py-2.5 px-3">Incide sobre a fatia até o Teto Máximo do RGPS.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            2. Desconto do IRRF e a Dedução Simplificada da Receita Federal
          </h3>
          <p>
            O cálculo do imposto de renda incide sobre a base líquida de INSS e deduções:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1">
            <p><strong>Base IRRF = Salário Bruto &minus; INSS Progressivo &minus; (Dependentes &times; R$ 189,59) &minus; Pensão Alimentícia</strong></p>
            <p className="text-xs text-slate-600 font-sans mt-2">
              A Medida Provisória nº 1.171/2023 introduziu o <strong>desconto simplificado mensal de R$ 564,80</strong>. O sistema contábil ou nossa calculadora compara automaticamente: se as deduções legais somadas forem inferiores a R$ 564,80, aplica-se o desconto simplificado para reduzir o imposto devido pelo trabalhador.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            3. FGTS: Não é Desconto do Trabalhador
          </h3>
          <p>
            O <strong>Fundo de Garantia do Tempo de Serviço (FGTS)</strong> corresponde a <strong>8% do salário bruto</strong> (ou 2% para contrato de aprendizagem). É uma obrigação exclusiva do empregador, depositada mensalmente em conta vinculada na Caixa Econômica Federal em nome do empregado, <em>sem qualquer dedução no holerite</em>.
          </p>
        </div>
      </div>
    </div>
  );
}
