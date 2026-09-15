import React, { useState } from 'react';
import { Building2, Plus, Phone, Mail, MapPin, Star, Edit2, Trash2, ArrowLeft, Users, Car, UserCheck, Utensils, Ticket, MoreHorizontal } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  type: 'Vehicle' | 'Guide' | 'Hotel' | 'Restaurant' | 'Activity' | 'Permit' | 'Others';
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  rating: number;
}

const mockVendors: Vendor[] = [
  { id: '1', name: 'Serengeti Luxury Lodge', type: 'Hotel', contactPerson: 'John Mwangi', email: 'info@serengeti.com', phone: '+255 712 345678', location: 'Arusha, Tanzania', rating: 5 },
  { id: '2', name: 'Safari Wheels Ltd', type: 'Vehicle', contactPerson: 'Peter Ochieng', email: 'book@safariwheels.com', phone: '+255 754 321987', location: 'Nairobi, Kenya', rating: 4 },
  { id: '3', name: 'Expert Guides Tanzania', type: 'Guide', contactPerson: 'Samuel Kimaro', email: 'sam@expertguides.com', phone: '+255 688 111222', location: 'Arusha, Tanzania', rating: 5 },
  { id: '4', name: 'Zanzibar Beach Resort', type: 'Hotel', contactPerson: 'Amina Hassan', email: 'info@zanzibarbeach.com', phone: '+255 777 654321', location: 'Zanzibar, Tanzania', rating: 4 },
  { id: '5', name: 'Adventure Tours Kenya', type: 'Activity', contactPerson: 'David Kamau', email: 'info@adventuretours.co.ke', phone: '+254 722 987654', location: 'Nairobi, Kenya', rating: 4 },
  { id: '6', name: 'National Parks Authority', type: 'Permit', contactPerson: 'Permits Office', email: 'permits@nca.go.tz', phone: '+255 22 2152300', location: 'Dar es Salaam, Tanzania', rating: 4 },
  { id: '7', name: 'The Safari Kitchen', type: 'Restaurant', contactPerson: 'Chef Maria', email: 'info@safarikitchen.com', phone: '+255 712 999888', location: 'Arusha, Tanzania', rating: 5 },
  { id: '8', name: 'Luxury Transfers', type: 'Vehicle', contactPerson: 'James Mwangi', email: 'info@luxurytransfers.com', phone: '+255 754 111222', location: 'Nairobi, Kenya', rating: 4 },
  { id: '9', name: 'Cultural Tours Inc', type: 'Guide', contactPerson: 'Sarah Johnson', email: 'info@culturaltours.com', phone: '+255 688 333444', location: 'Arusha, Tanzania', rating: 5 },
  { id: '10', name: 'Water Sports Center', type: 'Activity', contactPerson: 'Mike Davis', email: 'info@watersports.com', phone: '+255 777 555666', location: 'Zanzibar, Tanzania', rating: 4 },
  { id: '11', name: 'Insurance Provider Ltd', type: 'Others', contactPerson: 'Claims Dept', email: 'claims@insurance.com', phone: '+255 22 111222', location: 'Dar es Salaam, Tanzania', rating: 3 },
  { id: '12', name: 'Fine Dining Experience', type: 'Restaurant', contactPerson: 'Chef Robert', email: 'info@finedining.com', phone: '+255 712 777888', location: 'Arusha, Tanzania', rating: 5 },
];

const typeColors: Record<string, string> = {
  Vehicle: 'bg-green-100 text-green-700',
  Guide: 'bg-purple-100 text-purple-700',
  Hotel: 'bg-blue-100 text-blue-700',
  Restaurant: 'bg-orange-100 text-orange-700',
  Activity: 'bg-pink-100 text-pink-700',
  Permit: 'bg-indigo-100 text-indigo-700',
  Others: 'bg-slate-100 text-slate-700',
};

const typeIcons: Record<string, any> = {
  Vehicle: Car,
  Guide: UserCheck,
  Hotel: Building2,
  Restaurant: Utensils,
  Activity: MapPin,
  Permit: Ticket,
  Others: MoreHorizontal,
};

export default function Vendors() {
  const [view, setView] = useState<'menu' | 'directory' | 'add'>('menu');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#012871] to-[#f35500] bg-clip-text text-transparent">Vendors</h1>
          <p className="text-slate-600 mt-1">Manage your supplier and vendor relationships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => setView('directory')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Vendor Directory</h2>
                <p className="text-slate-500 text-sm">Browse and manage existing vendors</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#012871]/10 rounded-full">
                <span className="text-2xl font-bold text-[#012871]">{mockVendors.length}</span>
                <span className="text-sm text-[#012871]/70">vendors</span>
              </div>
              <div className="flex items-center gap-2 text-[#012871] font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Directory</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => setView('add')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Add New Vendor</h2>
                <p className="text-slate-500 text-sm">Register a new supplier or vendor</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f35500]"></div>
                  <span>Hotels & lodges</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f35500]"></div>
                  <span>Transport companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f35500]"></div>
                  <span>Guides & activities</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#f35500] font-medium text-sm group-hover:gap-3 transition-all">
                <span>Add Vendor</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Vendors by Category Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#012871] mb-6">Vendors by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {/* Vehicle */}
            <button
              onClick={() => setView('directory')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Vehicle</h3>
                  <p className="text-2xl font-bold text-[#012871]">{mockVendors.filter(v => v.type === 'Vehicle').length}</p>
                </div>
              </div>
            </button>

            {/* Guide */}
            <button
              onClick={() => setView('directory')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#f35500] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Guide</h3>
                  <p className="text-2xl font-bold text-[#f35500]">{mockVendors.filter(v => v.type === 'Guide').length}</p>
                </div>
              </div>
            </button>

            {/* Hotel */}
            <button
              onClick={() => setView('directory')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Hotel</h3>
                  <p className="text-2xl font-bold text-[#012871]">{mockVendors.filter(v => v.type === 'Hotel').length}</p>
                </div>
              </div>
            </button>

            {/* Restaurant */}
            <button
              onClick={() => setView('directory')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#f35500] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Restaurant</h3>
                  <p className="text-2xl font-bold text-[#f35500]">{mockVendors.filter(v => v.type === 'Restaurant').length}</p>
                </div>
              </div>
            </button>

            {/* Activity */}
            <button
              onClick={() => setView('directory')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Activity</h3>
                  <p className="text-2xl font-bold text-[#012871]">{mockVendors.filter(v => v.type === 'Activity').length}</p>
                </div>
              </div>
            </button>

            {/* Permit */}
            <button
              onClick={() => setView('directory')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#f35500] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Permit</h3>
                  <p className="text-2xl font-bold text-[#f35500]">{mockVendors.filter(v => v.type === 'Permit').length}</p>
                </div>
              </div>
            </button>

            {/* Others */}
            <button
              onClick={() => setView('directory')}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-center transition-all duration-300 hover:border-[#012871] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MoreHorizontal className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Others</h3>
                  <p className="text-2xl font-bold text-[#012871]">{mockVendors.filter(v => v.type === 'Others').length}</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter vendors based on search and category
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = searchTerm === '' || 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || vendor.type === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (view === 'directory') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-[#012871]/10 text-[#012871] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#012871]">Vendor Directory</h1>
              <p className="text-slate-600 mt-1">All registered vendors and suppliers</p>
            </div>
          </div>
          <button onClick={() => setView('add')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus className="w-4 h-4" /> Add Vendor
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl border-2 border-[#012871]/20 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative md:col-span-2">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#012871]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, contact, email, or location..."
                className="w-full pl-10 pr-4 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all bg-white"
              >
                <option value="all">All Categories</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Guide">Guide</option>
                <option value="Hotel">Hotel</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Activity">Activity</option>
                <option value="Permit">Permit</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* Filter Status */}
          {(searchTerm || categoryFilter !== 'all') && (
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-[#012871]">{filteredVendors.length}</span> of <span className="font-semibold">{mockVendors.length}</span> vendors
              </p>
              <button
                onClick={() => { setSearchTerm(''); setCategoryFilter('all'); }}
                className="text-sm text-[#f35500] hover:underline font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => {
            const Icon = typeIcons[vendor.type] || Building2;
            return (
            <div key={vendor.id} className="bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[vendor.type]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{vendor.name}</h3>
                    <p className="text-xs text-slate-500">{vendor.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[vendor.type]}`}>
                  {vendor.type}
                </span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2"><span className="text-slate-400">👤</span><span>{vendor.contactPerson}</span></div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" /><span>{vendor.phone}</span></div>
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" /><span className="truncate">{vendor.email}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{vendor.location}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < vendor.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-[#012871]"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          );
          })}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="bg-white rounded-3xl border-2 border-dashed border-[#012871]/30 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#012871]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#012871]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No vendors found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('all'); }}
              className="px-4 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-[#012871]/10 text-[#012871] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#012871] to-[#f35500] bg-clip-text text-transparent">Add New Vendor</h1>
          <p className="text-slate-600 mt-1">Register a new supplier or vendor</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border-2 border-[#f35500]/20 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#012871] mb-1">Company Name</label>
              <input type="text" className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all" placeholder="Enter company name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#012871] mb-1">Vendor Type</label>
              <select className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all">
                <option>Vehicle</option>
                <option>Guide</option>
                <option>Hotel</option>
                <option>Restaurant</option>
                <option>Activity</option>
                <option>Permit</option>
                <option>Others</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#012871] mb-1">Contact Person</label>
              <input type="text" className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all" placeholder="Contact name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#012871] mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#012871] mb-1">Phone</label>
              <input type="tel" className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all" placeholder="+1 234 567 890" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#012871] mb-1">Location</label>
              <input type="text" className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none transition-all" placeholder="City, Country" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t-2 border-slate-200">
            <button type="button" onClick={() => setView('menu')} className="px-6 py-2.5 text-[#012871] bg-white border-2 border-[#012871] rounded-lg font-medium hover:bg-[#012871]/5 transition-colors">Cancel</button>
            <button type="button" onClick={() => setView('directory')} className="px-6 py-2.5 text-white bg-gradient-to-r from-[#f35500] to-[#c54300] rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all">Save Vendor</button>
          </div>
        </form>
      </div>
    </div>
  );
}
