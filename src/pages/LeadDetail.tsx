import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Globe, Calendar, Users, DollarSign, MessageSquare, PhoneCall, FileText, CheckCircle, XCircle, Edit2 } from 'lucide-react';
import { mockLeads, mockActivities } from '../data/mockData';

export default function LeadDetail() {
  const { id } = useParams();
  const lead = mockLeads.find(l => l.id === id);
  const activities = mockActivities.filter(a => a.leadId === id);

  if (!lead) return <div className="text-center py-12"><p className="text-slate-500">Lead not found</p><Link to="/leads" className="text-primary-600 hover:underline mt-2 inline-block">← Back</Link></div>;

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700 border-blue-200', contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    requirements_gathered: 'bg-purple-100 text-purple-700 border-purple-200', quoting: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    negotiation: 'bg-orange-100 text-orange-700 border-orange-200', won: 'bg-green-100 text-green-700 border-green-200', lost: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/leads" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">{lead.clientName}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>{lead.status.replace('_', ' ')}</span>
            </div>
            <p className="text-sm text-slate-500">{lead.leadNumber} • Created {new Date(lead.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100"><CheckCircle className="w-4 h-4" /> Mark Won</button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"><XCircle className="w-4 h-4" /> Mark Lost</button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><Edit2 className="w-4 h-4" /> Edit</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Travel Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <DetailItem icon={Calendar} label="Travel From" value={lead.travelDateFrom ? new Date(lead.travelDateFrom).toLocaleDateString() : 'TBD'} />
              <DetailItem icon={Calendar} label="Travel To" value={lead.travelDateTo ? new Date(lead.travelDateTo).toLocaleDateString() : 'TBD'} />
              <DetailItem icon={Users} label="Travelers" value={`${lead.paxAdults} Adults, ${lead.paxChildren} Children`} />
              <DetailItem icon={DollarSign} label="Budget" value={`$${lead.budgetMin?.toLocaleString()} - $${lead.budgetMax?.toLocaleString()}`} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Notes</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{lead.notes || 'No notes added yet.'}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><MessageSquare className="w-4 h-4 text-blue-600" /></div>
                    {idx < activities.length - 1 && <div className="w-px h-full bg-slate-200 mt-1" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-800">{activity.subject}</p>
                      <span className="text-xs text-slate-400">{new Date(activity.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5">{activity.description}</p>
                    <p className="text-xs text-slate-400 mt-1">by {activity.userName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Client Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700">{lead.clientName.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{lead.clientName}</p>
                  <p className="text-xs text-slate-500">{lead.clientCountry}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-600"><Mail className="w-4 h-4 text-slate-400" /><span>{lead.clientEmail}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-600"><Phone className="w-4 h-4 text-slate-400" /><span>{lead.clientPhone}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-600"><Globe className="w-4 h-4 text-slate-400" /><span>WhatsApp: {lead.clientWhatsapp}</span></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Lead Details</h3>
            <div className="space-y-3">
              <MetaRow label="Lead Number" value={lead.leadNumber} />
              <MetaRow label="Source" value={lead.leadSource.replace('_', ' ')} />
              <MetaRow label="Priority" value={lead.priority} />
              <MetaRow label="Assigned To" value={lead.assignedAgentName} />
              <MetaRow label="Created" value={new Date(lead.createdAt).toLocaleDateString()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-700 capitalize">{value}</span>
    </div>
  );
}
