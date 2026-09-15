import React, { useState, useEffect } from 'react';
import { 
  Receipt, Plus, ArrowLeft, Building2, Users, FileMinus, RotateCcw,
  DollarSign, Calendar, CheckCircle, AlertCircle, Clock
} from 'lucide-react';
import { formatNepaliCurrency } from '../utils/currency';
import { db, COLLECTIONS } from '../services/database';
import { useSound } from '../context/SoundContext';
import type { DBInvoice } from '../services/database';

type InvoiceCategory = 'vendor_settlement' | 'client_settlement' | 'credit_notes' | 'refunds';

interface CategoryData {
  id: InvoiceCategory;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const categoryConfig: CategoryData[] = [
  {
    id: 'vendor_settlement',
    title: 'Vendor Settlement',
    description: 'Payments to vendors and suppliers',
    icon: Building2,
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  {
    id: 'client_settlement',
    title: 'Client Settlement',
    description: 'Payments received from clients',
    icon: Users,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  {
    id: 'credit_notes',
    title: 'Credit Notes',
    description: 'Credit adjustments and credits issued',
    icon: FileMinus,
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200'
  },
  {
    id: 'refunds',
    title: 'Refunds',
    description: 'Refund transactions processed',
    icon: RotateCcw,
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  }
];

export default function Invoices() {
  const { play } = useSound();
  const [view, setView] = useState<'menu' | 'category' | 'create'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<InvoiceCategory | null>(null);
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

  // Mock categorization - in real app, this would come from database
  const categorizeInvoices = (category: InvoiceCategory): DBInvoice[] => {
    // For demo, we'll use simple distribution
    switch (category) {
      case 'vendor_settlement':
        return invoices.filter((_, i) => i % 4 === 0);
      case 'client_settlement':
        return invoices.filter((_, i) => i % 4 === 1);
      case 'credit_notes':
        return invoices.filter((_, i) => i % 4 === 2);
      case 'refunds':
        return invoices.filter((_, i) => i % 4 === 3);
      default:
        return [];
    }
  };

  const getCategoryStats = (category: InvoiceCategory) => {
    const categoryInvoices = categorizeInvoices(category);
    const total = categoryInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const paid = categoryInvoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.totalAmount, 0);
    const pending = total - paid;
    
    return {
      count: categoryInvoices.length,
      total,
      paid,
      pending
    };
  };

  const statusColors: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-700 border-slate-200',
    sent: 'bg-blue-100 text-blue-700 border-blue-200',
    paid: 'bg-green-100 text-green-700 border-green-200',
    overdue: 'bg-red-100 text-red-700 border-red-200',
    partial: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
  };

  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Invoices</h1>
            <p className="text-slate-500 mt-1">Manage settlements, credit notes, and refunds</p>
          </div>
          <button 
            onClick={() => { play('click'); setView('create'); }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Create New
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {categoryConfig.map((category) => {
            const Icon = category.icon;
            const stats = getCategoryStats(category.id);
            
            return (
              <button
                key={category.id}
                onClick={() => { 
                  play('select');
                  setSelectedCategory(category.id);
                  setView('category');
                }}
                className="group bg-white rounded-3xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
                style={{ minHeight: '280px' }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-800 mb-1">{category.title}</h2>
                    <p className="text-slate-500 text-sm">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                    <div className={`text-center p-2 ${category.bgColor} rounded-lg`}>
                      <p className={`text-xl font-bold ${category.textColor}`}>{stats.count}</p>
                      <p className={`text-xs ${category.textColor} opacity-70`}>invoices</p>
                    </div>
                    <div className={`text-center p-2 ${category.bgColor} rounded-lg`}>
                      <p className={`text-sm font-bold ${category.textColor}`}>{formatNepaliCurrency(stats.total)}</p>
                      <p className={`text-xs ${category.textColor} opacity-70`}>total</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${category.textColor} font-medium text-sm group-hover:gap-3 transition-all`}>
                    <span>View Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'category' && selectedCategory) {
    const category = categoryConfig.find(c => c.id === selectedCategory)!;
    const categoryInvoices = categorizeInvoices(selectedCategory);
    const stats = getCategoryStats(selectedCategory);
    const Icon = category.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { play('click'); setView('menu'); setSelectedCategory(null); }} 
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{category.title}</h1>
                <p className="text-slate-500 mt-0.5">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`bg-white rounded-xl border-2 ${category.borderColor} p-5`}>
            <div className="flex items-center justify-between mb-2">
              <Receipt className={`w-8 h-8 ${category.textColor}`} />
              <span className={`text-xs font-medium ${category.textColor}`}>Total</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stats.count}</p>
            <p className="text-sm text-slate-500">Invoices</p>
          </div>
          <div className="bg-white rounded-xl border-2 border-green-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-xs font-medium text-green-600">Paid</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(stats.paid)}</p>
            <p className="text-sm text-slate-500">Settled</p>
          </div>
          <div className="bg-white rounded-xl border-2 border-amber-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-amber-600" />
              <span className="text-xs font-medium text-amber-600">Pending</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(stats.pending)}</p>
            <p className="text-sm text-slate-500">Outstanding</p>
          </div>
        </div>

        {/* Invoice List */}
        {categoryInvoices.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-12 text-center">
            <div className={`w-20 h-20 rounded-full ${category.bgColor} flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-10 h-10 ${category.textColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No invoices found</h3>
            <p className="text-slate-500">There are no invoices in this category yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Invoice</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categoryInvoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{invoice.invoiceNumber}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{invoice.clientName}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{invoice.invoiceDate}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-slate-800">
                      {formatNepaliCurrency(invoice.totalAmount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[invoice.status]}`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  if (view === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { play('click'); setView('menu'); }} 
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create New Invoice</h1>
            <p className="text-slate-500 mt-1">Generate a new invoice</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Type</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                  <option value="vendor_settlement">Vendor Settlement</option>
                  <option value="client_settlement">Client Settlement</option>
                  <option value="credit_notes">Credit Note</option>
                  <option value="refunds">Refund</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Client/Vendor</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Date</label>
                <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
              <textarea rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none resize-none" placeholder="Additional notes..." />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => { play('click'); setView('menu'); }} className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={() => { play('save'); setView('menu'); }} className="px-4 py-2 text-white bg-gradient-to-r from-[#f35500] to-[#c54300] rounded-lg hover:shadow-lg transition-all">Create Invoice</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
}
