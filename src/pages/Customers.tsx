import React, { useState, useEffect } from 'react';
import { Users, Plus, Mail, Phone, MapPin, Calendar, ArrowLeft, UserPlus, UserCheck } from 'lucide-react';
import { formatNepaliCurrency } from '../utils/currency';
import { db, COLLECTIONS } from '../services/database';
import type { DBLead } from '../services/database';

export default function Customers() {
  const [view, setView] = useState<'menu' | 'directory' | 'add'>('menu');
  const [customers, setCustomers] = useState<DBLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = () => {
      try {
        const leads = db.findAll<DBLead>(COLLECTIONS.LEADS);
        setCustomers(leads);
      } catch (error) {
        console.error('Failed to load customers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
          <p className="text-slate-500 mt-1">Manage your customer relationships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => setView('directory')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Customer Directory</h2>
                <p className="text-slate-500 text-sm">View and manage all customers</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-2xl font-bold text-primary-600">{customers.length}</span>
                <span className="text-sm text-primary-500">customers</span>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Directory</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => setView('add')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Add Customer</h2>
                <p className="text-slate-500 text-sm">Register a new customer</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Contact information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Booking history</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Preferences & notes</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Add Customer</span>
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

  if (view === 'directory') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Customer Directory</h1>
              <p className="text-slate-500 mt-1">All registered customers</p>
            </div>
          </div>
          <button onClick={() => setView('add')} className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]">
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer: any) => (
            <div key={customer.id} className="bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center text-white font-bold">
                    {customer.clientName.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{customer.clientName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {customer.clientCountry}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" /><span className="truncate">{customer.clientEmail}</span></div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" /><span>{customer.clientPhone}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-slate-400">Status</p>
                  <p className="text-sm font-semibold text-[#012871]">{customer.status}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Budget</p>
                  <p className="text-sm font-semibold text-[#f35500]">{formatNepaliCurrency(customer.budgetMax || 0)}</p>
                </div>
              </div>
            </div>
          ))}
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
          <h1 className="text-2xl font-bold text-slate-800">Add Customer</h1>
          <p className="text-slate-500 mt-1">Register a new customer</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="John Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input type="tel" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="+1 234 567 890" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="United States" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none resize-none" placeholder="Customer preferences, special requirements..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setView('menu')} className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="button" onClick={() => setView('directory')} className="px-4 py-2 text-white bg-[#f35500] rounded-lg hover:bg-[#c54300]">Save Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
