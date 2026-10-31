'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Receipt,
  HeartPulse,
  GraduationCap,
  Home,
  PiggyBank,
  TrendingUp,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

const UMA_DIARIA_2026 = 113.14;
const UMA_ANUAL_2026 = UMA_DIARIA_2026 * 365; // $41,296.10 MXN
const TOPE_GLOBAL_5_UMAS = UMA_ANUAL_2026 * 5; // $206,480.50 MXN

export default function CalculadoraDeduccionesPersonalesMexicoPage() {
  const [ingresoAnualTotal, setIngresoAnualTotal] = React.useState<number>(450000);
  const [gastosMedicos, setGastosMedicos] = React.useState<number>(25000);
  const [gastosFunerarios, setGastosFunerarios] = React.useState<number>(0);
  const [interesesHipotecariosReales, setInteresesHipotecariosReales] = React.useState<number>(18000);
  const [colegiaturas, setColegiaturas] = React.useState<number>(15000);
  const [aportacionesAfore, setAportacionesAfore] = React.useState<number>(20000);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Tope global del Art. 151 penúltimo párrafo LISR:
  // El menor entre 5 veces la UMA anual o el 15% del ingreso total del contribuyente
  const limiteQuincePorciento = ingresoAnualTotal * 0.15;
  const topeGlobalDeducciones = Math.min(TOPE_GLOBAL_5_UMAS, limiteQuincePorciento);

  // Suma de deducciones sujetas al tope global
  const gastosFunerariosTopados = Math.min(gastosFunerarios, UMA_ANUAL_2026);
  const sumaDeduccionesSujetas = gastosMedicos + gastosFunerariosTopados + interesesHipotecariosReales + colegiaturas;
  const deduccionesAplicablesTopadas = Math.min(sumaDeduccionesSujetas, topeGlobalDeducciones);

  // Deducción de AFORE (Art. 151 Fracc. V): tiene tope independiente (hasta 10% del ingreso o 5 UMAs anuales)
  const topeAfore = Math.min(ingresoAnualTotal * 0.10, TOPE_GLOBAL_5_UMAS);
  const aforeDeducible = Math.min(aportacionesAfore, topeAfore);

  // Total deducciones autorizadas anuales
  const totalDeduccionesReales = deduccionesAplicablesTopadas + aforeDeducible;

  // Estimación de devolución de saldo a favor de ISR (tasa marginal promedio del 20% al 30%)
  let tasaMarginalAnual = 0.20;
  if (ingresoAnualTotal > 1000000) tasaMarginalAnual = 0.34;
  else if (ingresoAnualTotal > 600000) tasaMarginalAnual = 0.30;
  else if (ingresoAnualTotal > 350000) tasaMarginalAnual = 0.2352;
  else if (ingresoAnualTotal > 180000) tasaMarginalAnual = 0.1792;

  const devolucionEstimadaSat = totalDeduccionesReales * tasaMarginalAnual;

  const handleCopy = () => {
    const text = `Cálculo de Deducciones Personales y Devolución SAT México 2026 (Art. 151 LISR):
Ingresos Anuales Acumulables: $${ingresoAnualTotal.toLocaleString('es-MX')} MXN
Tope Global Legal (Menor entre 15% o 5 UMAs): $${topeGlobalDeducciones.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

--- CONCEPTOS DEDUCIBLES REGISTRADOS ---
+ Gastos Médicos, Dentales y Psicología: $${gastosMedicos.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
+ Intereses Reales Crédito Hipotecario: $${interesesHipotecariosReales.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
+ Colegiaturas Deducibles (Decreto): $${colegiaturas.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
+ Gastos Funerarios (Tope 1 UMA): $${gastosFunerariosTopados.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
= Deducciones bajo Tope Global: $${deduccionesAplicablesTopadas.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
+ Aportaciones Voluntarias AFORE (Tope extra 10%): $${aforeDeducible.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
==================================================
TOTAL DEDUCCIONES PERSONALES EFECTIVAS: $${totalDeduccionesReales.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
SALDO A FAVOR ESTIMADO DEVOLUCIÓN SAT: $${devolucionEstimadaSat.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
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
        name: '¿Cuál es el límite máximo para deducciones personales en la Declaración Anual 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Artículo 151 penúltimo párrafo de la Ley del ISR, el monto total de las deducciones personales no puede exceder de la cantidad que resulte menor entre cinco veces el valor anual de la Unidad de Medida y Actualización (UMA), equivalente a $206,480.50 pesos, o el 15% del total de los ingresos del contribuyente.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Las aportaciones voluntarias a la AFORE entran en el tope global del 15%?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Las aportaciones voluntarias y complementarias de retiro a la AFORE (Art. 151 fracción V LISR) cuentan con un tope propio e independiente de hasta el 10% de los ingresos acumulables del contribuyente o hasta 5 UMAs anuales adicionales, lo que permite maximizar el saldo a favor.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué requisitos deben tener los gastos médicos para ser deducibles ante el SAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Deben estar respaldados por un CFDI expedido por profesionistas con título legalmente registrado, y el pago debe realizarse invariablemente mediante medios electrónicos bancarizados (tarjeta de crédito, débito, transferencia SPEI o cheque nominativo). El pago en efectivo anula por completo la deducibilidad.',
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
        <span className="text-slate-900 font-semibold">Fiscal & SAT</span>
        <span>/</span>
        <span className="text-slate-400">Deducciones Personales</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 151 LISR & Declaración Anual 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Deducciones Personales y Devolución SAT 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Verifica tu tope global de deducciones (el menor entre 15% de ingresos o 5 UMAs anuales), calcula deducciones médicas, hipotecarias y colegiaturas, y estima tu saldo a favor de ISR.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-700" />
              <span>Ingresos y Facturas CFDI</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Art. 151
            </span>
          </div>

          {/* Ingreso Anual */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Ingresos Anuales Totales Brutos
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="50000"
                step="25000"
                value={ingresoAnualTotal}
                onChange={(e) => setIngresoAnualTotal(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
            <p className="text-[11px] text-slate-500">Tope 15%: ${limiteQuincePorciento.toLocaleString('es-MX')} MXN.</p>
          </div>

          {/* Gastos Médicos y Hospitalarios */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-700" />
              <span>Gastos Médicos, Dentales y Lentes</span>
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={gastosMedicos}
              onChange={(e) => setGastosMedicos(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
          </div>

          {/* Intereses Hipotecarios Reales */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-emerald-700" />
              <span>Intereses Reales Crédito Hipotecario</span>
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={interesesHipotecariosReales}
              onChange={(e) => setInteresesHipotecariosReales(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            <p className="text-[11px] text-slate-500">Intereses reales reportados en la constancia anual de Infonavit/Banco.</p>
          </div>

          {/* Colegiaturas Escolares */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
              <span>Colegiaturas (Decreto Presidencial)</span>
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={colegiaturas}
              onChange={(e) => setColegiaturas(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
          </div>

          {/* Aportaciones Voluntarias AFORE */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <PiggyBank className="w-3.5 h-3.5 text-emerald-700" />
              <span>Aportaciones Voluntarias AFORE (Tope Extra)</span>
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={aportacionesAfore}
              onChange={(e) => setAportacionesAfore(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            <p className="text-[11px] text-slate-500">No computa para el tope del 15% (Tope propio: 10% del ingreso).</p>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Devolución Estimada Saldo a Favor SAT
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${devolucionEstimadaSat.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                <div className="text-[11px] text-slate-400 font-medium">Tope Global Aplicable</div>
                <div className="text-base font-black text-white mt-0.5">
                  ${topeGlobalDeducciones.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Total Deducciones Válidas</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  ${totalDeduccionesReales.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Deducciones bajo tope global (Médicas + Hipoteca + Colegiaturas):</span>
                <span className="font-mono font-bold text-white">${deduccionesAplicablesTopadas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>+ Aportaciones AFORE con tope independiente:</span>
                <span className="font-mono font-bold">+${aforeDeducible.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tasa marginal estimada de recuperación:</span>
                <span className="font-mono font-bold">{(tasaMarginalAnual * 100).toFixed(1)}%</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Saldo a Favor Potencial en Declaración Anual:</span>
                <span className="font-mono text-emerald-400 text-base">${devolucionEstimadaSat.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Advice Subcard */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Regla de Oro del SAT para Validar tus Deducciones</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Para que el SAT acepte tus deducciones personales y deposite tu devolución automática en abril, cada factura debe contar con <strong>Uso de CFDI específico</strong> (D01 honorarios médicos, D05 intereses hipotecarios, D08 gastos de transportación/colegiaturas) y haber sido pagada exclusivamente por medios bancarizados (tarjeta o transferencia).
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Régimen de Deducciones Personales en la Declaración Anual LISR 2026
        </h2>
        <p>
          En el sistema impositivo mexicano sobre los ingresos de las personas físicas, el Artículo 151 de la Ley del Impuesto sobre la Renta confiere a los contribuyentes el derecho de deducir, al momento de formular su <strong>Declaración Anual</strong> durante el mes de abril, determinados gastos vinculados a la salud, educación, previsión social y patrimonio familiar. Estas deducciones reducen directamente la base gravable anual, propiciando en la gran mayoría de los casos un <strong>saldo a favor de ISR</strong> con derecho a devolución bancaria automática.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. El Candado Estatutario del Tope Global (Art. 151 Penúltimo Párrafo)
        </h3>
        <p>
          Con el fin de acotar la erosión de la recaudación tributaria, la ley impone un límite máximo cuantitativo a la suma de las deducciones personales. El monto deducible total no puede sobrepasar el importe que resulte <strong>menor</strong> entre:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Cinco veces el valor anual de la UMA:</strong> Fijado en <strong>$206,480.50 pesos</strong> para el ejercicio fiscal 2026.
          </li>
          <li>
            <strong>El 15% del total de los ingresos acumulables:</strong> Del contribuyente en el año calendario, incluyendo incluso aquellos ingresos que estuvieren exentos de gravamen.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Catálogo Oficial de Gastos Deducibles
        </h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Salud y Hospitalización:</strong> Honorarios pagados a médicos generales y especialistas, cirujanos dentistas, optometristas, psicólogos y nutriólogos legalmente titulados, análisis clínicos, estudios de laboratorio y compra de lentes graduados hasta por $2,500 MXN.
          </li>
          <li>
            <strong>Intereses Hipotecarios Reales:</strong> Los intereses reales efectivamente devengados y pagados en el ejercicio por créditos hipotecarios destinados a casa habitación contratados con el Infonavit, FOVISSSTE o instituciones financieras privadas, determinados restando la tasa de inflación anual a la tasa pactada.
          </li>
          <li>
            <strong>Gastos Funerarios:</strong> Erogaciones para el cónyuge, concubino, padres o hijos, con tope específico individual de una UMA anual ($41,296.10 MXN).
          </li>
          <li>
            <strong>Colegiaturas Escolares (Decreto Presidencial):</strong> Con topes anuales por alumno: Preescolar ($14,200), Primaria ($12,900), Secundaria ($19,900), Profesional Técnico ($17,100) y Bachillerato ($24,500). No aplica para estudios de nivel licenciatura ni posgrados.
          </li>
        </ol>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. La Excepción Estratégica: Aportaciones a Planes de Retiro y AFORE
        </h3>
        <p>
          El legislador confirió un tratamiento fiscal privilegiado a la previsión para la vejez. Las aportaciones complementarias de retiro y las aportaciones voluntarias depositadas en la subcuenta correspondiente de la AFORE o en Planes Personales de Retiro (PPR) autorizados por el SAT (Art. 151 fracción V LISR) <strong>no forman parte del tope global del 15%</strong>. Disponen de un cupo adicional e independiente de hasta el 10% de los ingresos acumulables o hasta cinco UMAs anuales, lo que permite a profesionistas y asalariados duplicar su saldo a favor mediante ahorro voluntario formal.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Deducciones Personales</span>
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
        <Link href="/mx/validador-emisor-cfdi-4-0-sat" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Validador Factura CFDI 4.0 SAT &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

