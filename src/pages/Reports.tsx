import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Calendar, Users, MapPin, Truck,
  ArrowLeft, FileBarChart, PieChart, BarChart3, Cloud, Ticket
} from 'lucide-react';
import { formatNepaliCurrency } from '../utils/currency';
import { useSound } from '../context/SoundContext';

type ReportCategory = 'financial' | 'seasonal' | 'supplier' | 'nationalities' | 'permits' | 'logistics';

interface CategoryConfig {
  id: ReportCategory;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  textColor: string;
}

const categoryConfig: CategoryConfig[] = [
  {
    id: 'financial',
    title: 'Financial Yields & NPR Turnover',
    description: 'Revenue, profit margins, and cash flow',
    icon: DollarSign,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700'
  },
  {
    id: 'seasonal',
    title: 'Seasonal Booking Trends',
    description: 'Monthly and seasonal booking patterns',
    icon: Calendar,
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  {
    id: 'supplier',
    title: 'Supplier Costs & Margins',
    description: 'Vendor expenses and profit analysis',
    icon: BarChart3,
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  },
  {
    id: 'nationalities',
    title: 'Traveler Source Nationalities',
    description: 'Customer demographics by country',
    icon: Users,
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700'
  },
  {
    id: 'permits',
    title: 'Permit & Park Royalties',
    description: 'Park fees and permit costs tracking',
    icon: Ticket,
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700'
  },
  {
    id: 'logistics',
    title: 'Logistics & Weather Reliability',
    description: 'Transport efficiency and weather impact',
    icon: Cloud,
    color: 'from-cyan-500 to-cyan-700',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700'
  }
];

export default function Reports() {
  const { play } = useSound();
  const [view, setView] = useState<'menu' | 'category'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | null>(null);

  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
          <p className="text-slate-500 mt-1">Comprehensive analytics and business insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
                className="group bg-white rounded-3xl border-2 border-slate-200 p-6 text-left transition-all duration-300 hover:border-[#012871] hover:shadow-2xl hover:-translate-y-1"
                style={{ minHeight: '240px' }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-lg font-bold text-slate-800 mb-1">{category.title}</h2>
                    <p className="text-slate-500 text-sm">{category.description}</p>
                  </div>
                  <div className={`flex items-center gap-2 ${category.textColor} font-medium text-sm group-hover:gap-3 transition-all`}>
                    <span>View Report</span>
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
        case 'financial':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border-2 border-green-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <span className="text-xs font-medium text-green-600">Total Revenue</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(7740000)}</p>
                  <p className="text-sm text-slate-500 mt-1">This fiscal year</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">Net Profit</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(3460000)}</p>
                  <p className="text-sm text-green-600 mt-1">↑ 23% from last year</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-purple-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600">Profit Margin</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">44.7%</p>
                  <p className="text-sm text-green-600 mt-1">↑ 5.2% improvement</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly NPR Turnover</h3>
                <div className="space-y-3">
                  {[
                    { month: 'Baisakh', amount: 580000, percent: 75 },
                    { month: 'Jestha', amount: 650000, percent: 84 },
                    { month: 'Asar', amount: 720000, percent: 93 },
                    { month: 'Shrawan', amount: 890000, percent: 100 },
                    { month: 'Bhadra', amount: 820000, percent: 94 },
                    { month: 'Ashwin', amount: 750000, percent: 86 },
                  ].map((data, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">{data.month}</span>
                        <span className="text-sm font-semibold text-slate-800">{formatNepaliCurrency(data.amount)}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: `${data.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'seasonal':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Peak Season</p>
                  <p className="text-xl font-bold text-blue-700">Sep - Nov</p>
                  <p className="text-xs text-slate-500 mt-1">45% of bookings</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-green-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">High Season</p>
                  <p className="text-xl font-bold text-green-700">Mar - May</p>
                  <p className="text-xs text-slate-500 mt-1">30% of bookings</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-orange-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Shoulder</p>
                  <p className="text-xl font-bold text-orange-700">Dec - Feb</p>
                  <p className="text-xs text-slate-500 mt-1">15% of bookings</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-slate-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Low Season</p>
                  <p className="text-xl font-bold text-slate-700">Jun - Aug</p>
                  <p className="text-xs text-slate-500 mt-1">10% of bookings</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Booking Trends</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { month: 'Jan', bookings: 12, trend: 'up' },
                    { month: 'Feb', bookings: 15, trend: 'up' },
                    { month: 'Mar', bookings: 28, trend: 'up' },
                    { month: 'Apr', bookings: 35, trend: 'up' },
                    { month: 'May', bookings: 32, trend: 'down' },
                    { month: 'Jun', bookings: 18, trend: 'down' },
                    { month: 'Jul', bookings: 15, trend: 'down' },
                    { month: 'Aug', bookings: 20, trend: 'up' },
                    { month: 'Sep', bookings: 42, trend: 'up' },
                    { month: 'Oct', bookings: 48, trend: 'up' },
                    { month: 'Nov', bookings: 45, trend: 'down' },
                    { month: 'Dec', bookings: 25, trend: 'down' },
                  ].map((data, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg text-center">
                      <p className="text-xs text-slate-500 mb-1">{data.month}</p>
                      <p className="text-xl font-bold text-slate-800">{data.bookings}</p>
                      <p className={`text-xs ${data.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {data.trend === 'up' ? '↑' : '↓'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'supplier':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border-2 border-purple-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Total Supplier Costs</p>
                  <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(4280000)}</p>
                  <p className="text-xs text-slate-500 mt-1">This fiscal year</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-green-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Avg. Supplier Margin</p>
                  <p className="text-2xl font-bold text-green-700">18.5%</p>
                  <p className="text-xs text-green-600 mt-1">↑ 2.3% improvement</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Active Suppliers</p>
                  <p className="text-2xl font-bold text-blue-700">47</p>
                  <p className="text-xs text-slate-500 mt-1">Across 8 categories</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Suppliers by Cost</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Hotel Yak & Yeti', category: 'Accommodation', cost: 850000, percent: 100 },
                    { name: 'Safari Wheels', category: 'Transport', cost: 620000, percent: 73 },
                    { name: 'Mountain Guides Nepal', category: 'Guides', cost: 480000, percent: 56 },
                    { name: 'Adventure Tours', category: 'Activities', cost: 380000, percent: 45 },
                    { name: 'Nepal Airlines', category: 'Flights', cost: 290000, percent: 34 },
                  ].map((supplier, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">{supplier.name}</p>
                        <p className="text-xs text-slate-500">{supplier.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-800">{formatNepaliCurrency(supplier.cost)}</p>
                        <div className="w-32 bg-slate-200 rounded-full h-1.5 mt-1">
                          <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${supplier.percent}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'nationalities':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border-2 border-orange-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Total Nationalities</p>
                  <p className="text-2xl font-bold text-orange-700">28</p>
                  <p className="text-xs text-slate-500 mt-1">Countries represented</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Top Source</p>
                  <p className="text-xl font-bold text-blue-700">India</p>
                  <p className="text-xs text-slate-500 mt-1">32% of travelers</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-green-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Avg. Group Size</p>
                  <p className="text-2xl font-bold text-green-700">4.2</p>
                  <p className="text-xs text-slate-500 mt-1">Persons per booking</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Travelers by Nationality</h3>
                <div className="space-y-3">
                  {[
                    { country: 'India', travelers: 145, percent: 32, flag: '🇮🇳' },
                    { country: 'USA', travelers: 89, percent: 20, flag: '🇺🇸' },
                    { country: 'UK', travelers: 67, percent: 15, flag: '🇬🇧' },
                    { country: 'Australia', travelers: 54, percent: 12, flag: '🇦🇺' },
                    { country: 'Germany', travelers: 42, percent: 9, flag: '🇩🇪' },
                    { country: 'Japan', travelers: 35, percent: 8, flag: '🇯🇵' },
                    { country: 'Others', travelers: 18, percent: 4, flag: '🌍' },
                  ].map((data, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="text-lg">{data.flag}</span>
                          {data.country}
                        </span>
                        <span className="text-sm font-semibold text-slate-800">{data.travelers} ({data.percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: `${data.percent * 3}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'permits':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border-2 border-red-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Total Permit Costs</p>
                  <p className="text-2xl font-bold text-slate-800">{formatNepaliCurrency(1250000)}</p>
                  <p className="text-xs text-slate-500 mt-1">This fiscal year</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-green-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Park Royalties</p>
                  <p className="text-2xl font-bold text-green-700">{formatNepaliCurrency(890000)}</p>
                  <p className="text-xs text-slate-500 mt-1">National parks</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Permits Issued</p>
                  <p className="text-2xl font-bold text-blue-700">156</p>
                  <p className="text-xs text-slate-500 mt-1">This year</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Permit Costs by Park</h3>
                <div className="space-y-3">
                  {[
                    { park: 'Sagarmatha (Everest)', cost: 350000, percent: 100, permits: 45 },
                    { park: 'Annapurna Conservation', cost: 280000, percent: 80, permits: 38 },
                    { park: 'Chitwan National Park', cost: 220000, percent: 63, permits: 32 },
                    { park: 'Langtang National Park', cost: 180000, percent: 51, permits: 24 },
                    { park: 'Others', cost: 220000, percent: 63, permits: 17 },
                  ].map((data, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{data.park}</p>
                          <p className="text-xs text-slate-500">{data.permits} permits issued</p>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{formatNepaliCurrency(data.cost)}</p>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${data.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'logistics':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border-2 border-cyan-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">On-Time Delivery</p>
                  <p className="text-2xl font-bold text-cyan-700">94.5%</p>
                  <p className="text-xs text-green-600 mt-1">↑ 2.1% improvement</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-green-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Weather Delays</p>
                  <p className="text-2xl font-bold text-green-700">5.5%</p>
                  <p className="text-xs text-slate-500 mt-1">This season</p>
                </div>
                <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
                  <p className="text-sm text-slate-500 mb-1">Active Vehicles</p>
                  <p className="text-2xl font-bold text-blue-700">23</p>
                  <p className="text-xs text-slate-500 mt-1">Across fleet</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Transport Reliability by Route</h3>
                <div className="space-y-3">
                  {[
                    { route: 'Kathmandu - Pokhara', reliability: 98, status: 'Excellent' },
                    { route: 'Pokhara - Jomsom', reliability: 87, status: 'Good' },
                    { route: 'Kathmandu - Lukla', reliability: 82, status: 'Good' },
                    { route: 'Pokhara - Mustang', reliability: 76, status: 'Fair' },
                    { route: 'Kathmandu - Chitwan', reliability: 95, status: 'Excellent' },
                  ].map((data, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">{data.route}</p>
                        <p className={`text-xs ${data.reliability >= 90 ? 'text-green-600' : data.reliability >= 80 ? 'text-blue-600' : 'text-orange-600'}`}>
                          {data.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-800">{data.reliability}%</p>
                        <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1">
                          <div className={`h-1.5 rounded-full ${data.reliability >= 90 ? 'bg-green-600' : data.reliability >= 80 ? 'bg-blue-600' : 'bg-orange-600'}`} style={{ width: `${data.reliability}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Weather Impact Analysis</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { season: 'Spring', delays: 8, status: 'Low' },
                    { season: 'Summer', delays: 23, status: 'High' },
                    { season: 'Autumn', delays: 5, status: 'Low' },
                    { season: 'Winter', delays: 15, status: 'Medium' },
                  ].map((data, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg text-center">
                      <p className="text-xs text-slate-500 mb-1">{data.season}</p>
                      <p className="text-xl font-bold text-slate-800">{data.delays}</p>
                      <p className={`text-xs ${data.status === 'Low' ? 'text-green-600' : data.status === 'Medium' ? 'text-orange-600' : 'text-red-600'}`}>
                        {data.status} Impact
                      </p>
                    </div>
                  ))}
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
        </div>
      </div>
    );
  }

  return null;
}
