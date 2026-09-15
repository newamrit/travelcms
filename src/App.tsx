import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import ItineraryBuilder from './pages/ItineraryBuilder';
import Quotations from './pages/Quotations';
import Bookings from './pages/Bookings';
import Suppliers from './pages/Suppliers';
import Vouchers from './pages/Vouchers';
import Invoices from './pages/Invoices';
import Profitability from './pages/Profitability';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<ProtectedRoute allowedRoles={['admin', 'sales_agent']}><Leads /></ProtectedRoute>} />
        <Route path="leads/:id" element={<ProtectedRoute allowedRoles={['admin', 'sales_agent']}><LeadDetail /></ProtectedRoute>} />
        <Route path="itineraries" element={<ProtectedRoute allowedRoles={['admin', 'sales_agent', 'operations_manager']}><ItineraryBuilder /></ProtectedRoute>} />
        <Route path="quotations" element={<ProtectedRoute allowedRoles={['admin', 'sales_agent', 'accountant']}><Quotations /></ProtectedRoute>} />
        <Route path="bookings" element={<ProtectedRoute allowedRoles={['admin', 'operations_manager']}><Bookings /></ProtectedRoute>} />
        <Route path="suppliers" element={<ProtectedRoute allowedRoles={['admin', 'operations_manager']}><Suppliers /></ProtectedRoute>} />
        <Route path="vouchers" element={<ProtectedRoute allowedRoles={['admin', 'operations_manager']}><Vouchers /></ProtectedRoute>} />
        <Route path="invoices" element={<ProtectedRoute allowedRoles={['admin', 'accountant']}><Invoices /></ProtectedRoute>} />
        <Route path="profitability" element={<ProtectedRoute allowedRoles={['admin', 'accountant']}><Profitability /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
