import React, { useState } from 'react';
import { 
  Calendar, Plus, MapPin, Users, Edit2, Trash2, Copy, 
  Eye, ArrowLeft, CalendarCheck, GraduationCap, Building2, Palmtree
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
  category: 'school_college' | 'corporate_retreat' | 'vacation_family';
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
    totalAmount: 12500,
    category: 'vacation_family'
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
    totalAmount: 8900,
    category: 'vacation_family'
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
    totalAmount: 15200,
    category: 'corporate_retreat'
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
    totalAmount: 22800,
    category: 'school_college'
  },
  {
    id: '5',
    bookingNumber: 'BK-2024-005',
    clientName: 'David Wilson',
    destination: 'Zanzibar Beach',
    startDate: '2024-09-01',
    endDate: '2024-09-08',
    paxCount: 2,
    status: 'confirmed',
    totalAmount: 9500,
    category: 'vacation_family'
  },
  {
    id: '6',
    bookingNumber: 'BK-2024-006',
    clientName: 'Tech Corp Ltd',
    destination: 'Team Building Kenya',
    startDate: '2024-10-15',
    endDate: '2024-10-18',
    paxCount: 25,
    status: 'confirmed',
    totalAmount: 45000,
    category: 'corporate_retreat'
  }
];

export default function Bookings() {
  const [view, setView] = useState<'menu' | 'all' | 'create' | 'school_college' | 'corporate_retreat' | 'vacation_family'>('menu');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const schoolCollegeBookings = mockBookings.filter(b => b.category === 'school_college');
  const corporateRetreatBookings = mockBookings.filter(b => b.category === 'corporate_retreat');
  const vacationFamilyBookings = mockBookings.filter(b => b.category === 'vacation_family');

  const renderBookingList = (bookings: Booking[], title: string, onBack: () => void) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
            <p className="text-slate-500 mt-1">{bookings.length} bookings</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]">
          <Plus className="w-4 h-4" /> New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
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

  // Main Menu
  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bookings</h1>
          <p className="text-slate-500 mt-1">Manage your trip bookings</p>
        </div>

        {/* Top Section - Two Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* All Bookings Card */}
          <button
            onClick={() => setView('all')}
            className="group bg-white rounded-xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CalendarCheck className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">All Bookings</h2>
                <p className="text-slate-500 text-sm">View and manage all trip bookings</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-2xl font-bold text-primary-600">{mockBookings.length}</span>
                <span className="text-sm text-primary-500">bookings</span>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Create Booking Card */}
          <button
            onClick={() => setView('create')}
            className="group bg-white rounded-xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Booking</h2>
                <p className="text-slate-500 text-sm">Create a new trip booking</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Quick booking creation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Auto-calculate pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Instant confirmation</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Create New</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Bottom Section - Bookings by Category */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Bookings by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* School/College Card */}
            <button
              onClick={() => setView('school_college')}
              className="group bg-white rounded-xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
              style={{ minHeight: '300px' }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">School/College</h3>
                  <p className="text-slate-500 text-sm">Educational trips</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
                  <span className="text-xl font-bold text-primary-600">{schoolCollegeBookings.length}</span>
                  <span className="text-xs text-primary-500">bookings</span>
                </div>
                <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>View</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Corporate Retreat Card */}
            <button
              onClick={() => setView('corporate_retreat')}
              className="group bg-white rounded-xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-xl hover:-translate-y-1"
              style={{ minHeight: '300px' }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Corporate Retreat</h3>
                  <p className="text-slate-500 text-sm">Business team trips</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-50 rounded-full">
                  <span className="text-xl font-bold text-accent-600">{corporateRetreatBookings.length}</span>
                  <span className="text-xs text-accent-500">bookings</span>
                </div>
                <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>View</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Vacation & Family Card */}
            <button
              onClick={() => setView('vacation_family')}
              className="group bg-white rounded-xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
              style={{ minHeight: '300px' }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Palmtree className="w-12 h-12 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Vacation & Family</h3>
                  <p className="text-slate-500 text-sm">Personal trips</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
                  <span className="text-xl font-bold text-primary-600">{vacationFamilyBookings.length}</span>
                  <span className="text-xs text-primary-500">bookings</span>
                </div>
                <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>View</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // All Bookings View
  if (view === 'all') {
    return renderBookingList(mockBookings, 'All Bookings', () => setView('menu'));
  }

  // Create Booking View
  if (view === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create Booking</h1>
            <p className="text-slate-500 mt-1">Create a new trip booking</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="Enter client name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="Enter destination" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Number of Pax</label>
                <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                  <option value="school_college">School/College</option>
                  <option value="corporate_retreat">Corporate Retreat</option>
                  <option value="vacation_family">Vacation & Family</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount</label>
              <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="0.00" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setView('menu')} className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={() => setView('all')} className="px-4 py-2 text-white bg-[#f35500] rounded-lg hover:bg-[#c54300]">Create Booking</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Category Views
  if (view === 'school_college') {
    return renderBookingList(schoolCollegeBookings, 'School/College Bookings', () => setView('menu'));
  }

  if (view === 'corporate_retreat') {
    return renderBookingList(corporateRetreatBookings, 'Corporate Retreat Bookings', () => setView('menu'));
  }

  if (view === 'vacation_family') {
    return renderBookingList(vacationFamilyBookings, 'Vacation & Family Bookings', () => setView('menu'));
  }

  return null;
}
