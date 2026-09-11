export type VehicleCategory = 'car' | 'bike' | 'scooter' | 'ev-car' | 'ev-2w';
export type FuelType = 'petrol' | 'diesel' | 'cng' | 'electric' | 'hybrid';
export type VehicleStage = 'buy' | 'own' | 'sell';

export interface VehiclePreset {
  id: string;
  name: string;
  brand: string;
  category: VehicleCategory;
  fuelType: FuelType;
  onRoadPrice: number;
  expectedMileage: number; // km/l or km/kWh for EV
  annualInsurance: number;
  periodicServiceCost: number; // annual or 10k km
  tyreReplacementCost: number; // set of tyres
  batteryReplacementCost: number;
  standardTankOrBatterySize: number; // Litres or kWh
  typicalDepreciation5Yr: number; // percentage (e.g. 50 = 50% retained)
}

export interface CostRealityInputs {
  vehiclePrice: number;
  downPayment: number;
  loanTenureYears: number;
  loanInterestRate: number;
  monthlyKm: number;
  fuelPricePerLitreOrKwh: number;
  fuelEfficiency: number;
  annualInsurance: number;
  annualServiceCost: number;
  tyreCost5Years: number;
  monthlyParking: number;
  monthlyTolls: number;
  monthlyWashing: number;
  accessoriesCost: number;
  expectedResaleValue: number;
  ownershipYears: number;
}

export interface CostRealityResult {
  vehiclePrice: number;
  loanPrincipal: number;
  loanInterestTotal: number;
  monthlyEMI: number;
  fuelTotal: number;
  insuranceTotal: number;
  serviceTotal: number;
  tyresTotal: number;
  parkingTotal: number;
  tollsTotal: number;
  washingTotal: number;
  accessoriesTotal: number;
  grossOwnershipCost: number;
  resaleValue: number;
  netOwnershipCost: number;
  netCostPerMonth: number;
  netCostPerKm: number;
  totalKmDriven: number;
  depreciationTotal: number;
}

export interface ServiceBenchmarkItem {
  id: string;
  name: string;
  category: 'engine' | 'brakes' | 'filters' | 'fluids' | 'suspension' | 'labour' | 'unnecessary';
  minFairPrice: number;
  maxFairPrice: number;
  typicalPrice: number;
  isMandatory: boolean;
  adviceWhenHigh: string;
  commonUpsellAlert?: string;
}

export type QuoteItemStatus = 'fair' | 'high' | 'unnecessary' | 'unknown';

export interface EvaluatedQuoteItem {
  id: string;
  name: string;
  quotedPrice: number;
  minFairPrice: number;
  maxFairPrice: number;
  status: QuoteItemStatus;
  percentageDiff: number;
  advice: string;
  category: string;
}

export interface QuoteAnalysisResult {
  totalQuoted: number;
  fairMinTotal: number;
  fairMaxTotal: number;
  potentialSavings: number;
  items: EvaluatedQuoteItem[];
  highCount: number;
  unnecessaryCount: number;
  negotiationScript: string;
}

export interface ServiceInvoiceItem {
  id: string;
  description: string;
  type: 'parts' | 'labour' | 'tax' | 'upsell';
  amount: number;
}

export interface InvoiceAnalysisResult {
  totalAmount: number;
  partsAmount: number;
  labourAmount: number;
  taxAmount: number;
  upsellAmount: number;
  partsPercentage: number;
  labourPercentage: number;
  taxPercentage: number;
  items: ServiceInvoiceItem[];
  costPerKmSinceLastService?: number;
  previousServiceDelta?: {
    previousTotal: number;
    amountDiff: number;
    percentageDiff: number;
    primaryDriver: string;
  };
}

export interface TyreAssessmentInputs {
  tyreAgeMonths: number;
  odometerKm: number;
  treadDepthMm: number; // New is ~8mm, Legal minimum in India is 1.6mm
  hasCracksOrBulges: boolean;
  drivingEnvironment: 'mostly-city' | 'mixed' | 'mostly-highway' | 'bad-roads';
}

export interface TyreAssessmentResult {
  status: 'safe' | 'monitor' | 'replace-immediate' | 'professional-inspect';
  headline: string;
  description: string;
  estimatedRemainingKm: number;
  estimatedLifeTotalKm: number;
  estimatedReplacementCost: number;
  costPerKmTyres: number;
  recommendations: string[];
}

export interface BatteryAssessmentInputs {
  vehicleAgeYears: number;
  batteryAgeMonths: number;
  crankingSluggish: boolean;
  voltageReading?: number; // e.g. 12.6V is 100%, 12.2V is 50%, <11.9V is dead
  hasElectricalAddOns: boolean; // Dashcam, subwoofers, high-watt headlights
}

export interface BatteryAssessmentResult {
  status: 'healthy' | 'monitor-soon' | 'test-required' | 'replace-immediately';
  headline: string;
  description: string;
  estimatedMonthsLeft: number;
  replacementCostEstimate: number;
  preventiveTips: string[];
}

export interface ComparisonVehicle {
  name: string;
  purchasePrice: number;
  monthlyEMI: number;
  fuelEfficiency: number;
  insuranceYearly: number;
  serviceYearly: number;
  tyreCost5Yr: number;
  resalePercentage5Yr: number;
}

export interface UsageTierComparisonResult {
  usageKmPerMonth: number;
  carA: {
    monthlyFuel: number;
    monthlyTotal: number;
    fiveYearCost: number;
    resaleValue: number;
    netFiveYearCost: number;
    costPerKm: number;
  };
  carB: {
    monthlyFuel: number;
    monthlyTotal: number;
    fiveYearCost: number;
    resaleValue: number;
    netFiveYearCost: number;
    costPerKm: number;
  };
  winner: 'carA' | 'carB';
  monthlySavings: number;
  fiveYearSavings: number;
  decisionReason: string;
}

export interface EvVsPetrolInputs {
  petrolCarPrice: number;
  evCarPrice: number;
  monthlyKm: number;
  petrolPrice: number;
  petrolMileage: number;
  electricityTariffPerUnit: number;
  evEfficiencyKmPerKwh: number;
  homeChargingPercent: number; // e.g. 80% home, 20% public
  publicChargingTariffPerUnit: number;
  annualPetrolMaintenance: number;
  annualEvMaintenance: number;
  ownershipYears: number;
}

export interface EvVsPetrolResult {
  upfrontPriceDifference: number;
  monthlyPetrolFuelCost: number;
  monthlyEvEnergyCost: number;
  monthlyFuelSavings: number;
  monthlyMaintenanceSavings: number;
  totalMonthlySavings: number;
  breakEvenMonths: number;
  fiveYearNetSavings: number;
  co2SavedKgPerYear: number;
  recommendation: string;
}

export interface StoredGarageVehicle {
  id: string;
  nickname: string;
  make: string;
  model: string;
  year: number;
  fuelType: FuelType;
  category: VehicleCategory;
  odometer: number;
  monthlyKm: number;
  registrationNumber?: string;
  insuranceExpiryDate?: string;
  pucExpiryDate?: string;
  lastServiceDate?: string;
  lastServiceOdo?: number;
  batteryInstalledDate?: string;
  tyreInstalledOdo?: number;
  createdAt: string;
}
