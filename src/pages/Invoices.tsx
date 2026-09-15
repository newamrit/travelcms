import React, { useState, useEffect } from 'react';
import { Receipt, Plus, DollarSign, Clock, CheckCircle, AlertTriangle, ArrowLeft, FileText, CreditCard } from 'lucide-react';
import { formatNepaliCurrency } from '../utils/currency';
import { db, COLLECTIONS } from '../services/database';
import type { DBInvoice } from '../services/database';

const statusColors: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-700 border-slate-200',
  sent: 'bg-blue-100 text-blue-700 border-blue-200',
  paid: 'bg-green-100 text-green-700 border-green-200',
  overdue: 'bg-red-100 text-red-700 border-red-200',
  partial: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
};

export default function Invoices() {
  const [view, setView] = useState<'menu' | 'issued' | 'create'>('menu');
  const [invoices, setInvoices] = useState<DBInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = () => {
      try {
        const data = db.findAll<DBInvoice>(COLLECTIONS.INVOICES);
        setInvoices(data);
      } catch (error) {
        console.error('Failed to load invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
  }, []);

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.totalAmount, 0);
  const pendingAmount = invoices.filter(i => ['sent', 'overdue', 'partial'].includes(i.status)).reduce((sum, i) => sum + i.totalAmount, 0);

  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Invoices</h1>
          <p className="text-slate-500 mt-1">Manage billing and payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => setView('issued')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Issued Invoices</h2>
                <p className="text-slate-500 text-sm">View and manage all invoices</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">{formatNepaliCurrency(totalRevenue)}</p>
                  <p className="text-xs text-green-600">Paid</p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <p className="text-lg font-bold text-amber-600">{formatNepaliCurrency(pendingAmount)}</p>
                  <p className="text-xs text-amber-600">Pending</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Invoices</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => setView('create')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Invoice</h2>
                <p className="text-slate-500 text-sm">Generate a new invoice for a client</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Auto-calculate totals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Payment tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>PDF export</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Create Invoice</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (view === 'issued') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Issued Invoices</h1>
              <p className="text-slate-500 mt-1">All invoices and payment status</p>
            </div>
          </div>
          <button onClick={() => setView('create')} className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]">
            <Plus className="w-4 h-4" /> New Invoice
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Invoice</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Client</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((invoice: DBInvoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{invoice.invoiceNumber}</p>
                    <p className="text-xs text-slate-400">Issued: {invoice.invoiceDate}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{invoice.clientName}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-slate-800">{formatNepaliCurrency(invoice.totalAmount)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[invoice.status]}`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{invoice.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Create Invoice</h1>
          <p className="text-slate-500 mt-1">Generate a new invoice</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                <option>Select client...</option>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
                <option>Michael Brown</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
              <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Issue Date</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none resize-none" placeholder="Invoice description..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setView('menu')} className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="button" onClick={() => setView('issued')} className="px-4 py-2 text-white bg-[#f35500] rounded-lg hover:bg-[#c54300]">Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
}
