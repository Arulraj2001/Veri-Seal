'use client';

import * as React from 'react';
import { Plus, Trash2, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function FranceFactureEngine() {
  const [invoiceNumber, setInvoiceNumber] = React.useState('FAC-2026-001');
  const [invoiceDate, setInvoiceDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = React.useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  // Émetteur
  const [senderName, setSenderName] = React.useState('Julien Laurent EI');
  const [senderSiret, setSenderSiret] = React.useState('849 321 098 00014');
  const [senderAddress, setSenderAddress] = React.useState('14 Rue de Rivoli, 75001 Paris');
  const [senderIban, setSenderIban] = React.useState('FR76 3000 4012 3456 7890 1234 567');

  // Client
  const [clientName, setClientName] = React.useState('Nexus Studio SAS');
  const [clientSiret, setClientSiret] = React.useState('912 345 678 00021');
  const [clientAddress, setClientAddress] = React.useState('25 Rue de la République, 69002 Lyon');

  // TVA franchise toggle
  const [isTvaExempt, setIsTvaExempt] = React.useState(true);
  const [tvaRate, setTvaRate] = React.useState<number>(20);

  // Items
  const [items, setItems] = React.useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'Prestation de conseil stratégique et développement web front-end',
      quantity: 5,
      unitPrice: 450,
    },
    {
      id: '2',
      description: 'Audit ergonomique et optimisation de la performance UI/UX',
      quantity: 1,
      unitPrice: 650,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(),
        description: 'Nouvelle prestation ou fourniture de service',
        quantity: 1,
        unitPrice: 200,
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

  const subtotal = React.useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }, [items]);

  const tvaAmount = isTvaExempt ? 0 : Math.round(subtotal * (tvaRate / 100) * 100) / 100;
  const total = Math.round((subtotal + tvaAmount) * 100) / 100;

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
              Paramètres de la Facture
            </span>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer / PDF</span>
            </button>
          </div>

          {/* Numéro et Date */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nº Facture :</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Date d'Émission :</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Émetteur */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              Vos Coordonnées (Auto-Entrepreneur)
            </span>
            <input
              type="text"
              placeholder="Prénom Nom EI (Mention EI obligatoire)"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Numéro SIRET (14 chiffres)"
                value={senderSiret}
                onChange={(e) => setSenderSiret(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
              <input
                type="text"
                placeholder="IBAN Bancaire"
                value={senderIban}
                onChange={(e) => setSenderIban(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
            </div>
            <input
              type="text"
              placeholder="Adresse professionnelle complète"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
            />
          </div>

          {/* Client */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
              Coordonnées du Client
            </span>
            <input
              type="text"
              placeholder="Nom ou Raison Sociale du Client"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="SIRET ou TVA Client"
                value={clientSiret}
                onChange={(e) => setClientSiret(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-slate-900"
              />
              <input
                type="date"
                placeholder="Date d'échéance"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900"
              />
            </div>
            <input
              type="text"
              placeholder="Adresse du Client"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
            />
          </div>

          {/* Franchise TVA */}
          <div className="pt-2 border-t border-slate-100 text-xs space-y-2">
            <label className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={isTvaExempt}
                onChange={(e) => setIsTvaExempt(e.target.checked)}
                className="rounded text-blue-600 focus:ring-0"
              />
              <span>Franchise en base de TVA (Art. 293 B du CGI)</span>
            </label>
            {!isTvaExempt && (
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded-xl">
                <span className="font-semibold text-blue-900">Taux de TVA applicable :</span>
                <select
                  value={tvaRate}
                  onChange={(e) => setTvaRate(Number(e.target.value))}
                  className="bg-white border border-blue-200 rounded-lg px-2 py-1 font-bold text-blue-950 text-xs"
                >
                  <option value={20}>20% (Normal)</option>
                  <option value={10}>10% (Intermédiaire)</option>
                  <option value={5.5}>5.5% (Réduit)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Live A4-Style Invoice Preview (Printable) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600">
                FACTURE
              </span>
              <h2 className="text-2xl font-black text-slate-950 mt-1 font-mono">{invoiceNumber}</h2>
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <div>Date d'émission : <strong className="text-slate-800">{invoiceDate}</strong></div>
                <div>Date limite de paiement : <strong className="text-slate-800">{dueDate}</strong></div>
              </div>
            </div>
            <div className="text-right sm:text-right text-xs space-y-0.5 sm:max-w-xs">
              <div className="font-bold text-slate-900 text-sm">{senderName || 'Prénom Nom EI'}</div>
              <div className="font-mono text-slate-600">SIRET : {senderSiret || '000 000 000 00000'}</div>
              <div className="text-slate-500 leading-tight">{senderAddress || 'Adresse professionnelle'}</div>
            </div>
          </div>

          {/* Client Details */}
          <div className="py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between text-xs gap-4">
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                Destinataire :
              </span>
              <div className="font-bold text-slate-900 text-sm">{clientName || 'Nom Client'}</div>
              <div className="font-mono text-slate-600">SIRET / TVA : {clientSiret || '—'}</div>
              <div className="text-slate-500">{clientAddress}</div>
            </div>
            {senderIban && (
              <div className="space-y-1 sm:text-right">
                <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                  Règlement par Virement :
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
                  <th className="py-2">Désignation de la Prestation</th>
                  <th className="py-2 text-center w-16">Qté</th>
                  <th className="py-2 text-right w-24">Prix Unit.</th>
                  <th className="py-2 text-right w-24 font-mono">Total HT</th>
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
                      {(item.quantity * item.unitPrice).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
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
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 print:hidden cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une ligne</span>
            </button>
          </div>

          {/* Totals Section */}
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Hors Taxes (HT) :</span>
                <span className="font-mono font-bold text-slate-900">
                  {subtotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </span>
              </div>
              {!isTvaExempt && (
                <div className="flex justify-between text-slate-600">
                  <span>TVA ({tvaRate}%) :</span>
                  <span className="font-mono font-bold text-slate-900">
                    +{tvaAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-300 flex justify-between text-sm sm:text-base font-black text-slate-950">
                <span>Total Net à Payer :</span>
                <span className="font-mono text-blue-600">
                  {total.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </span>
              </div>
            </div>
          </div>

          {/* Legal Clauses Mandated by French Law */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-[10px] text-slate-400 space-y-1 leading-normal">
            {isTvaExempt && (
              <p className="font-semibold text-slate-600">
                TVA non applicable, art. 293 B du Code Général des Impôts (CGI).
              </p>
            )}
            <p>
              Pénalités de retard : 3 fois le taux d'intérêt légal en vigueur. Indemnité forfaitaire pour frais de recouvrement en cas de retard de paiement : 40 € (articles L.441-10 et D.441-5 du Code de commerce). Aucun escompte consenti pour paiement anticipé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
