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
  FileCheck2,
  Home,
  Scale,
  Percent,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

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

export default function CalculadoraItbiEscrituraPage() {
  const [valorImovel, setValorImovel] = React.useState<number>(450000);
  const [cidadeKey, setCidadeKey] = React.useState<string>('sao_paulo');
  const [aliqCustom, setAliqCustom] = React.useState<number>(2.5);
  const [tipoCompra, setTipoCompra] = React.useState<'a_vista' | 'financiado'>('financiado');
  const [primeiroImovelSfh, setPrimeiroImovelSfh] = React.useState<boolean>(true); // Art. 290 Lei 6.015/73

  const calcolaCustos = React.useCallback((): CustosImovelResult => {
    const valor = Math.max(0, valorImovel);
    const aliq = cidadeKey === 'outra' ? Math.max(0, aliqCustom) : (CIDADES_ITBI[cidadeKey]?.aliq ?? 3.0);
    const ehFinanciado = tipoCompra === 'financiado';

    // 1. ITBI (Tema 1113 STJ: sobre o valor real da transação)
    const valorItbi = valor * (aliq / 100);

    // 2. Escritura Pública (Tabelionato de Notas)
    // Se financiado pelo SFH/SFI, o contrato bancário tem força de escritura pública (dispensa cartório de notas)
    let custoEscritura = 0;
    if (!ehFinanciado) {
      // Média nacional das tabelas estaduais de custas notariais progressivas (~0.8% a 1.2% do valor com teto)
      custoEscritura = Math.min(8500, Math.max(1200, valor * 0.009));
    }

    // 3. Registro de Imóveis (RGI)
    // Estimativa baseada nas tabelas estaduais de emolumentos do Tribunal de Justiça (~0.7% a 1.0%)
    const custoRegistroOriginal = Math.min(7500, Math.max(1000, valor * 0.008));

    // Art. 290 da Lei 6.015/1973: desconto de 50% para primeiro imóvel residencial financiado pelo SFH
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">ITBI e Custos de Cartório</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tema 1113 do STJ, Lei 6.015/1973 (Art. 290) & Emolumentos Notariais</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calculadora de ITBI e Custos de Cartório de Imóvel <br className="hidden sm:inline" />
          <span className="text-emerald-600">Escritura Pública, Registro RGI e Desconto SFH</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Imobiliária Direta:</strong> Na compra de um imóvel, os custos com impostos e cartórios costumam representar de <strong>4% a 6% do valor da transação</strong>. Incluem o <strong>ITBI municipal</strong> (2% a 3% sobre o valor da compra conforme tese do STJ), a <strong>Escritura Pública</strong> (dispensada em contratos financiados por banco) e o <strong>Registro de Imóveis (RGI)</strong> — que conta com <strong>desconto compulsório de 50% por lei</strong> caso seja o primeiro imóvel residencial financiado pelo SFH.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
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
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Valor de Compra e Venda */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                <span>Valor Efetivo da Compra do Imóvel (R$)</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  R$ {valorImovel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </label>
              <input
                type="number"
                min={50000}
                step={10000}
                value={valorImovel || ''}
                onChange={(e) => setValorImovel(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                placeholder="Ex. 450000"
              />
            </div>

            {/* Cidade / Município do Imóvel */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Município de Localização do Imóvel (ITBI)</label>
              <select
                value={cidadeKey}
                onChange={(e) => setCidadeKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                <label className="text-xs font-bold text-slate-800">Alíquota de ITBI da sua Cidade (%)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  value={aliqCustom}
                  onChange={(e) => setAliqCustom(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                />
              </div>
            )}

            {/* Modalidade de Aquisição */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Forma de Pagamento / Modalidade</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTipoCompra('financiado')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    tipoCompra === 'financiado'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Financiamento Habitacional</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Dispensa escritura pública em cartório</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTipoCompra('a_vista')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    tipoCompra === 'a_vista'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Pagamento À Vista / Direto</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Exige escritura pública no Tabelião</span>
                </button>
              </div>
            </div>

            {/* Desconto 50% Primeiro Imóvel SFH */}
            {tipoCompra === 'financiado' && (
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 cursor-pointer hover:bg-emerald-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={primeiroImovelSfh}
                  onChange={(e) => setPrimeiroImovelSfh(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div className="text-xs text-emerald-950">
                  <strong className="block font-bold">Primeiro Imóvel Residencial financiado pelo SFH</strong>
                  <span className="text-[11px] text-emerald-800">
                    Aplica desconto compulsório de <strong>50% nos emolumentos de registro (Art. 290 da Lei 6.015/73)</strong>.
                  </span>
                </div>
              </label>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Conforme Tema 1113 do STJ: o ITBI deve incidir sobre o valor real do negócio declarado pelo adquirente.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Total de Custos de Transferência
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              {res.percentualSobreImovel.toFixed(2)}% do Imóvel
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Estimativa Total de Impostos & Cartório</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              R$ {res.totalDespesasCartorioImpostos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
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
              <span>Registro de Imóveis RGI</span>
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
            <p>A maioria dos bancos (Caixa, Itaú, Bradesco, Santander) permite incluir até <strong>5% do valor do financiamento</strong> para custear o ITBI e despesas de cartório, diluindo o desembolso inicial nas parcelas mensais.</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Guia dos Custos de Transferência de Imóveis no Brasil
          </h2>
          <p>
            No direito civil e registral brasileiro, a transferência da propriedade de um imóvel entre pessoas vivas não se consuma com o simples contrato particular ou pagamento do preço, mas sim pelo <strong>registro do título translativo no Registro de Imóveis (Art. 1.245 do Código Civil)</strong>.
          </p>
          <p>
            Para efetivar esse registro legal, o comprador deve recolher obrigatoriamente o tributo municipal de transmissão (ITBI) e arcar com os emolumentos dos cartórios competentes.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            A Tese do Tema 1113 do Superior Tribunal de Justiça (STJ)
          </h3>
          <p>
            Por muitos anos, várias capitais brasileiras cobravam o ITBI sobre um "valor venal de referência" fixado unilateralmente pela prefeitura (frequentemente muito acima do preço de venda real do imóvel).
          </p>
          <p>
            No julgamento vinculante do <strong>Recurso Especial 1.937.821/SP (Tema 1113)</strong>, a 1ª Seção do STJ pacificou de forma definitiva três teses vinculantes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>A base de cálculo do ITBI é o <strong>valor do imóvel transmitido em condições normais de mercado</strong>, não estando vinculada à base de cálculo do IPTU;</li>
            <li>O valor da transação declarado pelo contribuinte goza da presunção de que é condizente com o valor de mercado, que somente pode ser desvirtuada pelo Fisco mediante processo administrativo próprio;</li>
            <li>O município não pode arbitrar previamente a base de cálculo do ITBI com respaldo em valor de referência por ele estabelecido unilateralmente.</li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Desconto de 50% nas Custas do Cartório (Art. 290 Lei 6.015/73)
          </h3>
          <p>
            O <strong>Artigo 290 da Lei de Registros Públicos (Lei nº 6.015/1973)</strong> determina que os emolumentos devidos pelos atos de registro e averbação relativos a imóveis financiados pelo Sistema Financeiro da Habitação (SFH) para fins exclusivamente residenciais <strong>serão reduzidos em 50% (cinquenta por cento)</strong> caso seja a primeira aquisição imobiliária do mutuário.
          </p>
          <p className="text-xs text-slate-600">
            Para usufruir do desconto legal, basta apresentar ao Cartório de Registro de Imóveis uma declaração firmada de próprio punho atestando que aquele é o primeiro imóvel residencial adquirido com recursos do SFH.
          </p>
        </div>
      </div>
    </div>
  );
}
