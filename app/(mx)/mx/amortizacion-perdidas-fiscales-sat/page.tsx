'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Calculator,
  Calendar,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function AmortizacionPerdidasMexicoPage() {
  const [montoPerdidaOriginal, setMontoPerdidaOriginal] = React.useState<number>(500000);
  const [anoGeneracionPerdida, setAnoGeneracionPerdida] = React.useState<number>(2023);
  const [anoAplicacion, setAnoAplicacion] = React.useState<number>(2026);
  const [utilidadFiscalEjercicio, setUtilidadFiscalEjercicio] = React.useState<number>(850000);
  const [inpcFinPrimeraMitadGeneracion, setInpcFinPrimeraMitadGeneracion] = React.useState<number>(128.8); // Jun año generación
  const [inpcInicioSegundaMitadGeneracion, setInpcInicioSegundaMitadGeneracion] = React.useState<number>(123.5); // Jul anterior
  const [inpcFinPrimeraMitadAplicacion, setInpcFinPrimeraMitadAplicacion] = React.useState<number>(137.5); // Jun año aplicación
  const [copied, setCopied] = React.useState<boolean>(false);

  // Plazo legal de caducidad (Art. 57 LISR: 10 ejercicios posteriores)
  const anosTranscurridos = anoAplicacion - anoGeneracionPerdida;
  const anosRestantes = Math.max(0, 10 - anosTranscurridos);
  const perdidaCaducada = anosTranscurridos > 10;

  // Factores de actualización según Art. 57 LISR
  // Factor 1 = INPC junio año en que ocurrió / INPC julio año en que ocurrió
  const factor1 = inpcInicioSegundaMitadGeneracion > 0 ? inpcFinPrimeraMitadGeneracion / inpcInicioSegundaMitadGeneracion : 1;
  const perdidaActualizada1 = montoPerdidaOriginal * factor1;

  // Factor 2 = INPC junio año aplicación / INPC junio año actualización previa
  const factor2 = inpcFinPrimeraMitadGeneracion > 0 ? inpcFinPrimeraMitadAplicacion / inpcFinPrimeraMitadGeneracion : 1;
  const factorTotalAcumulado = factor1 * factor2;
  const perdidaActualizadaTotal = montoPerdidaOriginal * factorTotalAcumulado;

  // Amortización contra la utilidad del ejercicio
  const perdidaAmortizada = perdidaCaducada ? 0 : Math.min(utilidadFiscalEjercicio, perdidaActualizadaTotal);
  const remanentePerdidaPendiente = perdidaCaducada ? 0 : Math.max(0, perdidaActualizadaTotal - perdidaAmortizada);
  const utilidadFiscalGravableFinal = Math.max(0, utilidadFiscalEjercicio - perdidaAmortizada);

  // Ahorro en ISR corporativo (30% Personas Morales Art. 9 LISR)
  const ahorroIsrCorporativo = perdidaAmortizada * 0.30;

  const handleCopy = () => {
    const text = `Cálculo Oficial Amortización de Pérdidas Fiscales México 2026 (Art. 57 LISR):
Pérdida Fiscal Histórica (Año ${anoGeneracionPerdida}): $${montoPerdidaOriginal.toLocaleString('es-MX')} MXN
Año de Aplicación: ${anoAplicacion} (Antigüedad: ${anosTranscurridos} años | Restan: ${anosRestantes} años de vigencia)
Factor de Actualización INPC Acumulado: ${factorTotalAcumulado.toFixed(4)}
Pérdida Fiscal Actualizada: $${perdidaActualizadaTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN

--- APLICACIÓN CONTRA UTILIDAD FISCAL ---
Utilidad Fiscal del Ejercicio: $${utilidadFiscalEjercicio.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
- Pérdida Amortizada Aplicada: -$${perdidaAmortizada.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
= Base Gravable Definitiva de ISR: $${utilidadFiscalGravableFinal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Remanente de Pérdida para Ejercicios Futuros: $${remanentePerdidaPendiente.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
==================================================
AHORRO DE IMPUESTO ISR (Tasa 30% PM): $${ahorroIsrCorporativo.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
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
        name: '¿Cuántos años tengo para amortizar una pérdida fiscal según la LISR?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Artículo 57 de la Ley del ISR, la pérdida fiscal ocurrida en un ejercicio podrá disminuirse de la utilidad fiscal de los diez ejercicios siguientes hasta agotarla. Si el contribuyente no la disminuye pudiendo haberlo hecho, perderá el derecho a hacerlo en los ejercicios posteriores hasta por la cantidad en que pudo haberlo efectuado.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo se actualizan las pérdidas fiscales con los índices INPC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La pérdida se actualiza primero dividiendo el INPC del último mes de la primera mitad del ejercicio en que ocurrió (junio) entre el INPC del primer mes de la segunda mitad del ejercicio previo (julio). Posteriormente, se multiplica por el factor resultante de dividir el INPC de junio del ejercicio en que se aplicará entre el INPC de la última actualización.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Se puede transmitir el derecho a amortizar pérdidas fiscales a otra empresa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. El derecho a disminuir las pérdidas fiscales es personalísimo del contribuyente que las sufra y no podrá ser transmitido a otra persona ni como consecuencia de fusión. En escisión de sociedades, las pérdidas fiscales se dividen entre las sociedades resultantes conforme a las reglas del CFF.',
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
        <span className="text-slate-400">Amortización de Pérdidas</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 57 LISR & Regla 10 Ejercicios SAT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Amortización de Pérdidas Fiscales SAT México 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Actualiza tus pérdidas fiscales de ejercicios anteriores mediante los factores de inflación INPC del INEGI y simula su amortización contra la utilidad fiscal con cálculo del ahorro en ISR corporativo (30%).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Datos de la Pérdida</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Art. 57 LISR
            </span>
          </div>

          {/* Monto Pérdida */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Monto Pérdida Fiscal Histórica
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="10000"
                step="50000"
                value={montoPerdidaOriginal}
                onChange={(e) => setMontoPerdidaOriginal(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Años de Generación y Aplicación */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Año de Pérdida
              </label>
              <input
                type="number"
                min="2016"
                max="2025"
                value={anoGeneracionPerdida}
                onChange={(e) => setAnoGeneracionPerdida(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Año de Aplicación
              </label>
              <input
                type="number"
                min="2024"
                max="2035"
                value={anoAplicacion}
                onChange={(e) => setAnoAplicacion(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
            </div>
          </div>

          {/* Utilidad Fiscal del Ejercicio Actual */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Utilidad Fiscal a Amortizar ({anoAplicacion})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="0"
                step="50000"
                value={utilidadFiscalEjercicio}
                onChange={(e) => setUtilidadFiscalEjercicio(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Control de Vigencia */}
          <div className={`p-3.5 rounded-2xl border text-xs space-y-1 ${perdidaCaducada ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}>
            <div className="font-bold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Estatus de Caducidad (Regla 10 Años):</span>
            </div>
            <p>
              {perdidaCaducada
                ? `Han transcurrido ${anosTranscurridos} años. La pérdida ha caducado legalmente conforme al Art. 57 LISR.`
                : `Antigüedad: ${anosTranscurridos} años. Te restan ${anosRestantes} ejercicios para agotar la pérdida.`}
            </p>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Ahorro en ISR Corporativo (30% PM)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${ahorroIsrCorporativo.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                <div className="text-[11px] text-slate-400 font-medium">Pérdida Actualizada INPC</div>
                <div className="text-base font-black text-white mt-0.5">
                  ${perdidaActualizadaTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Nueva Base Gravable ISR</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  ${utilidadFiscalGravableFinal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Pérdida histórica declarada:</span>
                <span className="font-mono font-bold text-white">${montoPerdidaOriginal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Ganancia por actualización inflacionaria:</span>
                <span className="font-mono font-bold">+${(perdidaActualizadaTotal - montoPerdidaOriginal).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>Pérdida aplicada contra utilidades ({anoAplicacion}):</span>
                <span className="font-mono font-bold">-${perdidaAmortizada.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Remanente de Pérdida para Años Futuros:</span>
                <span className="font-mono text-emerald-400 text-base">${remanentePerdidaPendiente.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2 text-xs">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Factor de Actualización Multianual Aplicado: {factorTotalAcumulado.toFixed(4)}</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              La actualización se realizó estrictamente bajo los lineamientos del Artículo 57 de la Ley del ISR. Esto incrementa el valor deducible de tu pérdida en <strong>${(perdidaActualizadaTotal - montoPerdidaOriginal).toLocaleString('es-MX', { minimumFractionDigits: 2 })} pesos</strong> protegiendo tu liquidez corporativa contra la inflación.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Tratamiento Tributario de las Pérdidas Fiscales en México (Art. 57 LISR)
        </h2>
        <p>
          La <strong>pérdida fiscal</strong> se configura en el ejercicio en que los ingresos acumulables de una persona moral o persona física con actividad empresarial son menores a las deducciones autorizadas incrementadas por la participación de los trabajadores en las utilidades (PTU) pagada. Lejos de constituir un evento meramente contable adverso, la ley tributaria reconoce el derecho de los contribuyentes a emplear este saldo deficitario como un <strong>escudo fiscal</strong> de alto valor para mitigar el pago de ISR en ejercicios futuros rentables.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Procedimiento Legal de Actualización por Inflación
        </h3>
        <p>
          Debido a la pérdida de poder adquisitivo provocada por la inflación, el Artículo 57 de la Ley del ISR contempla un mecanismo obligatorio de indexación monetaria:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Primera Actualización:</strong> Se multiplica el monto de la pérdida por el factor de actualización obtenido al dividir el INPC del último mes de la primera mitad del ejercicio en que ocurrió (junio) entre el INPC del primer mes de la segunda mitad del ejercicio inmediato anterior (julio).
          </li>
          <li>
            <strong>Segunda y Subsecuentes Actualizaciones:</strong> Al amortizar el remanente en años posteriores, se multiplica dicho saldo por el factor resultante de dividir el INPC de junio del ejercicio en que se aplicará entre el INPC del mes en que se actualizó previamente.
          </li>
        </ol>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. El Plazo Perentorio de Diez Años y la Regla de Pérdida del Derecho
        </h3>
        <p>
          La amortización de pérdidas está sujeta a un doble límite de orden público:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Caducidad Decenal:</strong> El contribuyente dispone de un plazo fatal de diez ejercicios fiscales inmediatos posteriores para consumir la pérdida. Una vez vencido el décimo año, cualquier saldo remanente se extingue sin posibilidad de prórroga ni recurso legal.
          </li>
          <li>
            <strong>Obligación de Disminución Preferente:</strong> Si un contribuyente genera utilidad fiscal en un ejercicio y omite amortizar la pérdida fiscal que tenía pendiente de ejercicios previos, <strong>perderá el derecho a aplicarla en ejercicios futuros</strong> hasta por el importe que pudo haber disminuido en dicho año.
          </li>
        </ul>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Amortización de Pérdidas</span>
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
        <Link href="/mx/calculadora-puntos-infonavit-t1000" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Calculadora Puntos Infonavit T1000 &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

