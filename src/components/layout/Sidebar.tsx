import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  LayoutDashboard, Users, Map, FileText, Calendar, Building2,
  ClipboardList, Receipt, TrendingUp, Globe, X, ChevronLeft,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['admin', 'sales_agent', 'operations_manager', 'accountant'] },
  { name: 'Leads', href: '/leads', icon: Users, roles: ['admin', 'sales_agent'] },
  { name: 'Itineraries', href: '/itineraries', icon: Map, roles: ['admin', 'sales_agent', 'operations_manager'] },
  { name: 'Quotations', href: '/quotations', icon: FileText, roles: ['admin', 'sales_agent', 'accountant'] },
  { name: 'Bookings', href: '/bookings', icon: Calendar, roles: ['admin', 'operations_manager'] },
  { name: 'Suppliers', href: '/suppliers', icon: Building2, roles: ['admin', 'operations_manager'] },
  { name: 'Vouchers', href: '/vouchers', icon: ClipboardList, roles: ['admin', 'operations_manager'] },
  { name: 'Invoices', href: '/invoices', icon: Receipt, roles: ['admin', 'accountant'] },
  { name: 'Profitability', href: '/profitability', icon: TrendingUp, roles: ['admin', 'accountant'] },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const { user, hasRole } = useAuth();

  const visibleItems = navigationItems.filter(item => hasRole(item.roles));

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5 overflow-hidden" onClick={onClose}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Globe className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-800 leading-tight">TravelOps</span>
                <span className="text-[10px] text-slate-400 leading-tight">Pro v1.0</span>
              </div>
            )}
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-md text-slate-400 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
          <button onClick={onToggleCollapse} className="hidden lg:flex p-1.5 rounded-md text-slate-400 hover:bg-slate-100">
            <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          <ul className="space-y-1">
            {visibleItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    title={isCollapsed ? item.name : undefined}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-150 group relative
                      ${active ? 'bg-primary-50 text-primary-700 border border-primary-100 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-200 p-3 flex-shrink-0">
          <div className={`flex items-center gap-3 p-2 rounded-lg bg-slate-50 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500 capitalize truncate">{user?.role?.replace('_', ' ')}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
