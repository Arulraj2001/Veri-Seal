export type BusinessCategoryId =
  | 'kirana_retail'
  | 'instagram_d2c'
  | 'home_bakery'
  | 'freelancer'
  | 'salon_spa'
  | 'mobile_repair'
  | 'custom';

export type IndianMarketplaceId =
  | 'amazon_easy_ship'
  | 'flipkart'
  | 'meesho'
  | 'shopify_direct'
  | 'whatsapp_direct';

export interface BusinessPreset {
  id: BusinessCategoryId;
  title: string;
  subtitle: string;
  typicalMonthlySales: number;
  typicalGrossMarginPercent: number;
  typicalNetMarginPercent: number;
  defaultDailySales: {
    cashSales: number;
    upiSales: number;
    creditSales: number;
    productCost: number;
    staffDailyWages: number;
    rentDailyAlloc: number;
    utilityDailyAlloc: number;
    packagingCost: number;
    deliveryCost: number;
    otherExpenses: number;
  };
  commonLeaks: string[];
}

export interface DailyProfitInput {
  cashSales: number;
  upiSales: number;
  creditSales: number;
  productCost: number;
  staffDailyWages: number;
  rentDailyAlloc: number;
  utilityDailyAlloc: number;
  packagingCost: number;
  deliveryCost: number;
  otherExpenses: number;
}

export interface RupeeBreakdownItem {
  label: string;
  amountPerHundred: number;
  totalRupees: number;
  percentage: number;
  color: string;
}

export interface DailyProfitOutput {
  totalSales: number;
  collectedToday: number;
  uncollectedCredit: number;
  productCost: number;
  grossProfit: number;
  grossMarginPercent: number;
  totalExpenses: number;
  netEstimatedProfit: number;
  netMarginPercent: number;
  rupeeBreakdown: RupeeBreakdownItem[];
  verdict: string;
}

export interface RealProfitInput {
  monthlyRevenue: number;
  productCostCogs: number;
  marketplaceFees: number;
  deliveryCourierCharges: number;
  packagingMaterials: number;
  staffSalaries: number;
  shopOfficeRent: number;
  electricityUtilities: number;
  marketingAds: number;
  gstAssumptionsPercent: number;
  otherExpenses: number;
}

export interface ProfitLeak {
  category: string;
  monthlyAmount: number;
  percentOfRevenue: number;
  severity: 'high' | 'medium' | 'low';
  diagnosticTitle: string;
  recommendation: string;
  potentialAnnualSaving: number;
}

export interface RealProfitOutput {
  monthlyRevenue: number;
  totalDirectCosts: number;
  grossProfit: number;
  grossMarginPercent: number;
  totalOperatingExpenses: number;
  netEstimatedProfit: number;
  netMarginPercent: number;
  annualNetProfit: number;
  topProfitLeaks: ProfitLeak[];
}

export interface ProductPricingInput {
  costPrice: number;
  packagingCost: number;
  shippingCharge: number;
  marketplaceId: IndianMarketplaceId;
  desiredProfitRupees: number;
  gstRatePercent: number;
}

export interface ProductPricingOutput {
  recommendedSellingPrice: number;
  costPrice: number;
  packagingCost: number;
  shippingCharge: number;
  marketplaceCommission: number;
  paymentGatewayFee: number;
  totalCosts: number;
  netProfit: number;
  netMarginPercent: number;
  platformName: string;
  breakdownSummary: string;
}

export interface DiscountImpactInput {
  unitCost: number;
  originalPrice: number;
  proposedDiscountPercent: number;
  monthlyUnitsSold: number;
}

export interface DiscountImpactOutput {
  originalPrice: number;
  discountedPrice: number;
  discountRupees: number;
  originalUnitProfit: number;
  discountedUnitProfit: number;
  profitReductionPercent: number;
  originalMonthlyProfit: number;
  discountedMonthlyProfitSameVolume: number;
  requiredVolumeMultiplier: number;
  requiredAdditionalUnits: number;
  warningInsight: string;
}

export interface BreakEvenInput {
  monthlyFixedCosts: number; // rent, base salaries, electricity, software
  averageSellingPrice: number;
  averageCostPerOrder: number; // direct product cost + packaging + delivery
}

export interface BreakEvenOutput {
  contributionMarginRupees: number;
  contributionMarginPercent: number;
  breakEvenMonthlyRevenue: number;
  breakEvenMonthlyOrders: number;
  breakEvenDailyOrders: number;
  actionableSummary: string;
}

export interface SalesTargetInput {
  desiredMonthlyNetProfit: number;
  monthlyFixedCosts: number;
  averageOrderValue: number;
  variableCostPercentOfAov: number; // COGS + delivery + packaging % of price
  workingDaysPerMonth: number;
}

export interface SalesTargetOutput {
  desiredMonthlyNetProfit: number;
  requiredMonthlyRevenue: number;
  requiredDailySales: number;
  requiredMonthlyOrders: number;
  requiredDailyOrders: number;
  insight: string;
}

export interface CashFlowRunwayInput {
  currentCashInBank: number;
  expectedMonthlySales: number;
  pendingReceivablesDue30Days: number;
  monthlyFixedOutflows: number; // rent, staff, electricity
  monthlyVendorPurchases: number;
  monthlyLoanEmi: number;
}

export interface CashFlowRunwayOutput {
  totalAvailableLiquidity: number;
  totalMonthlyCashOutflow: number;
  monthlyNetCashBurnOrSurplus: number;
  runwayMonths: number;
  isCrunchImminent: boolean;
  daysUntilCashCrunch: number;
  survivalStatus: 'healthy' | 'moderate' | 'critical';
  urgencyWarning: string;
}

export interface DeliveryProfitInput {
  averageOrderValue: number;
  productCost: number;
  packagingCost: number;
  forwardCourierFee: number;
  rtoReturnCourierFee: number;
  rtoFailureRatePercent: number; // e.g. 15% - 25% for Indian COD
  paymentGatewayPercent: number; // 2% for prepaid or ₹40 for COD
}

export interface DeliveryProfitOutput {
  netDeliveredOrderProfit: number;
  effectiveMarginPercent: number;
  costOfRtoPerOrderSpread: number;
  totalDeliveredCost: number;
  isProfitable: boolean;
  rtoBleedWarning: string;
}

export interface BusinessHealthScores {
  overallScore: number;
  profitabilityScore: number;
  cashRunwayScore: number;
  receivablesScore: number;
  inventoryHealthScore: number;
  platformIndependenceScore: number;
  gradeLabel: 'EXCELLENT' | 'GOOD' | 'NEEDS ATTENTION' | 'CRITICAL LEAK';
  topFixes: string[];
}
