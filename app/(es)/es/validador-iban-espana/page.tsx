import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SpainIbanEngine } from '@/components/international/SpainIbanEngine';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, Landmark, CreditCard, Lock } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Validador IBAN España Gratis : Comprobar Banco y Cuenta | Kagazo',
  description:
    'Valida gratis cualquier número de cuenta e IBAN español (código ES de 24 caracteres). Identifica el banco (Santander, BBVA, CaixaBank) y comprueba los dígitos de control Módulo 97-10 y CCC.',
  keywords: [
    'validador iban espana online gratis',
    'comprobar numero de cuenta corriente banco de espana',
    'saber banco por iban espana 4 digitos entidad',
    'algoritmo modulo 97 iban iso 13616',
    'digitos control ccc cuenta bancaria',
    'transferencias sepa codigo bic swift espana',
    'validador cuenta bancaria santander bbva caixabank',
    'estructura iban 24 caracteres espana',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/validador-iban-espana`,
    languages: {
      'es-ES': `${SITE_URL}/es/validador-iban-espana`,
      'es': `${SITE_URL}/es/validador-iban-espana`,
      'x-default': `${SITE_URL}/es/validador-iban-espana`,
    },
  },
  openGraph: {
    title: 'Validador IBAN España Gratis : Comprobar Banco y Cuenta',
    description:
      'Valida números de cuenta bancaria e IBAN de España con identificación inmediata de la entidad bancaria y validación de dígitos de control.',
    url: `${SITE_URL}/es/validador-iban-espana`,
    locale: 'es_ES',
    siteName: 'Kagazo España',
    type: 'website',
  },
};

export default function SpainIbanPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Validador de IBAN y Cuentas Bancarias de España',
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
          'Comprobador matemático de códigos IBAN españoles según el estándar ISO 13616 y el algoritmo Módulo 97-10 con resolución de registros de entidades del Banco de España.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Validación de Cuenta Bancaria SEPA',
        category: 'BankingValidationService',
        provider: {
          '@type': 'Organization',
          name: 'Kagazo España',
          url: SITE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${SITE_URL}/es`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Trámites e Identidad',
            item: `${SITE_URL}/es#tramites-identidad`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Validador IBAN España',
            item: `${SITE_URL}/es/validador-iban-espana`,
          },
        ],
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
          <Link href="/es#tramites-identidad" className="hover:text-slate-900 transition-colors">
            Trámites e Identidad
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Validador IBAN España</span>
        </nav>

        {/* Header Hero Area */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Estándar Internacional ISO 13616 & Registro Oficial de Entidades Banco de España</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Validador de IBAN y Cuentas Bancarias de España
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Verifica al instante la exactitud de cualquier IBAN o cuenta bancaria española de 24 caracteres antes de emitir una factura, realizar una transferencia SEPA o domiciliar pagos. Identifica el nombre de la entidad bancaria y previene devoluciones bancarias con coste.
          </p>
        </div>

        {/* Direct Answer Capsule for AI Overviews & Featured Snippets */}
        <div className="bg-orange-50/70 border-l-4 border-orange-600 p-5 rounded-r-2xl text-slate-900 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Respuesta Rápida : ¿Cómo está estructurado el código IBAN en España?</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800">
            El IBAN español consta de exactamente <strong>24 caracteres alfanuméricos</strong>: las dos letras del país (<strong>ES</strong>), dos dígitos de control internacional (Módulo 97-10) y los <strong>20 dígitos del Código Cuenta Cliente (CCC)</strong> tradicional. Los 4 primeros números identifican la <strong>entidad bancaria</strong> (p. ej. 0049 para Santander, 2100 para CaixaBank, 0182 para BBVA), seguidos de 4 dígitos de sucursal, 2 dígitos de control nacional y 10 dígitos del número de cuenta.
          </p>
        </div>

        {/* Interactive Engine */}
        <SpainIbanEngine />

        {/* Reference Worked Calculation Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla de Códigos de Entidades Bancarias de España (Banco de España)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Principales entidades bancarias operativas en el sistema financiero español y sus identificadores numéricos oficiales de 4 cifras.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-bold">Código Banco</th>
                  <th className="py-3.5 px-4 font-bold">Nombre de la Entidad Bancaria</th>
                  <th className="py-3.5 px-4 font-bold">Código BIC / SWIFT</th>
                  <th className="py-3.5 px-4 font-bold text-orange-700">Ejemplo Inicio IBAN</th>
                  <th className="py-3.5 px-4 font-bold text-slate-600">Sede Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-orange-600">0049</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Banco Santander</td>
                  <td className="py-3 px-4">BSCHESMMXXX</td>
                  <td className="py-3 px-4 font-bold">ESXX 0049 ...</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Madrid</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-orange-600">0182</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">BBVA (Banco Bilbao Vizcaya Argentaria)</td>
                  <td className="py-3 px-4">BBVAESMMXXX</td>
                  <td className="py-3 px-4 font-bold">ESXX 0182 ...</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Bilbao / Madrid</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-orange-50/30">
                  <td className="py-3 px-4 font-bold text-orange-600">2100</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">CaixaBank (incluye antigua Bankia 2038)</td>
                  <td className="py-3 px-4">CAIXESBBXXX</td>
                  <td className="py-3 px-4 font-bold">ESXX 2100 ...</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Valencia</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-orange-600">0081</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Banco Sabadell</td>
                  <td className="py-3 px-4">BSABESBBXXX</td>
                  <td className="py-3 px-4 font-bold">ESXX 0081 ...</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Alicante</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-orange-600">0128</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Bankinter</td>
                  <td className="py-3 px-4">BKBKESMMXXX</td>
                  <td className="py-3 px-4 font-bold">ESXX 0128 ...</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Madrid</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-orange-600">2103</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">Unicaja Banco (incluye Liberbank 2048)</td>
                  <td className="py-3 px-4">UCJAES2MXXX</td>
                  <td className="py-3 px-4 font-bold">ESXX 2103 ...</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Málaga</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-orange-600">1465</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">ING Bank Sucursal en España</td>
                  <td className="py-3 px-4">INGDESMMXXX</td>
                  <td className="py-3 px-4 font-bold">ESXX 1465 ...</td>
                  <td className="py-3 px-4 font-sans text-slate-600">Madrid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Statutory & Editorial Content */}
        <section className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Anatomía Técnica del IBAN y Algoritmo Módulo 97-10 (ISO 13616)
            </h2>
            <p>
              El código <strong>IBAN (International Bank Account Number)</strong> fue introducido por la Unión Europea para estandarizar las transferencias transfronterizas dentro de la <strong>Zona Única de Pagos en Euros (SEPA)</strong>. En España tiene una longitud invariable de 24 caracteres:
            </p>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1">
              <p className="font-bold text-slate-900 font-sans">Desglose de los 24 Caracteres del IBAN Español:</p>
              <p><span className="text-orange-600 font-bold">ES</span> (País: España) + <span className="text-blue-600 font-bold">NN</span> (Dígitos control IBAN) + <span className="text-emerald-600 font-bold">EEEE</span> (4 dígitos Banco) + <span className="text-purple-600 font-bold">SSSS</span> (4 dígitos Sucursal) + <span className="text-amber-600 font-bold">DC</span> (2 dígitos control CCC) + <span className="text-slate-900 font-bold">CCCCCCCCCC</span> (10 dígitos Número de Cuenta)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Calculator className="w-5 h-5 text-orange-600 shrink-0" />
                <h3>Cómo se Calculan los Dígitos de Control (MOD 97)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Para verificar el IBAN se aplica la norma internacional ISO 7064 (Módulo 97-10):
              </p>
              <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                <li>Se toman los 4 primeros caracteres (ESNN) y se trasladan al final de la cadena de 24 dígitos.</li>
                <li>Se convierten las letras a números (A=10, B=11... E=14, S=28).</li>
                <li>Se calcula el resto de dividir ese número gigante entre 97. El resultado debe ser <strong>exactamente 1</strong> para que el IBAN sea matemáticamente válido.</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3>Seguridad y Privacidad Absoluta</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nuestra herramienta efectúa la validación algorítmica de forma 100% local en tu navegador mediante código JavaScript. Ningún número de cuenta bancaria viaja por la red ni se envía a servidores de terceros, respetando las más estrictas exigencias de confidencialidad y el Reglamento General de Protección de Datos (RGPD).
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Preguntas Frecuentes sobre el IBAN y Cuentas Bancarias en España
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Respuestas oficiales fundadas en la normativa del Banco de España y el Comité Europeo de Normalización Bancaria.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué diferencia hay entre el código IBAN y el código BIC / SWIFT?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                El <strong>IBAN</strong> identifica de forma unívoca una cuenta bancaria concreta dentro de cualquier entidad financiera en el espacio SEPA. El <strong>BIC (Bank Identifier Code) o SWIFT</strong> es un código internacional de 8 u 11 caracteres que identifica a la entidad bancaria en transferencias globales fuera del área SEPA. Desde 2016, para transferencias en euros dentro de España o la Unión Europea, ya no es obligatorio indicar el BIC; basta con el IBAN.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué ocurre si hago una transferencia a un IBAN erróneo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Gracias a los dos dígitos de control matemático, si cometes una errata al teclear un número del IBAN, la banca electrónica rechazará la orden automáticamente al no cuadrar el algoritmo Módulo 97. Si por coincidencia matemática el IBAN falso existiese y correspondiese a otra persona, la transferencia se ejecutará y deberás solicitar a tu banco una petición de retrocesión de fondos.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Puedo saber el saldo o el titular de una cuenta con su IBAN?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                No. Por la Ley de Secreto Bancario y la normativa de protección de datos, ningún particular puede conocer el saldo ni la identidad del titular de una cuenta ajena a través de su IBAN. Nuestro validador únicamente identifica la entidad bancaria a la que pertenece la cuenta y verifica su coherencia algorítmica.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Qué son las transferencias SEPA instantáneas?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Son transferencias bancarias en euros que se abonan en la cuenta de destino en <strong>menos de 10 segundos</strong>, disponibles las 24 horas del día durante los 365 días del año. La normativa de la Unión Europea obliga a todos los bancos de la eurozona a ofrecer transferencias inmediatas al mismo precio que las transferencias ordinarias estándar.
              </p>
            </div>

            <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                ¿Por qué una cuenta de Bankia ahora pertenece a CaixaBank?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Tras las fusiones y absorciones bancarias en España, los números de entidad se integran en el banco absorbente. Por ejemplo, las cuentas de Bankia (código 2038) y Banco de Valencia (código 0093) se integraron tecnológicamente en CaixaBank (código 2100). Aunque los IBAN antiguos siguen funcionando por redireccionamiento automático, la entidad asigna formalmente la numeración actualizada.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Topic Cluster Cross-Links */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Herramientas de Facturación, Impuestos e Identidad
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Gestiona tus cobros, facturación y operaciones administrativas oficiales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/es/generador-factura-pdf"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Facturas</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Generador Factura PDF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Incluye tu IBAN bancario verificado en facturas profesionales conformes a Hacienda.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Crear factura</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/validador-dni-nie-cif"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Identidad Fiscal</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Validador DNI / CIF
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Verifica el NIF o CIF del titular o deudor para evitar devoluciones de recibos SEPA.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Validar documento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-sueldo-neto"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Transferencia Nómina</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Sueldo Neto
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprueba el importe neto exacto que debe transferirse a tu cuenta cada mes.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Calcular nómina</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/es/calculadora-irpf-autonomos"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Domiciliación RETA</span>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  Calculadora Autónomos
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Asegura que tu cuenta tiene saldo suficiente para la cuota mensual de la Seguridad Social.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Ver cuota RETA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* E-E-A-T Official Regulatory Gazette Citation */}
        <footer className="text-xs text-slate-500 border-t border-slate-200 pt-6 space-y-2">
          <p className="flex items-center gap-1.5 font-medium text-slate-600">
            <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
            <span>Marco Legal Oficial y Fuentes Estatutarias:</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1 text-[11px] sm:text-xs">
            <li>
              <strong>Norma Internacional ISO 13616:</strong> Banking and related financial services - International bank account number (IBAN).
            </li>
            <li>
              <strong>Banco de España:</strong> Registro oficial de entidades de crédito y códigos identificadores bancarios nacionales.
            </li>
            <li>
              <strong>Reglamento (UE) 260/2012:</strong> Por el que se establecen requisitos técnicos y empresariales para las transferencias y los adeudos domiciliados en euros (Zona SEPA).
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
