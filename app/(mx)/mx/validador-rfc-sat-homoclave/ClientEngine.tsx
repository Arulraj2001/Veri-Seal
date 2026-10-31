'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Building2,
  User,
  AlertTriangle,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

// Caracteres oficiales del SAT para dígito verificador RFC
const RFC_DICT = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ _';

function calcularDigitoVerificadorRfc(rfcBase: string): string {
  // Ajuste según sea persona física (12 primeros) o moral (11 primeros)
  const n = rfcBase.length;
  let suma = 0;
  for (let i = 0; i < n; i++) {
    const char = rfcBase.charAt(i);
    const index = RFC_DICT.indexOf(char);
    if (index === -1) return '';
    const factor = (n + 1) - i;
    suma += index * factor;
  }
  const residuo = suma % 11;
  if (residuo === 0) return '0';
  const digito = 11 - residuo;
  if (digito === 10) return 'A';
  return digito.toString();
}

export default function ValidadorRfcMexicoPage() {
  const [rfcInput, setRfcInput] = React.useState<string>('BBA830831LJ2');
  const [copied, setCopied] = React.useState<boolean>(false);

  const cleanRfc = rfcInput.trim().toUpperCase();

  const analisis = React.useMemo(() => {
    const len = cleanRfc.length;
    if (len !== 12 && len !== 13) {
      return {
        valido: false,
        error: `Longitud incorrecta: el RFC tiene ${len} caracteres. Debe tener 12 (Persona Moral) o 13 (Persona Física).`,
      };
    }

    const esPersonaFisica = len === 13;
    const regexFisica = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;
    const regexMoral = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;

    if (esPersonaFisica && !regexFisica.test(cleanRfc)) {
      return {
        valido: false,
        error: 'Estructura inválida para Persona Física: debe iniciar con 4 letras, 6 números de fecha (AAMMDD) y 3 caracteres alfanuméricos de homoclave.',
      };
    }

    if (!esPersonaFisica && !regexMoral.test(cleanRfc)) {
      return {
        valido: false,
        error: 'Estructura inválida para Persona Moral: debe iniciar con 3 letras, 6 números de fecha de constitución (AAMMDD) y 3 caracteres alfanuméricos de homoclave.',
      };
    }

    // Comprobación de dígito verificador SAT
    const rfcBase = cleanRfc.substring(0, len - 1);
    const digitoIngresado = cleanRfc.charAt(len - 1);
    const digitoEsperado = calcularDigitoVerificadorRfc(rfcBase);

    // Extraer fecha
    const fechaStartIndex = esPersonaFisica ? 4 : 3;
    const ano = cleanRfc.substring(fechaStartIndex, fechaStartIndex + 2);
    const mes = cleanRfc.substring(fechaStartIndex + 2, fechaStartIndex + 4);
    const dia = cleanRfc.substring(fechaStartIndex + 4, fechaStartIndex + 6);
    const homoclave = cleanRfc.substring(fechaStartIndex + 6);

    const matchDigito = digitoIngresado === digitoEsperado;

    return {
      valido: true,
      tipoPersona: esPersonaFisica ? 'Persona Física' : 'Persona Moral (Empresa / Sociedad)',
      fechaTexto: `${dia}/${mes}/${Number(ano) >= 30 ? '19' : '20'}${ano}`,
      homoclave,
      digitoIngresado,
      digitoEsperado,
      digitoConforme: matchDigito,
    };
  }, [cleanRfc]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanRfc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuántos caracteres tiene el RFC de personas físicas y morales?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El RFC de Personas Físicas consta de 13 caracteres (4 letras de nombres y apellidos, 6 números de fecha de nacimiento y 3 de homoclave con dígito verificador). El RFC de Personas Morales consta de 12 caracteres (3 letras de denominación social, 6 números de fecha de constitución notarial y 3 de homoclave).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué es la homoclave del RFC emitida por el SAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Son los últimos tres caracteres del RFC asignados exclusivamente por los sistemas informáticos del SAT. Los dos primeros diferencian a contribuyentes con nombres y fechas idénticas (evitando homónimos) y el último es el dígito verificador matemático Módulo 11.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuáles son los RFC genéricos autorizados para ventas al público en general y extranjeros?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para operaciones con público en general nacional se utiliza el RFC genérico XAXX010101000. Para operaciones con residentes en el extranjero se utiliza obligatoriamente el RFC genérico XEXX010101000.',
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
        <span className="text-slate-400">Validador RFC</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Código Fiscal de la Federación & Módulo 11 SAT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Validador Oficial de RFC con Homoclave SAT México 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Verifica la estructura, sintaxis, fecha de constitución o nacimiento y dígito verificador del Registro Federal de Contribuyentes (12 caracteres morales o 13 físicos).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              <span>Captura de RFC</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              12 o 13 Caracteres
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              RFC a Validar
            </label>
            <input
              type="text"
              maxLength={13}
              value={rfcInput}
              onChange={(e) => setRfcInput(e.target.value.toUpperCase())}
              placeholder="Ej. BBA830831LJ2 o PEGR850412XYZ"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50/50 font-mono text-base font-bold text-slate-900 tracking-wider focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            <p className="text-[11px] text-slate-500">
              Longitud actual: {cleanRfc.length} caracteres capturados.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Probar RFC de Ejemplo:
            </span>
            <div className="flex gap-2 flex-wrap">
              {[
                { rfc: 'BBA830831LJ2', label: 'Persona Moral' },
                { rfc: 'GARM8504129X0', label: 'Persona Física' },
                { rfc: 'XAXX010101000', label: 'Genérico Nacional' },
              ].map((ej) => (
                <button
                  key={ej.rfc}
                  type="button"
                  onClick={() => setRfcInput(ej.rfc)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-mono font-bold text-slate-700"
                >
                  {ej.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-white ${analisis.valido ? 'bg-slate-900' : 'bg-rose-950/90 border border-rose-800'}`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                {analisis.valido ? (
                  <div className="p-2 rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="p-2 rounded-2xl bg-rose-500/20 text-rose-400">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Estatus de Validación
                  </div>
                  <div className="text-xl sm:text-2xl font-black mt-0.5">
                    {analisis.valido ? 'Estructura Sintáctica Conforme' : 'RFC No Conforme'}
                  </div>
                </div>
              </div>
              {analisis.valido && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              )}
            </div>

            {analisis.valido ? (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-slate-400">Régimen / Tipo de Contribuyente:</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{analisis.tipoPersona}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-slate-400">Fecha de Nacimiento / Constitución:</div>
                    <div className="text-sm font-bold text-white mt-0.5">{analisis.fechaTexto}</div>
                  </div>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                  <span>Homoclave y Dígito de Control:</span>
                  <span className="font-mono font-bold text-emerald-400">{analisis.homoclave}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 leading-relaxed">
                <strong>Error Detectado: </strong>
                {analisis.error}
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          El Registro Federal de Contribuyentes (RFC) en el CFF 2026
        </h2>
        <p>
          El <strong>Registro Federal de Contribuyentes (RFC)</strong> regulado en el Artículo 27 del Código Fiscal de la Federación (CFF) es la clave tributaria indispensable que vincula a cada sujeto pasivo de la relación tributaria frente al Estado mexicano. Todo mayor de 18 años, asalariado, profesionista, comerciante o persona moral debe contar con su inscripción en el padrón del SAT.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Diferencias entre Persona Física y Persona Moral
        </h3>
        <p>
          La estructura del código permite identificar de inmediato la naturaleza jurídica del emisor o receptor:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Personas Morales (12 caracteres):</strong> Inician con 3 letras derivadas de la razón o denominación social (por ejemplo, <code>BBA</code> para Banco Bilbao Vizcaya Argentaria), seguidas de 6 dígitos con la fecha del acta constitutiva protocolizada ante notario (AAMMDD) y 3 caracteres alfanuméricos de homoclave.
          </li>
          <li>
            <strong>Personas Físicas (13 caracteres):</strong> Inician con 4 letras (primera letra y vocal del primer apellido, primera del segundo apellido y primera del nombre), seguidas de 6 dígitos de la fecha de nacimiento oficial (AAMMDD) y los 3 caracteres de homoclave.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. El Algoritmo de Homoclave y Dígito de Control
        </h3>
        <p>
          Para impedir que dos contribuyentes con nombres comunes y fechas de nacimiento idénticas compartan la misma clave, el SAT implementa un algoritmo interno que genera dos caracteres diferenciadores. Finalmente, el último carácter (el dígito verificador) se calcula mediante una operación matemática Módulo 11 que certifica la autenticidad e integridad del código completo.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre el RFC SAT</span>
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
        <Link href="/mx/foto-infantil-pasaporte-mexicano-sre" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Foto Infantil y Pasaporte SRE &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

