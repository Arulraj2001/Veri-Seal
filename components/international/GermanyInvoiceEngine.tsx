'use client';

import * as React from 'react';
import { Plus, Trash2, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function GermanyInvoiceEngine() {
  const [invoiceNumber, setInvoiceNumber] = React.useState('RE-2026-001');
  const [invoiceDate, setInvoiceDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [deliveryDate, setDeliveryDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = React.useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  // Aussteller
  const [senderName, setSenderName] = React.useState('Maximilian Weber IT-Consulting');
  const [senderTaxNumber, setSenderTaxNumber] = React.useState('143/214/80125');
  const [senderAddress, setSenderAddress] = React.useState('Friedrichstraße 176, 10117 Berlin');
  const [senderIban, setSenderIban] = React.useState('DE89 1005 0000 1067 8945 23');
  const [senderBic, setSenderBic] = React.useState('BELADEB1XXX');

  // Empfänger
  const [clientName, setClientName] = React.useState('Digital Solutions GmbH');
  const [clientVatId, setClientVatId] = React.useState('DE298765432');
  const [clientAddress, setClientAddress] = React.useState('Kaufingerstraße 24, 80331 München');

  // Items
  const [items, setItems] = React.useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'Beratung und Entwicklung von Software-Schnittstellen (API)',
      quantity: 12,
      unitPrice: 95,
    },
    {
      id: '2',
      description: 'Einrichtung und Konfiguration der Cloud-Infrastruktur',
      quantity: 1,
      unitPrice: 480,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(),
        description: 'Neue Dienstleistung oder Warenlieferung',
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

  const total = React.useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }, [items]);

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
              Rechnungsdaten eingeben
            </span>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drucken / PDF</span>
            </button>
          </div>

          {/* Rechnungsnummer & Datum */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Rechnungsnummer:</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Rechnungsdatum:</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Rechnungssteller (Kleinunternehmer) */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              Ihre Daten (Rechnungsaussteller)
            </span>
            <input
              type="text"
              placeholder="Vor- und Nachname / Firmenname"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Steuernummer (Finanzamt)"
                value={senderTaxNumber}
                onChange={(e) => setSenderTaxNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
              <input
                type="text"
                placeholder="IBAN Bankverbindung"
                value={senderIban}
                onChange={(e) => setSenderIban(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
            </div>
            <input
              type="text"
              placeholder="Vollständige Anschrift"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
            />
          </div>

          {/* Kunde / Rechnungsempfänger */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              Rechnungsempfänger (Kunde)
            </span>
            <input
              type="text"
              placeholder="Firma oder Kundenname"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="USt-IdNr. des Kunden (optional)"
                value={clientVatId}
                onChange={(e) => setClientVatId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
              <input
                type="date"
                placeholder="Zahlbar bis"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900"
              />
            </div>
            <input
              type="text"
              placeholder="Kundenanschrift"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
            />
          </div>

          {/* § 19 UStG Hinweis Box */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs space-y-1">
            <span className="font-bold text-amber-900 block">Gesetzlicher Kleinunternehmer-Hinweis (§ 19 UStG):</span>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Es wird keine Umsatzsteuer ausgewiesen. Dieser Pflichttext wird automatisch auf der Rechnung vermerkt.
            </p>
          </div>
        </div>

        {/* Live A4-Style Invoice Preview (Printable) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-600">
                RECHNUNG
              </span>
              <h2 className="text-2xl font-black text-slate-950 mt-1 font-mono">{invoiceNumber}</h2>
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <div>Rechnungsdatum: <strong className="text-slate-800">{invoiceDate}</strong></div>
                <div>Leistungszeitpunkt: <strong className="text-slate-800">{deliveryDate}</strong></div>
                <div>Fälligkeit: <strong className="text-slate-800">{dueDate}</strong></div>
              </div>
            </div>
            <div className="text-right sm:text-right text-xs space-y-0.5 sm:max-w-xs">
              <div className="font-bold text-slate-900 text-sm">{senderName || 'Firmenname'}</div>
              <div className="font-mono text-slate-600">Steuernummer: {senderTaxNumber || '00/000/00000'}</div>
              <div className="text-slate-500 leading-tight">{senderAddress || 'Anschrift'}</div>
            </div>
          </div>

          {/* Customer */}
          <div className="py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between text-xs gap-4">
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                Rechnungsempfänger:
              </span>
              <div className="font-bold text-slate-900 text-sm">{clientName || 'Kunde'}</div>
              {clientVatId && <div className="font-mono text-slate-600">USt-IdNr.: {clientVatId}</div>}
              <div className="text-slate-500">{clientAddress}</div>
            </div>
            {senderIban && (
              <div className="space-y-1 sm:text-right">
                <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                  Bankverbindung (Überweisung):
                </span>
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
                  <th className="py-2">Bezeichnung der Leistung</th>
                  <th className="py-2 text-center w-16">Menge</th>
                  <th className="py-2 text-right w-24">Einzelpreis</th>
                  <th className="py-2 text-right w-24 font-mono">Gesamtbetrag</th>
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
                      {(item.quantity * item.unitPrice).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
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
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 print:hidden cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Position hinzufügen</span>
            </button>
          </div>

          {/* Totals Section */}
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Nettobetrag:</span>
                <span className="font-mono font-bold text-slate-900">
                  {total.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Umsatzsteuer (0%):</span>
                <span className="font-mono">0,00 €</span>
              </div>
              <div className="pt-2 border-t border-slate-300 flex justify-between text-sm sm:text-base font-black text-slate-950">
                <span>Zahlungsbetrag:</span>
                <span className="font-mono text-amber-600">
                  {total.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </span>
              </div>
            </div>
          </div>

          {/* § 19 UStG Statutory Mandatory Note */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-600 space-y-1.5 leading-normal">
            <p className="font-semibold text-slate-800">
              Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).
            </p>
            <p className="text-[10px] text-slate-400">
              Bitte überweisen Sie den Rechnungsbetrag bis zum {dueDate} auf das angegebene Bankkonto unter Angabe der Rechnungsnummer {invoiceNumber}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
