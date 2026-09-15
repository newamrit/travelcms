import React from 'react';
import { Calendar, Plus, Eye, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { mockBookings } from '../data/mockData';

export default function Bookings() {
  const statusConfig: Record<string, { color: string; icon: any }> = {
    confirmed: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
    in_progress: { color: 'bg-blue-100 text-blue-700', icon: Clock },
    completed: { color: 'bg-slate-100 text-slate-700', icon: CheckCircle },
    cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bookings</h1>
          <p className="text-slate-500 mt-1">Manage confirmed trip bookings and operations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-sm"><Plus className="w-4 h-4" /> New Booking</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total Bookings</p><p className="text-2xl font-bold text-slate-800">{mockBookings.length}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Confirmed</p><p className="text-2xl font-bold text-green-600">{mockBookings.filter(b => b.status === 'confirmed').length}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">In Progress</p><p className="text-2xl font-bold text-blue-600">{mockBookings.filter(b => b.status === 'in_progress').length}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total Value</p><p className="text-2xl font-bold text-slate-800">${mockBookings.reduce((s, b) => s + b.totalAmount, 0).toLocaleString()}</p></div>
      </div>

      <div className="space-y-4">
        {mockBookings.map(booking => {
          const config = statusConfig[booking.status];
          const StatusIcon = config.icon;
          return (
            <div key={booking.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center"><Calendar className="w-6 h-6 text-green-600" /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-800">{booking.clientName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}><StatusIcon className="w-3 h-3" />{booking.status.replace('_', ' ')}</span>
                    </div>
                    <p className="text-sm text-slate-500">{booking.bookingNumber}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-600">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {booking.travelDateFrom} → {booking.travelDateTo}</span>
                      <span className="flex items-center gap-1">{booking.paxAdults}A + {booking.paxChildren}C</span>
                    </div>
                    {booking.specialRequests && <p className="text-xs text-slate-400 mt-2 italic">📝 {booking.specialRequests}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">${booking.totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{booking.currency}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
