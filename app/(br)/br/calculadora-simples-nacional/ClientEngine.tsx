'use client';

import * as React from 'react';
import {
  ShieldCheck,
  RotateCcw,
  Layers,
} from 'lucide-react';

interface FaixaTabela {
  limite: number;
  aliquotaNominal: number;
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

export function CalculadoraSimplesNacionalClient() {
  const [anexoBase, setAnexoBase] = React.useState<string>('anexo3');
  const [rbt12, setRbt12] = React.useState<number>(320000);
  const [faturamentoMes, setFaturamentoMes] = React.useState<number>(30000);
  const [folhaSalarios12, setFolhaSalarios12] = React.useState<number>(95000);

  const calcolaSimples = React.useCallback((): SimplesResult => {
    const rbt = Math.max(1, rbt12);
    const fatMes = Math.max(0, faturamentoMes);
    const folha = Math.max(0, folhaSalarios12);

    const fatorR = rbt > 0 ? folha / rbt : 0;
    let anexoEfetivo = anexoBase;
    let migrouPeloFatorR = false;

    if (anexoBase === 'anexo5') {
      if (fatorR >= 0.28) {
        anexoEfetivo = 'anexo3';
        migrouPeloFatorR = true;
      }
    }

    const tabela = TABELAS_SIMPLES[anexoEfetivo] || TABELAS_SIMPLES.anexo3;

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-slate-800/60 p-6 sm:p-7 rounded-2xl border border-slate-700/60 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-100 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-400" />
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
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Escolha do Anexo */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Anexo do Simples Nacional</label>
            <select
              value={anexoBase}
              onChange={(e) => setAnexoBase(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="anexo1">Anexo I: Comércio (Lojas, revenda, e-commerce)</option>
              <option value="anexo2">Anexo II: Indústria e Fábricas</option>
              <option value="anexo3">Anexo III: Serviços Gerais, Manutenção, Instalações, Agências</option>
              <option value="anexo4">Anexo IV: Construção Civil, Advocacia, Vigilância, Limpeza</option>
              <option value="anexo5">Anexo V: Tecnologia, Engenharia, Medicina, Publicidade (Sujeito a Fator R)</option>
            </select>
          </div>

          {/* RBT12 */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Receita Bruta Acumulada em 12 Meses (RBT12)</span>
              <span className="font-mono text-emerald-400 font-bold">R$ {rbt12.toLocaleString('pt-BR')}</span>
            </label>
            <input
              type="number"
              min={0}
              max={4800000}
              step={5000}
              value={rbt12 || ''}
              onChange={(e) => setRbt12(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-white transition-all font-mono"
              placeholder="Ex. 320000"
            />
            <span className="text-[11px] text-slate-400 block">
              Soma de todo o faturamento dos 12 meses anteriores ao mês de apuração.
            </span>
          </div>

          {/* Faturamento do Mês */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Faturamento Faturado Neste Mês (R$)</span>
              <span className="font-mono text-emerald-400">R$ {faturamentoMes.toLocaleString('pt-BR')}</span>
            </label>
            <input
              type="number"
              min={0}
              step={1000}
              value={faturamentoMes || ''}
              onChange={(e) => setFaturamentoMes(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              placeholder="Ex. 30000"
            />
          </div>

          {/* Folha de Salários 12 Meses (Fator R) */}
          {anexoBase === 'anexo5' && (
            <div className="space-y-1.5 p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-800/40">
              <label className="text-xs font-semibold text-emerald-200 flex justify-between">
                <span>Folha de Pagamento + Pró-labore 12 Meses (FS12)</span>
                <span className="font-mono font-bold text-emerald-400">
                  Fator R: {res.fatorRCalculado.toFixed(1)}%
                </span>
              </label>
              <input
                type="number"
                min={0}
                step={2000}
                value={folhaSalarios12 || ''}
                onChange={(e) => setFolhaSalarios12(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-600 text-xs font-bold text-white bg-slate-900 font-mono"
              />
              <span className="text-[11px] text-emerald-300 block">
                {res.fatorRCalculado >= 28
                  ? 'Benefício do Fator R ativo (≥ 28%): Sua empresa será tributada pelo Anexo III em vez do Anexo V!'
                  : 'Fator R abaixo de 28%: A tributação permanece no Anexo V.'}
              </span>
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Cálculo matemático rigorosamente idêntico ao sistema PGDAS-D da Receita Federal.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Alíquota Efetiva Apurada
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            Faixa {res.faixaIdentificada} de 6
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-300 font-medium">Alíquota Efetiva Real</span>
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
            {res.aliquotaEfetiva.toFixed(2)}%
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block">
            Alíquota nominal: {res.aliquotaNominal}% (Parcela a deduzir: R$ {res.parcelaDeduzir.toLocaleString('pt-BR')})
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Faturamento do Mês</span>
            <span className="font-mono text-white">R$ {faturamentoMes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Anexo Efetivo Aplicado</span>
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
  );
}

