export type UserRole = 'admin' | 'sales_agent' | 'operations_manager' | 'accountant';

export type LeadStatus = 'new' | 'contacted' | 'requirements_gathered' | 'quoting' | 'negotiation' | 'won' | 'lost';
export type LeadSource = 'direct' | 'social_media' | 'referral' | 'website' | 'walk_in' | 'phone' | 'other';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Lead {
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
  leadSource: LeadSource;
  status: LeadStatus;
  assignedAgentId: string;
  assignedAgentName: string;
  priority: Priority;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  userId: string;
  userName: string;
  activityType: string;
  subject: string;
  description: string;
  createdAt: string;
}

export interface ItineraryDay {
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

export interface QuotationItem {
  id: string;
  category: string;
  description: string;
  quantity: number;
  unitPrice: number;
  unit: string;
  paxCount: number;
  daysCount: number;
  lineTotal: number;
  supplierId: string;
  notes: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  leadId: string;
  title: string;
  validUntil: string;
  currency: string;
  subtotal: number;
  contingencyPercent: number;
  contingencyAmount: number;
  profitPercent: number;
  profitAmount: number;
  totalAmount: number;
  inclusions: string;
  exclusions: string;
  termsConditions: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  items: QuotationItem[];
  createdAt: string;
}

export interface Supplier {
  id: string;
  supplierCode: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
  supplierType: 'hotel' | 'transport' | 'guide' | 'activity_vendor' | 'restaurant' | 'airline' | 'insurance' | 'other';
  rating: number;
  paymentTerms: string;
  isActive: boolean;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  leadId: string;
  clientName: string;
  bookingDate: string;
  travelDateFrom: string;
  travelDateTo: string;
  paxAdults: number;
  paxChildren: number;
  totalAmount: number;
  currency: string;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  specialRequests: string;
}

export interface Voucher {
  id: string;
  voucherNumber: string;
  bookingId: string;
  bookingNumber: string;
  supplierId: string;
  supplierName: string;
  voucherType: 'hotel_confirmation' | 'vehicle_duty' | 'guide_assignment' | 'activity_confirmation' | 'general';
  issueDate: string;
  serviceDateFrom: string;
  serviceDateTo: string;
  guestNames: string;
  paxCount: number;
  status: 'issued' | 'confirmed' | 'cancelled' | 'completed';
  details: Record<string, any>;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  bookingNumber: string;
  clientName: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  payments: Payment[];
}

export interface Payment {
  id: string;
  paymentReference: string;
  invoiceId: string;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  referenceNumber: string;
  notes: string;
}

export interface DashboardStats {
  totalLeads: number;
  activeLeads: number;
  wonLeads: number;
  totalBookings: number;
  activeBookings: number;
  totalRevenue: number;
  pendingPayments: number;
  totalSuppliers: number;
  leadsByStatus: { status: string; count: number }[];
  recentLeads: Lead[];
  recentBookings: Booking[];
  monthlyRevenue: { month: string; revenue: number }[];
}
