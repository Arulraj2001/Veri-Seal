'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Copy,
  Scale,
  Calendar,
  Percent,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

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

export default function ReajusteAluguelPage() {
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
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org FAQ & SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'Calculadora de Reajuste de Aluguel 2026 - IPCA, IGP-M e IVAR',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'BRL',
                },
                description:
                  'Simulador de reajuste de contrato de aluguel conforme a Lei do Inquilinato nº 8.245/91. Atualização por IPCA, IGP-M e IVAR com gerador de notificação formal.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Qual o índice oficial de reajuste de aluguel no Brasil?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'A Lei nº 8.245/1991 (Lei do Inquilinato) não impõe um índice único obrigatório, vedando apenas a vinculação ao salário mínimo ou à variação cambial estrangeira. Historicamente o IGP-M da FGV era o mais utilizado, mas a partir das altas históricas de 2020/2021, a maioria dos contratos modernos adotou o IPCA (IBGE) ou o IVAR (FGV) como indexadores padrão.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'O que acontece quando o índice de reajuste de aluguel dá negativo (deflação)?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Segundo a jurisprudência dominante do Superior Tribunal de Justiça (STJ) e a praxe imobiliária, caso o contrato não traga previsão expressa de redução em caso de deflação, o valor do aluguel é mantido congelado (reajuste zero). Se houver cláusula expressa de variação nominal pura, o aluguel pode ser reduzido temporariamente.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'O proprietário pode reajustar o aluguel antes de completar 12 meses?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Não. O Art. 28 da Lei Federal nº 9.069/1995 (Plano Real) estabelece expressamente a nulidade de pleno direito de qualquer cláusula de periodicidade de reajuste inferior a um ano (12 meses) para contratos de locação residencial e não residencial.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/br" className="hover:text-emerald-700 transition">
            Brasil
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Reajuste de Aluguel IPCA / IGP-M</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Lei do Inquilinato nº 8.245/91 & Lei 9.069/95
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculadora de Reajuste de Aluguel
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Atualize o valor mensal da locação residencial ou comercial pelo acumulado dos últimos 12 meses do IPCA, IGP-M ou IVAR com emissão de comunicado formal.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Parâmetros Contratuais de Locação
            </h2>

            {/* Aluguel Atual */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
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
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="2200"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Valor bruto acordado no contrato (sem taxas condominiais e IPTU).
              </span>
            </div>

            {/* Índice Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Índice de Correção Contratual (12 Meses)
              </label>
              <select
                value={indiceKey}
                onChange={(e) => setIndiceKey(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Percentual Acumulado em 12 Meses (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={taxaCustom || ''}
                    onChange={(e) => setTaxaCustom(parseFloat(e.target.value) || 0)}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3.5 top-3 text-slate-400 font-semibold text-sm">%</span>
                </div>
              </div>
            )}

            {/* Regra de Deflação */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tratamento em caso de Deflação (Índice Negativo)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTratarDeflacao('travar_zero')}
                  className={`p-3 rounded-xl border text-left font-medium transition ${
                    tratarDeflacao === 'travar_zero'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <p className="font-bold text-slate-800">Congelar Aluguel (Piso Zero)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Praxe jurídica STJ: sem redução de valor nominal.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setTratarDeflacao('aplicar_deflacao')}
                  className={`p-3 rounded-xl border text-left font-medium transition ${
                    tratarDeflacao === 'aplicar_deflacao'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <p className="font-bold text-slate-800">Aplicar Redução Nominal</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Se previsto expressamente em contrato.</p>
                </button>
              </div>
            </div>

            {/* Notification Parameters */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Dados para o Comunicado Formal ao Inquilino
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">Nome do Locatário (Inquilino)</label>
                  <input
                    type="text"
                    value={nomeLocatario}
                    onChange={(e) => setNomeLocatario(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">Nome do Locador / Administradora</label>
                  <input
                    type="text"
                    value={nomeLocador}
                    onChange={(e) => setNomeLocador(e.target.value)}
                    placeholder="Ex: Imobiliária Aliança"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-600 mb-1 font-medium">Mês de Início do Novo Valor</label>
                  <input
                    type="text"
                    value={mesInicio}
                    onChange={(e) => setMesInicio(e.target.value)}
                    placeholder="Ex: Próximo vencimento de Outubro/2026"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Resultado do Reajuste</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {resultado.indicePercentual >= 0 ? '+' : ''}{resultado.indicePercentual.toFixed(2)}%
                </span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-900 text-white mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-1">
                  Novo Aluguel Mensal
                </span>
                <div className="text-3xl font-black tracking-tight text-white">
                  {formatarBRL(resultado.novoAluguel)}
                </div>
                <div className="text-xs text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800 pt-2">
                  <span>Diferença Mensal:</span>
                  <span className="font-bold text-emerald-400">
                    {resultado.valorReajuste >= 0 ? '+' : ''}{formatarBRL(resultado.valorReajuste)}
                  </span>
                </div>
              </div>

              {/* Detalhamento */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Aluguel Vigente:</span>
                  <span className="font-semibold text-slate-800">{formatarBRL(resultado.aluguelAtual)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Índice Aplicado:</span>
                  <span className="font-semibold text-slate-800">
                    {resultado.indicePercentual.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Acréscimo Acumulado em 12 Meses:</span>
                  <span className="font-bold text-emerald-700">{formatarBRL(resultado.diferencaAnual)}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Periodicidade Legal:</span>
                  <span className="font-semibold text-slate-800">Anual (Lei 9.069/95)</span>
                </div>
              </div>

              {/* Botão Copiar Carta */}
              <button
                type="button"
                onClick={copiarNotificacao}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm"
              >
                {copiado ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                {copiado ? 'Comunicado Copiado!' : 'Copiar Comunicado ao Inquilino'}
              </button>
            </div>

            {/* Informational Callout */}
            <div className="rounded-2xl p-5 bg-emerald-50/70 border border-emerald-100 text-emerald-950 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Privacidade Absoluta
              </div>
              <p className="text-emerald-800">
                Os valores e nomes informados são processados exclusivamente na memória do seu navegador. Nenhum dado financeiro ou contratual é transmitido a servidores.
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Placement */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Regras Jurídicas do Reajuste de Aluguel na Lei do Inquilinato
            </h2>
            <p>
              A atualização monetária dos contratos de locação urbana no Brasil é regida pela <strong>Lei Federal nº 8.245, de 18 de outubro de 1991</strong> (conhecida como a Lei do Inquilinato), combinada com as normas de ordem pública do <strong>Plano Real (Art. 28 da Lei nº 9.069/1995)</strong>. A função do reajuste anual não é proporcionar aumento de ganho real ao proprietário, mas tão somente preservar o poder aquisitivo da moeda contra as perdas inflacionárias do período.
            </p>
            <p className="mt-3">
              Qualquer pactuação de reajuste em prazo inferior a um ano (12 meses) é nula de pleno direito, não surtindo efeitos jurídicos, exceto se houver aditivo consensual bilateral que altere as condições do imóvel ou envolva benfeitorias substanciais.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Qual a Diferença entre IGP-M, IPCA e IVAR na Locação?
            </h3>
            <p>
              Durante décadas, o <strong>IGP-M (Índice Geral de Preços do Mercado)</strong>, apurado pela Fundação Getulio Vargas (FGV), reinou absoluto como o indexador padrão das locações no país. Todavia, a composição do IGP-M é fortemente atrelada ao IPA (Índice de Preços por Atacado - 60%), que oscila fortemente com o câmbio do dólar e os preços internacionais de commodities (como soja, ferro e combustíveis). Isso levou a descolamentos históricos da realidade do custo de vida familiar.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong>IPCA (IBGE):</strong> Índice oficial da inflação do país, calculado sobre a cesta de consumo das famílias que ganham de 1 a 40 salários mínimos. É hoje o índice mais recomendado pelos órgãos de defesa do consumidor (PROCON) e amplamente adotado nos novos contratos.
              </li>
              <li>
                <strong>IVAR (FGV):</strong> Índice de Variação de Aluguéis Residenciais, criado em 2022 pela FGV para medir exclusivamente os contratos reais assinados e reajustados em capitais como São Paulo, Rio de Janeiro, Belo Horizonte e Porto Alegre.
              </li>
              <li>
                <strong>IGP-M (FGV):</strong> Continua plenamente válido caso previsto no contrato, sendo muito comum em contratos comerciais e galpões logísticos.
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              O que Fazer Quando o Índice Apresenta Deflação?
            </h3>
            <p>
              Um ponto frequente de litígio entre locadores e locatários ocorre quando o acumulado do indexador nos últimos 12 meses resulta em número negativo (deflação). Nessas situações, o entendimento pacificado pelo Superior Tribunal de Justiça (STJ) e pelos Tribunais de Justiça estaduais orienta que:
            </p>
            <blockquote className="my-4 pl-4 border-l-4 border-emerald-500 italic text-slate-800 bg-slate-50 py-2">
              Salvo estipulação expressa em sentido contrário nas cláusulas contratuais, a atualização monetária tem por escopo recompor a perda do valor real da moeda, não se admitindo a redução do aluguel nominal pactuado (aplicação da taxa zero).
            </blockquote>
            <p>
              Caso as partes queiram que eventuais variações negativas sejam repassadas em abatimento temporário do boleto, tal previsão deve constar explicitamente no contrato sob a redação de <em>"variação nominal positiva ou negativa do índice"</em>.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Ação Revisional de Aluguel (Art. 19 da Lei nº 8.245/91)
            </h3>
            <p>
              Não se deve confundir o reajuste anual com a <strong>revisão de aluguel</strong>. Decorridos 3 (três) anos de vigência do contrato ou do último acordo de alteração de valor, tanto o locador quanto o locatário têm o direito legal de propor a <strong>Ação Revisional de Aluguel</strong> perante o Poder Judiciário, a fim de fixar o valor mensal segundo o preço de mercado da região imobiliária onde o imóvel está situado.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Exemplo de Cálculo Prático do Reajuste
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-mono text-slate-800 space-y-1">
              <div>Aluguel Atual: R$ 2.500,00</div>
              <div>Índice Acumulado em 12 Meses (IPCA): 4,50%</div>
              <div>Fórmula: Novo Aluguel = R$ 2.500,00 × (1 + 0,0450)</div>
              <div>Acréscimo Mensal: R$ 112,50</div>
              <div className="font-bold text-emerald-800">Novo Valor a Pagar: R$ 2.612,50</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

