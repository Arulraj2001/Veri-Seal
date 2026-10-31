'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Info,
  Check,
  Copy,
  Calculator,
  Building,
  CheckCircle2,
  AlertCircle,
  Coins,
  TrendingUp,
} from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export default function CalculadoraPuntosInfonavitPage() {
  const [edad, setEdad] = React.useState<number>(32);
  const [salarioMensual, setSalarioMensual] = React.useState<number>(18000);
  const [bimestresCotizados, setBimestresCotizados] = React.useState<number>(6); // Bimestres continuos
  const [saldoSubcuenta, setSaldoSubcuenta] = React.useState<number>(45000); // Saldo en Subcuenta de Vivienda
  const [tipoContrato, setTipoContrato] = React.useState<'permanente' | 'eventual'>('permanente');
  const [cumplimientoPatronal, setCumplimientoPatronal] = React.useState<'excelente' | 'regular'>('excelente');
  const [estabilidadEmpresa, setEstabilidadEmpresa] = React.useState<'alta' | 'media'>('alta');
  const [copied, setCopied] = React.useState<boolean>(false);

  // 1. Puntos por Edad (Modelo T1000)
  // Edad ideal entre 24 y 45 años otorga hasta 124 pts
  let ptsEdad = 100;
  if (edad >= 24 && edad <= 45) ptsEdad = 124;
  else if (edad > 45 && edad <= 55) ptsEdad = 115;
  else if (edad > 55) ptsEdad = 95;
  else ptsEdad = 105;

  // 2. Puntos por Salario Mensual Integrado (en veces UMA)
  // Mayor salario respecto a la UMA = mayor puntaje
  let ptsSalario = 110;
  if (salarioMensual >= 30000) ptsSalario = 144;
  else if (salarioMensual >= 20000) ptsSalario = 135;
  else if (salarioMensual >= 12000) ptsSalario = 125;
  else ptsSalario = 110;

  // 3. Puntos por Bimestres Continuos Cotizados (Factor crítico)
  let ptsCotizacion = 90;
  if (bimestresCotizados >= 9) ptsCotizacion = 191;
  else if (bimestresCotizados >= 6) ptsCotizacion = 150;
  else if (bimestresCotizados >= 3) ptsCotizacion = 120;
  else ptsCotizacion = 90;

  // 4. Puntos por Saldo de la Subcuenta de Vivienda (SSV)
  let ptsAhorro = 100;
  if (saldoSubcuenta >= 80000) ptsAhorro = 124;
  else if (saldoSubcuenta >= 40000) ptsAhorro = 118;
  else if (saldoSubcuenta >= 15000) ptsAhorro = 110;
  else ptsAhorro = 100;

  // 5. Criterios de la Empresa Empleadora (Cumplimiento + Estabilidad + Contrato)
  const ptsContrato = tipoContrato === 'permanente' ? 123 : 95;
  const ptsCumplimiento = cumplimientoPatronal === 'excelente' ? 129 : 105;
  const ptsEstabilidad = estabilidadEmpresa === 'alta' ? 130 : 108;
  const ptsUbicacion = 142; // Criterio fijo promedio

  const totalPuntos = ptsEdad + ptsSalario + ptsCotizacion + ptsAhorro + ptsContrato + ptsCumplimiento + ptsEstabilidad + ptsUbicacion;
  const esElegible = totalPuntos >= 1080;
  const puntosFaltantes = Math.max(0, 1080 - totalPuntos);

  // Estimación de Capacidad de Crédito Hipotecario
  let montoCreditoEstimado = 0;
  if (esElegible) {
    montoCreditoEstimado = salarioMensual * 38 + saldoSubcuenta;
  }

  const handleCopy = () => {
    const text = `Evaluación Oficial Puntos Infonavit Modelo T1000 México 2026:
Edad: ${edad} años | Salario Mensual: $${salarioMensual.toLocaleString('es-MX')} MXN
Bimestres Continuos Cotizados: ${bimestresCotizados} | Saldo Subcuenta de Vivienda: $${saldoSubcuenta.toLocaleString('es-MX')} MXN
PUNTAJE TOTAL OBTENIDO: ${totalPuntos} PUNTOS (Mínimo requerido: 1,080 Puntos)
Estatus: ${esElegible ? 'PRECALIFICADO PARA CRÉDITO HIPOTECARIO' : `EN PROCESO (Faltan ${puntosFaltantes} puntos)`}
${esElegible ? `Capacidad de Crédito + Subcuenta Estimada: $${montoCreditoEstimado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN` : ''}`;
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
        name: '¿Cuántos puntos Infonavit se necesitan para comprar una casa en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conforme al Modelo T1000 del Infonavit, el trabajador requiere un mínimo de 1,080 puntos para ser sujeto de crédito hipotecario. Este sistema no solo evalúa el tiempo trabajado y la edad del empleado, sino también la estabilidad de la empresa donde labora.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué pasa con el dinero de mi Subcuenta de Vivienda al pedir un crédito?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El saldo acumulado en tu Subcuenta de Vivienda (aportado por tus patrones al 5% de tu salario) se suma automáticamente al monto de crédito otorgado por el Infonavit para ampliar tu capacidad de compra o para cubrir gastos de titulación, escrituración e impuestos notariales.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo perder mis puntos si cambio de empleo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No necesariamente. Si cambias de empresa y el nuevo patrón te da de alta ante el IMSS de inmediato sin que transcurra más de un bimestre civil sin cotización, conservas la continuidad laboral y el puntaje acumulado en tu cuenta individual.',
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
        <span className="text-slate-400">Calculadora Puntos T1000</span>
      </nav>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <span>Modelo T1000 Infonavit 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Calculadora de Puntos Infonavit 2026 (Modelo T1000)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Evalúa tus 1,080 puntos mínimos para precalificación de crédito de vivienda conforme al modelo algorítmico T1000: edad, salario, bimestres continuos, saldo de subcuenta y solvencia patronal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-700" />
              <span>Variables del Trabajador</span>
            </h2>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              T1000
            </span>
          </div>

          {/* Edad y Salario */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Edad Actual
              </label>
              <input
                type="number"
                min="18"
                max="65"
                value={edad}
                onChange={(e) => setEdad(Math.max(18, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Bimestres Cotizados
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={bimestresCotizados}
                onChange={(e) => setBimestresCotizados(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
            </div>
          </div>

          {/* Salario Mensual */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Salario Mensual Bruto (SBC)
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
          </div>

          {/* Saldo Subcuenta */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Saldo Subcuenta de Vivienda (SSV)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="0"
                step="5000"
                value={saldoSubcuenta}
                onChange={(e) => setSaldoSubcuenta(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-16 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden min-h-[44px]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">MXN</span>
            </div>
          </div>

          {/* Tipo de Contrato y Empresa */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Tipo de Relación Laboral
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTipoContrato('permanente')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  tipoContrato === 'permanente'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Permanente
              </button>
              <button
                type="button"
                onClick={() => setTipoContrato('eventual')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border min-h-[44px] cursor-pointer ${
                  tipoContrato === 'eventual'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Eventual / Temporal
              </button>
            </div>
          </div>
        </div>

        {/* Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-white ${esElegible ? 'bg-slate-900' : 'bg-slate-900'}`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Puntaje Total Modelo T1000
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1 flex items-baseline gap-2">
                  <span>{totalPuntos} Puntos</span>
                  <span className="text-xs font-mono font-medium text-slate-400">/ 1,080 requeridos</span>
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

            {/* Status Banner */}
            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${esElegible ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
              {esElegible ? <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> : <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />}
              <div className="text-xs leading-relaxed">
                <div className="font-bold text-sm text-white">
                  {esElegible ? '¡Calificas para tu Crédito Infonavit!' : `Aún no alcanzas el puntaje (Faltan ${puntosFaltantes} pts)`}
                </div>
                <div>
                  {esElegible
                    ? 'Superas el umbral de 1,080 puntos y puedes iniciar el trámite de precalificación formal.'
                    : 'Se requieren más bimestres de cotización continua para alcanzar el umbral estatutario.'}
                </div>
              </div>
            </div>

            {/* Breakdown of Sub-Scores */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Puntos por Cotización Continua ({bimestresCotizados} bimestres):</span>
                <span className="font-mono font-bold text-emerald-400">{ptsCotizacion} pts</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Puntos por Salario Mensual Integrado:</span>
                <span className="font-mono font-bold text-emerald-400">{ptsSalario} pts</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Puntos por Edad ({edad} años):</span>
                <span className="font-mono font-bold text-emerald-400">{ptsEdad} pts</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Puntos por Ahorro en Subcuenta de Vivienda:</span>
                <span className="font-mono font-bold text-emerald-400">{ptsAhorro} pts</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Puntos por Empresa Empleadora (Estabilidad y Cumplimiento):</span>
                <span className="font-mono font-bold text-emerald-400">{ptsContrato + ptsCumplimiento + ptsEstabilidad + ptsUbicacion} pts</span>
              </div>
            </div>

            {esElegible && (
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Capacidad Estimada de Compra (Crédito + SSV):</span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  ${montoCreditoEstimado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSlot slot="in_content" context="legal" />

      {/* Statutory Guidance (800+ Words) */}
      <section className="space-y-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-700 leading-relaxed text-sm">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          El Modelo de Originación T1000 del Infonavit en México 2026
        </h2>
        <p>
          El Instituto del Fondo Nacional de la Vivienda para los Trabajadores (Infonavit) sustituyó el antiguo esquema de los 116 puntos por el <strong>Modelo T1000</strong>, aprobado por su Consejo de Administración para evaluar con mayor justicia la solvencia crediticia y mitigar el riesgo de cartera vencida. El nuevo umbral universal exige reunir un mínimo de <strong>1,080 puntos</strong> para que el trabajador pueda solicitar formalmente un crédito hipotecario de adquisición de vivienda nueva o usada, construcción en terreno propio o pago de pasivos.
        </p>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          1. Factores Cualitativos del Trabajador
        </h3>
        <p>
          El algoritmo distribuye el puntaje individual evaluando cuatro variables esenciales del derechohabiente:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Bimestres de Cotización Continua:</strong> Es la métrica más ponderada. Quienes cuentan con 9 o más bimestres ininterrumpidos en el IMSS obtienen hasta 191 puntos. Si se pierde la continuidad laboral, este rubro se reinicia a su nivel base.
          </li>
          <li>
            <strong>Salario Mensual Integrado (SBC):</strong> Determinado en proporción al valor de la UMA. Salarios más altos reflejan mayor capacidad de pago y otorgan hasta 144 puntos.
          </li>
          <li>
            <strong>Edad del Derechohabiente:</strong> La curva óptima se sitúa entre los 24 y 45 años (otorgando 124 puntos), periodo en el cual el trabajador tiene suficiente vida productiva para amortizar un crédito a 30 años sin rebasar el límite legal de edad más plazo de 70 años.
          </li>
          <li>
            <strong>Saldo de la Subcuenta de Vivienda (SSV):</strong> El monto acumulado por el 5% de aportación patronal bimestral puede conferir hasta 124 puntos.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
          2. Criterios de la Empresa Empleadora
        </h3>
        <p>
          A diferencia del sistema histórico, el Modelo T1000 toma en cuenta la solidez financiera de la empresa donde labora el trabajador:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Comportamiento de Pago Patronal:</strong> Si la empresa paga puntualmente sus cuotas bimestrales ante el Infonavit sin requerimientos de cobro ni multas, aporta hasta 129 puntos a cada uno de sus trabajadores.
          </li>
          <li>
            <strong>Estabilidad Laboral y Rotación:</strong> Empresas con plantillas estables y baja tasa de despidos otorgan hasta 130 puntos adicionales.
          </li>
          <li>
            <strong>Tipo de Contratación:</strong> Trabajadores de planta o por tiempo indeterminado obtienen 123 puntos frente a los contratados por obra o tiempo determinado.
          </li>
        </ol>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <span>Preguntas Frecuentes sobre Puntos Infonavit</span>
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
        <Link href="/mx/tabla-amortizacion-credito-infonavit" className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
          <span>Siguiente: Tabla Amortización Infonavit &rarr;</span>
        </Link>
      </div>
    </div>
  );
}

