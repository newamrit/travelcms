import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, Plus, MapPin, Users, Edit2, Trash2, Copy, 
  Eye, ArrowLeft, CalendarCheck, GraduationCap, Building2, Palmtree,
  Search, Filter, Printer, ChevronLeft, ChevronRight, MoreVertical
} from 'lucide-react';
import { formatNepaliCurrency } from '../utils/currency';
import { db, COLLECTIONS } from '../services/database';
import { useSound } from '../context/SoundContext';

export default function Bookings() {
  const { play } = useSound();
  const [view, setView] = useState<'menu' | 'all' | 'create' | 'school_college' | 'corporate_retreat' | 'vacation_family'>('menu');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState<any[]>([]);
  const [editingBooking, setEditingBooking] = useState<any | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = () => {
      try {
        const bookingsData = db.findAll(COLLECTIONS.BOOKINGS);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Failed to load bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);
  
  const ITEMS_PER_PAGE = 12; // 4 rows × 3 columns

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'school_college': return 'School/College';
      case 'corporate_retreat': return 'Corporate';
      case 'vacation_family': return 'Vacation';
      default: return category;
    }
  };

  const schoolCollegeBookings = bookings.filter(b => b.category === 'school_college');
  const corporateRetreatBookings = bookings.filter(b => b.category === 'corporate_retreat');
  const vacationFamilyBookings = bookings.filter(b => b.category === 'vacation_family');

  // Filter and search bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = searchTerm === '' || 
        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || booking.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [bookings, searchTerm, categoryFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handlers
  const handleStatusChange = (bookingId: string, newStatus: string) => {
    try {
      db.update(COLLECTIONS.BOOKINGS, bookingId, { status: newStatus } as any);
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));
      setStatusDropdownOpen(null);
      play('success');
    } catch (error) {
      play('error');
      console.error('Failed to update booking status:', error);
    }
  };

  const handleDelete = (bookingId: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        db.delete(COLLECTIONS.BOOKINGS, bookingId);
        setBookings(bookings.filter(b => b.id !== bookingId));
        play('delete');
      } catch (error) {
        play('error');
        console.error('Failed to delete booking:', error);
      }
    }
  };

  const handlePrint = (booking: any) => {
    const printContent = `
      <html>
        <head>
          <title>Booking ${booking.bookingNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #012871; }
            .info { margin: 20px 0; }
            .label { font-weight: bold; color: #666; }
            .value { margin-left: 10px; }
          </style>
        </head>
        <body>
          <h1>Booking Confirmation</h1>
          <div class="info"><span class="label">Booking Number:</span><span class="value">${booking.bookingNumber}</span></div>
          <div class="info"><span class="label">Client:</span><span class="value">${booking.clientName}</span></div>
          <div class="info"><span class="label">Destination:</span><span class="value">${booking.destination}</span></div>
          <div class="info"><span class="label">Start Date:</span><span class="value">${booking.startDate}</span></div>
          <div class="info"><span class="label">End Date:</span><span class="value">${booking.endDate}</span></div>
          <div class="info"><span class="label">Passengers:</span><span class="value">{booking.paxAdults + booking.paxChildren}</span></div>
          <div class="info"><span class="label">Status:</span><span class="value">${booking.status.replace('_', ' ').toUpperCase()}</span></div>
          <div class="info"><span class="label">Total Amount:</span><span class="value">{formatNepaliCurrency(booking.totalAmount)}</span></div>
          <div class="info"><span class="label">Category:</span><span class="value">${getCategoryLabel(booking.category)}</span></div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleEdit = (booking: any) => {
    setEditingBooking(booking);
    play('click');
  };

  const handleSaveEdit = () => {
    if (editingBooking) {
      try {
        db.update(COLLECTIONS.BOOKINGS, editingBooking.id, editingBooking as any);
        setBookings(bookings.map(b => 
          b.id === editingBooking.id ? editingBooking : b
        ));
        setEditingBooking(null);
        play('save');
      } catch (error) {
        play('error');
        console.error('Failed to save booking:', error);
      }
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Enhanced Booking List Component
  const renderBookingList = (title: string, onBack: () => void, preFilteredBookings?: any[]) => {
    const displayBookings = preFilteredBookings || filteredBookings;
    const displayPaginated = preFilteredBookings 
      ? displayBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE)
      : paginatedBookings;
    const displayTotalPages = Math.ceil(displayBookings.length / ITEMS_PER_PAGE);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
              <p className="text-slate-500 mt-1">{displayBookings.length} bookings found</p>
            </div>
          </div>
          <button 
            onClick={() => setView('create')}
            className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]"
          >
            <Plus className="w-4 h-4" /> New Booking
          </button>
        </div>

        {/* Filters Section */}
        {!preFilteredBookings && (
          <div className="bg-white rounded-3xl border border-slate-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  placeholder="Search by client, destination, or booking number..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none appearance-none bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="school_college">School/College</option>
                  <option value="corporate_retreat">Corporate Retreat</option>
                  <option value="vacation_family">Vacation & Family</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none appearance-none bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all') && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing {displayBookings.length} of {bookings.length} bookings
                </p>
                <button
                  onClick={resetFilters}
                  className="text-sm text-[#012871] hover:underline font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Booking Cards Grid */}
        {displayPaginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPaginated.map((booking) => (
              <div key={booking.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                {/* Card Header */}
                <div className="p-5 border-b border-slate-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-800 mb-1">{booking.clientName}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{booking.destination}</span>
                      </div>
                    </div>
                    <div className="relative">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-0.5 bg-slate-100 rounded">{getCategoryLabel(booking.category)}</span>
                    <span>•</span>
                    <span>{booking.bookingNumber}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{booking.paxAdults + booking.paxChildren} pax</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-lg font-bold text-[#012871]">{formatNepaliCurrency(booking.totalAmount)}</p>
                    <p className="text-xs text-slate-400">{booking.startDate} → {booking.endDate}</p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {/* Edit Button */}
                      <button 
                        onClick={() => handleEdit(booking)}
                        className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#012871] transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Print Button */}
                      <button 
                        onClick={() => handlePrint(booking)}
                        className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#012871] transition-colors"
                        title="Print / Export PDF"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {/* Status Change Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={() => setStatusDropdownOpen(statusDropdownOpen === booking.id ? null : booking.id)}
                          className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#012871] transition-colors"
                          title="Change Status"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {statusDropdownOpen === booking.id && (
                          <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
                            <p className="px-3 py-1 text-xs font-semibold text-slate-500 border-b border-slate-100">Change Status</p>
                            {(['confirmed', 'in_progress', 'completed', 'cancelled'] as const).map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(booking.id, status)}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${
                                  booking.status === status ? 'bg-slate-50 font-medium' : ''
                                }`}
                              >
                                <span className={`w-2 h-2 rounded-full ${
                                  status === 'confirmed' ? 'bg-blue-500' :
                                  status === 'in_progress' ? 'bg-yellow-500' :
                                  status === 'completed' ? 'bg-green-500' :
                                  'bg-red-500'
                                }`}></span>
                                {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button 
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No bookings found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your filters or create a new booking</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {displayTotalPages > 1 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-4 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Page {currentPage} of {displayTotalPages} • Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, displayBookings.length)} of {displayBookings.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(displayTotalPages, currentPage + 1))}
                disabled={currentPage === displayTotalPages}
                className="flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">Edit Booking</h2>
                <p className="text-sm text-slate-500 mt-1">{editingBooking.bookingNumber}</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                    <input
                      type="text"
                      value={editingBooking.clientName}
                      onChange={(e) => setEditingBooking({ ...editingBooking, clientName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                    <input
                      type="text"
                      value={editingBooking.destination}
                      onChange={(e) => setEditingBooking({ ...editingBooking, destination: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={editingBooking.startDate}
                      onChange={(e) => setEditingBooking({ ...editingBooking, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={editingBooking.endDate}
                      onChange={(e) => setEditingBooking({ ...editingBooking, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Passengers</label>
                    <input
                      type="number"
                      value={editingBooking.paxAdults}
                      onChange={(e) => setEditingBooking({ ...editingBooking, paxAdults: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount</label>
                    <input
                      type="number"
                      value={editingBooking.totalAmount}
                      onChange={(e) => setEditingBooking({ ...editingBooking, totalAmount: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select
                      value={editingBooking.status}
                      onChange={(e) => setEditingBooking({ ...editingBooking, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      value={editingBooking.category}
                      onChange={(e) => setEditingBooking({ ...editingBooking, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none"
                    >
                      <option value="school_college">School/College</option>
                      <option value="corporate_retreat">Corporate Retreat</option>
                      <option value="vacation_family">Vacation & Family</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setEditingBooking(null)}
                  className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-white bg-[#012871] rounded-lg hover:bg-[#011e5b]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

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
          <button
            onClick={() => { setView('all'); resetFilters(); }}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CalendarCheck className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">All Bookings</h2>
                <p className="text-slate-500 text-sm">View and manage all trip bookings</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-2xl font-bold text-primary-600">{bookings.length}</span>
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

          <button
            onClick={() => setView('create')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
            <button
              onClick={() => { setView('school_college'); resetFilters(); }}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
              style={{ minHeight: '300px' }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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

            <button
              onClick={() => { setView('corporate_retreat'); resetFilters(); }}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-xl hover:-translate-y-1"
              style={{ minHeight: '300px' }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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

            <button
              onClick={() => { setView('vacation_family'); resetFilters(); }}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
              style={{ minHeight: '300px' }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
    return renderBookingList('All Bookings', () => setView('menu'));
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

        <div className="bg-white rounded-3xl border border-slate-200 p-6">
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
    return renderBookingList('School/College Bookings', () => setView('menu'), schoolCollegeBookings);
  }

  if (view === 'corporate_retreat') {
    return renderBookingList('Corporate Retreat Bookings', () => setView('menu'), corporateRetreatBookings);
  }

  if (view === 'vacation_family') {
    return renderBookingList('Vacation & Family Bookings', () => setView('menu'), vacationFamilyBookings);
  }

  return null;
}
