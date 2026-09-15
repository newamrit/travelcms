import React, { useState } from 'react';
import { 
  FileText, Plus, Eye, Printer, Hotel, Car, UserCheck, 
  MapPin, Calendar, ArrowLeft, Utensils, Ticket, MoreHorizontal,
  CheckCircle, Clock, AlertCircle, Trash2, X
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

interface AssignmentItem {
  id: string;
  type: 'vehicle' | 'guide' | 'hotel' | 'restaurant' | 'activity' | 'permit' | 'others';
  supplierName: string;
  serviceDate: string;
  amount: number;
  notes: string;
  // Vehicle-specific fields
  vehicleNumber?: string;
  vehicleType?: 'Scorpio' | 'Bolero' | '712 Bus' | 'Super' | 'Tourist' | 'Hiace' | 'EV Micro' | 'MiniBus';
}

interface Assignment {
  id: string;
  assignmentNumber: string;
  bookingId: string;
  bookingNumber: string;
  clientName: string;
  items: AssignmentItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

// Mock confirmed bookings
const mockConfirmedBookings: Booking[] = [
  { id: '1', bookingNumber: 'BK-2024-001', clientName: 'John Smith', destination: 'Tanzania Safari', startDate: '2024-06-15', endDate: '2024-06-22', paxCount: 4, status: 'confirmed', totalAmount: 12500, category: 'vacation_family' },
  { id: '4', bookingNumber: 'BK-2024-004', clientName: 'Emily Davis', destination: 'South Africa Tour', startDate: '2024-08-05', endDate: '2024-08-12', paxCount: 6, status: 'confirmed', totalAmount: 22800, category: 'school_college' },
  { id: '5', bookingNumber: 'BK-2024-005', clientName: 'David Wilson', destination: 'Zanzibar Beach', startDate: '2024-09-01', endDate: '2024-09-08', paxCount: 2, status: 'confirmed', totalAmount: 9500, category: 'vacation_family' },
  { id: '6', bookingNumber: 'BK-2024-006', clientName: 'Tech Corp Ltd', destination: 'Team Building Kenya', startDate: '2024-10-15', endDate: '2024-10-18', paxCount: 25, status: 'confirmed', totalAmount: 45000, category: 'corporate_retreat' },
  { id: '8', bookingNumber: 'BK-2024-008', clientName: 'Harvard University', destination: 'Biology Field Trip', startDate: '2024-12-10', endDate: '2024-12-17', paxCount: 30, status: 'confirmed', totalAmount: 52000, category: 'school_college' },
  { id: '9', bookingNumber: 'BK-2024-009', clientName: 'Google Inc', destination: 'Annual Retreat Bali', startDate: '2025-01-15', endDate: '2025-01-22', paxCount: 50, status: 'confirmed', totalAmount: 125000, category: 'corporate_retreat' },
  { id: '11', bookingNumber: 'BK-2024-011', clientName: 'Stanford University', destination: 'Archaeology Expedition', startDate: '2025-03-05', endDate: '2025-03-12', paxCount: 20, status: 'confirmed', totalAmount: 38000, category: 'school_college' },
  { id: '12', bookingNumber: 'BK-2024-012', clientName: 'Microsoft Corp', destination: 'Leadership Retreat', startDate: '2025-04-10', endDate: '2025-04-15', paxCount: 35, status: 'confirmed', totalAmount: 89000, category: 'corporate_retreat' },
];

// Mock existing assignments
const mockAssignments: Assignment[] = [
  { 
    id: '1', 
    assignmentNumber: 'ASN-2024-001', 
    bookingId: '1',
    bookingNumber: 'BK-2024-001',
    clientName: 'John Smith',
    items: [
      { id: '1', type: 'hotel', supplierName: 'Serengeti Lodge', serviceDate: '2024-06-15', amount: 4500, notes: '3 nights accommodation' },
      { id: '2', type: 'vehicle', supplierName: 'Safari Wheels', serviceDate: '2024-06-15', amount: 1200, notes: '4x4 vehicle for 7 days' },
    ],
    totalAmount: 5700,
    status: 'confirmed',
    createdAt: '2024-03-01'
  },
  { 
    id: '2', 
    assignmentNumber: 'ASN-2024-002', 
    bookingId: '4',
    bookingNumber: 'BK-2024-004',
    clientName: 'Emily Davis',
    items: [
      { id: '3', type: 'hotel', supplierName: 'Cape Town Hotel', serviceDate: '2024-08-05', amount: 8500, notes: '7 nights for 6 pax' },
      { id: '4', type: 'guide', supplierName: 'Expert Guides Ltd', serviceDate: '2024-08-05', amount: 2200, notes: 'Professional guide for 7 days' },
      { id: '5', type: 'activity', supplierName: 'Adventure Tours', serviceDate: '2024-08-07', amount: 3500, notes: 'Table Mountain tour' },
    ],
    totalAmount: 14200,
    status: 'pending',
    createdAt: '2024-03-05'
  },
];

const typeIcons: Record<string, any> = {
  vehicle: Car,
  guide: UserCheck,
  hotel: Hotel,
  restaurant: Utensils,
  activity: MapPin,
  permit: Ticket,
  others: MoreHorizontal,
};

const typeColors: Record<string, string> = {
  vehicle: 'bg-green-100 text-green-700',
  guide: 'bg-purple-100 text-purple-700',
  hotel: 'bg-blue-100 text-blue-700',
  restaurant: 'bg-orange-100 text-orange-700',
  activity: 'bg-pink-100 text-pink-700',
  permit: 'bg-indigo-100 text-indigo-700',
  others: 'bg-slate-100 text-slate-700',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  in_progress: 'bg-purple-100 text-purple-700 border-purple-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export default function Operations() {
  const [view, setView] = useState<'menu' | 'all' | 'create' | 'vehicle' | 'guide' | 'hotel' | 'restaurant' | 'activity' | 'permit' | 'others'>('menu');
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  
  // New assignment state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [assignmentItems, setAssignmentItems] = useState<AssignmentItem[]>([]);

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Count assignments by type
  const assignmentsByType = {
    vehicle: assignments.reduce((sum, a) => sum + a.items.filter(i => i.type === 'vehicle').length, 0),
    guide: assignments.reduce((sum, a) => sum + a.items.filter(i => i.type === 'guide').length, 0),
    hotel: assignments.reduce((sum, a) => sum + a.items.filter(i => i.type === 'hotel').length, 0),
    restaurant: assignments.reduce((sum, a) => sum + a.items.filter(i => i.type === 'restaurant').length, 0),
    activity: assignments.reduce((sum, a) => sum + a.items.filter(i => i.type === 'activity').length, 0),
    permit: assignments.reduce((sum, a) => sum + a.items.filter(i => i.type === 'permit').length, 0),
    others: assignments.reduce((sum, a) => sum + a.items.filter(i => i.type === 'others').length, 0),
  };

  // Count assignments by status
  const statusCounts = {
    pending: assignments.filter(a => a.status === 'pending').length,
    confirmed: assignments.filter(a => a.status === 'confirmed').length,
    in_progress: assignments.filter(a => a.status === 'in_progress').length,
    total: assignments.length,
  };

  // Add new assignment item
  const addAssignmentItem = () => {
    const newItem: AssignmentItem = {
      id: String(Date.now()),
      type: 'hotel',
      supplierName: '',
      serviceDate: '',
      amount: 0,
      notes: '',
    };
    setAssignmentItems([...assignmentItems, newItem]);
  };

  // Update assignment item
  const updateAssignmentItem = (id: string, field: keyof AssignmentItem, value: any) => {
    setAssignmentItems(assignmentItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Remove assignment item
  const removeAssignmentItem = (id: string) => {
    setAssignmentItems(assignmentItems.filter(item => item.id !== id));
  };

  // Calculate total amount
  const calculateTotal = () => {
    return assignmentItems.reduce((sum, item) => sum + item.amount, 0);
  };

  // Save assignment
  const handleSaveAssignment = () => {
    if (!selectedBooking || assignmentItems.length === 0) {
      alert('Please select a booking and add at least one assignment item');
      return;
    }

    const newAssignment: Assignment = {
      id: String(Date.now()),
      assignmentNumber: `ASN-2024-${String(assignments.length + 1).padStart(3, '0')}`,
      bookingId: selectedBooking.id,
      bookingNumber: selectedBooking.bookingNumber,
      clientName: selectedBooking.clientName,
      items: assignmentItems,
      totalAmount: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAssignments([...assignments, newAssignment]);
    
    // Reset form
    setSelectedBooking(null);
    setAssignmentItems([]);
    setView('all');
  };

  // Reset create form
  const resetCreateForm = () => {
    setSelectedBooking(null);
    setAssignmentItems([]);
  };

  const renderAssignmentList = (title: string, onBack: () => void, preFilteredAssignments?: Assignment[]) => {
    const displayAssignments = preFilteredAssignments || assignments;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
              <p className="text-slate-500 mt-1">{displayAssignments.length} assignments</p>
            </div>
          </div>
          <button onClick={() => setView('create')} className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]">
            <Plus className="w-4 h-4" /> New Assignment
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAssignments.map((assignment) => (
            <div key={assignment.id} onClick={() => setSelectedAssignment(assignment)} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-800">{assignment.clientName}</h3>
                    <p className="text-sm text-slate-500">{assignment.bookingNumber}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[assignment.status]}`}>
                    {getStatusLabel(assignment.status)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{assignment.items.length} items</span>
                  <span>•</span>
                  <span>{assignment.assignmentNumber}</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {assignment.items.slice(0, 4).map((item, idx) => {
                    const Icon = typeIcons[item.type] || FileText;
                    return (
                      <div key={idx} className={`px-2 py-1 rounded ${typeColors[item.type]} text-xs flex items-center gap-1`}>
                        <Icon className="w-3 h-3" />
                        <span>{getTypeLabel(item.type)}</span>
                      </div>
                    );
                  })}
                  {assignment.items.length > 4 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                      +{assignment.items.length - 4} more
                    </span>
                  )}
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-lg font-bold text-[#012871]">${assignment.totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">Created {assignment.createdAt}</p>
                </div>
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#012871]">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-[#012871]">
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main Menu
  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operations</h1>
          <p className="text-slate-500 mt-1">Manage assignments and service confirmations</p>
        </div>

        {/* Top Section - Two Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* All Assignments Card */}
          <button
            onClick={() => setView('all')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">All Assignments</h2>
                <p className="text-slate-500 text-sm">View and manage all service assignments</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-2xl font-bold text-primary-600">{assignments.length}</span>
                <span className="text-sm text-primary-500">assignments</span>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* New Assignment Card */}
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
                <h2 className="text-2xl font-bold text-slate-800 mb-2">New Assignment</h2>
                <p className="text-slate-500 text-sm">Assign services to confirmed bookings</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Select confirmed booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Add multiple services</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Hotels, vehicles, guides & more</span>
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

        {/* Middle Section - Assignments by Type */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Assignments by Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {/* Vehicle */}
            <button
              onClick={() => setView('vehicle')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Vehicle</h3>
                  <p className="text-2xl font-bold text-primary-600">{assignmentsByType.vehicle}</p>
                </div>
              </div>
            </button>

            {/* Guide */}
            <button
              onClick={() => setView('guide')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#f35500] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Guide</h3>
                  <p className="text-2xl font-bold text-accent-600">{assignmentsByType.guide}</p>
                </div>
              </div>
            </button>

            {/* Hotel */}
            <button
              onClick={() => setView('hotel')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Hotel className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Hotel</h3>
                  <p className="text-2xl font-bold text-primary-600">{assignmentsByType.hotel}</p>
                </div>
              </div>
            </button>

            {/* Restaurant */}
            <button
              onClick={() => setView('restaurant')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#f35500] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Restaurant</h3>
                  <p className="text-2xl font-bold text-accent-600">{assignmentsByType.restaurant}</p>
                </div>
              </div>
            </button>

            {/* Activity */}
            <button
              onClick={() => setView('activity')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Activity</h3>
                  <p className="text-2xl font-bold text-primary-600">{assignmentsByType.activity}</p>
                </div>
              </div>
            </button>

            {/* Permit */}
            <button
              onClick={() => setView('permit')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#f35500] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Permit</h3>
                  <p className="text-2xl font-bold text-accent-600">{assignmentsByType.permit}</p>
                </div>
              </div>
            </button>

            {/* Others */}
            <button
              onClick={() => setView('others')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MoreHorizontal className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Others</h3>
                  <p className="text-2xl font-bold text-primary-600">{assignmentsByType.others}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Section - Status Overview */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Status Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Pending */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">{statusCounts.pending}</p>
              <p className="text-sm text-slate-500 mt-1">Pending</p>
            </div>

            {/* Confirmed */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">{statusCounts.confirmed}</p>
              <p className="text-sm text-slate-500 mt-1">Confirmed</p>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-purple-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">{statusCounts.in_progress}</p>
              <p className="text-sm text-slate-500 mt-1">In Progress</p>
            </div>

            {/* Total */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#012871]">{statusCounts.total}</p>
              <p className="text-sm text-slate-500 mt-1">Total</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // All Assignments View
  if (view === 'all') {
    return renderAssignmentList('All Assignments', () => setView('menu'));
  }

  // Create Assignment View - Enhanced with multi-item support
  if (view === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => { setView('menu'); resetCreateForm(); }} className="p-2 rounded-lg hover:bg-[#012871]/10 text-[#012871] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#012871] to-[#f35500] bg-clip-text text-transparent">New Assignment</h1>
            <p className="text-slate-600 mt-1">Assign services to confirmed bookings</p>
          </div>
        </div>

        {/* Step 1: Select Booking */}
        <div className="bg-white rounded-3xl border-2 border-[#012871]/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#012871] flex items-center justify-center text-white font-bold">1</div>
            <h2 className="text-lg font-semibold text-[#012871]">Select Confirmed Booking</h2>
          </div>
          
          {!selectedBooking ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockConfirmedBookings.map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className="p-4 border-2 border-slate-200 rounded-2xl hover:border-[#012871] hover:shadow-lg hover:-translate-y-1 transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-800 group-hover:text-[#012871] transition-colors">{booking.clientName}</h3>
                      <p className="text-sm text-slate-500">{booking.bookingNumber}</p>
                    </div>
                    <span className="px-2 py-1 bg-[#012871]/10 text-[#012871] rounded-full text-xs font-medium border border-[#012871]/20">
                      Confirmed
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#f35500]" />
                      {booking.destination}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#f35500]" />
                      {booking.startDate} → {booking.endDate}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#f35500]">👥</span>
                      {booking.paxCount} pax
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-lg font-bold text-[#012871]">${booking.totalAmount.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 border-2 border-[#012871] rounded-2xl bg-gradient-to-br from-[#012871]/5 to-[#f35500]/5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#012871] text-lg">{selectedBooking.clientName}</h3>
                  <p className="text-sm text-slate-600 font-medium">{selectedBooking.bookingNumber}</p>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#f35500]" />
                      {selectedBooking.destination}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#f35500]" />
                      {selectedBooking.startDate} → {selectedBooking.endDate}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#f35500]">👥</span>
                      {selectedBooking.paxCount} pax
                    </p>
                  </div>
                  <p className="mt-3 text-xl font-bold text-[#012871]">${selectedBooking.totalAmount.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 rounded-lg hover:bg-white text-slate-600 hover:text-[#f35500] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Add Assignment Items */}
        {selectedBooking && (
          <div className="bg-white rounded-3xl border-2 border-[#f35500]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f35500] flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-lg font-semibold text-[#f35500]">Add Services</h2>
              </div>
              <button
                onClick={addAssignmentItem}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#f35500] to-[#c54300] text-white rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>

            {assignmentItems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-[#f35500]/30 rounded-2xl bg-gradient-to-br from-[#f35500]/5 to-transparent">
                <div className="w-16 h-16 rounded-full bg-[#f35500]/10 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-[#f35500]" />
                </div>
                <p className="text-slate-700 font-medium mb-2">No services added yet</p>
                <p className="text-sm text-slate-500">Click "Add Service" to assign hotels, vehicles, guides, etc.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assignmentItems.map((item, index) => {
                  const Icon = typeIcons[item.type] || FileText;
                  return (
                    <div key={item.id} className="p-4 border-2 border-[#012871]/10 rounded-2xl hover:border-[#012871]/30 transition-colors bg-gradient-to-br from-white to-[#012871]/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[item.type]}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-[#012871]">Service #{index + 1}</span>
                        </div>
                        <button
                          onClick={() => removeAssignmentItem(item.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-[#f35500] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#012871] mb-1">Service Type</label>
                          <select
                            value={item.type}
                            onChange={(e) => updateAssignmentItem(item.id, 'type', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all"
                          >
                            <option value="hotel">Hotel</option>
                            <option value="vehicle">Vehicle</option>
                            <option value="guide">Guide</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="activity">Activity</option>
                            <option value="permit">Permit</option>
                            <option value="others">Others</option>
                          </select>
                        </div>

                        {/* Vehicle-specific fields */}
                        {item.type === 'vehicle' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-[#012871] mb-1">Vehicle Number</label>
                              <input
                                type="text"
                                value={item.vehicleNumber || ''}
                                onChange={(e) => updateAssignmentItem(item.id, 'vehicleNumber', e.target.value)}
                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all"
                                placeholder="e.g., KA01AB1234"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#012871] mb-1">Vehicle Type</label>
                              <select
                                value={item.vehicleType || ''}
                                onChange={(e) => updateAssignmentItem(item.id, 'vehicleType', e.target.value)}
                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all"
                              >
                                <option value="">Select vehicle type</option>
                                <option value="Scorpio">Scorpio</option>
                                <option value="Bolero">Bolero</option>
                                <option value="712 Bus">712 Bus</option>
                                <option value="Super">Super</option>
                                <option value="Tourist">Tourist</option>
                                <option value="Hiace">Hiace</option>
                                <option value="EV Micro">EV Micro</option>
                                <option value="MiniBus">MiniBus</option>
                              </select>
                            </div>
                          </>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-[#012871] mb-1">Supplier Name</label>
                          <input
                            type="text"
                            value={item.supplierName}
                            onChange={(e) => updateAssignmentItem(item.id, 'supplierName', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all"
                            placeholder="Enter supplier name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#012871] mb-1">Service Date</label>
                          <input
                            type="date"
                            value={item.serviceDate}
                            onChange={(e) => updateAssignmentItem(item.id, 'serviceDate', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#012871] mb-1">Amount ($)</label>
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) => updateAssignmentItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all"
                            placeholder="0.00"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-[#012871] mb-1">Notes</label>
                          <input
                            type="text"
                            value={item.notes}
                            onChange={(e) => updateAssignmentItem(item.id, 'notes', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all"
                            placeholder="Additional notes (optional)"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Total Summary */}
                <div className="p-5 bg-gradient-to-r from-[#012871] to-[#011950] rounded-2xl text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">Total Services</p>
                      <p className="text-2xl font-bold">{assignmentItems.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/80">Total Amount</p>
                      <p className="text-2xl font-bold">${calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <button
                      onClick={addAssignmentItem}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors w-full justify-center"
                    >
                      <Plus className="w-4 h-4" /> Add Another Service
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {assignmentItems.length > 0 && (
              <div className="flex justify-end gap-3 pt-6 border-t-2 border-slate-200 mt-6">
                <button
                  onClick={() => { setView('menu'); resetCreateForm(); }}
                  className="px-6 py-2.5 text-[#012871] bg-white border-2 border-[#012871] rounded-lg font-medium hover:bg-[#012871]/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssignment}
                  className="px-6 py-2.5 text-white bg-gradient-to-r from-[#f35500] to-[#c54300] rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Save Assignment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Type-specific views
  if (view === 'vehicle') {
    const vehicleAssignments = assignments.filter(a => a.items.some(i => i.type === 'vehicle'));
    return renderAssignmentList('Vehicle Assignments', () => setView('menu'), vehicleAssignments);
  }

  if (view === 'guide') {
    const guideAssignments = assignments.filter(a => a.items.some(i => i.type === 'guide'));
    return renderAssignmentList('Guide Assignments', () => setView('menu'), guideAssignments);
  }

  if (view === 'hotel') {
    const hotelAssignments = assignments.filter(a => a.items.some(i => i.type === 'hotel'));
    return renderAssignmentList('Hotel Assignments', () => setView('menu'), hotelAssignments);
  }

  if (view === 'restaurant') {
    const restaurantAssignments = assignments.filter(a => a.items.some(i => i.type === 'restaurant'));
    return renderAssignmentList('Restaurant Assignments', () => setView('menu'), restaurantAssignments);
  }

  if (view === 'activity') {
    const activityAssignments = assignments.filter(a => a.items.some(i => i.type === 'activity'));
    return renderAssignmentList('Activity Assignments', () => setView('menu'), activityAssignments);
  }

  if (view === 'permit') {
    const permitAssignments = assignments.filter(a => a.items.some(i => i.type === 'permit'));
    return renderAssignmentList('Permit Assignments', () => setView('menu'), permitAssignments);
  }

  if (view === 'others') {
    const othersAssignments = assignments.filter(a => a.items.some(i => i.type === 'others'));
    return renderAssignmentList('Other Assignments', () => setView('menu'), othersAssignments);
  }

  return null;
}
