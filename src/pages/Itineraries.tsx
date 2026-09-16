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
  category: 'trekking' | 'cultural' | 'expedition' | 'adventure' | 'safari';
  included: string[];
  excluded: string[];
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
  // Trekking Itineraries (2)
  {
    id: '1',
    title: '6-Day Annapurna Base Camp Trek',
    destination: 'Pokhara, Annapurna Region',
    duration: '6 Days / 5 Nights',
    days: 6,
    startDate: '2026-04-15',
    endDate: '2026-04-20',
    status: 'confirmed',
    paxCount: 8,
    category: 'trekking',
    included: ['Accommodation in tea houses', 'All meals during trek', 'Experienced guide & porters', 'Annapurna Conservation Permit', 'First aid kit', 'Transportation to/from trailhead'],
    excluded: ['Personal expenses', 'Travel insurance', 'Tips for guide/porters', 'Hot showers', 'Wi-Fi charges', 'Extra snacks'],
    createdAt: '2026-02-15'
  },
  {
    id: '2',
    title: '8-Day Everest View Trek',
    destination: 'Lukla, Namche Bazaar, Tengboche',
    duration: '8 Days / 7 Nights',
    days: 8,
    startDate: '2026-10-10',
    endDate: '2026-10-17',
    status: 'confirmed',
    paxCount: 6,
    category: 'trekking',
    included: ['Tea house accommodation', 'All meals (B/L/D)', 'Licensed sherpa guide', 'TIMS card & permits', 'Domestic flights (KTM-LUK-KTM)', 'Porter service (1 porter per 2 trekkers)'],
    excluded: ['Nepal entry visa', 'Personal gear', 'Alcoholic beverages', 'Battery charging', 'Internet access', 'Emergency evacuation'],
    createdAt: '2026-03-10'
  },

  // Cultural Itineraries (3)
  {
    id: '3',
    title: '5-Day Kathmandu Valley Heritage Tour',
    destination: 'Kathmandu, Bhaktapur, Patan',
    duration: '5 Days / 4 Nights',
    days: 5,
    startDate: '2026-05-01',
    endDate: '2026-05-05',
    status: 'confirmed',
    paxCount: 12,
    category: 'cultural',
    included: ['4-star hotel accommodation', 'Daily breakfast', 'All entrance fees', 'Professional cultural guide', 'Private transportation', 'Welcome & farewell dinners'],
    excluded: ['Lunch & dinner (except included)', 'Personal shopping', 'Tips', 'Travel insurance', 'Optional activities'],
    createdAt: '2026-02-20'
  },
  {
    id: '4',
    title: '4-Day Nagarkot & Dhulikhel Cultural Tour',
    destination: 'Nagarkot, Dhulikhel, Changunarayan',
    duration: '4 Days / 3 Nights',
    days: 4,
    startDate: '2026-06-12',
    endDate: '2026-06-15',
    status: 'confirmed',
    paxCount: 10,
    category: 'cultural',
    included: ['Resort accommodation', 'All meals', 'Sunrise/sunset viewpoints', 'Cultural guide', 'Transportation', 'Changunarayan Temple entry'],
    excluded: ['Personal expenses', 'Tips', 'Travel insurance', 'Optional hiking gear rental'],
    createdAt: '2026-03-05'
  },
  {
    id: '5',
    title: '3-Day Pokhara Lakeside Cultural Experience',
    destination: 'Pokhara, World Peace Pagoda, Davis Falls',
    duration: '3 Days / 2 Nights',
    days: 3,
    startDate: '2026-07-20',
    endDate: '2026-07-22',
    status: 'draft',
    paxCount: 15,
    category: 'cultural',
    included: ['Hotel accommodation', 'Daily breakfast', 'City tour', 'Guide services', 'Transportation'],
    excluded: ['Lunch & dinner', 'Boat rides', 'Personal expenses', 'Tips'],
    createdAt: '2026-03-15'
  },

  // Expedition Itineraries (1)
  {
    id: '6',
    title: '14-Day Everest Base Camp Expedition',
    destination: 'Lukla, Namche, Gorak Shep, EBC',
    duration: '14 Days / 13 Nights',
    days: 14,
    startDate: '2026-09-01',
    endDate: '2026-09-14',
    status: 'confirmed',
    paxCount: 4,
    category: 'expedition',
    included: ['All accommodation', 'All meals during expedition', 'Experienced climbing sherpa', 'All permits & fees', 'Domestic flights', 'Porter service', 'Group climbing equipment', 'First aid & oxygen', 'Satellite phone'],
    excluded: ['Personal climbing gear', 'High altitude insurance', 'Tips for sherpa/porters', 'Personal medications', 'Extra oxygen', 'Emergency evacuation'],
    createdAt: '2026-01-10'
  },

  // Adventure Itineraries (2)
  {
    id: '7',
    title: '5-Day Pokhara Adventure Sports Package',
    destination: 'Pokhara, Sarangkot, Seti River',
    duration: '5 Days / 4 Nights',
    days: 5,
    startDate: '2026-08-05',
    endDate: '2026-08-09',
    status: 'confirmed',
    paxCount: 8,
    category: 'adventure',
    included: ['Hotel accommodation', 'Daily breakfast', 'Paragliding flight', 'Zip-lining', 'Canyon swing', 'All equipment', 'Professional instructors', 'Transportation', 'Insurance'],
    excluded: ['Lunch & dinner', 'GoPro footage', 'Personal expenses', 'Tips', 'Travel insurance'],
    createdAt: '2026-03-20'
  },
  {
    id: '8',
    title: '4-Day White Water Rafting & Bungee Jumping',
    destination: 'Trishuli River, Kurintar, Pokhara',
    duration: '4 Days / 3 Nights',
    days: 4,
    startDate: '2026-11-15',
    endDate: '2026-11-18',
    status: 'draft',
    paxCount: 10,
    category: 'adventure',
    included: ['Camping accommodation', 'All meals during rafting', 'Rafting equipment', 'Bungee jumping', 'Professional guides', 'Transportation', 'Safety equipment'],
    excluded: ['Personal gear', 'Alcoholic beverages', 'Tips', 'Travel insurance', 'Optional activities'],
    createdAt: '2026-03-25'
  },

  // Safari Itineraries (1)
  {
    id: '9',
    title: '4-Day Chitwan Wildlife Safari',
    destination: 'Chitwan National Park, Sauraha',
    duration: '4 Days / 3 Nights',
    days: 4,
    startDate: '2026-12-01',
    endDate: '2026-12-04',
    status: 'confirmed',
    paxCount: 12,
    category: 'safari',
    included: ['Resort accommodation', 'All meals', 'Jungle safari (jeep)', 'Elephant breeding center visit', 'Bird watching tour', 'Cultural program', 'National park fees', 'Naturalist guide', 'Transportation'],
    excluded: ['Personal expenses', 'Tips', 'Travel insurance', 'Optional canoe ride', 'Souvenirs'],
    createdAt: '2026-03-30'
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
  const [view, setView] = useState<'menu' | 'saved' | 'builder' | 'view' | 'edit'>('menu');
  const [itineraries, setItineraries] = useState<SavedItinerary[]>(mockSavedItineraries);
  const [selectedItinerary, setSelectedItinerary] = useState<SavedItinerary | null>(null);
  const [editingItinerary, setEditingItinerary] = useState<SavedItinerary | null>(null);
  const [title, setTitle] = useState('7-Day Serengeti & Ngorongoro Safari');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [builderIncluded, setBuilderIncluded] = useState<string[]>([]);
  const [builderExcluded, setBuilderExcluded] = useState<string[]>([]);
  const [newIncludedItem, setNewIncludedItem] = useState('');
  const [newExcludedItem, setNewExcludedItem] = useState('');
  const [days, setDays] = useState<Day[]>([
    { id: '1', dayNumber: 1, dayTitle: 'Arrival in Arusha', activityDescription: 'Arrive at Kilimanjaro International Airport. Transfer to hotel.', overnightLocation: 'Arusha Coffee Lodge', mealsBreakfast: false, mealsLunch: false, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '2', dayNumber: 2, dayTitle: 'Tarangire National Park', activityDescription: 'Full day game drive. Known for elephant herds and baobab trees.', overnightLocation: 'Tarangire Safari Lodge', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '3', dayNumber: 3, dayTitle: 'Ngorongoro Crater', activityDescription: 'Descend into the crater for a full day game drive.', overnightLocation: 'Ngorongoro Wildlife Lodge', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '4', dayNumber: 4, dayTitle: 'Central Serengeti', activityDescription: 'Drive to Serengeti. Afternoon game drive in Seronera area.', overnightLocation: 'Serengeti Sopa Lodge', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '5', dayNumber: 5, dayTitle: 'Full Day Serengeti', activityDescription: 'Full day game drive. Optional hot air balloon at sunrise.', overnightLocation: 'Serengeti Sopa Lodge', mealsBreakfast: true, mealsLunch: true, mealsDinner: true, transportMode: '4x4_safari_vehicle' },
    { id: '6', dayNumber: 6, dayTitle: 'Serengeti to Zanzibar', activityDescription: 'Morning game drive, then fly to Zanzibar. Beach afternoon.', overnightLocation: 'Zanzibar Beach Resort', mealsBreakfast: true, mealsLunch: false, mealsDinner: true, transportMode: 'domestic_flight' },
    { id: '7', dayNumber: 7, dayTitle: 'Zanzibar & Departure', activityDescription: 'Morning at leisure. Optional Stone Town tour. Departure.', overnightLocation: 'N/A - Departure', mealsBreakfast: true, mealsLunch: false, mealsDinner: false, transportMode: '4x4_safari_vehicle' },
  ]);

  // Handler functions
  const handleView = (itinerary: SavedItinerary) => {
    setSelectedItinerary(itinerary);
    setView('view');
  };

  const handleEdit = (itinerary: SavedItinerary) => {
    setEditingItinerary({ ...itinerary });
    setView('edit');
  };

  const handleDuplicate = (itinerary: SavedItinerary) => {
    const duplicated: SavedItinerary = {
      ...itinerary,
      id: String(Date.now()),
      title: `${itinerary.title} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setItineraries([...itineraries, duplicated]);
  };

  const handleDelete = (itinerary: SavedItinerary) => {
    if (confirm(`Are you sure you want to delete "${itinerary.title}"?`)) {
      setItineraries(itineraries.filter(i => i.id !== itinerary.id));
    }
  };

  const handleSaveEdit = () => {
    if (editingItinerary) {
      setItineraries(itineraries.map(i => i.id === editingItinerary.id ? editingItinerary : i));
      setEditingItinerary(null);
      setView('saved');
    }
  };

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

  // Included/Excluded handlers
  const handleAddIncluded = () => {
    if (newIncludedItem.trim()) {
      setBuilderIncluded([...builderIncluded, newIncludedItem.trim()]);
      setNewIncludedItem('');
    }
  };

  const handleRemoveIncluded = (index: number) => {
    setBuilderIncluded(builderIncluded.filter((_, i) => i !== index));
  };

  const handleAddExcluded = () => {
    if (newExcludedItem.trim()) {
      setBuilderExcluded([...builderExcluded, newExcludedItem.trim()]);
      setNewExcludedItem('');
    }
  };

  const handleRemoveExcluded = (index: number) => {
    setBuilderExcluded(builderExcluded.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'trekking':
        return { label: 'Trekking', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '🥾' };
      case 'cultural':
        return { label: 'Cultural', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: '🏛️' };
      case 'expedition':
        return { label: 'Expedition', color: 'bg-red-100 text-red-700 border-red-200', icon: '⛰️' };
      case 'adventure':
        return { label: 'Adventure', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: '🎯' };
      case 'safari':
        return { label: 'Safari', color: 'bg-green-100 text-green-700 border-green-200', icon: '🦁' };
      default:
        return { label: 'Other', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: '📍' };
    }
  };

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const filteredItineraries = categoryFilter === 'all' 
    ? itineraries 
    : itineraries.filter(i => i.category === categoryFilter);

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
                <span className="text-2xl font-bold text-primary-600">{itineraries.length}</span>
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

        {/* Category Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({itineraries.length})
            </button>
            <button
              onClick={() => setCategoryFilter('trekking')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === 'trekking'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              🥾 Trekking ({itineraries.filter(i => i.category === 'trekking').length})
            </button>
            <button
              onClick={() => setCategoryFilter('cultural')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === 'cultural'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              🏛️ Cultural ({itineraries.filter(i => i.category === 'cultural').length})
            </button>
            <button
              onClick={() => setCategoryFilter('expedition')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === 'expedition'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              ⛰️ Expedition ({itineraries.filter(i => i.category === 'expedition').length})
            </button>
            <button
              onClick={() => setCategoryFilter('adventure')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === 'adventure'
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              🎯 Adventure ({itineraries.filter(i => i.category === 'adventure').length})
            </button>
            <button
              onClick={() => setCategoryFilter('safari')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === 'safari'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              🦁 Safari ({itineraries.filter(i => i.category === 'safari').length})
            </button>
          </div>
        </div>

        {/* Itinerary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-slate-300 group"
              style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryInfo(itinerary.category).color}`}>
                        {getCategoryInfo(itinerary.category).icon} {getCategoryInfo(itinerary.category).label}
                      </span>
                    </div>
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
                  <button 
                    onClick={() => handleView(itinerary)}
                    className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-primary-600 transition-colors" 
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEdit(itinerary)}
                    className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-primary-600 transition-colors" 
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDuplicate(itinerary)}
                    className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-primary-600 transition-colors" 
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => handleDelete(itinerary)}
                  className="p-2 rounded-md hover:bg-white text-slate-600 hover:text-red-600 transition-colors" 
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // View Itinerary Detail View
  if (view === 'view' && selectedItinerary) {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('saved')}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Itinerary Details</h1>
              <p className="text-slate-500 mt-1">View complete itinerary information</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(selectedItinerary)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        {/* Itinerary Details Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}>
          <div className="space-y-6">
            {/* Category and Status */}
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getCategoryInfo(selectedItinerary.category).color}`}>
                {getCategoryInfo(selectedItinerary.category).icon} {getCategoryInfo(selectedItinerary.category).label}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedItinerary.status)}`}>
                {selectedItinerary.status.charAt(0).toUpperCase() + selectedItinerary.status.slice(1)}
              </span>
            </div>

            {/* Title and Destination */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedItinerary.title}</h2>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{selectedItinerary.destination}</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Duration</p>
                  <p className="text-lg font-semibold text-slate-800">{selectedItinerary.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Group Size</p>
                  <p className="text-lg font-semibold text-slate-800">{selectedItinerary.paxCount} passengers</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Start Date</p>
                  <p className="text-lg font-semibold text-slate-800">{new Date(selectedItinerary.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">End Date</p>
                  <p className="text-lg font-semibold text-slate-800">{new Date(selectedItinerary.endDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Included/Excluded Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              {/* Included in Package */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">Included in Package</h3>
                </div>
                <ul className="space-y-2">
                  {selectedItinerary.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded from Package */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">Excluded from Package</h3>
                </div>
                <ul className="space-y-2">
                  {selectedItinerary.excluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Created Date */}
            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Created on {new Date(selectedItinerary.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Itinerary View
  if (view === 'edit' && editingItinerary) {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('saved')}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Edit Itinerary</h1>
              <p className="text-slate-500 mt-1">Update itinerary details</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}>
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Itinerary Title</label>
              <input
                type="text"
                value={editingItinerary.title}
                onChange={(e) => setEditingItinerary({ ...editingItinerary, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Destination</label>
              <input
                type="text"
                value={editingItinerary.destination}
                onChange={(e) => setEditingItinerary({ ...editingItinerary, destination: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={editingItinerary.category}
                  onChange={(e) => setEditingItinerary({ ...editingItinerary, category: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="trekking">🥾 Trekking</option>
                  <option value="cultural">🏛️ Cultural</option>
                  <option value="expedition">⛰️ Expedition</option>
                  <option value="adventure">🎯 Adventure</option>
                  <option value="safari">🦁 Safari</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={editingItinerary.status}
                  onChange={(e) => setEditingItinerary({ ...editingItinerary, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Duration and Pax Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={editingItinerary.duration}
                  onChange={(e) => setEditingItinerary({ ...editingItinerary, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., 5 Days / 4 Nights"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Group Size (Pax Count)</label>
                <input
                  type="number"
                  value={editingItinerary.paxCount}
                  onChange={(e) => setEditingItinerary({ ...editingItinerary, paxCount: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  min="1"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={editingItinerary.startDate}
                  onChange={(e) => setEditingItinerary({ ...editingItinerary, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={editingItinerary.endDate}
                  onChange={(e) => setEditingItinerary({ ...editingItinerary, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Included/Excluded Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              {/* Included in Package */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">Included in Package</h3>
                </div>
                <ul className="space-y-2">
                  {editingItinerary.included.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-md border border-green-200">
                      <span className="text-sm text-slate-700">{item}</span>
                      <button
                        onClick={() => setEditingItinerary({
                          ...editingItinerary,
                          included: editingItinerary.included.filter((_, i) => i !== index)
                        })}
                        className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded from Package */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">Excluded from Package</h3>
                </div>
                <ul className="space-y-2">
                  {editingItinerary.excluded.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-md border border-red-200">
                      <span className="text-sm text-slate-700">{item}</span>
                      <button
                        onClick={() => setEditingItinerary({
                          ...editingItinerary,
                          excluded: editingItinerary.excluded.filter((_, i) => i !== index)
                        })}
                        className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
              <button
                onClick={() => setView('saved')}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
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

      {/* Included/Excluded Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Included in Package */}
        <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Included in Package</h3>
          </div>

          {/* Add Item Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newIncludedItem}
              onChange={(e) => setNewIncludedItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddIncluded()}
              placeholder="Add item (e.g., Accommodation, Meals...)"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
            <button
              onClick={handleAddIncluded}
              className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Included Items List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {builderIncluded.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">No items added yet</p>
            ) : (
              builderIncluded.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-md border border-green-200">
                  <span className="text-sm text-slate-700">{item}</span>
                  <button
                    onClick={() => handleRemoveIncluded(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Excluded from Package */}
        <div className="bg-white rounded-lg border border-slate-200 p-6" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Excluded from Package</h3>
          </div>

          {/* Add Item Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newExcludedItem}
              onChange={(e) => setNewExcludedItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddExcluded()}
              placeholder="Add item (e.g., Personal expenses, Tips...)"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            />
            <button
              onClick={handleAddExcluded}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Excluded Items List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {builderExcluded.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">No items added yet</p>
            ) : (
              builderExcluded.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-md border border-red-200">
                  <span className="text-sm text-slate-700">{item}</span>
                  <button
                    onClick={() => handleRemoveExcluded(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

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
