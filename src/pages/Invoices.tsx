import React, { useState } from 'react';
import { Receipt, Plus, Eye, DollarSign, Clock, CheckCircle, Printer, CreditCard, Download } from 'lucide-react';
import { mockInvoices } from '../data/mockData';

export default function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const totalInvoiced = mockInvoices.reduce((s, i) => s + i.totalAmount, 0);
  const totalReceived = mockInvoices.reduce((s, i) => s + i.payments.reduce((ps, p) => ps + p.amount, 0), 0);

  const handlePrint = () => { window.print(); };

  if (selectedInvoice) {
    const paidAmount = selectedInvoice.payments.reduce((s: number, p: any) => s + p.amount, 0);
    const balance = selectedInvoice.totalAmount - paidAmount;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedInvoice(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">←</button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{selectedInvoice.invoiceNumber}</h1>
              <p className="text-sm text-slate-500">{selectedInvoice.clientName} • {selectedInvoice.bookingNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><Printer className="w-4 h-4" /> Print / PDF</button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"><CreditCard className="w-4 h-4" /> Record Payment</button>
          </div>
        </div>

        {/* Printable Invoice */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden print-container">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">INVOICE</h2>
                <p className="text-primary-200 mt-1">{selectedInvoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">TravelOps Pro</p>
                <p className="text-sm text-primary-200">123 Travel Lane, Suite 100</p>
                <p className="text-sm text-primary-200">New York, NY 10001</p>
                <p className="text-sm text-primary-200 mt-1">info@travelops.pro | +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="p-8 border-b border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Bill To</p>
                <p className="text-sm font-medium text-slate-800">{selectedInvoice.clientName}</p>
                <p className="text-sm text-slate-500">Booking: {selectedInvoice.bookingNumber}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Invoice Date</p>
                <p className="text-sm font-medium text-slate-800">{new Date(selectedInvoice.invoiceDate).toLocaleDateString()}</p>
                <p className="text-sm text-slate-500">Due: {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Amount Due</p>
                <p className="text-2xl font-bold text-primary-600">${balance.toLocaleString()}</p>
                <p className="text-sm text-slate-500">of ${selectedInvoice.totalAmount.toLocaleString()} total</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span className="text-slate-800">${selectedInvoice.subtotal.toLocaleString()}</span></div>
              {selectedInvoice.taxAmount > 0 && <div className="flex justify-between text-sm"><span className="text-slate-500">Tax ({selectedInvoice.taxPercent}%)</span><span className="text-slate-800">${selectedInvoice.taxAmount.toLocaleString()}</span></div>}
              {selectedInvoice.discountAmount > 0 && <div className="flex justify-between text-sm"><span className="text-slate-500">Discount</span><span className="text-red-600">-${selectedInvoice.discountAmount.toLocaleString()}</span></div>}
              <div className="border-t border-slate-200 pt-3 flex justify-between"><span className="text-base font-semibold text-slate-800">Total</span><span className="text-lg font-bold text-primary-600">${selectedInvoice.totalAmount.toLocaleString()}</span></div>
            </div>

            {/* Payment History */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Payment History</h3>
              {selectedInvoice.payments.length > 0 ? (
                <div className="space-y-3">
                  {selectedInvoice.payments.map((payment: any) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600" /></div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">${payment.amount.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">{payment.paymentMethod.replace('_', ' ')} • Ref: {payment.referenceNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">{new Date(payment.paymentDate).toLocaleDateString()}</p>
                        <p className="text-xs text-slate-400">{payment.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-4">No payments recorded yet</p>
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-6 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Payment Instructions</h4>
            <div className="text-xs text-slate-500 space-y-1">
              <p>Bank: First National Bank | Account: 1234567890 | SWIFT: FNBKUS33</p>
              <p>Please reference invoice number {selectedInvoice.invoiceNumber} when making payment.</p>
            </div>
          </div>

          <div className="p-4 bg-primary-50 border-t border-primary-100 text-center">
            <p className="text-sm text-primary-700 font-medium">Thank you for your business!</p>
            <p className="text-xs text-primary-600 mt-1">TravelOps Pro — Tour & Travel Management</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Invoices & Payments</h1>
          <p className="text-slate-500 mt-1">Track client billing, payments, and profitability</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-sm"><Plus className="w-4 h-4" /> New Invoice</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><Receipt className="w-4 h-4 text-blue-600" /></div><p className="text-sm text-slate-500">Total Invoiced</p></div>
          <p className="text-2xl font-bold text-slate-800">${totalInvoiced.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600" /></div><p className="text-sm text-slate-500">Total Received</p></div>
          <p className="text-2xl font-bold text-green-600">${totalReceived.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center"><Clock className="w-4 h-4 text-yellow-600" /></div><p className="text-sm text-slate-500">Pending</p></div>
          <p className="text-2xl font-bold text-yellow-600">${(totalInvoiced - totalReceived).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center"><DollarSign className="w-4 h-4 text-purple-600" /></div><p className="text-sm text-slate-500">Collection Rate</p></div>
          <p className="text-2xl font-bold text-purple-600">{totalInvoiced > 0 ? Math.round((totalReceived / totalInvoiced) * 100) : 0}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Invoice</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Booking</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Paid</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockInvoices.map(invoice => {
                const paidAmount = invoice.payments.reduce((s, p) => s + p.amount, 0);
                const progress = invoice.totalAmount > 0 ? (paidAmount / invoice.totalAmount) * 100 : 0;
                const statusColors: Record<string, string> = { draft: 'bg-slate-100 text-slate-700', sent: 'bg-blue-100 text-blue-700', partial: 'bg-yellow-100 text-yellow-700', paid: 'bg-green-100 text-green-700', overdue: 'bg-red-100 text-red-700', cancelled: 'bg-slate-100 text-slate-500' };
                return (
                  <tr key={invoice.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedInvoice(invoice)}>
                    <td className="px-4 py-4"><p className="text-sm font-medium text-slate-800">{invoice.invoiceNumber}</p><p className="text-xs text-slate-400">Due: {invoice.dueDate}</p></td>
                    <td className="px-4 py-4"><p className="text-sm text-slate-700">{invoice.clientName}</p></td>
                    <td className="px-4 py-4"><p className="text-sm text-slate-600">{invoice.bookingNumber}</p></td>
                    <td className="px-4 py-4 text-right"><p className="text-sm font-semibold text-slate-800">${invoice.totalAmount.toLocaleString()}</p></td>
                    <td className="px-4 py-4 text-right">
                      <p className="text-sm font-medium text-green-600">${paidAmount.toLocaleString()}</p>
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 mt-1"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${progress}%` }} /></div>
                    </td>
                    <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>{invoice.status}</span></td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Printer className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
