import React, { useState } from 'react';
import { 
  Map, Calendar, MapPin, Users, Clock, Edit2, Trash2, Copy, 
  Eye, Plus, Save, ChevronDown, ChevronUp, Star, TrendingUp
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
  {
    id: '1',
    title: '7-Day Serengeti & Ngorongoro Safari',
    destination: 'Tanzania',
    duration: '7 Days / 6 Nights',
    days: 7,
    startDate: '2024-06-15',
    endDate: '2024-06-21',
    status: 'confirmed',
    paxCount: 4,
    createdAt: '2024-03-01'
  },
  {
    id: '2',
    title: '5-Day Masai Mara Adventure',
    destination: 'Kenya',
    duration: '5 Days / 4 Nights',
    days: 5,
    startDate: '2024-07-10',
    endDate: '2024-07-14',
    status: 'draft',
    paxCount: 2,
    createdAt: '2024-03-05'
  },
  {
    id: '3',
    title: '10-Day Tanzania & Zanzibar Combo',
    destination: 'Tanzania',
    duration: '10 Days / 9 Nights',
    days: 10,
    startDate: '2024-08-01',
    endDate: '2024-08-10',
    status: 'confirmed',
    paxCount: 6,
    createdAt: '2024-02-28'
  },
  {
    id: '4',
    title: '3-Day Gorilla Trekking Experience',
    destination: 'Uganda',
    duration: '3 Days / 2 Nights',
    days: 3,
    startDate: '2024-09-05',
    endDate: '2024-09-07',
    status: 'completed',
    paxCount: 3,
    createdAt: '2024-01-15'
  },
  {
    id: '5',
    title: '8-Day South Africa Safari & Cape Town',
    destination: 'South Africa',
    duration: '8 Days / 7 Nights',
    days: 8,
    startDate: '2024-10-12',
    endDate: '2024-10-19',
    status: 'draft',
    paxCount: 4,
    createdAt: '2024-03-10'
  },
  {
    id: '6',
    title: '4-Day Victoria Falls & Chobe',
    destination: 'Zimbabwe/Botswana',
    duration: '4 Days / 3 Nights',
    days: 4,
    startDate: '2024-11-20',
    endDate: '2024-11-23',
    status: 'confirmed',
    paxCount: 2,
    createdAt: '2024-03-08'
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
  const [activeTab, setActiveTab] = useState<'saved' | 'builder'>('saved');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Itineraries</h1>
          <p className="text-slate-500 mt-1">Manage saved itineraries and create new trip plans</p>
        </div>
      </div>

      {/* Material UI Style Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 p-1">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'saved'
                ? 'bg-primary-50 text-primary-700 shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Map className="w-4 h-4" />
            Saved Itineraries
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'saved' ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {mockSavedItineraries.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'builder'
                ? 'bg-primary-50 text-primary-700 shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Plus className="w-4 h-4" />
            Itinerary Builder
          </button>
        </div>
      </div>

      {/* Saved Itineraries - Material UI Card Grid */}
      {activeTab === 'saved' && (
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

          {/* Add New Itinerary Card */}
          <button
            onClick={() => setActiveTab('builder')}
            className="bg-white rounded-lg border-2 border-dashed border-slate-300 overflow-hidden transition-all duration-200 hover:border-primary-400 hover:bg-primary-50/50 group min-h-[320px] flex flex-col items-center justify-center"
            style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
          >
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
              <Plus className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-1">Create New Itinerary</h3>
            <p className="text-sm text-slate-500 text-center px-4">
              Build a custom day-by-day trip plan
            </p>
          </button>
        </div>
      )}

      {/* Itinerary Builder */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          {/* Builder Header */}
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
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}>
              <Save className="w-4 h-4" /> Save Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
