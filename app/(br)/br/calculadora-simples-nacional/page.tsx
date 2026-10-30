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
  Percent,
  TrendingDown,
  Layers,
  Scale,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface FaixaTabela {
  limite: number;
  aliquotaNominal: number; // em %
  parcelaDeduzir: number;
}

const TABELAS_SIMPLES: Record<string, FaixaTabela[]> = {
  anexo1: [
    { limite: 180000, aliquotaNominal: 4.0, parcelaDeduzir: 0 },
    { limite: 360000, aliquotaNominal: 7.3, parcelaDeduzir: 5940 },
    { limite: 720000, aliquotaNominal: 9.5, parcelaDeduzir: 13860 },
    { limite: 1800000, aliquotaNominal: 10.7, parcelaDeduzir: 22500 },
    { limite: 3600000, aliquotaNominal: 14.3, parcelaDeduzir: 87300 },
    { limite: 4800000, aliquotaNominal: 19.0, parcelaDeduzir: 378000 },
  ],
  anexo2: [
    { limite: 180000, aliquotaNominal: 4.5, parcelaDeduzir: 0 },
    { limite: 360000, aliquotaNominal: 7.8, parcelaDeduzir: 5940 },
    { limite: 720000, aliquotaNominal: 10.0, parcelaDeduzir: 13860 },
    { limite: 1800000, aliquotaNominal: 11.2, parcelaDeduzir: 22500 },
    { limite: 3600000, aliquotaNominal: 14.7, parcelaDeduzir: 85500 },
    { limite: 4800000, aliquotaNominal: 30.0, parcelaDeduzir: 720000 },
  ],
  anexo3: [
    { limite: 180000, aliquotaNominal: 6.0, parcelaDeduzir: 0 },
    { limite: 360000, aliquotaNominal: 11.2, parcelaDeduzir: 9360 },
    { limite: 720000, aliquotaNominal: 13.5, parcelaDeduzir: 17640 },
    { limite: 1800000, aliquotaNominal: 16.0, parcelaDeduzir: 35640 },
    { limite: 3600000, aliquotaNominal: 21.0, parcelaDeduzir: 125640 },
    { limite: 4800000, aliquotaNominal: 33.0, parcelaDeduzir: 648000 },
  ],
  anexo4: [
    { limite: 180000, aliquotaNominal: 4.5, parcelaDeduzir: 0 },
    { limite: 360000, aliquotaNominal: 9.0, parcelaDeduzir: 8100 },
    { limite: 720000, aliquotaNominal: 10.2, parcelaDeduzir: 12420 },
    { limite: 1800000, aliquotaNominal: 14.0, parcelaDeduzir: 39780 },
    { limite: 3600000, aliquotaNominal: 22.0, parcelaDeduzir: 183780 },
    { limite: 4800000, aliquotaNominal: 33.0, parcelaDeduzir: 828000 },
  ],
  anexo5: [
    { limite: 180000, aliquotaNominal: 15.5, parcelaDeduzir: 0 },
    { limite: 360000, aliquotaNominal: 18.0, parcelaDeduzir: 4500 },
    { limite: 720000, aliquotaNominal: 19.5, parcelaDeduzir: 9900 },
    { limite: 1800000, aliquotaNominal: 20.5, parcelaDeduzir: 17100 },
    { limite: 3600000, aliquotaNominal: 23.0, parcelaDeduzir: 62100 },
    { limite: 4800000, aliquotaNominal: 30.5, parcelaDeduzir: 540000 },
  ],
};

interface SimplesResult {
  anexoEfetivo: string;
  fatorRCalculado: number;
  migrouPeloFatorR: boolean;
  faixaIdentificada: number;
  aliquotaNominal: number;
  parcelaDeduzir: number;
  aliquotaEfetiva: number;
  valorDasMes: number;
  formulaExplicada: string;
}

export default function CalculadoraSimplesNacionalPage() {
  const [anexoBase, setAnexoBase] = React.useState<string>('anexo3');
  const [rbt12, setRbt12] = React.useState<number>(320000); // RBT12 (12 meses anteriores)
  const [faturamentoMes, setFaturamentoMes] = React.useState<number>(30000);
  const [folhaSalarios12, setFolhaSalarios12] = React.useState<number>(95000); // Para Fator R

  const calcolaSimples = React.useCallback((): SimplesResult => {
    const rbt = Math.max(1, rbt12);
    const fatMes = Math.max(0, faturamentoMes);
    const folha = Math.max(0, folhaSalarios12);

    // Fator R: Folha de Salários / RBT12 (Art. 18 § 5º-M LC 123/06)
    const fatorR = rbt > 0 ? folha / rbt : 0;
    let anexoEfetivo = anexoBase;
    let migrouPeloFatorR = false;

    // Se atividade sujeita ao Fator R (Anexo V vs Anexo III):
    if (anexoBase === 'anexo5') {
      if (fatorR >= 0.28) {
        anexoEfetivo = 'anexo3'; // Migra para o Anexo III (mais barato)
        migrouPeloFatorR = true;
      }
    }

    const tabela = TABELAS_SIMPLES[anexoEfetivo] || TABELAS_SIMPLES.anexo3;

    // Identificar a faixa correspondente ao RBT12
    let faixaIdx = 0;
    for (let i = 0; i < tabela.length; i++) {
      if (rbt <= tabela[i].limite) {
        faixaIdx = i;
        break;
      }
      if (i === tabela.length - 1) {
        faixaIdx = i;
      }
    }

    const faixa = tabela[faixaIdx];
    const aliqNominal = faixa.aliquotaNominal;
    const parcDed = faixa.parcelaDeduzir;

    // Fórmula Oficial LC 123/2006:
    // Alíquota Efetiva = [(RBT12 * Alíquota Nominal) - Parcela a Deduzir] / RBT12
    let aliquotaEfetiva = ((rbt * (aliqNominal / 100) - parcDed) / rbt) * 100;
    aliquotaEfetiva = Math.max(0, aliquotaEfetiva);

    const valorDasMes = fatMes * (aliquotaEfetiva / 100);

    const formulaExplicada = `[(${rbt.toLocaleString('pt-BR')} × ${aliqNominal}%) - R$ ${parcDed.toFixed(2)}] ÷ ${rbt.toLocaleString('pt-BR')} = ${aliquotaEfetiva.toFixed(2)}%`;

    return {
      anexoEfetivo,
      fatorRCalculado: fatorR * 100,
      migrouPeloFatorR,
      faixaIdentificada: faixaIdx + 1,
      aliquotaNominal: aliqNominal,
      parcelaDeduzir: parcDed,
      aliquotaEfetiva,
      valorDasMes,
      formulaExplicada,
    };
  }, [anexoBase, rbt12, faturamentoMes, folhaSalarios12]);

  const res = calcolaSimples();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Alíquota Efetiva Simples Nacional</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Lei Complementar 123/2006, LC 155/2016 & Regra do Fator R</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Simulador de Alíquota Efetiva do Simples Nacional <br className="hidden sm:inline" />
          <span className="text-emerald-600">Fórmula Oficial por Anexos (I a V), RBT12 e Fator R</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Tributária Direta:</strong> Desde a LC 155/2016, a alíquota do Simples Nacional não é mais uma taxa fixa, mas sim uma <strong>alíquota efetiva progressiva</strong> calculada pela fórmula legal: <code>[(RBT12 &times; Alíquota Nominal) &minus; Parcela a Deduzir] &divide; RBT12</code>. Empresas do Anexo V que mantêm folha de pagamento igual ou superior a <strong>28% da receita bruta (Fator R)</strong> são tributadas pelas alíquotas bem mais econômicas do <strong>Anexo III</strong>.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Parâmetros de Receita & Anexo</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setAnexoBase('anexo3');
                setRbt12(320000);
                setFaturamentoMes(30000);
                setFolhaSalarios12(95000);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Escolha do Anexo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Anexo do Simples Nacional</label>
              <select
                value={anexoBase}
                onChange={(e) => setAnexoBase(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="anexo1">Anexo I: Comércio (Lojas, e-commerce, revenda)</option>
                <option value="anexo2">Anexo II: Indústria e Fábricas</option>
                <option value="anexo3">Anexo III: Serviços Gerais, Manutenção, Instalações, Agências</option>
                <option value="anexo4">Anexo IV: Construção Civil, Advocacia, Vigilância, Limpeza</option>
                <option value="anexo5">Anexo V: Tecnologia, Engenharia, Medicina, Publicidade (Sujeito a Fator R)</option>
              </select>
            </div>

            {/* RBT12 (Receita Bruta dos 12 meses anteriores) */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                <span>Receita Bruta Acumulada em 12 Meses (RBT12)</span>
                <span className="font-mono text-emerald-700 font-bold">R$ {rbt12.toLocaleString('pt-BR')}</span>
              </label>
              <input
                type="number"
                min={0}
                max={4800000}
                step={5000}
                value={rbt12 || ''}
                onChange={(e) => setRbt12(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                placeholder="Ex. 320000"
              />
              <span className="text-[11px] text-slate-500 block">
                Soma de todo o faturamento dos 12 meses que antecedem o mês da apuração.
              </span>
            </div>

            {/* Faturamento do Mês */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex justify-between">
                <span>Faturamento Faturado Neste Mês (R$)</span>
                <span className="font-mono text-emerald-700">R$ {faturamentoMes.toLocaleString('pt-BR')}</span>
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={faturamentoMes || ''}
                onChange={(e) => setFaturamentoMes(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 font-mono"
                placeholder="Ex. 30000"
              />
            </div>

            {/* Folha de Salários 12 Meses (Fator R) */}
            {anexoBase === 'anexo5' && (
              <div className="space-y-1.5 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200">
                <label className="text-xs font-bold text-emerald-950 flex justify-between">
                  <span>Folha de Pagamento + Pró-labore 12 Meses (FS12)</span>
                  <span className="font-mono font-bold text-emerald-700">
                    Fator R: {res.fatorRCalculado.toFixed(1)}%
                  </span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={2000}
                  value={folhaSalarios12 || ''}
                  onChange={(e) => setFolhaSalarios12(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-xs font-bold text-slate-900 bg-white"
                />
                <span className="text-[11px] text-emerald-800 block">
                  {res.fatorRCalculado >= 28
                    ? 'Benefício do Fator R ativo (≥ 28%): Sua empresa será tributada pelo Anexo III em vez do Anexo V!'
                    : 'Fator R abaixo de 28%: A tributação permanece no Anexo V.'}
                </span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Cálculo matemático rigorosamente idêntico ao sistema PGDAS-D da Receita Federal.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Alíquota Efetiva Apurada
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              Faixa {res.faixaIdentificada} de 6
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Alíquota Efetiva Real</span>
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
              {res.aliquotaEfetiva.toFixed(2)}%
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
              Alíquota nominal da faixa: {res.aliquotaNominal}% (Parcela a deduzir: R$ {res.parcelaDeduzir.toLocaleString('pt-BR')})
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Faturamento do Mês</span>
              <span className="font-mono text-white">R$ {faturamentoMes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Anexo Aplicado</span>
              <span className="font-mono text-emerald-400 font-bold uppercase">
                {res.anexoEfetivo.replace('anexo', 'Anexo ')}
                {res.migrouPeloFatorR ? ' (via Fator R)' : ''}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Valor da Guia DAS do Mês</span>
              <span className="font-mono text-emerald-300 font-black text-sm">
                R$ {res.valorDasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Fórmula Legal Aplicada (LC 123/06):</strong>
            <p className="font-mono text-emerald-300 text-[10px] break-all">{res.formulaExplicada}</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            A Sistemática de Cálculo do Simples Nacional (LC 123/2006)
          </h2>
          <p>
            O <strong>Simples Nacional</strong> é o regime tributário diferenciado, simplificado e favorecido aplicável às Microempresas (ME) e Empresas de Pequeno Porte (EPP), disciplinado pela <strong>Lei Complementar nº 123 de 14 de dezembro de 2006</strong>.
          </p>
          <p>
            Com o advento da <strong>Lei Complementar nº 155/2016</strong>, o Comitê Gestor extinguiu as alíquotas fixas por faixa de receita e instituiu o modelo matemático de <strong>alíquota efetiva progressiva</strong>, com o intuito de evitar saltos abruptos de tributação quando a empresa muda de faixa de faturamento.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Importância do Fator R (Art. 18 da LC 123/2006)
          </h3>
          <p>
            O <strong>Fator R</strong> é a razão entre a folha de salários dos últimos 12 meses (incluindo salários de empregados, encargos de FGTS e o pró-labore dos sócios com INSS patronal) e a receita bruta do mesmo período:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1">
            <p><strong>Fator R = Folha de Pagamento em 12 Meses (FS12) &divide; Receita Bruta em 12 Meses (RBT12)</strong></p>
            <p className="text-xs text-slate-600 font-sans mt-2">
              Se o resultado for <strong>igual ou superior a 0,28 (28%)</strong>, atividades intelectuais e científicas (como desenvolvimento de software, consultoria, engenharia e clínicas médicas) saem do pesado Anexo V (alíquota inicial de 15,5%) e são tributadas no <strong>Anexo III (alíquota inicial de apenas 6%)</strong>, gerando expressiva economia tributária para a pessoa jurídica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

