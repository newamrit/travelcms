import React, { useState } from 'react';
import { 
  Building2, DollarSign, Shield, Database, ArrowLeft, Save,
  Palette, Globe, Users, HardDrive, Image, FileText
} from 'lucide-react';
import { useSound } from '../context/SoundContext';

type SettingsCategory = 'branding' | 'currency' | 'roles' | 'backup';

interface CategoryConfig {
  id: SettingsCategory;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  textColor: string;
}

const categoryConfig: CategoryConfig[] = [
  {
    id: 'branding',
    title: 'Agency Identity & Branding',
    description: 'Logo, colors, and brand identity',
    icon: Palette,
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  },
  {
    id: 'currency',
    title: 'Currency & Fiscal Settings',
    description: 'Currency, tax, and financial settings',
    icon: DollarSign,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700'
  },
  {
    id: 'roles',
    title: 'Staff Roles & Access Control',
    description: 'User roles and permissions',
    icon: Shield,
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  {
    id: 'backup',
    title: 'Data Backup',
    description: 'Backup and restore data',
    icon: Database,
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700'
  }
];

export default function Settings() {
  const { play } = useSound();
  const [view, setView] = useState<'menu' | 'category'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<SettingsCategory | null>(null);

  if (view === 'menu') {
    return (
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
                  <div className={`flex items-center gap-2 ${category.textColor} font-medium text-sm group-hover:gap-3 transition-all`}>
                    <span>Configure</span>
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
    const category = categoryConfig.find(c => c.id === selectedCategory)!;
    const Icon = category.icon;

    const renderCategoryContent = () => {
      switch (selectedCategory) {
        case 'branding':
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Logo & Brand Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Logo</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <Image className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Click to upload logo</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Favicon</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <FileText className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Click to upload favicon</p>
                      <p className="text-xs text-slate-400 mt-1">ICO, PNG 32x32px</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Letterhead for PDF Documents</h3>
                <p className="text-sm text-slate-600 mb-4">Upload your company letterhead to be used as the header for all PDF documents (itineraries, quotations, etc.)</p>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
                  <Image className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                  <p className="text-base text-slate-700 font-medium mb-2">Click to upload letterhead</p>
                  <p className="text-sm text-slate-500 mb-4">PNG, JPG up to 10MB • Recommended: 2480x3508px (A4 at 300dpi)</p>
                  <input 
                    type="file" 
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    id="letterhead-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const result = e.target?.result as string;
                          localStorage.setItem('company_letterhead', result);
                          alert('Letterhead uploaded successfully! It will be used in all PDF documents.');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label 
                    htmlFor="letterhead-upload"
                    className="inline-block px-6 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011950] cursor-pointer transition-colors"
                  >
                    Choose Letterhead
                  </label>
                </div>
                {localStorage.getItem('company_letterhead') && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-green-800">✓ Letterhead uploaded</p>
                      <button
                        onClick={() => {
                          localStorage.removeItem('company_letterhead');
                          alert('Letterhead removed');
                          window.location.reload();
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <img 
                      src={localStorage.getItem('company_letterhead')!} 
                      alt="Letterhead Preview"
                      className="w-full max-h-64 object-contain border border-green-200 rounded"
                    />
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Brand Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
                    <input type="color" defaultValue="#012871" className="w-full h-12 border border-slate-200 rounded-lg cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Secondary Color</label>
                    <input type="color" defaultValue="#f35500" className="w-full h-12 border border-slate-200 rounded-lg cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Accent Color</label>
                    <input type="color" defaultValue="#10b981" className="w-full h-12 border border-slate-200 rounded-lg cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                    <input type="text" defaultValue="TravelOps Pro" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                    <input type="text" defaultValue="Tour & Travel Management" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" defaultValue="info@travelops.pro" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input type="tel" defaultValue="+977-1-4567890" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
                  </div>
                </div>
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
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                      <option>NPR - Nepalese Rupee</option>
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>INR - Indian Rupee</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Currency Symbol Position</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                      <option>Before amount (रु100)</option>
                      <option>After amount (100 रु)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Decimal Places</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                      <option>2</option>
                      <option>0</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Thousands Separator</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
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
                    <input type="number" defaultValue="13" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tax ID / PAN Number</label>
                    <input type="text" defaultValue="601234567" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#012871] rounded" />
                      <span className="text-sm text-slate-700">Include tax in all prices by default</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Fiscal Year</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fiscal Year Start</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                      <option>Shrawan (Mid July)</option>
                      <option>January</option>
                      <option>April</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Fiscal Year</label>
                    <input type="text" defaultValue="2082/083" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
                  </div>
                </div>
              </div>
            </div>
          );

        case 'roles':
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Staff Users</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  <Users className="w-4 h-4" /> Add User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">User</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Email</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Role</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">SA</div>
                          <span className="text-sm font-medium text-slate-800">System Admin</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">admin@travelops.pro</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Admin</span></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-sm text-[#012871] hover:underline">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">SJ</div>
                          <span className="text-sm font-medium text-slate-800">Sarah Johnson</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">sarah@travelops.pro</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Sales Agent</span></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-sm text-[#012871] hover:underline">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold text-white">MC</div>
                          <span className="text-sm font-medium text-slate-800">Michael Chen</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">michael@travelops.pro</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Operations</span></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-sm text-[#012871] hover:underline">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-xs font-bold text-white">ED</div>
                          <span className="text-sm font-medium text-slate-800">Emily Davis</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">emily@travelops.pro</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Accountant</span></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-sm text-[#012871] hover:underline">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Role Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Admin</h4>
                    <p className="text-sm text-purple-700">Full access to all features and settings</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Sales Agent</h4>
                    <p className="text-sm text-blue-700">Access to leads, customers, and quotations</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Operations</h4>
                    <p className="text-sm text-green-700">Access to bookings, operations, and vendors</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Accountant</h4>
                    <p className="text-sm text-orange-700">Access to invoices, reports, and financial data</p>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'backup':
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Backup Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <p className="text-sm font-medium text-green-900">Last Backup</p>
                    </div>
                    <p className="text-lg font-bold text-green-700">March 15, 2026</p>
                    <p className="text-xs text-green-600">2:30 AM</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-900">Backup Size</p>
                    </div>
                    <p className="text-lg font-bold text-blue-700">245 MB</p>
                    <p className="text-xs text-blue-600">Compressed</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-purple-600" />
                      <p className="text-sm font-medium text-purple-900">Total Backups</p>
                    </div>
                    <p className="text-lg font-bold text-purple-700">28</p>
                    <p className="text-xs text-purple-600">Files stored</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Backup Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-gradient-to-r from-[#012871] to-[#011950] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5" />
                      <div className="text-left">
                        <p className="font-semibold">Create Backup Now</p>
                        <p className="text-sm opacity-90">Backup all data to secure storage</p>
                      </div>
                    </div>
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>

                  <button className="w-full p-4 bg-white border-2 border-slate-200 rounded-lg font-medium hover:border-[#012871] transition-all flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HardDrive className="w-5 h-5 text-slate-600" />
                      <div className="text-left">
                        <p className="font-semibold text-slate-800">Download Latest Backup</p>
                        <p className="text-sm text-slate-500">Download backup file to your computer</p>
                      </div>
                    </div>
                    <ArrowLeft className="w-5 h-5 rotate-180 text-slate-400" />
                  </button>

                  <button className="w-full p-4 bg-white border-2 border-slate-200 rounded-lg font-medium hover:border-[#f35500] transition-all flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-slate-600" />
                      <div className="text-left">
                        <p className="font-semibold text-slate-800">Restore from Backup</p>
                        <p className="text-sm text-slate-500">Restore data from a previous backup</p>
                      </div>
                    </div>
                    <ArrowLeft className="w-5 h-5 rotate-180 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Automatic Backup</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Enable Automatic Backup</p>
                      <p className="text-xs text-slate-500">Automatically backup data on schedule</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#012871]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#012871]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Backup Frequency</label>
                      <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Backup Time</label>
                      <input type="time" defaultValue="02:00" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#012871] outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h3>
                <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-800">Delete All Data</p>
                      <p className="text-xs text-red-600 mt-1">Permanently delete all data. This action cannot be undone.</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                      Delete All
                    </button>
                  </div>
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
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { play('click'); setView('menu'); setSelectedCategory(null); }} 
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{category.title}</h1>
              <p className="text-slate-500 mt-0.5">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6">
          {renderCategoryContent()}

          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-200">
            <button 
              onClick={() => { play('click'); setView('menu'); setSelectedCategory(null); }}
              className="px-4 py-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => play('save')}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-[#012871] to-[#011950] rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
