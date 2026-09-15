import React, { useState } from 'react';
import { 
  FileText, Plus, Eye, Printer, Hotel, Car, UserCheck, 
  MapPin, Calendar, ArrowLeft, Utensils, Ticket, MoreHorizontal,
  CheckCircle, Clock, AlertCircle
} from 'lucide-react';

interface Assignment {
  id: string;
  assignmentNumber: string;
  type: 'vehicle' | 'guide' | 'hotel' | 'restaurant' | 'activity' | 'permit' | 'others';
  supplierName: string;
  clientName: string;
  bookingNumber: string;
  serviceDate: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  amount: number;
}

const mockAssignments: Assignment[] = [
  { id: '1', assignmentNumber: 'ASN-2024-001', type: 'hotel', supplierName: 'Serengeti Lodge', clientName: 'John Smith', bookingNumber: 'BK-2024-001', serviceDate: '2024-06-15', status: 'confirmed', amount: 4500 },
  { id: '2', assignmentNumber: 'ASN-2024-002', type: 'vehicle', supplierName: 'Safari Wheels', clientName: 'Sarah Johnson', bookingNumber: 'BK-2024-002', serviceDate: '2024-07-10', status: 'pending', amount: 1200 },
  { id: '3', assignmentNumber: 'ASN-2024-003', type: 'guide', supplierName: 'Expert Guides Ltd', clientName: 'Michael Brown', bookingNumber: 'BK-2024-003', serviceDate: '2024-05-20', status: 'in_progress', amount: 800 },
  { id: '4', assignmentNumber: 'ASN-2024-004', type: 'activity', supplierName: 'Adventure Tours', clientName: 'Emily Davis', bookingNumber: 'BK-2024-004', serviceDate: '2024-08-05', status: 'confirmed', amount: 2500 },
  { id: '5', assignmentNumber: 'ASN-2024-005', type: 'restaurant', supplierName: 'The Safari Kitchen', clientName: 'David Wilson', bookingNumber: 'BK-2024-005', serviceDate: '2024-09-01', status: 'pending', amount: 650 },
  { id: '6', assignmentNumber: 'ASN-2024-006', type: 'permit', supplierName: 'National Parks Authority', clientName: 'Tech Corp Ltd', bookingNumber: 'BK-2024-006', serviceDate: '2024-10-15', status: 'confirmed', amount: 1800 },
  { id: '7', assignmentNumber: 'ASN-2024-007', type: 'vehicle', supplierName: 'Luxury Transfers', clientName: 'Lisa Anderson', bookingNumber: 'BK-2024-007', serviceDate: '2024-11-01', status: 'in_progress', amount: 950 },
  { id: '8', assignmentNumber: 'ASN-2024-008', type: 'hotel', supplierName: 'Zanzibar Beach Resort', clientName: 'Harvard University', bookingNumber: 'BK-2024-008', serviceDate: '2024-12-10', status: 'pending', amount: 8500 },
  { id: '9', assignmentNumber: 'ASN-2024-009', type: 'guide', supplierName: 'Cultural Tours Inc', clientName: 'Google Inc', bookingNumber: 'BK-2024-009', serviceDate: '2025-01-15', status: 'confirmed', amount: 2200 },
  { id: '10', assignmentNumber: 'ASN-2024-010', type: 'activity', supplierName: 'Water Sports Center', clientName: 'Robert Taylor', bookingNumber: 'BK-2024-010', serviceDate: '2025-02-01', status: 'pending', amount: 1500 },
  { id: '11', assignmentNumber: 'ASN-2024-011', type: 'others', supplierName: 'Insurance Provider', clientName: 'Stanford University', bookingNumber: 'BK-2024-011', serviceDate: '2025-03-05', status: 'confirmed', amount: 3200 },
  { id: '12', assignmentNumber: 'ASN-2024-012', type: 'restaurant', supplierName: 'Fine Dining Experience', clientName: 'Microsoft Corp', bookingNumber: 'BK-2024-012', serviceDate: '2025-04-10', status: 'in_progress', amount: 1800 },
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

const statusIcons: Record<string, any> = {
  pending: Clock,
  confirmed: CheckCircle,
  in_progress: AlertCircle,
  completed: CheckCircle,
  cancelled: AlertCircle,
};

export default function Operations() {
  const [view, setView] = useState<'menu' | 'all' | 'create' | 'vehicle' | 'guide' | 'hotel' | 'restaurant' | 'activity' | 'permit' | 'others'>('menu');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Count assignments by type
  const assignmentsByType = {
    vehicle: mockAssignments.filter(a => a.type === 'vehicle').length,
    guide: mockAssignments.filter(a => a.type === 'guide').length,
    hotel: mockAssignments.filter(a => a.type === 'hotel').length,
    restaurant: mockAssignments.filter(a => a.type === 'restaurant').length,
    activity: mockAssignments.filter(a => a.type === 'activity').length,
    permit: mockAssignments.filter(a => a.type === 'permit').length,
    others: mockAssignments.filter(a => a.type === 'others').length,
  };

  // Count assignments by status
  const statusCounts = {
    pending: mockAssignments.filter(a => a.status === 'pending').length,
    confirmed: mockAssignments.filter(a => a.status === 'confirmed').length,
    in_progress: mockAssignments.filter(a => a.status === 'in_progress').length,
    total: mockAssignments.length,
  };

  const renderAssignmentList = (title: string, onBack: () => void, preFilteredAssignments?: Assignment[]) => {
    const displayAssignments = preFilteredAssignments || mockAssignments;

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
          {displayAssignments.map((assignment) => {
            const Icon = typeIcons[assignment.type] || FileText;
            const StatusIcon = statusIcons[assignment.status] || Clock;
            
            return (
              <div key={assignment.id} onClick={() => setSelectedAssignment(assignment)} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="p-5 border-b border-slate-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${typeColors[assignment.type]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">{assignment.supplierName}</h3>
                        <p className="text-sm text-slate-500">{assignment.clientName}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[assignment.status]} flex items-center gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {getStatusLabel(assignment.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-0.5 bg-slate-100 rounded">{getTypeLabel(assignment.type)}</span>
                    <span>•</span>
                    <span>{assignment.assignmentNumber}</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{new Date(assignment.serviceDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>{assignment.bookingNumber}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-lg font-bold text-[#012871]">${assignment.amount.toLocaleString()}</p>
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
            );
          })}
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
                <span className="text-2xl font-bold text-primary-600">{mockAssignments.length}</span>
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
                <p className="text-slate-500 text-sm">Create a new service assignment</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Quick assignment creation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Auto-link to bookings</span>
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

  // Create Assignment View
  if (view === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">New Assignment</h1>
            <p className="text-slate-500 mt-1">Create a new service assignment</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assignment Type</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                  <option value="vehicle">Vehicle</option>
                  <option value="guide">Guide</option>
                  <option value="hotel">Hotel</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="activity">Activity</option>
                  <option value="permit">Permit</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Supplier Name</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="Enter supplier name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="Enter client name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Booking Number</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="BK-2024-XXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Date</label>
                <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="0.00" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setView('menu')} className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={() => setView('all')} className="px-4 py-2 text-white bg-[#f35500] rounded-lg hover:bg-[#c54300]">Create Assignment</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Type-specific views
  if (view === 'vehicle') {
    const vehicleAssignments = mockAssignments.filter(a => a.type === 'vehicle');
    return renderAssignmentList('Vehicle Assignments', () => setView('menu'), vehicleAssignments);
  }

  if (view === 'guide') {
    const guideAssignments = mockAssignments.filter(a => a.type === 'guide');
    return renderAssignmentList('Guide Assignments', () => setView('menu'), guideAssignments);
  }

  if (view === 'hotel') {
    const hotelAssignments = mockAssignments.filter(a => a.type === 'hotel');
    return renderAssignmentList('Hotel Assignments', () => setView('menu'), hotelAssignments);
  }

  if (view === 'restaurant') {
    const restaurantAssignments = mockAssignments.filter(a => a.type === 'restaurant');
    return renderAssignmentList('Restaurant Assignments', () => setView('menu'), restaurantAssignments);
  }

  if (view === 'activity') {
    const activityAssignments = mockAssignments.filter(a => a.type === 'activity');
    return renderAssignmentList('Activity Assignments', () => setView('menu'), activityAssignments);
  }

  if (view === 'permit') {
    const permitAssignments = mockAssignments.filter(a => a.type === 'permit');
    return renderAssignmentList('Permit Assignments', () => setView('menu'), permitAssignments);
  }

  if (view === 'others') {
    const othersAssignments = mockAssignments.filter(a => a.type === 'others');
    return renderAssignmentList('Other Assignments', () => setView('menu'), othersAssignments);
  }

  return null;
}
