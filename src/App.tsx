import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SoundProvider } from './context/SoundContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Itineraries from './pages/Itineraries';
import Bookings from './pages/Bookings';
import Operations from './pages/Operations';
import Vendors from './pages/Vendors';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="itineraries" element={<ProtectedRoute allowedRoles={['admin', 'sales_agent', 'operations_manager']}><Itineraries /></ProtectedRoute>} />
        <Route path="bookings" element={<ProtectedRoute allowedRoles={['admin', 'operations_manager']}><Bookings /></ProtectedRoute>} />
        <Route path="operations" element={<ProtectedRoute allowedRoles={['admin', 'operations_manager']}><Operations /></ProtectedRoute>} />
        <Route path="vendors" element={<ProtectedRoute allowedRoles={['admin', 'operations_manager']}><Vendors /></ProtectedRoute>} />
        <Route path="invoices" element={<ProtectedRoute allowedRoles={['admin', 'accountant']}><Invoices /></ProtectedRoute>} />
        <Route path="customers" element={<ProtectedRoute allowedRoles={['admin', 'sales_agent']}><Customers /></ProtectedRoute>} />
        <Route path="customers/:id" element={<ProtectedRoute allowedRoles={['admin', 'sales_agent']}><Customers /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute allowedRoles={['admin', 'accountant']}><Reports /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />
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
        <SoundProvider>
          <AppRoutes />
        </SoundProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
