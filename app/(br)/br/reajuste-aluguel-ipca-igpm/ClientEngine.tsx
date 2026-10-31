'use client';

import * as React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Copy,
  Calendar,
} from 'lucide-react';

interface ReajusteResult {
  aluguelAtual: number;
  indicePercentual: number;
  valorReajuste: number;
  novoAluguel: number;
  diferencaAnual: number;
  taxaEfetiva: number;
  aplicouDeflacao: boolean;
}

const INDICES_PADRAO: Record<string, { nome: string; taxaPadrao: number; orgao: string }> = {
  ipca: { nome: 'IPCA (IBGE) - Inflação Oficial', taxaPadrao: 4.52, orgao: 'IBGE' },
  igpm: { nome: 'IGP-M (FGV) - Tradicional de Aluguel', taxaPadrao: 2.85, orgao: 'FGV' },
  ivar: { nome: 'IVAR (FGV) - Variação de Aluguéis Residenciais', taxaPadrao: 3.90, orgao: 'FGV' },
  inpc: { nome: 'INPC (IBGE) - Salário e Cesta Básica', taxaPadrao: 4.15, orgao: 'IBGE' },
  custom: { nome: 'Outro percentual acordado', taxaPadrao: 5.0, orgao: 'Partes' },
};

export function ReajusteAluguelClient() {
  const [aluguelAtual, setAluguelAtual] = React.useState<number>(2200);
  const [indiceKey, setIndiceKey] = React.useState<string>('ipca');
  const [taxaCustom, setTaxaCustom] = React.useState<number>(4.52);
  const [tratarDeflacao, setTratarDeflacao] = React.useState<'travar_zero' | 'aplicar_deflacao'>('travar_zero');
  const [nomeLocador, setNomeLocador] = React.useState<string>('');
  const [nomeLocatario, setNomeLocatario] = React.useState<string>('');
  const [mesInicio, setMesInicio] = React.useState<string>('Próximo mês');
  const [copiado, setCopiado] = React.useState<boolean>(false);

  const calcularReajuste = React.useCallback((): ReajusteResult => {
    const atual = Math.max(0, aluguelAtual);
    let taxa = indiceKey === 'custom' ? taxaCustom : (INDICES_PADRAO[indiceKey]?.taxaPadrao ?? 4.52);
    let aplicouDeflacao = false;

    if (taxa < 0 && tratarDeflacao === 'travar_zero') {
      taxa = 0;
      aplicouDeflacao = false;
    } else if (taxa < 0) {
      aplicouDeflacao = true;
    }

    const valorReajuste = atual * (taxa / 100);
    const novoAluguel = Math.max(0, atual + valorReajuste);
    const diferencaAnual = valorReajuste * 12;

    return {
      aluguelAtual: atual,
      indicePercentual: taxa,
      valorReajuste,
      novoAluguel,
      diferencaAnual,
      taxaEfetiva: taxa,
      aplicouDeflacao,
    };
  }, [aluguelAtual, indiceKey, taxaCustom, tratarDeflacao]);

  const resultado = calcularReajuste();

  const formatarBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const gerarTextoNotificacao = () => {
    const locatarioStr = nomeLocatario.trim() || '[Nome do Locatário / Inquilino]';
    const locadorStr = nomeLocador.trim() || '[Nome do Locador / Proprietário ou Administradora]';
    const indiceNome = INDICES_PADRAO[indiceKey]?.nome || 'Índice Contratual';

    return `COMUNICADO FORMAL DE REAJUSTE ANUAL DE ALUGUEL

A/C: ${locatarioStr}
Ref.: Reajuste anual da locação residencial / comercial nos termos da Lei nº 8.245/1991 (Lei do Inquilinato) e do contrato de locação vigente.

Prezado(a) ${locatarioStr},

Vimos por meio desta comunicar que, tendo completado o período contratual de 12 (doze) meses de vigência, o valor mensal do aluguel sofrerá a atualização monetária legal pactuada no instrumento locatício.

Dados da atualização:
• Valor do Aluguel Anterior: ${formatarBRL(resultado.aluguelAtual)}
• Índice de Reajuste Aplicado: ${indiceNome} (${resultado.indicePercentual >= 0 ? '+' : ''}${resultado.indicePercentual.toFixed(2)}%)
• Variação Monetária Mensal: ${resultado.valorReajuste >= 0 ? '+' : ''}${formatarBRL(resultado.valorReajuste)}
• Novo Valor Mensal do Aluguel: ${formatarBRL(resultado.novoAluguel)}
• Mês de Vigência do Novo Valor: ${mesInicio}

Ficam ratificadas e inalteradas todas as demais cláusulas e condições pactuadas no respectivo contrato de locação.

Atenciosamente,
${locadorStr}
Data: ${new Date().toLocaleDateString('pt-BR')}`;
  };

  const copiarNotificacao = () => {
    navigator.clipboard.writeText(gerarTextoNotificacao());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Controls Column */}
      <div className="md:col-span-7 bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Parâmetros Contratuais de Locação
        </h2>

        {/* Aluguel Atual */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Valor Atual do Aluguel (R$)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">R$</span>
            <input
              type="number"
              min="0"
              step="50"
              value={aluguelAtual || ''}
              onChange={(e) => setAluguelAtual(parseFloat(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              placeholder="2200"
            />
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Valor bruto acordado no contrato (sem taxas condominiais e IPTU).
          </span>
        </div>

        {/* Índice Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">
            Índice de Correção Contratual (12 Meses)
          </label>
          <select
            value={indiceKey}
            onChange={(e) => setIndiceKey(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {Object.entries(INDICES_PADRAO).map(([key, item]) => (
              <option key={key} value={key}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Taxa if selected */}
        {indiceKey === 'custom' && (
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Percentual Acumulado em 12 Meses (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={taxaCustom || ''}
                onChange={(e) => setTaxaCustom(parseFloat(e.target.value) || 0)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-600 bg-slate-900 font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-sm">%</span>
            </div>
          </div>
        )}

        {/* Regra de Deflação */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Tratamento em caso de Deflação (Índice Negativo)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setTratarDeflacao('travar_zero')}
              className={`p-3 rounded-xl border text-left font-medium transition cursor-pointer ${
                tratarDeflacao === 'travar_zero'
                  ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200 font-semibold shadow-sm'
                  : 'border-slate-700 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <p className="font-bold text-white">Congelar Aluguel (Piso Zero)</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Praxe jurídica STJ: sem redução de valor nominal.</p>
            </button>
            <button
              type="button"
              onClick={() => setTratarDeflacao('aplicar_deflacao')}
              className={`p-3 rounded-xl border text-left font-medium transition cursor-pointer ${
                tratarDeflacao === 'aplicar_deflacao'
                  ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200 font-semibold shadow-sm'
                  : 'border-slate-700 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <p className="font-bold text-white">Aplicar Redução Nominal</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Se previsto expressamente em contrato.</p>
            </button>
          </div>
        </div>

        {/* Notification Parameters */}
        <div className="pt-4 border-t border-slate-700">
          <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-400" />
            Dados para o Comunicado Formal ao Inquilino
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Nome do Locatário (Inquilino)</label>
              <input
                type="text"
                value={nomeLocatario}
                onChange={(e) => setNomeLocatario(e.target.value)}
                placeholder="Ex: João Silva"
                className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Nome do Locador / Administradora</label>
              <input
                type="text"
                value={nomeLocador}
                onChange={(e) => setNomeLocador(e.target.value)}
                placeholder="Ex: Imobiliária Aliança"
                className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-medium">Mês de Início do Novo Valor</label>
              <input
                type="text"
                value={mesInicio}
                onChange={(e) => setMesInicio(e.target.value)}
                placeholder="Ex: Próximo vencimento de Outubro/2026"
                className="w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary Column */}
      <div className="md:col-span-5 space-y-6">
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60">
          <h2 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-700 flex items-center justify-between">
            <span>Resultado do Reajuste</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              {resultado.indicePercentual >= 0 ? '+' : ''}{resultado.indicePercentual.toFixed(2)}%
            </span>
          </h2>

          <div className="p-4 rounded-xl bg-slate-950 text-white mb-6 border border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-1">
              Novo Aluguel Mensal
            </span>
            <div className="text-3xl font-black tracking-tight text-white font-mono">
              {formatarBRL(resultado.novoAluguel)}
            </div>
            <div className="text-xs text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>Diferença Mensal:</span>
              <span className="font-bold text-emerald-400 font-mono">
                {resultado.valorReajuste >= 0 ? '+' : ''}{formatarBRL(resultado.valorReajuste)}
              </span>
            </div>
          </div>

          {/* Detalhamento */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-700 text-slate-300">
              <span className="text-slate-400">Aluguel Vigente:</span>
              <span className="font-semibold text-white font-mono">{formatarBRL(resultado.aluguelAtual)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700 text-slate-300">
              <span className="text-slate-400">Índice Aplicado:</span>
              <span className="font-semibold text-white font-mono">
                {resultado.indicePercentual.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700 text-slate-300">
              <span className="text-slate-400">Acréscimo em 12 Meses:</span>
              <span className="font-bold text-emerald-400 font-mono">{formatarBRL(resultado.diferencaAnual)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-300">
              <span className="text-slate-400">Periodicidade Legal:</span>
              <span className="font-semibold text-white">Anual (Lei 9.069/95)</span>
            </div>
          </div>

          {/* Botão Copiar Carta */}
          <button
            type="button"
            onClick={copiarNotificacao}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition shadow-sm cursor-pointer"
          >
            {copiado ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            {copiado ? 'Comunicado Copiado!' : 'Copiar Comunicado ao Inquilino'}
          </button>
        </div>

        {/* Informational Callout */}
        <div className="rounded-2xl p-5 bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-xs space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Privacidade e Segurança
          </div>
          <p className="text-slate-300">
            Os valores e nomes informados são processados exclusivamente na memória do seu dispositivo. Nenhum dado financeiro ou contratual é transmitido a servidores externos.
          </p>
        </div>
      </div>
    </div>
  );
}

