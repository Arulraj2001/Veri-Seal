'use client';

import * as React from 'react';
import { Plus, Trash2, Printer, Download, CheckCircle, FileText } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function SpainInvoiceEngine() {
  const [invoiceNumber, setInvoiceNumber] = React.useState('FAC-2026-001');
  const [invoiceDate, setInvoiceDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = React.useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  // Emisor
  const [senderName, setSenderName] = React.useState('Carlos Morales Asesoría Digital');
  const [senderNif, setSenderNif] = React.useState('45871234B');
  const [senderAddress, setSenderAddress] = React.useState('Paseo de la Castellana 120, 28046 Madrid');
  const [senderIban, setSenderIban] = React.useState('ES91 2100 0418 4502 0005 1234');

  // Cliente
  const [clientName, setClientName] = React.useState('Innovación & Comercio S.L.');
  const [clientCif, setClientCif] = React.useState('B87654321');
  const [clientAddress, setClientAddress] = React.useState('Carrer de Balmes 45, 08007 Barcelona');

  // Items
  const [items, setItems] = React.useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'Servicios de consultoría y desarrollo web - Mes de Mayo',
      quantity: 1,
      unitPrice: 1500,
    },
    {
      id: '2',
      description: 'Mantenimiento preventivo mensual de servidores',
      quantity: 1,
      unitPrice: 350,
    },
  ]);

  // Tax rates
  const [ivaRate, setIvaRate] = React.useState<number>(21);
  const [irpfRate, setIrpfRate] = React.useState<number>(15);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(),
        description: 'Nuevo concepto o servicio prestado',
        quantity: 1,
        unitPrice: 100,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Calculations
  const subtotal = React.useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }, [items]);

  const ivaAmount = Math.round(subtotal * (ivaRate / 100) * 100) / 100;
  const irpfAmount = Math.round(subtotal * (irpfRate / 100) * 100) / 100;
  const total = Math.round((subtotal + ivaAmount - irpfAmount) * 100) / 100;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form Column (Hidden on print) */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs print:hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Datos de la Factura
            </span>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>

          {/* Factura Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nº Factura:</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Fecha Emisión:</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Emisor */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              Tus Datos (Emisor / Autónomo / Empresa)
            </span>
            <input
              type="text"
              placeholder="Nombre o Razón Social"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="NIF / CIF"
                value={senderNif}
                onChange={(e) => setSenderNif(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
              <input
                type="text"
                placeholder="IBAN Bancario"
                value={senderIban}
                onChange={(e) => setSenderIban(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
            </div>
            <input
              type="text"
              placeholder="Dirección Fiscal Completa"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
            />
          </div>

          {/* Cliente */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              Datos del Cliente (Receptor)
            </span>
            <input
              type="text"
              placeholder="Nombre o Razón Social del Cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="NIF / CIF Cliente"
                value={clientCif}
                onChange={(e) => setClientCif(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
              <input
                type="date"
                placeholder="Vencimiento"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900"
              />
            </div>
            <input
              type="text"
              placeholder="Dirección Fiscal Cliente"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
            />
          </div>

          {/* Impuestos */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              Tipos Impositivos (IVA e IRPF)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">IVA (%):</label>
                <select
                  value={ivaRate}
                  onChange={(e) => setIvaRate(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900"
                >
                  <option value={21}>21% (General)</option>
                  <option value={10}>10% (Reducido)</option>
                  <option value={4}>4% (Superreducido)</option>
                  <option value={0}>0% (Exento de IVA)</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Retención IRPF (%):</label>
                <select
                  value={irpfRate}
                  onChange={(e) => setIrpfRate(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900"
                >
                  <option value={15}>-15% (General Autónomo)</option>
                  <option value={7}>-7% (Nuevo Autónomo)</option>
                  <option value={0}>0% (Sin retención / A particular)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Live A4-Style Invoice Preview (Printable) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600">
                FACTURA ORDINARIA
              </span>
              <h2 className="text-2xl font-black text-slate-950 mt-1 font-mono">{invoiceNumber}</h2>
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <div>Fecha de emisión: <strong className="text-slate-800">{invoiceDate}</strong></div>
                <div>Fecha de vencimiento: <strong className="text-slate-800">{dueDate}</strong></div>
              </div>
            </div>
            <div className="text-right sm:text-right text-xs space-y-0.5 sm:max-w-xs">
              <div className="font-bold text-slate-900 text-sm">{senderName || 'Nombre Emisor'}</div>
              <div className="font-mono text-slate-600">NIF/CIF: {senderNif || '00000000X'}</div>
              <div className="text-slate-500 leading-tight">{senderAddress || 'Dirección fiscal'}</div>
            </div>
          </div>

          {/* Client Details */}
          <div className="py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between text-xs gap-4">
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                Facturado a:
              </span>
              <div className="font-bold text-slate-900 text-sm">{clientName || 'Cliente'}</div>
              <div className="font-mono text-slate-600">NIF/CIF: {clientCif || '00000000Y'}</div>
              <div className="text-slate-500">{clientAddress}</div>
            </div>
            {senderIban && (
              <div className="space-y-1 sm:text-right">
                <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                  Método de Pago:
                </span>
                <div className="text-slate-700">Transferencia Bancaria</div>
                <div className="font-mono text-xs font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/80 inline-block">
                  {senderIban}
                </div>
              </div>
            )}
          </div>

          {/* Line Items Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2">Concepto</th>
                  <th className="py-2 text-center w-16">Cant.</th>
                  <th className="py-2 text-right w-24">Precio</th>
                  <th className="py-2 text-right w-24 font-mono">Importe</th>
                  <th className="py-2 w-8 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="group">
                    <td className="py-3 pr-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full bg-transparent border-0 focus:ring-0 p-0 text-slate-900 font-medium text-xs"
                      />
                    </td>
                    <td className="py-3 px-1 text-center">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', Math.max(1, Number(e.target.value)))}
                        className="w-12 text-center bg-transparent border-0 focus:ring-0 p-0 font-mono text-xs font-bold"
                      />
                    </td>
                    <td className="py-3 px-1 text-right">
                      <input
                        type="number"
                        min={0}
                        step={10}
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                        className="w-20 text-right bg-transparent border-0 focus:ring-0 p-0 font-mono text-xs font-bold"
                      />
                    </td>
                    <td className="py-3 pl-2 text-right font-mono font-bold text-slate-900">
                      {(item.quantity * item.unitPrice).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                    </td>
                    <td className="py-3 text-right print:hidden">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length <= 1}
                        className="text-slate-300 hover:text-red-500 disabled:opacity-20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              onClick={addItem}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 print:hidden cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir otra línea</span>
            </button>
          </div>

          {/* Totals Section */}
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Imponible:</span>
                <span className="font-mono font-bold text-slate-900">
                  {subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IVA ({ivaRate}%):</span>
                <span className="font-mono font-bold text-slate-900">
                  +{ivaAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              {irpfRate > 0 && (
                <div className="flex justify-between text-orange-700">
                  <span>Retención IRPF (-{irpfRate}%):</span>
                  <span className="font-mono font-bold">
                    -{irpfAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-300 flex justify-between text-sm sm:text-base font-black text-slate-950">
                <span>Total a Cobrar:</span>
                <span className="font-mono text-orange-600">
                  {total.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
              </div>
            </div>
          </div>

          {/* Footer Legal Clause */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center leading-normal">
            Factura emitida conforme al Real Decreto 1619/2012 por el que se aprueba el Reglamento de facturación y la Ley Crea y Crece de Facturación Electrónica.
          </div>
        </div>
      </div>
    </div>
  );
}

