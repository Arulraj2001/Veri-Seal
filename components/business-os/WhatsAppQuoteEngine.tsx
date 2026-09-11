'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Share2,
  Copy,
  Check,
  Smartphone,
  Sparkles,
  Receipt,
  ArrowRight,
  IndianRupee,
} from 'lucide-react';
import { QuoteLineItem, WhatsAppQuoteData } from '@/lib/business-os/types';
import {
  generateWhatsAppQuoteText,
  buildWhatsAppShareUrl,
} from '@/lib/business-os/operational-helpers';

export default function WhatsAppQuoteEngine() {
  const [businessName, setBusinessName] = useState<string>('Sri Lakshmi Silks & Boutique');
  const [businessPhone, setBusinessPhone] = useState<string>('9876543210');
  const [customerName, setCustomerName] = useState<string>('Priya Sharma');
  const [customerPhone, setCustomerPhone] = useState<string>('9841023456');
  const [quoteNumber, setQuoteNumber] = useState<string>('QT-104');
  const [upiId, setUpiId] = useState<string>('srilakshmi@upi');
  const [deliveryCharge, setDeliveryCharge] = useState<number>(80);
  const [discountRupees, setDiscountRupees] = useState<number>(100);
  const [validDays, setValidDays] = useState<number>(7);
  const [paymentTerms, setPaymentTerms] = useState<string>('100% advance via UPI to confirm order');

  const [items, setItems] = useState<QuoteLineItem[]>([
    { id: '1', name: 'Handloom Soft Silk Saree (Bottle Green)', quantity: 1, rate: 2450, amount: 2450 },
    { id: '2', name: 'Matching Blouse Fabric with Zari border', quantity: 1, rate: 450, amount: 450 },
  ]);

  const [copied, setCopied] = useState<boolean>(false);

  const addItem = () => {
    const newItem: QuoteLineItem = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: 'name' | 'quantity' | 'rate', value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          updated.amount = (Number(updated.quantity) || 0) * (Number(updated.rate) || 0);
          return updated;
        }
        return item;
      })
    );
  };

  const quoteData: WhatsAppQuoteData = useMemo(() => {
    return {
      businessName,
      businessPhone,
      customerName,
      customerPhone,
      quoteNumber,
      items,
      deliveryCharge,
      discountRupees,
      upiId,
      paymentTerms,
      validDays,
    };
  }, [
    businessName,
    businessPhone,
    customerName,
    customerPhone,
    quoteNumber,
    items,
    deliveryCharge,
    discountRupees,
    upiId,
    paymentTerms,
    validDays,
  ]);

  const quoteText = useMemo(() => {
    return generateWhatsAppQuoteText(quoteData);
  }, [quoteData]);

  const shareUrl = useMemo(() => {
    return buildWhatsAppShareUrl(customerPhone, quoteText);
  }, [customerPhone, quoteText]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [items]);

  const grandTotal = subtotal + deliveryCharge - discountRupees;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-700 mt-0.5 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              1-Click WhatsApp Quotation Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Send clean, professional estimates to customers on WhatsApp with itemized pricing, delivery, discount, and your UPI payment ID.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-emerald-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Total Payable</div>
          <div className="text-xl font-black text-emerald-700">
            ₹{grandTotal.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Builder */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-indigo-600" />
              <span>Quote Details &amp; Items</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">Live Editor</span>
          </div>

          {/* Business & Customer Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 transition-all"
                placeholder="Business Name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your UPI ID for Payment</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 transition-all"
                placeholder="e.g. shopname@upi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 transition-all"
                placeholder="Customer Name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer WhatsApp Number</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 transition-all"
                placeholder="10-digit Mobile (e.g. 9841023456)"
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Product / Service Items
              </label>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200/90 rounded-2xl"
                >
                  <span className="text-xs font-extrabold text-slate-400 w-4 text-center">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="Product or service description"
                    className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:border-indigo-500"
                  />
                  <div className="w-16">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || ''}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      placeholder="Qty"
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-center text-slate-800"
                    />
                  </div>
                  <div className="w-24 relative">
                    <span className="absolute left-2 top-1.5 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={item.rate || ''}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                      placeholder="Rate"
                      className="w-full pl-5 pr-2 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-right"
                    />
                  </div>
                  <div className="w-20 text-right text-xs font-black text-slate-900 pr-1">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Discount */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Delivery / Courier Charge
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  value={deliveryCharge || ''}
                  onChange={(e) => setDeliveryCharge(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Special Discount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  value={discountRupees || ''}
                  onChange={(e) => setDiscountRupees(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live WhatsApp Message Preview & 1-Click Action */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                WhatsApp Chat Preview
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Ready to Send
              </span>
            </div>

            {/* Chat Bubble View */}
            <div className="bg-[#EFEAE2] p-4 rounded-2xl border border-slate-300/80 space-y-3 font-mono text-xs text-slate-800 whitespace-pre-wrap shadow-inner leading-relaxed select-all">
              {quoteText}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Send Estimate via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text Only'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
