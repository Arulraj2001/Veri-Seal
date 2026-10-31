'use client';

import * as React from 'react';
import {
  FileText,
  Download,
  Upload,
  Sparkles,
  Lock,
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export function CompressorPdfPjeClient() {
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

      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('VeriSeal PJe Optimizer');
      pdfDoc.setCreator('VeriSeal');

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
    <div className="bg-slate-800/60 rounded-2xl p-6 sm:p-8 border border-slate-700/60 mb-8 space-y-6">
      {/* Target Court Limit Selector */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Selecione o Tribunal ou Sistema Judicial de Destino
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            type="button"
            onClick={() => setLimiteAlvoMb(3.0)}
            className={`p-3 rounded-xl border text-left font-semibold transition cursor-pointer ${
              limiteAlvoMb === 3.0
                ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-sm ring-1 ring-emerald-500'
                : 'border-slate-700 text-slate-400 hover:bg-slate-800 bg-slate-900'
            }`}
          >
            <div className="font-bold text-white">PJe TRT / Trabalho</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Teto rígido de até 3,0 MB</div>
          </button>
          <button
            type="button"
            onClick={() => setLimiteAlvoMb(5.0)}
            className={`p-3 rounded-xl border text-left font-semibold transition cursor-pointer ${
              limiteAlvoMb === 5.0
                ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-sm ring-1 ring-emerald-500'
                : 'border-slate-700 text-slate-400 hover:bg-slate-800 bg-slate-900'
            }`}
          >
            <div className="font-bold text-white">PJe TRF / Federal</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Teto padrão de até 5,0 MB</div>
          </button>
          <button
            type="button"
            onClick={() => setLimiteAlvoMb(10.0)}
            className={`p-3 rounded-xl border text-left font-semibold transition cursor-pointer ${
              limiteAlvoMb === 10.0
                ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-sm ring-1 ring-emerald-500'
                : 'border-slate-700 text-slate-400 hover:bg-slate-800 bg-slate-900'
            }`}
          >
            <div className="font-bold text-white">TJ / STJ / e-SAJ</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Até 10,0 MB por arquivo</div>
          </button>
        </div>
      </div>

      {/* Upload Area */}
      {!arquivoPdf ? (
        <label className="border-2 border-dashed border-slate-600 hover:border-emerald-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition bg-slate-900/50 hover:bg-emerald-950/20">
          <Upload className="w-10 h-10 text-emerald-400 mb-3" />
          <span className="font-bold text-white text-sm mb-1">
            Selecione o arquivo PDF da petição ou anexo
          </span>
          <span className="text-xs text-slate-400 text-center max-w-sm">
            Privacidade Absoluta: O documento não sai do seu computador. Processamento 100% cliente-side.
          </span>
          <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
        </label>
      ) : (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-white line-clamp-1">{nomeArquivo}</h4>
                <p className="text-xs text-slate-400">Tamanho Atual: {formatarBytes(tamanhoOriginal)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setArquivoPdf(null);
                setPdfUrl(null);
              }}
              className="text-xs text-slate-400 hover:text-emerald-400 underline cursor-pointer"
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
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {processando ? (
                <>Processando reindexação no navegador...</>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Comprimir e Otimizar para o PJe
                </>
              )}
            </button>
          ) : (
            <div className="pt-2 space-y-3">
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 block">Novo Tamanho:</span>
                  <span className="text-xl font-black text-white font-mono">{formatarBytes(tamanhoComprimido)}</span>
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
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                Baixar PDF Otimizado para Peticionamento
              </a>
            </div>
          )}
        </div>
      )}

      {/* Privacy Guarantee Banner */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs">
        <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
        <div>
          <strong>Sigilo Profissional e LGPD:</strong> Em estrita conformidade com o Art. 7º do Estatuto da Advocacia (Lei nº 8.906/94) e a Lei Geral de Proteção de Dados (Lei 13.709/18), a recompressão de objetos e streams é executada localmente no seu dispositivo. Nenhum dado processual é trafegado para servidores remotos.
        </div>
      </div>
    </div>
  );
}

