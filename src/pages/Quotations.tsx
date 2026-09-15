import React, { useState } from 'react';
import { FileText, Plus, Eye, Send, Printer, Edit2, Trash2 } from 'lucide-react';
import { mockQuotations, mockLeads } from '../data/mockData';

export default function Quotations() {
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);

  const statusColors: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-700', sent: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700', expired: 'bg-orange-100 text-orange-700',
  };

  const categoryIcons: Record<string, string> = {
    accommodation: '🏨', transportation: '🚗', activities: '🎯', guide_porter: '🧑‍🏫', flights: '✈️', meals: '🍽️', permits: '🎫', miscellaneous: '📦',
  };

  const handlePrint = () => {
    window.print();
  };

  if (selectedQuotation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedQuotation(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">←</button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{selectedQuotation.title}</h1>
              <p className="text-sm text-slate-500">{selectedQuotation.quotationNumber} • Valid until {new Date(selectedQuotation.validUntil).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><Printer className="w-4 h-4" /> Print / PDF</button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"><Send className="w-4 h-4" /> Send to Client</button>
          </div>
        </div>

        {/* Printable Quotation Document */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden print-container">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white print:bg-primary-700">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">QUOTATION</h2>
                <p className="text-primary-200 mt-1">{selectedQuotation.quotationNumber}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">TravelOps Pro</p>
                <p className="text-sm text-primary-200">Tour & Travel Management</p>
                <p className="text-xs text-primary-200 mt-1">info@travelops.pro | +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="p-8 border-b border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Prepared For</p>
                <p className="text-sm font-medium text-slate-800">{mockLeads.find(l => l.id === selectedQuotation.leadId)?.clientName || 'Client'}</p>
                <p className="text-sm text-slate-500">{mockLeads.find(l => l.id === selectedQuotation.leadId)?.clientCountry}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Date Issued</p>
                <p className="text-sm font-medium text-slate-800">{new Date(selectedQuotation.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-slate-500">Valid until {new Date(selectedQuotation.validUntil).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-primary-600">${selectedQuotation.totalAmount.toLocaleString()}</p>
                <p className="text-sm text-slate-500">{selectedQuotation.currency}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Cost Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Category</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Description</th>
                    <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Qty</th>
                    <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Unit Price</th>
                    <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Pax</th>
                    <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedQuotation.items.map((item: any) => (
                    <tr key={item.id}>
                      <td className="py-3 text-sm"><span className="mr-1">{categoryIcons[item.category]}</span><span className="capitalize text-slate-600">{item.category.replace('_', ' ')}</span></td>
                      <td className="py-3 text-sm text-slate-800">{item.description}</td>
                      <td className="py-3 text-sm text-right text-slate-600">{item.quantity} {item.unit}</td>
                      <td className="py-3 text-sm text-right text-slate-600">${item.unitPrice.toLocaleString()}</td>
                      <td className="py-3 text-sm text-right text-slate-600">{item.paxCount}</td>
                      <td className="py-3 text-sm text-right font-medium text-slate-800">${item.lineTotal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="w-72 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span className="text-slate-800">${selectedQuotation.subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Contingency ({selectedQuotation.contingencyPercent}%)</span><span className="text-slate-800">${selectedQuotation.contingencyAmount.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Profit Margin ({selectedQuotation.profitPercent}%)</span><span className="text-slate-800">${selectedQuotation.profitAmount.toLocaleString()}</span></div>
                <div className="border-t border-slate-200 pt-2 flex justify-between"><span className="text-base font-semibold text-slate-800">Total</span><span className="text-lg font-bold text-primary-600">${selectedQuotation.totalAmount.toLocaleString()}</span></div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-2">✓ Inclusions</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedQuotation.inclusions}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-700 mb-2">✗ Exclusions</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedQuotation.exclusions}</p>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Terms & Conditions</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{selectedQuotation.termsConditions}</p>
          </div>

          <div className="p-6 bg-primary-50 border-t border-primary-100 text-center">
            <p className="text-sm text-primary-700 font-medium">Thank you for choosing TravelOps Pro!</p>
            <p className="text-xs text-primary-600 mt-1">For questions, contact us at info@travelops.pro or +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quotations</h1>
          <p className="text-slate-500 mt-1">Create and manage client quotations with detailed costing</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-sm"><Plus className="w-4 h-4" /> New Quotation</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Quotation</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Client</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Valid Until</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockQuotations.map(q => (
              <tr key={q.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedQuotation(q)}>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-800">{q.quotationNumber}</p>
                  <p className="text-xs text-slate-500">{q.title}</p>
                </td>
                <td className="px-4 py-3"><p className="text-sm text-slate-600">{mockLeads.find(l => l.id === q.leadId)?.clientName}</p></td>
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">${q.totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">{q.currency}</p>
                </td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[q.status]}`}>{q.status}</span></td>
                <td className="px-4 py-3"><p className="text-sm text-slate-600">{new Date(q.validUntil).toLocaleDateString()}</p></td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
