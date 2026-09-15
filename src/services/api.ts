import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('travelops_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('travelops_token');
      localStorage.removeItem('travelops_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const leadsAPI = {
  getAll: (params?: any) => api.get('/leads', { params }),
  getById: (id: string | number) => api.get(`/leads/${id}`),
  create: (data: any) => api.post('/leads', data),
  update: (id: string | number, data: any) => api.put(`/leads/${id}`, data),
  updateStatus: (id: string | number, status: string, lostReason?: string) => api.put(`/leads/${id}/status`, { status, lost_reason: lostReason }),
  delete: (id: string | number) => api.delete(`/leads/${id}`),
  getActivities: (id: string | number) => api.get(`/leads/${id}/activities`),
  addActivity: (id: string | number, data: any) => api.post(`/leads/${id}/activities`, data),
};

export const itinerariesAPI = {
  getAll: (params?: any) => api.get('/itineraries', { params }),
  getById: (id: string | number) => api.get(`/itineraries/${id}`),
  create: (data: any) => api.post('/itineraries', data),
  update: (id: string | number, data: any) => api.put(`/itineraries/${id}`, data),
  updateDays: (id: string | number, days: any[]) => api.put(`/itineraries/${id}/days`, { days }),
  addDay: (id: string | number, data: any) => api.post(`/itineraries/${id}/days`, data),
  duplicate: (id: string | number) => api.post(`/itineraries/${id}/duplicate`),
  delete: (id: string | number) => api.delete(`/itineraries/${id}`),
};

export const quotationsAPI = {
  getAll: (params?: any) => api.get('/quotations', { params }),
  getById: (id: string | number) => api.get(`/quotations/${id}`),
  create: (data: any) => api.post('/quotations', data),
  update: (id: string | number, data: any) => api.put(`/quotations/${id}`, data),
  addItem: (id: string | number, data: any) => api.post(`/quotations/${id}/items`, data),
  send: (id: string | number) => api.post(`/quotations/${id}/send`),
  calculate: (data: any) => api.post('/quotations/calculate', data),
  delete: (id: string | number) => api.delete(`/quotations/${id}`),
};

export const bookingsAPI = {
  getAll: (params?: any) => api.get('/bookings', { params }),
  getById: (id: string | number) => api.get(`/bookings/${id}`),
  create: (data: any) => api.post('/bookings', data),
  update: (id: string | number, data: any) => api.put(`/bookings/${id}`, data),
};

export const suppliersAPI = {
  getAll: (params?: any) => api.get('/suppliers', { params }),
  getById: (id: string | number) => api.get(`/suppliers/${id}`),
  create: (data: any) => api.post('/suppliers', data),
  update: (id: string | number, data: any) => api.put(`/suppliers/${id}`, data),
  delete: (id: string | number) => api.delete(`/suppliers/${id}`),
};

export const vouchersAPI = {
  getAll: (params?: any) => api.get('/vouchers', { params }),
  getById: (id: string | number) => api.get(`/vouchers/${id}`),
  create: (data: any) => api.post('/vouchers', data),
  update: (id: string | number, data: any) => api.put(`/vouchers/${id}`, data),
};

export const invoicesAPI = {
  getAll: (params?: any) => api.get('/invoices', { params }),
  getById: (id: string | number) => api.get(`/invoices/${id}`),
  create: (data: any) => api.post('/invoices', data),
  addPayment: (id: string | number, data: any) => api.post(`/invoices/${id}/payments`, data),
};

export const profitabilityAPI = {
  getOverview: (params?: any) => api.get('/profitability', { params }),
  getBookingProfitability: (bookingId: string | number) => api.get(`/profitability/booking/${bookingId}`),
  getSupplierAnalysis: (params?: any) => api.get('/profitability/suppliers', { params }),
  recordExpense: (data: any) => api.post('/profitability/expenses', data),
  updateExpense: (id: string | number, data: any) => api.put(`/profitability/expenses/${id}`, data),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard'),
};

export default api;
