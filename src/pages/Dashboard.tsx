import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, DollarSign, Calendar, Building2, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { mockLeads, mockBookings, mockInvoices, mockSuppliers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const totalLeads = mockLeads.length;
  const activeLeads = mockLeads.filter(l => !['won', 'lost'].includes(l.status)).length;
  const wonLeads = mockLeads.filter(l => l.status === 'won').length;
  const totalRevenue = mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.totalAmount, 0);
  const pendingPayments = mockInvoices.filter(i => ['sent', 'partial'].includes(i.status)).reduce((sum, i) => sum + i.totalAmount - i.payments.reduce((s, p) => s + p.amount, 0), 0);

  const leadsByStatus = [
    { status: 'New', count: mockLeads.filter(l => l.status === 'new').length, color: 'bg-blue-500' },
    { status: 'Contacted', count: mockLeads.filter(l => l.status === 'contacted').length, color: 'bg-yellow-500' },
    { status: 'Quoting', count: mockLeads.filter(l => l.status === 'quoting').length, color: 'bg-purple-500' },
    { status: 'Negotiation', count: mockLeads.filter(l => l.status === 'negotiation').length, color: 'bg-orange-500' },
    { status: 'Won', count: mockLeads.filter(l => l.status === 'won').length, color: 'bg-green-500' },
    { status: 'Lost', count: mockLeads.filter(l => l.status === 'lost').length, color: 'bg-red-500' },
  ];

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700',
    requirements_gathered: 'bg-purple-100 text-purple-700', quoting: 'bg-indigo-100 text-indigo-700',
    negotiation: 'bg-orange-100 text-orange-700', won: 'bg-green-100 text-green-700', lost: 'bg-red-100 text-red-700',
  };

  const maxLeadCount = Math.max(...leadsByStatus.map(s => s.count), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, {user?.firstName}! Here's your business overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value={totalLeads.toString()} subtitle={`${activeLeads} active, ${wonLeads} won`} icon={Users} iconColor="text-blue-600 bg-blue-50" trend="+12%" trendUp={true} />
        <StatCard title="Active Bookings" value={mockBookings.length.toString()} subtitle="2 confirmed, 1 in progress" icon={Calendar} iconColor="text-green-600 bg-green-50" trend="+8%" trendUp={true} />
        <StatCard title="Revenue (Paid)" value={`$${(totalRevenue / 1000).toFixed(1)}K`} subtitle="From completed invoices" icon={DollarSign} iconColor="text-emerald-600 bg-emerald-50" trend="+23%" trendUp={true} />
        <StatCard title="Pending Payments" value={`$${(pendingPayments / 1000).toFixed(1)}K`} subtitle="Awaiting collection" icon={Clock} iconColor="text-amber-600 bg-amber-50" trend="-5%" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Lead Pipeline</h3>
            <Link to="/leads" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All →</Link>
          </div>
          <div className="space-y-4">
            {leadsByStatus.map(item => (
              <div key={item.status} className="flex items-center gap-4">
                <span className="text-sm text-slate-600 w-28">{item.status}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full flex items-center justify-end pr-3 transition-all duration-500`} style={{ width: `${(item.count / maxLeadCount) * 100}%`, minWidth: item.count > 0 ? '2rem' : '0' }}>
                    {item.count > 0 && <span className="text-xs font-medium text-white">{item.count}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3"><Building2 className="w-5 h-5 text-slate-500" /><span className="text-sm text-slate-600">Active Suppliers</span></div>
              <span className="text-lg font-bold text-slate-800">{mockSuppliers.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3"><TrendingUp className="w-5 h-5 text-green-500" /><span className="text-sm text-slate-600">Win Rate</span></div>
              <span className="text-lg font-bold text-green-600">{totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-amber-500" /><span className="text-sm text-slate-600">Urgent Leads</span></div>
              <span className="text-lg font-bold text-amber-600">{mockLeads.filter(l => l.priority === 'urgent').length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Leads</h3>
            <Link to="/leads" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All →</Link>
          </div>
          <div className="px-6 pb-6 space-y-3">
            {mockLeads.slice(0, 5).map(lead => (
              <Link key={lead.id} to={`/leads/${lead.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">{lead.clientName.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{lead.clientName}</p>
                    <p className="text-xs text-slate-500">{lead.clientCountry} • {lead.paxAdults + lead.paxChildren} pax</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>{lead.status.replace('_', ' ')}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Bookings</h3>
            <Link to="/bookings" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All →</Link>
          </div>
          <div className="px-6 pb-6 space-y-3">
            {mockBookings.map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center"><Calendar className="w-4 h-4 text-green-600" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{booking.clientName}</p>
                    <p className="text-xs text-slate-500">{booking.bookingNumber} • {booking.paxAdults + booking.paxChildren} pax</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">${booking.totalAmount.toLocaleString()}</p>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{booking.status.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, iconColor, trend, trendUp }: { title: string; value: string; subtitle: string; icon: any; iconColor: string; trend: string; trendUp: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}><Icon className="w-5 h-5" /></div>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{trend}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{title}</p>
      </div>
      <p className="text-xs text-slate-400 mt-2">{subtitle}</p>
    </div>
  );
}
