import { SITE_URL } from '@/lib/constants';

export interface HreflangMapping {
  canonicalPath: string;
  locales: Record<string, string>; // e.g. 'es-ES': '/es/calculadora-sueldo-neto'
}

/**
 * Universal Hreflang Registry for Multi-Country Scaling
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
      'fr-FR': `${SITE_URL}/fr/generateur-facture-auto-entrepreneur`,
      'fr': `${SITE_URL}/fr/generateur-facture-auto-entrepreneur`,
      'de-DE': `${SITE_URL}/de/kleinunternehmer-rechnung-generator`,
      'de': `${SITE_URL}/de/kleinunternehmer-rechnung-generator`,
      'x-default': `${SITE_URL}/tools/invoice-generator`,
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
};
