/**
 * Universal International Calculation Types
 * Supports Spain (ES), France (FR), and Germany (DE) precision utility engines.
 */

export type LocaleCode = 'es' | 'fr' | 'de';

export interface SalaryCalculationInput {
  grossAnnualSalary: number;
  payFrequency: 12 | 14;
  age?: number;
  childrenCount?: number;
  disabilityLevel?: number; // 0, 33, 65 percent
  // Spain specifics
  autonomousCommunity?: string;
  contractType?: 'indefinido' | 'temporal';
  // France specifics
  employmentStatus?: 'non_cadre' | 'cadre' | 'fonctionnaire';
  // Germany specifics
  taxClass?: 1 | 2 | 3 | 4 | 5 | 6;
  state?: string; // Bundesland
  hasChurchTax?: boolean;
  healthInsuranceAdditionalRate?: number; // e.g. 1.7%
}

export interface SalaryCalculationResult {
  grossAnnual: number;
  grossMonthly: number;
  netAnnual: number;
  netMonthly: number;
  totalIncomeTax: number;
  effectiveTaxRatePercent: number;
  totalSocialSecurityEmployee: number;
  socialSecurityRatePercent: number;
  totalDeductionsAnnual: number;
  takeHomePercent: number;
  currencySymbol: string;
  breakdown: Array<{
    label: string;
    amount: number;
    percentOfGross: number;
    color: string;
    description: string;
  }>;
  statutoryDetails: Record<string, string | number>;
}

export interface DniValidationResult {
  rawInput: string;
  formatted: string;
  type: 'DNI' | 'NIE' | 'CIF' | 'INVALID';
  isValid: boolean;
  expectedControlDigit?: string;
  actualControlDigit?: string;
  detail: string;
}

export interface NumberToWordsResult {
  numericValue: number;
  inWords: string;
  currencyLabel: string;
  formattedOfficial: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRatePercent: number; // e.g. 21% IVA, 20% TVA, 19% MwSt
  irpfWithholdingPercent?: number; // Spain specific (7% or 15%)
}

export interface InvoiceDraft {
  invoiceNumber: string;
  issueDate: string;
  dueDate?: string;
  currency: string;
  issuer: {
    name: string;
    taxId: string; // NIF / CIF / SIRET / Steuernummer
    address: string;
    email?: string;
  };
  client: {
    name: string;
    taxId: string;
    address: string;
    email?: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  irpfWithholdingTotal?: number;
  grandTotal: number;
  notes?: string;
  legalNotice?: string;
}

