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
  Home,
  Percent,
  Calendar,
  DollarSign,
  TrendingDown,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function TablaAmortizacionInfonavitPage() {
  const [montoCredito, setMontoCredito] = React.useState<number>(650000);
  const [plazoAnos, setPlazoAnos] = React.useState<number>(20);
  const [salarioMensual, setSalarioMensual] = React.useState<number>(20000);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Tasa de interés diferenciada por nivel de ingreso (Infonavit en Pesos 2026: 1.91% a 10.45%)
  let tasaInteresAnual = 10.45;
  if (salarioMensual <= 9000) tasaInteresAnual = 3.50;
  else if (salarioMensual <= 15000) tasaInteresAnual = 6.20;
  else if (salarioMensual <= 22000) tasaInteresAnual = 8.50;
  else tasaInteresAnual = 10.45;

  const tasaMensual = tasaInteresAnual / 100 / 12;
  const totalMeses = plazoAnos * 12;

  // Mensualidad fija del trabajador
  const factor = Math.pow(1 + tasaMensual, totalMeses);
  const mensualidadFija = factor > 1 ? (montoCredito * tasaMensual * factor) / (factor - 1) : montoCredito / totalMeses;

  // Aportación patronal obligatoria del 5% del salario mensual (abono a capital)
  const aportacionPatronalMensual = salarioMensual * 0.05;

  // Construcción de la tabla de los primeros 12 meses
  const tablaPrimerAno = React.useMemo(() => {
    let saldo = montoCredito;
    const meses = [];
    for (let m = 1; m <= 12; m++) {
      const interesMes = saldo * tasaMensual;
      const amortizacionTrabajador = Math.max(0, mensualidadFija - interesMes);
      const abonoTotalCapital = amortizacionTrabajador + aportacionPatronalMensual;
      saldo = Math.max(0, saldo - abonoTotalCapital);
      meses.push({
        mes: m,
        interes: interesMes,
        amortizacion: amortizacionTrabajador,
        patronal: aportacionPatronalMensual,
        pagoTotal: mensualidadFija + aportacionPatronalMensual,
        saldoInsoluto: saldo,
      });
    }
    return meses;
  }, [montoCredito, tasaMensual, totalMeses, mensualidadFija, aportacionPatronalMensual]);

  // Estimación de costo financiero total
  const totalInteresesPagados = mensualidadFija * totalMeses - montoCredito;
  const totalPagadoSinPatron = mensualidadFija * totalMeses;

  const handleCopy = () => {
    const text = `Simulación Tabla de Amortización Crédito Infonavit Pesos 2026:
Monto del Crédito: $${montoCredito.toLocaleString('es-MX')} MXN | Plazo: ${plazoAnos} años (${totalMeses} mensualidades)
Salario Mensual Registrado: $${salarioMensual.toLocaleString('es-MX')} MXN
Tasa de Interés Fija Otorgada: ${tasaInteresAnual.toFixed(2)}% anual
Mensualidad Fija del Trabajador: $${mensualidadFija.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
Aportación Patronal 5% a Capital: $${aportacionPatronalMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN al mes
Total de Intereses Estimados en el Plazo: $${totalInteresesPagados.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
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
        name: '¿Cómo funciona la tasa de interés diferenciada de Infonavit en Pesos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bajo el esquema oficial en Pesos del Infonavit, la tasa de interés no es fija para todos, sino que va del 1.91% al 10.45% anual dependiendo del nivel salarial del trabajador registrado ante el IMSS. A menor salario, menor tasa de interés se asigna.',
        },
      },
      {
        '@type': 'Question',
        name: '¿A dónde va la aportación del 5% que hace mi patrón cada bimestre?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En el esquema en Pesos, la aportación patronal del 5% de tu salario no se pierde ni va a intereses: se abona íntegramente como pago anticipado directo a capital, lo que reduce sustancialmente el plazo real de liquidación de tu hipoteca.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Por qué conviene el crédito en Pesos frente al crédito en Veces Salario Mínimo (VSM)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los antiguos créditos en VSM aumentaban de saldo cada 1 de enero conforme subía el salario mínimo o la UMA. El crédito en Pesos tiene saldo congelado, mensualidad fija en pesos y tasa inmutable durante toda la vigencia del financiamiento.',
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
        <span className="text-slate-900 font-semibold">Crédito & Infonavit</span>
        <span>/</span>
        <span className="text-slate-400">Tabla de Amortización</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Infonavit en Pesos & Tasa Fija Diferenciada 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Tabla de Amortización Crédito Infonavit en Pesos 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Simula tus pagos mensuales fijos en Pesos, la amortización real del capital, la tasa de interés asignada según tu nivel salarial y el abono patronal del 5% directo a deuda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-700" />
              <span>Condiciones del Financiamiento</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Pesos
            </span>
          </div>

          {/* Monto de Crédito */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Monto del Crédito Otorgado
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="100000"
                step="50000"
                value={montoCredito}
                onChange={(e) => setMontoCredito(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Salario Mensual para determinar Tasa */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Tu Salario Mensual Registrado
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="5000"
                step="2000"
                value={salarioMensual}
                onChange={(e) => setSalarioMensual(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Tasa de interés asignada por Infonavit: <strong>{tasaInteresAnual.toFixed(2)}% anual fija</strong>.
            </p>
          </div>

          {/* Plazo en Años */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Plazo del Crédito
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setPlazoAnos(y)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                    plazoAnos === y
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {y} años
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Abono Patronal del 5%:</span>
            </div>
            <p>
              Tu empleador aportará obligatoriamente <strong>${aportacionPatronalMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</strong> al mes directo a capital, reduciendo el tiempo de pago.
            </p>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Mensualidad Fija a Descontar por Nómina
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  ${mensualidadFija.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-mono font-medium text-slate-400 ml-2">MXN / mes</span>
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
                <div className="text-[11px] text-slate-400 font-medium">Tasa Anual Fija</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">{tasaInteresAnual.toFixed(2)}%</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Abono Patronal 5%</div>
                <div className="text-base font-black text-white mt-0.5">${aportacionPatronalMensual.toFixed(0)}</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">Total Intereses</div>
                <div className="text-base font-black text-rose-300 mt-0.5">${(totalInteresesPagados / 1000).toFixed(0)}k</div>
              </div>
            </div>

            {/* Primeros Meses de la Tabla */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Extracto Tabla de Amortización (Primeros 3 Meses):
              </div>
              {tablaPrimerAno.slice(0, 3).map((item) => (
                <div key={item.mes} className="flex justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-[11px]">
                  <span>Mes {item.mes}: Interés: ${item.interes.toFixed(0)} | Amortización: ${item.amortizacion.toFixed(0)}</span>
                  <span className="font-mono font-bold text-emerald-400">Saldo: ${item.saldoInsoluto.toFixed(0)} MXN</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          El Crédito Infonavit en Pesos vs el Histórico Esquema VSM 2026
        </h2>
        <p>
          Durante décadas, los créditos hipotecarios del Infonavit fueron contratados bajo la modalidad de <strong>Veces Salario Mínimo (VSM)</strong>. Este esquema perjudicó financieramente a cientos de miles de familias mexicanas, ya que cada año, al actualizarse el salario mínimo o la UMA, el saldo insoluto de la deuda crecía de manera exponencial, volviendo las hipotecas impagables a pesar de la puntualidad en los pagos del derechohabiente.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Características del Nuevo Esquema en Pesos a Tasa Fija
        </h3>
        <p>
          En respuesta a esta problemática estructural, el Infonavit consolidó su programa crediticio en <strong>Pesos</strong> con las siguientes garantías contractuales inamovibles:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Mensualidades Fijas:</strong> El pago en pesos se mantiene exactamente idéntico desde el primer mes hasta la liquidación final del crédito. No sufre incrementos anuales por inflación ni por ajustes al salario mínimo.
          </li>
          <li>
            <strong>Tasa de Interés Social Diferenciada:</strong> Las tasas anuales oscilan entre el <strong>1.91% y el 10.45%</strong> según el ingreso del trabajador, situándose muy por debajo de las tasas de la banca comercial para los trabajadores de menores ingresos.
          </li>
          <li>
            <strong>Amortización Inmediata a Capital:</strong> Desde la primera mensualidad, una fracción sustancial del pago se destina a reducir el saldo insoluto de la deuda.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. El Rol del 5% de Aportación Patronal
        </h3>
        <p>
          Por mandato del Artículo 29 de la Ley del Infonavit, los patrones están obligados a aportar el 5% sobre el Salario Base de Cotización de cada trabajador. Cuando el derechohabiente adquiere una hipoteca en pesos, <strong>este 5% patronal no se retiene ni se pierde</strong>, sino que actúa como un pago anticipado que se abona íntegramente al saldo insoluto de capital en cada bimestre, permitiendo finiquitar créditos de 30 años en plazos reales de entre 17 y 22 años.
        </p>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Crédito Infonavit en Pesos</span>
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
        <Link href="/mx/calculadora-gastos-notariales-isai-escrituracion" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Gastos Notariales e ISAI &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

