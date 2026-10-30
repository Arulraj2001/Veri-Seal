import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainSalaryEngine } from '@/components/international/SpainSalaryEngine';
import { HREFLANG_REGISTRY } from '@/lib/international/registry';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadora de Sueldo Neto 2026 : Bruto a Neto Nómina | Kagazo',
  description:
    'Calcula tu sueldo neto mensual y anual en España en 2026 con 12 o 14 pagas. Tabla salarial neta, retenciones de IRPF autonómicas y cotizaciones a la Seguridad Social.',
  keywords: [
    'calculadora sueldo neto españa 2026',
    'calcular salario neto mensual y anual',
    'pasar de bruto a neto nomina',
    'tramos irpf nomina 2026',
    'sueldo neto 12 o 14 pagas',
    'cuanto cobro limpio de 30000 euros',
    'retencion irpf madrid cataluna andalucia',
    'seguridad social trabajador mei 2026',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculadora-sueldo-neto`,
    languages: HREFLANG_REGISTRY.salary_calculator.locales,
  },
  openGraph: {
    title: 'Calculadora de Sueldo Neto 2026 : Bruto a Neto Nómina | Kagazo España',
    description:
      'Calcula exactamente cuánto cobras limpio al mes en 12 o 14 pagas según tu salario bruto y tu comunidad autónoma en 2026.',
    url: `${SITE_URL}/es/calculadora-sueldo-neto`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainSalaryPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Calculadora de Sueldo Neto España 2026',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        provider: {
          '@type': 'Organization',
          name: 'Kagazo España',
          url: SITE_URL,
        },
        description:
          'Simulador oficial de nómina española para convertir sueldo bruto en neto en 12 o 14 pagas con IRPF 2026 y cotizaciones a la Seguridad Social.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Cálculo de Salario Neto y Retenciones Fiscales',
        category: 'PayrollCalculation',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo España',
          url: SITE_URL,
        },
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/es" className="hover:text-slate-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/es#laboral-fiscal" className="hover:text-slate-900 transition-colors">
            Laboral y Fiscal
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Calculadora de Sueldo Neto</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tablas Oficiales IRPF y Seguridad Social 2026 • 17 CC.AA.</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculadora de Sueldo Neto en España (2026) : De Bruto a Neto
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Calcula exactamente tu salario neto mensual y anual limpio de impuestos y cotizaciones. Simulación oficial para contratos indefinidos y temporales en 12 y 14 pagas con la escala del IRPF estatal y autonómica actualizada.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cuánto se cobra limpio de sueldo en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            Para un salario bruto habitual de <strong>30.000 € al año</strong> en España (soltero sin hijos, contrato indefinido), el sueldo neto limpio es de aproximadamente <strong>1.947 € al mes en 12 pagas</strong> o <strong>1.669 € al mes en 14 pagas</strong>. Del bruto se descuenta un <strong>6,49% de cotizaciones a la Seguridad Social</strong> (1.947 €/año) y una <strong>retención media de IRPF del 15,6%</strong> (4.689 €/año).
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainSalaryEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla Salarial de Referencia : De Bruto a Neto en España 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Valores calculados para un trabajador soltero sin hijos con contrato indefinido bajo la escala media estatal y autonómica.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Salario Bruto Anual</th>
                  <th className="py-3.5 px-4 font-bold">IRPF Medio (%)</th>
                  <th className="py-3.5 px-4 font-bold">Seguridad Social (6,49%)</th>
                  <th className="py-3.5 px-4 font-bold">Neto Mensual (12 Pagas)</th>
                  <th className="py-3.5 px-4 font-bold">Neto Mensual (14 Pagas)</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Neto Anual Limpio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold">18.000 €</td>
                  <td className="py-3 px-4 text-slate-600">4,8 %</td>
                  <td className="py-3 px-4 text-slate-600">1.168 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.331 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.141 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">15.968 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold">22.000 €</td>
                  <td className="py-3 px-4 text-slate-600">9,9 %</td>
                  <td className="py-3 px-4 text-slate-600">1.428 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.533 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.314 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">18.394 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold">25.000 €</td>
                  <td className="py-3 px-4 text-slate-600">12,6 %</td>
                  <td className="py-3 px-4 text-slate-600">1.623 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.685 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">1.444 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">20.227 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold text-orange-950">30.000 €</td>
                  <td className="py-3 px-4 text-orange-950">15,6 %</td>
                  <td className="py-3 px-4 text-orange-950">1.947 €</td>
                  <td className="py-3 px-4 font-bold text-orange-950">1.947 €</td>
                  <td className="py-3 px-4 font-bold text-orange-950">1.669 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">23.364 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold">40.000 €</td>
                  <td className="py-3 px-4 text-slate-600">19,8 %</td>
                  <td className="py-3 px-4 text-slate-600">2.596 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">2.457 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">2.106 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">29.484 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold">50.000 €</td>
                  <td className="py-3 px-4 text-slate-600">23,1 %</td>
                  <td className="py-3 px-4 text-slate-600">3.245 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">2.934 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">2.515 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">35.205 €</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold">60.000 €</td>
                  <td className="py-3 px-4 text-slate-600">25,8 %</td>
                  <td className="py-3 px-4 text-slate-600">3.894 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">3.385 €</td>
                  <td className="py-3 px-4 font-bold text-slate-900">2.901 €</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">40.626 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Statutory Editorial Guide */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              ¿Cómo se calcula el salario neto a partir del bruto en España?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              El salario neto es la cantidad líquida de dinero que la empresa ingresa en tu cuenta bancaria cada mes tras aplicar dos deducciones obligatorias impuestas por la legislación española: las <strong>cotizaciones a la Seguridad Social a cargo del trabajador</strong> y las <strong>retenciones a cuenta del IRPF</strong> (Impuesto sobre la Renta de las Personas Físicas).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                1. Cotizaciones a la Seguridad Social (6,49%)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aparecen desglosadas al pie de tu nómina y se calculan sobre la base de cotización de contingencias comunes:
              </p>
              <ul className="text-xs text-slate-700 space-y-1 font-mono">
                <li>• <strong>Contingencias Comunes:</strong> 4,70 %</li>
                <li>• <strong>Desempleo:</strong> 1,55 % (contrato indefinido) o 1,60 % (temporal)</li>
                <li>• <strong>Formación Profesional:</strong> 0,10 %</li>
                <li>• <strong>MEI (Mecanismo de Equidad Intergeneracional):</strong> 0,14 %</li>
                <li className="pt-1 text-slate-900 font-bold border-t border-slate-200">
                  Total deducción Seguridad Social: 6,49 %
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-600" />
                2. Retención de IRPF y Tramos Progresivos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                El IRPF es un impuesto progresivo estatal y autonómico. Cuanto más ganas, mayor es el porcentaje que abonas, pero únicamente sobre el tramo de dinero que supera cada escalón (no sobre la totalidad del sueldo).
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Antes de calcular el tipo de retención, Hacienda aplica la <strong>deducción general de 2.000 € por gastos de difícil justificación</strong> (Art. 19 LIRPF) y el <strong>mínimo personal y familiar exento</strong> (5.550 € para solteros, ampliado por hijos o ascendientes a cargo).
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              ¿Cobrar en 12 o 14 pagas cambia el total que ingresas?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Rotundamente no.</strong> Tu salario bruto anual pactado en el contrato de trabajo es idéntico en ambos modelos. En un contrato de 12 pagas, las dos pagas extraordinarias (verano y Navidad) se encuentran prorrateadas mensualmente, aumentando tu nómina ordinaria. En 14 pagas, recibes 12 mensualidades ordinarias más dos pagas completas adicionales en los meses de junio y diciembre. Al finalizar el año, habrás ingresado exactamente la misma cantidad neta en tu cuenta bancaria.
            </p>
          </div>
        </section>

        {/* Semantic Topic Cluster Internal Linking */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-bold">
              Ecosistema Laboral y Financiero España 2026
            </span>
            <h2 className="text-lg font-bold">Herramientas complementarias para tu nómina y economía</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <Link
              href="/es/calculadora-irpf-autonomos"
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/60 block space-y-1"
            >
              <span className="font-bold text-xs text-orange-400 block">Autónomos vs Asalariados</span>
              <span className="text-[11px] text-slate-300 block">Calcula las cuotas del RETA e IRPF trimestral</span>
            </Link>
            <Link
              href="/es/calculadora-finiquito-despido"
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/60 block space-y-1"
            >
              <span className="font-bold text-xs text-orange-400 block">Finiquito e Indemnización</span>
              <span className="text-[11px] text-slate-300 block">Simula tu liquidación y 33 días por año</span>
            </Link>
            <Link
              href="/es/calculador-horas-extras"
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/60 block space-y-1"
            >
              <span className="font-bold text-xs text-orange-400 block">Horas Extraordinarias</span>
              <span className="text-[11px] text-slate-300 block">Calcula el recargo del 75% o festivo</span>
            </Link>
            <Link
              href="/es/calculadora-hipoteca-euribor"
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/60 block space-y-1"
            >
              <span className="font-bold text-xs text-orange-400 block">Capacidad Hipotecaria</span>
              <span className="text-[11px] text-slate-300 block">Comprueba si tu cuota supera el 35% neto</span>
            </Link>
          </div>
        </div>

        {/* Comprehensive Fan-Out FAQs */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre el Sueldo Neto y la Nómina en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales a las dudas más comunes sobre retenciones de IRPF, nóminas y cotizaciones.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                ¿Por qué mi retención de IRPF sube repentinamente en los últimos meses del año?
              </h3>
              <p className="leading-relaxed">
                Esto ocurre con frecuencia cuando un trabajador cambia de contrato, recibe una subida salarial o cobra horas extras a mitad de año. Si el departamento de Recursos Humanos aplicó un porcentaje de retención demasiado bajo durante los primeros meses, la normativa tributaria obliga a regularizar el tipo en el último trimestre para que al terminar el año natural se haya retenido la cantidad legal exacta, provocando una reducción temporal del sueldo neto en noviembre y diciembre.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                ¿Qué es el Mecanismo de Equidad Intergeneracional (MEI)?
              </h3>
              <p className="leading-relaxed">
                El MEI es una cotización finalista creada por el Ministerio de Inclusión y Seguridad Social destinada a nutrir la «hucha de las pensiones» frente a la jubilación de la generación del baby boom. En 2026, la cotización total del MEI es del 0,70%, de la cual el <strong>0,56% corre a cargo de la empresa</strong> y el <strong>0,14% a cargo del trabajador</strong>.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                ¿Por qué mi compañero con el mismo sueldo bruto cobra más neto que yo?
              </h3>
              <p className="leading-relaxed">
                El tipo de retención del IRPF no es idéntico para todos los trabajadores con el mismo salario. La Agencia Tributaria tiene en cuenta tus circunstancias personales mediante el Modelo 145: tener hijos a cargo, familiares dependientes o personas mayores de 65 años bajo tutela, grados de discapacidad o estar pagando pensiones compensatorias a excónyuges reduce el porcentaje de retención y aumenta tu salario neto mensual.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                ¿Cuál es el salario mínimo interprofesional (SMI) neto en España en 2026?
              </h3>
              <p className="leading-relaxed">
                El SMI fijado por el Gobierno se sitúa en 1.184 € brutos mensuales en 14 pagas (16.576 € brutos anuales). Al encontrarse dentro de los límites exentos de tributación por rendimientos del trabajo, a los perceptores del SMI no se les aplica retención de IRPF, por lo que únicamente se les descuenta el 6,49% de Seguridad Social, resultando en un sueldo neto aproximado de 1.107 € limpios al mes en 14 pagas (o 1.291 € en 12 pagas).
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                ¿Qué comunidad autónoma tiene el IRPF más bajo y cuál el más alto?
              </h3>
              <p className="leading-relaxed">
                La Comunidad de Madrid cuenta con la escala autonómica del IRPF más baja de España en casi todos los tramos salariales, lo que se traduce en retenciones menores y un salario neto ligeramente superior. En el extremo opuesto, comunidades como Cataluña, la Comunidad Valenciana o Asturias aplican tipos marginales más elevados en los tramos intermedios y altos.
              </p>
            </div>
          </div>
        </section>

        {/* E-E-A-T Authority Declaration */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Validación Regulatoria:</strong> Ley 35/2006 del IRPF, Real Decreto Legislativo 8/2015 de la Seguridad Social y tablas oficiales de retenciones del Ministerio de Hacienda y Función Pública vigentes en 2026.
            </span>
          </div>
          <a
            href="https://sede.agenciatributaria.gob.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-700 font-bold hover:underline shrink-0"
          >
            <span>Sede Agencia Tributaria</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
