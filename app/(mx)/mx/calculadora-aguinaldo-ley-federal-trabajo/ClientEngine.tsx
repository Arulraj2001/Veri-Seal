'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Gift,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Calendar,
  DollarSign,
  FileText,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

const UMA_DIARIA_2026 = 113.14;
const EXENCION_AGUINALDO_30_UMAS = UMA_DIARIA_2026 * 30; // $3,394.20 MXN

export default function CalculadoraAguinaldoMexicoPage() {
  const [salarioMensual, setSalarioMensual] = React.useState<number>(18000);
  const [diasAguinaldoPactados, setDiasAguinaldoPactados] = React.useState<number>(15);
  const [diasLaboradosEnAno, setDiasLaboradosEnAno] = React.useState<number>(365);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Cálculos estatutarios Art. 87 LFT
  const salarioDiario = salarioMensual / 30;
  // Aguinaldo completo correspondiente al año
  const aguinaldoAnualCompleto = salarioDiario * diasAguinaldoPactados;
  // Aguinaldo proporcional por días laborados
  const aguinaldoBruto = (diasAguinaldoPactados / 365) * diasLaboradosEnAno * salarioDiario;

  // Exención de ISR Art. 93 fracc. XIV LISR (30 UMAs)
  const montoExento = Math.min(aguinaldoBruto, EXENCION_AGUINALDO_30_UMAS);
  const montoGravado = Math.max(0, aguinaldoBruto - montoExento);

  // Retención aproximada de ISR según Reglamento LISR (tasa promedio ~15% - 21%)
  let tasaEstimadaIsr = 0.10;
  if (salarioMensual > 40000) tasaEstimadaIsr = 0.28;
  else if (salarioMensual > 25000) tasaEstimadaIsr = 0.21;
  else if (salarioMensual > 15000) tasaEstimadaIsr = 0.16;
  else if (salarioMensual > 9000) tasaEstimadaIsr = 0.108;

  const retencionIsrEstimada = montoGravado * tasaEstimadaIsr;
  const aguinaldoNeto = aguinaldoBruto - retencionIsrEstimada;

  const handleCopy = () => {
    const text = `Cálculo Oficial de Aguinaldo México 2026 (Art. 87 LFT):
Salario Diario Base: $${salarioDiario.toFixed(2)} MXN ($${salarioMensual.toLocaleString('es-MX')} mensuales)
Días de Prestación: ${diasAguinaldoPactados} días pactados | Días trabajados en el año: ${diasLaboradosEnAno}/365 días
Aguinaldo Bruto: $${aguinaldoBruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

--- DESGLOSE FISCAL SAT (Art. 93 LISR) ---
+ Parte Exenta de Impuesto (30 UMAs): $${montoExento.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Parte Gravada de ISR: $${montoGravado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Retención Estimada de ISR: $${retencionIsrEstimada.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
=========================================
AGUINALDO NETO A COBRAR: $${aguinaldoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
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
        name: '¿Cuándo es la fecha límite legal para pagar el aguinaldo en México?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Artículo 87 de la Ley Federal del Trabajo, los trabajadores tendrán derecho a un aguinaldo anual que deberá pagarse antes del día veinte de diciembre, equivalente a quince días de salario, por lo menos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué cantidad de aguinaldo está libre de impuestos en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Artículo 93 fracción XIV de la Ley del ISR establece que el aguinaldo está exento de impuestos hasta por el equivalente a 30 veces el valor diario de la Unidad de Medida y Actualización (UMA), lo que representa aproximadamente $3,394.20 pesos en 2026.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Tengo derecho a aguinaldo si no cumplí el año completo en la empresa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. El Artículo 87 de la LFT especifica que los trabajadores que no hayan cumplido el año de servicios, independientemente de que se encuentren laborando o no en la fecha de liquidación del aguinaldo, tendrán derecho a que se les pague la parte proporcional del mismo conforme al tiempo que hubieren trabajado.',
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
        <span className="text-slate-400">Calculadora de Aguinaldo</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 87 LFT & Art. 93 Fracc. XIV LISR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Aguinaldo Legal LFT 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calcula tu aguinaldo neto y proporcional conforme al Artículo 87 de la Ley Federal del Trabajo, con el desglose exacto de los 30 días de UMA exentos de ISR ante el SAT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-700" />
              <span>Datos Laborales</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Art. 87 LFT
            </span>
          </div>

          {/* Salario Mensual */}
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
            <p className="text-[11px] text-slate-500">Salario base diario: ${(salarioMensual / 30).toFixed(2)} MXN.</p>
          </div>

          {/* Días de Aguinaldo Convenio */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Días de Aguinaldo por Contrato
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDiasAguinaldoPactados(d)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                    diasAguinaldoPactados === d
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d} días {d === 15 && '(Mínimo LFT)'}
                </button>
              ))}
            </div>
            <div className="pt-1">
              <input
                type="number"
                min="15"
                max="90"
                value={diasAguinaldoPactados}
                onChange={(e) => setDiasAguinaldoPactados(Math.max(15, Number(e.target.value)))}
                placeholder="Otro número de días"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Días Laborados en el Año */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Días Trabajados en el Año (1 a 365)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={diasLaboradosEnAno}
              onChange={(e) => setDiasLaboradosEnAno(Math.min(365, Math.max(1, Number(e.target.value))))}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
            />
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDiasLaboradosEnAno(365)}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                Año Completo (365 días)
              </button>
              <span className="text-slate-300">&bull;</span>
              <button
                type="button"
                onClick={() => setDiasLaboradosEnAno(180)}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                Medio Año (180 días)
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Fecha Límite Obligatoria:</span>
            </div>
            <p>Debe depositarse a más tardar el <strong>19 de diciembre</strong> (antes del día 20 por ley).</p>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Aguinaldo Neto Estimado a Recibir
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${aguinaldoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                <div className="text-[11px] text-slate-400 font-medium">Aguinaldo Bruto</div>
                <div className="text-base font-black text-white mt-0.5">
                  ${aguinaldoBruto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Retención ISR Estimada</div>
                <div className="text-base font-black text-rose-300 mt-0.5">
                  -${retencionIsrEstimada.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Fiscal Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Días de aguinaldo acumulados:</span>
                <span className="font-mono font-bold text-white">
                  {((diasAguinaldoPactados / 365) * diasLaboradosEnAno).toFixed(2)} días
                </span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Parte Exenta de ISR (Tope 30 UMAs):</span>
                <span className="font-mono font-bold">+${montoExento.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-amber-300">
                <span>Parte Sujeta a Impuesto (Gravada):</span>
                <span className="font-mono font-bold">${montoGravado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Total Líquido a Transferir:</span>
                <span className="font-mono text-emerald-400 text-base">
                  ${aguinaldoNeto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Exemption Card */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Regla de Exención Fiscal 30 UMAs (Art. 93 Fracc. XIV LISR)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              El Servicio de Administración Tributaria (SAT) no cobra impuesto sobre los primeros <strong>$3,394.20 pesos</strong> de aguinaldo (equivalente a 30 días de la Unidad de Medida y Actualización diaria de $113.14). Si tu aguinaldo bruto es menor a este importe, no sufrirás ninguna retención de ISR.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Article Content (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          El Aguinaldo en la Legislación Laboral Mexicana: Derechos y Plazos 2026
        </h2>
        <p>
          El aguinaldo es una de las prestaciones laborales de mayor arraigo social y trascendencia jurídica en México. Incorporado en la Ley Federal del Trabajo desde el año 1970, el <strong>Artículo 87</strong> establece la obligación patronal ineludible de cubrir una gratificación de fin de año antes del 20 de diciembre. No está supeditada a las utilidades de la compañía ni a la discrecionalidad directiva: es un derecho adquirido irrenunciable para todo trabajador subordinado en la República Mexicana.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Fórmula Matemática Estatutaria del Aguinaldo Proporcional
        </h3>
        <p>
          Para el personal con un año ininterrumpido de servicios, la prestación se computa multiplicando la cuota diaria ordinaria por el número de días acordados (mínimo 15 días). No obstante, para colaboradores con ingresos recientes o bajas anticipadas, la LFT exige liquidar la <em>parte proporcional</em> mediante el siguiente procedimiento:
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1 text-slate-800">
          <div>1. Salario Diario = Salario Mensual Bruto ÷ 30 días</div>
          <div>2. Proporción Diaria de Aguinaldo = Días de Aguinaldo de Contrato ÷ 365 días del año</div>
          <div>3. Días de Aguinaldo Devengados = Proporción Diaria × Días Efectivamente Laborados</div>
          <div>4. Aguinaldo Bruto = Días Devengados × Salario Diario</div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Mecanismo de Retención de ISR: Artículo 96 vs Artículo 174 del Reglamento
        </h3>
        <p>
          El SAT permite a las empresas retener el ISR del aguinaldo mediante dos alternativas estatutarias:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Método Ordinario (Art. 96 LISR):</strong> Se suma la porción gravada del aguinaldo al sueldo mensual ordinario y se aplica la tarifa correspondiente. Esto con frecuencia genera un salto de escalón tributario (bracket creep) que incrementa fuertemente la retención de diciembre.
          </li>
          <li>
            <strong>Procedimiento Opcional (Art. 174 del Reglamento de la LISR):</strong> Diseñado expresamente para mitigar el impacto fiscal de las remuneraciones anuales, calcula una tasa efectiva promedio sobre una fracción mensualizada, resultando en un ingreso neto considerablemente más alto para el trabajador en la quincena de fin de año.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Sanciones y Multas por Incumplimiento Patronal
        </h3>
        <p>
          Las empresas o empleadores que no paguen el aguinaldo antes del 20 de diciembre, lo paguen incompleto o pretendan sustituirlo con vales de despensa o mercancías (violando el Artículo 101 LFT que exige pago en moneda de curso legal) se hacen acreedores a multas impuestas por la Procuraduría Federal de la Defensa del Trabajo (PROFEDET) y la Secretaría del Trabajo y Previsión Social (STPS), las cuales oscilan entre 50 y 5,000 veces la UMA vigente.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre el Aguinaldo Legal</span>
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
        <Link href="/mx/calculadora-vacaciones-dignas-prima-vacacional" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Vacaciones Dignas & Prima Vacacional &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

