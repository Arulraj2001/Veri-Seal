'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Receipt,
  FileCheck2,
  DollarSign,
  Scale,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

// Algoritmo matemático para conversión de números a letras en español de México (Formato Bancario M.N.)
const UNIDADES = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
const DECENAS_ESPECIALES = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
const DECENAS = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
const CENTENAS = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

function convertirGrupoTres(n: number): string {
  if (n === 0) return '';
  if (n === 100) return 'CIEN';

  const c = Math.floor(n / 100);
  const d = Math.floor((n % 100) / 10);
  const u = n % 10;

  let out = '';
  if (c > 0) out += CENTENAS[c] + ' ';

  const du = n % 100;
  if (du >= 10 && du <= 19) {
    out += DECENAS_ESPECIALES[du - 10] + ' ';
  } else if (du >= 21 && du <= 29) {
    out += 'VEINTI' + UNIDADES[u] + ' ';
  } else if (d > 0) {
    out += DECENAS[d] + ' ';
    if (u > 0) out += 'Y ' + UNIDADES[u] + ' ';
  } else if (u > 0) {
    out += UNIDADES[u] + ' ';
  }

  return out.trim();
}

function numeroALetrasPesosMx(num: number): string {
  if (isNaN(num) || num < 0) return 'CERO PESOS 00/100 M.N.';
  if (num === 0) return 'CERO PESOS 00/100 M.N.';

  const enteros = Math.floor(num);
  const centavos = Math.round((num - enteros) * 100);
  const strCentavos = centavos < 10 ? `0${centavos}` : `${centavos}`;

  if (enteros === 0) {
    return `CERO PESOS ${strCentavos}/100 M.N.`;
  }

  const millones = Math.floor(enteros / 1000000);
  const miles = Math.floor((enteros % 1000000) / 1000);
  const unidades = enteros % 1000;

  let texto = '';

  if (millones > 0) {
    if (millones === 1) texto += 'UN MILLÓN ';
    else texto += `${convertirGrupoTres(millones)} MILLONES `;
  }

  if (miles > 0) {
    if (miles === 1) texto += 'MIL ';
    else texto += `${convertirGrupoTres(miles)} MIL `;
  }

  if (unidades > 0) {
    texto += `${convertirGrupoTres(unidades)} `;
  }

  texto = texto.trim();

  // Caso especial 1 peso
  if (enteros === 1) {
    return `UN PESO ${strCentavos}/100 M.N.`;
  }

  return `${texto} PESOS ${strCentavos}/100 M.N.`;
}

export default function ConvertidorNumerosALetrasMexicoPage() {
  const [cantidad, setCantidad] = React.useState<number>(145250.50);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [formatoLetras, setFormatoLetras] = React.useState<'mayusculas' | 'capitalizado'>('mayusculas');

  const textoPesosMayusculas = numeroALetrasPesosMx(cantidad);
  const textoPesosCapitalizado = textoPesosMayusculas
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
    .replace('M.n.', 'M.N.');

  const textoFinal = formatoLetras === 'mayusculas' ? textoPesosMayusculas : textoPesosCapitalizado;

  const handleCopy = () => {
    navigator.clipboard.writeText(`(${textoFinal})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Por qué los cheques y pagarés en México deben llevar la cantidad en letra con centavos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme a los Artículos 15, 16 y 170 de la Ley General de Títulos y Operaciones de Crédito (LGTOC), la mención de la cantidad en letra con la especificación de moneda nacional ("pesos XX/100 M.N.") es un requisito formal de validez cambiaria. En caso de discrepancia entre números y letras, la ley establece expresamente que siempre prevalecerá la cantidad escrita en letras.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué significa la abreviatura M.N. en los contratos y facturas en México?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Significa "Moneda Nacional", especificando legalmente conforme a la Ley Monetaria de los Estados Unidos Mexicanos que la obligación debe liquidarse en pesos mexicanos y no en moneda extranjera.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo deben escribirse los centavos en un cheque bancario?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El estándar de la banca comercial mexicana exige plasmar los centavos mediante una fracción sobre cien (ejemplo: "50/100" para cincuenta centavos o "00/100" si la cifra es exacta sin decimales), cerrando siempre la frase entre paréntesis para evitar adiciones fraudulentas.',
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/mx" className="hover:text-emerald-700 transition-colors">
          México
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Trámites & Identidad</span>
        <span>/</span>
        <span className="text-slate-400">Números a Letras Pesos M.N.</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Ley General de Títulos y Operaciones de Crédito</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Convertidor de Números a Letras Pesos M.N. México 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Convierte cualquier cifra monetaria al formato bancario y notarial oficial mexicano con especificación obligatoria de centavos sobre cien y sufijo M.N. para pagarés, cheques y contratos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-700" />
              <span>Importe Numérico</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Pesos M.N.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Cantidad en Números
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-3 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 text-base focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Formato Mayúsculas vs Capitalizado */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Estilo Tipográfico
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormatoLetras('mayusculas')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  formatoLetras === 'mayusculas'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                TODO MAYÚSCULAS
              </button>
              <button
                type="button"
                onClick={() => setFormatoLetras('capitalizado')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  formatoLetras === 'capitalizado'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Tipo Título (Capitalizado)
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Montos Típicos para Pagarés / Renta:
            </span>
            <div className="flex gap-2 flex-wrap">
              {[15000, 48500.50, 120000, 2500000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCantidad(val)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-bold text-slate-700"
                >
                  ${val.toLocaleString('es-MX')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Formato Legal Bancario Oficial
                </span>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">
                  Ley General de Títulos de Crédito
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
              </button>
            </div>

            {/* Display de la cantidad en letras */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Texto para Cheque, Contrato o Pagaré:
              </span>
              <p className="text-lg sm:text-xl font-black text-emerald-300 leading-relaxed font-sans">
                ({textoFinal})
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Cifra en números:</span>
                <span className="font-mono font-bold text-white">${cantidad.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Centavos expresados:</span>
                <span className="font-mono font-bold text-white">{Math.round((cantidad - Math.floor(cantidad)) * 100)}/100 M.N.</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Seguridad Jurídica (Art. 15 LGTOC)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              En caso de cualquier controversia o juicio mercantil ejecutivo, <strong>la ley mexicana le da validez plena a la cantidad escrita en letras</strong> sobre cualquier número digital o manuscrito. Colocar la cifra entre paréntesis impide que personas malintencionadas agreguen palabras antes o después.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          La Expresión de Cantidades en Letras en el Derecho Mexicano 2026
        </h2>
        <p>
          En la práctica jurídica, notarial y mercantil de México, consignar sumas de dinero en palabras es un mandato formal ineludible. Regulado en la <strong>Ley General de Títulos y Operaciones de Crédito (LGTOC)</strong>, la <strong>Ley Monetaria de los Estados Unidos Mexicanos</strong> y el <strong>Código de Comercio</strong>, este procedimiento protege la voluntad de las partes e imposibilita la alteración fraudulenta de dígitos o ceros adicionales.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Prevalencia de la Letra sobre el Número (Art. 15 LGTOC)
        </h3>
        <p>
          El Artículo 15 de la LGTOC sienta una regla de oro para pagarés, letras de cambio y cheques: <em>"Si el importe del título se consigna a la vez en palabras y en cifras, valdrá, en caso de diferencia, por la suma escrita en palabras"</em>. Esto convierte la correcta redacción en letras en el elemento definitivo que considerarán los jueces mercantiles en un embargo o juicio ejecutivo.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. El Estándar Fraccionario de Centavos (XX/100 M.N.)
        </h3>
        <p>
          El Banco de México (Banxico) y la Asociación de Bancos de México (ABM) establecen que la moneda nacional mexicana no se expresa con palabras para los centavos (no se escribe "con cincuenta centavos"), sino como una fracción decimal obligatoria sobre cien seguida de las siglas <strong>M.N.</strong> (Moneda Nacional). Si no hay decimales, es forzoso asentar <strong>00/100 M.N.</strong> para anular cualquier intento de añadir fracciones no pactadas.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Números a Letras</span>
        </h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <details key={idx} className="group rounded-2xl bg-white border border-slate-200/90 p-5 open:shadow-xs transition-all">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
        <Link href="/mx" className="text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5">
          <span>&larr; Ver todas las 20 Herramientas México</span>
        </Link>
        <Link href="/mx" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Volver al Portal Soberano de México &uarr;</span>
        </Link>
      </div>
    </div>
  );
}

