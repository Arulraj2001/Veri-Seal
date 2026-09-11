import {
  DailyProfitInput,
  DailyProfitOutput,
  RealProfitInput,
  RealProfitOutput,
  ProfitLeak,
  ProductPricingInput,
  ProductPricingOutput,
  DiscountImpactInput,
  DiscountImpactOutput,
  BreakEvenInput,
  BreakEvenOutput,
  SalesTargetInput,
  SalesTargetOutput,
  CashFlowRunwayInput,
  CashFlowRunwayOutput,
  DeliveryProfitInput,
  DeliveryProfitOutput,
  RupeeBreakdownItem,
} from './types';
import { INDIAN_MARKETPLACES } from './platforms';

// 1. Daily Profit & Rupee Breakdown
export function calculateDailyProfit(input: DailyProfitInput): DailyProfitOutput {
  const totalSales = input.cashSales + input.upiSales + input.creditSales;
  const collectedToday = input.cashSales + input.upiSales;
  const uncollectedCredit = input.creditSales;

  const grossProfit = totalSales - input.productCost;
  const grossMarginPercent = totalSales > 0 ? Number(((grossProfit / totalSales) * 100).toFixed(1)) : 0;

  const operatingExpenses =
    input.staffDailyWages +
    input.rentDailyAlloc +
    input.utilityDailyAlloc +
    input.packagingCost +
    input.deliveryCost +
    input.otherExpenses;

  const netEstimatedProfit = grossProfit - operatingExpenses;
  const netMarginPercent = totalSales > 0 ? Number(((netEstimatedProfit / totalSales) * 100).toFixed(1)) : 0;

  // Rupee Breakdown per ₹100 earned
  const rupeeBreakdown: RupeeBreakdownItem[] = [];
  if (totalSales > 0) {
    const calcPer100 = (val: number) => Number(((val / totalSales) * 100).toFixed(1));

    rupeeBreakdown.push({
      label: 'Product Cost (COGS)',
      amountPerHundred: calcPer100(input.productCost),
      totalRupees: input.productCost,
      percentage: calcPer100(input.productCost),
      color: '#0284C7', // sky
    });

    rupeeBreakdown.push({
      label: 'Staff Wages',
      amountPerHundred: calcPer100(input.staffDailyWages),
      totalRupees: input.staffDailyWages,
      percentage: calcPer100(input.staffDailyWages),
      color: '#8B5CF6', // purple
    });

    rupeeBreakdown.push({
      label: 'Rent & Utilities',
      amountPerHundred: calcPer100(input.rentDailyAlloc + input.utilityDailyAlloc),
      totalRupees: input.rentDailyAlloc + input.utilityDailyAlloc,
      percentage: calcPer100(input.rentDailyAlloc + input.utilityDailyAlloc),
      color: '#F59E0B', // amber
    });

    rupeeBreakdown.push({
      label: 'Packaging & Delivery',
      amountPerHundred: calcPer100(input.packagingCost + input.deliveryCost),
      totalRupees: input.packagingCost + input.deliveryCost,
      percentage: calcPer100(input.packagingCost + input.deliveryCost),
      color: '#EC4899', // pink
    });

    rupeeBreakdown.push({
      label: 'Other Overhead',
      amountPerHundred: calcPer100(input.otherExpenses),
      totalRupees: input.otherExpenses,
      percentage: calcPer100(input.otherExpenses),
      color: '#64748B', // slate
    });

    rupeeBreakdown.push({
      label: 'Net In-Pocket Profit',
      amountPerHundred: Math.max(0, calcPer100(netEstimatedProfit)),
      totalRupees: Math.max(0, netEstimatedProfit),
      percentage: Math.max(0, calcPer100(netEstimatedProfit)),
      color: '#10B981', // emerald
    });
  }

  let verdict = 'Healthy daily operation with stable profit margins.';
  if (netMarginPercent >= 25) {
    verdict = 'Exceptional high-margin performance! You are pocketing over 25% of turnover.';
  } else if (netMarginPercent <= 10 && netMarginPercent > 0) {
    verdict = 'Tight margin operation. Look into packaging and rent allocations to widen profit buffer.';
  } else if (netMarginPercent <= 0) {
    verdict = 'Negative cash flow alert: Operating expenses and product costs exceeded today’s total sales.';
  }

  return {
    totalSales,
    collectedToday,
    uncollectedCredit,
    productCost: input.productCost,
    grossProfit,
    grossMarginPercent,
    totalExpenses: operatingExpenses,
    netEstimatedProfit,
    netMarginPercent,
    rupeeBreakdown,
    verdict,
  };
}

// 2. Real Profit & Leak Detection
export function calculateRealProfit(input: RealProfitInput): RealProfitOutput {
  const totalDirectCosts = input.productCostCogs + input.packagingMaterials + input.deliveryCourierCharges;
  const grossProfit = input.monthlyRevenue - totalDirectCosts;
  const grossMarginPercent = input.monthlyRevenue > 0
    ? Number(((grossProfit / input.monthlyRevenue) * 100).toFixed(1))
    : 0;

  const totalOperatingExpenses =
    input.marketplaceFees +
    input.staffSalaries +
    input.shopOfficeRent +
    input.electricityUtilities +
    input.marketingAds +
    input.otherExpenses;

  const netEstimatedProfit = grossProfit - totalOperatingExpenses;
  const netMarginPercent = input.monthlyRevenue > 0
    ? Number(((netEstimatedProfit / input.monthlyRevenue) * 100).toFixed(1))
    : 0;
  const annualNetProfit = netEstimatedProfit * 12;

  // Profit Leak Detection Analysis
  const topProfitLeaks: ProfitLeak[] = [];

  if (input.monthlyRevenue > 0) {
    // 1. Marketplace Fees Leak
    const mpCut = (input.marketplaceFees / input.monthlyRevenue) * 100;
    if (mpCut > 12) {
      topProfitLeaks.push({
        category: 'Marketplace Commissions',
        monthlyAmount: input.marketplaceFees,
        percentOfRevenue: Number(mpCut.toFixed(1)),
        severity: mpCut > 18 ? 'high' : 'medium',
        diagnosticTitle: 'High Marketplace Commission Drain',
        recommendation: `Marketplace fees consume ${mpCut.toFixed(1)}% of total revenue. Moving 25% of repeat buyers to direct WhatsApp or Shopify will save ₹${Math.round(input.marketplaceFees * 0.25).toLocaleString('en-IN')}/month.`,
        potentialAnnualSaving: Math.round(input.marketplaceFees * 0.25 * 12),
      });
    }

    // 2. Delivery & Courier Bleed
    const deliveryCut = (input.deliveryCourierCharges / input.monthlyRevenue) * 100;
    if (deliveryCut > 10) {
      topProfitLeaks.push({
        category: 'Logistics & Courier',
        monthlyAmount: input.deliveryCourierCharges,
        percentOfRevenue: Number(deliveryCut.toFixed(1)),
        severity: 'medium',
        diagnosticTitle: 'Elevated Shipping Overhead',
        recommendation: `Courier freight eats ${deliveryCut.toFixed(1)}% of turnover. Consolidate into 500g volumetric weight packaging and negotiate rate cards with Shiprocket or Delhivery.`,
        potentialAnnualSaving: Math.round(input.deliveryCourierCharges * 0.15 * 12),
      });
    }

    // 3. Rent Burden
    const rentCut = (input.shopOfficeRent / input.monthlyRevenue) * 100;
    if (rentCut > 15) {
      topProfitLeaks.push({
        category: 'Commercial Rent',
        monthlyAmount: input.shopOfficeRent,
        percentOfRevenue: Number(rentCut.toFixed(1)),
        severity: rentCut > 22 ? 'high' : 'medium',
        diagnosticTitle: 'Heavy Fixed Rent Ratio',
        recommendation: `Rent accounts for ${rentCut.toFixed(1)}% of your monthly top-line. Aim to scale revenue or negotiate shared shelf space to bring rent under 10% of revenue.`,
        potentialAnnualSaving: Math.round(input.shopOfficeRent * 0.10 * 12),
      });
    }

    // 4. Advertising CAC Burn
    const adCut = (input.marketingAds / input.monthlyRevenue) * 100;
    if (adCut > 18) {
      topProfitLeaks.push({
        category: 'Paid Advertising CAC',
        monthlyAmount: input.marketingAds,
        percentOfRevenue: Number(adCut.toFixed(1)),
        severity: 'high',
        diagnosticTitle: 'Excessive Ad Spend Relative to Margin',
        recommendation: `Meta/Google Ads take ${adCut.toFixed(1)}% of total sales. Your customer acquisition cost (CAC) leaves thin profit after product costs. Focus on organic referral WhatsApp programs.`,
        potentialAnnualSaving: Math.round(input.marketingAds * 0.20 * 12),
      });
    }
  }

  return {
    monthlyRevenue: input.monthlyRevenue,
    totalDirectCosts,
    grossProfit,
    grossMarginPercent,
    totalOperatingExpenses,
    netEstimatedProfit,
    netMarginPercent,
    annualNetProfit,
    topProfitLeaks,
  };
}

// 3. Product Pricing Calculator with Indian Marketplace Slabs
export function calculateProductPricing(input: ProductPricingInput): ProductPricingOutput {
  const platform = INDIAN_MARKETPLACES[input.marketplaceId] || INDIAN_MARKETPLACES.shopify_direct;

  // Base costs that are fixed
  const directCosts = input.costPrice + input.packagingCost + input.shippingCharge;
  const desiredProfit = input.desiredProfitRupees;

  // For platforms with % cut, we solve for Selling Price (P):
  // P = (directCosts + desiredProfit + closingFee) / (1 - referralFee% - pgFee%)
  const variableCutRate = (platform.referralFeePercent + platform.paymentGatewayPercent) / 100;
  const denominator = Math.max(0.1, 1 - variableCutRate);

  const rawRecommendedPrice = (directCosts + desiredProfit + platform.closingFeeFixed) / denominator;
  // Round to psychological price ending in 9 or 0 (e.g. 499, 799, 1250)
  const recommendedSellingPrice = Math.round(rawRecommendedPrice);

  const marketplaceCommission = Math.round(
    (recommendedSellingPrice * (platform.referralFeePercent / 100)) + platform.closingFeeFixed
  );
  const paymentGatewayFee = Math.round(
    recommendedSellingPrice * (platform.paymentGatewayPercent / 100)
  );

  const totalCosts =
    input.costPrice +
    input.packagingCost +
    input.shippingCharge +
    marketplaceCommission +
    paymentGatewayFee;

  const netProfit = recommendedSellingPrice - totalCosts;
  const netMarginPercent = recommendedSellingPrice > 0
    ? Number(((netProfit / recommendedSellingPrice) * 100).toFixed(1))
    : 0;

  return {
    recommendedSellingPrice,
    costPrice: input.costPrice,
    packagingCost: input.packagingCost,
    shippingCharge: input.shippingCharge,
    marketplaceCommission,
    paymentGatewayFee,
    totalCosts,
    netProfit,
    netMarginPercent,
    platformName: platform.name,
    breakdownSummary: `${platform.name}: ${platform.referralFeePercent}% referral + ₹${platform.closingFeeFixed} closing fee.`,
  };
}

// 4. Discount Profit Crash Simulator
export function calculateDiscountImpact(input: DiscountImpactInput): DiscountImpactOutput {
  const discountMultiplier = input.proposedDiscountPercent / 100;
  const discountRupees = Math.round(input.originalPrice * discountMultiplier);
  const discountedPrice = input.originalPrice - discountRupees;

  const originalUnitProfit = Math.max(0, input.originalPrice - input.unitCost);
  const discountedUnitProfit = Math.max(0, discountedPrice - input.unitCost);

  const profitReductionPercent = originalUnitProfit > 0
    ? Number((((originalUnitProfit - discountedUnitProfit) / originalUnitProfit) * 100).toFixed(1))
    : 100;

  const originalMonthlyProfit = originalUnitProfit * input.monthlyUnitsSold;
  const discountedMonthlyProfitSameVolume = discountedUnitProfit * input.monthlyUnitsSold;

  // Volume jump needed to make the exact same total monthly profit:
  // Units_New * DiscountedUnitProfit = OriginalMonthlyProfit
  const requiredNewUnits = discountedUnitProfit > 0
    ? Math.round(originalMonthlyProfit / discountedUnitProfit)
    : input.monthlyUnitsSold * 10;

  const requiredVolumeMultiplier = Number((requiredNewUnits / Math.max(1, input.monthlyUnitsSold)).toFixed(2));
  const requiredAdditionalUnits = Math.max(0, requiredNewUnits - input.monthlyUnitsSold);

  const warningInsight =
    discountedUnitProfit <= 0
      ? 'CRITICAL WARNING: This discount sells the product below your purchase cost, producing an outright loss on every sale.'
      : `Shock Fact: A ${input.proposedDiscountPercent}% discount slashes your net unit profit by ${profitReductionPercent}%. You must sell ${requiredAdditionalUnits} more units (${requiredVolumeMultiplier}x volume) just to make the exact same income.`;

  return {
    originalPrice: input.originalPrice,
    discountedPrice,
    discountRupees,
    originalUnitProfit,
    discountedUnitProfit,
    profitReductionPercent,
    originalMonthlyProfit,
    discountedMonthlyProfitSameVolume,
    requiredVolumeMultiplier,
    requiredAdditionalUnits,
    warningInsight,
  };
}

// 5. Break-Even & Operational Target Calculator
export function calculateBreakEven(input: BreakEvenInput): BreakEvenOutput {
  const contributionMarginRupees = input.averageSellingPrice - input.averageCostPerOrder;
  const contributionMarginPercent = input.averageSellingPrice > 0
    ? Number(((contributionMarginRupees / input.averageSellingPrice) * 100).toFixed(1))
    : 0;

  let breakEvenMonthlyOrders = 0;
  let breakEvenMonthlyRevenue = 0;
  let breakEvenDailyOrders = 0;

  if (contributionMarginRupees > 0) {
    breakEvenMonthlyOrders = Math.ceil(input.monthlyFixedCosts / contributionMarginRupees);
    breakEvenMonthlyRevenue = breakEvenMonthlyOrders * input.averageSellingPrice;
    breakEvenDailyOrders = Math.ceil(breakEvenMonthlyOrders / 26); // 26 working days in Indian SMBs
  }

  const actionableSummary = contributionMarginRupees <= 0
    ? 'Warning: Your direct cost per order equals or exceeds your selling price. Every sale increases your total loss.'
    : `You need exactly ₹${breakEvenMonthlyRevenue.toLocaleString('en-IN')}/month turnover, or ${breakEvenMonthlyOrders} orders/month (~${breakEvenDailyOrders} orders/day) just to pay your rent, staff, and bills.`;

  return {
    contributionMarginRupees,
    contributionMarginPercent,
    breakEvenMonthlyRevenue,
    breakEvenMonthlyOrders,
    breakEvenDailyOrders,
    actionableSummary,
  };
}

// 6. Sales Target Calculator (Reverse Engineered for ₹1 Lakh Net Profit)
export function calculateSalesTarget(input: SalesTargetInput): SalesTargetOutput {
  const variableMarginFraction = 1 - (input.variableCostPercentOfAov / 100);
  const totalRequiredMargin = input.desiredMonthlyNetProfit + input.monthlyFixedCosts;

  const requiredMonthlyRevenue = variableMarginFraction > 0
    ? Math.round(totalRequiredMargin / variableMarginFraction)
    : 0;

  const requiredDailySales = input.workingDaysPerMonth > 0
    ? Math.round(requiredMonthlyRevenue / input.workingDaysPerMonth)
    : 0;

  const requiredMonthlyOrders = input.averageOrderValue > 0
    ? Math.ceil(requiredMonthlyRevenue / input.averageOrderValue)
    : 0;

  const requiredDailyOrders = input.workingDaysPerMonth > 0
    ? Math.ceil(requiredMonthlyOrders / input.workingDaysPerMonth)
    : 0;

  const insight = `To pocket ₹${input.desiredMonthlyNetProfit.toLocaleString('en-IN')} in clean net profit after paying ₹${input.monthlyFixedCosts.toLocaleString('en-IN')} fixed expenses, you need ₹${requiredDailySales.toLocaleString('en-IN')}/day in sales (~${requiredDailyOrders} orders/day at an average ticket size of ₹${input.averageOrderValue}).`;

  return {
    desiredMonthlyNetProfit: input.desiredMonthlyNetProfit,
    requiredMonthlyRevenue,
    requiredDailySales,
    requiredMonthlyOrders,
    requiredDailyOrders,
    insight,
  };
}

// 7. Cash-Flow Survival Runway
export function calculateCashFlowRunway(input: CashFlowRunwayInput): CashFlowRunwayOutput {
  const totalAvailableLiquidity = input.currentCashInBank + input.pendingReceivablesDue30Days;
  const totalMonthlyCashOutflow =
    input.monthlyFixedOutflows +
    input.monthlyVendorPurchases +
    input.monthlyLoanEmi;

  const monthlyNetCashBurnOrSurplus = input.expectedMonthlySales - totalMonthlyCashOutflow;

  let runwayMonths = 99;
  let isCrunchImminent = false;
  let daysUntilCashCrunch = 999;
  let survivalStatus: 'healthy' | 'moderate' | 'critical' = 'healthy';

  if (monthlyNetCashBurnOrSurplus < 0) {
    const netBurnPerMonth = Math.abs(monthlyNetCashBurnOrSurplus);
    runwayMonths = Number((totalAvailableLiquidity / netBurnPerMonth).toFixed(1));
    daysUntilCashCrunch = Math.round(runwayMonths * 30);
    isCrunchImminent = daysUntilCashCrunch < 60;

    if (daysUntilCashCrunch <= 30) {
      survivalStatus = 'critical';
    } else if (daysUntilCashCrunch <= 90) {
      survivalStatus = 'moderate';
    }
  } else {
    survivalStatus = 'healthy';
    runwayMonths = 99; // Cash flow positive
    daysUntilCashCrunch = 999;
    isCrunchImminent = false;
  }

  let urgencyWarning = 'Business generates positive operational cash flow monthly.';
  if (survivalStatus === 'critical') {
    urgencyWarning = `🚨 High Alert: At current monthly cash outflow (₹${totalMonthlyCashOutflow.toLocaleString('en-IN')}), your cash reserve will run out in ~${daysUntilCashCrunch} days. Collect receivables immediately.`;
  } else if (survivalStatus === 'moderate') {
    urgencyWarning = `⚠️ Caution: Estimated cash runway is ~${runwayMonths} months (~${daysUntilCashCrunch} days). Curtail vendor purchases or accelerate collections.`;
  }

  return {
    totalAvailableLiquidity,
    totalMonthlyCashOutflow,
    monthlyNetCashBurnOrSurplus,
    runwayMonths,
    isCrunchImminent,
    daysUntilCashCrunch,
    survivalStatus,
    urgencyWarning,
  };
}

// 8. Delivery Profit & RTO Sizer
export function calculateDeliveryProfit(input: DeliveryProfitInput): DeliveryProfitOutput {
  const rtoRate = input.rtoFailureRatePercent / 100;
  // When an order is RTO (Return to Origin), seller incurs:
  // Forward Courier + Return Courier + Packaging waste, and receives ₹0 revenue.
  const rtoLossPerReturn = input.forwardCourierFee + input.rtoReturnCourierFee + input.packagingCost;

  // The hidden loss from RTO must be amortized across successful delivered orders:
  const costOfRtoPerOrderSpread = Math.round(rtoLossPerReturn * rtoRate);

  const pgFee = Math.round(input.averageOrderValue * (input.paymentGatewayPercent / 100));

  const totalDeliveredCost =
    input.productCost +
    input.packagingCost +
    input.forwardCourierFee +
    costOfRtoPerOrderSpread +
    pgFee;

  const netDeliveredOrderProfit = input.averageOrderValue - totalDeliveredCost;
  const effectiveMarginPercent = input.averageOrderValue > 0
    ? Number(((netDeliveredOrderProfit / input.averageOrderValue) * 100).toFixed(1))
    : 0;

  const isProfitable = netDeliveredOrderProfit > 0;

  const rtoBleedWarning = input.rtoFailureRatePercent >= 20
    ? `RTO Danger: A ${input.rtoFailureRatePercent}% return rate costs you ₹${costOfRtoPerOrderSpread} extra per parcel shipped. Switching COD buyers to WhatsApp prepaid cuts this loss instantly.`
    : `Stable Delivery: RTO spread of ₹${costOfRtoPerOrderSpread}/order is within standard e-commerce operating parameters.`;

  return {
    netDeliveredOrderProfit,
    effectiveMarginPercent,
    costOfRtoPerOrderSpread,
    totalDeliveredCost,
    isProfitable,
    rtoBleedWarning,
  };
}
