import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state synchronously from localStorage
  const getInitialAuth = () => {
    const storedToken = localStorage.getItem('travelops_token');
    const storedUser = localStorage.getItem('travelops_user');
    
    if (storedToken && storedUser) {
      try {
        return {
          user: JSON.parse(storedUser) as User,
          token: storedToken,
        };
      } catch (error) {
        localStorage.removeItem('travelops_token');
        localStorage.removeItem('travelops_user');
      }
    }
    return { user: null, token: null };
  };

  const initialAuth = getInitialAuth();
  const [user, setUser] = useState<User | null>(initialAuth.user);
  const [token, setToken] = useState<string | null>(initialAuth.token);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock login for demo/preview mode
    const mockUsers: Record<string, User> = {
      'admin@travelops.pro': { id: '1', firstName: 'System', lastName: 'Admin', email: 'admin@travelops.pro', role: 'admin' },
      'sarah@travelops.pro': { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@travelops.pro', role: 'sales_agent' },
      'michael@travelops.pro': { id: '3', firstName: 'Michael', lastName: 'Chen', email: 'michael@travelops.pro', role: 'operations_manager' },
      'emily@travelops.pro': { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily@travelops.pro', role: 'accountant' },
    };

    const foundUser = mockUsers[email];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (foundUser) {
      const mockToken = 'mock-jwt-token-' + Date.now();
      setToken(mockToken);
      setUser(foundUser);
      localStorage.setItem('travelops_token', mockToken);
      localStorage.setItem('travelops_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('travelops_token');
    localStorage.removeItem('travelops_user');
  }, []);

  const hasRole = useCallback((roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    return requiredRoles.includes(user.role);
  }, [user]);

  const isAdmin = useCallback((): boolean => {
    return user?.role === 'admin';
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user && !!token, isLoading, login, logout, hasRole, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
