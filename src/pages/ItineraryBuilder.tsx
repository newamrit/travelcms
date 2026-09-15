import React, { useState } from 'react';
import { Plus, Save, Copy, ChevronDown, ChevronUp, Trash2, MapPin, Calendar, Coffee, Sun, Moon } from 'lucide-react';

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

const transportOptions = [
  { value: '', label: 'No transport', icon: '🚫' },
  { value: '4x4_safari_vehicle', label: '4x4 Safari Vehicle', icon: '🚙' },
  { value: 'minivan', label: 'Minivan/Bus', icon: '🚌' },
  { value: 'domestic_flight', label: 'Domestic Flight', icon: '✈️' },
  { value: 'boat', label: 'Boat/Dhow', icon: '⛵' },
  { value: 'walking', label: 'Walking/Hiking', icon: '🥾' },
];

export default function ItineraryBuilder() {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Itinerary Builder</h1>
          <p className="text-slate-500 mt-1">Create day-by-day tour plans with activities, meals, and transport</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><Copy className="w-4 h-4" /> Duplicate</button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"><Save className="w-4 h-4" /> Save Itinerary</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Itinerary Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Total Days</label>
            <input type="number" value={days.length} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4 text-slate-400" /><span>{days.length} Days / {Math.max(0, days.length - 1)} Nights</span></div>
          <div className="flex items-center gap-2 text-sm text-slate-600"><Coffee className="w-4 h-4 text-amber-500" /><span>{totalMeals.breakfast} Breakfasts</span></div>
          <div className="flex items-center gap-2 text-sm text-slate-600"><Sun className="w-4 h-4 text-orange-500" /><span>{totalMeals.lunch} Lunches</span></div>
          <div className="flex items-center gap-2 text-sm text-slate-600"><Moon className="w-4 h-4 text-indigo-500" /><span>{totalMeals.dinner} Dinners</span></div>
        </div>
      </div>

      <div className="space-y-3">
        {days.map((day, index) => (
          <div key={day.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50" onClick={() => setExpandedDay(expandedDay === index ? null : index)}>
              <div className="flex flex-col gap-0.5">
                <button onClick={(e) => { e.stopPropagation(); moveDay(index, 'up'); }} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30" disabled={index === 0}><ChevronUp className="w-3 h-3" /></button>
                <button onClick={(e) => { e.stopPropagation(); moveDay(index, 'down'); }} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-30" disabled={index === days.length - 1}><ChevronDown className="w-3 h-3" /></button>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700">{day.dayNumber}</div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-800">{day.dayTitle}</h3>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {day.overnightLocation || 'Not set'}</span>
                  <span className="text-xs text-slate-500">{getTransportIcon(day.transportMode)} {transportOptions.find(t => t.value === day.transportMode)?.label || 'No transport'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {day.mealsBreakfast && <span className="text-xs px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded">B</span>}
                {day.mealsLunch && <span className="text-xs px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded">L</span>}
                {day.mealsDinner && <span className="text-xs px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded">D</span>}
              </div>
              {expandedDay === index ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>

            {expandedDay === index && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Day Title</label>
                    <input type="text" value={day.dayTitle} onChange={e => updateDay(index, 'dayTitle', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Overnight Location</label>
                    <input type="text" value={day.overnightLocation} onChange={e => updateDay(index, 'overnightLocation', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Hotel/lodge name" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Activity Description</label>
                  <textarea value={day.activityDescription} onChange={e => updateDay(index, 'activityDescription', e.target.value)} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none" placeholder="Describe the day's activities..." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Transport Mode</label>
                    <select value={day.transportMode} onChange={e => updateDay(index, 'transportMode', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                      {transportOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.icon} {opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-2">Meals Included</label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={day.mealsBreakfast} onChange={e => updateDay(index, 'mealsBreakfast', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-amber-600" /><span className="text-sm text-slate-600">🌅 B</span></label>
                      <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={day.mealsLunch} onChange={e => updateDay(index, 'mealsLunch', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-orange-600" /><span className="text-sm text-slate-600">☀️ L</span></label>
                      <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={day.mealsDinner} onChange={e => updateDay(index, 'mealsDinner', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-indigo-600" /><span className="text-sm text-slate-600">🌙 D</span></label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex gap-2">
                    <button onClick={() => removeDay(index)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"><Trash2 className="w-3 h-3" /> Remove Day</button>
                  </div>
                  <button onClick={() => setExpandedDay(null)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100">Done</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={addDay} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> Add Day {days.length + 1}
      </button>
    </div>
  );
}
