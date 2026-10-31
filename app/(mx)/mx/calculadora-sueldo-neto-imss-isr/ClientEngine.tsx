'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileText,
  DollarSign,
  Info,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  Building,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

// Tablas de ISR 2026 mensuales (Art. 96 LISR)
const ISR_TABLE_MONTHLY = [
  { lower: 0.01, upper: 746.04, fixed: 0.0, rate: 0.0192 },
  { lower: 746.05, upper: 6332.05, fixed: 14.32, rate: 0.064 },
  { lower: 6332.06, upper: 11128.01, fixed: 371.83, rate: 0.1088 },
  { lower: 11128.02, upper: 12935.82, fixed: 893.63, rate: 0.16 },
  { lower: 12935.83, upper: 15487.71, fixed: 1182.88, rate: 0.1792 },
  { lower: 15487.72, upper: 31236.49, fixed: 1640.18, rate: 0.2136 },
  { lower: 31236.5, upper: 49233.0, fixed: 5002.47, rate: 0.2352 },
  { lower: 49233.01, upper: 93993.9, fixed: 9235.65, rate: 0.3 },
  { lower: 93993.91, upper: 125325.2, fixed: 22663.92, rate: 0.32 },
  { lower: 125325.21, upper: 375975.61, fixed: 32689.94, rate: 0.34 },
  { lower: 375975.62, upper: Infinity, fixed: 117911.08, rate: 0.35 },
];

// Valor UMA 2026 estimado / oficial (~113.14 MXN diario, ~3,441.50 MXN mensual)
const UMA_DIARIA = 113.14;
const UMA_MENSUAL = UMA_DIARIA * 30.4;
const TOPE_SBC_25_UMAS = UMA_DIARIA * 25 * 30.4;

export default function CalculadoraSueldoNetoMexicoPage() {
  const [salarioBruto, setSalarioBruto] = React.useState<number>(25000);
  const [periodo, setPeriodo] = React.useState<'mensual' | 'quincenal'>('mensual');
  const [zonaFronteriza, setZonaFronteriza] = React.useState<boolean>(false);
  const [incluyePrestaciones, setIncluyePrestaciones] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Normalización mensual para cálculo
  const factorPeriodo = periodo === 'quincenal' ? 2 : 1;
  const brutoMensual = salarioBruto * factorPeriodo;

  // Cálculo de Cuota Obrera IMSS (Trabajador)
  // Base de cotización topada a 25 UMAs
  const baseCotizacion = Math.min(brutoMensual, TOPE_SBC_25_UMAS);
  // Prestaciones en dinero Enf y Mat (0.25%)
  const imssPrestDinero = baseCotizacion * 0.0025;
  // Gastos médicos pensionados (0.375%)
  const imssGastosMedicos = baseCotizacion * 0.00375;
  // Invalidez y Vida (0.625%)
  const imssInvalidezVida = baseCotizacion * 0.00625;
  // Cesantía en edad avanzada y vejez (1.125%)
  const imssCesantiaVejez = baseCotizacion * 0.01125;
  // Excedente 3 UMAs (0.40% sobre el excedente de 3 UMA diario)
  const tresUmasMensual = UMA_DIARIA * 3 * 30.4;
  const imssExcedente = baseCotizacion > tresUmasMensual ? (baseCotizacion - tresUmasMensual) * 0.004 : 0;

  const totalImssMensual = imssPrestDinero + imssGastosMedicos + imssInvalidezVida + imssCesantiaVejez + imssExcedente;

  // Cálculo de Retención de ISR (Art. 96 LISR)
  let isrBrutoMensual = 0;
  let tasaMarginal = 0;
  for (const bracket of ISR_TABLE_MONTHLY) {
    if (brutoMensual >= bracket.lower && brutoMensual <= bracket.upper) {
      const excedente = brutoMensual - bracket.lower;
      isrBrutoMensual = bracket.fixed + excedente * bracket.rate;
      tasaMarginal = bracket.rate * 100;
      break;
    }
  }

  // Subsidio para el empleo reformado (Decreto 2024-2026: ~11.82% UMA mensual para ingresos hasta ~9,081 MXN)
  let subsidioEmpleo = 0;
  if (brutoMensual <= 9081) {
    subsidioEmpleo = Math.min(390, UMA_MENSUAL * 0.1182);
  }

  const isrNetoMensual = Math.max(0, isrBrutoMensual - subsidioEmpleo);
  const netoMensual = brutoMensual - totalImssMensual - isrNetoMensual;

  // Conversión al periodo seleccionado
  const totalImss = totalImssMensual / factorPeriodo;
  const isrNeto = isrNetoMensual / factorPeriodo;
  const subsidioEfectivo = subsidioEmpleo / factorPeriodo;
  const sueldoNeto = netoMensual / factorPeriodo;
  const porcentajeRetencion = salarioBruto > 0 ? ((salarioBruto - sueldoNeto) / salarioBruto) * 100 : 0;

  const handleCopy = () => {
    const text = `Cálculo de Sueldo Neto México 2026:
Salario Bruto (${periodo}): $${salarioBruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
- Cuota IMSS Trabajador: $${totalImss.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
- Retención ISR (Art. 96 LISR): $${isrNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
${subsidioEfectivo > 0 ? `+ Subsidio para el Empleo: $${subsidioEfectivo.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n` : ''}= Sueldo Neto a Recibir: $${sueldoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} (${(100 - porcentajeRetencion).toFixed(1)}% del bruto)`;
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
        name: '¿Cómo se calcula el sueldo neto en México en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El sueldo neto se calcula restando del salario bruto las deducciones legales obligatorias: las cuotas obreras del IMSS (Enfermedad y Maternidad, Invalidez y Vida, Cesantía y Vejez) y el Impuesto sobre la Renta (ISR) según las tablas progresivas del Artículo 96 de la Ley del ISR, descontando el Subsidio para el Empleo si aplica.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué porcentaje descuenta el IMSS al trabajador?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El trabajador aporta aproximadamente entre el 2.375% y el 2.775% de su Salario Base de Cotización (SBC), distribuido en prestaciones en dinero (0.25%), gastos médicos de pensionados (0.375%), Invalidez y Vida (0.625%), Cesantía en Edad Avanzada y Vejez (1.125%) y la cuota adicional por excedente de 3 UMAs (0.40%).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué es el Subsidio para el Empleo en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es un beneficio fiscal otorgado por el Estado mexicano para proteger a los trabajadores de menores ingresos. Conforme a las reformas vigentes en 2026, sustituye el esquema anterior por una cuota vinculada al valor mensual de la UMA aplicable a salarios brutos de hasta 9,081 pesos mensuales, reduciendo directamente la retención del ISR.',
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

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/mx" className="hover:text-emerald-700 transition-colors">
          México
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Laboral & Nómina</span>
        <span>/</span>
        <span className="text-slate-400">Calculadora Sueldo Neto</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 96 LISR & Ley Seguro Social 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Sueldo Neto México 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Convierte tu sueldo bruto a neto mensual o quincenal con el desglose exacto de retención de ISR conforme a las tablas oficiales del SAT 2026, cuotas obreras del IMSS y subsidio para el empleo.
        </p>
      </div>

      {/* Main Interactive Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Parámetros de Nómina</span>
            </h2>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              2026
            </span>
          </div>

          {/* Salario Bruto Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Salario Bruto Pactado
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                min="1000"
                step="500"
                value={salarioBruto}
                onChange={(e) => setSalarioBruto(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-3 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-hidden transition-all text-base min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                MXN
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Monto antes de retenciones de ley acordado en tu contrato de trabajo.
            </p>
          </div>

          {/* Periodo de Pago */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Frecuencia de Pago
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPeriodo('mensual')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer border ${
                  periodo === 'mensual'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Mensual
              </button>
              <button
                type="button"
                onClick={() => setPeriodo('quincenal')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer border ${
                  periodo === 'quincenal'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Quincenal
              </button>
            </div>
          </div>

          {/* Preset Buttons for Quick Testing */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Montos Frecuentes
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[12000, 18000, 25000, 35000, 50000, 75000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSalarioBruto(val)}
                  className="py-1.5 px-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors border border-slate-200/80"
                >
                  ${(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Context Note */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Info className="w-3.5 h-3.5 text-emerald-700" />
              <span>Base Legal Aplicada:</span>
            </div>
            <p className="leading-relaxed">
              Cálculo con Tablas ISR DOF 2026 y valor diario UMA 2026. Límite superior de cotización IMSS fijado en 25 UMAs.
            </p>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sueldo Neto a Recibir ({periodo})
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${sueldoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-mono font-medium text-slate-400 ml-2">MXN</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                title="Copiar resultado"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Tasa ISR Marginal</div>
                <div className="text-base font-black text-white mt-0.5">{tasaMarginal.toFixed(2)}%</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Retención Total</div>
                <div className="text-base font-black text-rose-300 mt-0.5">
                  {porcentajeRetencion.toFixed(1)}%
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Neto Efectivo</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  {(100 - porcentajeRetencion).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Detailed Deductions Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Salario Bruto Pactado:</span>
                <span className="font-mono font-bold text-white">
                  ${salarioBruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-rose-300">
                <span>(-) Retención ISR (Art. 96 LISR):</span>
                <span className="font-mono font-bold">
                  -${isrNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-rose-300">
                <span>(-) Cuota IMSS Trabajador:</span>
                <span className="font-mono font-bold">
                  -${totalImss.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              {subsidioEfectivo > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>(+) Subsidio para el Empleo Aplicado:</span>
                  <span className="font-mono font-bold">
                    +${subsidioEfectivo.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-bold text-white">
                <span>Depósito Neto en Cuenta:</span>
                <span className="font-mono text-emerald-400 text-base">
                  ${sueldoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* IMSS Breakdown Subcard */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-emerald-700" />
              <span>Desglose de Cuotas IMSS del Trabajador ({periodo})</span>
            </h3>
            <div className="space-y-1.5 text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Cesantía en Edad Avanzada y Vejez (1.125%):</span>
                <span className="font-mono font-bold text-slate-900">
                  ${(imssCesantiaVejez / factorPeriodo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Invalidez y Vida (0.625%):</span>
                <span className="font-mono font-bold text-slate-900">
                  ${(imssInvalidezVida / factorPeriodo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Gastos Médicos para Pensionados (0.375%):</span>
                <span className="font-mono font-bold text-slate-900">
                  ${(imssGastosMedicos / factorPeriodo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Prestaciones en Dinero Enf. y Mat. (0.25%):</span>
                <span className="font-mono font-bold text-slate-900">
                  ${(imssPrestDinero / factorPeriodo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              {imssExcedente > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>Cuota Excedente 3 UMAs (0.40%):</span>
                  <span className="font-mono font-bold">
                    ${(imssExcedente / factorPeriodo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AdSense In-Content Placement */}
      <AdSlot slot="in_content" context="legal" />

      {/* In-Depth Statutory Copy (800+ Words) */}
      <section className="space-y-8 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Marco Jurídico de la Nómina y Salario Neto en México 2026
          </h2>
          <p>
            El cálculo del salario neto en los Estados Unidos Mexicanos está estrictamente regido por dos ordenamientos fundamentales: la <strong>Ley Federal del Trabajo (LFT)</strong>, que tutela el derecho humano al trabajo digno y al salario íntegro, y la <strong>Ley del Impuesto sobre la Renta (LISR)</strong> en concordancia con la <strong>Ley del Seguro Social (LSS)</strong>. Cuando un trabajador y un empleador convienen una remuneración económica por concepto de prestación de servicios personales subordinados, el importe consignado en el contrato individual o colectivo corresponde al <em>salario bruto</em>.
          </p>
          <p>
            Por mandato del Artículo 96 de la LISR y del Artículo 15 de la LSS, los patrones tienen la obligación formal de actuar como retenedores fiscales y de seguridad social. Esto significa que antes de transferir los fondos a la cuenta bancaria del empleado en cada período quincenal o mensual, deben descontar de manera compulsiva el Impuesto sobre la Renta correspondiente y la cuota obrera del Instituto Mexicano del Seguro Social.
          </p>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <h3 className="text-xl font-bold text-slate-900">
            1. Estructura y Funcionamiento de las Tablas del ISR (Art. 96 LISR)
          </h3>
          <p>
            El ISR aplicable a personas físicas asalariadas se fundamenta en un esquema tributario estrictamente progresivo. La tabla mensual del Artículo 96 contempla 11 tramos o escalones tributarios con tasas marginales que van desde el <strong>1.92%</strong> para los ingresos más bajos hasta el <strong>35.00%</strong> para remuneraciones brutas que superen los 375,975.62 pesos mensuales.
          </p>
          <p>
            El procedimiento aritmético oficial para calcular el ISR bruto sigue la fórmula estatutaria obligatoria:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1 text-slate-800">
            <div>1. Base Gravable = Salario Bruto Mensual - Ingresos Exentos (Art. 93 LISR)</div>
            <div>2. Excedente del Límite Inferior = Base Gravable - Límite Inferior del Rango</div>
            <div>3. Impuesto Marginal = Excedente * Porcentaje sobre Excedente (%)</div>
            <div>4. ISR Bruto a Retener = Cuota Fija del Rango + Impuesto Marginal</div>
            <div>5. ISR Neto = ISR Bruto - Subsidio para el Empleo (en caso de aplicar)</div>
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <h3 className="text-xl font-bold text-slate-900">
            2. Desglose de las Cuotas Obreras del IMSS
          </h3>
          <p>
            El Instituto Mexicano del Seguro Social financia el régimen obligatorio de seguridad social mediante aportaciones tripartitas (trabajador, patrón y Estado). La porción correspondiente al trabajador se calcula sobre el <strong>Salario Base de Cotización (SBC)</strong> o Salario Diario Integrado (SDI), el cual incluye no solo la cuota diaria sino las partes proporcionales de aguinaldo (mínimo 15 días) y prima vacacional (mínimo 25%), topado legalmente en 25 veces el valor de la Unidad de Medida y Actualización (UMA):
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Prestaciones en Dinero (Enfermedades y Maternidad):</strong> Representa el 0.250% del SBC para cubrir subsidios por incapacidades temporales comunes.
            </li>
            <li>
              <strong>Gastos Médicos para Pensionados y Beneficiarios:</strong> Equivale al 0.375% del salario base, destinado a financiar la atención hospitalaria futura.
            </li>
            <li>
              <strong>Invalidez y Vida:</strong> Cuota del 0.625% destinada a pensiones por invalidez no laboral o supervivencia familiar.
            </li>
            <li>
              <strong>Cesantía en Edad Avanzada y Vejez:</strong> Cuota del 1.125% del SBC que se acumula en la cuenta individual del AFORE del trabajador.
            </li>
            <li>
              <strong>Cuota Adicional por Excedente de 3 UMAs:</strong> Si el salario diario del trabajador excede 3 veces el valor de la UMA diaria, se aplica una retención obrera adicional del 0.400% exclusivamente sobre el monto diferencial excedente.
            </li>
          </ul>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <h3 className="text-xl font-bold text-slate-900">
            3. Ejemplo Práctico de Cálculo Quincenal y Mensual
          </h3>
          <p>
            Consideremos un profesionista contratado en la Ciudad de México con un salario mensual bruto pactado de <strong>$25,000.00 MXN</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Determinación de Cuota IMSS:</strong> Con un salario diario integrado base de $822.37 MXN (equivalente a $25,000 mensuales), la aportación obrera total mensual asciende a <strong>$651.98 MXN</strong> (~2.61% del sueldo bruto).
            </li>
            <li>
              <strong>Cálculo del ISR:</strong> En la tabla mensual 2026, $25,000 se ubica en el sexto tramo (límite inferior: $15,487.72, cuota fija: $1,640.18, tasa marginal: 21.36%). La diferencia sobre el límite inferior es $9,512.28, generando un impuesto marginal de $2,031.82. Sumando la cuota fija, la retención de ISR mensual es de <strong>$3,672.00 MXN</strong>.
            </li>
            <li>
              <strong>Sueldo Neto Resultante:</strong> $25,000.00 - $651.98 (IMSS) - $3,672.00 (ISR) = <strong>$20,676.02 MXN netos mensuales</strong> (o <strong>$10,338.01 MXN quincenales</strong>). El trabajador conserva el 82.7% de su ingreso total acordado.
            </li>
          </ol>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <h3 className="text-xl font-bold text-slate-900">
            Garantía de Privacidad y Ejecución Local
          </h3>
          <p>
            En cumplimiento con las normas más exigentes de seguridad digital, este simulador ejecuta todos los algoritmos de cálculo de nómina de forma local y soberana en tu navegador web. Ninguna cifra financiera, salario nominal ni dato identificador es transmitido a servidores remotos ni guardado en bases de datos externas.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre el Sueldo Neto en México</span>
        </h2>
        <div className="space-y-3">
          {faqSchema.mainEntity.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl bg-white border border-slate-200/90 p-5 open:shadow-xs transition-all"
            >
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  &darr;
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-Link Hub */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
        <Link
          href="/mx"
          className="text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5"
        >
          <span>&larr; Ver las 20 Herramientas Estatutarias de México</span>
        </Link>
        <Link
          href="/mx/calculadora-finiquito-liquidacion-despido"
          className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
        >
          <span>Siguiente: Finiquito y Liquidación LFT &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

