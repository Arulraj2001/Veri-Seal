'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  Receipt,
  Building,
  Check,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

interface RetencaoResult {
  valorBrutoNota: number;
  aliquotaIrrf: number;
  valorIrrf: number;
  dispensaIrrf10Reais: boolean;
  aliquotaPis: number;
  valorPis: number;
  aliquotaCofins: number;
  valorCofins: number;
  aliquotaCsll: number;
  valorCsll: number;
  totalCsrf465: number;
  dispensaCsrf10Reais: boolean;
  valorIssRetido: number;
  valorInssRetido: number;
  totalRetencoes: number;
  valorLiquidoReceber: number;
  ehSimplesNacional: boolean;
}

export default function RetencaoImpostosNotaFiscalPage() {
  const [valorNota, setValorNota] = React.useState<number>(5000);
  const [tipoServico, setTipoServico] = React.useState<'profissional_15' | 'limpeza_10' | 'geral'>('profissional_15');
  const [regimePrestador, setRegimePrestador] = React.useState<'lucro_presumido_real' | 'simples_nacional'>('lucro_presumido_real');
  const [aliquotaIss, setAliquotaIss] = React.useState<number>(5.0); // 2% a 5%
  const [reterInss11, setReterInss11] = React.useState<boolean>(false); // Cessão de mão de obra

  const calcolaRetencao = React.useCallback((): RetencaoResult => {
    const bruto = Math.max(0, valorNota);
    const ehSimples = regimePrestador === 'simples_nacional';

    // Se for Simples Nacional, há dispensa expressa de PIS, COFINS, CSLL e IRRF (Art. 32 Lei 10.833/03)
    if (ehSimples) {
      const valorIss = bruto * (Math.max(0, aliquotaIss) / 100);
      const valorInss = reterInss11 ? bruto * 0.11 : 0;
      const totalRet = valorIss + valorInss;

      return {
        valorBrutoNota: bruto,
        aliquotaIrrf: 0,
        valorIrrf: 0,
        dispensaIrrf10Reais: false,
        aliquotaPis: 0,
        valorPis: 0,
        aliquotaCofins: 0,
        valorCofins: 0,
        aliquotaCsll: 0,
        valorCsll: 0,
        totalCsrf465: 0,
        dispensaCsrf10Reais: false,
        valorIssRetido: valorIss,
        valorInssRetido: valorInss,
        totalRetencoes: totalRet,
        valorLiquidoReceber: Math.max(0, bruto - totalRet),
        ehSimplesNacional: true,
      };
    }

    // 1. IRRF (Art. 714 e 716 RIR/2018)
    const aliquotaIrrf = tipoServico === 'limpeza_10' ? 1.0 : 1.5;
    let valorIrrf = bruto * (aliquotaIrrf / 100);
    const dispensaIrrf10Reais = valorIrrf < 10.0;
    if (dispensaIrrf10Reais) valorIrrf = 0;

    // 2. CSRF (Art. 30 e 31 Lei 10.833/2003): PIS 0,65% + COFINS 3% + CSLL 1% = 4,65%
    let valorPis = bruto * 0.0065;
    let valorCofins = bruto * 0.03;
    let valorCsll = bruto * 0.01;
    let totalCsrf = valorPis + valorCofins + valorCsll;

    // Lei 13.137/2015: dispensa apenas se o valor da retenção conjunta for igual ou inferior a R$ 10,00
    const dispensaCsrf10Reais = totalCsrf <= 10.0;
    if (dispensaCsrf10Reais) {
      valorPis = 0;
      valorCofins = 0;
      valorCsll = 0;
      totalCsrf = 0;
    }

    // 3. ISS Municipal e INSS Cessão de Mão de Obra
    const valorIssRetido = bruto * (Math.max(0, aliquotaIss) / 100);
    const valorInssRetido = reterInss11 ? bruto * 0.11 : 0;

    const totalRetencoes = valorIrrf + totalCsrf + valorIssRetido + valorInssRetido;
    const valorLiquidoReceber = Math.max(0, bruto - totalRetencoes);

    return {
      valorBrutoNota: bruto,
      aliquotaIrrf,
      valorIrrf,
      dispensaIrrf10Reais,
      aliquotaPis: 0.65,
      valorPis,
      aliquotaCofins: 3.0,
      valorCofins,
      aliquotaCsll: 1.0,
      valorCsll,
      totalCsrf465: totalCsrf,
      dispensaCsrf10Reais,
      valorIssRetido,
      valorInssRetido,
      totalRetencoes,
      valorLiquidoReceber,
      ehSimplesNacional: false,
    };
  }, [valorNota, tipoServico, regimePrestador, aliquotaIss, reterInss11]);

  const res = calcolaRetencao();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/br" className="hover:text-slate-800 transition-colors">Brasil</Link>
        <span>/</span>
        <span className="text-emerald-700 font-semibold">Retenção de Impostos em Nota Fiscal</span>
      </nav>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Lei 10.833/2003 (CSRF 4,65%), RIR/2018 (IRRF 1,5%) & Lei 13.137/2015</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Cálculo de Retenção de Impostos em Nota Fiscal (PJ) <br className="hidden sm:inline" />
          <span className="text-emerald-600">CSRF 4,65% (PIS/COFINS/CSLL), IRRF e ISS</span>
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <strong>Resposta Tributária Direta:</strong> Na prestação de serviços entre pessoas jurídicas (B2B), a empresa tomadora é obrigada por lei a reter impostos federais na fonte: <strong>CSRF de 4,65%</strong> (PIS 0,65%, COFINS 3% e CSLL 1% via DARF código 5952) e <strong>IRRF de 1,5% ou 1,0%</strong> (DARF código 1708), dispensados apenas se o valor de cada retenção for inferior a R$ 10,00. Prestadores optantes pelo <strong>Simples Nacional</strong> possuem dispensa legal de retenção federal.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900 uppercase tracking-wider">
              <Receipt className="w-4 h-4 text-emerald-600" />
              <span>Dados da Nota Fiscal de Serviços (NFS-e)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setValorNota(5000);
                setTipoServico('profissional_15');
                setRegimePrestador('lucro_presumido_real');
                setAliquotaIss(5.0);
                setReterInss11(false);
              }}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Regime Tributário do Prestador */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Regime Tributário do Prestador do Serviço</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRegimePrestador('lucro_presumido_real')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    regimePrestador === 'lucro_presumido_real'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Lucro Presumido ou Real</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Retenção obrigatória (4,65% + IR)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRegimePrestador('simples_nacional')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                    regimePrestador === 'simples_nacional'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Optante pelo Simples Nacional</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-1">Dispensa legal de retenção federal</span>
                </button>
              </div>
            </div>

            {/* Valor Bruto da Nota */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex justify-between">
                <span>Valor Total dos Serviços na Nota (R$)</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">
                  R$ {valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </label>
              <input
                type="number"
                min={0}
                step={250}
                value={valorNota || ''}
                onChange={(e) => setValorNota(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-bold text-slate-900 transition-all font-mono"
                placeholder="Ex. 5000.00"
              />
            </div>

            {/* Tipo de Serviço & Alíquota IRRF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Natureza do Serviço Prestado</label>
                <select
                  disabled={regimePrestador === 'simples_nacional'}
                  value={tipoServico}
                  onChange={(e) => setTipoServico(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="profissional_15">Serviços Profissionais / Regulamentados (IRRF 1,5%)</option>
                  <option value="limpeza_10">Limpeza, Conservação, Segurança (IRRF 1,0%)</option>
                  <option value="geral">Serviços Gerais sem retenção de IR</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex justify-between">
                  <span>Alíquota ISS do Município (%)</span>
                  <span className="font-mono text-emerald-700">{aliquotaIss}%</span>
                </label>
                <select
                  value={aliquotaIss}
                  onChange={(e) => setAliquotaIss(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value={0}>0% (Sem retenção de ISS pelo tomador)</option>
                  <option value={2}>2,0% (Mínimo constitucional)</option>
                  <option value={3}>3,0%</option>
                  <option value={4}>4,0%</option>
                  <option value={5}>5,0% (Teto máximo constitucional)</option>
                </select>
              </div>
            </div>

            {/* INSS 11% Cessão Mão de Obra */}
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={reterInss11}
                onChange={(e) => setReterInss11(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-800 font-medium">
                Atividade com <strong>Cessão de Mão de Obra ou Empreitada</strong> (Reter 11% INSS ex Art. 31 Lei 8.212/91)
              </span>
            </label>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Regra de dispensa de retenção para valores iguais ou inferiores a R$ 10,00 aplicada automaticamente.</span>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Valor Líquido da Nota Fiscal
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
              A Pagar ao Prestador
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
            <span className="text-xs text-emerald-200 font-medium">Valor Líquido do Boleto / Transferência</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              R$ {res.valorLiquidoReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300 font-medium block">
              Total de impostos retidos: R$ {res.totalRetencoes.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
              <span>Valor Bruto Faturado</span>
              <span className="font-mono text-white">R$ {res.valorBrutoNota.toFixed(2)}</span>
            </div>

            {res.ehSimplesNacional ? (
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-emerald-300">
                <strong>Simples Nacional:</strong> Isento de retenção federal de PIS, COFINS, CSLL e IRRF conforme Art. 32 da Lei 10.833/2003.
              </div>
            ) : (
              <>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>IRRF ({res.aliquotaIrrf}%) - DARF 1708</span>
                  <span className="font-mono text-rose-400 font-bold">
                    {res.dispensaIrrf10Reais ? 'Dispensado (< R$ 10)' : `- R$ ${res.valorIrrf.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>PIS (0,65%)</span>
                  <span className="font-mono text-rose-400">- R$ {res.valorPis.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>COFINS (3,00%)</span>
                  <span className="font-mono text-rose-400">- R$ {res.valorCofins.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                  <span>CSLL (1,00%)</span>
                  <span className="font-mono text-rose-400">- R$ {res.valorCsll.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300 font-semibold">
                  <span>Total CSRF 4,65% - DARF 5952</span>
                  <span className="font-mono text-rose-400 font-bold">
                    {res.dispensaCsrf10Reais ? 'Dispensado (≤ R$ 10)' : `- R$ ${res.totalCsrf465.toFixed(2)}`}
                  </span>
                </div>
              </>
            )}

            {res.valorIssRetido > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-800/70 text-slate-300">
                <span>ISS Municipal Retido ({aliquotaIss}%)</span>
                <span className="font-mono text-amber-400 font-bold">- R$ {res.valorIssRetido.toFixed(2)}</span>
              </div>
            )}
            {res.valorInssRetido > 0 && (
              <div className="flex justify-between py-1 text-slate-300">
                <span>INSS Retido Mão de Obra (11%)</span>
                <span className="font-mono text-amber-400 font-bold">- R$ {res.valorInssRetido.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300 block">Códigos de Arrecadação para o Tomador:</strong>
            <p>• <strong>CSRF (4,65%):</strong> DARF Código 5952 (vence no último dia útil do 2º decêndio do mês seguinte).</p>
            <p>• <strong>IRRF (1,5%):</strong> DARF Código 1708.</p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Guide Content */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            A Sistemática de Retenções Tributárias Federais em Notas Fiscais
          </h2>
          <p>
            Nas operações comerciais e contratuais entre pessoas jurídicas de direito privado, a legislação fiscal transfere a responsabilidade pelo recolhimento de parte dos tributos da empresa que prestou o serviço para a <strong>empresa tomadora (cliente)</strong>, por meio do instituto da <em>substituição tributária com retenção na fonte</em>.
          </p>
          <p>
            As principais bases normativas são a <strong>Lei nº 10.833/2003 (Artigos 30 e 31)</strong> e o <strong>Regulamento do Imposto de Renda (Decreto nº 9.580/2018)</strong>.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Fim do Limite de R$ 5.000,00 (Lei nº 13.137/2015)
          </h3>
          <p>
            Historicamente, a retenção de CSRF de 4,65% só era obrigatória quando os pagamentos acumulados no mês para o mesmo prestador ultrapassassem R$ 5.000,00.
          </p>
          <p>
            A <strong>Lei nº 13.137/2015</strong> revogou expressamente essa dispensa. Desde então, a retenção deve ocorrer em qualquer nota fiscal de prestação de serviços, desde que o imposto apurado seja superior a <strong>R$ 10,00 (dez reais)</strong>.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Dispensa Legal para Optantes do Simples Nacional
          </h3>
          <p>
            Microempresas e EPPs enquadradas no Simples Nacional <strong>não sofrem retenção na fonte de IRPF, PIS, COFINS e CSLL</strong> (Art. 32 da Lei 10.833/2003 e Art. 1º da IN RFB 459/2004), visto que tais tributos já são recolhidos unificadamente na guia mensal do DAS. Para validar essa dispensa, a empresa deve apenas assinar declaração padrão de optante pelo Simples Nacional.
          </p>
        </div>
      </div>
    </div>
  );
}
