import React, { useState } from 'react';
import { 
  Building2, DollarSign, Shield, Database, ArrowLeft, Save,
  Palette, Users, HardDrive, Image, FileText, 
  Trash2, Download, Upload
} from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { Modal, ConfirmDialog, Toast } from '../components/common/Modal';

type SettingsCategory = 'branding' | 'currency' | 'roles' | 'backup';

interface CategoryConfig {
  id: SettingsCategory;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const categoryConfig: CategoryConfig[] = [
  {
    id: 'branding',
    title: 'Agency Identity & Branding',
    description: 'Logo, colors, and brand identity',
    icon: Palette,
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 'currency',
    title: 'Currency & Fiscal Settings',
    description: 'Currency, tax, and financial settings',
    icon: DollarSign,
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'roles',
    title: 'Staff Roles & Access Control',
    description: 'User roles and permissions',
    icon: Shield,
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'backup',
    title: 'Data Backup',
    description: 'Backup and restore data',
    icon: Database,
    color: 'from-orange-500 to-orange-700',
  }
];

const defaultUsers: UserData[] = [
  { id: '1', name: 'System Admin', email: 'admin@travelops.pro', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@travelops.pro', role: 'Sales Agent', status: 'Active' },
  { id: '3', name: 'Michael Chen', email: 'michael@travelops.pro', role: 'Operations', status: 'Active' },
  { id: '4', name: 'Emily Davis', email: 'emily@travelops.pro', role: 'Accountant', status: 'Active' },
];

export default function Settings() {
  const { play } = useSound();
  const [view, setView] = useState<'menu' | 'category'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<SettingsCategory | null>(null);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  
  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'danger' | 'warning' | 'info';
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {}
  });

  // Branding settings
  const [branding, setBranding] = useState(() => {
    const saved = localStorage.getItem('branding_settings');
    return saved ? JSON.parse(saved) : {
      primaryColor: '#012871',
      secondaryColor: '#f35500',
      accentColor: '#10b981',
      companyName: 'TravelOps Pro',
      tagline: 'Tour & Travel Management',
      email: 'info@travelops.pro',
      phone: '+977-1-4567890',
      logo: null,
      favicon: null,
    };
  });

  // Currency settings
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('currency_settings');
    return saved ? JSON.parse(saved) : {
      currency: 'NPR - Nepalese Rupee',
      symbolPosition: 'Before amount (रु100)',
      decimalPlaces: '2',
      thousandsSeparator: 'Comma (1,00,000)',
      taxRate: '13',
      taxId: '601234567',
      includeTax: true,
      fiscalYearStart: 'Shrawan (Mid July)',
      currentFiscalYear: '2082/083',
    };
  });

  // Users state
  const [users, setUsers] = useState<UserData[]>(() => {
    const saved = localStorage.getItem('users_data');
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<Partial<UserData>>({
    name: '',
    email: '',
    role: 'Sales Agent',
    status: 'Active'
  });

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Save branding settings
  const saveBranding = () => {
    localStorage.setItem('branding_settings', JSON.stringify(branding));
    showToast('Branding settings saved successfully!');
    play('success');
  };

  // Save currency settings
  const saveCurrency = () => {
    localStorage.setItem('currency_settings', JSON.stringify(currency));
    showToast('Currency settings saved successfully!');
    play('success');
  };

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBranding({ ...branding, logo: e.target?.result as string });
        showToast('Logo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle favicon upload
  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBranding({ ...branding, favicon: e.target?.result as string });
        showToast('Favicon uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const user: UserData = {
      id: Date.now().toString(),
      name: newUser.name!,
      email: newUser.email!,
      role: newUser.role!,
      status: newUser.status!,
    };
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('users_data', JSON.stringify(updatedUsers));
    setNewUser({ name: '', email: '', role: 'Sales Agent', status: 'Active' });
    setShowAddUser(false);
    showToast('User added successfully!');
    play('success');
  };

  // Edit user
  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setNewUser(user);
      setEditingUser(userId);
      setShowAddUser(true);
    }
  };

  // Save edited user
  const handleSaveEditUser = () => {
    if (!newUser.name || !newUser.email) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const updatedUsers = users.map(u => 
      u.id === editingUser ? { ...u, ...newUser } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users_data', JSON.stringify(updatedUsers));
    setEditingUser(null);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'Sales Agent', status: 'Active' });
    showToast('User updated successfully!');
    play('success');
  };

  // Delete user
  const handleDeleteUser = (userId: string) => {
    if (userId === '1') {
      showToast('Cannot delete system admin', 'error');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Delete User',
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        const updatedUsers = users.filter(u => u.id !== userId);
        setUsers(updatedUsers);
        localStorage.setItem('users_data', JSON.stringify(updatedUsers));
        showToast('User deleted successfully!');
        play('success');
      }
    });
  };

  // Backup data
  const handleBackup = () => {
    const backupData = {
      branding: localStorage.getItem('branding_settings'),
      currency: localStorage.getItem('currency_settings'),
      users: localStorage.getItem('users_data'),
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travelops-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Backup downloaded successfully!');
    play('success');
  };

  // Restore data
  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const backupData = JSON.parse(e.target?.result as string);
          if (backupData.branding) localStorage.setItem('branding_settings', backupData.branding);
          if (backupData.currency) localStorage.setItem('currency_settings', backupData.currency);
          if (backupData.users) localStorage.setItem('users_data', backupData.users);
          showToast('Data restored successfully! Reloading...');
          play('success');
          setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
          showToast('Invalid backup file', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  // Clear all data
  const handleClearData = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Clear All Data',
      message: 'Are you sure you want to clear all data? This action cannot be undone and will remove all your settings.',
      type: 'danger',
      confirmText: 'Clear All',
      cancelText: 'Cancel',
      onConfirm: () => {
        localStorage.removeItem('branding_settings');
        localStorage.removeItem('currency_settings');
        localStorage.removeItem('users_data');
        showToast('All data cleared! Reloading...');
        play('success');
        setTimeout(() => window.location.reload(), 1500);
      }
    });
  };

  // Render menu view
  const renderMenuView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your application preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {categoryConfig.map((category) => {
          const Icon = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => { 
                play('select');
                setSelectedCategory(category.id);
                setView('category');
              }}
              className="group bg-white rounded-3xl border-2 border-slate-200 p-8 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
              style={{ minHeight: '280px' }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-slate-800 mb-1">{category.title}</h2>
                  <p className="text-slate-500 text-sm">{category.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Render category content
  const renderCategoryContent = () => {
    if (!selectedCategory) return null;

    switch (selectedCategory) {
      case 'branding':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Logo & Brand Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Logo</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center relative overflow-hidden">
                    {branding.logo ? (
                      <img src={branding.logo} alt="Logo" className="w-full h-32 object-contain" />
                    ) : (
                      <>
                        <Image className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Click to upload logo</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/png,image/jpeg"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Favicon</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center relative overflow-hidden">
                    {branding.favicon ? (
                      <img src={branding.favicon} alt="Favicon" className="w-16 h-16 object-contain mx-auto" />
                    ) : (
                      <>
                        <FileText className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Click to upload favicon</p>
                        <p className="text-xs text-slate-400 mt-1">ICO, PNG 32x32px</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/png,image/jpeg,image/x-icon"
                      onChange={handleFaviconUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Brand Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
                  <input 
                    type="color" 
                    value={branding.primaryColor}
                    onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                    className="w-full h-12 border-2 border-slate-200 rounded-lg cursor-pointer" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Secondary Color</label>
                  <input 
                    type="color" 
                    value={branding.secondaryColor}
                    onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                    className="w-full h-12 border-2 border-slate-200 rounded-lg cursor-pointer" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Accent Color</label>
                  <input 
                    type="color" 
                    value={branding.accentColor}
                    onChange={(e) => setBranding({...branding, accentColor: e.target.value})}
                    className="w-full h-12 border-2 border-slate-200 rounded-lg cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    value={branding.companyName}
                    onChange={(e) => setBranding({...branding, companyName: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                  <input 
                    type="text" 
                    value={branding.tagline}
                    onChange={(e) => setBranding({...branding, tagline: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={branding.email}
                    onChange={(e) => setBranding({...branding, email: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={branding.phone}
                    onChange={(e) => setBranding({...branding, phone: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <button 
                onClick={saveBranding}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <Save className="w-4 h-4" /> Save Branding Settings
              </button>
            </div>
          </div>
        );

      case 'currency':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Currency Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default Currency</label>
                  <select 
                    value={currency.currency}
                    onChange={(e) => setCurrency({...currency, currency: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none"
                  >
                    <option>NPR - Nepalese Rupee</option>
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>INR - Indian Rupee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Currency Symbol Position</label>
                  <select 
                    value={currency.symbolPosition}
                    onChange={(e) => setCurrency({...currency, symbolPosition: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none"
                  >
                    <option>Before amount (रु100)</option>
                    <option>After amount (100 रु)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Decimal Places</label>
                  <select 
                    value={currency.decimalPlaces}
                    onChange={(e) => setCurrency({...currency, decimalPlaces: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none"
                  >
                    <option>2</option>
                    <option>0</option>
                    <option>3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Thousands Separator</label>
                  <select 
                    value={currency.thousandsSeparator}
                    onChange={(e) => setCurrency({...currency, thousandsSeparator: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none"
                  >
                    <option>Comma (1,00,000)</option>
                    <option>Space (1 00 000)</option>
                    <option>None (100000)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Tax Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default VAT/Tax Rate (%)</label>
                  <input 
                    type="number" 
                    value={currency.taxRate}
                    onChange={(e) => setCurrency({...currency, taxRate: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tax ID / PAN Number</label>
                  <input 
                    type="text" 
                    value={currency.taxId}
                    onChange={(e) => setCurrency({...currency, taxId: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <button 
                onClick={saveCurrency}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <Save className="w-4 h-4" /> Save Currency Settings
              </button>
            </div>
          </div>
        );

      case 'roles':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Staff Users</h3>
              <button 
                onClick={() => {
                  setShowAddUser(true);
                  setEditingUser(null);
                  setNewUser({ name: '', email: '', role: 'Sales Agent', status: 'Active' });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <Users className="w-4 h-4" /> Add User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((userData) => (
                    <tr key={userData.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center text-xs font-bold text-white">
                            {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-slate-800">{userData.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{userData.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userData.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                          userData.role === 'Sales Agent' ? 'bg-blue-100 text-blue-700' :
                          userData.role === 'Operations' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {userData.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userData.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {userData.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => handleEditUser(userData.id)}
                            className="text-sm text-[#012871] hover:underline font-medium"
                          >
                            Edit
                          </button>
                          {userData.id !== '1' && (
                            <button 
                              onClick={() => handleDeleteUser(userData.id)}
                              className="text-sm text-red-600 hover:underline font-medium"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Backup Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleBackup}
                  className="w-full p-4 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-semibold">Create Backup Now</p>
                      <p className="text-sm opacity-90">Download a backup of all your data</p>
                    </div>
                  </div>
                </button>

                <label className="w-full p-4 bg-white border-2 border-slate-200 rounded-lg font-medium hover:border-[#012871] transition-all flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-slate-600" />
                    <div className="text-left">
                      <p className="font-semibold text-slate-800">Restore from Backup</p>
                      <p className="text-sm text-slate-500">Restore data from a backup file</p>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    accept=".json"
                    onChange={handleRestore}
                    className="hidden"
                  />
                </label>

                <button 
                  onClick={handleClearData}
                  className="w-full p-4 bg-red-50 border-2 border-red-200 rounded-lg font-medium hover:bg-red-100 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <div className="text-left">
                      <p className="font-semibold text-red-900">Clear All Data</p>
                      <p className="text-sm text-red-700">Permanently delete all data</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {view === 'menu' && renderMenuView()}
      
      {view === 'category' && selectedCategory && (
        <>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { play('click'); setView('menu'); setSelectedCategory(null); }}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{categoryConfig.find(c => c.id === selectedCategory)?.title}</h1>
              <p className="text-slate-500 mt-1">{categoryConfig.find(c => c.id === selectedCategory)?.description}</p>
            </div>
          </div>
          {renderCategoryContent()}
        </>
      )}

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={showAddUser}
        onClose={() => {
          setShowAddUser(false);
          setEditingUser(null);
        }}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input 
              type="text" 
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none" 
              placeholder="Enter user name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none" 
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select 
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none"
            >
              <option>Admin</option>
              <option>Sales Agent</option>
              <option>Operations</option>
              <option>Accountant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select 
              value={newUser.status}
              onChange={(e) => setNewUser({...newUser, status: e.target.value})}
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] focus:border-[#012871] outline-none"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => {
              setShowAddUser(false);
              setEditingUser(null);
            }}
            className="flex-1 px-4 py-2.5 border-2 border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={editingUser ? handleSaveEditUser : handleAddUser}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            {editingUser ? 'Save Changes' : 'Add User'}
          </button>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
      />
    </div>
  );
}
