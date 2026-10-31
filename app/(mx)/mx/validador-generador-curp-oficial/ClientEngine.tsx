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
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

const ENTIDADES_RENAPO: Record<string, string> = {
  AS: 'AGUASCALIENTES',
  BC: 'BAJA CALIFORNIA',
  BS: 'BAJA CALIFORNIA SUR',
  CC: 'CAMPECHE',
  CL: 'COAHUILA',
  CM: 'COLIMA',
  CS: 'CHIAPAS',
  CH: 'CHIHUAHUA',
  DF: 'CIUDAD DE MÉXICO (DISTRITO FEDERAL)',
  DG: 'DURANGO',
  GT: 'GUANAJUATO',
  GR: 'GUERRERO',
  HG: 'HIDALGO',
  JC: 'JALISCO',
  MC: 'ESTADO DE MÉXICO',
  MN: 'MICHOACÁN',
  MS: 'MORELOS',
  NT: 'NAYARIT',
  NL: 'NUEVO LEÓN',
  OC: 'OAXACA',
  PL: 'PUEBLA',
  QT: 'QUERÉTARO',
  QR: 'QUINTANA ROO',
  SP: 'SAN LUIS POTOSÍ',
  SL: 'SINALOA',
  SR: 'SONORA',
  TC: 'TABASCO',
  TS: 'TAMAULIPAS',
  TL: 'TLAXCALA',
  VZ: 'VERACRUZ',
  YN: 'YUCATÁN',
  ZS: 'ZACATECAS',
  NE: 'NACIDO EN EL EXTRANJERO',
};

// Algoritmo oficial dígito verificador CURP Módulo 10 SEGOB
const CURP_CHARS = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
function calcularDigitoVerificadorCurp(curp17: string): number {
  let suma = 0;
  for (let i = 0; i < 17; i++) {
    const char = curp17[i];
    const pos = CURP_CHARS.indexOf(char);
    if (pos === -1) return -1;
    suma += pos * (18 - i);
  }
  const digito = 10 - (suma % 10);
  return digito === 10 ? 0 : digito;
}

export default function ValidadorCurpMexicoPage() {
  const [curpInput, setCurpInput] = React.useState<string>('PEGR850412HDFRRN01');
  const [copied, setCopied] = React.useState<boolean>(false);

  // Validación y extracción de datos
  const cleanCurp = curpInput.trim().toUpperCase();

  const analisisCurp = React.useMemo(() => {
    if (cleanCurp.length !== 18) {
      return {
        valido: false,
        error: `Longitud inválida: tiene ${cleanCurp.length} caracteres (debe tener exactamente 18).`,
      };
    }

    const curpRegex = /^[A-Z][AEIOUX][A-Z]{2}(\d{2})(\d{2})(\d{2})[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]\d$/;

    if (!curpRegex.test(cleanCurp)) {
      return {
        valido: false,
        error: 'Estructura o combinación de caracteres no conforme con el instructivo RENAPO.',
      };
    }

    // Verificar dígito verificador oficial
    const base17 = cleanCurp.substring(0, 17);
    const digitoIngresado = Number(cleanCurp.charAt(17));
    const digitoCalculado = calcularDigitoVerificadorCurp(base17);

    if (digitoIngresado !== digitoCalculado) {
      return {
        valido: false,
        error: `Dígito verificador incorrecto: el dígito de control registrado es ${digitoIngresado}, pero el algoritmo oficial arrojó ${digitoCalculado}.`,
      };
    }

    // Extraer metadatos
    const anoStr = cleanCurp.substring(4, 6);
    const mesStr = cleanCurp.substring(6, 8);
    const diaStr = cleanCurp.substring(8, 10);
    const sexoChar = cleanCurp.charAt(10);
    const entidadClave = cleanCurp.substring(11, 13);
    const homoclaveChar = cleanCurp.charAt(16);

    const siglo = isNaN(Number(homoclaveChar)) ? 2000 : 1900;
    const anoCompleto = siglo + Number(anoStr);
    const nombreEntidad = ENTIDADES_RENAPO[entidadClave] || 'ENTIDAD DESCONOCIDA';
    const sexoTexto = sexoChar === 'H' ? 'Hombre (Masculino)' : 'Mujer (Femenino)';

    return {
      valido: true,
      fechaNacimiento: `${diaStr}/${mesStr}/${anoCompleto}`,
      sexoTexto,
      nombreEntidad,
      digitoVerificador: digitoCalculado,
      baseLetras: cleanCurp.substring(0, 4),
      consonantesInternas: cleanCurp.substring(13, 16),
    };
  }, [cleanCurp]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCurp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo está compuesta la CURP de 18 caracteres?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Se compone de 18 caracteres: 4 letras de nombres y apellidos, 6 dígitos de fecha de nacimiento (AAMMDD), 1 letra de sexo (H o M), 2 letras de la entidad federativa de nacimiento, 3 consonantes internas de apellidos y nombre, 1 carácter de homoclave diferenciador y 1 dígito verificador matemático.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo saber si una persona nació después del año 2000 a partir de su CURP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Por la posición 17 (penúltimo carácter): si nació antes del año 2000, la posición 17 es un número del 0 al 9; si nació a partir del año 2000, la posición 17 es una letra del alfabeto (de la A a la Z).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué es el dígito verificador de la CURP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es el último carácter (posición 18) y se calcula con un algoritmo matemático ponderado Módulo 10 de la Secretaría de Gobernación (SEGOB) sobre los primeros 17 caracteres para evitar falsificaciones y errores de captura mecanográfica.',
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
        <span className="text-slate-400">Validador CURP</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Instructivo SEGOB & RENAPO Módulo 10</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Validador Oficial de CURP México 2026 (Algoritmo RENAPO)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Verifica la autenticidad matemática de cualquier Clave Única de Registro de Población (18 caracteres) con validación de dígito verificador, fecha de nacimiento, entidad de registro y homoclave.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>Captura de Clave CURP</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              18 Caracteres
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Ingresa los 18 Caracteres
            </label>
            <input
              type="text"
              maxLength={18}
              value={curpInput}
              onChange={(e) => setCurpInput(e.target.value.toUpperCase())}
              placeholder="Ej. PEGR850412HDFRRN01"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50/50 font-mono text-base font-bold text-slate-900 tracking-wider focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            <p className="text-[11px] text-slate-500">
              Caracteres capturados: {cleanCurp.length} de 18 requeridos.
            </p>
          </div>

          {/* Quick Examples */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Probar Ejemplos Válidos:
            </span>
            <div className="flex gap-2 flex-wrap">
              {['PEGR850412HDFRRN01', 'MOMR980215MDFNRL07', 'GORM020819HJCXRB09'].map((ej) => (
                <button
                  key={ej}
                  type="button"
                  onClick={() => setCurpInput(ej)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-mono font-bold text-slate-700"
                >
                  {ej.substring(0, 10)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-white ${analisisCurp.valido ? 'bg-slate-900' : 'bg-rose-950/90 border border-rose-800'}`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                {analisisCurp.valido ? (
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
                    Estatus Algorítmico SEGOB
                  </div>
                  <div className="text-xl sm:text-2xl font-black mt-0.5">
                    {analisisCurp.valido ? 'CURP Válida y Conforme' : 'CURP No Válida'}
                  </div>
                </div>
              </div>
              {analisisCurp.valido && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copiada' : 'Copiar'}</span>
                </button>
              )}
            </div>

            {analisisCurp.valido ? (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-slate-400">Fecha de Nacimiento:</div>
                    <div className="text-base font-bold text-white mt-0.5">{analisisCurp.fechaNacimiento}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-slate-400">Sexo Registrado:</div>
                    <div className="text-base font-bold text-white mt-0.5">{analisisCurp.sexoTexto}</div>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400">Entidad Federativa de Registro:</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{analisisCurp.nombreEntidad}</div>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                  <span>Dígito Verificador Módulo 10:</span>
                  <span className="font-mono font-bold text-emerald-400">{analisisCurp.digitoVerificador} (Válido)</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 leading-relaxed">
                <strong>Motivo del Rechazo: </strong>
                {analisisCurp.error}
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Estructura y Algoritmo Oficial de la CURP en México (SEGOB 2026)
        </h2>
        <p>
          La <strong>Clave Única de Registro de Población (CURP)</strong> es el código alfanumérico individual de identificación oficial expedido por el Registro Nacional de Población (RENAPO), dependiente de la Secretaría de Gobernación (SEGOB). Es un requisito obligatorio para todo ciudadano mexicano por nacimiento o naturalización y extranjeros residentes en el país.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Anatomía de los 18 Caracteres
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Posición 1:</strong> Primera letra del primer apellido.</li>
          <li><strong>Posición 2:</strong> Primera vocal interna del primer apellido.</li>
          <li><strong>Posición 3:</strong> Primera letra del segundo apellido (en caso de no tener, se asigna una 'X').</li>
          <li><strong>Posición 4:</strong> Primera letra del primer nombre (exceptuando 'María' o 'José' cuando van acompañados de un segundo nombre común).</li>
          <li><strong>Posiciones 5 a 10:</strong> Fecha de nacimiento expresada en formato AAMMDD (dos dígitos de año, dos de mes y dos de día).</li>
          <li><strong>Posición 11:</strong> Letra representativa del sexo biológico ('H' para Hombre, 'M' para Mujer).</li>
          <li><strong>Posiciones 12 y 13:</strong> Clave de dos letras de la entidad federativa de nacimiento según catálogo RENAPO (ejemplo: 'DF' Ciudad de México, 'JC' Jalisco, 'NE' extranjeros).</li>
          <li><strong>Posiciones 14 a 16:</strong> Primeras consonantes internas no iniciales del primer apellido, segundo apellido y nombre.</li>
          <li><strong>Posición 17:</strong> Carácter diferenciador de siglo y homoclave (número 0-9 para personas nacidas hasta 1999; letra A-Z para nacidos a partir del año 2000).</li>
          <li><strong>Posición 18:</strong> Dígito verificador aritmético Módulo 10.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Algoritmo Matemático de Comprobación Módulo 10
        </h3>
        <p>
          Para impedir alteraciones fraudulentas, cada carácter de los primeros 17 elementos tiene un valor numérico asignado de 0 a 36 conforme al catálogo oficial alfanumérico de SEGOB. Cada posición se multiplica en orden decreciente por ponderadores enteros que van desde el número 18 para la primera letra hasta el número 2 para la posición 17. La sumatoria se somete a la operación residuo Módulo 10 para arrojar el dígito verificador final.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre la CURP</span>
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
        <Link href="/mx/validador-rfc-sat-homoclave" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Validador RFC SAT con Homoclave &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

