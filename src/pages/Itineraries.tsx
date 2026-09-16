import React, { useState } from 'react';
import { 
  Map, Plus, Calendar, MapPin, Users, Clock, Edit2, Trash2, Copy, 
  Eye, Save, ChevronDown, ChevronUp, ArrowLeft, FolderOpen, PenTool
} from 'lucide-react';

interface SavedItinerary {
  id: string;
  title: string;
  destination: string;
  duration: string;
  days: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'confirmed' | 'completed';
  paxCount: number;
  createdAt: string;
}

interface Day {
  id: string;
  dayNumber: number;
  dayTitle: string;
  activityDescription: string;
  overnightLocation: string;
  mealsBreakfast: boolean;
  mealsLunch: boolean;
  mealsDinner: boolean;
  transportMode: string;
}

const mockSavedItineraries: SavedItinerary[] = [
  // School/College Itineraries (3)
  {
    id: '1',
    title: '5-Day Educational Tour: Kathmandu Valley Heritage',
    destination: 'Kathmandu, Bhaktapur, Patan',
    duration: '5 Days / 4 Nights',
    days: 5,
    startDate: '2026-04-10',
    endDate: '2026-04-14',
    status: 'confirmed',
    paxCount: 35,
    createdAt: '2026-02-15'
  },
  {
    id: '2',
    title: '4-Day Chitwan Wildlife & Conservation Study',
    destination: 'Chitwan National Park',
    duration: '4 Days / 3 Nights',
    days: 4,
    startDate: '2026-05-20',
    endDate: '2026-05-23',
    status: 'confirmed',
    paxCount: 40,
    createdAt: '2026-03-01'
  },
  {
    id: '3',
    title: '6-Day Annapurna Base Camp Trek - Student Adventure',
    destination: 'Pokhara, Annapurna Region',
    duration: '6 Days / 5 Nights',
    days: 6,
    startDate: '2026-07-15',
    endDate: '2026-07-20',
    status: 'draft',
    paxCount: 25,
    createdAt: '2026-03-10'
  },

  // Corporate Retreat Itineraries (3)
  {
    id: '4',
    title: '3-Day Corporate Retreat: Pokhara Lakeside',
    destination: 'Pokhara',
    duration: '3 Days / 2 Nights',
    days: 3,
    startDate: '2026-06-05',
    endDate: '2026-06-07',
    status: 'confirmed',
    paxCount: 20,
    createdAt: '2026-03-05'
  },
  {
    id: '5',
    title: '4-Day Team Building: Nagarkot & Dhulikhel',
    destination: 'Nagarkot, Dhulikhel',
    duration: '4 Days / 3 Nights',
    days: 4,
    startDate: '2026-08-12',
    endDate: '2026-08-15',
    status: 'confirmed',
    paxCount: 30,
    createdAt: '2026-03-08'
  },
  {
    id: '6',
    title: '2-Day Executive Retreat: Kurintar & Mugling',
    destination: 'Kurintar, Mugling',
    duration: '2 Days / 1 Night',
    days: 2,
    startDate: '2026-09-20',
    endDate: '2026-09-21',
    status: 'draft',
    paxCount: 15,
    createdAt: '2026-03-12'
  },

  // Family & Holidays Itineraries (3)
  {
    id: '7',
    title: '7-Day Family Tour: Kathmandu-Pokhara-Chitwan',
    destination: 'Kathmandu, Pokhara, Chitwan',
    duration: '7 Days / 6 Nights',
    days: 7,
    startDate: '2026-10-01',
    endDate: '2026-10-07',
    status: 'confirmed',
    paxCount: 6,
    createdAt: '2026-03-15'
  },
  {
    id: '8',
    title: '5-Day Honeymoon: Pokhara & Sarangkot',
    destination: 'Pokhara, Sarangkot',
    duration: '5 Days / 4 Nights',
    days: 5,
    startDate: '2026-11-10',
    endDate: '2026-11-14',
    status: 'confirmed',
    paxCount: 2,
    createdAt: '2026-03-18'
  },
  {
    id: '9',
    title: '8-Day Family Holiday: Everest View & Cultural Tour',
    destination: 'Kathmandu, Lukla, Namche Bazaar',
    duration: '8 Days / 7 Nights',
    days: 8,
    startDate: '2026-12-20',
    endDate: '2026-12-27',
    status: 'draft',
    paxCount: 5,
    createdAt: '2026-03-20'
  }
];

const transportOptions = [
  { value: '', label: 'No transport', icon: '🚫' },
  { value: '4x4_safari_vehicle', label: '4x4 Safari Vehicle', icon: '🚙' },
  { value: 'minivan', label: 'Minivan/Bus', icon: '🚌' },
  { value: 'domestic_flight', label: 'Domestic Flight', icon: '✈️' },
  { value: 'boat', label: 'Boat/Dhow', icon: '⛵' },
  { value: 'walking', label: 'Walking/Hiking', icon: '🥾' },
];

export default function Itineraries() {
  const [view, setView] = useState<'menu' | 'saved' | 'builder'>('menu');
  const [title, setTitle] = useState('7-Day Serengeti & Ngorongoro Safari');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [days, setDays] = useState<Day[]>([
    { id: '1', dayNumber: 1, dayTitle: 'Arrival in Arusha', activityDescription: 'Arrive at Kilimanjaro International Airport. Transfer to hotel.', overnightLocation: 'Arusha Coffee Lodge', mealsBreakfast: false, mealsLunch: false, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '2', dayNumber: 2, dayTitle: 'Tarangire National Park', activityDescription: 'Full day game drive. Known for elephant herds and baobab trees.', overnightLocation: 'Tarangire Safari Lodge', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '3', dayNumber: 3, dayTitle: 'Ngorongoro Crater', activityDescription: 'Descend into the crater for a full day game drive.', overnightLocation: 'Ngorongoro Wildlife Lodge', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '4', dayNumber: 4, dayTitle: 'Central Serengeti', activityDescription: 'Drive to Serengeti. Afternoon game drive in Seronera area.', overnightLocation: 'Serengeti Sopa Lodge', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '5', dayNumber: 5, dayTitle: 'Full Day Serengeti', activityDescription: 'Full day game drive. Optional hot air balloon at sunrise.', overnightLocation: 'Serengeti Sopa Lodge', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '6', dayNumber: 6, dayTitle: 'Serengeti to Zanzibar', activityDescription: 'Morning game drive, then fly to Zanzibar. Beach afternoon.', overnightLocation: 'Zanzibar Beach Resort', mealsBreakfast: true, mealsLunch: false, mealsDinner: true, transportMode: 'domestic_flight' },
    { id: '7', dayNumber: 7, dayTitle: 'Zanzibar & Departure', activityDescription: 'Morning at leisure. Optional Stone Town tour. Departure.', overnightLocation: 'N/A - Departure', mealsBreakfast: true, mealsLunch: false, mealsDinner: false, transportMode: '4x4_safari_vehicle' },
  ]);

  const addDay = () => {
    const newDay: Day = { id: String(Date.now()), dayNumber: days.length + 1, dayTitle: `Day ${days.length + 1}`, activityDescription: '', overnightLocation: '', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' };
    setDays([...days, newDay]);
    setExpandedDay(days.length);
  };

  const removeDay = (index: number) => {
    const newDays = days.filter((_, i) => i !== index).map((d, i) => ({ ...d, dayNumber: i + 1 }));
    setDays(newDays);
  };

  const updateDay = (index: number, field: keyof Day, value: any) => {
    setDays(days.map((d, i) => i === index ? { ...d, [field]: value } : d));
  };

  const moveDay = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= days.length) return;
    const newDays = [...days];
    [newDays[index], newDays[newIndex]] = [newDays[newIndex], newDays[index]];
    setDays(newDays.map((d, i) => ({ ...d, dayNumber: i + 1 })));
    setExpandedDay(newIndex);
  };

  const getTransportIcon = (mode: string) => transportOptions.find(o => o.value === mode)?.icon || '🚫';
  const totalMeals = { breakfast: days.filter(d => d.mealsBreakfast).length, lunch: days.filter(d => d.mealsLunch).length, dinner: days.filter(d => d.mealsDinner).length };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Main Menu - Two Large Icon Cards
  if (view === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Itineraries</h1>
          <p className="text-slate-500 mt-1">Manage your trip itineraries</p>
        </div>

        {/* Two Column Layout with Large Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Saved Itineraries Card */}
          <button
            onClick={() => setView('saved')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-primary-500 hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {/* Large Icon */}
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#012871] to-[#011950] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FolderOpen className="w-16 h-16 text-white" />
              </div>

              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Saved Itineraries</h2>
                <p className="text-slate-500 text-sm">View and manage your existing trip plans</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <span className="text-2xl font-bold text-primary-600">{mockSavedItineraries.length}</span>
                <span className="text-sm text-primary-500">itineraries</span>
              </div>

              {/* Action Hint */}
              <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>View Itineraries</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Itinerary Builder Card */}
          <button
            onClick={() => setView('builder')}
            className="group bg-white rounded-3xl border-2 border-slate-200 p-12 text-left transition-all duration-300 hover:border-accent-500 hover:shadow-2xl hover:-translate-y-1"
            style={{ minHeight: '400px' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {/* Large Icon */}
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#f35500] to-[#c54300] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <PenTool className="w-16 h-16 text-white" />
              </div>

              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Itinerary Builder</h2>
                <p className="text-slate-500 text-sm">Create a new day-by-day trip plan</p>
              </div>

              {/* Feature List */}
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Day-by-day planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Meal & transport tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                  <span>Drag & drop reordering</span>
                </div>
              </div>

              {/* Action Hint */}
              <div className="flex items-center gap-2 text-accent-600 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Start Building</span>
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

  // Saved Itineraries View
  if (view === 'saved') {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('menu')}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Saved Itineraries</h1>
              <p className="text-slate-500 mt-1">View and manage your existing trip plans</p>
            </div>
          </div>
          <button
            onClick={() => setView('builder')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>

        {/* Itinerary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSavedItineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-slate-300 group"
              style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-800 mb-1 line-clamp-2">
                      {itinerary.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{itinerary.destination}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(itinerary.status)}`}>
                    {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{itinerary.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{itinerary.paxCount} pax</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(itinerary.startDate).toLocaleDateString()}</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(itinerary.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-400">
                    Created {new Date(itinerary.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex gap-1">
                  <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-primary-600 transition-colors" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-primary-600 transition-colors" title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-primary-600 transition-colors" title="Duplicate">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-red-600 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Itinerary Builder View
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView('menu')}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Itinerary Builder</h1>
            <p className="text-slate-500 mt-1">Create a new day-by-day trip plan</p>
          </div>
        </div>
      </div>

      {/* Builder Header Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Itinerary Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Total Days</label>
            <input 
              type="number" 
              value={days.length} 
              readOnly 
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-slate-50" 
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{days.length} Days / {Math.max(0, days.length - 1)} Nights</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-amber-500">☕</span>
            <span>{totalMeals.breakfast} Breakfasts</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-orange-500">🍽️</span>
            <span>{totalMeals.lunch} Lunches</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-indigo-500">🌙</span>
            <span>{totalMeals.dinner} Dinners</span>
          </div>
        </div>
      </div>

      {/* Day Cards */}
      <div className="space-y-3">
        {days.map((day, index) => (
          <div 
            key={day.id} 
            className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
          >
            {/* Day Header */}
            <div 
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => setExpandedDay(expandedDay === index ? null : index)}
            >
              <div className="flex flex-col gap-0.5">
                <button 
                  onClick={(e) => { e.stopPropagation(); moveDay(index, 'up'); }} 
                  className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30" 
                  disabled={index === 0}
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveDay(index, 'down'); }} 
                  className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30" 
                  disabled={index === days.length - 1}
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700">
                {day.dayNumber}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-800">{day.dayTitle}</h3>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {day.overnightLocation || 'Not set'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {getTransportIcon(day.transportMode)} {transportOptions.find(t => t.value === day.transportMode)?.label || 'No transport'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {day.mealsBreakfast && <span className="text-xs px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded">B</span>}
                {day.mealsLunch && <span className="text-xs px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded">L</span>}
                {day.mealsDinner && <span className="text-xs px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded">D</span>}
              </div>
              {expandedDay === index ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>

            {/* Expanded Day Content */}
            {expandedDay === index && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Day Title</label>
                    <input 
                      type="text" 
                      value={day.dayTitle} 
                      onChange={e => updateDay(index, 'dayTitle', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Overnight Location</label>
                    <input 
                      type="text" 
                      value={day.overnightLocation} 
                      onChange={e => updateDay(index, 'overnightLocation', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary-500 outline-none" 
                      placeholder="Hotel/lodge name" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Activity Description</label>
                  <textarea 
                    value={day.activityDescription} 
                    onChange={e => updateDay(index, 'activityDescription', e.target.value)} 
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none" 
                    placeholder="Describe the day's activities..." 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Transport Mode</label>
                    <select 
                      value={day.transportMode} 
                      onChange={e => updateDay(index, 'transportMode', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                      {transportOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.icon} {opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-2">Meals Included</label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={day.mealsBreakfast} 
                          onChange={e => updateDay(index, 'mealsBreakfast', e.target.checked)} 
                          className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" 
                        />
                        <span className="text-sm text-slate-600">☕ Breakfast</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={day.mealsLunch} 
                          onChange={e => updateDay(index, 'mealsLunch', e.target.checked)} 
                          className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" 
                        />
                        <span className="text-sm text-slate-600">🍽️ Lunch</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={day.mealsDinner} 
                          onChange={e => updateDay(index, 'mealsDinner', e.target.checked)} 
                          className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" 
                        />
                        <span className="text-sm text-slate-600">🌙 Dinner</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => removeDay(index)} 
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Remove Day
                  </button>
                  <button 
                    onClick={() => setExpandedDay(null)} 
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Day Button */}
      <button 
        onClick={addDay}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Day {days.length + 1}
      </button>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4">
        <button 
          onClick={() => setView('menu')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}>
          <Save className="w-4 h-4" /> Save Itinerary
        </button>
      </div>
    </div>
  );
}
