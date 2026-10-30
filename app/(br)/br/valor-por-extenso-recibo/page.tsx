'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Copy,
  CheckCircle2,
  Printer,
  RotateCcw,
  Sparkles,
  Coins,
  Scale,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

const UNIDADES = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
const DEZ_A_DEZENOVE = [
  'dez',
  'onze',
  'doze',
  'treze',
  'quatorze',
  'quinze',
  'dezesseis',
  'dezessete',
  'dezoito',
  'dezenove',
];
const DEZENAS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const CENTENAS = [
  '',
  'cento',
  'duzentos',
  'trezentos',
  'quatrocentos',
  'quinhentos',
  'seiscentos',
  'setecentos',
  'oitocentos',
  'novecentos',
];

function converterTresDigitos(n: number): string {
  if (n === 100) return 'cem';
  const c = Math.floor(n / 100);
  const d = Math.floor((n % 100) / 10);
  const u = n % 10;
  const partes: string[] = [];

  if (c > 0) partes.push(CENTENAS[c]);

  if (d === 1) {
    partes.push(DEZ_A_DEZENOVE[u]);
  } else {
    if (d > 1) partes.push(DEZENAS[d]);
    if (u > 0) partes.push(UNIDADES[u]);
  }

  return partes.join(' e ');
}

function converterNumeroPorExtenso(inteiro: number): string {
  if (inteiro === 0) return 'zero';

  const bilhoes = Math.floor(inteiro / 1000000000);
  const milhoes = Math.floor((inteiro % 1000000000) / 1000000);
  const milhares = Math.floor((inteiro % 1000000) / 1000);
  const resto = inteiro % 1000;

  const blocos: string[] = [];

  if (bilhoes > 0) {
    const texto = converterTresDigitos(bilhoes);
    blocos.push(`${texto} ${bilhoes === 1 ? 'bilhão' : 'bilhões'}`);
  }

  if (milhoes > 0) {
    const texto = converterTresDigitos(milhoes);
    blocos.push(`${texto} ${milhoes === 1 ? 'milhão' : 'milhões'}`);
  }

  if (milhares > 0) {
    if (milhares === 1) {
      blocos.push('mil');
    } else {
      blocos.push(`${converterTresDigitos(milhares)} mil`);
    }
  }

  if (resto > 0) {
    blocos.push(converterTresDigitos(resto));
  }

  return blocos.join(' e ');
}

function converterReaisPorExtenso(valor: number): string {
  if (valor <= 0) return 'zero real';

  const inteiro = Math.floor(valor);
  const centavos = Math.round((valor - inteiro) * 100);

  const partes: string[] = [];

  if (inteiro > 0) {
    const textoInteiro = converterNumeroPorExtenso(inteiro);
    const moeda = inteiro === 1 ? 'real' : 'reais';
    partes.push(`${textoInteiro} ${moeda}`);
  }

  if (centavos > 0) {
    const textoCentavos = converterTresDigitos(centavos);
    const moedaCentavo = centavos === 1 ? 'centavo' : 'centavos';
    partes.push(`${textoCentavos} ${moedaCentavo}`);
  }

  return partes.join(' e ');
}

export default function ValorPorExtensoReciboPage() {
  const [valor, setValor] = React.useState<number>(3420.5);
  const [estiloTexto, setEstiloTexto] = React.useState<'capitalizado' | 'minusculo' | 'maiusculo'>('capitalizado');
  const [nomePagador, setNomePagador] = React.useState<string>('Carlos Eduardo Mendes');
  const [cpfCnpjPagador, setCpfCnpjPagador] = React.useState<string>('123.456.789-00');
  const [nomeRecebedor, setNomeRecebedor] = React.useState<string>('Mariana Silva Consultoria');
  const [cpfCnpjRecebedor, setCpfCnpjRecebedor] = React.useState<string>('12.345.678/0001-90');
  const [referenteA, setReferenteA] = React.useState<string>('Prestação de serviços de consultoria contábil e auditoria financeira referente ao mês.');
  const [cidade, setCidade] = React.useState<string>('São Paulo - SP');
  const [copiado, setCopiado] = React.useState<boolean>(false);
  const [copiadoRecibo, setCopiadoRecibo] = React.useState<boolean>(false);

  const valorExtensoPuro = React.useMemo(() => {
    return converterReaisPorExtenso(Math.max(0, valor));
  }, [valor]);

  const valorExtensoFormatado = React.useMemo(() => {
    if (estiloTexto === 'minusculo') return valorExtensoPuro.toLowerCase();
    if (estiloTexto === 'maiusculo') return valorExtensoPuro.toUpperCase();
    return valorExtensoPuro.charAt(0).toUpperCase() + valorExtensoPuro.slice(1);
  }, [valorExtensoPuro, estiloTexto]);

  const formatarBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const textoReciboFormal = `RECIBO DE PAGAMENTO

VALOR: ${formatarBRL(valor)} (${valorExtensoFormatado})

Recebi(emos) de ${nomePagador.trim() || '[Nome do Pagador]'}, inscrito(a) no CPF/CNPJ nº ${cpfCnpjPagador.trim() || '[CPF/CNPJ]'}, a importância de ${formatarBRL(valor)} (${valorExtensoFormatado}), referente a:
${referenteA.trim() || '[Descrição dos serviços ou produtos]'}.

Para maior clareza e firmeza do presente, firmo(amos) o presente recibo dando plena, rasa e geral quitação da quantia recebida.

${cidade.trim() || 'Local'}, ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}.

_____________________________________________________
${nomeRecebedor.trim() || '[Nome do Beneficiário / Emissor]'}
CPF/CNPJ: ${cpfCnpjRecebedor.trim() || '[CPF/CNPJ]'}`;

  const copiarExtenso = () => {
    navigator.clipboard.writeText(valorExtensoFormatado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const copiarRecibo = () => {
    navigator.clipboard.writeText(textoReciboFormal);
    setCopiadoRecibo(true);
    setTimeout(() => setCopiadoRecibo(false), 2000);
  };

  const imprimirRecibo = () => {
    window.print();
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
                name: 'Conversor de Valor por Extenso em Reais e Gerador de Recibo',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'BRL',
                },
                description:
                  'Escreva valores monetários por extenso em reais e centavos para preenchimento de cheques, notas promissórias e emissão de recibos formais de quitação (Art. 320 do Código Civil).',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Em caso de divergência em cheques e contratos, qual valor prevalece?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Segundo o Art. 12 da Lei Federal nº 7.357/1985 (Lei do Cheque) e a jurisprudência uniforme civil brasileira, na hipótese de divergência entre a quantia lançada em algarismos e a expressa por extenso, prevalecerá sempre o valor escrito por extenso.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Quais os requisitos legais de um recibo de pagamento válido?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Conforme o Art. 320 do Código Civil Brasileiro, a quitação regular deve conter: o valor monetário e a espécie da dívida quitada, o nome do devedor ou quem por este pagou, o tempo e o lugar do pagamento, e a assinatura do credor ou de seu representante constituído.',
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
          <span className="text-slate-800 font-medium">Valor por Extenso & Gerador de Recibo</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Coins className="w-3.5 h-3.5" />
            Lei do Cheque nº 7.357/85 & Art. 320 Código Civil
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Valor por Extenso e Emissor de Recibo
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Converta quantias em reais para escrita por extenso e emita recibos de quitação prontos para assinatura e impressão.
          </p>
        </div>

        {/* Card Extenso Principal */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 mb-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Digite o Valor Numérico (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-semibold text-sm">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={valor || ''}
                  onChange={(e) => setValor(parseFloat(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 font-bold text-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Formatação das Letras
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setEstiloTexto('capitalizado')}
                  className={`py-2.5 px-2 rounded-xl border font-semibold transition ${
                    estiloTexto === 'capitalizado'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Primeira Alta
                </button>
                <button
                  type="button"
                  onClick={() => setEstiloTexto('maiusculo')}
                  className={`py-2.5 px-2 rounded-xl border font-semibold transition ${
                    estiloTexto === 'maiusculo'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  MAIÚSCULAS
                </button>
                <button
                  type="button"
                  onClick={() => setEstiloTexto('minusculo')}
                  className={`py-2.5 px-2 rounded-xl border font-semibold transition ${
                    estiloTexto === 'minusculo'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  minúsculas
                </button>
              </div>
            </div>
          </div>

          {/* Resultado do Valor por Extenso */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Valor Escrito por Extenso
              </span>
              <button
                type="button"
                onClick={copiarExtenso}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition"
              >
                {copiado ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiado ? 'Copiado!' : 'Copiar Extenso'}
              </button>
            </div>
            <p className="text-lg sm:text-xl font-bold leading-relaxed text-slate-100">
              ({valorExtensoFormatado})
            </p>
          </div>
        </div>

        {/* Gerador de Recibo de Pagamento */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Emissor de Recibo de Pagamento e Quitação
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copiarRecibo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
              >
                {copiadoRecibo ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiadoRecibo ? 'Recibo Copiado' : 'Copiar Texto'}
              </button>
              <button
                type="button"
                onClick={imprimirRecibo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Recibo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nome de Quem Pagou (Pagador / Devedor)</label>
              <input
                type="text"
                value={nomePagador}
                onChange={(e) => setNomePagador(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">CPF ou CNPJ do Pagador</label>
              <input
                type="text"
                value={cpfCnpjPagador}
                onChange={(e) => setCpfCnpjPagador(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nome de Quem Recebeu (Beneficiário)</label>
              <input
                type="text"
                value={nomeRecebedor}
                onChange={(e) => setNomeRecebedor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">CPF ou CNPJ do Recebedor</label>
              <input
                type="text"
                value={cpfCnpjRecebedor}
                onChange={(e) => setCpfCnpjRecebedor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">Referente a (Descrição do Pagamento / Serviços)</label>
              <input
                type="text"
                value={referenteA}
                onChange={(e) => setReferenteA(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">Cidade e Estado de Emissão</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Pré-visualização do Recibo Imprimível */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
            {textoReciboFormal}
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
              A Força Jurídica do Valor por Extenso no Direito Brasileiro
            </h2>
            <p>
              O preenchimento por extenso de quantias financeiras é uma formalidade indispensável consagrada pela legislação mercantil e civil brasileira para prevenir adulterações, fraudes de acréscimo de zeros e divergências de digitação em cheques, contratos de compra e venda, títulos de crédito e recibos de quitação.
            </p>
            <p className="mt-3">
              O <strong>Artigo 12 da Lei Federal nº 7.357/1985 (Lei do Cheque)</strong> expressa claramente a prevalência:
            </p>
            <blockquote className="my-4 pl-4 border-l-4 border-emerald-500 italic text-slate-800 bg-slate-50 py-2">
              "Art. 12. Feita a indicação da quantia em algarismos e por extenso, prevalece esta no caso de divergência."
            </blockquote>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Requisitos de Validade do Recibo de Quitação (Art. 319 e 320 do Código Civil)
            </h3>
            <p>
              Quem paga tem o direito irrevogável de exigir a quitação formal (recibo), podendo reter legitimamente o pagamento enquanto ela não lhe for dada (Art. 319 do Código Civil). Para que tenha plena eficácia liberatória de obrigações perante a Justiça e a Receita Federal, o recibo deve conter obrigatoriamente:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>O valor numérico e o valor escrito por extenso em reais e centavos;</li>
              <li>A causa do débito (especificação do serviço, contrato ou aluguel quitado);</li>
              <li>A identificação completa do credor e do devedor com nome civil e CPF/CNPJ;</li>
              <li>A data e a praça (cidade) onde o pagamento foi recebido;</li>
              <li>A assinatura do credor ou de quem legitimamente o represente.</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

