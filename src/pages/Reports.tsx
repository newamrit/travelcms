import React, { useState } from 'react';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, Clock, AlertTriangle, ArrowLeft, FileBarChart, PieChart } from 'lucide-react';
import { formatNepaliCurrency } from '../utils/currency';

export default function Reports() {
  const [view, setView] = useState<'menu' | 'financial' | 'operational'>('menu');

  const summary = { totalRevenue: 77400, totalCosts: 42800, grossProfit: 34600, profitMargin: 44.7 };

  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
          <p className="text-slate-500 mt-1">Analytics and business insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => setView('financial')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileBarChart className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Financial Reports</h2>
                <p className="text-slate-500 text-sm">Revenue, costs, and profitability</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">{formatNepaliCurrency(summary.totalRevenue)}</p>
                  <p className="text-xs text-green-600">Revenue</p>
                </div>
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <p className="text-lg font-bold text-primary-600">{summary.profitMargin}%</p>
                  <p className="text-xs text-primary-600">Margin</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Financial Reports</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => setView('operational')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <PieChart className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Operational Reports</h2>
                <p className="text-slate-500 text-sm">Bookings, leads, and performance</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Booking analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Lead conversion rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Team performance</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Operational Reports</span>
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

  if (view === 'financial') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Financial Reports</h1>
            <p className="text-slate-500 mt-1">Revenue, costs, and profitability analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><DollarSign className="w-5 h-5 text-green-600" /></div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600"><ArrowUpRight className="w-3 h-3" /> +23%</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(summary.totalRevenue)}</p>
            <p className="text-sm text-slate-500 mt-1">Total Revenue</p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-red-600" /></div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-red-600"><ArrowUpRight className="w-3 h-3" /> +18%</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(summary.totalCosts)}</p>
            <p className="text-sm text-slate-500 mt-1">Total Costs</p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-primary-600" /></div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600"><ArrowUpRight className="w-3 h-3" /> +28%</span>
            </div>
            <p className="text-2xl font-bold text-[#012871]">{formatNepaliCurrency(summary.grossProfit)}</p>
            <p className="text-sm text-slate-500 mt-1">Gross Profit ({summary.profitMargin}%)</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Revenue Trend</h3>
          <div className="flex items-end gap-3 h-48">
            {[
              { month: 'Oct', revenue: 45000 },
              { month: 'Nov', revenue: 52000 },
              { month: 'Dec', revenue: 68000 },
              { month: 'Jan', revenue: 55000 },
              { month: 'Feb', revenue: 62000 },
              { month: 'Mar', revenue: 77400 },
            ].map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t relative" style={{ height: `${(data.revenue / 77400) * 100}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012871] to-[#012871]/70 rounded-t" />
                </div>
                <span className="text-xs text-slate-500">{data.month}</span>
              </div>
            ))}
          </div>
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
          <h1 className="text-2xl font-bold text-slate-800">Operational Reports</h1>
          <p className="text-slate-500 mt-1">Bookings, leads, and performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total Bookings</p>
          <p className="text-2xl font-bold text-[#012871]">24</p>
          <p className="text-xs text-green-600 mt-1">+12% from last month</p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Active Leads</p>
          <p className="text-2xl font-bold text-[#f35500]">47</p>
          <p className="text-xs text-green-600 mt-1">+8% from last month</p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Conversion Rate</p>
          <p className="text-2xl font-bold text-[#012871]">51%</p>
          <p className="text-xs text-green-600 mt-1">+5% from last month</p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Avg. Booking Value</p>
          <p className="text-2xl font-bold text-[#f35500]">$3,225</p>
          <p className="text-xs text-green-600 mt-1">+15% from last month</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Lead Pipeline Status</h3>
        <div className="space-y-4">
          {[
            { status: 'New', count: 12, color: 'bg-blue-500' },
            { status: 'Contacted', count: 8, color: 'bg-yellow-500' },
            { status: 'Quoting', count: 15, color: 'bg-purple-500' },
            { status: 'Negotiation', count: 7, color: 'bg-orange-500' },
            { status: 'Won', count: 5, color: 'bg-green-500' },
          ].map(item => (
            <div key={item.status} className="flex items-center gap-4">
              <span className="text-sm text-slate-600 w-28">{item.status}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
                <div className={`h-full ${item.color} rounded-full flex items-center justify-end pr-2`} style={{ width: `${(item.count / 15) * 100}%` }}>
                  <span className="text-xs font-medium text-white">{item.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
