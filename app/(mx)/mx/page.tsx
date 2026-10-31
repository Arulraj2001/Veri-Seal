import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calculator,
  Home,
  FileText,
  Percent,
  Coins,
  Scale,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Landmark,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Calculadoras Oficiales México 2026 | Sueldo Neto LFT, SAT RESICO, Infonavit y CURP',
  description:
    'Suite legal y fiscal oficial para México 2026: Calculadora de Sueldo Neto IMSS/ISR, Finiquito y Liquidación LFT, Aguinaldo Art. 87, RESICO SAT, Puntos Infonavit T1000 y Validador CURP/RFC.',
  alternates: {
    canonical: `${SITE_URL}/mx`,
  },
};

export default function MexicoHubPage() {
  const categories = [
    {
      id: 'laboral-nomina',
      title: '1. Laboral & Nómina LFT (Ley Federal del Trabajo)',
      description: 'Cálculos conforme a la LFT reformada 2026, cuotas obreras del IMSS, tablas ISR del Art. 96 LISR y prestaciones de ley obligatorias.',
      icon: Briefcase,
      tools: [
        {
          title: 'Calculadora Sueldo Neto IMSS e ISR 2026',
          desc: 'Conversión precisa de sueldo bruto a neto mensual o quincenal con retención de ISR Art. 96, subsidio al empleo actualizado y cuotas obreras IMSS.',
          href: '/mx/calculadora-sueldo-neto-imss-isr',
          badge: 'Top 350k+',
        },
        {
          title: 'Calculadora Finiquito y Liquidación por Despido',
          desc: 'Artículos 47, 48 y 50 LFT: 3 meses de salario constitucional, 20 días por año, prima de antigüedad Art. 162 y partes proporcionales de aguinaldo y vacaciones.',
          href: '/mx/calculadora-finiquito-liquidacion-despido',
          badge: 'Art. 50 LFT',
        },
        {
          title: 'Calculadora de Aguinaldo Legal LFT (Art. 87)',
          desc: 'Cálculo estatutario obligatorio de 15 días mínimos de salario base o SDI, cálculo proporcional por días trabajados y desglose de exención fiscal de 30 UMAs.',
          href: '/mx/calculadora-aguinaldo-ley-federal-trabajo',
          badge: 'Art. 87 LFT',
        },
        {
          title: 'Vacaciones Dignas y Prima Vacacional 2026',
          desc: 'Tabla legal reformada de vacaciones (Art. 76 LFT: 12 a 32+ días laborales), prima vacacional obligatoria del 25% (Art. 80 LFT) y exención ISR de 15 UMAs.',
          href: '/mx/calculadora-vacaciones-dignas-prima-vacacional',
          badge: 'Reforma 2026',
        },
        {
          title: 'Calculadora de Horas Extras LFT (Dobles y Triples)',
          desc: 'Artículos 66 a 68 LFT: primeras 9 horas semanales al 100% de recargo (dobles), excedentes al 200% (triples) y exención de ISR hasta 5 UMAs semanales.',
          href: '/mx/calculadora-horas-extras-lft',
          badge: 'Art. 68 LFT',
        },
      ],
    },
    {
      id: 'fiscal-sat',
      title: '2. Fiscal & SAT (Servicio de Administración Tributaria)',
      description: 'Herramientas de optimización tributaria: RESICO personas físicas, retenciones de honorarios, deducciones personales y validación CFDI 4.0.',
      icon: Building2,
      tools: [
        {
          title: 'Calculadora RESICO Personas Físicas 2026',
          desc: 'Régimen Simplificado de Confianza (Art. 113-E LISR): tasas progresivas marginales del 1.0% al 2.5% sobre ingresos brutos hasta 3.5 millones de pesos anuales.',
          href: '/mx/calculadora-resico-personas-fisicas',
          badge: '1.0% - 2.5%',
        },
        {
          title: 'Retención de ISR e IVA por Honorarios Profesionales',
          desc: 'Recibos de honorarios a personas morales: retención del 10% de ISR (Art. 106 LISR) y retención de dos terceras partes del IVA (10.6667% Art. 1-A LIVA).',
          href: '/mx/calculadora-honorarios-retencion-isr-iva',
          badge: 'Art. 106 LISR',
        },
        {
          title: 'Deducciones Personales Declaración Anual LISR',
          desc: 'Art. 151 LISR: tope global (menor entre 5 UMAs anuales o 15% del ingreso), desglose de gastos médicos, colegiaturas decretadas, créditos hipotecarios y AFORE.',
          href: '/mx/calculadora-deducciones-personales-declaracion-anual',
          badge: 'Art. 151',
        },
        {
          title: 'Validador de Factura Electrónica CFDI 4.0 SAT',
          desc: 'Anexo 20 RMF: verificación de RFC, Razón Social sin régimen de capital en mayúsculas, Código Postal del domicilio fiscal del receptor y Régimen Fiscal.',
          href: '/mx/validador-emisor-cfdi-4-0-sat',
          badge: 'Anexo 20 RMF',
        },
        {
          title: 'Amortización de Pérdidas Fiscales SAT (Art. 57 LISR)',
          desc: 'Actualización estatutaria con factores INPC publicados por INEGI, amortización contra utilidades fiscales y control del plazo legal de caducidad de 10 años.',
          href: '/mx/amortizacion-perdidas-fiscales-sat',
          badge: 'Art. 57 LISR',
        },
      ],
    },
    {
      id: 'credito-infonavit',
      title: '3. Crédito & Vivienda Infonavit',
      description: 'Simuladores habitacionales oficiales: modelo T1000 del Infonavit, tablas en Pesos vs UMA, gastos notariales, ISAI e inflación de rentas INPC.',
      icon: Home,
      tools: [
        {
          title: 'Calculadora Puntos Infonavit Modelo T1000',
          desc: 'Evaluación del umbral legal de 1,080 puntos: edad, salario diario integrado, saldo de la Subcuenta de Vivienda, bimestres cotizados continuos y empresa.',
          href: '/mx/calculadora-puntos-infonavit-t1000',
          badge: '1,080 Puntos',
        },
        {
          title: 'Tabla de Amortización Crédito Infonavit (Pesos vs UMA)',
          desc: 'Simulación comparativa en Pesos a tasa fija (1.91% a 10.45%) vs esquema en Veces Salario Mínimo / UMA, con aportación patronal obligatoria del 5% al capital.',
          href: '/mx/tabla-amortizacion-credito-infonavit',
          badge: 'Pesos / UMA',
        },
        {
          title: 'Gastos Notariales e ISAI Escrituración Inmobiliaria',
          desc: 'Impuesto Sobre Adquisición de Inmuebles (ISAI / Traslado de Dominio: 1.5% a 5.5% según estado), honorarios del Colegio de Notarios y derechos registrales RPP.',
          href: '/mx/calculadora-gastos-notariales-isai-escrituracion',
          badge: 'ISAI 2026',
        },
        {
          title: 'Reajuste de Renta por Inflación INPC Arrendamiento',
          desc: 'Art. 2448 Código Civil Federal: cálculo del incremento anual del canon de arrendamiento mediante el Índice Nacional de Precios al Consumidor (INEGI).',
          href: '/mx/reajuste-renta-inpc-arrendamiento',
          badge: 'INPC INEGI',
        },
        {
          title: 'Rendimiento Neto Arrendamiento SAT (Deducción Ciega)',
          desc: 'Art. 115 LISR: comparación entre la deducción opcional ciega del 35% más predial frente a gastos comprobados y depreciación fiscal del 5% del inmueble.',
          href: '/mx/calculadora-rendimiento-neto-arrendamiento-sat',
          badge: 'Art. 115 LISR',
        },
      ],
    },
    {
      id: 'tramites-identidad',
      title: '4. Trámites, Identidad & Legal',
      description: 'Validadores algorítmicos oficiales, fotografía biométrica de pasaporte SRE y herramientas de optimización documental gubernamental.',
      icon: FileText,
      tools: [
        {
          title: 'Validador y Generador de CURP Oficial RENAPO',
          desc: 'Algoritmo de 18 caracteres de la Clave Única de Registro de Población: verificación de dígito verificador módulo 10, consonantes internas y validación de homoclave.',
          href: '/mx/validador-generador-curp-oficial',
          badge: 'RENAPO',
        },
        {
          title: 'Validador RFC SAT con Homoclave (Módulo 11)',
          desc: 'Validación de personas físicas (13 caracteres) y personas morales (12 caracteres) con verificación del dígito de control del SAT y consistencia de fecha de nacimiento.',
          href: '/mx/validador-rfc-sat-homoclave',
          badge: 'SAT Oficial',
        },
        {
          title: 'Foto Infantil y Pasaporte Mexicano SRE (35×45 mm)',
          desc: 'Generador de plantillas fotográficas con estándares oficiales de la SRE y trámites SEP: tamaño infantil (2.5x3.0 cm) y pasaporte/visa (3.5x4.5 cm a 300 DPI) para imprimir.',
          href: '/mx/foto-infantil-pasaporte-mexicano-sre',
          badge: 'SRE / SEP',
        },
        {
          title: 'Compresor PDF para Buzón Tributario SAT (< 4 MB)',
          desc: 'Optimización de archivos PDF para portales gubernamentales (SAT Buzón Tributario, IMSS Desde Su Empresa - IDSE, SIPARE). 100% en tu navegador con privacidad total.',
          href: '/mx/compresor-pdf-buzon-tributario-sat',
          badge: '< 4 MB',
        },
        {
          title: 'Convertidor Números a Letras Pesos M.N. (Cheques y Contratos)',
          desc: 'Conversión legal a formato bancario oficial "X pesos XX/100 M.N." conforme a la Ley General de Títulos y Operaciones de Crédito para pagarés, contratos y cheques.',
          href: '/mx/convertidor-numeros-a-letras-pesos-moneda-nacional',
          badge: 'Ley Títulos',
        },
      ],
    },
  ];

  // Schema.org ItemList for Rich Search Engine Snippets
  const hubJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Herramientas Oficiales Estatutarias de México 2026 - Kagazo',
    description: 'Suite legal, fiscal y laboral con 20 simuladores interactivos para trabajadores, profesionistas y empresas en México.',
    numberOfItems: 20,
    itemListElement: categories.flatMap((cat, catIdx) =>
      cat.tools.map((tool, toolIdx) => ({
        '@type': 'ListItem',
        position: catIdx * 5 + toolIdx + 1,
        name: tool.title,
        url: `${SITE_URL}${tool.href}`,
        description: tool.desc,
      }))
    ),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/10 text-emerald-800 border border-emerald-700/20 text-xs font-bold tracking-wide">
          <span>🇲🇽</span>
          <span>Portal Estatutario México 2026</span>
          <span className="text-emerald-700">&bull;</span>
          <span className="font-mono">20 Herramientas Oficiales</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Calculadoras y Trámites Oficiales de México 2026
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
          Suite digital de alta precisión jurídica y tributaria conforme a la Ley Federal del Trabajo (LFT), Código Fiscal de la Federación (CFF), tablas de ISR del SAT, modelo T1000 de Infonavit y algoritmos oficiales de RENAPO. Ejecución 100% en tu navegador: privacidad absoluta sin envío de datos fiscales a servidores externos.
        </p>

        {/* Quick Nav Anchors */}
        <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-emerald-800 hover:border-emerald-700 transition-colors shadow-2xs"
            >
              {cat.title.split('.')[1].trim()}
            </a>
          ))}
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="space-y-12">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <section key={category.id} id={category.id} className="space-y-6">
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-700 text-white shadow-xs">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  5 Herramientas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col justify-between transition-all duration-200 hover:border-emerald-700/50"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {tool.badge}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                      <span>Abrir Herramienta</span>
                      <span className="text-[11px] text-slate-400 font-normal">Vigente 2026</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Statutory E-E-A-T Guarantee Card */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Transparencia Estatutaria y Privacidad Absoluta para México
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Todas las operaciones matemáticas, desgloses de retención IMSS/ISR, simulaciones de amortización Infonavit y compresión de archivos PDF se procesan de manera local y confidencial en el navegador de tu computadora o teléfono móvil mediante JavaScript del lado del cliente. Ningún salario, valor de propiedad, CURP, RFC o documento oficial se envía ni se almacena jamás en servidores externos.
        </p>
      </div>
    </div>
  );
}

