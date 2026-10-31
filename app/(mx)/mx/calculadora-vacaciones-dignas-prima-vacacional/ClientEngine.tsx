'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Palmtree,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

const UMA_DIARIA_2026 = 113.14;
const EXENCION_PRIMA_VACACIONAL_15_UMAS = UMA_DIARIA_2026 * 15; // $1,697.10 MXN

// Tabla oficial de Vacaciones Dignas (Art. 76 LFT)
const TABLA_VACACIONES = [
  { anos: 1, dias: 12 },
  { anos: 2, dias: 14 },
  { anos: 3, dias: 16 },
  { anos: 4, dias: 18 },
  { anos: 5, dias: 20 },
  { anos: 6, dias: 22 },
  { anos: 7, dias: 22 },
  { anos: 8, dias: 22 },
  { anos: 9, dias: 22 },
  { anos: 10, dias: 22 },
  { anos: 11, dias: 24 },
  { anos: 12, dias: 24 },
  { anos: 13, dias: 24 },
  { anos: 14, dias: 24 },
  { anos: 15, dias: 24 },
  { anos: 16, dias: 26 },
  { anos: 20, dias: 26 },
  { anos: 21, dias: 28 },
  { anos: 25, dias: 28 },
  { anos: 26, dias: 30 },
  { anos: 30, dias: 30 },
  { anos: 31, dias: 32 },
];

function getDiasVacaciones(anos: number): number {
  if (anos <= 0) return 0;
  if (anos === 1) return 12;
  if (anos === 2) return 14;
  if (anos === 3) return 16;
  if (anos === 4) return 18;
  if (anos === 5) return 20;
  if (anos <= 10) return 22;
  if (anos <= 15) return 24;
  if (anos <= 20) return 26;
  if (anos <= 25) return 28;
  if (anos <= 30) return 30;
  return 32;
}

export default function CalculadoraVacacionesDignasMexicoPage() {
  const [salarioMensual, setSalarioMensual] = React.useState<number>(22000);
  const [antiguedadAnos, setAntiguedadAnos] = React.useState<number>(2);
  const [porcentajePrima, setPorcentajePrima] = React.useState<number>(25);
  const [copied, setCopied] = React.useState<boolean>(false);

  const salarioDiario = salarioMensual / 30;
  const diasVacaciones = getDiasVacaciones(antiguedadAnos);
  const sueldoVacacionesBruto = diasVacaciones * salarioDiario;
  const primaVacacionalBruta = sueldoVacacionesBruto * (porcentajePrima / 100);

  // Exención de ISR en Prima Vacacional (Art. 93 fracc. XIV LISR: 15 UMAs)
  const primaExenta = Math.min(primaVacacionalBruta, EXENCION_PRIMA_VACACIONAL_15_UMAS);
  const primaGravada = Math.max(0, primaVacacionalBruta - primaExenta);
  const isrEstimadoPrima = primaGravada * 0.15; // Estimación tasa efectiva SAT
  const primaVacacionalNeta = primaVacacionalBruta - isrEstimadoPrima;
  const totalCobroVacacionesNeto = sueldoVacacionesBruto + primaVacacionalNeta;

  const handleCopy = () => {
    const text = `Cálculo de Vacaciones Dignas y Prima Vacacional México 2026 (Art. 76 y 80 LFT):
Antigüedad Computada: ${antiguedadAnos} años cumplidos
Días de Vacaciones Pagadas por Ley: ${diasVacaciones} días laborables
Salario Diario Base: $${salarioDiario.toFixed(2)} MXN ($${salarioMensual.toLocaleString('es-MX')} mensuales)
Sueldo por Días de Vacaciones: $${sueldoVacacionesBruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

--- PRIMA VACACIONAL (${porcentajePrima}%) ---
Prima Vacacional Bruta: $${primaVacacionalBruta.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Parte Exenta de ISR (15 UMAs): $${primaExenta.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Retención ISR Estimada: $${isrEstimadoPrima.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Prima Vacacional Neta en Mano: $${primaVacacionalNeta.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
=================================================
TOTAL PERCEPCIÓN ECONÓMICA DE VACACIONES: $${totalCobroVacacionesNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
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
        name: '¿Cuántos días de vacaciones tocan por año según la reforma de Vacaciones Dignas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Con la reforma al Artículo 76 de la LFT, el primer año otorga 12 días continuos de descanso pagado. Aumenta 2 días laborales por cada año subsiguiente hasta llegar a 20 días en el quinto año. A partir del sexto año, el período aumenta en 2 días por cada bloque de 5 años de servicios.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto es el porcentaje legal mínimo de prima vacacional en México?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Artículo 80 de la Ley Federal del Trabajo establece que los trabajadores tendrán derecho a una prima no menor de veinticinco por ciento (25%) sobre los salarios que les correspondan durante el período de vacaciones.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué cantidad de prima vacacional está exenta de pagar ISR en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Artículo 93 fracción XIV de la Ley del ISR señala que la prima vacacional está exenta hasta por el equivalente a 15 veces el valor de la UMA diaria, lo que equivale a aproximadamente $1,697.10 pesos en el ejercicio 2026.',
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
        <span className="text-slate-400">Vacaciones Dignas</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 76 & 80 LFT Reformada 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Vacaciones Dignas y Prima Vacacional 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Conoce los días exactos de descanso legal obligatorio conforme al Artículo 76 de la LFT (desde 12 días), la prima vacacional del 25% y la exención fiscal del SAT de 15 UMAs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Palmtree className="w-4 h-4 text-emerald-700" />
              <span>Parámetros de Antigüedad</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              LFT 2026
            </span>
          </div>

          {/* Antigüedad en Años */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Años de Servicio Cumplidos
            </label>
            <input
              type="number"
              min="1"
              max="40"
              value={antiguedadAnos}
              onChange={(e) => setAntiguedadAnos(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            <div className="flex gap-1.5 pt-1">
              {[1, 2, 3, 5, 10].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setAntiguedadAnos(y)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-xs font-bold text-slate-700 transition-colors"
                >
                  {y} {y === 1 ? 'año' : 'años'}
                </button>
              ))}
            </div>
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
          </div>

          {/* Porcentaje Prima Vacacional */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Porcentaje Prima Vacacional
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[25, 30, 50].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPorcentajePrima(p)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                    porcentajePrima === p
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p}% {p === 25 && '(Legal)'}
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
                  Días Legales de Descanso Pagado
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  {diasVacaciones} Días Laborables
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
                <div className="text-[11px] text-slate-400 font-medium">Sueldo por Vacaciones</div>
                <div className="text-base font-black text-white mt-0.5">
                  ${sueldoVacacionesBruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Prima Vacacional Neta</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  ${primaVacacionalNeta.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Prima Vacacional Bruta ({porcentajePrima}%):</span>
                <span className="font-mono font-bold text-white">${primaVacacionalBruta.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Exención de ISR (Tope 15 UMAs):</span>
                <span className="font-mono font-bold">+${primaExenta.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              {isrEstimadoPrima > 0 && (
                <div className="flex justify-between text-rose-300">
                  <span>Retención Estimada ISR sobre Excedente:</span>
                  <span className="font-mono font-bold">-${isrEstimadoPrima.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Beneficio Total Estimado de Vacaciones:</span>
                <span className="font-mono text-emerald-400 text-base">${totalCobroVacacionesNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Quick Schedule Reference */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Escala Oficial Art. 76 LFT (Vacaciones Dignas)</span>
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px] pt-1">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Año 1</div>
                <div className="font-bold text-emerald-800">12 días</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Año 2</div>
                <div className="font-bold text-emerald-800">14 días</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Año 3</div>
                <div className="font-bold text-emerald-800">16 días</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Año 5</div>
                <div className="font-bold text-emerald-800">20 días</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Copy (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          La Reforma Histórica de Vacaciones Dignas en México 2026
        </h2>
        <p>
          Hasta el 31 de diciembre de 2022, México ostentaba uno de los regímenes vacacionales más precarios de la Organización para la Cooperación y el Desarrollo Económicos (OCDE), otorgando únicamente 6 días de vacaciones por el primer año laborado. Con la entrada en vigor del decreto histórico de <strong>Vacaciones Dignas</strong> publicado en el Diario Oficial de la Federación, se duplicó el umbral básico a <strong>12 días laborables mínimos</strong> desde el primer aniversario contractual.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Regla de Continuidad del Período Vacacional (Art. 78 LFT)
        </h3>
        <p>
          El Artículo 78 de la Ley Federal del Trabajo reformada dispone expresamente que del total del período vacacional que corresponda al colaborador, las personas trabajadoras disfrutarán de por lo menos <strong>doce días continuos</strong>. Sin embargo, dicho período, a potestad exclusiva del trabajador, podrá ser distribuido en la forma y tiempo que así lo requiera, brindando flexibilidad absoluta para conciliar la vida personal y laboral.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Prima Vacacional Legal Obligatoria (Art. 80 LFT)
        </h3>
        <p>
          La prima vacacional tiene por objeto dotar al empleado de un suplemento financiero adicional a su sueldo habitual para que pueda disfrutar efectivamente de su período de asueto. La ley fija un piso mínimo obligatorio del <strong>25%</strong> sobre los salarios que le correspondan durante los días de vacaciones. Diversos contratos colectivos de trabajo pactan primas superiores (30%, 50% o incluso 100%), las cuales son plenamente válidas como condiciones superrogatorias de ley.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Tratamiento Fiscal y Exención de 15 UMAs (Art. 93 LISR)
        </h3>
        <p>
          El sueldo percibido durante las vacaciones tributa normalmente como salario ordinario. No obstante, la <strong>prima vacacional</strong> goza de un beneficio fiscal consagrado en el Artículo 93 fracción XIV de la Ley del ISR: se encuentra exenta de retención de impuestos hasta por el equivalente a <strong>15 veces la Unidad de Medida y Actualización (UMA)</strong> diaria ($1,697.10 pesos en 2026). Solo el remanente que rebase dicho límite quedará sujeto al pago del impuesto sobre la renta.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Vacaciones Dignas</span>
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
        <Link href="/mx/calculadora-horas-extras-lft" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Calculadora Horas Extras LFT &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

