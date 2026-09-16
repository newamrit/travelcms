import React, { useState, useEffect } from 'react';
import { Users, Plus, Mail, Phone, MapPin, Calendar, ArrowLeft, UserPlus, UserCheck, Globe, GraduationCap, Building2, Home } from 'lucide-react';
import { formatNepaliCurrency } from '../utils/currency';
import { db, COLLECTIONS } from '../services/database';
import { useSound } from '../context/SoundContext';
import type { DBLead } from '../services/database';

type CustomerCategory = 'international' | 'school_college' | 'domestic' | 'corporate';

export default function Customers() {
  const { play } = useSound();
  const [view, setView] = useState<'menu' | 'category' | 'add' | 'edit'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<CustomerCategory | null>(null);
  const [customers, setCustomers] = useState<DBLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<DBLead | null>(null);

  useEffect(() => {
    const loadCustomers = () => {
      try {
        const leads = db.findAll<DBLead>(COLLECTIONS.LEADS);
        setCustomers(leads);
      } catch (error) {
        console.error('Failed to load customers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCountry: '',
    notes: ''
  });

  // Handlers
  const handleAddCustomer = () => {
    if (!formData.clientName || !formData.clientEmail) {
      alert('Please fill in all required fields');
      return;
    }

    const newCustomer: DBLead = {
      id: Date.now().toString(),
      leadNumber: `LD-${Date.now()}`,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      clientWhatsapp: formData.clientPhone,
      clientCountry: formData.clientCountry,
      paxAdults: 1,
      paxChildren: 0,
      travelDateFrom: '',
      travelDateTo: '',
      budgetMin: 0,
      budgetMax: 0,
      currency: 'NPR',
      leadSource: 'direct',
      status: 'new',
      assignedAgentId: '',
      assignedAgentName: '',
      priority: 'medium',
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      db.create(COLLECTIONS.LEADS, newCustomer);
      setCustomers([...customers, newCustomer]);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientCountry: '',
        notes: ''
      });
      setView('menu');
      alert('Customer added successfully!');
    } catch (error) {
      console.error('Failed to add customer:', error);
      alert('Failed to add customer');
    }
  };

  const handleEditCustomer = (customer: DBLead) => {
    setEditingCustomer(customer);
    setFormData({
      clientName: customer.clientName,
      clientEmail: customer.clientEmail,
      clientPhone: customer.clientPhone,
      clientCountry: customer.clientCountry,
      notes: customer.notes
    });
    setView('edit');
  };

  const handleSaveEdit = () => {
    if (!editingCustomer || !formData.clientName || !formData.clientEmail) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const updatedCustomer = { 
        ...editingCustomer, 
        ...formData,
        updatedAt: new Date().toISOString()
      };
      db.update(COLLECTIONS.LEADS, editingCustomer.id, updatedCustomer);
      setCustomers(customers.map(c => c.id === editingCustomer.id ? updatedCustomer : c));
      setEditingCustomer(null);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientCountry: '',
        notes: ''
      });
      setView('menu');
      alert('Customer updated successfully!');
    } catch (error) {
      console.error('Failed to update customer:', error);
      alert('Failed to update customer');
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        db.delete(COLLECTIONS.LEADS, customerId);
        setCustomers(customers.filter(c => c.id !== customerId));
        alert('Customer deleted successfully!');
      } catch (error) {
        console.error('Failed to delete customer:', error);
        alert('Failed to delete customer');
      }
    }
  };

  // Categorize customers
  const categorizeCustomers = (category: CustomerCategory): DBLead[] => {
    return customers.filter(customer => {
      const notes = customer.notes?.toLowerCase() || '';
      const country = customer.clientCountry?.toLowerCase() || '';
      
      switch (category) {
        case 'international':
          return country !== 'nepal' && country !== '';
        case 'domestic':
          return country === 'nepal';
        case 'school_college':
          return notes.includes('school') || notes.includes('college') || 
                 notes.includes('university') || notes.includes('education') ||
                 notes.includes('student') || notes.includes('educational');
        case 'corporate':
          return notes.includes('corporate') || notes.includes('company') || 
                 notes.includes('business') || notes.includes('corporate retreat') ||
                 notes.includes('team building') || notes.includes('office');
        default:
          return false;
      }
    });
  };

  const getCategoryCount = (category: CustomerCategory): number => {
    return categorizeCustomers(category).length;
  };

  const getCategoryInfo = (category: CustomerCategory) => {
    const info = {
      international: {
        title: 'International Travelers',
        description: 'Clients from outside Nepal',
        icon: Globe,
        color: 'from-blue-500 to-blue-700',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200'
      },
      domestic: {
        title: 'Domestic Travelers',
        description: 'Clients from within Nepal',
        icon: Home,
        color: 'from-green-500 to-green-700',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        borderColor: 'border-green-200'
      },
      school_college: {
        title: 'School/College',
        description: 'Educational institutions & students',
        icon: GraduationCap,
        color: 'from-purple-500 to-purple-700',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700',
        borderColor: 'border-purple-200'
      },
      corporate: {
        title: 'Corporate Group',
        description: 'Business & corporate clients',
        icon: Building2,
        color: 'from-orange-500 to-orange-700',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700',
        borderColor: 'border-orange-200'
      }
    };
    return info[category];
  };

  if (view === 'menu') {
    const categories: CustomerCategory[] = ['international', 'school_college', 'domestic', 'corporate'];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
            <p className="text-slate-500 mt-1">Manage your customer relationships by category</p>
          </div>
          <button 
            onClick={() => { play('click'); setView('add'); }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {categories.map((category) => {
            const info = getCategoryInfo(category);
            const Icon = info.icon;
            const count = getCategoryCount(category);
            
            return (
              <button
                key={category}
                onClick={() => { 
                  play('select');
                  setSelectedCategory(category);
                  setView('category');
                }}
                className="group bg-white rounded-3xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
                style={{ minHeight: '280px' }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-800 mb-1">{info.title}</h2>
                    <p className="text-slate-500 text-sm">{info.description}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 ${info.bgColor} rounded-full`}>
                    <span className={`text-2xl font-bold ${info.textColor}`}>{count}</span>
                    <span className={`text-sm ${info.textColor} opacity-70`}>customers</span>
                  </div>
                  <div className={`flex items-center gap-2 ${info.textColor} font-medium text-sm group-hover:gap-3 transition-all`}>
                    <span>View Customers</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'category' && selectedCategory) {
    const categoryCustomers = categorizeCustomers(selectedCategory);
    const categoryInfo = getCategoryInfo(selectedCategory);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { play('click'); setView('menu'); setSelectedCategory(null); }} 
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{categoryInfo.title}</h1>
              <p className="text-slate-500 mt-1">{categoryInfo.description}</p>
            </div>
          </div>
          <button 
            onClick={() => { play('click'); setView('add'); }} 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>

        {categoryCustomers.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-12 text-center">
            <div className={`w-20 h-20 rounded-full ${categoryInfo.bgColor} flex items-center justify-center mx-auto mb-4`}>
              <categoryInfo.icon className={`w-10 h-10 ${categoryInfo.textColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No customers found</h3>
            <p className="text-slate-500 mb-4">There are no customers in this category yet</p>
            <button 
              onClick={() => { play('click'); setView('add'); }}
              className="px-4 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Add First Customer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCustomers.map((customer: any) => (
              <div key={customer.id} className="bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center text-white font-bold`}>
                      {customer.clientName.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">{customer.clientName}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {customer.clientCountry}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" /><span className="truncate">{customer.clientEmail}</span></div>
                  <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" /><span>{customer.clientPhone}</span></div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-400">Status</p>
                    <p className="text-sm font-semibold text-[#012871]">{customer.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Budget</p>
                    <p className="text-sm font-semibold text-[#f35500]">{formatNepaliCurrency(customer.budgetMax || 0)}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                  <button 
                    onClick={() => handleEditCustomer(customer)}
                    className="flex-1 px-3 py-1.5 text-xs font-medium text-[#012871] bg-[#012871]/5 rounded-lg hover:bg-[#012871]/10 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="flex-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Edit Customer View
  if (view === 'edit' && editingCustomer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => { play('click'); setView('menu'); setEditingCustomer(null); }} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Edit Customer</h1>
            <p className="text-slate-500 mt-1">Update customer information</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                <input 
                  type="text" 
                  value={formData.clientCountry}
                  onChange={(e) => setFormData({...formData, clientCountry: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
              <textarea 
                rows={3} 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none resize-none" 
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => { play('click'); setView('menu'); setEditingCustomer(null); }} className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={handleSaveEdit} className="px-4 py-2 text-white bg-gradient-to-r from-[#f35500] to-[#c54300] rounded-lg hover:shadow-lg transition-all">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => { play('click'); setView('menu'); }} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Add Customer</h1>
          <p className="text-slate-500 mt-1">Register a new customer</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" 
                placeholder="John Smith" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={formData.clientEmail}
                onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" 
                placeholder="email@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input 
                type="tel" 
                value={formData.clientPhone}
                onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" 
                placeholder="+1 234 567 890" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
              <input 
                type="text" 
                value={formData.clientCountry}
                onChange={(e) => setFormData({...formData, clientCountry: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" 
                placeholder="United States" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea 
              rows={3} 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none resize-none" 
              placeholder="Customer preferences, special requirements..." 
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => { play('click'); setView('menu'); }} className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="button" onClick={handleAddCustomer} className="px-4 py-2 text-white bg-gradient-to-r from-[#f35500] to-[#c54300] rounded-lg hover:shadow-lg transition-all">Save Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
