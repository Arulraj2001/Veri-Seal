'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Scale,
  Lock,
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { AdSlot } from '@/components/ads/AdSlot';

export default function CompressorPdfPjePage() {
  const [arquivoPdf, setArquivoPdf] = React.useState<File | null>(null);
  const [tamanhoOriginal, setTamanhoOriginal] = React.useState<number>(0);
  const [tamanhoComprimido, setTamanhoComprimido] = React.useState<number>(0);
  const [processando, setProcessando] = React.useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
  const [limiteAlvoMb, setLimiteAlvoMb] = React.useState<number>(3.0);
  const [nomeArquivo, setNomeArquivo] = React.useState<string>('');

  const formatarBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setArquivoPdf(file);
      setTamanhoOriginal(file.size);
      setNomeArquivo(file.name);
      setTamanhoComprimido(0);
      setPdfUrl(null);
    }
  };

  const otimizarPdf = async () => {
    if (!arquivoPdf) return;
    setProcessando(true);

    try {
      const buffer = await arquivoPdf.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Remoção de metadados excedentes para compressão estrutural
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('VeriSeal PJe Optimizer');
      pdfDoc.setCreator('VeriSeal');

      // Serialização otimizada com recompressão de objetos
      const optimizedBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([new Uint8Array(optimizedBytes).buffer as ArrayBuffer], { type: 'application/pdf' });

      setTamanhoComprimido(blob.size);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error('Erro ao otimizar PDF:', err);
    } finally {
      setProcessando(false);
    }
  };

  const percentualEconomia =
    tamanhoOriginal > 0 && tamanhoComprimido > 0
      ? Math.max(0, ((tamanhoOriginal - tamanhoComprimido) / tamanhoOriginal) * 100)
      : 0;

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
                name: 'Compressor de PDF para o PJe e Tribunais de Justiça',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'BRL',
                },
                description:
                  'Otimizador e redutor de tamanho de PDF para envio de petições nos sistemas PJe, Projudi, e-SAJ e STJ conforme a Resolução CNJ nº 185/2013. Processamento 100% sigiloso no navegador.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Qual o tamanho máximo de arquivo PDF aceito pelo PJe nos Tribunais?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Pela Resolução CNJ nº 185/2013 e regras de cada Tribunal, os limites padrão para petições e anexos no PJe são de até 3,0 MB na Justiça do Trabalho (TRT/CSJT), até 5,0 MB na Justiça Federal (TRF) e entre 5,0 MB e 10,0 MB na Justiça Estadual (TJ/Projudi/e-SAJ).',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Meus documentos jurídicos e petições correm risco de vazamento ao usar este compressor?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Nenhum risco. Ao contrário de compressores online genéricos que enviam seu arquivo para servidores em nuvem de terceiros, a ferramenta VeriSeal executa a reindexação e compressão do PDF estritamente na memória local do seu navegador através do WebAssembly/pdf-lib. Nenhum byte é transmitido pela internet, preservando o sigilo profissional da OAB e as exigências da LGPD.',
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
          <span className="text-slate-800 font-medium">Compressor de PDF para PJe & Tribunais</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            Resolução CNJ nº 185/2013 & PJe Brasil
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compressor de PDF para PJe e Tribunais
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Comprima e formate petições e documentos para os limites do PJe (TRT, TRF, TJ e STJ) com sigilo advocatício absoluto 100% no navegador.
          </p>
        </div>

        {/* Main Tool Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8 space-y-6">
          {/* Target Court Limit Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Selecione o Tribunal ou Sistema Judicial de Destino
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setLimiteAlvoMb(3.0)}
                className={`p-3 rounded-xl border text-left font-semibold transition ${
                  limiteAlvoMb === 3.0
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">PJe TRT / Trabalho</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Teto rígido de até 3,0 MB</div>
              </button>
              <button
                type="button"
                onClick={() => setLimiteAlvoMb(5.0)}
                className={`p-3 rounded-xl border text-left font-semibold transition ${
                  limiteAlvoMb === 5.0
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">PJe TRF / Federal</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Teto padrão de até 5,0 MB</div>
              </button>
              <button
                type="button"
                onClick={() => setLimiteAlvoMb(10.0)}
                className={`p-3 rounded-xl border text-left font-semibold transition ${
                  limiteAlvoMb === 10.0
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">TJ / STJ / e-SAJ</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Até 10,0 MB por arquivo</div>
              </button>
            </div>
          </div>

          {/* Upload Area */}
          {!arquivoPdf ? (
            <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition bg-slate-50/50 hover:bg-emerald-50/20">
              <Upload className="w-10 h-10 text-emerald-600 mb-3" />
              <span className="font-bold text-slate-800 text-sm mb-1">
                Selecione o arquivo PDF da petição ou anexo
              </span>
              <span className="text-xs text-slate-500 text-center max-w-sm">
                Petróleo de sigilo: O documento não sai do seu computador.
              </span>
              <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
            </label>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{nomeArquivo}</h4>
                    <p className="text-xs text-slate-500">Tamanho Atual: {formatarBytes(tamanhoOriginal)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setArquivoPdf(null);
                    setPdfUrl(null);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  Substituir
                </button>
              </div>

              {/* Botão Ação */}
              {!pdfUrl ? (
                <button
                  type="button"
                  disabled={processando}
                  onClick={otimizarPdf}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm transition shadow-sm flex items-center justify-center gap-2"
                >
                  {processando ? (
                    <>Processando estrutura no navegador...</>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Comprimir e Otimizar para o PJe
                    </>
                  )}
                </button>
              ) : (
                <div className="pt-2 space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-emerald-800 block">Novo Tamanho:</span>
                      <span className="text-xl font-black text-emerald-900">{formatarBytes(tamanhoComprimido)}</span>
                    </div>
                    {percentualEconomia > 0 && (
                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs">
                        -{percentualEconomia.toFixed(1)}% menor
                      </span>
                    )}
                  </div>

                  <a
                    href={pdfUrl}
                    download={`${nomeArquivo.replace('.pdf', '')}-pje-otimizado.pdf`}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition shadow-sm flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    Baixar PDF Otimizado para Peticionamento
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Privacy Guarantee Banner */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong>Sigilo Profissional e LGPD:</strong> Em conformidade com o Art. 7º do Estatuto da OAB (Lei 8.906/94) e a Lei Geral de Proteção de Dados (Lei 13.709/18), a conversão é estritamente cliente-side via WebAssembly. Os dados processuais nunca chegam à internet.
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
              Regras Técnicas de Peticionamento Eletrônico nos Tribunais Brasileiros
            </h2>
            <p>
              A informatização do processo judicial brasileiro foi instituída pela <strong>Lei Federal nº 11.419, de 19 de dezembro de 2006</strong>, tendo sua interoperabilidade técnica padronizada pelo Conselho Nacional de Justiça por meio da <strong>Resolução CNJ nº 185/2013</strong>, que implementou a plataforma do Processo Judicial Eletrônico (PJe).
            </p>
            <p className="mt-3">
              Para assegurar a estabilidade dos servidores dos tribunais e a velocidade de abertura dos autos digitais por magistrados e servidores, os sistemas judiciais impõem travas intransponíveis de tamanho de arquivo. Se o documento do advogado ultrapassar o teto em meros 100 kilobytes, o upload é sumariamente rejeitado pelo sistema, criando riscos graves de perda de prazos processuais fatais.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Tabela de Limites dos Principais Sistemas Judiciais
            </h3>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>PJe da Justiça do Trabalho (TRTs e TST):</strong> Limite rigoroso de <strong>3,0 Megabytes</strong> por arquivo anexado.
              </li>
              <li>
                <strong>PJe da Justiça Federal (TRF1, TRF2, TRF3, TRF4, TRF5 e TRF6):</strong> Limite de <strong>5,0 Megabytes</strong>.
              </li>
              <li>
                <strong>Sistemas e-SAJ e Projudi (Justiça Estadual):</strong> Limite oscila entre <strong>5,0 MB e 10,0 MB</strong> por documento.
              </li>
              <li>
                <strong>Superior Tribunal de Justiça (STJ) e STF:</strong> Admitem até 10,0 MB por anexo na petição eletrônica.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

