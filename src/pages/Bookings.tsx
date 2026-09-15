import React, { useState } from 'react';
import { 
  Calendar, Plus, MapPin, Users, Clock, Edit2, Trash2, Copy, 
  Eye, Save, ChevronDown, ChevronUp, ArrowLeft, CalendarCheck, History
} from 'lucide-react';

interface Booking {
  id: string;
  bookingNumber: string;
  clientName: string;
  destination: string;
  startDate: string;
  endDate: string;
  paxCount: number;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    bookingNumber: 'BK-2024-001',
    clientName: 'John Smith',
    destination: 'Tanzania Safari',
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    paxCount: 4,
    status: 'confirmed',
    totalAmount: 12500
  },
  {
    id: '2',
    bookingNumber: 'BK-2024-002',
    clientName: 'Sarah Johnson',
    destination: 'Kenya Adventure',
    startDate: '2024-07-10',
    endDate: '2024-07-15',
    paxCount: 2,
    status: 'in_progress',
    totalAmount: 8900
  },
  {
    id: '3',
    bookingNumber: 'BK-2024-003',
    clientName: 'Michael Brown',
    destination: 'Uganda Gorilla Trek',
    startDate: '2024-05-20',
    endDate: '2024-05-25',
    paxCount: 3,
    status: 'completed',
    totalAmount: 15200
  },
  {
    id: '4',
    bookingNumber: 'BK-2024-004',
    clientName: 'Emily Davis',
    destination: 'South Africa Tour',
    startDate: '2024-08-05',
    endDate: '2024-08-12',
    paxCount: 6,
    status: 'confirmed',
    totalAmount: 22800
  }
];

export default function Bookings() {
  const [view, setView] = useState<'menu' | 'upcoming' | 'history'>('menu');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const upcomingBookings = mockBookings.filter(b => ['confirmed', 'in_progress'].includes(b.status));
  const completedBookings = mockBookings.filter(b => ['completed', 'cancelled'].includes(b.status));

  // Main Menu
  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bookings</h1>
          <p className="text-slate-500 mt-1">Manage your trip bookings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Upcoming Bookings Card */}
          <button
            onClick={() => setView('upcoming')}
            className="group bg-white rounded-xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CalendarCheck className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Upcoming Bookings</h2>
                <p className="text-slate-500 text-sm">View and manage active trip bookings</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-2xl font-bold text-primary-600">{upcomingBookings.length}</span>
                <span className="text-sm text-primary-500">bookings</span>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Bookings</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Booking History Card */}
          <button
            onClick={() => setView('history')}
            className="group bg-white rounded-xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <History className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking History</h2>
                <p className="text-slate-500 text-sm">Review completed and cancelled bookings</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Completed trips</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Cancelled bookings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Historical records</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View History</span>
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

  // Upcoming Bookings View
  if (view === 'upcoming') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Upcoming Bookings</h1>
              <p className="text-slate-500 mt-1">Active and confirmed trip bookings</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]">
            <Plus className="w-4 h-4" /> New Booking
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-800 mb-1">{booking.clientName}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{booking.destination}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {booking.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{booking.paxCount} pax</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-lg font-bold text-[#012871]">${booking.totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">{booking.bookingNumber}</p>
                </div>
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex gap-1">
                  <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#012871]"><Eye className="w-4 h-4" /></button>
                  <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#012871]"><Edit2 className="w-4 h-4" /></button>
                </div>
                <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Booking History View
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Booking History</h1>
          <p className="text-slate-500 mt-1">Completed and cancelled bookings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-slate-800 mb-1">{booking.clientName}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{booking.destination}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                  {booking.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{booking.paxCount} pax</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-lg font-bold text-[#f35500]">${booking.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-slate-400">{booking.bookingNumber}</p>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-1">
                <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#f35500]"><Eye className="w-4 h-4" /></button>
                <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#f35500]"><Copy className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
