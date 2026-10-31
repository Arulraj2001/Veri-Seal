'use client';

import * as React from 'react';
import {
  ShieldCheck,
  RotateCcw,
  FileCheck2,
} from 'lucide-react';

const CIDADES_ITBI: Record<string, { nome: string; aliq: number }> = {
  sao_paulo: { nome: 'São Paulo - SP (3,0%)', aliq: 3.0 },
  rio_de_janeiro: { nome: 'Rio de Janeiro - RJ (3,0%)', aliq: 3.0 },
  belo_horizonte: { nome: 'Belo Horizonte - MG (3,0%)', aliq: 3.0 },
  curitiba: { nome: 'Curitiba - PR (2,7%)', aliq: 2.7 },
  porto_alegre: { nome: 'Porto Alegre - RS (3,0%)', aliq: 3.0 },
  salvador: { nome: 'Salvador - BA (3,0%)', aliq: 3.0 },
  brasilia: { nome: 'Brasília - DF (3,0%)', aliq: 3.0 },
  fortaleza: { nome: 'Fortaleza - CE (3,0%)', aliq: 3.0 },
  recife: { nome: 'Recife - PE (3,0%)', aliq: 3.0 },
  outra: { nome: 'Outro Município (Alíquota personalizada)', aliq: 2.5 },
};

interface CustosImovelResult {
  valorImovel: number;
  aliquotaItbi: number;
  valorItbi: number;
  custoEscritura: number;
  custoRegistroOriginal: number;
  descontoPrimeiroImovel50: number;
  custoRegistroFinal: number;
  totalDespesasCartorioImpostos: number;
  percentualSobreImovel: number;
  ehFinanciado: boolean;
  ehPrimeiroImovelSfh: boolean;
}

export function CalculadoraItbiEscrituraClient() {
  const [valorImovel, setValorImovel] = React.useState<number>(450000);
  const [cidadeKey, setCidadeKey] = React.useState<string>('sao_paulo');
  const [aliqCustom, setAliqCustom] = React.useState<number>(2.5);
  const [tipoCompra, setTipoCompra] = React.useState<'a_vista' | 'financiado'>('financiado');
  const [primeiroImovelSfh, setPrimeiroImovelSfh] = React.useState<boolean>(true);

  const calcolaCustos = React.useCallback((): CustosImovelResult => {
    const valor = Math.max(0, valorImovel);
    const aliq = cidadeKey === 'outra' ? Math.max(0, aliqCustom) : (CIDADES_ITBI[cidadeKey]?.aliq ?? 3.0);
    const ehFinanciado = tipoCompra === 'financiado';

    const valorItbi = valor * (aliq / 100);

    let custoEscritura = 0;
    if (!ehFinanciado) {
      custoEscritura = Math.min(8500, Math.max(1200, valor * 0.009));
    }

    const custoRegistroOriginal = Math.min(7500, Math.max(1000, valor * 0.008));

    let descontoPrimeiroImovel50 = 0;
    let custoRegistroFinal = custoRegistroOriginal;

    if (ehFinanciado && primeiroImovelSfh) {
      descontoPrimeiroImovel50 = custoRegistroOriginal * 0.5;
      custoRegistroFinal = custoRegistroOriginal - descontoPrimeiroImovel50;
    }

    const totalDespesas = valorItbi + custoEscritura + custoRegistroFinal;
    const percentualSobreImovel = valor > 0 ? (totalDespesas / valor) * 100 : 0;

    return {
      valorImovel: valor,
      aliquotaItbi: aliq,
      valorItbi,
      custoEscritura,
      custoRegistroOriginal,
      descontoPrimeiroImovel50,
      custoRegistroFinal,
      totalDespesasCartorioImpostos: totalDespesas,
      percentualSobreImovel,
      ehFinanciado,
      ehPrimeiroImovelSfh: ehFinanciado && primeiroImovelSfh,
    };
  }, [valorImovel, cidadeKey, aliqCustom, tipoCompra, primeiroImovelSfh]);

  const res = calcolaCustos();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Column (7 cols) */}
      <div className="lg:col-span-7 bg-slate-800/60 p-6 sm:p-7 rounded-2xl border border-slate-700/60 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center gap-2 font-black text-sm text-slate-100 uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>Dados do Negócio Imobiliário</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setValorImovel(450000);
              setCidadeKey('sao_paulo');
              setAliqCustom(2.5);
              setTipoCompra('financiado');
              setPrimeiroImovelSfh(true);
            }}
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Valor de Compra e Venda */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Valor Efetivo da Compra do Imóvel (R$)</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">
                R$ {valorImovel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </label>
            <input
              type="number"
              min={50000}
              step={10000}
              value={valorImovel || ''}
              onChange={(e) => setValorImovel(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-white transition-all font-mono"
              placeholder="Ex. 450000"
            />
          </div>

          {/* Cidade / Município do Imóvel */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Município de Localização do Imóvel (ITBI)</label>
            <select
              value={cidadeKey}
              onChange={(e) => setCidadeKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              {Object.entries(CIDADES_ITBI).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>

          {cidadeKey === 'outra' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Alíquota de ITBI da sua Cidade (%)</label>
              <input
                type="number"
                min={1}
                max={5}
                step={0.1}
                value={aliqCustom}
                onChange={(e) => setAliqCustom(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-600 text-xs font-bold text-slate-200 bg-slate-900 font-mono"
              />
            </div>
          )}

          {/* Modalidade de Aquisição */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Forma de Pagamento / Modalidade</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTipoCompra('financiado')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  tipoCompra === 'financiado'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600 bg-slate-900'
                }`}
              >
                <span className="text-white font-semibold">Financiamento Habitacional</span>
                <span className="text-[10px] text-slate-400 font-normal mt-1">Dispensa escritura pública em cartório</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoCompra('a_vista')}
                className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  tipoCompra === 'a_vista'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600 bg-slate-900'
                }`}
              >
                <span className="text-white font-semibold">Pagamento À Vista / Direto</span>
                <span className="text-[10px] text-slate-400 font-normal mt-1">Exige escritura pública no Tabelião</span>
              </button>
            </div>
          </div>

          {/* Desconto 50% Primeiro Imóvel SFH */}
          {tipoCompra === 'financiado' && (
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 cursor-pointer hover:bg-emerald-950/60 transition-colors">
              <input
                type="checkbox"
                checked={primeiroImovelSfh}
                onChange={(e) => setPrimeiroImovelSfh(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded border-slate-600 bg-slate-900 focus:ring-emerald-500"
              />
              <div className="text-xs text-emerald-200">
                <strong className="block font-bold text-white">Primeiro Imóvel Residencial financiado pelo SFH</strong>
                <span className="text-[11px] text-emerald-400">
                  Aplica desconto compulsório de <strong>50% nos emolumentos de registro (Art. 290 da Lei 6.015/73)</strong>.
                </span>
              </div>
            </label>
          )}
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Tema 1113 do STJ: o ITBI deve incidir estritamente sobre o valor real do negócio declarado pelo adquirente.</span>
        </div>
      </div>

      {/* Results Column (5 cols) */}
      <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Total Custos de Transferência
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
            {res.percentualSobreImovel.toFixed(2)}% do Imóvel
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
          <span className="text-xs text-emerald-300 font-medium">Estimativa Total de Impostos & Cartório</span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
            R$ {res.totalDespesasCartorioImpostos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block">
            Prefeitura Municipal + Cartório de Registro de Imóveis (RGI)
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>ITBI Prefeitura ({res.aliquotaItbi}%)</span>
            <span className="font-mono text-emerald-400 font-bold">R$ {res.valorItbi.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Escritura Pública (Tabelionato de Notas)</span>
            <span className="font-mono text-white">
              {res.ehFinanciado ? 'R$ 0,00 (Contrato bancário substitui)' : `R$ ${res.custoEscritura.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
            <span>Registro de Imóveis RGI (Tabela Estadual)</span>
            <span className="font-mono text-white">R$ {res.custoRegistroOriginal.toFixed(2)}</span>
          </div>
          {res.descontoPrimeiroImovel50 > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Desconto 50% 1º Imóvel SFH (Art. 290)</span>
              <span className="font-mono text-emerald-400 font-bold">- R$ {res.descontoPrimeiroImovel50.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 text-slate-300 font-semibold">
            <span>Registro RGI com Desconto</span>
            <span className="font-mono text-cyan-300 font-bold">R$ {res.custoRegistroFinal.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <strong className="text-slate-300 block">Dica de Financiamento:</strong>
          <p>
            A maioria dos bancos (Caixa, Itaú, Bradesco, Santander) permite incluir até <strong>5% do valor financiado</strong> para custear o ITBI e emolumentos cartorários, diluindo o desembolso inicial nas prestações mensais.
          </p>
        </div>
      </div>
    </div>
  );
}

