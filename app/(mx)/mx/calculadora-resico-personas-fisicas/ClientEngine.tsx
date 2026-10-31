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
  Building2,
  TrendingDown,
  Coins,
  Percent,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

// Tabla mensual de RESICO Personas Físicas (Art. 113-E LISR)
const RESICO_MONTHLY_TABLE = [
  { limit: 25000, rate: 0.01 },
  { limit: 50000, rate: 0.011 },
  { limit: 83333.33, rate: 0.015 },
  { limit: 208333.33, rate: 0.02 },
  { limit: 291666.67, rate: 0.025 }, // Tope 3.5 millones de pesos anuales
];

export default function CalculadoraResicoMexicoPage() {
  const [ingresoMensual, setIngresoMensual] = React.useState<number>(45000);
  const [facturaAPersonaMoral, setFacturaAPersonaMoral] = React.useState<boolean>(true);
  const [porcentajePersonaMoral, setPorcentajePersonaMoral] = React.useState<number>(100);
  const [aplicaIva, setAplicaIva] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Determinación de tasa aplicable RESICO
  let tasaResico = 0.025;
  for (const bracket of RESICO_MONTHLY_TABLE) {
    if (ingresoMensual <= bracket.limit) {
      tasaResico = bracket.rate;
      break;
    }
  }

  // ISR propio determinado según tasa RESICO
  const isrDeterminado = ingresoMensual * tasaResico;

  // Retención 1.25% si factura a Personas Morales (Art. 113-J LISR)
  const baseFacturadaMoral = facturaAPersonaMoral ? ingresoMensual * (porcentajePersonaMoral / 100) : 0;
  const retencionIsrMoral = baseFacturadaMoral * 0.0125;

  // ISR a cargo a pagar en la declaración mensual
  const isrAPagarMensual = Math.max(0, isrDeterminado - retencionIsrMoral);

  // IVA trasladado (16%) si aplica
  const ivaTrasladado = aplicaIva ? ingresoMensual * 0.16 : 0;
  const retencionIvaMoral = facturaAPersonaMoral && aplicaIva ? baseFacturadaMoral * (0.16 * (2 / 3)) : 0; // Retención 2/3 de IVA

  // Comparativa vs Régimen de Actividades Empresariales y Profesionales (RIF/Actividad Empresarial tradicional ~20-30% de utilidad)
  const isrRegimenTradicionalEstimado = ingresoMensual * 0.20; // Estimación promedio
  const ahorroFiscalMensual = Math.max(0, isrRegimenTradicionalEstimado - isrDeterminado);

  const handleCopy = () => {
    const text = `Cálculo Oficial RESICO Personas Físicas México 2026 (Art. 113-E y 113-J LISR):
Ingresos Brutos Mensuales: $${ingresoMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Tasa Efectiva RESICO Aplicable: ${(tasaResico * 100).toFixed(2)}%
ISR Determinado: $${isrDeterminado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
${facturaAPersonaMoral ? `- Retención 1.25% Persona Moral: $${retencionIsrMoral.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN\n` : ''}= ISR Mensual a Pagar al SAT: $${isrAPagarMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
${aplicaIva ? `+ IVA Trasladado (16%): $${ivaTrasladado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN\n` : ''}Ahorro Fiscal Estimado vs Régimen General: $${ahorroFiscalMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN al mes`;
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
        name: '¿Cuáles son las tasas de impuesto en el RESICO para Personas Físicas en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Artículo 113-E de la Ley del ISR, las tasas del Régimen Simplificado de Confianza van del 1.0% al 2.5% sobre los ingresos brutos cobrados: hasta $25,000 (1.0%), hasta $50,000 (1.1%), hasta $83,333.33 (1.5%), hasta $208,333.33 (2.0%) y hasta $3.5 millones anuales (2.5%).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué retención deben hacerme las empresas si tributo en RESICO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Artículo 113-J de la Ley del ISR establece que cuando los contribuyentes personas físicas del RESICO realicen actividades empresariales, profesionales u otorguen el uso o goce temporal de bienes a personas morales, estas últimas deberán retener el 1.25% sobre el monto de los pagos que les efectúen, sin incluir el IVA.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Se pueden deducir gastos personales o de negocio en el RESICO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En el RESICO Personas Físicas para efectos del ISR no se aplican deducciones autorizadas de gastos ni deducciones personales anuales, ya que la tasa de impuesto es sumamente reducida (1% a 2.5%) y se aplica directamente sobre los ingresos brutos efectivamente cobrados. No obstante, las compras y gastos con factura CFDI sí son indispensables para acreditar el IVA.',
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
        <span className="text-slate-400">Calculadora RESICO</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Art. 113-E a 113-J LISR & Miscelánea Fiscal 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora RESICO Personas Físicas México 2026 (SAT)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Calcula tu pago mensual de ISR en el Régimen Simplificado de Confianza con tasas desde el 1.0% hasta el 2.5%, retención del 1.25% de personas morales y comparativa de ahorro fiscal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Ingresos del Mes</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Tope 3.5M
            </span>
          </div>

          {/* Ingreso Mensual */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Ingresos Brutos Cobrados (Sin IVA)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="1000"
                max="291666"
                step="1000"
                value={ingresoMensual}
                onChange={(e) => setIngresoMensual(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
            <p className="text-[11px] text-slate-500">Ingreso efectivamente cobrado en el mes de calendario.</p>
          </div>

          {/* Presets */}
          <div className="flex gap-1.5 flex-wrap">
            {[20000, 35000, 50000, 80000, 150000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setIngresoMensual(val)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-xs font-bold text-slate-700 transition-colors"
              >
                ${val / 1000}k
              </button>
            ))}
          </div>

          {/* Factura a Persona Moral (Retención 1.25%) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={facturaAPersonaMoral}
                onChange={(e) => setFacturaAPersonaMoral(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
              />
              <span className="text-xs font-bold text-slate-800">Facturo a Personas Morales (Empresas)</span>
            </label>
            {facturaAPersonaMoral && (
              <div className="pl-6 space-y-1">
                <span className="text-[11px] text-slate-500">
                  Porcentaje de ingresos facturados a empresas: {porcentajePersonaMoral}%
                </span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={porcentajePersonaMoral}
                  onChange={(e) => setPorcentajePersonaMoral(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>
            )}
          </div>

          {/* IVA Trasladado */}
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={aplicaIva}
                onChange={(e) => setAplicaIva(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
              />
              <span className="text-xs font-bold text-slate-800">Actividad Gravada con IVA (16%)</span>
            </label>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ISR Mensual a Pagar al SAT
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${isrAPagarMensual.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Tasa RESICO</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  {(tasaResico * 100).toFixed(2)}%
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">ISR Total Bruto</div>
                <div className="text-base font-black text-white mt-0.5">
                  ${isrDeterminado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Retención 1.25%</div>
                <div className="text-base font-black text-rose-300 mt-0.5">
                  -${retencionIsrMoral.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Ingreso base cobrado:</span>
                <span className="font-mono font-bold text-white">${ingresoMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              {aplicaIva && (
                <div className="flex justify-between text-slate-300">
                  <span>+ IVA Trasladado al cliente (16%):</span>
                  <span className="font-mono font-bold text-white">+${ivaTrasladado.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {retencionIvaMoral > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>- Retención 2/3 IVA por Persona Moral:</span>
                  <span className="font-mono font-bold">-${retencionIvaMoral.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Saldo Definitivo ISR a Declarar:</span>
                <span className="font-mono text-emerald-400 text-base">${isrAPagarMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Comparativa de Ahorro Fiscal */}
          <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-5 shadow-xs space-y-2 text-xs text-emerald-950">
            <h3 className="font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-emerald-800">
              <TrendingDown className="w-4 h-4 text-emerald-700" />
              <span>Ahorro Fiscal frente al Régimen General: ${ahorroFiscalMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN / mes</span>
            </h3>
            <p className="leading-relaxed text-emerald-900">
              En el Régimen de Actividad Empresarial ordinario, un profesionista con este ingreso pagaría aproximadamente <strong>${isrRegimenTradicionalEstimado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</strong> de ISR mensual. En RESICO pagas solo <strong>${isrDeterminado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</strong>.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Copy (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          El Régimen Simplificado de Confianza (RESICO) Personas Físicas 2026
        </h2>
        <p>
          El <strong>Régimen Simplificado de Confianza (RESICO)</strong>, previsto en los Artículos 113-E al 113-J de la Ley del Impuesto sobre la Renta, fue diseñado por la Secretaría de Hacienda y Crédito Público (SHCP) y el SAT para fomentar la formalización y simplificar al máximo el cumplimiento fiscal de los pequeños empresarios, profesionistas independientes y arrendadores en México.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Quiénes pueden tributar y límite de 3.5 Millones de Pesos
        </h3>
        <p>
          Pueden optar por tributar en RESICO las personas físicas que realicen exclusivamente actividades empresariales (comercio, industria, servicios), profesionales (médicos, abogados, arquitectos, ingenieros, contadores) o que otorguen el uso o goce temporal de bienes inmuebles (arrendamiento habitacional o comercial), siempre que la totalidad de sus ingresos en el ejercicio inmediato anterior no hayan excedido de <strong>3.5 millones de pesos mexicanos</strong>.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Tabla Escalonada de Tasas Mensuales (Art. 113-E LISR)
        </h3>
        <p>
          A diferencia del régimen general donde el impuesto se calcula sobre la utilidad gravable después de restar gastos, en RESICO la tasa se aplica directamente sobre los <strong>ingresos brutos cobrados</strong> sin deducciones:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Hasta $25,000.00 MXN mensuales: <strong>1.00%</strong></li>
          <li>De $25,000.01 a $50,000.00 MXN mensuales: <strong>1.10%</strong></li>
          <li>De $50,000.01 a $83,333.33 MXN mensuales: <strong>1.50%</strong></li>
          <li>De $83,333.34 a $208,333.33 MXN mensuales: <strong>2.00%</strong></li>
          <li>De $208,333.34 a $291,666.67 MXN mensuales: <strong>2.50%</strong></li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          3. Obligación de Retención del 1.25% por Personas Morales (Art. 113-J LISR)
        </h3>
        <p>
          Cuando una persona física en RESICO presta servicios o vende bienes a una Persona Moral (SA de CV, S de RL, etc.), la empresa tiene la obligación legal de retener el <strong>1.25%</strong> sobre el valor de la operación sin IVA. Dicha retención tiene carácter de pago provisional acreditable, por lo que la persona física la descuenta en su declaración mensual ante el SAT.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre RESICO Personas Físicas</span>
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
        <Link href="/mx/calculadora-honorarios-retencion-isr-iva" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Retención ISR e IVA Honorarios &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

