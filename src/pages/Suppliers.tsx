import React, { useState } from 'react';
import { Plus, Search, Phone, Mail, MapPin, Star, Edit2, Trash2, Building2 } from 'lucide-react';
import { mockSuppliers } from '../data/mockData';

const typeConfig: Record<string, { label: string; color: string; emoji: string }> = {
  hotel: { label: 'Hotel/Lodge', color: 'bg-blue-100 text-blue-700', emoji: '🏨' },
  transport: { label: 'Transport', color: 'bg-green-100 text-green-700', emoji: '🚗' },
  guide: { label: 'Guide', color: 'bg-purple-100 text-purple-700', emoji: '🧑‍🏫' },
  activity_vendor: { label: 'Activity', color: 'bg-orange-100 text-orange-700', emoji: '🎯' },
  restaurant: { label: 'Restaurant', color: 'bg-red-100 text-red-700', emoji: '🍽️' },
  airline: { label: 'Airline', color: 'bg-indigo-100 text-indigo-700', emoji: '✈️' },
  insurance: { label: 'Insurance', color: 'bg-teal-100 text-teal-700', emoji: '🛡️' },
  other: { label: 'Other', color: 'bg-slate-100 text-slate-700', emoji: '📦' },
};

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = mockSuppliers.filter(s => {
    const matchesSearch = s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || s.supplierType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Suppliers</h1>
          <p className="text-slate-500 mt-1">Manage your vendor and supplier directory</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-sm"><Plus className="w-4 h-4" /> Add Supplier</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search suppliers..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-primary-500 outline-none">
            <option value="all">All Types</option>
            {Object.entries(typeConfig).map(([key, val]) => <option key={key} value={key}>{val.emoji} {val.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(supplier => {
          const config = typeConfig[supplier.supplierType];
          return (
            <div key={supplier.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">{config.emoji}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{supplier.companyName}</h3>
                    <p className="text-xs text-slate-500">{supplier.supplierCode}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2"><span className="text-slate-400">👤</span><span>{supplier.contactPerson}</span></div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" /><span>{supplier.phone}</span></div>
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" /><span className="truncate">{supplier.email}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{supplier.city}, {supplier.country}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < supplier.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
