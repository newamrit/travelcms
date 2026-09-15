import React, { useState } from 'react';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, Clock, CheckCircle, AlertTriangle, Building2, Download } from 'lucide-react';

export default function Profitability() {
  const [dateRange, setDateRange] = useState('this_month');

  const summary = { totalRevenue: 77400, totalCosts: 42800, grossProfit: 34600, profitMargin: 44.7, outstandingReceivables: 15600, outstandingPayables: 8200 };

  const bookingProfitability = [
    { id: 1, bookingNumber: 'BK-2024-0003', clientName: 'Maria Garcia', invoiced: 52000, costs: 28500, profit: 23500, margin: 45.2 },
    { id: 2, bookingNumber: 'BK-2024-0001', clientName: 'Emma Thompson', invoiced: 9800, costs: 5400, profit: 4400, margin: 44.9 },
    { id: 3, bookingNumber: 'BK-2024-0002', clientName: 'James Wilson', invoiced: 15600, costs: 8900, profit: 6700, margin: 42.9 },
  ];

  const categoryBreakdown = [
    { category: 'Accommodation', amount: 15200, percent: 35.5, color: 'bg-blue-500' },
    { category: 'Transportation', amount: 10800, percent: 25.2, color: 'bg-green-500' },
    { category: 'Activities & Permits', amount: 7600, percent: 17.8, color: 'bg-purple-500' },
    { category: 'Guide Services', amount: 5400, percent: 12.6, color: 'bg-orange-500' },
    { category: 'Flights', amount: 3800, percent: 8.9, color: 'bg-indigo-500' },
  ];

  const monthlyTrend = [
    { month: 'Oct', revenue: 45000, costs: 24000, profit: 21000 },
    { month: 'Nov', revenue: 52000, costs: 28000, profit: 24000 },
    { month: 'Dec', revenue: 68000, costs: 36000, profit: 32000 },
    { month: 'Jan', revenue: 55000, costs: 30000, profit: 25000 },
    { month: 'Feb', revenue: 62000, costs: 33000, profit: 29000 },
    { month: 'Mar', revenue: 77400, costs: 42800, profit: 34600 },
  ];

  const maxRevenue = Math.max(...monthlyTrend.map(m => m.revenue));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Profitability & Reports</h1>
          <p className="text-slate-500 mt-1">Financial analytics, margins, and supplier cost tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-primary-500 outline-none">
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="this_quarter">This Quarter</option>
            <option value="this_year">This Year</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><Download className="w-4 h-4" /> Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><DollarSign className="w-5 h-5 text-green-600" /></div><span className="flex items-center gap-0.5 text-xs font-medium text-green-600"><ArrowUpRight className="w-3 h-3" /> +23%</span></div>
          <p className="text-2xl font-bold text-slate-800">${summary.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">Total Revenue</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-red-600" /></div><span className="flex items-center gap-0.5 text-xs font-medium text-red-600"><ArrowUpRight className="w-3 h-3" /> +18%</span></div>
          <p className="text-2xl font-bold text-slate-800">${summary.totalCosts.toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">Total Supplier Costs</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3"><div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-primary-600" /></div><span className="flex items-center gap-0.5 text-xs font-medium text-green-600"><ArrowUpRight className="w-3 h-3" /> +28%</span></div>
          <p className="text-2xl font-bold text-primary-600">${summary.grossProfit.toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">Gross Profit ({summary.profitMargin}%)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"><Clock className="w-4 h-4 text-amber-600" /></div><div><p className="text-sm font-medium text-slate-800">Outstanding Receivables</p><p className="text-xs text-slate-500">Money owed by clients</p></div></div>
          <p className="text-3xl font-bold text-amber-600">${summary.outstandingReceivables.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-orange-600" /></div><div><p className="text-sm font-medium text-slate-800">Outstanding Payables</p><p className="text-xs text-slate-500">Money owed to suppliers</p></div></div>
          <p className="text-3xl font-bold text-orange-600">${summary.outstandingPayables.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Revenue vs Costs Trend</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary-500" /> Revenue</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400" /> Costs</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400" /> Profit</span>
          </div>
        </div>
        <div className="flex items-end gap-3 h-48">
          {monthlyTrend.map((month) => (
            <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-0.5 h-40">
                <div className="flex-1 rounded-t relative" style={{ height: `${(month.revenue / maxRevenue) * 100}%` }}><div className="absolute inset-0 bg-primary-500 rounded-t" /></div>
                <div className="flex-1 rounded-t relative" style={{ height: `${(month.costs / maxRevenue) * 100}%` }}><div className="absolute inset-0 bg-red-400 rounded-t" /></div>
                <div className="flex-1 rounded-t relative" style={{ height: `${(month.profit / maxRevenue) * 100}%` }}><div className="absolute inset-0 bg-green-400 rounded-t" /></div>
              </div>
              <span className="text-xs text-slate-500">{month.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Per-Booking Profitability</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Booking</th>
                <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Client</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Invoiced</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Costs</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Profit</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookingProfitability.map(b => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="py-3 text-sm font-medium text-slate-800">{b.bookingNumber}</td>
                  <td className="py-3 text-sm text-slate-600">{b.clientName}</td>
                  <td className="py-3 text-sm text-right text-slate-800">${b.invoiced.toLocaleString()}</td>
                  <td className="py-3 text-sm text-right text-red-600">${b.costs.toLocaleString()}</td>
                  <td className="py-3 text-sm text-right font-semibold text-green-600">${b.profit.toLocaleString()}</td>
                  <td className="py-3 text-right"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.margin >= 40 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.margin}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Cost by Category</h3>
        <div className="space-y-4">
          {categoryBreakdown.map(cat => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-1"><span className="text-sm text-slate-600">{cat.category}</span><span className="text-sm font-medium text-slate-800">${cat.amount.toLocaleString()} ({cat.percent}%)</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className={`h-2.5 rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
