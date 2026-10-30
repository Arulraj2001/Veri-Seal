import { SITE_URL } from '@/lib/constants';

export interface HreflangMapping {
  canonicalPath: string;
  locales: Record<string, string>;
}

/**
 * Universal Hreflang Registry for Multi-Country Scaling
 * Cross-linking Spain (ES), France (FR), Germany (DE), and global defaults.
 */
export const HREFLANG_REGISTRY: Record<string, HreflangMapping> = {
  salary_calculator: {
    canonicalPath: '/es/calculadora-sueldo-neto',
    locales: {
      'es-ES': `${SITE_URL}/es/calculadora-sueldo-neto`,
      'es-US': `${SITE_URL}/es/calculadora-sueldo-neto`,
      'es': `${SITE_URL}/es/calculadora-sueldo-neto`,
      'fr-FR': `${SITE_URL}/fr/calculateur-salaire-net-brut`,
      'fr': `${SITE_URL}/fr/calculateur-salaire-net-brut`,
      'de-DE': `${SITE_URL}/de/brutto-netto-rechner`,
      'de': `${SITE_URL}/de/brutto-netto-rechner`,
      'x-default': `${SITE_URL}/tools/salary-slip-generator`,
    },
  },
  invoice_generator: {
    canonicalPath: '/es/generador-factura-pdf',
    locales: {
      'es-ES': `${SITE_URL}/es/generador-factura-pdf`,
      'es': `${SITE_URL}/es/generador-factura-pdf`,
      'fr-FR': `${SITE_URL}/fr/facture-auto-entrepreneur`,
      'fr': `${SITE_URL}/fr/facture-auto-entrepreneur`,
      'de-DE': `${SITE_URL}/de/kleinunternehmer-rechnung`,
      'de': `${SITE_URL}/de/kleinunternehmer-rechnung`,
      'x-default': `${SITE_URL}/tools/invoice-generator`,
    },
  },
  severance_calculator: {
    canonicalPath: '/es/calculadora-finiquito-despido',
    locales: {
      'es-ES': `${SITE_URL}/es/calculadora-finiquito-despido`,
      'es': `${SITE_URL}/es/calculadora-finiquito-despido`,
      'fr-FR': `${SITE_URL}/fr/calculateur-indemnite-rupture`,
      'fr': `${SITE_URL}/fr/calculateur-indemnite-rupture`,
      'de-DE': `${SITE_URL}/de/abfindungsrechner`,
      'de': `${SITE_URL}/de/abfindungsrechner`,
      'x-default': `${SITE_URL}/es/calculadora-finiquito-despido`,
    },
  },
  freelance_calculator: {
    canonicalPath: '/es/calculadora-irpf-autonomos',
    locales: {
      'es-ES': `${SITE_URL}/es/calculadora-irpf-autonomos`,
      'es': `${SITE_URL}/es/calculadora-irpf-autonomos`,
      'fr-FR': `${SITE_URL}/fr/simulateur-charges-urssaf`,
      'fr': `${SITE_URL}/fr/simulateur-charges-urssaf`,
      'x-default': `${SITE_URL}/es/calculadora-irpf-autonomos`,
    },
  },
  id_validator: {
    canonicalPath: '/es/validador-dni-nie-cif',
    locales: {
      'es-ES': `${SITE_URL}/es/validador-dni-nie-cif`,
      'es': `${SITE_URL}/es/validador-dni-nie-cif`,
      'x-default': `${SITE_URL}/es/validador-dni-nie-cif`,
    },
  },
  french_numbers: {
    canonicalPath: '/fr/convertisseur-chiffre-en-lettre',
    locales: {
      'fr-FR': `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
      'fr-BE': `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
      'fr-CA': `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
      'fr': `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
      'x-default': `${SITE_URL}/fr/convertisseur-chiffre-en-lettre`,
    },
  },
  german_gender: {
    canonicalPath: '/de/der-die-das-finder',
    locales: {
      'de-DE': `${SITE_URL}/de/der-die-das-finder`,
      'de-AT': `${SITE_URL}/de/der-die-das-finder`,
      'de-CH': `${SITE_URL}/de/der-die-das-finder`,
      'de': `${SITE_URL}/de/der-die-das-finder`,
      'x-default': `${SITE_URL}/de/der-die-das-finder`,
    },
  },
  hourly_wage: {
    canonicalPath: '/de/stundenlohnrechner',
    locales: {
      'de-DE': `${SITE_URL}/de/stundenlohnrechner`,
      'de': `${SITE_URL}/de/stundenlohnrechner`,
      'x-default': `${SITE_URL}/de/stundenlohnrechner`,
    },
  },
};
