'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { KagazoLogo } from '@/components/ui/KagazoLogo';
import {
  ChevronDown,
  Menu,
  X,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Calculator,
  Building2,
  Home,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type CountryCode = 'es' | 'de' | 'fr' | 'it' | 'br' | 'uk';

interface ToolItem {
  title: string;
  href: string;
  badge?: string;
}

interface PillarGroup {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: ToolItem[];
}

interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  portalTitle: string;
  badgeText: string;
  accentClass: string;
  accentBg: string;
  accentText: string;
  accentHoverBg: string;
  accentBorder: string;
  activePillBg: string;
  hubHref: string;
  hubButtonLabel: string;
  allToolsLabel: string;
  pillars: PillarGroup[];
}

const COUNTRY_CONFIGS: Record<CountryCode, CountryConfig> = {
  es: {
    code: 'es',
    name: 'España',
    flag: '🇪🇸',
    portalTitle: 'Portal Laboral, Fiscal e Hipotecario 2026',
    badgeText: 'España',
    accentClass: 'orange',
    accentBg: 'bg-orange-600',
    accentText: 'text-orange-700',
    accentHoverBg: 'hover:bg-orange-50',
    accentBorder: 'border-orange-500/30',
    activePillBg: 'bg-orange-600 text-white',
    hubHref: '/es',
    hubButtonLabel: 'Portada España',
    allToolsLabel: 'Todas las 20 Herramientas',
    pillars: [
      {
        name: 'Laboral y Salarios',
        icon: Calculator,
        tools: [
          { title: 'Calculadora Sueldo Neto 2026', href: '/es/calculadora-sueldo-neto', badge: 'Top' },
          { title: 'Calculadora IRPF Autónomos', href: '/es/calculadora-irpf-autonomos' },
          { title: 'Finiquito e Indemnización', href: '/es/calculadora-finiquito-despido' },
          { title: 'Jubilación y Pensión', href: '/es/calculadora-jubilacion-pension' },
          { title: 'Horas Extras y Recargos', href: '/es/calculador-horas-extras' },
        ],
      },
      {
        name: 'Vivienda e Hipotecas',
        icon: Home,
        tools: [
          { title: 'Hipoteca Euríbor 2026', href: '/es/calculadora-hipoteca-euribor', badge: 'Popular' },
          { title: 'ITP y Gastos Compraventa', href: '/es/calculadora-itp-gastos-compraventa' },
          { title: 'Plusvalía Municipal IIVTNU', href: '/es/calculadora-plusvalia-municipal' },
          { title: 'Actualizador Alquiler IPC', href: '/es/actualizador-alquiler-ipc' },
          { title: 'Rentabilidad Alquiler Neta', href: '/es/simulador-rentabilidad-alquiler' },
        ],
      },
      {
        name: 'Trámites y Sede',
        icon: FileText,
        tools: [
          { title: 'Validador DNI / NIE / CIF', href: '/es/validador-dni-nie-cif' },
          { title: 'Generador Factura PDF', href: '/es/generador-factura-pdf', badge: 'Gratis' },
          { title: 'Foto Carnet DNI (32×26mm)', href: '/es/foto-carnet-dni-pasaporte' },
          { title: 'Validador IBAN España', href: '/es/validador-iban-espana' },
          { title: 'Compresor PDF Sede (< 2MB)', href: '/es/compresor-pdf-sede-electronica' },
        ],
      },
      {
        name: 'Fiscal y Utilidades',
        icon: Building2,
        tools: [
          { title: 'IVA Trimestral (Mod. 303)', href: '/es/calculadora-iva-trimestral' },
          { title: 'Precio Gasolina y Trayecto', href: '/es/calculadora-precio-gasolina-viaje' },
          { title: 'Días Hábiles vs Naturales', href: '/es/calculadora-dias-habiles' },
          { title: 'Contador Palabras y Letras', href: '/es/contador-palabras-caracteres' },
          { title: 'Descuentos y Rebajas', href: '/es/calculadora-descuentos-rebajas' },
        ],
      },
    ],
  },
  de: {
    code: 'de',
    name: 'Deutschland',
    flag: '🇩🇪',
    portalTitle: 'Portal für Steuern, Gehalt & Recht 2026',
    badgeText: 'Deutschland',
    accentClass: 'amber',
    accentBg: 'bg-amber-600',
    accentText: 'text-amber-700',
    accentHoverBg: 'hover:bg-amber-50',
    accentBorder: 'border-amber-500/30',
    activePillBg: 'bg-amber-600 text-white',
    hubHref: '/de',
    hubButtonLabel: 'Portal Deutschland',
    allToolsLabel: 'Alle 20 Rechner',
    pillars: [
      {
        name: 'Gehalt & Steuern',
        icon: Calculator,
        tools: [
          { title: 'Brutto-Netto-Rechner 2026', href: '/de/brutto-netto-rechner', badge: 'Top' },
          { title: 'Abfindungsrechner § 34 EStG', href: '/de/abfindungsrechner' },
          { title: 'Stundenlohnrechner', href: '/de/stundenlohnrechner' },
          { title: 'Firmenwagenrechner 1%', href: '/de/firmenwagenrechner' },
          { title: 'Kurzarbeitergeld (KUG)', href: '/de/kurzarbeitergeld-rechner' },
        ],
      },
      {
        name: 'Immobilien & Miete',
        icon: Home,
        tools: [
          { title: 'Notarkosten GNotKG', href: '/de/notar-und-grundbuchkostenrechner', badge: 'Beliebt' },
          { title: 'Grunderwerbsteuer-Rechner', href: '/de/grunderwerbsteuer-rechner' },
          { title: 'Kappungsgrenze § 558 BGB', href: '/de/mieterhoehung-kappungsgrenze-rechner' },
          { title: 'Baufinanzierung & Tilgung', href: '/de/baufinanzierung-tilgungsrechner' },
          { title: 'Mietkautionsrechner', href: '/de/mietkautionsrechner' },
        ],
      },
      {
        name: 'Behörden & Anträge',
        icon: FileText,
        tools: [
          { title: 'Kleinunternehmer Rechnung § 19', href: '/de/kleinunternehmer-rechnung', badge: 'PDF' },
          { title: 'Der Die Das Finder', href: '/de/der-die-das-finder' },
          { title: 'Biometrisches Passfoto', href: '/de/passfoto-generator-biometrisch' },
          { title: 'IBAN & BIC Prüfer', href: '/de/iban-pruefer-bic-finder' },
          { title: 'PDF Kompressor Behörden', href: '/de/pdf-kompressor-online-antraege' },
        ],
      },
      {
        name: 'Gewerbe & Alltag',
        icon: Building2,
        tools: [
          { title: 'Gewerbesteuerrechner GewStG', href: '/de/gewerbesteuerrechner' },
          { title: 'Skontorechner & Jahreszins', href: '/de/skontorechner' },
          { title: 'Bayerische Notenformel KMK', href: '/de/notenumrechner-bayerische-formel' },
          { title: 'Rabattrechner nach PAngV', href: '/de/rabatt-prozent-rechner' },
          { title: 'Spritkosten & Pendlerpauschale', href: '/de/spritkostenrechner-fahrtkosten' },
        ],
      },
    ],
  },
  fr: {
    code: 'fr',
    name: 'France',
    flag: '🇫🇷',
    portalTitle: 'Portail Social, Fiscal & Immobilier 2026',
    badgeText: 'France',
    accentClass: 'blue',
    accentBg: 'bg-blue-600',
    accentText: 'text-blue-700',
    accentHoverBg: 'hover:bg-blue-50',
    accentBorder: 'border-blue-500/30',
    activePillBg: 'bg-blue-600 text-white',
    hubHref: '/fr',
    hubButtonLabel: 'Accueil France',
    allToolsLabel: 'Tous les 20 Simulateurs',
    pillars: [
      {
        name: 'Travail & Salaires',
        icon: Calculator,
        tools: [
          { title: 'Salaire Brut en Net 2026', href: '/fr/calculateur-salaire-net-brut', badge: 'Top' },
          { title: 'Rupture Conventionnelle', href: '/fr/calculateur-indemnite-rupture' },
          { title: 'Charges URSSAF Micro', href: '/fr/simulateur-charges-urssaf' },
          { title: 'Heures Supplémentaires', href: '/fr/calculateur-heures-supplementaires' },
          { title: 'Prime Fin de CDD (10%)', href: '/fr/calculateur-indemnite-fin-cdd' },
        ],
      },
      {
        name: 'Entreprise & Coûts RH',
        icon: Building2,
        tools: [
          { title: 'Coût Embauche Superbrut', href: '/fr/simulateur-cout-embauche-employeur', badge: 'Pro' },
          { title: 'Heures en Décimales Paie', href: '/fr/calculateur-duree-travail-heures-decimales' },
          { title: 'Facture Auto-Entrepreneur', href: '/fr/facture-auto-entrepreneur' },
          { title: 'Validateur SIREN & SIRET', href: '/fr/validateur-siren-siret' },
          { title: 'Calculateur TVA 20% & 10%', href: '/fr/calculateur-tva-francaise' },
        ],
      },
      {
        name: 'Immobilier & Crédit',
        icon: Home,
        tools: [
          { title: 'Frais de Notaire Décret 2020', href: '/fr/calculateur-frais-de-notaire', badge: 'Populaire' },
          { title: 'Prêt Immobilier HCSF 35%', href: '/fr/simulateur-pret-immobilier-mensualite' },
          { title: 'Prêt à Taux Zéro PTZ 2026', href: '/fr/simulateur-pret-taux-zero-ptz' },
          { title: 'Plus-Value Immobilière', href: '/fr/simulateur-plus-value-immobiliere' },
          { title: 'Rendement Locatif Brut / Net', href: '/fr/calculateur-rendement-locatif' },
        ],
      },
      {
        name: 'Démarches & Quotidien',
        icon: FileText,
        tools: [
          { title: 'Photo d’Identité ANTS 35×45', href: '/fr/photo-identite-passeport-ants', badge: 'ANTS' },
          { title: 'Compresseur PDF (< 2 Mo)', href: '/fr/compresseur-pdf-france-travail' },
          { title: 'Chiffres en Lettres Chèque', href: '/fr/convertisseur-chiffre-en-lettre' },
          { title: 'Barème Kilométrique DGFiP', href: '/fr/simulateur-frais-kilometriques' },
          { title: 'Calculateur Soldes & Remises', href: '/fr/calculateur-remise-solde' },
        ],
      },
    ],
  },
  it: {
    code: 'it',
    name: 'Italia',
    flag: '🇮🇹',
    portalTitle: 'Portale Giuridico, Fiscale & Lavoro 2026',
    badgeText: 'Italia',
    accentClass: 'sky',
    accentBg: 'bg-sky-600',
    accentText: 'text-sky-700',
    accentHoverBg: 'hover:bg-sky-50',
    accentBorder: 'border-sky-500/30',
    activePillBg: 'bg-sky-600 text-white',
    hubHref: '/it',
    hubButtonLabel: 'Portale Italia',
    allToolsLabel: 'Tutti i 20 Calcolatori',
    pillars: [
      {
        name: 'Fisco & Lavoro',
        icon: Calculator,
        tools: [
          { title: 'Stipendio Netto 2026', href: '/it/calcolo-stipendio-netto', badge: 'Top' },
          { title: 'Calcolo TFR Fine Rapporto', href: '/it/calcolo-tfr-fine-rapporto' },
          { title: 'Fattura Forfettario 2026', href: '/it/fattura-regime-forfettario', badge: '5%/15%' },
          { title: 'Pensione Quota 103', href: '/it/calcolo-pensione-anticipata' },
          { title: 'Straordinari CCNL', href: '/it/calcolo-straordinari-lavoro' },
        ],
      },
      {
        name: 'Casa & Immobili',
        icon: Home,
        tools: [
          { title: 'Calcolo IMU e Modello F24', href: '/it/calcolo-imu-f24', badge: 'F24' },
          { title: 'Imposte Acquisto Prima Casa', href: '/it/calcolo-imposte-acquisto-casa' },
          { title: 'Adeguamento Affitto ISTAT', href: '/it/adeguamento-affitto-istat' },
          { title: 'Rendimento & Cedolare Secca', href: '/it/calcolo-rendimento-locativo-cedolare' },
          { title: 'Plusvalenza Cessione Immobile', href: '/it/calcolo-plusvalenza-immobiliare' },
        ],
      },
      {
        name: 'Previdenza & Finanza',
        icon: Building2,
        tools: [
          { title: 'Ravvedimento Operoso F24', href: '/it/calcolo-ravvedimento-operoso', badge: 'Fiscale' },
          { title: 'Verifica Partita IVA & CF', href: '/it/verifica-partita-iva-codice-fiscale' },
          { title: 'Interessi Legali e di Mora', href: '/it/calcolo-interessi-legali-mora' },
          { title: 'Giorni Lavorativi Festività', href: '/it/calcolo-giorni-lavorativi' },
          { title: 'Assegno Unico Figli INPS', href: '/it/calcolo-assegno-unico-inps' },
        ],
      },
      {
        name: 'Trámites & Documenti',
        icon: FileText,
        tools: [
          { title: 'Foto Tessera CIE 35×45 mm', href: '/it/foto-tessera-cie-passaporto', badge: 'CIE' },
          { title: 'Compressore PDF PA (< 2 MB)', href: '/it/compressore-pdf-pubblica-amministrazione' },
          { title: 'Validatore IBAN Bancario', href: '/it/validatore-iban-bancario-italia' },
          { title: 'Calcolo Bollo Auto Regione', href: '/it/calcolo-bollo-auto-regione' },
          { title: 'Numeri in Lettere Assegni', href: '/it/convertitore-numeri-in-lettere' },
        ],
      },
    ],
  },
  br: {
    code: 'br',
    name: 'Brasil',
    flag: '🇧🇷',
    portalTitle: 'Portal Trabalhista, Tributário & Imobiliário 2026',
    badgeText: 'Brasil',
    accentClass: 'emerald',
    accentBg: 'bg-emerald-600',
    accentText: 'text-emerald-700',
    accentHoverBg: 'hover:bg-emerald-50',
    accentBorder: 'border-emerald-500/30',
    activePillBg: 'bg-emerald-600 text-white',
    hubHref: '/br',
    hubButtonLabel: 'Portal Brasil',
    allToolsLabel: 'Todas as 20 Ferramentas',
    pillars: [
      {
        name: 'Trabalhista & CLT',
        icon: Calculator,
        tools: [
          { title: 'Salário Líquido CLT 2026', href: '/br/calculadora-salario-liquido-clt', badge: 'Top' },
          { title: 'Rescisão Contratual CLT', href: '/br/calculadora-rescisao-clt', badge: 'Art. 477' },
          { title: 'Férias & Abono Pecuniário', href: '/br/calculo-ferias-clt' },
          { title: 'Décimo Terceiro Salário (13º)', href: '/br/calculadora-decimo-terceiro' },
          { title: 'Horas Extras & Reflexo DSR', href: '/br/calculo-horas-extras-dsr' },
        ],
      },
      {
        name: 'Tributos & MEI',
        icon: Building2,
        tools: [
          { title: 'Calculadora DAS MEI 2026', href: '/br/calculadora-das-mei', badge: 'MEI' },
          { title: 'Simulador Carnê-Leão IRPF', href: '/br/calculadora-carne-leao' },
          { title: 'Alíquota Efetiva Simples', href: '/br/calculadora-simples-nacional', badge: 'Anexos' },
          { title: 'Retenção Impostos NF PJ', href: '/br/retencao-impostos-nota-fiscal' },
          { title: 'Reajuste Dissídio Salarial', href: '/br/calculadora-dissidio-salarial' },
        ],
      },
      {
        name: 'Imóveis & Financiamento',
        icon: Home,
        tools: [
          { title: 'Financiamento SAC vs Price', href: '/br/simulador-financiamento-sac-price', badge: 'Popular' },
          { title: 'Custos ITBI & Escritura', href: '/br/calculadora-itbi-escritura' },
          { title: 'Reajuste Aluguel IPCA / IGP-M', href: '/br/reajuste-aluguel-ipca-igpm' },
          { title: 'Amortização com FGTS', href: '/br/amortizacao-financiamento-fgts' },
          { title: 'Rendimento Locativo Líquido', href: '/br/calculadora-rendimento-aluguel-liquido' },
        ],
      },
      {
        name: 'Documentos & Cidadania',
        icon: FileText,
        tools: [
          { title: 'Validador CPF & CNPJ (Módulo 11)', href: '/br/validador-gerador-cpf-cnpj', badge: 'Receita' },
          { title: 'Foto 3×4 Documentos & CNH', href: '/br/foto-3x4-documentos-passaporte', badge: '3x4' },
          { title: 'Compressor PDF para PJe (< 3 MB)', href: '/br/compressor-pdf-pje-tribunais', badge: 'PJe' },
          { title: 'Prazos Processuais Dias Úteis', href: '/br/calculadora-prazos-processuais-cpc' },
          { title: 'Valor por Extenso para Recibos', href: '/br/valor-por-extenso-recibo' },
        ],
      },
    ],
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    portalTitle: 'UK Statutory Tax, HMRC & Property Suite 2026/27',
    badgeText: 'UK HMRC',
    accentClass: 'indigo',
    accentBg: 'bg-indigo-900',
    accentText: 'text-indigo-900',
    accentHoverBg: 'hover:bg-indigo-50',
    accentBorder: 'border-indigo-900/30',
    activePillBg: 'bg-indigo-900 text-white',
    hubHref: '/uk',
    hubButtonLabel: 'UK Suite Hub',
    allToolsLabel: 'All 20 Statutory Tools',
    pillars: [
      {
        name: 'HMRC & Payroll',
        icon: Calculator,
        tools: [
          { title: 'Take-Home Pay Salary Calculator 2026/27', href: '/uk/take-home-pay-salary-calculator', badge: 'HMRC' },
          { title: 'Stamp Duty (SDLT) Land Tax Calculator', href: '/uk/stamp-duty-sdlt-calculator', badge: 'SDLT' },
          { title: 'Statutory Redundancy Pay Calculator', href: '/uk/redundancy-pay-statutory-calculator' },
          { title: 'UK VAT & Domestic Reverse Charge', href: '/uk/vat-calculator-uk-reverse-charge' },
          { title: 'Statutory Maternity Pay (SMP) Estimator', href: '/uk/statutory-maternity-pay-smp-calculator' },
        ],
      },
      {
        name: 'Corporate & Self-Assessment',
        icon: Building2,
        tools: [
          { title: 'Self-Assessment Payment on Account', href: '/uk/self-assessment-payment-on-account-calculator', badge: 's.59A' },
          { title: 'Dividend Tax & Allowance Calculator', href: '/uk/dividend-tax-calculator' },
          { title: 'Corporation Tax & Marginal Relief', href: '/uk/corporation-tax-marginal-relief-calculator', badge: '19-25%' },
          { title: 'Capital Gains Tax (Property & Shares)', href: '/uk/capital-gains-tax-residential-shares-calculator' },
          { title: 'CIS Tax Deduction Calculator', href: '/uk/cis-deduction-calculator', badge: '20/30%' },
        ],
      },
      {
        name: 'Property & Landlord',
        icon: Home,
        tools: [
          { title: 'Section 24 Landlord Mortgage Relief', href: '/uk/section-24-landlord-mortgage-relief-calculator', badge: 'Sec 24' },
          { title: 'UK Rental Yield & Cap Rate Estimator', href: '/uk/rental-yield-cap-rate-calculator-uk' },
          { title: 'Mortgage Affordability PRA Stress Test', href: '/uk/mortgage-affordability-stress-test-calculator' },
          { title: 'Leasehold Extension & Marriage Value', href: '/uk/ground-rent-leasehold-extension-calculator' },
          { title: 'Inheritance Tax (NRB & RNRB) Estimator', href: '/uk/inheritance-tax-nrb-rnrb-calculator' },
        ],
      },
      {
        name: 'Compliance & Verification',
        icon: FileText,
        tools: [
          { title: 'HM Passport Photo Biometric Tool (35×45mm)', href: '/uk/uk-passport-photo-checker-generator', badge: 'ICAO' },
          { title: 'Sort Code & Account Modulus 11 Checker', href: '/uk/hmrc-modulus-11-sort-code-account-validator', badge: 'Bacs' },
          { title: 'UK VAT Number Modulo 97 Validator', href: '/uk/vat-number-validator-uk-gb', badge: 'HMRC' },
          { title: 'Companies House PDF Filing Compressor', href: '/uk/pdf-compressor-companies-house', badge: '< 4MB' },
          { title: 'Right to Work Share Code Checker', href: '/uk/right-to-work-share-code-expiry-calculator' },
        ],
      },
    ],
  },
};

export function InternationalHeader({ country }: { country: CountryCode }) {
  const pathname = usePathname();
  const config = COUNTRY_CONFIGS[country];
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  React.useEffect(() => {
    setMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [pathname]);

  const activePill =
    country === 'es'
      ? 'bg-orange-600 text-white'
      : country === 'de'
        ? 'bg-amber-600 text-white'
        : country === 'fr'
          ? 'bg-blue-600 text-white'
          : country === 'it'
            ? 'bg-sky-600 text-white'
            : country === 'br'
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-900 text-white';

  const hoverAccent =
    country === 'es'
      ? 'hover:text-orange-700 hover:bg-orange-50'
      : country === 'de'
        ? 'hover:text-amber-700 hover:bg-amber-50'
        : country === 'fr'
          ? 'hover:text-blue-700 hover:bg-blue-50'
          : country === 'it'
            ? 'hover:text-sky-700 hover:bg-sky-50'
            : country === 'br'
              ? 'hover:text-emerald-700 hover:bg-emerald-50'
              : 'hover:text-indigo-900 hover:bg-indigo-50';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Country Identification */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link href={config.hubHref} className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-slate-900 text-white shadow-xs group-hover:scale-105 transition-transform">
              <KagazoLogo className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-black tracking-tight text-lg sm:text-xl text-slate-950">
                  Kagazo
                </span>
                <span className={cn('text-[11px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md text-white font-mono shadow-2xs', config.accentBg)}>
                  {config.flag} {config.badgeText}
                </span>
              </div>
              <span className="text-[10px] text-slate-700 hidden sm:block font-medium">
                {config.portalTitle}
              </span>
            </div>
          </Link>

          {/* Quick link back to Global Hub */}
          <Link
            href="/"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 border-l border-slate-200 pl-4 transition-colors"
            title="Kagazo Global Citizen Suite"
          >
            <span>&larr; Global Suite</span>
          </Link>
        </div>

        {/* Center: Desktop Categorized Navigation with Mega-Dropdown */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
          {/* Mega-Dropdown Button: All 20 Tools */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-xs font-bold cursor-pointer border',
                toolsDropdownOpen
                  ? `${activePill} border-transparent shadow-xs`
                  : 'bg-slate-100/90 text-slate-900 border-slate-200 hover:bg-slate-200/80'
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{config.allToolsLabel}</span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  toolsDropdownOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Mega Dropdown Panel */}
            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2.5 w-[760px] max-w-[calc(100vw-32px)] bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 z-50 grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-150">
                {config.pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.name} className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
                      <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5">
                        <Icon className={cn('w-3.5 h-3.5', config.accentText)} />
                        <span>{pillar.name}</span>
                      </div>
                      <div className="space-y-0.5">
                        {pillar.tools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className={cn(
                              'flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-800 transition-colors',
                              hoverAccent
                            )}
                          >
                            <span>{tool.title}</span>
                            {tool.badge && (
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                                {tool.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Pillar Jump Pills */}
          {config.pillars.map((pillar) => (
            <Link
              key={pillar.name}
              href={pillar.tools[0].href}
              className={cn(
                'px-3 py-1.5 rounded-full text-slate-800 transition-all font-semibold',
                pathname === pillar.tools[0].href
                  ? activePill
                  : hoverAccent
              )}
            >
              {pillar.name}
            </Link>
          ))}
        </nav>

        {/* Right: Multi-Country Suite Switcher & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Country Switcher Segmented Pills */}
          <div className="hidden sm:inline-flex items-center p-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
            <Link
              href="/es"
              className={cn(
                'px-2.5 py-1 rounded-full transition-all flex items-center gap-1',
                country === 'es' ? 'bg-white text-slate-950 shadow-2xs font-black' : 'text-slate-700 hover:text-slate-950'
              )}
              title="España Suite (20 Herramientas)"
            >
              <span>🇪🇸</span>
              <span>ES</span>
            </Link>
            <Link
              href="/de"
              className={cn(
                'px-2.5 py-1 rounded-full transition-all flex items-center gap-1',
                country === 'de' ? 'bg-white text-slate-950 shadow-2xs font-black' : 'text-slate-700 hover:text-slate-950'
              )}
              title="Deutschland Suite (20 Rechner)"
            >
              <span>🇩🇪</span>
              <span>DE</span>
            </Link>
            <Link
              href="/fr"
              className={cn(
                'px-2.5 py-1 rounded-full transition-all flex items-center gap-1',
                country === 'fr' ? 'bg-white text-slate-950 shadow-2xs font-black' : 'text-slate-700 hover:text-slate-950'
              )}
              title="France Suite (20 Simulateurs)"
            >
              <span>🇫🇷</span>
              <span>FR</span>
            </Link>
            <Link
              href="/it"
              className={cn(
                'px-2.5 py-1 rounded-full transition-all flex items-center gap-1',
                country === 'it' ? 'bg-white text-slate-950 shadow-2xs font-black' : 'text-slate-700 hover:text-slate-950'
              )}
              title="Italia Suite (20 Calcolatori)"
            >
              <span>🇮🇹</span>
              <span>IT</span>
            </Link>
            <Link
              href="/br"
              className={cn(
                'px-2.5 py-1 rounded-full transition-all flex items-center gap-1',
                country === 'br' ? 'bg-white text-slate-950 shadow-2xs font-black' : 'text-slate-700 hover:text-slate-950'
              )}
              title="Brasil Suite (20 Ferramentas)"
            >
              <span>🇧🇷</span>
              <span>BR</span>
            </Link>
            <Link
              href="/uk"
              className={cn(
                'px-2.5 py-1 rounded-full transition-all flex items-center gap-1',
                country === 'uk' ? 'bg-white text-slate-950 shadow-2xs font-black' : 'text-slate-700 hover:text-slate-950'
              )}
              title="United Kingdom Suite (20 Tools)"
            >
              <span>🇬🇧</span>
              <span>UK</span>
            </Link>
            <Link
              href="/"
              className="px-2.5 py-1 rounded-full text-slate-700 hover:text-slate-950 transition-all flex items-center gap-1"
              title="Kagazo Global Suite"
            >
              <span>🌐</span>
              <span className="hidden md:inline">Global</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Expandable) */}
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-6 space-y-6 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {/* Quick Hub Jump Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{config.flag}</span>
              <div>
                <div className="text-xs font-black text-slate-900">{config.name} Suite</div>
                <div className="text-[10px] text-slate-700">{config.allToolsLabel}</div>
              </div>
            </div>
            <Link
              href={config.hubHref}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-2xs', config.accentBg)}
            >
              {config.hubButtonLabel}
            </Link>
          </div>

          {/* Pillars & Tools List */}
          <div className="space-y-4">
            {config.pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.name} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
                    <Icon className={cn('w-3.5 h-3.5', config.accentText)} />
                    <span>{pillar.name}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                    {pillar.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className={cn(
                          'p-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-between',
                          pathname === tool.href && `${config.accentText} font-bold bg-slate-100`
                        )}
                      >
                        <span>{tool.title}</span>
                        {tool.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                            {tool.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Country Switcher (Mobile) */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-around gap-2 text-xs font-bold">
            <Link href="/es" className={cn('p-2 rounded-xl text-center flex-1', country === 'es' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-slate-50 text-slate-700')}>
              🇪🇸 España
            </Link>
            <Link href="/de" className={cn('p-2 rounded-xl text-center flex-1', country === 'de' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-700')}>
              🇩🇪 Deutschland
            </Link>
            <Link href="/fr" className={cn('p-2 rounded-xl text-center flex-1', country === 'fr' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-50 text-slate-700')}>
              🇫🇷 France
            </Link>
            <Link href="/it" className={cn('p-2 rounded-xl text-center flex-1', country === 'it' ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-slate-50 text-slate-700')}>
              🇮🇹 Italia
            </Link>
            <Link href="/br" className={cn('p-2 rounded-xl text-center flex-1', country === 'br' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-700')}>
              🇧🇷 Brasil
            </Link>
            <Link href="/uk" className={cn('p-2 rounded-xl text-center flex-1', country === 'uk' ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' : 'bg-slate-50 text-slate-700')}>
              🇬🇧 UK
            </Link>
            <Link href="/" className="p-2 rounded-xl text-center flex-1 bg-slate-50 text-slate-700">
              🌐 Global
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
