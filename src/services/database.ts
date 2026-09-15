/**
 * TravelOps Pro — Database Service Layer
 * Uses localStorage as persistent storage engine
 * Provides full CRUD operations for all entities
 */

// ============ TYPES ============
export interface DBUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'sales_agent' | 'operations_manager' | 'accountant';
  phone: string;
  isActive: boolean;
  createdAt: string;
}

export interface DBLead {
  id: string;
  leadNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientWhatsapp: string;
  clientCountry: string;
  paxAdults: number;
  paxChildren: number;
  travelDateFrom: string;
  travelDateTo: string;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  leadSource: string;
  status: 'new' | 'contacted' | 'requirements_gathered' | 'quoting' | 'negotiation' | 'won' | 'lost';
  assignedAgentId: string;
  assignedAgentName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBBooking {
  id: string;
  bookingNumber: string;
  leadId: string;
  clientName: string;
  destination: string;
  startDate: string;
  endDate: string;
  paxAdults: number;
  paxChildren: number;
  totalAmount: number;
  currency: string;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  category: 'school_college' | 'corporate_retreat' | 'vacation_family';
  specialRequests: string;
  createdAt: string;
}

export interface DBVendor {
  id: string;
  name: string;
  type: 'Vehicle' | 'Guide' | 'Hotel' | 'Restaurant' | 'Activity' | 'Permit' | 'Others';
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  rating: number;
  vehicleNumber?: string;
  vehicleType?: string;
  createdAt: string;
}

export interface DBAssignmentItem {
  id: string;
  type: 'vehicle' | 'guide' | 'hotel' | 'restaurant' | 'activity' | 'permit' | 'others';
  supplierName: string;
  serviceDate: string;
  amount: number;
  notes: string;
  vehicleNumber?: string;
  vehicleType?: string;
}

export interface DBAssignment {
  id: string;
  assignmentNumber: string;
  bookingId: string;
  bookingNumber: string;
  clientName: string;
  items: DBAssignmentItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface DBInvoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  bookingNumber: string;
  clientName: string;
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  invoiceDate: string;
  dueDate: string;
  payments: DBPayment[];
  createdAt: string;
}

export interface DBPayment {
  id: string;
  paymentReference: string;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  referenceNumber: string;
  notes: string;
}

export interface DBSupplierExpense {
  id: string;
  assignmentId: string;
  vendorId: string;
  vendorName: string;
  category: string;
  quotedAmount: number;
  actualAmount: number;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  createdAt: string;
}

// ============ DATABASE ENGINE ============
const DB_PREFIX = 'travelops_db_';

class DatabaseEngine {
  private getCollection<T>(collection: string): T[] {
    const data = localStorage.getItem(DB_PREFIX + collection);
    return data ? JSON.parse(data) : [];
  }

  public setCollection<T>(collection: string, data: T[]): void {
    localStorage.setItem(DB_PREFIX + collection, JSON.stringify(data));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  private generateNumber(prefix: string, collection: string): string {
    const items = this.getCollection<any>(collection);
    const year = new Date().getFullYear();
    const count = items.filter((i: any) => 
      i[Object.keys(i).find(k => k.includes('Number') || k.includes('number')) || '']?.includes(`${prefix}-${year}`)
    ).length;
    return `${prefix}-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  // Generic CRUD operations
  findAll<T>(collection: string): T[] {
    return this.getCollection<T>(collection);
  }

  findById<T extends { id: string }>(collection: string, id: string): T | null {
    const items = this.getCollection<T>(collection);
    return items.find(item => item.id === id) || null;
  }

  create<T extends { id?: string }>(collection: string, data: T): T {
    const items = this.getCollection<T>(collection);
    const newItem = { ...data, id: data.id || this.generateId() };
    items.push(newItem);
    this.setCollection(collection, items);
    return newItem;
  }

  update<T extends { id: string }>(collection: string, id: string, data: Partial<T>): T | null {
    const items = this.getCollection<T>(collection);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...data };
    this.setCollection(collection, items);
    return items[index];
  }

  delete(collection: string, id: string): boolean {
    const items = this.getCollection<any>(collection);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    this.setCollection(collection, filtered);
    return true;
  }

  findWhere<T>(collection: string, predicate: (item: T) => boolean): T[] {
    return this.getCollection<T>(collection).filter(predicate);
  }

  count(collection: string): number {
    return this.getCollection(collection).length;
  }

  reset(collection: string): void {
    localStorage.removeItem(DB_PREFIX + collection);
  }

  resetAll(): void {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(DB_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
}

export const db = new DatabaseEngine();

// ============ COLLECTION NAMES ============
export const COLLECTIONS = {
  USERS: 'users',
  LEADS: 'leads',
  BOOKINGS: 'bookings',
  VENDORS: 'vendors',
  ASSIGNMENTS: 'assignments',
  INVOICES: 'invoices',
  SUPPLIER_EXPENSES: 'supplier_expenses',
};

// ============ SEED DATA — NEPAL BASED ============
export function seedDatabase(): void {
  // Check if already seeded
  if (db.count(COLLECTIONS.USERS) > 0) return;

  const now = new Date().toISOString();

  // Users
  const users: DBUser[] = [
    { id: 'u1', firstName: 'Rajesh', lastName: 'Shrestha', email: 'rajesh@travelops.np', role: 'admin', phone: '+977-9841234567', isActive: true, createdAt: now },
    { id: 'u2', firstName: 'Sita', lastName: 'Gurung', email: 'sita@travelops.np', role: 'sales_agent', phone: '+977-9851234567', isActive: true, createdAt: now },
    { id: 'u3', firstName: 'Bikash', lastName: 'Tamang', email: 'bikash@travelops.np', role: 'operations_manager', phone: '+977-9861234567', isActive: true, createdAt: now },
    { id: 'u4', firstName: 'Anita', lastName: 'Rai', email: 'anita@travelops.np', role: 'accountant', phone: '+977-9871234567', isActive: true, createdAt: now },
  ];
  db.setCollection(COLLECTIONS.USERS, users);

  // Leads
  const leads: DBLead[] = [
    {
      id: 'l1', leadNumber: 'LD-2026-0001', clientName: 'Hari Bahadur Thapa', clientEmail: 'hari.thapa@gmail.com',
      clientPhone: '+977-9841111222', clientWhatsapp: '+977-9841111222', clientCountry: 'Nepal',
      paxAdults: 4, paxChildren: 2, travelDateFrom: '2026-04-10', travelDateTo: '2026-04-17',
      budgetMin: 85000, budgetMax: 120000, currency: 'NPR', leadSource: 'website', status: 'quoting',
      assignedAgentId: 'u2', assignedAgentName: 'Sita Gurung', priority: 'high',
      notes: 'Family trip to Annapurna Base Camp trek. Need experienced guide.',
      createdAt: '2026-03-01T10:30:00Z', updatedAt: '2026-03-05T14:20:00Z'
    },
    {
      id: 'l2', leadNumber: 'LD-2026-0002', clientName: 'Priya Maharjan', clientEmail: 'priya.m@yahoo.com',
      clientPhone: '+977-9852222333', clientWhatsapp: '+977-9852222333', clientCountry: 'Nepal',
      paxAdults: 2, paxChildren: 0, travelDateFrom: '2026-05-01', travelDateTo: '2026-05-05',
      budgetMin: 45000, budgetMax: 65000, currency: 'NPR', leadSource: 'referral', status: 'negotiation',
      assignedAgentId: 'u2', assignedAgentName: 'Sita Gurung', priority: 'urgent',
      notes: 'Honeymoon package - Pokhara and Mustang. Luxury hotels preferred.',
      createdAt: '2026-02-28T09:15:00Z', updatedAt: '2026-03-06T11:00:00Z'
    },
    {
      id: 'l3', leadNumber: 'LD-2026-0003', clientName: 'Sunil Karki', clientEmail: 'sunil.karki@corp.com.np',
      clientPhone: '+977-9863333444', clientWhatsapp: '+977-9863333444', clientCountry: 'Nepal',
      paxAdults: 15, paxChildren: 0, travelDateFrom: '2026-06-15', travelDateTo: '2026-06-18',
      budgetMin: 250000, budgetMax: 350000, currency: 'NPR', leadSource: 'direct', status: 'won',
      assignedAgentId: 'u2', assignedAgentName: 'Sita Gurung', priority: 'high',
      notes: 'Corporate retreat for IT company. Team building activities needed.',
      createdAt: '2026-03-02T16:45:00Z', updatedAt: '2026-03-04T09:30:00Z'
    },
    {
      id: 'l4', leadNumber: 'LD-2026-0004', clientName: 'Kamala Devi', clientEmail: 'kamala.devi@gmail.com',
      clientPhone: '+977-9874444555', clientWhatsapp: '+977-9874444555', clientCountry: 'Nepal',
      paxAdults: 30, paxChildren: 5, travelDateFrom: '2026-07-20', travelDateTo: '2026-07-23',
      budgetMin: 180000, budgetMax: 250000, currency: 'NPR', leadSource: 'referral', status: 'won',
      assignedAgentId: 'u2', assignedAgentName: 'Sita Gurung', priority: 'medium',
      notes: 'School educational trip to Chitwan National Park. Need bus and guide.',
      createdAt: '2026-02-15T08:00:00Z', updatedAt: '2026-03-01T16:00:00Z'
    },
    {
      id: 'l5', leadNumber: 'LD-2026-0005', clientName: 'Ramesh Adhikari', clientEmail: 'ramesh@business.com.np',
      clientPhone: '+977-9885555666', clientWhatsapp: '+977-9885555666', clientCountry: 'Nepal',
      paxAdults: 8, paxChildren: 3, travelDateFrom: '2026-08-01', travelDateTo: '2026-08-10',
      budgetMin: 320000, budgetMax: 450000, currency: 'NPR', leadSource: 'social_media', status: 'contacted',
      assignedAgentId: 'u2', assignedAgentName: 'Sita Gurung', priority: 'urgent',
      notes: 'VIP family trip - Everest region helicopter tour + Lukla trek.',
      createdAt: '2026-03-05T12:00:00Z', updatedAt: '2026-03-05T15:30:00Z'
    },
    {
      id: 'l6', leadNumber: 'LD-2026-0006', clientName: 'Sabin Lama', clientEmail: 'sabin.lama@gmail.com',
      clientPhone: '+977-9896666777', clientWhatsapp: '+977-9896666777', clientCountry: 'Nepal',
      paxAdults: 2, paxChildren: 0, travelDateFrom: '2026-09-15', travelDateTo: '2026-09-20',
      budgetMin: 55000, budgetMax: 75000, currency: 'NPR', leadSource: 'website', status: 'new',
      assignedAgentId: 'u2', assignedAgentName: 'Sita Gurung', priority: 'medium',
      notes: 'Couple trip to Rara Lake. Photography focused.',
      createdAt: '2026-03-06T07:20:00Z', updatedAt: '2026-03-06T07:20:00Z'
    },
    {
      id: 'l7', leadNumber: 'LD-2026-0007', clientName: 'Deepak Pandey', clientEmail: 'deepak.p@gmail.com',
      clientPhone: '+977-9807777888', clientWhatsapp: '+977-9807777888', clientCountry: 'Nepal',
      paxAdults: 5, paxChildren: 2, travelDateFrom: '2026-04-20', travelDateTo: '2026-04-25',
      budgetMin: 95000, budgetMax: 130000, currency: 'NPR', leadSource: 'walk_in', status: 'lost',
      assignedAgentId: 'u2', assignedAgentName: 'Sita Gurung', priority: 'low',
      notes: 'Budget constraints - went with competitor offering lower price.',
      createdAt: '2026-01-20T14:00:00Z', updatedAt: '2026-02-28T10:00:00Z'
    },
    {
      id: 'l8', leadNumber: 'LD-2026-0008', clientName: 'Nepal Education Board', clientEmail: 'info@neb.edu.np',
      clientPhone: '+977-01-4234567', clientWhatsapp: '+977-9818888999', clientCountry: 'Nepal',
      paxAdults: 45, paxChildren: 0, travelDateFrom: '2026-10-05', travelDateTo: '2026-10-08',
      budgetMin: 380000, budgetMax: 500000, currency: 'NPR', leadSource: 'direct', status: 'requirements_gathered',
      assignedAgentId: 'u2', assignedAgentName: 'Sita Gurung', priority: 'high',
      notes: 'Government educational tour. Multiple buses, guides, and accommodation needed.',
      createdAt: '2026-03-08T09:00:00Z', updatedAt: '2026-03-09T11:00:00Z'
    },
  ];
  db.setCollection(COLLECTIONS.LEADS, leads);

  // Bookings
  const bookings: DBBooking[] = [
    { id: 'b1', bookingNumber: 'BK-2026-0001', leadId: 'l3', clientName: 'Sunil Karki', destination: 'Pokhara Corporate Retreat', startDate: '2026-06-15', endDate: '2026-06-18', paxAdults: 15, paxChildren: 0, totalAmount: 285000, currency: 'NPR', status: 'confirmed', category: 'corporate_retreat', specialRequests: 'Conference hall, team building activities, bonfire night', createdAt: '2026-03-05T10:00:00Z' },
    { id: 'b2', bookingNumber: 'BK-2026-0002', leadId: 'l4', clientName: 'Kamala Devi (School)', destination: 'Chitwan National Park', startDate: '2026-07-20', endDate: '2026-07-23', paxAdults: 30, paxChildren: 5, totalAmount: 215000, currency: 'NPR', status: 'confirmed', category: 'school_college', specialRequests: 'Educational guide, jungle safari, bird watching', createdAt: '2026-03-02T14:00:00Z' },
    { id: 'b3', bookingNumber: 'BK-2026-0003', leadId: 'l2', clientName: 'Priya Maharjan', destination: 'Pokhara & Upper Mustang', startDate: '2026-05-01', endDate: '2026-05-05', paxAdults: 2, paxChildren: 0, totalAmount: 58000, currency: 'NPR', status: 'in_progress', category: 'vacation_family', specialRequests: 'Honeymoon special, lakeside hotel, mountain view room', createdAt: '2026-03-07T09:00:00Z' },
    { id: 'b4', bookingNumber: 'BK-2026-0004', leadId: 'l5', clientName: 'Ramesh Adhikari', destination: 'Everest Helicopter Tour', startDate: '2026-08-01', endDate: '2026-08-03', paxAdults: 8, paxChildren: 3, totalAmount: 425000, currency: 'NPR', status: 'confirmed', category: 'vacation_family', specialRequests: 'VIP helicopter, luxury lodge, sherpa guide', createdAt: '2026-03-06T16:00:00Z' },
    { id: 'b5', bookingNumber: 'BK-2026-0005', leadId: 'l8', clientName: 'Nepal Education Board', destination: 'Lumbini & Janakpur Tour', startDate: '2026-10-05', endDate: '2026-10-08', paxAdults: 45, paxChildren: 0, totalAmount: 450000, currency: 'NPR', status: 'confirmed', category: 'school_college', specialRequests: '3 buses, educational guides, hotel blocks', createdAt: '2026-03-10T08:00:00Z' },
    { id: 'b6', bookingNumber: 'BK-2026-0006', leadId: 'l1', clientName: 'Hari Bahadur Thapa', destination: 'Annapurna Base Camp', startDate: '2026-04-10', endDate: '2026-04-17', paxAdults: 4, paxChildren: 2, totalAmount: 108000, currency: 'NPR', status: 'in_progress', category: 'vacation_family', specialRequests: 'Experienced guide, teahouse accommodation, permits', createdAt: '2026-03-08T11:00:00Z' },
    { id: 'b7', bookingNumber: 'BK-2026-0007', leadId: 'l6', clientName: 'Sabin Lama', destination: 'Rara Lake Trek', startDate: '2026-09-15', endDate: '2026-09-20', paxAdults: 2, paxChildren: 0, totalAmount: 68000, currency: 'NPR', status: 'confirmed', category: 'vacation_family', specialRequests: 'Camping equipment, guide, photography spots', createdAt: '2026-03-09T14:00:00Z' },
    { id: 'b8', bookingNumber: 'BK-2026-0008', leadId: 'l3', clientName: 'TechCorp Nepal', destination: 'Nagarkot Team Building', startDate: '2026-05-20', endDate: '2026-05-22', paxAdults: 25, paxChildren: 0, totalAmount: 175000, currency: 'NPR', status: 'completed', category: 'corporate_retreat', specialRequests: 'Resort booking, outdoor activities, projector setup', createdAt: '2026-02-20T09:00:00Z' },
  ];
  db.setCollection(COLLECTIONS.BOOKINGS, bookings);

  // Vendors
  const vendors: DBVendor[] = [
    { id: 'v1', name: 'Himalayan Safari Wheels', type: 'Vehicle', contactPerson: 'Dipak Rai', email: 'info@himalayanwheels.com.np', phone: '+977-01-4567890', location: 'Kathmandu, Nepal', rating: 5, vehicleNumber: 'Ba 2 Ka 1234', vehicleType: 'Scorpio', createdAt: now },
    { id: 'v2', name: 'Everest Transport Pvt Ltd', type: 'Vehicle', contactPerson: 'Ram Thapa', email: 'booking@everesttransport.np', phone: '+977-01-5678901', location: 'Kathmandu, Nepal', rating: 4, vehicleNumber: 'Ba 3 Kha 5678', vehicleType: 'Hiace', createdAt: now },
    { id: 'v3', name: 'Pokhara Tourism Bus Service', type: 'Vehicle', contactPerson: 'Krishna Gurung', email: 'pokharabus@gmail.com', phone: '+977-61-456789', location: 'Pokhara, Nepal', rating: 4, vehicleNumber: 'Ga 1 Ka 9012', vehicleType: 'Tourist', createdAt: now },
    { id: 'v4', name: 'Mountain Guide Association Nepal', type: 'Guide', contactPerson: 'Tenzing Sherpa', email: 'info@mganepal.org.np', phone: '+977-01-6789012', location: 'Kathmandu, Nepal', rating: 5, createdAt: now },
    { id: 'v5', name: 'Annapurna Trekking Guides', type: 'Guide', contactPerson: 'Pemba Sherpa', email: 'pemba@annaguides.com.np', phone: '+977-9841234500', location: 'Pokhara, Nepal', rating: 5, createdAt: now },
    { id: 'v6', name: 'Hotel Yak & Yeti', type: 'Hotel', contactPerson: 'Suman Shakya', email: 'reservations@yakyeti.com.np', phone: '+977-01-4234567', location: 'Kathmandu, Nepal', rating: 5, createdAt: now },
    { id: 'v7', name: 'Pokhara Lakeside Resort', type: 'Hotel', contactPerson: 'Mina Gurung', email: 'info@pokharalakeside.np', phone: '+977-61-567890', location: 'Pokhara, Nepal', rating: 4, createdAt: now },
    { id: 'v8', name: 'Chitwan Jungle Resort', type: 'Hotel', contactPerson: 'Bishnu Chaudhary', email: 'book@chitwanresort.com.np', phone: '+977-56-456789', location: 'Chitwan, Nepal', rating: 4, createdAt: now },
    { id: 'v9', name: 'New Orleans Restaurant', type: 'Restaurant', contactPerson: 'Chef Sanjay', email: 'info@neworleans.com.np', phone: '+977-01-7890123', location: 'Kathmandu, Nepal', rating: 4, createdAt: now },
    { id: 'v10', name: 'Fishtail Restaurant Pokhara', type: 'Restaurant', contactPerson: 'Rita Shrestha', email: 'fishtail@pokhara.np', phone: '+977-61-678901', location: 'Pokhara, Nepal', rating: 5, createdAt: now },
    { id: 'v11', name: 'Nepal Adventure Sports', type: 'Activity', contactPerson: 'Babu Kazhi', email: 'info@nepaladventure.com.np', phone: '+977-01-8901234', location: 'Kathmandu, Nepal', rating: 4, createdAt: now },
    { id: 'v12', name: 'Paragliding Pokhara', type: 'Activity', contactPerson: 'Santosh Bhandari', email: 'paragliding@pokhara.np', phone: '+977-61-789012', location: 'Pokhara, Nepal', rating: 5, createdAt: now },
    { id: 'v13', name: 'Nepal Tourism Board Permits', type: 'Permit', contactPerson: 'Permit Office', email: 'permits@ntb.gov.np', phone: '+977-01-4234500', location: 'Kathmandu, Nepal', rating: 3, createdAt: now },
    { id: 'v14', name: 'Nepal Travel Insurance Co.', type: 'Others', contactPerson: 'Claims Department', email: 'claims@nepalinsurance.com.np', phone: '+977-01-9012345', location: 'Kathmandu, Nepal', rating: 4, createdAt: now },
    { id: 'v15', name: 'Lukla Flight Services', type: 'Vehicle', contactPerson: 'Capt. Ramesh', email: 'flights@luklaservice.com.np', phone: '+977-01-3456789', location: 'Kathmandu, Nepal', rating: 4, vehicleNumber: '9N-AMB', vehicleType: 'Super', createdAt: now },
    { id: 'v16', name: 'Sajha Yatayat', type: 'Vehicle', contactPerson: 'Manager Office', email: 'info@sajhayatayat.com.np', phone: '+977-01-5551234', location: 'Kathmandu, Nepal', rating: 3, vehicleNumber: 'Ba 1 Kha 3456', vehicleType: '712 Bus', createdAt: now },
  ];
  db.setCollection(COLLECTIONS.VENDORS, vendors);

  // Assignments
  const assignments: DBAssignment[] = [
    {
      id: 'a1', assignmentNumber: 'ASN-2026-0001', bookingId: 'b1', bookingNumber: 'BK-2026-0001', clientName: 'Sunil Karki',
      items: [
        { id: 'ai1', type: 'vehicle', supplierName: 'Pokhara Tourism Bus Service', serviceDate: '2026-06-15', amount: 45000, notes: 'Tourist bus for 15 pax, 3 days', vehicleNumber: 'Ga 1 Ka 9012', vehicleType: 'Tourist' },
        { id: 'ai2', type: 'hotel', supplierName: 'Pokhara Lakeside Resort', serviceDate: '2026-06-15', amount: 90000, notes: '15 rooms, 3 nights, conference hall' },
        { id: 'ai3', type: 'guide', supplierName: 'Mountain Guide Association Nepal', serviceDate: '2026-06-15', amount: 25000, notes: '2 guides for team building' },
        { id: 'ai4', type: 'restaurant', supplierName: 'Fishtail Restaurant Pokhara', serviceDate: '2026-06-16', amount: 35000, notes: '3 meals for 15 pax, 3 days' },
        { id: 'ai5', type: 'activity', supplierName: 'Nepal Adventure Sports', serviceDate: '2026-06-16', amount: 40000, notes: 'Zip-line, rafting, team games' },
      ],
      totalAmount: 235000, status: 'confirmed', createdAt: '2026-03-06T10:00:00Z'
    },
    {
      id: 'a2', assignmentNumber: 'ASN-2026-0002', bookingId: 'b2', bookingNumber: 'BK-2026-0002', clientName: 'Kamala Devi (School)',
      items: [
        { id: 'ai6', type: 'vehicle', supplierName: 'Sajha Yatayat', serviceDate: '2026-07-20', amount: 55000, notes: '2 buses for 35 pax', vehicleNumber: 'Ba 1 Kha 3456', vehicleType: '712 Bus' },
        { id: 'ai7', type: 'hotel', supplierName: 'Chitwan Jungle Resort', serviceDate: '2026-07-20', amount: 85000, notes: '35 rooms, 3 nights' },
        { id: 'ai8', type: 'guide', supplierName: 'Annapurna Trekking Guides', serviceDate: '2026-07-20', amount: 18000, notes: 'Educational jungle guide' },
        { id: 'ai9', type: 'activity', supplierName: 'Nepal Adventure Sports', serviceDate: '2026-07-21', amount: 32000, notes: 'Jungle safari, canoe ride, bird watching' },
        { id: 'ai10', type: 'permit', supplierName: 'Nepal Tourism Board Permits', serviceDate: '2026-07-20', amount: 15000, notes: 'National park entry permits for 35' },
      ],
      totalAmount: 205000, status: 'pending', createdAt: '2026-03-03T14:00:00Z'
    },
    {
      id: 'a3', assignmentNumber: 'ASN-2026-0003', bookingId: 'b3', bookingNumber: 'BK-2026-0003', clientName: 'Priya Maharjan',
      items: [
        { id: 'ai11', type: 'vehicle', supplierName: 'Himalayan Safari Wheels', serviceDate: '2026-05-01', amount: 18000, notes: 'Scorpio for 2 pax, 5 days', vehicleNumber: 'Ba 2 Ka 1234', vehicleType: 'Scorpio' },
        { id: 'ai12', type: 'hotel', supplierName: 'Pokhara Lakeside Resort', serviceDate: '2026-05-01', amount: 24000, notes: 'Honeymoon suite, 4 nights' },
        { id: 'ai13', type: 'activity', supplierName: 'Paragliding Pokhara', serviceDate: '2026-05-02', amount: 8000, notes: 'Tandem paragliding for 2' },
        { id: 'ai14', type: 'restaurant', supplierName: 'Fishtail Restaurant Pokhara', serviceDate: '2026-05-01', amount: 6000, notes: 'Romantic dinner for 2' },
      ],
      totalAmount: 56000, status: 'confirmed', createdAt: '2026-03-08T09:00:00Z'
    },
    {
      id: 'a4', assignmentNumber: 'ASN-2026-0004', bookingId: 'b4', bookingNumber: 'BK-2026-0004', clientName: 'Ramesh Adhikari',
      items: [
        { id: 'ai15', type: 'vehicle', supplierName: 'Lukla Flight Services', serviceDate: '2026-08-01', amount: 220000, notes: 'Helicopter tour for 11 pax', vehicleNumber: '9N-AMB', vehicleType: 'Super' },
        { id: 'ai16', type: 'hotel', supplierName: 'Hotel Yak & Yeti', serviceDate: '2026-08-01', amount: 85000, notes: 'Luxury rooms for 11, 2 nights' },
        { id: 'ai17', type: 'guide', supplierName: 'Mountain Guide Association Nepal', serviceDate: '2026-08-01', amount: 45000, notes: 'VIP sherpa guide' },
        { id: 'ai18', type: 'permit', supplierName: 'Nepal Tourism Board Permits', serviceDate: '2026-08-01', amount: 35000, notes: 'Everest region permits for 11' },
      ],
      totalAmount: 385000, status: 'in_progress', createdAt: '2026-03-07T16:00:00Z'
    },
  ];
  db.setCollection(COLLECTIONS.ASSIGNMENTS, assignments);

  // Invoices
  const invoices: DBInvoice[] = [
    {
      id: 'inv1', invoiceNumber: 'INV-2026-0001', bookingId: 'b1', bookingNumber: 'BK-2026-0001', clientName: 'Sunil Karki',
      subtotal: 285000, taxPercent: 13, taxAmount: 37050, discountAmount: 0, totalAmount: 322050, currency: 'NPR',
      status: 'partial', invoiceDate: '2026-03-06', dueDate: '2026-04-05',
      payments: [
        { id: 'p1', paymentReference: 'PAY-2026-0001', paymentDate: '2026-03-06', amount: 150000, paymentMethod: 'bank_transfer', referenceNumber: 'Nepal Bank TRF-001', notes: '50% advance deposit' },
      ],
      createdAt: '2026-03-06T10:00:00Z'
    },
    {
      id: 'inv2', invoiceNumber: 'INV-2026-0002', bookingId: 'b2', bookingNumber: 'BK-2026-0002', clientName: 'Kamala Devi (School)',
      subtotal: 215000, taxPercent: 0, taxAmount: 0, discountAmount: 10000, totalAmount: 205000, currency: 'NPR',
      status: 'paid', invoiceDate: '2026-03-03', dueDate: '2026-04-02',
      payments: [
        { id: 'p2', paymentReference: 'PAY-2026-0002', paymentDate: '2026-03-03', amount: 100000, paymentMethod: 'bank_transfer', referenceNumber: 'Nepal Bank TRF-002', notes: '50% advance' },
        { id: 'p3', paymentReference: 'PAY-2026-0003', paymentDate: '2026-04-01', amount: 105000, paymentMethod: 'bank_transfer', referenceNumber: 'Nepal Bank TRF-003', notes: 'Final balance' },
      ],
      createdAt: '2026-03-03T14:00:00Z'
    },
    {
      id: 'inv3', invoiceNumber: 'INV-2026-0003', bookingId: 'b3', bookingNumber: 'BK-2026-0003', clientName: 'Priya Maharjan',
      subtotal: 58000, taxPercent: 13, taxAmount: 7540, discountAmount: 0, totalAmount: 65540, currency: 'NPR',
      status: 'sent', invoiceDate: '2026-03-08', dueDate: '2026-04-07',
      payments: [],
      createdAt: '2026-03-08T09:00:00Z'
    },
    {
      id: 'inv4', invoiceNumber: 'INV-2026-0004', bookingId: 'b4', bookingNumber: 'BK-2026-0004', clientName: 'Ramesh Adhikari',
      subtotal: 425000, taxPercent: 13, taxAmount: 55250, discountAmount: 25000, totalAmount: 455250, currency: 'NPR',
      status: 'partial', invoiceDate: '2026-03-07', dueDate: '2026-04-06',
      payments: [
        { id: 'p4', paymentReference: 'PAY-2026-0004', paymentDate: '2026-03-07', amount: 225000, paymentMethod: 'bank_transfer', referenceNumber: 'Global IME TRF-004', notes: '50% advance' },
      ],
      createdAt: '2026-03-07T16:00:00Z'
    },
    {
      id: 'inv5', invoiceNumber: 'INV-2026-0005', bookingId: 'b8', bookingNumber: 'BK-2026-0008', clientName: 'TechCorp Nepal',
      subtotal: 175000, taxPercent: 13, taxAmount: 22750, discountAmount: 0, totalAmount: 197750, currency: 'NPR',
      status: 'paid', invoiceDate: '2026-02-21', dueDate: '2026-03-23',
      payments: [
        { id: 'p5', paymentReference: 'PAY-2026-0005', paymentDate: '2026-02-21', amount: 197750, paymentMethod: 'bank_transfer', referenceNumber: 'Nabil Bank TRF-005', notes: 'Full payment' },
      ],
      createdAt: '2026-02-21T09:00:00Z'
    },
  ];
  db.setCollection(COLLECTIONS.INVOICES, invoices);

  // Supplier Expenses
  const expenses: DBSupplierExpense[] = [
    { id: 'e1', assignmentId: 'a1', vendorId: 'v3', vendorName: 'Pokhara Tourism Bus Service', category: 'vehicle', quotedAmount: 45000, actualAmount: 45000, paymentStatus: 'paid', createdAt: now },
    { id: 'e2', assignmentId: 'a1', vendorId: 'v7', vendorName: 'Pokhara Lakeside Resort', category: 'hotel', quotedAmount: 90000, actualAmount: 90000, paymentStatus: 'paid', createdAt: now },
    { id: 'e3', assignmentId: 'a1', vendorId: 'v4', vendorName: 'Mountain Guide Association Nepal', category: 'guide', quotedAmount: 25000, actualAmount: 25000, paymentStatus: 'partial', createdAt: now },
    { id: 'e4', assignmentId: 'a2', vendorId: 'v16', vendorName: 'Sajha Yatayat', category: 'vehicle', quotedAmount: 55000, actualAmount: 55000, paymentStatus: 'unpaid', createdAt: now },
    { id: 'e5', assignmentId: 'a2', vendorId: 'v8', vendorName: 'Chitwan Jungle Resort', category: 'hotel', quotedAmount: 85000, actualAmount: 85000, paymentStatus: 'unpaid', createdAt: now },
    { id: 'e6', assignmentId: 'a3', vendorId: 'v1', vendorName: 'Himalayan Safari Wheels', category: 'vehicle', quotedAmount: 18000, actualAmount: 18000, paymentStatus: 'paid', createdAt: now },
    { id: 'e7', assignmentId: 'a3', vendorId: 'v7', vendorName: 'Pokhara Lakeside Resort', category: 'hotel', quotedAmount: 24000, actualAmount: 24000, paymentStatus: 'paid', createdAt: now },
    { id: 'e8', assignmentId: 'a4', vendorId: 'v15', vendorName: 'Lukla Flight Services', category: 'vehicle', quotedAmount: 220000, actualAmount: 220000, paymentStatus: 'partial', createdAt: now },
  ];
  db.setCollection(COLLECTIONS.SUPPLIER_EXPENSES, expenses);

  console.log('✅ Database seeded with Nepal-based dummy data');
}

// ============ INITIALIZE ============
seedDatabase();
