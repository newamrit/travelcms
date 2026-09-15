import { Lead, Supplier, Booking, Quotation, Voucher, Invoice, User, LeadActivity } from '../types';

export const mockUsers: User[] = [
  { id: '1', firstName: 'System', lastName: 'Admin', email: 'admin@travelops.pro', role: 'admin' },
  { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@travelops.pro', role: 'sales_agent' },
  { id: '3', firstName: 'Michael', lastName: 'Chen', email: 'michael@travelops.pro', role: 'operations_manager' },
  { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily@travelops.pro', role: 'accountant' },
];

export const mockLeads: Lead[] = [
  {
    id: '1', leadNumber: 'LD-2024-0001', clientName: 'James Wilson', clientEmail: 'james.wilson@email.com',
    clientPhone: '+44 7911 123456', clientWhatsapp: '+44 7911 123456', clientCountry: 'United Kingdom',
    paxAdults: 2, paxChildren: 1, travelDateFrom: '2024-06-15', travelDateTo: '2024-06-25',
    budgetMin: 5000, budgetMax: 8000, currency: 'NPR', leadSource: 'website', status: 'quoting',
    assignedAgentId: '2', assignedAgentName: 'Sarah Johnson', priority: 'high', notes: 'Interested in Serengeti safari + Zanzibar beach combo',
    createdAt: '2024-03-01T10:30:00Z', updatedAt: '2024-03-05T14:20:00Z'
  },
  {
    id: '2', leadNumber: 'LD-2024-0002', clientName: 'Maria Garcia', clientEmail: 'maria.g@email.com',
    clientPhone: '+34 612 345 678', clientWhatsapp: '+34 612 345 678', clientCountry: 'Spain',
    paxAdults: 4, paxChildren: 0, travelDateFrom: '2024-07-01', travelDateTo: '2024-07-10',
    budgetMin: 12000, budgetMax: 18000, currency: 'NPR', leadSource: 'referral', status: 'negotiation',
    assignedAgentId: '2', assignedAgentName: 'Sarah Johnson', priority: 'urgent', notes: 'Luxury safari - premium lodges only. Anniversary trip.',
    createdAt: '2024-02-28T09:15:00Z', updatedAt: '2024-03-06T11:00:00Z'
  },
  {
    id: '3', leadNumber: 'LD-2024-0003', clientName: 'Robert Chen', clientEmail: 'r.chen@corp.com',
    clientPhone: '+1 555 987 6543', clientWhatsapp: '+1 555 987 6543', clientCountry: 'United States',
    paxAdults: 6, paxChildren: 2, travelDateFrom: '2024-08-10', travelDateTo: '2024-08-20',
    budgetMin: 20000, budgetMax: 35000, currency: 'NPR', leadSource: 'social_media', status: 'requirements_gathered',
    assignedAgentId: '2', assignedAgentName: 'Sarah Johnson', priority: 'high', notes: 'Family group trip. Need kid-friendly activities. Photography focus.',
    createdAt: '2024-03-02T16:45:00Z', updatedAt: '2024-03-04T09:30:00Z'
  },
  {
    id: '4', leadNumber: 'LD-2024-0004', clientName: 'Emma Thompson', clientEmail: 'emma.t@email.co.uk',
    clientPhone: '+44 7700 900123', clientWhatsapp: '+44 7700 900123', clientCountry: 'United Kingdom',
    paxAdults: 2, paxChildren: 0, travelDateFrom: '2024-05-20', travelDateTo: '2024-05-28',
    budgetMin: 4000, budgetMax: 6000, currency: 'NPR', leadSource: 'direct', status: 'won',
    assignedAgentId: '2', assignedAgentName: 'Sarah Johnson', priority: 'medium', notes: 'Honeymoon package - Ngorongoro + Serengeti',
    createdAt: '2024-02-15T08:00:00Z', updatedAt: '2024-03-01T16:00:00Z'
  },
  {
    id: '5', leadNumber: 'LD-2024-0005', clientName: 'Ahmed Al-Rashid', clientEmail: 'ahmed@business.ae',
    clientPhone: '+971 50 123 4567', clientWhatsapp: '+971 50 123 4567', clientCountry: 'UAE',
    paxAdults: 8, paxChildren: 3, travelDateFrom: '2024-09-01', travelDateTo: '2024-09-14',
    budgetMin: 40000, budgetMax: 60000, currency: 'NPR', leadSource: 'referral', status: 'contacted',
    assignedAgentId: '2', assignedAgentName: 'Sarah Johnson', priority: 'urgent', notes: 'VIP group - Royal standard. Private vehicle, chef, security detail.',
    createdAt: '2024-03-05T12:00:00Z', updatedAt: '2024-03-05T15:30:00Z'
  },
  {
    id: '6', leadNumber: 'LD-2024-0006', clientName: 'Lisa Park', clientEmail: 'lisa.park@email.com',
    clientPhone: '+82 10 1234 5678', clientWhatsapp: '+82 10 1234 5678', clientCountry: 'South Korea',
    paxAdults: 2, paxChildren: 0, travelDateFrom: '2024-10-05', travelDateTo: '2024-10-12',
    budgetMin: 3000, budgetMax: 5000, currency: 'USD', leadSource: 'website', status: 'new',
    assignedAgentId: '2', assignedAgentName: 'Sarah Johnson', priority: 'medium', notes: 'First time in Africa. Interested in wildlife photography.',
    createdAt: '2024-03-06T07:20:00Z', updatedAt: '2024-03-06T07:20:00Z'
  },
  {
    id: '7', leadNumber: 'LD-2024-0007', clientName: 'David Mueller', clientEmail: 'd.mueller@email.de',
    clientPhone: '+49 170 1234567', clientWhatsapp: '+49 170 1234567', clientCountry: 'Germany',
    paxAdults: 3, paxChildren: 1, travelDateFrom: '2024-04-15', travelDateTo: '2024-04-22',
    budgetMin: 6000, budgetMax: 9000, currency: 'USD', leadSource: 'social_media', status: 'lost',
    assignedAgentId: '2', assignedAgentName: 'Sarah Johnson', priority: 'low', notes: 'Budget constraints - went with competitor',
    createdAt: '2024-01-20T14:00:00Z', updatedAt: '2024-02-28T10:00:00Z'
  },
];

export const mockActivities: LeadActivity[] = [
  { id: '1', leadId: '1', userId: '2', userName: 'Sarah Johnson', activityType: 'note', subject: 'Initial Contact', description: 'Client reached out via website form. Interested in Tanzania safari.', createdAt: '2024-03-01T10:30:00Z' },
  { id: '2', leadId: '1', userId: '2', userName: 'Sarah Johnson', activityType: 'call', subject: 'Discovery Call', description: '30-min call. Confirmed dates, budget range, and preferences for mid-range lodges.', createdAt: '2024-03-02T14:00:00Z' },
  { id: '3', leadId: '1', userId: '2', userName: 'Sarah Johnson', activityType: 'status_change', subject: 'Status Updated', description: 'Moved from Contacted to Requirements Gathered', createdAt: '2024-03-03T09:00:00Z' },
  { id: '4', leadId: '1', userId: '2', userName: 'Sarah Johnson', activityType: 'quote_sent', subject: 'Quotation Sent', description: 'Sent 7-day Serengeti + Zanzibar package quotation ($6,500/pp)', createdAt: '2024-03-05T14:20:00Z' },
  { id: '5', leadId: '2', userId: '2', userName: 'Sarah Johnson', activityType: 'note', subject: 'Referral from existing client', description: 'Referred by Mr. & Mrs. Thompson (Booking BK-2024-0001). VIP treatment required.', createdAt: '2024-02-28T09:15:00Z' },
  { id: '6', leadId: '4', userId: '2', userName: 'Sarah Johnson', activityType: 'status_change', subject: 'Deal Won!', description: 'Client confirmed booking. Moving to operations.', createdAt: '2024-03-01T16:00:00Z' },
];

export const mockSuppliers: Supplier[] = [
  { id: '1', supplierCode: 'SUP-001', companyName: 'Serengeti Luxury Lodge', contactPerson: 'John Mwangi', email: 'bookings@serengetilodge.com', phone: '+255 712 345 678', whatsapp: '+255 712 345 678', address: 'Serengeti National Park', city: 'Arusha', country: 'Tanzania', supplierType: 'hotel', rating: 5, paymentTerms: '50% advance, 50% on check-in', isActive: true },
  { id: '2', supplierCode: 'SUP-002', companyName: 'Kilimanjaro Safaris Ltd', contactPerson: 'Peter Ochieng', email: 'info@kilisafaris.com', phone: '+255 754 321 987', whatsapp: '+255 754 321 987', address: 'Plot 45, Sokoine Road', city: 'Arusha', country: 'Tanzania', supplierType: 'transport', rating: 4, paymentTerms: 'Full payment 7 days before trip', isActive: true },
  { id: '3', supplierCode: 'SUP-003', companyName: 'Zanzibar Beach Resort', contactPerson: 'Amina Hassan', email: 'reservations@zanzibarbeach.com', phone: '+255 777 654 321', whatsapp: '+255 777 654 321', address: 'Nungwi Beach', city: 'Zanzibar', country: 'Tanzania', supplierType: 'hotel', rating: 4, paymentTerms: '30% deposit, balance on arrival', isActive: true },
  { id: '4', supplierCode: 'SUP-004', companyName: 'Top Guide Services', contactPerson: 'Samuel Kimaro', email: 'sam@guideservices.co.tz', phone: '+255 688 111 222', whatsapp: '+255 688 111 222', address: 'Arusha', city: 'Arusha', country: 'Tanzania', supplierType: 'guide', rating: 5, paymentTerms: 'Daily rate, paid per trip', isActive: true },
  { id: '5', supplierCode: 'SUP-005', companyName: 'Ngorongoro Crater Tours', contactPerson: 'Grace Mushi', email: 'info@ngorongorotours.com', phone: '+255 762 999 888', whatsapp: '+255 762 999 888', address: 'Ngorongoro Conservation Area', city: 'Ngorongoro', country: 'Tanzania', supplierType: 'activity_vendor', rating: 4, paymentTerms: 'Permit fees upfront, services on completion', isActive: true },
  { id: '6', supplierCode: 'SUP-006', companyName: 'Precision Air', contactPerson: 'Reservations Team', email: 'book@precisionairtz.com', phone: '+255 22 215 2300', whatsapp: '', address: 'Julius Nyerere Intl Airport', city: 'Dar es Salaam', country: 'Tanzania', supplierType: 'airline', rating: 3, paymentTerms: 'Full payment at booking', isActive: true },
];

export const mockBookings: Booking[] = [
  { id: '1', bookingNumber: 'BK-2024-0001', leadId: '4', clientName: 'Emma Thompson', bookingDate: '2024-03-01', travelDateFrom: '2024-05-20', travelDateTo: '2024-05-28', paxAdults: 2, paxChildren: 0, totalAmount: 9800, currency: 'USD', status: 'confirmed', specialRequests: 'Honeymoon arrangement, room decoration, champagne on arrival' },
  { id: '2', bookingNumber: 'BK-2024-0002', leadId: '1', clientName: 'James Wilson', bookingDate: '2024-03-08', travelDateFrom: '2024-06-15', travelDateTo: '2024-06-25', paxAdults: 2, paxChildren: 1, totalAmount: 15600, currency: 'USD', status: 'in_progress', specialRequests: 'Child-friendly activities, vegetarian meals' },
  { id: '3', bookingNumber: 'BK-2024-0003', leadId: '2', clientName: 'Maria Garcia', bookingDate: '2024-03-10', travelDateFrom: '2024-07-01', travelDateTo: '2024-07-10', paxAdults: 4, paxChildren: 0, totalAmount: 52000, currency: 'USD', status: 'confirmed', specialRequests: 'Anniversary celebration, premium wine, private guide' },
];

export const mockQuotations: Quotation[] = [
  {
    id: '1', quotationNumber: 'QT-2024-0001', leadId: '1', title: 'Tanzania Safari & Zanzibar Beach - 10 Days',
    validUntil: '2024-04-05', currency: 'USD', subtotal: 13000, contingencyPercent: 5, contingencyAmount: 650,
    profitPercent: 15, profitAmount: 2047.50, totalAmount: 15697.50,
    inclusions: 'All accommodation, meals as per itinerary, park fees, game drives, airport transfers, Zanzibar flights, professional guide',
    exclusions: 'International flights, visa fees, travel insurance, personal expenses, tips/gratuities, alcoholic beverages',
    termsConditions: '50% deposit required to confirm. Balance due 30 days before travel. Cancellation policy: 60+ days 10% fee, 30-59 days 30% fee, <30 days 50% fee.',
    status: 'sent', createdAt: '2024-03-05T14:20:00Z',
    items: [
      { id: '1', category: 'accommodation', description: 'Serengeti Luxury Lodge - Premium Tent', quantity: 3, unitPrice: 450, unit: 'per night', paxCount: 3, daysCount: 3, lineTotal: 4050, supplierId: '1', notes: 'Family tent, extra bed for child' },
      { id: '2', category: 'accommodation', description: 'Zanzibar Beach Resort - Ocean View Room', quantity: 4, unitPrice: 280, unit: 'per night', paxCount: 3, daysCount: 4, lineTotal: 3360, supplierId: '3', notes: '' },
      { id: '3', category: 'transportation', description: '4x4 Safari Land Cruiser with pop-up roof', quantity: 3, unitPrice: 350, unit: 'per day', paxCount: 1, daysCount: 3, lineTotal: 1050, supplierId: '2', notes: 'Includes fuel and driver allowance' },
      { id: '4', category: 'activities', description: 'Serengeti National Park Entry Fees', quantity: 3, unitPrice: 82, unit: 'per person/day', paxCount: 3, daysCount: 3, lineTotal: 738, supplierId: '5', notes: 'Adults $82, Children $25' },
      { id: '5', category: 'flights', description: 'Domestic flight: Arusha to Zanzibar', quantity: 3, unitPrice: 250, unit: 'per person', paxCount: 3, daysCount: 1, lineTotal: 750, supplierId: '6', notes: 'Including 20kg baggage' },
      { id: '6', category: 'guide_porter', description: 'Professional Safari Guide', quantity: 3, unitPrice: 150, unit: 'per day', paxCount: 1, daysCount: 3, lineTotal: 450, supplierId: '4', notes: 'English speaking, wildlife expert' },
    ]
  },
];

export const mockVouchers: Voucher[] = [
  { id: '1', voucherNumber: 'VH-2024-0001', bookingId: '1', bookingNumber: 'BK-2024-0001', supplierId: '1', supplierName: 'Serengeti Luxury Lodge', voucherType: 'hotel_confirmation', issueDate: '2024-03-02', serviceDateFrom: '2024-05-20', serviceDateTo: '2024-05-23', guestNames: 'Mr. & Mrs. Emma Thompson', paxCount: 2, status: 'confirmed', details: { roomType: 'Honeymoon Suite', mealPlan: 'Full Board', rooms: 1, specialRequests: 'Honeymoon decoration, champagne' } },
  { id: '2', voucherNumber: 'VH-2024-0002', bookingId: '1', bookingNumber: 'BK-2024-0001', supplierId: '2', supplierName: 'Kilimanjaro Safaris Ltd', voucherType: 'vehicle_duty', issueDate: '2024-03-02', serviceDateFrom: '2024-05-20', serviceDateTo: '2024-05-25', guestNames: 'Mr. & Mrs. Emma Thompson', paxCount: 2, status: 'confirmed', details: { vehicleType: 'Toyota Land Cruiser', driverName: 'Joseph Mwalimu', driverPhone: '+255 712 000 111', pickupLocation: 'Kilimanjaro Airport', pickupTime: '08:00' } },
  { id: '3', voucherNumber: 'VH-2024-0003', bookingId: '1', bookingNumber: 'BK-2024-0001', supplierId: '4', supplierName: 'Top Guide Services', voucherType: 'guide_assignment', issueDate: '2024-03-02', serviceDateFrom: '2024-05-20', serviceDateTo: '2024-05-25', guestNames: 'Mr. & Mrs. Emma Thompson', paxCount: 2, status: 'issued', details: { guideName: 'Samuel Kimaro', language: 'English', specialization: 'Wildlife & Birding' } },
];

export const mockInvoices: Invoice[] = [
  {
    id: '1', invoiceNumber: 'INV-2024-0001', bookingId: '1', bookingNumber: 'BK-2024-0001', clientName: 'Emma Thompson',
    invoiceDate: '2024-03-02', dueDate: '2024-04-01', subtotal: 9800, taxPercent: 0, taxAmount: 0,
    discountAmount: 0, totalAmount: 9800, currency: 'USD', status: 'partial',
    payments: [
      { id: '1', paymentReference: 'PAY-001', invoiceId: '1', paymentDate: '2024-03-02', amount: 4900, paymentMethod: 'bank_transfer', referenceNumber: 'TRF-2024-0302-001', notes: '50% advance deposit' },
    ]
  },
  {
    id: '2', invoiceNumber: 'INV-2024-0002', bookingId: '2', bookingNumber: 'BK-2024-0002', clientName: 'James Wilson',
    invoiceDate: '2024-03-09', dueDate: '2024-04-08', subtotal: 15600, taxPercent: 0, taxAmount: 0,
    discountAmount: 0, totalAmount: 15600, currency: 'USD', status: 'sent',
    payments: []
  },
  {
    id: '3', invoiceNumber: 'INV-2024-0003', bookingId: '3', bookingNumber: 'BK-2024-0003', clientName: 'Maria Garcia',
    invoiceDate: '2024-03-11', dueDate: '2024-04-10', subtotal: 52000, taxPercent: 0, taxAmount: 0,
    discountAmount: 0, totalAmount: 52000, currency: 'USD', status: 'paid',
    payments: [
      { id: '2', paymentReference: 'PAY-002', invoiceId: '3', paymentDate: '2024-03-11', amount: 26000, paymentMethod: 'bank_transfer', referenceNumber: 'TRF-2024-0311-001', notes: '50% deposit' },
      { id: '3', paymentReference: 'PAY-003', invoiceId: '3', paymentDate: '2024-04-01', amount: 26000, paymentMethod: 'bank_transfer', referenceNumber: 'TRF-2024-0401-001', notes: 'Final balance' },
    ]
  },
];
