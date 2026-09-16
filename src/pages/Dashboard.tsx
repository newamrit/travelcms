import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart3, Users, Calendar, DollarSign, Banknote,
  TrendingUp, ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, 
  Building2, ArrowLeft, Activity, Zap
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { formatNepaliCurrency } from '../utils/currency';
import { db, COLLECTIONS } from '../services/database';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { StatCardSkeleton, CardSkeleton } from '../components/common/SkeletonLoader';

export default function Dashboard() {
  const { play } = useSound();
  const [view, setView] = useState<'menu' | 'overview' | 'actions'>('menu');
  const { user } = useAuth();
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [allInvoices, setAllInvoices] = useState<any[]>([]);
  const [allExpenses, setAllExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for greeting
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const greeting = getGreeting();

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      try {
        setAllLeads(db.findAll(COLLECTIONS.LEADS));
        setAllBookings(db.findAll(COLLECTIONS.BOOKINGS));
        setAllInvoices(db.findAll(COLLECTIONS.INVOICES));
        setAllExpenses(db.findAll(COLLECTIONS.SUPPLIER_EXPENSES));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  
  const totalLeads = allLeads.length;
  const activeLeads = allLeads.filter((l: any) => !['won', 'lost'].includes(l.status)).length;
  const wonLeads = allLeads.filter((l: any) => l.status === 'won').length;
  const totalRevenue = allInvoices.filter((i: any) => i.status === 'paid').reduce((sum: number, i: any) => sum + i.totalAmount, 0);
  const pendingPayments = allInvoices.filter((i: any) => ['sent', 'partial'].includes(i.status)).reduce((sum: number, i: any) => sum + i.totalAmount - (i.payments || []).reduce((s: number, p: any) => s + p.amount, 0), 0);
  
  // New metrics for the 4 stat cards
  const activeBookings = allBookings.filter((b: any) => ['confirmed', 'in_progress'].includes(b.status)).length;
  const revenueReceived = allInvoices.filter((i: any) => i.status === 'paid').reduce((sum: number, i: any) => sum + i.totalAmount, 0);
  const vendorPayable = allExpenses.filter((e: any) => e.paymentStatus !== 'paid').reduce((sum: number, e: any) => sum + e.actualAmount, 0);

  // Pie Chart: Financial Breakdown - Settled vs Pending
  const financialBreakdownData = [
    {
      name: 'Settled Revenue',
      value: revenueReceived,
      color: '#10b981' // Green
    },
    {
      name: 'Pending Dues',
      value: pendingPayments,
      color: '#ef4444' // Red
    }
  ];

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700',
    requirements_gathered: 'bg-purple-100 text-purple-700', quoting: 'bg-indigo-100 text-indigo-700',
    negotiation: 'bg-orange-100 text-orange-700', won: 'bg-green-100 text-green-700', lost: 'bg-red-100 text-red-700',
  };

  if (view === 'menu') {
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-1">{greeting}, {user?.firstName}!</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-slate-200 p-4 animate-pulse">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-200"></div>
                  <div className="w-12 h-4 bg-slate-200 rounded"></div>
                </div>
                <div className="w-16 h-6 bg-slate-200 rounded mb-1"></div>
                <div className="w-20 h-3 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Pie Chart Skeleton */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 animate-pulse">
            <div className="w-48 h-6 bg-slate-200 rounded mb-2"></div>
            <div className="w-32 h-4 bg-slate-200 rounded mb-4"></div>
            <div className="w-full h-[400px] bg-slate-100 rounded-xl"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 fade-in-up">
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">{greeting}, {user?.firstName}!</p>
        </div>

        {/* 4 Small Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
                <ArrowUpRight className="w-3 h-3" /> Active
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{activeBookings}</p>
            <p className="text-xs text-slate-500 mt-1">Active Bookings</p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Banknote className="w-5 h-5 text-green-600" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
                <ArrowUpRight className="w-3 h-3" /> +12%
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(revenueReceived)}</p>
            <p className="text-xs text-slate-500 mt-1">Revenue Received</p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-amber-600">
                <AlertTriangle className="w-3 h-3" /> Pending
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(pendingPayments)}</p>
            <p className="text-xs text-slate-500 mt-1">Pending Payments</p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-purple-600">
                <ArrowDownRight className="w-3 h-3" /> Payable
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(vendorPayable)}</p>
            <p className="text-xs text-slate-500 mt-1">Vendor Payable</p>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-800">Financial Breakdown</h3>
            <p className="text-sm text-slate-500">Settled vs Pending (NPR)</p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={financialBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {financialBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatNepaliCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Settled Revenue</p>
              <p className="text-xl font-bold text-green-600">{formatNepaliCurrency(revenueReceived)}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <p className="text-xs text-slate-600 mb-1">Pending Dues</p>
              <p className="text-xl font-bold text-red-600">{formatNepaliCurrency(pendingPayments)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => { play('tabSwitch'); setView('overview'); }}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Business Overview</h2>
                <p className="text-slate-500 text-sm">Key metrics and performance indicators</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">{formatNepaliCurrency(totalRevenue)}</p>
                  <p className="text-xs text-green-600">Revenue</p>
                </div>
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <p className="text-lg font-bold text-primary-600">{totalLeads}</p>
                  <p className="text-xs text-primary-600">Leads</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Overview</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => { play('tabSwitch'); setView('actions'); }}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Quick Actions</h2>
                <p className="text-slate-500 text-sm">Fast access to common tasks</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Create new lead</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Generate invoice</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Add new booking</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Quick Actions</span>
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

  if (view === 'overview') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => { play('click'); setView('menu'); }} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Business Overview</h1>
            <p className="text-slate-500 mt-1">Key metrics and performance indicators</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Users className="w-5 h-5 text-blue-600" /></div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600"><ArrowUpRight className="w-3 h-3" /> +12%</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 mt-3">{totalLeads}</p>
            <p className="text-sm text-slate-500">Total Leads</p>
            <p className="text-xs text-slate-400 mt-2">{activeLeads} active, {wonLeads} won</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><Calendar className="w-5 h-5 text-green-600" /></div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600"><ArrowUpRight className="w-3 h-3" /> +8%</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 mt-3">{allBookings.length}</p>
            <p className="text-sm text-slate-500">Active Bookings</p>
            <p className="text-xs text-slate-400 mt-2">{allBookings.filter(b => b.status === 'confirmed').length} confirmed, {allBookings.filter(b => b.status === 'in_progress').length} in progress</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center"><DollarSign className="w-5 h-5 text-emerald-600" /></div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600"><ArrowUpRight className="w-3 h-3" /> +23%</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 mt-3">{formatNepaliCurrency(totalRevenue)}</p>
            <p className="text-sm text-slate-500">Revenue (Paid)</p>
            <p className="text-xs text-slate-400 mt-2">From completed invoices</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Clock className="w-5 h-5 text-amber-600" /></div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-red-600"><ArrowDownRight className="w-3 h-3" /> -5%</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 mt-3">{formatNepaliCurrency(pendingPayments)}</p>
            <p className="text-sm text-slate-500">Pending Payments</p>
            <p className="text-xs text-slate-400 mt-2">Awaiting collection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="text-lg font-semibold text-slate-800">Recent Leads</h3>
              <Link to="/customers" className="text-sm text-[#012871] hover:underline font-medium">View All →</Link>
            </div>
            <div className="px-6 pb-6 space-y-3">
              {allLeads.slice(0, 5).map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">{lead.clientName.split(' ').map((n: string) => n[0]).join('')}</div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{lead.clientName}</p>
                      <p className="text-xs text-slate-500">{lead.clientCountry} • {lead.paxAdults + lead.paxChildren} pax</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>{lead.status.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="text-lg font-semibold text-slate-800">Recent Bookings</h3>
              <Link to="/bookings" className="text-sm text-[#012871] hover:underline font-medium">View All →</Link>
            </div>
            <div className="px-6 pb-6 space-y-3">
              {allBookings.map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center"><Calendar className="w-4 h-4 text-green-600" /></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{booking.clientName}</p>
                      <p className="text-xs text-slate-500">{booking.bookingNumber} • {booking.paxAdults + booking.paxChildren} pax</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{formatNepaliCurrency(booking.totalAmount)}</p>
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

  // Quick Actions View
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => { play('click'); setView('menu'); }} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quick Actions</h1>
          <p className="text-slate-500 mt-1">Fast access to common tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/customers" className="bg-white rounded-3xl border-2 border-slate-200 p-6 hover:border-[#012871] hover:shadow-lg transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-[#012871] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">New Customer</h3>
          <p className="text-sm text-slate-500">Register a new customer</p>
        </Link>

        <Link to="/invoices" className="bg-white rounded-3xl border-2 border-slate-200 p-6 hover:border-[#f35500] hover:shadow-lg transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-[#f35500] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Create Invoice</h3>
          <p className="text-sm text-slate-500">Generate a new invoice</p>
        </Link>

        <Link to="/bookings" className="bg-white rounded-3xl border-2 border-slate-200 p-6 hover:border-[#012871] hover:shadow-lg transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-[#012871] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">New Booking</h3>
          <p className="text-sm text-slate-500">Create a new booking</p>
        </Link>

        <Link to="/itineraries" className="bg-white rounded-3xl border-2 border-slate-200 p-6 hover:border-[#f35500] hover:shadow-lg transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-[#f35500] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">New Itinerary</h3>
          <p className="text-sm text-slate-500">Build a trip plan</p>
        </Link>

        <Link to="/vendors" className="bg-white rounded-3xl border-2 border-slate-200 p-6 hover:border-[#012871] hover:shadow-lg transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-[#012871] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Add Vendor</h3>
          <p className="text-sm text-slate-500">Register a new vendor</p>
        </Link>

        <Link to="/reports" className="bg-white rounded-3xl border-2 border-slate-200 p-6 hover:border-[#f35500] hover:shadow-lg transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-[#f35500] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">View Reports</h3>
          <p className="text-sm text-slate-500">Analytics & insights</p>
        </Link>
      </div>
    </div>
  );
}
