'use client';

import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  IndianRupee,
  Package,
  TrendingUp,
  Receipt,
  Search,
  Filter,
} from 'lucide-react';
import { WhatsAppOrderItem, OrderPaymentStatus, OrderFulfillmentStatus } from '@/lib/business-os/types';

export default function WhatsAppOrderEngine() {
  const [orders, setOrders] = useState<WhatsAppOrderItem[]>([
    {
      id: '1',
      orderNumber: 'ORD-101',
      customerName: 'Ananya Rao',
      customerPhone: '9841234567',
      itemsSummary: 'Kundan Choker Set + Jhumkas',
      totalSellingPrice: 1850,
      productCost: 720,
      shippingCharge: 70,
      paymentStatus: 'paid_online',
      fulfillmentStatus: 'delivered',
      dateCreated: '2026-09-10',
    },
    {
      id: '2',
      orderNumber: 'ORD-102',
      customerName: 'Kavita Singh',
      customerPhone: '9819234567',
      itemsSummary: 'Handmade Scented Soy Candle (Lavender)',
      totalSellingPrice: 650,
      productCost: 210,
      shippingCharge: 60,
      paymentStatus: 'cod_pending',
      fulfillmentStatus: 'shipped',
      dateCreated: '2026-09-11',
    },
    {
      id: '3',
      orderNumber: 'ORD-103',
      customerName: 'Meera Patel',
      customerPhone: '9723234567',
      itemsSummary: 'Block Print Cotton Kurti (Size M)',
      totalSellingPrice: 1299,
      productCost: 520,
      shippingCharge: 65,
      paymentStatus: 'paid_online',
      fulfillmentStatus: 'packed',
      dateCreated: '2026-09-11',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'paid' | 'cod' | 'pending_delivery'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add order form states
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newItems, setNewItems] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number>(999);
  const [newCost, setNewCost] = useState<number>(400);
  const [newShipping, setNewShipping] = useState<number>(65);
  const [newPaymentStatus, setNewPaymentStatus] = useState<OrderPaymentStatus>('paid_online');

  const addOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newOrd: WhatsAppOrderItem = {
      id: Date.now().toString(),
      orderNumber: `ORD-${orders.length + 104}`,
      customerName: newName,
      customerPhone: newPhone,
      itemsSummary: newItems || 'Custom order',
      totalSellingPrice: Number(newPrice) || 0,
      productCost: Number(newCost) || 0,
      shippingCharge: Number(newShipping) || 0,
      paymentStatus: newPaymentStatus,
      fulfillmentStatus: 'new',
      dateCreated: new Date().toISOString().split('T')[0],
    };
    setOrders([newOrd, ...orders]);
    setNewName('');
    setNewPhone('');
    setNewItems('');
    setShowAddModal(false);
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const updateStatus = (
    id: string,
    field: 'paymentStatus' | 'fulfillmentStatus',
    val: OrderPaymentStatus | OrderFulfillmentStatus
  ) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, [field]: val } : o))
    );
  };

  // Metrics
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.itemsSummary.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;
      if (activeFilter === 'paid') return o.paymentStatus === 'paid_online';
      if (activeFilter === 'cod') return o.paymentStatus === 'cod_pending';
      if (activeFilter === 'pending_delivery') return o.fulfillmentStatus !== 'delivered';
      return true;
    });
  }, [orders, searchQuery, activeFilter]);

  const metrics = useMemo(() => {
    const totalSales = orders.reduce((sum, o) => sum + o.totalSellingPrice, 0);
    const totalCogs = orders.reduce((sum, o) => sum + o.productCost, 0);
    const totalShipping = orders.reduce((sum, o) => sum + o.shippingCharge, 0);
    const totalNetProfit = totalSales - totalCogs - totalShipping;
    const codPendingAmount = orders
      .filter((o) => o.paymentStatus === 'cod_pending')
      .reduce((sum, o) => sum + o.totalSellingPrice, 0);

    return {
      totalOrders: orders.length,
      totalSales,
      totalNetProfit,
      codPendingAmount,
      marginPercent: totalSales > 0 ? Number(((totalNetProfit / totalSales) * 100).toFixed(1)) : 0,
    };
  }, [orders]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-indigo-100 rounded-2xl text-indigo-700 mt-0.5 shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              WhatsApp &amp; Chat Commerce Order Manager
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Track DM orders from Instagram and WhatsApp with automatic product COGS, shipping deduction, and live net profit tracking.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Order</span>
        </button>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Orders Logged
          </span>
          <div className="text-2xl font-black text-slate-900">{metrics.totalOrders}</div>
          <span className="text-[10px] text-slate-400 font-semibold">In-browser memory</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Gross Sales Volume
          </span>
          <div className="text-2xl font-black text-slate-900">
            ₹{metrics.totalSales.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">Total turnover</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
            Real Net Profit
          </span>
          <div className="text-2xl font-black text-emerald-600">
            ₹{metrics.totalNetProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-700 font-extrabold">{metrics.marginPercent}% Net Margin</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            COD Pending In Transit
          </span>
          <div className="text-2xl font-black text-amber-700">
            ₹{metrics.codPendingAmount.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-amber-800 font-semibold">Awaiting doorstep collection</span>
        </div>
      </div>

      {/* Main Order Registry */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customer or item..."
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'paid', label: 'Prepaid (UPI)' },
              { id: 'cod', label: 'COD Unpaid' },
              { id: 'pending_delivery', label: 'In Transit' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs font-medium">
              No matching orders found. Log an order above!
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const orderProfit = ord.totalSellingPrice - ord.productCost - ord.shippingCharge;
              return (
                <div
                  key={ord.id}
                  className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        {ord.orderNumber}
                      </span>
                      <span className="font-extrabold text-sm text-slate-900">{ord.customerName}</span>
                      <span className="text-xs text-slate-500">({ord.customerPhone})</span>
                    </div>
                    <p className="text-xs text-slate-600">{ord.itemsSummary}</p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>Logged on: {ord.dateCreated}</span>
                      <span>•</span>
                      <span>Product Cost: ₹{ord.productCost}</span>
                      <span>•</span>
                      <span>Shipping: ₹{ord.shippingCharge}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    {/* Status Selectors */}
                    <select
                      value={ord.paymentStatus}
                      onChange={(e) => updateStatus(ord.id, 'paymentStatus', e.target.value as any)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                        ord.paymentStatus === 'paid_online'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="paid_online">Paid (Online / UPI)</option>
                      <option value="cod_pending">COD (Unpaid)</option>
                      <option value="credit_udhaar">Credit (Udhaar)</option>
                    </select>

                    <select
                      value={ord.fulfillmentStatus}
                      onChange={(e) => updateStatus(ord.id, 'fulfillmentStatus', e.target.value as any)}
                      className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="rto_returned">RTO Returned</option>
                    </select>

                    {/* Order Profit */}
                    <div className="text-right pl-2">
                      <div className="text-sm font-black text-slate-900">
                        ₹{ord.totalSellingPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] font-extrabold text-emerald-600">
                        +₹{orderProfit.toLocaleString('en-IN')} profit
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteOrder(ord.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Quick Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Log New WhatsApp Order</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={addOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Shalini Roy"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Phone</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Item Description</label>
                <input
                  type="text"
                  value={newItems}
                  onChange={(e) => setNewItems(e.target.value)}
                  placeholder="e.g. 1kg Belgian Chocolate Cake"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={newPrice || ''}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cost (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newCost || ''}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Courier (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newShipping || ''}
                    onChange={(e) => setNewShipping(Number(e.target.value))}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Status</label>
                <select
                  value={newPaymentStatus}
                  onChange={(e) => setNewPaymentStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="paid_online">Paid (Online / UPI)</option>
                  <option value="cod_pending">COD (Pending Delivery)</option>
                  <option value="credit_udhaar">Customer Udhaar</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xs"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
