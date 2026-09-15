import React, { useState } from 'react';
import { 
  FileText, CheckCircle, Plus, Eye, Printer, Hotel, Car, UserCheck, 
  MapPin, Calendar, ArrowLeft, ClipboardCheck, Stamp
} from 'lucide-react';

interface Voucher {
  id: string;
  voucherNumber: string;
  type: string;
  supplierName: string;
  clientName: string;
  serviceDate: string;
  status: 'issued' | 'confirmed' | 'completed' | 'cancelled';
}

const mockVouchers: Voucher[] = [
  { id: '1', voucherNumber: 'VH-2024-001', type: 'hotel', supplierName: 'Serengeti Lodge', clientName: 'John Smith', serviceDate: '2024-06-15', status: 'confirmed' },
  { id: '2', voucherNumber: 'VH-2024-002', type: 'vehicle', supplierName: 'Safari Wheels', clientName: 'Sarah Johnson', serviceDate: '2024-07-10', status: 'issued' },
  { id: '3', voucherNumber: 'VH-2024-003', type: 'guide', supplierName: 'Expert Guides Ltd', clientName: 'Michael Brown', serviceDate: '2024-05-20', status: 'completed' },
  { id: '4', voucherNumber: 'VH-2024-004', type: 'activity', supplierName: 'Adventure Tours', clientName: 'Emily Davis', serviceDate: '2024-08-05', status: 'confirmed' },
];

const typeIcons: Record<string, any> = {
  hotel: Hotel,
  vehicle: Car,
  guide: UserCheck,
  activity: MapPin,
};

const typeColors: Record<string, string> = {
  hotel: 'bg-blue-100 text-blue-700',
  vehicle: 'bg-green-100 text-green-700',
  guide: 'bg-purple-100 text-purple-700',
  activity: 'bg-orange-100 text-orange-700',
};

const statusColors: Record<string, string> = {
  issued: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export default function Operations() {
  const [view, setView] = useState<'menu' | 'vouchers' | 'confirmations'>('menu');
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const activeVouchers = mockVouchers.filter(v => ['issued', 'confirmed'].includes(v.status));
  const completedVouchers = mockVouchers.filter(v => ['completed', 'cancelled'].includes(v.status));

  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operations</h1>
          <p className="text-slate-500 mt-1">Manage vouchers and service confirmations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => setView('vouchers')}
            className="group bg-white rounded-xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Service Vouchers</h2>
                <p className="text-slate-500 text-sm">Generate and manage supplier vouchers</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-2xl font-bold text-primary-600">{activeVouchers.length}</span>
                <span className="text-sm text-primary-500">active</span>
              </div>
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Manage Vouchers</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => setView('confirmations')}
            className="group bg-white rounded-xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-[#f35500] hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Stamp className="w-16 h-16 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Service Confirmations</h2>
                <p className="text-slate-500 text-sm">Track completed and cancelled services</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Completed services</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Cancelled vouchers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Service history</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Confirmations</span>
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

  if (view === 'vouchers') {
    if (selectedVoucher) {
      const Icon = typeIcons[selectedVoucher.type] || FileText;
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSelectedVoucher(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{selectedVoucher.voucherNumber}</h1>
                <p className="text-slate-500 mt-1">{selectedVoucher.supplierName}</p>
              </div>
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]">
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-300 overflow-hidden">
            <div className={`p-6 ${typeColors[selectedVoucher.type]} border-b-2`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Icon className="w-8 h-8" />
                  <div>
                    <h2 className="text-xl font-bold">{selectedVoucher.type.toUpperCase()} VOUCHER</h2>
                    <p className="text-sm opacity-80">#{selectedVoucher.voucherNumber}</p>
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
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Client Information</h3>
                  <p className="text-sm font-medium text-slate-800">{selectedVoucher.clientName}</p>
                  <p className="text-sm text-slate-600">Service Date: {selectedVoucher.serviceDate}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Service Provider</h3>
                  <p className="text-sm font-medium text-slate-800">{selectedVoucher.supplierName}</p>
                  <p className="text-sm text-slate-600">Status: {selectedVoucher.status}</p>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4 text-right">
                <p className="text-xs text-slate-500">Authorized Signature</p>
                <div className="mt-4 border-t border-slate-300 w-48 inline-block"></div>
                <p className="text-xs text-slate-400 mt-1">TravelOps Pro Operations</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('menu')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Service Vouchers</h1>
              <p className="text-slate-500 mt-1">Active and confirmed vouchers</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b]">
            <Plus className="w-4 h-4" /> Generate Voucher
          </button>
        </div>

        <div className="space-y-4">
          {activeVouchers.map(voucher => {
            const Icon = typeIcons[voucher.type] || FileText;
            return (
              <div key={voucher.id} onClick={() => setSelectedVoucher(voucher)} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeColors[voucher.type]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-slate-800">{voucher.voucherNumber}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[voucher.status]}`}>
                          {voucher.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{voucher.supplierName} • {voucher.clientName}</p>
                      <p className="text-xs text-slate-400 mt-1">Service Date: {voucher.serviceDate}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
          <h1 className="text-2xl font-bold text-slate-800">Service Confirmations</h1>
          <p className="text-slate-500 mt-1">Completed and cancelled services</p>
        </div>
      </div>

      <div className="space-y-4">
        {completedVouchers.map(voucher => {
          const Icon = typeIcons[voucher.type] || FileText;
          return (
            <div key={voucher.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeColors[voucher.type]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-slate-800">{voucher.voucherNumber}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[voucher.status]}`}>
                        {voucher.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{voucher.supplierName} • {voucher.clientName}</p>
                    <p className="text-xs text-slate-400 mt-1">Service Date: {voucher.serviceDate}</p>
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
