/**
 * Core Types & Data Schemas for the Home Cost & Savings Intelligence Platform.
 */

export type IndianStateId =
  | 'all_india'
  | 'tamil_nadu'
  | 'maharashtra'
  | 'delhi'
  | 'karnataka'
  | 'uttar_pradesh'
  | 'gujarat'
  | 'west_bengal'
  | 'kerala'
  | 'telangana';

export interface TariffSlab {
  minUnits: number;
  maxUnits: number | null; // null means infinity / above
  ratePerUnit: number; // in INR ₹
}

export interface StateTariffConfig {
  id: IndianStateId;
  stateName: string;
  discomName: string;
  fixedMonthlyChargePerKw: number;
  freeUnitsAllowance?: number; // e.g. 100 in TN, 200 in Delhi
  slabs: TariffSlab[];
  notes: string;
}

export type ApplianceCategory =
  | 'cooling'
  | 'heating'
  | 'kitchen'
  | 'lighting'
  | 'entertainment'
  | 'cleaning'
  | 'general';

export interface ApplianceDef {
  id: string;
  name: string;
  category: ApplianceCategory;
  defaultWattage: number;
  wattageRange: [number, number];
  typicalDailyHours: number;
  seasonal: boolean; // e.g. AC, Geyser
  bEEStars?: number;
  efficientAlternative?: {
    name: string;
    wattage: number;
    price: number;
    notes: string;
    affiliateKeyword: string;
  };
}

export interface HouseholdApplianceItem {
  instanceId: string;
  applianceId: string;
  customName?: string;
  quantity: number;
  wattage: number;
  dailyHours: number;
  daysPerMonth?: number; // default 30
  category: ApplianceCategory;
}

export interface HomeProfilePreset {
  id: string;
  title: string;
  bhk: '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'Villa';
  city: string;
  state: IndianStateId;
  familyMembers: number;
  estimatedUnits: number;
  appliances: HouseholdApplianceItem[];
}

export interface WhatIfSimulationAdjustments {
  acHoursReduction: number; // e.g. reduce by 2 hrs
  acTempIncreaseDegrees: number; // e.g. increase by 2°C (24 -> 26)
  fansSwitchedToBldc: number; // count of fans
  fridgeReplacedTo5Star: boolean;
  solarCapacityKw: number; // e.g. 2 kW or 3 kW
  geyserSwitchedToSolar: boolean;
}

export interface CostBreakdownResult {
  monthlyUnits: number;
  monthlyBill: number;
  annualBill: number;
  effectiveRatePerUnit: number;
  fixedCharges: number;
  energyCharges: number;
  applianceBreakdown: {
    applianceId: string;
    name: string;
    category: ApplianceCategory;
    units: number;
    cost: number;
    percentage: number;
  }[];
  categoryBreakdown: {
    category: ApplianceCategory;
    label: string;
    units: number;
    cost: number;
    percentage: number;
    color: string;
  }[];
}

export interface UpgradeRecommendation {
  id: string;
  title: string;
  category: string;
  impactLabel: 'HIGH IMPACT' | 'MEDIUM IMPACT' | 'LOW HANGING FRUIT';
  description: string;
  estimatedInvestment: number;
  monthlySaving: number;
  annualSaving: number;
  paybackMonths: number;
  fiveYearNetProfit: number;
  affiliateCtaText: string;
  affiliateSearchQuery: string;
  actionType: 'buy' | 'behavior';
}
