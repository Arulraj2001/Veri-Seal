import {
  WhatsAppQuoteData,
  UdhaarCustomerRecord,
  UdhaarTone,
  EmployeeTrueCostInput,
  MinimumOrderValueInput,
  DayEndReconciliationInput,
} from './types';

// 1. WhatsApp Quotation Generator & URL Builder
export function generateWhatsAppQuoteText(data: WhatsAppQuoteData): string {
  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const finalTotal = subtotal + data.deliveryCharge - data.discountRupees;

  let text = `*ESTIMATE / QUOTATION*\n`;
  text += `From: *${data.businessName || 'Our Business'}*\n`;
  if (data.quoteNumber) text += `Quote Ref: #${data.quoteNumber}\n`;
  text += `To: ${data.customerName || 'Valued Customer'}\n`;
  text += `--------------------------------\n`;

  data.items.forEach((item, index) => {
    text += `${index + 1}. *${item.name}*\n`;
    text += `   ${item.quantity} x ₹${item.rate.toLocaleString('en-IN')} = ₹${(item.quantity * item.rate).toLocaleString('en-IN')}\n`;
  });

  text += `--------------------------------\n`;
  text += `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;

  if (data.deliveryCharge > 0) {
    text += `Delivery / Shipping: ₹${data.deliveryCharge.toLocaleString('en-IN')}\n`;
  }
  if (data.discountRupees > 0) {
    text += `Special Discount: -₹${data.discountRupees.toLocaleString('en-IN')}\n`;
  }

  text += `*TOTAL PAYABLE: ₹${finalTotal.toLocaleString('en-IN')}*\n`;
  text += `--------------------------------\n`;

  if (data.upiId) {
    text += `📲 *Pay via UPI:* ${data.upiId}\n`;
  }
  if (data.paymentTerms) {
    text += `Terms: ${data.paymentTerms}\n`;
  }
  text += `Valid for: ${data.validDays || 7} days.\n`;
  text += `Thank you for choosing *${data.businessName}*!`;

  return text;
}

export function buildWhatsAppShareUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  if (!cleanPhone) {
    return `https://wa.me/?text=${encodedText}`;
  }
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}

// 2. Udhaar (Credit) Reminder Generator with Indian Business Etiquette
export function generateUdhaarReminderText(
  record: UdhaarCustomerRecord,
  businessName: string,
  upiId: string,
  tone: UdhaarTone
): string {
  const name = record.customerName || 'Customer';
  const amount = record.amountDue.toLocaleString('en-IN');
  const bName = businessName || 'our shop';

  let msg = '';
  switch (tone) {
    case 'friendly':
      msg = `Namaste ${name} ji! 🙏 Hope you are doing well. This is a gentle reminder regarding the pending balance of ₹${amount} with ${bName}. You can easily settle this via UPI${
        upiId ? ` (${upiId})` : ''
      }. Thank you so much for your continuous support!`;
      break;

    case 'polite_formal':
      msg = `Dear ${name}, greeting from ${bName}. We are doing our routine account reconciliation and noted an unpaid balance of ₹${amount}${
        record.daysOverdue > 0 ? ` pending for ${record.daysOverdue} days` : ''
      }. Kindly clear the invoice at your earliest convenience${
        upiId ? ` to UPI ID: ${upiId}` : ''
      }. Thank you.`;
      break;

    case 'firm':
      msg = `Hello ${name}, your pending balance of ₹${amount} with ${bName} is now ${record.daysOverdue} days overdue. As we need to clear upcoming supplier accounts, we kindly request you to settle this payment today via UPI${
        upiId ? ` (${upiId})` : ''
      }. Please confirm once paid.`;
      break;

    case 'urgent':
      msg = `URGENT PAYMENT NOTICE: Dear ${name}, your outstanding dues of ₹${amount} with ${bName} remain unpaid despite prior follow-ups. Please clear this balance immediately via UPI${
        upiId ? ` (${upiId})` : ''
      } to avoid temporary suspension of your account/credit. Thank you.`;
      break;
  }

  return msg;
}

// 3. Employee True Cost Calculation
export function calculateEmployeeTrueCost(input: EmployeeTrueCostInput) {
  const annualBonusMonthlyAlloc = input.monthlyPerformanceBonus;
  const pfEsiCost = Math.round(input.baseMonthlySalary * (input.employerPfEsiPercent / 100));
  const dailyTeaLunchTotal = input.dailyTeaLunchExpense * input.workingDaysPerMonth;

  const totalMonthlyEmployerCost =
    input.baseMonthlySalary +
    annualBonusMonthlyAlloc +
    pfEsiCost +
    dailyTeaLunchTotal +
    input.uniformToolDepreciationMonthly;

  const trueCostMultiplier = input.baseMonthlySalary > 0
    ? Number((totalMonthlyEmployerCost / input.baseMonthlySalary).toFixed(2))
    : 1;

  const totalProductiveHoursPerMonth = input.workingDaysPerMonth * input.workingHoursPerDay;
  const realCostPerHour = totalProductiveHoursPerMonth > 0
    ? Math.round(totalMonthlyEmployerCost / totalProductiveHoursPerMonth)
    : 0;

  return {
    totalMonthlyEmployerCost,
    trueCostMultiplier,
    pfEsiCost,
    dailyTeaLunchTotal,
    totalProductiveHoursPerMonth,
    realCostPerHour,
  };
}

// 4. Minimum Order Value (MOV) Calculation
export function calculateMinimumOrderValue(input: MinimumOrderValueInput) {
  // Profit = Price - (Price * CostPercent) - FixedPackaging - FixedCourier
  // Profit = Price * (1 - CostPercent) - (FixedPackaging + FixedCourier)
  // Price = (Profit + FixedPackaging + FixedCourier) / (1 - CostPercent)
  const variableMarginRate = Math.max(0.05, 1 - (input.averageProductCostPercent / 100));
  const totalFixedOrderExpense = input.fixedPackagingCost + input.fixedCourierFreight;

  // Zero Profit Break-even MOV
  const breakEvenOrderValue = Math.ceil(totalFixedOrderExpense / variableMarginRate);

  // Desired Profit MOV
  const recommendedMov = Math.ceil(
    (totalFixedOrderExpense + input.desiredNetProfitPerOrder) / variableMarginRate
  );

  return {
    breakEvenOrderValue,
    recommendedMov,
    totalFixedOrderExpense,
  };
}

// 5. Day-End Register Reconciliation
export function reconcileDailyRegisters(input: DayEndReconciliationInput) {
  const expectedCashInDrawer =
    input.openingCashFloat +
    input.systemCashSales -
    input.cashPaidOutForExpenses;

  const cashDiscrepancy = input.physicalDrawerCashCount - expectedCashInDrawer;
  const isCashBalanced = Math.abs(cashDiscrepancy) <= 5; // tolerance for 5 rupee coins

  const upiDiscrepancy = input.bankAppUpiReceived - input.systemUpiSales;
  const isUpiBalanced = Math.abs(upiDiscrepancy) <= 2;

  return {
    expectedCashInDrawer,
    cashDiscrepancy,
    isCashBalanced,
    upiDiscrepancy,
    isUpiBalanced,
  };
}
