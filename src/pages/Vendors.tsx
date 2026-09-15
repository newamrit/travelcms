import React, { useState } from 'react';
import { Building2, Plus, Phone, Mail, MapPin, Star, Edit2, Trash2, ArrowLeft, Users, Globe } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  rating: number;
}

const mockVendors: Vendor[] = [
  { id: '1', name: 'Serengeti Luxury Lodge', type: 'Hotel', contactPerson: 'John Mwangi', email: 'info@serengeti.com', phone: '+255 712 345678', location: 'Arusha, Tanzania', rating: 5 },
  { id: '2', name: 'Safari Wheels Ltd', type: 'Transport', contactPerson: 'Peter Ochieng', email: 'book@safariwheels.com', phone: '+255 754 321987', location: 'Nairobi, Kenya', rating: 4 },
  { id: '3', name: 'Expert Guides Tanzania', type: 'Guide', contactPerson: 'Samuel Kimaro', email: 'sam@expertguides.com', phone: '+255 688 111222', location: 'Arusha, Tanzania', rating: 5 },
  { id: '4', name: 'Zanzibar Beach Resort', type: 'Hotel', contactPerson: 'Amina Hassan', email: 'info@zanzibarbeach.com', phone: '+255 777 654321', location: 'Zanzibar, Tanzania', rating: 4 },
  { id: '5', name: 'Adventure Tours Kenya', type: 'Activity', contactPerson: 'David Kamau', email: 'info@adventuretours.co.ke', phone: '+254 722 987654', location: 'Nairobi, Kenya', rating: 4 },
  { id: '6', name: 'Precision Air Services', type: 'Airline', contactPerson: 'Reservations', email: 'book@precisionair.com', phone: '+255 22 2152300', location: 'Dar es Salaam, Tanzania', rating: 3 },
];

const typeColors: Record<string, string> = {
  Hotel: 'bg-blue-100 text-blue-700',
  Transport: 'bg-green-100 text-green-700',
  Guide: 'bg-purple-100 text-purple-700',
  Activity: 'bg-orange-100 text-orange-700',
  Airline: 'bg-indigo-100 text-indigo-700',
};

const typeEmojis: Record<string, string> = {
  Hotel: '🏨',
  Transport: '🚗',
  Guide: '🧑‍🏫',
  Activity: '🎯',
  Airline: '✈️',
};

export default function Vendors() {
  const [view, setView] = useState<'menu' | 'directory' | 'add'>('menu');

  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Vendors</h1>
          <p className="text-slate-500 mt-1">Manage your supplier and vendor relationships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => setView('directory')}
            className="group bg-white rounded-xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Vendor Directory</h2>
                <p className="text-slate-500 text-sm">Browse and manage existing vendors</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-2xl font-bold text-primary-600">{mockVendors.length}</span>
                <span className="text-sm text-primary-500">vendors</span>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Directory</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => setView('add')}
            className="group bg-white rounded-xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Add New Vendor</h2>
                <p className="text-slate-500 text-sm">Register a new supplier or vendor</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Hotels & lodges</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Transport companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Guides & activities</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Add Vendor</span>
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

  if (view === 'directory') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Vendor Directory</h1>
              <p className="text-slate-500 mt-1">All registered vendors and suppliers</p>
            </div>
          </div>
          <button onClick={() => setView('add')} className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]">
            <Plus className="w-4 h-4" /> Add Vendor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">
                    {typeEmojis[vendor.type]}
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
          ))}
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
          <h1 className="text-2xl font-bold text-slate-800">Add New Vendor</h1>
          <p className="text-slate-500 mt-1">Register a new supplier or vendor</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="Enter company name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vendor Type</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                <option>Hotel</option>
                <option>Transport</option>
                <option>Guide</option>
                <option>Activity</option>
                <option>Airline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="Contact name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input type="tel" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="+1 234 567 890" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" placeholder="City, Country" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setView('menu')} className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="button" onClick={() => setView('directory')} className="px-4 py-2 text-white bg-[#f35500] rounded-lg hover:bg-[#c54300]">Save Vendor</button>
          </div>
        </form>
      </div>
    </div>
  );
}
