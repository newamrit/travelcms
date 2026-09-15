import React, { useState } from 'react';
import { ClipboardList, Plus, Eye, Printer, Hotel, Car, UserCheck, MapPin, Calendar } from 'lucide-react';
import { mockVouchers } from '../data/mockData';

const typeConfig: Record<string, { label: string; icon: any; color: string }> = {
  hotel_confirmation: { label: 'Hotel Confirmation', icon: Hotel, color: 'bg-blue-100 text-blue-700' },
  vehicle_duty: { label: 'Vehicle Duty Slip', icon: Car, color: 'bg-green-100 text-green-700' },
  guide_assignment: { label: 'Guide Assignment', icon: UserCheck, color: 'bg-purple-100 text-purple-700' },
  activity_confirmation: { label: 'Activity Confirmation', icon: MapPin, color: 'bg-orange-100 text-orange-700' },
  general: { label: 'General', icon: ClipboardList, color: 'bg-slate-100 text-slate-700' },
};

const statusColors: Record<string, string> = {
  issued: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700', completed: 'bg-slate-100 text-slate-700',
};

export default function Operations() {
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
  const handlePrint = () => { window.print(); };

  if (selectedVoucher) {
    const config = typeConfig[selectedVoucher.voucherType];
    const Icon = config.icon;
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedVoucher(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">←</button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{config.label}</h1>
              <p className="text-sm text-slate-500">{selectedVoucher.voucherNumber}</p>
            </div>
          </div>
          <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><Printer className="w-4 h-4" /> Print</button>
        </div>
        <div className="bg-white rounded-xl border-2 border-slate-300 overflow-hidden print-container">
          <div className={`p-6 ${config.color} border-b-2`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Icon className="w-8 h-8" />
                <div>
                  <h2 className="text-xl font-bold">{config.label.toUpperCase()}</h2>
                  <p className="text-sm opacity-80">Voucher #{selectedVoucher.voucherNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">TravelOps Pro</p>
                <p className="text-xs opacity-80">Tour & Travel Management</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Guest Information</h3>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-800">{selectedVoucher.guestNames}</p>
                  <p className="text-sm text-slate-600">Party Size: {selectedVoucher.paxCount} pax</p>
                  <p className="text-sm text-slate-600">Booking Ref: {selectedVoucher.bookingNumber}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Service Provider</h3>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-800">{selectedVoucher.supplierName}</p>
                  <p className="text-sm text-slate-600">Supplier ID: {selectedVoucher.supplierId}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Service Dates</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-800">From: <strong>{selectedVoucher.serviceDateFrom}</strong></span></div>
                <span className="text-slate-400">→</span>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-800">To: <strong>{selectedVoucher.serviceDateTo}</strong></span></div>
              </div>
            </div>
            {Object.keys(selectedVoucher.details).length > 0 && (
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Service Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedVoucher.details).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-sm font-medium text-slate-800">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Issued Date: {selectedVoucher.issueDate}</p>
                <p className="text-xs text-slate-500">Status: <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedVoucher.status]}`}>{selectedVoucher.status}</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Authorized Signature</p>
                <div className="mt-4 border-t border-slate-300 w-48"></div>
                <p className="text-xs text-slate-400 mt-1">TravelOps Pro Operations</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-4 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">This voucher serves as confirmation of services. Please present upon arrival.</p>
            <p className="text-xs text-slate-400 mt-1">For inquiries: info@travelops.pro | +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operations</h1>
          <p className="text-slate-500 mt-1">Manage vouchers, service confirmations, and operational documents</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition shadow-sm"><Plus className="w-4 h-4" /> New Voucher</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(typeConfig).map(([key, config]) => {
          const count = mockVouchers.filter(v => v.voucherType === key).length;
          const Icon = config.icon;
          return (
            <div key={key} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <Icon className="w-6 h-6 mx-auto text-slate-400 mb-2" />
              <p className="text-lg font-bold text-slate-800">{count}</p>
              <p className="text-xs text-slate-500">{config.label}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {mockVouchers.map(voucher => {
          const config = typeConfig[voucher.voucherType];
          const Icon = config.icon;
          return (
            <div key={voucher.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedVoucher(voucher)}>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.color}`}><Icon className="w-6 h-6" /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-800">{config.label}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[voucher.status]}`}>{voucher.status}</span>
                      </div>
                      <p className="text-sm text-slate-500">{voucher.voucherNumber} • Booking: {voucher.bookingNumber}</p>
                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {voucher.serviceDateFrom} → {voucher.serviceDateTo}</span>
                        </div>
                        <p className="text-sm text-slate-600"><span className="font-medium">Supplier:</span> {voucher.supplierName}</p>
                        <p className="text-sm text-slate-600"><span className="font-medium">Guests:</span> {voucher.guestNames} ({voucher.paxCount} pax)</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Printer className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
