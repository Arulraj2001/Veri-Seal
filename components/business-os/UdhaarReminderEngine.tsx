'use client';

import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Smartphone,
  Copy,
  Check,
  Receipt,
  ArrowRight,
} from 'lucide-react';
import { UdhaarCustomerRecord, UdhaarTone } from '@/lib/business-os/types';
import {
  generateUdhaarReminderText,
  buildWhatsAppShareUrl,
} from '@/lib/business-os/operational-helpers';

export default function UdhaarReminderEngine() {
  const [businessName, setBusinessName] = useState<string>('National Provisions & Kirana');
  const [upiId, setUpiId] = useState<string>('nationalshop@okaxis');
  const [selectedTone, setSelectedTone] = useState<UdhaarTone>('friendly');

  const [records, setRecords] = useState<UdhaarCustomerRecord[]>([
    {
      id: '1',
      customerName: 'Ramesh Kumar',
      customerPhone: '9840112233',
      amountDue: 4850,
      daysOverdue: 18,
      lastPurchaseDate: '2026-08-24',
      notes: 'Monthly grocery bill pending',
    },
    {
      id: '2',
      customerName: 'Sunita Mehra',
      customerPhone: '9884022334',
      amountDue: 12400,
      daysOverdue: 42,
      lastPurchaseDate: '2026-07-31',
      notes: 'Custom tailoring order',
    },
    {
      id: '3',
      customerName: 'Anand Verma',
      customerPhone: '9791033445',
      amountDue: 6200,
      daysOverdue: 8,
      lastPurchaseDate: '2026-09-03',
      notes: 'Mobile repair display replacement',
    },
  ]);

  const [selectedRecordId, setSelectedRecordId] = useState<string>('1');
  const [copied, setCopied] = useState<boolean>(false);

  const activeRecord = useMemo(() => {
    return records.find((r) => r.id === selectedRecordId) || records[0];
  }, [records, selectedRecordId]);

  const totalOverdue = useMemo(() => {
    return records.reduce((sum, r) => sum + (Number(r.amountDue) || 0), 0);
  }, [records]);

  const addCustomer = () => {
    const newRec: UdhaarCustomerRecord = {
      id: Date.now().toString(),
      customerName: 'New Customer',
      customerPhone: '',
      amountDue: 2500,
      daysOverdue: 7,
      lastPurchaseDate: new Date().toISOString().split('T')[0],
      notes: '',
    };
    setRecords([...records, newRec]);
    setSelectedRecordId(newRec.id);
  };

  const removeCustomer = (id: string) => {
    if (records.length <= 1) return;
    const remaining = records.filter((r) => r.id !== id);
    setRecords(remaining);
    if (selectedRecordId === id) {
      setSelectedRecordId(remaining[0].id);
    }
  };

  const updateCustomer = (id: string, field: keyof UdhaarCustomerRecord, value: string | number) => {
    setRecords(
      records.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const messageText = useMemo(() => {
    if (!activeRecord) return '';
    return generateUdhaarReminderText(activeRecord, businessName, upiId, selectedTone);
  }, [activeRecord, businessName, upiId, selectedTone]);

  const shareUrl = useMemo(() => {
    if (!activeRecord) return '';
    return buildWhatsAppShareUrl(activeRecord.customerPhone, messageText);
  }, [activeRecord, messageText]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tones: { id: UdhaarTone; label: string; desc: string }[] = [
    { id: 'friendly', label: '1. Friendly / Gentle 🙏', desc: 'Best for regular customers & neighbors' },
    { id: 'polite_formal', label: '2. Formal & Business', desc: 'Standard monthly billing reconciliation' },
    { id: 'firm', label: '3. Firm (>30 Days)', desc: 'Direct request citing upcoming supplier bills' },
    { id: 'urgent', label: '4. Urgent / Final Notice', desc: 'Immediate settlement to avoid credit freeze' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-100 rounded-2xl text-amber-700 mt-0.5 shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Udhaar &amp; Overdue Ledger with 1-Click WhatsApp Reminders
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Never feel awkward asking for your own money. Pick the tone that fits your relationship and dispatch polite reminders with direct UPI payment links in 1 second.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-amber-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">Total Udhaar Pending</div>
          <div className="text-xl font-black text-rose-600">
            ₹{totalOverdue.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Ledger Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>Pending Debtors Ledger</span>
            </h3>
            <button
              type="button"
              onClick={addCustomer}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Customer</span>
            </button>
          </div>

          {/* Business details */}
          <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-100">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Shop / Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Settlement UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
              />
            </div>
          </div>

          {/* Records List */}
          <div className="space-y-2.5">
            {records.map((rec) => {
              const isSelected = selectedRecordId === rec.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecordId(rec.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-400 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-900">{rec.customerName}</span>
                      <span className="text-[11px] text-slate-500">({rec.customerPhone || 'No phone'})</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Overdue: <span className="font-bold text-amber-700">{rec.daysOverdue} days</span> • {rec.notes || 'General khata'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-black text-rose-600">
                        ₹{rec.amountDue.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Balance Due</span>
                    </div>

                    {records.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCustomer(rec.id);
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Edit Active Record Inline */}
          {activeRecord && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 pt-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Edit Selected Record: {activeRecord.customerName}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold mb-1">Name</label>
                  <input
                    type="text"
                    value={activeRecord.customerName}
                    onChange={(e) => updateCustomer(activeRecord.id, 'customerName', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={activeRecord.customerPhone}
                    onChange={(e) => updateCustomer(activeRecord.id, 'customerPhone', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={activeRecord.amountDue}
                    onChange={(e) => updateCustomer(activeRecord.id, 'amountDue', Number(e.target.value))}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold mb-1">Days Overdue</label>
                  <input
                    type="number"
                    value={activeRecord.daysOverdue}
                    onChange={(e) => updateCustomer(activeRecord.id, 'daysOverdue', Number(e.target.value))}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Tone Picker & WhatsApp Preview */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                Select Reminder Tone
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTone(t.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedTone === t.id
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-black">{t.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Bubble View */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                WhatsApp Preview for {activeRecord?.customerName}
              </span>
              <div className="bg-[#EFEAE2] p-4 rounded-2xl border border-slate-300/80 font-mono text-xs text-slate-800 whitespace-pre-wrap shadow-inner leading-relaxed select-all">
                {messageText}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send WhatsApp Reminder Now</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Message!' : 'Copy Message Text'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
