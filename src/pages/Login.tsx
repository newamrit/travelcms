import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Globe, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@travelops.pro');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password. Try: admin@travelops.pro');
        setLoading(false);
      }
      // Don't set loading to false here - let useEffect handle redirect
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#012871] via-[#011e5b] to-[#011445] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#f35500] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#f35500] backdrop-blur flex items-center justify-center">
              <Globe className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold">TravelOps Pro</h1>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">Tour & Travel<br />Office Management</h2>
          <p className="text-lg text-primary-100 max-w-md leading-relaxed">
            Streamline your travel business operations — from lead management and itinerary building to invoicing and supplier coordination.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4">
            {[{ label: 'Leads Managed', value: '2,400+' }, { label: 'Trips Booked', value: '850+' }, { label: 'Revenue Tracked', value: '$4.2M' }, { label: 'Happy Clients', value: '1,200+' }].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/10">
                <p className="text-2xl font-bold text-[#f35500]">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#012871] flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">TravelOps Pro</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-slate-500 mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" placeholder="you@company.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#012871] text-white rounded-lg font-medium hover:bg-[#011e5b] focus:ring-4 focus:ring-primary-200 transition disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-slate-100 rounded-lg">
            <p className="text-xs font-medium text-slate-600 mb-2">Demo Accounts (any password works):</p>
            <div className="space-y-1 text-xs text-slate-500">
              <p><span className="font-medium">Admin:</span> admin@travelops.pro</p>
              <p><span className="font-medium">Sales:</span> sarah@travelops.pro</p>
              <p><span className="font-medium">Operations:</span> michael@travelops.pro</p>
              <p><span className="font-medium">Accountant:</span> emily@travelops.pro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
