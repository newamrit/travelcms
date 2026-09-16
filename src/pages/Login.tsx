import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Globe, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    if (strength < 50) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength < 75) return { strength, label: 'Medium', color: 'bg-yellow-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#012871] via-[#011950] to-[#f35500] animate-gradient-shift" />
      
      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f35500]/10 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float-fast" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Logo Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl mb-4 shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-300">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">TravelOps Pro</h1>
            <p className="text-white/80">Tour & Travel Management System</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/70 mb-6">Sign in to your account</p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl flex items-center gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
                <span className="text-sm text-red-100">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                  emailFocused || email ? 'top-0 -translate-y-1/2 text-xs text-white/80' : 'text-white/60'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                  placeholder=" "
                  required
                />
                <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                  emailFocused || email ? 'top-2 text-xs text-white/80' : 'top-1/2 -translate-y-1/2 text-white/60'
                }`}>
                  Email Address
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                  passwordFocused || password ? 'top-0 -translate-y-1/2 text-xs text-white/80' : 'text-white/60'
                }`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                  placeholder=" "
                  required
                />
                <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                  passwordFocused || password ? 'top-2 text-xs text-white/80' : 'top-1/2 -translate-y-1/2 text-white/60'
                }`}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/70">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength < 50 ? 'text-red-300' :
                      passwordStrength.strength < 75 ? 'text-yellow-300' : 'text-green-300'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-500`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-white/30 bg-white/5 text-[#f35500] focus:ring-[#f35500] focus:ring-offset-0"
                  />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#f35500] to-[#c54300] text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-center text-white/70 text-sm mb-4">Quick Demo Access</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDemoLogin('admin@travelops.pro')}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  Admin
                </button>
                <button
                  onClick={() => handleDemoLogin('sales@travelops.pro')}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  Sales
                </button>
                <button
                  onClick={() => handleDemoLogin('ops@travelops.pro')}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  Operations
                </button>
                <button
                  onClick={() => handleDemoLogin('accounts@travelops.pro')}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  Accounts
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-white/60 text-sm">
            <p>© 2026 TravelOps Pro. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
