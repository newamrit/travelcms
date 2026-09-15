import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, LayoutGrid, List, ChevronRight, Globe, Users, DollarSign, Calendar } from 'lucide-react';
import { mockLeads } from '../data/mockData';
import { Lead, LeadStatus } from '../types';

const statusConfig: Record<LeadStatus, { label: string; color: string; bgColor: string; borderColor: string }> = {
  new: { label: 'New', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  contacted: { label: 'Contacted', color: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  requirements_gathered: { label: 'Requirements', color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  quoting: { label: 'Quoting', color: 'text-indigo-700', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  negotiation: { label: 'Negotiation', color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  won: { label: 'Won', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  lost: { label: 'Lost', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
};

const priorityColors: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600', medium: 'bg-blue-100 text-blue-600',
  high: 'bg-orange-100 text-orange-600', urgent: 'bg-red-100 text-red-600',
};

export default function Customers() {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.leadNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses: LeadStatus[] = ['new', 'contacted', 'requirements_gathered', 'quoting', 'negotiation', 'won', 'lost'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customer Management</h1>
          <p className="text-slate-500 mt-1">Track and manage your customers through the sales pipeline</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-sm">
          <Plus className="w-4 h-4" /> New Customer
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by name, email, or customer number..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-primary-500 outline-none">
            <option value="all">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{statusConfig[s].label}</option>)}
          </select>
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('kanban')} className={`p-2 ${viewMode === 'kanban' ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:bg-slate-50'}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('table')} className={`p-2 ${viewMode === 'table' ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:bg-slate-50'}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {statuses.map(status => {
              const statusLeads = filteredLeads.filter(l => l.status === status);
              const config = statusConfig[status];
              return (
                <div key={status} className="w-72 flex-shrink-0">
                  <div className={`rounded-t-lg px-3 py-2 ${config.bgColor} border ${config.borderColor} border-b-0`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bgColor} ${config.color} border ${config.borderColor}`}>{statusLeads.length}</span>
                    </div>
                  </div>
                  <div className={`bg-slate-50 rounded-b-lg border ${config.borderColor} p-2 space-y-2 min-h-[200px]`}>
                    {statusLeads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
                    {statusLeads.length === 0 && <div className="text-center py-8 text-sm text-slate-400">No customers</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Travel</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Budget</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link to={`/customers/${lead.id}`} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">{lead.clientName.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{lead.clientName}</p>
                          <p className="text-xs text-slate-500">{lead.leadNumber}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-600">{lead.clientEmail}</p>
                      <p className="text-xs text-slate-400">{lead.clientCountry}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-600">{lead.paxAdults}A + {lead.paxChildren}C</p>
                      <p className="text-xs text-slate-400">{lead.travelDateFrom ? new Date(lead.travelDateFrom).toLocaleDateString() : 'TBD'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-600">${lead.budgetMin?.toLocaleString()} - ${lead.budgetMax?.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[lead.status].bgColor} ${statusConfig[lead.status].color}`}>{statusConfig[lead.status].label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>{lead.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  return (
    <Link to={`/customers/${lead.id}`} className="block bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all hover:border-primary-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">{lead.clientName.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <p className="text-sm font-medium text-slate-800 leading-tight">{lead.clientName}</p>
            <p className="text-xs text-slate-400">{lead.leadNumber}</p>
          </div>
        </div>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityColors[lead.priority]}`}>{lead.priority}</span>
      </div>
      <div className="space-y-1.5 text-xs text-slate-500">
        <div className="flex items-center gap-1.5"><Globe className="w-3 h-3" /><span>{lead.clientCountry}</span></div>
        <div className="flex items-center gap-1.5"><Users className="w-3 h-3" /><span>{lead.paxAdults} Adults, {lead.paxChildren} Children</span></div>
        <div className="flex items-center gap-1.5"><DollarSign className="w-3 h-3" /><span>${lead.budgetMin?.toLocaleString()} - ${lead.budgetMax?.toLocaleString()}</span></div>
        <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /><span>{lead.travelDateFrom ? new Date(lead.travelDateFrom).toLocaleDateString() : 'TBD'}</span></div>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 uppercase">{lead.leadSource}</span>
        <ChevronRight className="w-3 h-3 text-slate-300" />
      </div>
    </Link>
  );
}
