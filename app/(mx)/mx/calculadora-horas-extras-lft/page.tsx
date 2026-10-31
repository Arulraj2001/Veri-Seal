'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Clock,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  DollarSign,
  AlertCircle,
  Sun,
  Moon,
  Layers,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

const UMA_DIARIA_2026 = 113.14;
const TOPE_EXENCION_HORAS_EXTRAS_5_UMAS = UMA_DIARIA_2026 * 5; // $565.70 MXN semanal

export default function CalculadoraHorasExtrasMexicoPage() {
  const [salarioMensual, setSalarioMensual] = React.useState<number>(18000);
  const [tipoJornada, setTipoJornada] = React.useState<'diurna' | 'nocturna' | 'mixta'>('diurna');
  const [horasExtrasSemanales, setHorasExtrasSemanales] = React.useState<number>(12);
  const [esSalarioMinimo, setEsSalarioMinimo] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Determinación de horas de jornada legal diaria (Art. 60 y 61 LFT)
  const horasJornadaDiaria = tipoJornada === 'diurna' ? 8 : tipoJornada === 'nocturna' ? 7 : 7.5;
  const salarioDiario = salarioMensual / 30;
  const valorHoraOrdinaria = salarioDiario / horasJornadaDiaria;

  // Reparto entre horas dobles y triples (Art. 66 a 68 LFT)
  // Primeras 9 horas en la semana se pagan al doble (100% más)
  const horasDobles = Math.min(9, horasExtrasSemanales);
  // Excedentes de 9 horas en la semana se pagan al triple (200% más)
  const horasTriples = Math.max(0, horasExtrasSemanales - 9);

  const pagoHorasDobles = horasDobles * valorHoraOrdinaria * 2;
  const pagoHorasTriples = horasTriples * valorHoraOrdinaria * 3;
  const totalHorasExtrasBruto = pagoHorasDobles + pagoHorasTriples;

  // Tratamiento fiscal de horas extras (Art. 93 fracc. I LISR)
  // Si percibe salario mínimo: 100% exento de ISR
  // Otros trabajadores: 50% de las horas dobles exento, topado a 5 UMAs semanales; horas triples son 100% gravadas
  let horasExtrasExentas = 0;
  if (esSalarioMinimo) {
    horasExtrasExentas = totalHorasExtrasBruto;
  } else {
    const cincuentaPorcientoDobles = pagoHorasDobles * 0.5;
    horasExtrasExentas = Math.min(cincuentaPorcientoDobles, TOPE_EXENCION_HORAS_EXTRAS_5_UMAS);
  }

  const horasExtrasGravadas = Math.max(0, totalHorasExtrasBruto - horasExtrasExentas);
  const retencionIsrEstimada = horasExtrasGravadas * 0.16;
  const totalHorasExtrasNeto = totalHorasExtrasBruto - retencionIsrEstimada;

  const handleCopy = () => {
    const text = `Cálculo Oficial de Horas Extras México 2026 (Art. 66-68 LFT):
Jornada: ${tipoJornada.toUpperCase()} (${horasJornadaDiaria} hrs/día) | Valor Hora Ordinaria: $${valorHoraOrdinaria.toFixed(2)} MXN
Total Horas Extras Semanales: ${horasExtrasSemanales} horas

--- DESGLOSE LEGAL LFT ---
+ Horas Extras Dobles (Primeras ${horasDobles} hrs al 200%): $${pagoHorasDobles.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
${horasTriples > 0 ? `+ Horas Extras Triples (${horasTriples} hrs excedentes al 300%): $${pagoHorasTriples.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN\n` : ''}Total Horas Extras Brutas: $${totalHorasExtrasBruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

--- IMPACTO FISCAL SAT (Art. 93 LISR) ---
+ Monto Exento de ISR (Tope 5 UMAs/Sem): $${horasExtrasExentas.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Monto Gravado de ISR: $${horasExtrasGravadas.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Retención ISR Estimada: $${retencionIsrEstimada.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
=========================================
TOTAL HORAS EXTRAS NETO A COBRAR: $${totalHorasExtrasNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo se pagan las horas extras en México según la Ley Federal del Trabajo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme a los Artículos 67 y 68 de la LFT, las primeras 9 horas extraordinarias trabajadas a la semana se pagan con un recargo del 100% sobre el salario por hora ordinaria (horas dobles). Si el tiempo extraordinario excede de 9 horas semanales, las horas excedentes deben pagarse obligatoriamente con un 200% de recargo adicional (horas triples).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuántas horas extras está permitido trabajar por ley al día?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Artículo 66 de la LFT estipula que la jornada de trabajo extraordinaria nunca podrá exceder de tres horas diarias ni de tres veces en una misma semana (máximo 9 horas semanales legales). Laborar más de este límite genera la obligación patronal de pagar horas triples e incurre en responsabilidad laboral sancionable.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Las horas extras pagan impuestos ante el SAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para trabajadores que ganan el salario mínimo general, las horas extras están 100% exentas de ISR. Para los demás trabajadores, el 50% de las horas extras dobles está exento, con un tope máximo de 5 veces el valor de la UMA semanal ($565.70 MXN en 2026). Las horas triples no tienen exención y gravan ISR en su totalidad.',
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
        <span className="text-slate-900 font-semibold">Laboral & Nómina</span>
        <span>/</span>
        <span className="text-slate-400">Horas Extras LFT</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 66, 67 y 68 LFT & Art. 93 LISR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Horas Extras LFT México 2026 (Dobles y Triples)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calcula el pago de tiempo extraordinario según el tipo de jornada (diurna, mixta o nocturna), la regla de las 9 primeras horas al 100% (dobles), excedentes al 200% (triples) y el tope de exención de ISR.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Parámetros de Turno</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              LFT 2026
            </span>
          </div>

          {/* Salario Mensual Bruto */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Salario Mensual Bruto
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="1000"
                step="500"
                value={salarioMensual}
                onChange={(e) => setSalarioMensual(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
            <p className="text-[11px] text-slate-500">Salario diario base: ${(salarioMensual / 30).toFixed(2)} MXN.</p>
          </div>

          {/* Tipo de Jornada */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Tipo de Jornada Laboral
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTipoJornada('diurna')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  tipoJornada === 'diurna'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Diurna (8h)
              </button>
              <button
                type="button"
                onClick={() => setTipoJornada('mixta')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  tipoJornada === 'mixta'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Mixta (7.5h)
              </button>
              <button
                type="button"
                onClick={() => setTipoJornada('nocturna')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  tipoJornada === 'nocturna'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Nocturna (7h)
              </button>
            </div>
          </div>

          {/* Horas Extras Trabajadas en la Semana */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Horas Extras en la Semana
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={horasExtrasSemanales}
              onChange={(e) => setHorasExtrasSemanales(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            <div className="flex gap-2 pt-1">
              {[5, 9, 12, 15].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorasExtrasSemanales(h)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-xs font-bold text-slate-700"
                >
                  {h} hrs {h === 9 && '(Tope doble)'}
                </button>
              ))}
            </div>
          </div>

          {/* Valor Hora Informativo */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Hora Ordinaria:</span>
              <strong className="text-slate-900 font-mono">${valorHoraOrdinaria.toFixed(2)} MXN</strong>
            </div>
            <div className="flex justify-between text-emerald-800 font-medium">
              <span>Hora Doble (x2):</span>
              <strong className="font-mono">${(valorHoraOrdinaria * 2).toFixed(2)} MXN</strong>
            </div>
            <div className="flex justify-between text-rose-800 font-medium">
              <span>Hora Triple (x3):</span>
              <strong className="font-mono">${(valorHoraOrdinaria * 3).toFixed(2)} MXN</strong>
            </div>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Pago Neto de Horas Extras
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${totalHorasExtrasNeto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-mono font-medium text-slate-400 ml-2">MXN</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Horas Dobles ({horasDobles} hrs)</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  ${pagoHorasDobles.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Horas Triples ({horasTriples} hrs)</div>
                <div className="text-base font-black text-rose-300 mt-0.5">
                  ${pagoHorasTriples.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Horas Extras Brutas:</span>
                <span className="font-mono font-bold text-white">${totalHorasExtrasBruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Exención de ISR Semanal (Tope 5 UMAs):</span>
                <span className="font-mono font-bold">+${horasExtrasExentas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>Retención Estimada de ISR:</span>
                <span className="font-mono font-bold">-${retencionIsrEstimada.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {horasTriples > 0 && (
            <div className="rounded-3xl bg-amber-50 border border-amber-200 p-5 shadow-xs space-y-1.5 text-xs text-amber-900">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Alerta por Exceso de Límite Legal (Art. 66 LFT):</span>
              </div>
              <p className="leading-relaxed">
                Has registrado {horasTriples} horas por encima del límite legal de 9 horas semanales. Por ley deben pagarse al <strong>300% (al triple)</strong> y están 100% gravadas para efectos de ISR sin exención.
              </p>
            </div>
          )}
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Article (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Regulación del Tiempo Extraordinario de Trabajo en México 2026
        </h2>
        <p>
          La jornada de trabajo está definida en el Artículo 58 de la Ley Federal del Trabajo como el tiempo durante el cual el trabajador está a disposición del patrón para prestar su servicio. Para salvaguardar la salud física y mental del personal subordinado, la legislación mexicana impone límites estrictos a la duración de los turnos y establece una rigurosa tabla de compensación económica cuando se prolonga la jornada ordinaria.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Tipos de Jornadas y Determinación del Salario por Hora
        </h3>
        <p>
          Para calcular el importe del tiempo extraordinario, es indispensable determinar primeramente el <strong>salario por hora ordinaria</strong> dividiendo la cuota diaria entre la duración estatutaria del turno legal correspondiente (Art. 61 LFT):
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Jornada Diurna:</strong> Comprende entre las 6:00 y las 20:00 horas. Su duración máxima legal es de <strong>8 horas diarias</strong> (48 horas semanales).
          </li>
          <li>
            <strong>Jornada Nocturna:</strong> Comprende entre las 20:00 y las 6:00 horas del día siguiente. Su duración máxima legal es de <strong>7 horas diarias</strong> (42 horas semanales).
          </li>
          <li>
            <strong>Jornada Mixta:</strong> Abarca períodos de las jornadas diurna y nocturna, siempre que el período nocturno sea menor de tres horas y media. Su duración máxima legal es de <strong>7 horas y media diarias</strong> (45 horas semanales).
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Regla de las Horas Dobles y Horas Triples (Art. 67 y 68 LFT)
        </h3>
        <p>
          La LFT prohíbe que el tiempo extraordinario exceda de tres horas diarias ni de tres veces a la semana. En concordancia con esta premisa:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Horas Dobles:</strong> Las primeras nueve (9) horas de trabajo extraordinario en una semana se pagan con un ciento por ciento más del salario asignado a las horas de la jornada ordinaria (es decir, al doble).
          </li>
          <li>
            <strong>Horas Triples:</strong> La prolongación del tiempo extraordinario que exceda de nueve horas a la semana obliga al patrón a pagar al trabajador el tiempo excedente con un doscientos por ciento más del salario correspondiente (es decir, al triple).
          </li>
        </ol>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Tratamiento Fiscal ante el SAT (Artículo 93 Fracción I LISR)
        </h3>
        <p>
          Las horas extras gozan de un tratamiento fiscal preferencial en la Ley del Impuesto sobre la Renta:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Para los trabajadores que perciban el salario mínimo general, las horas extras legales no causarán retención alguna de impuesto sobre la renta (100% exentas).
          </li>
          <li>
            Para los demás trabajadores que perciben un salario superior al mínimo, estará exento el <strong>50% de las percepciones por horas dobles</strong>, sin que la exención exceda del equivalente a <strong>5 veces el valor de la UMA por cada semana de servicios</strong> ($565.70 pesos en 2026).
          </li>
          <li>
            Las horas triples, al derivar de una vulneración a la jornada máxima legal, gravan al 100% para efectos del ISR.
          </li>
        </ul>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Horas Extras</span>
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
        <Link href="/mx/calculadora-resico-personas-fisicas" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: RESICO Personas Físicas SAT &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

