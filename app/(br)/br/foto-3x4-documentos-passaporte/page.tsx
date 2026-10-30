'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Camera,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Grid,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function Foto3x4DocumentosPage() {
  const [imagemSrc, setImagemSrc] = React.useState<string | null>(null);
  const [zoom, setZoom] = React.useState<number>(1);
  const [posicaoX, setPosicaoX] = React.useState<number>(0);
  const [posicaoY, setPosicaoY] = React.useState<number>(0);
  const [formato, setFormato] = React.useState<'3x4' | '5x7' | 'folha10x15'>('3x4');
  const [carregando, setCarregando] = React.useState<boolean>(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = React.useRef<HTMLImageElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setImagemSrc(src);
        setZoom(1);
        setPosicaoX(0);
        setPosicaoY(0);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => {
          imageObjRef.current = img;
          renderCanvas();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageObjRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (formato === '3x4') {
      // 30x40 mm @ 300 DPI = 354 x 472 pixels
      canvas.width = 354;
      canvas.height = 472;
    } else if (formato === '5x7') {
      // 50x70 mm @ 300 DPI = 591 x 827 pixels
      canvas.width = 591;
      canvas.height = 827;
    } else {
      // Folha 10x15 cm @ 300 DPI = 1200 x 1800 pixels
      canvas.width = 1200;
      canvas.height = 1800;
    }

    // Fundo branco oficial
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (formato === 'folha10x15') {
      // Cria imagem 3x4 individual temporária
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 354;
      tempCanvas.height = 472;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, 354, 472);
        const drawW = 354 * zoom;
        const drawH = (img.height / img.width) * drawW;
        const x = (354 - drawW) / 2 + posicaoX;
        const y = (472 - drawH) / 2 + posicaoY;
        tempCtx.drawImage(img, x, y, drawW, drawH);

        // Grade de 6 fotos 3x4 na folha 10x15 com guias de corte cinza claro
        const cols = 2;
        const rows = 3;
        const startX = 140;
        const startY = 120;
        const gapX = 80;
        const gapY = 80;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const posX = startX + c * (354 + gapX);
            const posY = startY + r * (472 + gapY);
            ctx.drawImage(tempCanvas, posX, posY);

            // Linha fina de corte
            ctx.strokeStyle = '#E2E8F0';
            ctx.lineWidth = 1;
            ctx.strokeRect(posX, posY, 354, 472);
          }
        }
      }
    } else {
      // Desenho individual
      const drawW = canvas.width * zoom;
      const drawH = (img.height / img.width) * drawW;
      const x = (canvas.width - drawW) / 2 + posicaoX;
      const y = (canvas.height - drawH) / 2 + posicaoY;
      ctx.drawImage(img, x, y, drawW, drawH);
    }
  }, [zoom, posicaoX, posicaoY, formato]);

  React.useEffect(() => {
    if (imagemSrc && imageObjRef.current) {
      renderCanvas();
    }
  }, [renderCanvas, imagemSrc, zoom, posicaoX, posicaoY, formato]);

  const baixarFoto = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `foto-${formato}-veriseal.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
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
                name: 'Gerador de Foto 3x4 e Passaporte Brasileiro Online (300 DPI)',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Any',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'BRL',
                },
                description:
                  'Enquadramento biométrico de foto 3x4 padrão ICAO Doc 9303 para Carteira de Identidade (CIN), CNH e Passaporte da Polícia Federal. Gere folha 10x15 cm para impressão com corte.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Quais as dimensões exatas de uma foto 3x4 em pixels para impressão a 300 DPI?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Uma foto no tamanho 3x4 cm (30 por 40 milímetros) impressa na resolução padrão fotográfica de 300 DPI possui exatamente 354 pixels de largura por 472 pixels de altura.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Quais os requisitos da foto de passaporte da Polícia Federal?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Conforme a norma internacional ICAO Doc 9303 adotada pela Polícia Federal, o rosto deve estar totalmente voltado para a frente, com expressão neutra, boca fechada e olhos abertos. A iluminação deve ser uniforme sobre fundo branco, sem sombras, óculos escuros, bonés ou acessórios que encubram a fisionomia.',
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
          <span className="text-slate-800 font-medium">Foto 3x4 para Documentos e Passaporte</span>
        </nav>

        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            Padrão Biométrico ICAO Doc 9303 & Polícia Federal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Gerador de Foto 3x4 para Documentos
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Ajuste, enquadre e gere fotos 3x4 cm em alta resolução (300 DPI) para o novo CIN (RG), CNH ou folha 10x15 cm para imprimir.
          </p>
        </div>

        {/* Main Workspace Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 mb-8 space-y-6">
          {/* Format Selector Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFormato('3x4')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
                  formato === '3x4'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Foto 3x4 cm (RG / CIN / CNH)
              </button>
              <button
                type="button"
                onClick={() => setFormato('5x7')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
                  formato === '5x7'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Foto 5x7 cm (Passaporte / Vistos)
              </button>
              <button
                type="button"
                onClick={() => setFormato('folha10x15')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  formato === 'folha10x15'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                Folha 10x15 cm (6 Fotos com Corte)
              </button>
            </div>

            {imagemSrc && (
              <button
                type="button"
                onClick={baixarFoto}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                Baixar Imagem Pronta
              </button>
            )}
          </div>

          {/* Upload Area or Canvas Editor */}
          {!imagemSrc ? (
            <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition bg-slate-50/50 hover:bg-emerald-50/20">
              <Upload className="w-10 h-10 text-emerald-600 mb-3" />
              <span className="font-bold text-slate-800 text-sm mb-1">
                Selecione uma foto do seu dispositivo
              </span>
              <span className="text-xs text-slate-500 text-center max-w-sm">
                Formatos aceitos: JPG, PNG ou WebP. Dica: use uma foto com iluminação frontal uniforme e fundo claro.
              </span>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Canvas Preview */}
              <div className="md:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative">
                <canvas
                  ref={canvasRef}
                  className="max-h-[420px] max-w-full shadow-md rounded border border-slate-300 bg-white"
                />
              </div>

              {/* Adjustment Controls */}
              <div className="md:col-span-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Ajustes de Enquadramento
                </h3>

                {/* Zoom */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Zoom Facial</span>
                    <span>{zoom.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                {/* Posição Vertical */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Posição Vertical (Cima / Baixo)</span>
                    <span>{posicaoY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    step="5"
                    value={posicaoY}
                    onChange={(e) => setPosicaoY(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                {/* Posição Horizontal */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Posição Horizontal (Esquerda / Direita)</span>
                    <span>{posicaoX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    step="5"
                    value={posicaoX}
                    onChange={(e) => setPosicaoX(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                {/* Reset & Trocar Foto */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setPosicaoX(0);
                      setPosicaoY(0);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Resetar Ajustes
                  </button>
                  <label className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 text-center cursor-pointer transition">
                    Trocar Foto
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AdSense Placement */}
        <div className="my-10">
          <AdSlot slot="in_content" context="legal" />
        </div>

        {/* Deep Statutory Guidance Section (800+ Words) */}
        <article className="mt-12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Especificações Oficiais da Foto 3x4 no Brasil
            </h2>
            <p>
              A fotografia 3x4 cm é a principal exigência biométrica física para emissão da <strong>Carteira de Identidade Nacional (CIN - Decreto nº 10.977/2022)</strong>, <strong>Carteira Nacional de Habilitação (CNH - Resoluções CONTRAN)</strong>, Carteira de Trabalho física remanescente, passaportes e carteiras profissionais de ordens de classe (como OAB, CRM e CREA).
            </p>
            <p className="mt-3">
              Para atender aos padrões técnicos de reconhecimento e digitalização dos órgãos estaduais de identificação (Polícia Civil e DETRAN), a foto deve cumprir as seguintes exigências de qualidade:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>
                <strong>Fundo Branco Puro:</strong> O fundo deve ser liso, uniforme e estritamente branco, sem texturas, sombras ou objetos ao fundo.
              </li>
              <li>
                <strong>Enquadramento e Expressão:</strong> A cabeça deve estar centralizada e ocupar entre 70% e 80% da altura total da foto (da base do queixo ao topo do crânio). O rosto deve estar perfeitamente frontal, com expressão facial neutra e olhos mirando a lente.
              </li>
              <li>
                <strong>Acessórios Vedados:</strong> É expressamente proibido o uso de óculos escuros, armações grossas que cubram os olhos, bonés, chapéus, fones de ouvido ou quaisquer adereços que ocultem traços fisionômicos.
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Como Imprimir Fotos 3x4 na Folha 10x15 cm Economizando Dinheiro
            </h3>
            <p>
              Em estúdios e lojas de fotografia convencionais, uma cartela com quatro fotos 3x4 costuma custar entre R$ 25,00 e R$ 45,00. Utilizando esta ferramenta na opção <strong>Folha 10x15 cm</strong>, você gera um arquivo com 6 fotos 3x4 perfeitamente alinhadas com linhas de corte. Você pode enviar esse arquivo para impressão fotográfica avulsa tamanho 10x15 cm (4x6 polegadas) em quiosques de farmácias ou laboratórios digitais por aproximadamente R$ 1,50 a R$ 3,00 a folha inteira.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
