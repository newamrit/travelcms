import React, { useState } from 'react';
import { Building2, Globe, Mail, Phone, MapPin, DollarSign, Clock, Save, Shield, Bell, Palette, Database } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: Building2 },
    { id: 'finance', name: 'Finance', icon: DollarSign },
    { id: 'users', name: 'Users & Roles', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'backup', name: 'Backup', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your application preferences and configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl border border-slate-200 p-2 space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                    <input type="text" defaultValue="TravelOps Pro" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" defaultValue="info@travelops.pro" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                    <input type="url" defaultValue="https://travelops.pro" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <textarea rows={2} defaultValue="123 Travel Lane, Suite 100, New York, NY 10001" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none" />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Localization</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Default Currency</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC+0">UTC</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date Format</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Financial Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default Tax Rate (%)</label>
                  <input type="number" defaultValue="0" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default Contingency (%)</label>
                  <input type="number" defaultValue="5" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default Profit Margin (%)</label>
                  <input type="number" defaultValue="15" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quotation Validity (days)</label>
                  <input type="number" defaultValue="30" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Payment Terms (days)</label>
                  <input type="number" defaultValue="30" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Advance Payment Required (%)</label>
                  <input type="number" defaultValue="50" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Users & Roles</h3>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">Add User</button>
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
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">SA</div>
                          <span className="text-sm font-medium text-slate-800">System Admin</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">admin@travelops.pro</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Admin</span></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right"><button className="text-sm text-primary-600 hover:underline">Edit</button></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">SJ</div>
                          <span className="text-sm font-medium text-slate-800">Sarah Johnson</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">sarah@travelops.pro</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Sales Agent</span></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right"><button className="text-sm text-primary-600 hover:underline">Edit</button></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">MC</div>
                          <span className="text-sm font-medium text-slate-800">Michael Chen</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">michael@travelops.pro</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Operations</span></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right"><button className="text-sm text-primary-600 hover:underline">Edit</button></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">ED</div>
                          <span className="text-sm font-medium text-slate-800">Emily Davis</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">emily@travelops.pro</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Accountant</span></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right"><button className="text-sm text-primary-600 hover:underline">Edit</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                {[
                  { label: 'New lead notifications', desc: 'Get notified when a new lead is created' },
                  { label: 'Booking confirmations', desc: 'Receive alerts for new bookings' },
                  { label: 'Payment reminders', desc: 'Get reminded about pending payments' },
                  { label: 'Invoice due dates', desc: 'Alerts for upcoming invoice due dates' },
                  { label: 'Voucher status updates', desc: 'Notifications for voucher confirmations' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Appearance Settings</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-4 border-2 border-primary-500 rounded-lg bg-white text-center">
                    <div className="w-full h-12 bg-white border border-slate-200 rounded mb-2"></div>
                    <span className="text-sm font-medium text-slate-800">Light</span>
                  </button>
                  <button className="p-4 border-2 border-slate-200 rounded-lg bg-slate-800 text-center">
                    <div className="w-full h-12 bg-slate-900 border border-slate-700 rounded mb-2"></div>
                    <span className="text-sm font-medium text-white">Dark</span>
                  </button>
                  <button className="p-4 border-2 border-slate-200 rounded-lg text-center">
                    <div className="w-full h-12 bg-gradient-to-r from-white to-slate-800 border border-slate-200 rounded mb-2"></div>
                    <span className="text-sm font-medium text-slate-800">System</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Accent Color</label>
                <div className="flex gap-2">
                  {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'].map((color, idx) => (
                    <button key={idx} className={`w-10 h-10 rounded-full ${color} ${idx === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Backup & Data Management</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Last Backup</p>
                      <p className="text-xs text-slate-500">March 15, 2026 at 2:30 AM</p>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">Backup Now</button>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Export Data</p>
                      <p className="text-xs text-slate-500">Download all your data as CSV or JSON</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-700">Export</button>
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-800">Danger Zone</p>
                      <p className="text-xs text-red-600">Permanently delete all data</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Delete All Data</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
